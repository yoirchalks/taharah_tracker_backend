import express, { Request, Response } from "express";
import logInsValidators from "../validators/logIns.validators.js";
import { prisma } from "../utils/prismaClient.js";
import { unHash } from "../utils/hashPassword.js";
import { doesEmailMatchHash } from "../utils/hashEmail.js";
import { signJwt } from "../utils/jwt.js";
import createOtp from "../utils/generateOtp.js";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const data = req.body;
  const result = logInsValidators(data);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const userId: string = data.userId;
  const password = data.password;
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      res.status(404).send(`user with id ${userId} not found`);
      return;
    }

    if (password) {
      const isPasswordValid = await unHash(user.password_hash, data.password);
      if (!isPasswordValid) {
        res.status(403).send("password incorrect");
        return;
      }

      const jwt = signJwt({ userId });
      res
        .cookie("authentication", jwt, {
          secure: true,
          sameSite: "strict",
          path: "/",
          httpOnly: true,
        })
        .status(204)
        .send();
    }

    if (data.email) {
      const isEmailCorrect = doesEmailMatchHash(data.email, user.email_hash);
      if (!isEmailCorrect) {
        res.status(403).send("email incorrect");
        return;
      }
      //TODO:forward user to front-end login page via link in email.

      const Otp = createOtp();
      await prisma.otps.create({
        data: {
          userId: userId,
          OTP: Otp,
        },
      });
      sendEmail(data.email, Otp);
      res.status(200).send("email correct");
    }

    if (data.otp) {
      const storedOtp = await prisma.otps.findFirst({
        where: {
          userId: userId,
        },
        orderBy: {
          iat: "desc",
        },
      });

      if (!storedOtp) {
        res.status(404).send(`no OTP found for user with id ${userId}`);
        return;
      }

      const elapsedTime = new Date().getTime() - storedOtp.iat.getTime();
      console.log("elapsed time: ", elapsedTime);

      if (elapsedTime > 1000 * 60 * 10) {
        res.status(401).send("OTP expired");
        return;
      }

      if (storedOtp.OTP != data.otp) {
        res.status(401).send("OTP incorrect");
        return;
      }
      if (storedOtp.used === true) {
        res.status(403).send("OTP already used");
      }
      await prisma.otps.update({
        where: {
          id: storedOtp.id,
        },
        data: {
          used: true,
        },
      });
      const jwt = signJwt({ userId });
      res
        .cookie("authentication", jwt, {
          secure: true,
          sameSite: "strict",
          path: "/",
          httpOnly: true,
        })
        .status(204)
        .send();
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send("internal server error");
  }
});

export default router;

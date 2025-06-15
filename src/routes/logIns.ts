import express, { Request, Response } from "express";
import logInsValidators from "../validators/logIns.validators.js";
import { prisma } from "../utils/prismaClient.js";
import { unHash } from "../utils/hashPassword.js";
import hashEmail, { doesEmailMatchHash } from "../utils/hashEmail.js";
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
  const hashedEmail = hashEmail(data.email);
  const password = data.password;
  try {
    const user = await prisma.users.findUnique({
      where: {
        email_hash: hashedEmail,
      },
    });
    if (!user) {
      res.status(404).send(`no user registered with email ${data.email}`);
      return;
    }

    if (password) {
      const isPasswordValid = await unHash(user.password_hash, data.password);
      if (!isPasswordValid) {
        res.status(403).send("password incorrect");
        return;
      }

      const jwt = signJwt({ user: user.id });
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

    if (data.requestingOtp) {
      // const isEmailCorrect = doesEmailMatchHash(data.email, user.email_hash);
      // if (!isEmailCorrect) {
      //   res.status(403).send("email incorrect");
      //   return;
      // } should not need this b/c were identifying user based of email
      //TODO:forward user to front-end login page via link in email.

      const Otp = createOtp();
      const generatedOtp = await prisma.otps.create({
        data: {
          OTP: Otp,
        },
      });
      sendEmail(data.email, Otp);
      res.status(200).send(generatedOtp);
    }

    if (data.otp) {
      const storedOtp = await prisma.otps.findFirst({
        where: {
          userId: user.id,
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

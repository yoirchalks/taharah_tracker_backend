import express, { Request, Response } from "express";
import logInsValidators from "../validators/logIns.validators.js";
import { prisma } from "../utils/prismaClient.js";
import { unHash } from "../utils/hashPassword.js";
import hashEmail from "../utils/hashEmail.js";
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

    if (data.password) {
      const password = data.password;
      const isPasswordValid = await unHash(user.password_hash, password);
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
  } catch (error) {
    console.log("error", error);
    res.status(500).send("internal server error");
  }
});

export default router;

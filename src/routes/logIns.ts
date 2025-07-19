import express from "express";
import type { Request, Response } from "express";
import logInsValidators from "../validators/logIns.validators.js";
import { prisma } from "../startup/prismaClient.js";
import { unHash } from "../utils/security/hashPassword.js";
import hashEmail from "../utils/security/hashEmail.js";
import { signJwt } from "../utils/security/jwt.js";
import createOtp from "../utils/security/generateOtp.js";
import { emailQueue } from "../queues/email.que.js";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const data = req.body;
  const result = logInsValidators(data);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const hashedEmail = hashEmail(data.email);

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

    const jwt = signJwt({ uuid: user.id });
    res
      .cookie("authentication", jwt, {
        secure: true,
        sameSite: "strict",
        path: "/",
        httpOnly: true,
      })
      .status(204)
      .send(); //TODO: OTP is currently sent in res. must remove this and לכאורה only need send otp id so i can query db using it.
  }

  if (data.requestingOtp) {
    //TODO:forward user to front-end login page via link in email.

    const Otp = createOtp();
    const generatedOtp = await prisma.otps.create({
      data: {
        OTP: Otp,
        userId: user.id,
      },
    });
    emailQueue.add("send_otp", {
      address: data.email,
      OTP: Otp,
    });
    res
      .status(200)
      .send({ otpId: generatedOtp.id, userId: generatedOtp.userId });
  }
});

export default router;

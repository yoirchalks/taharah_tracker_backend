import express from "express";
import type { Request, Response } from "express";
import { prisma } from "../startup/prismaClient.js";
import otpValidator from "../validators/otp.validators.js";
import { signJwt } from "../utils/jwt.js";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const data = req.body;
  const result = otpValidator(data);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const { id, userId, OTP } = req.body;

  const storedOtp = await prisma.otps.findUnique({
    where: {
      id,
    },
  });

  if (!storedOtp) {
    res.status(404).send(`no OTP found with id ${id}`);
    return;
  }
  if (storedOtp.OTP !== OTP) {
    res.status(403).send(`OTP incorrect`);
  }
  const now = new Date().getTime();
  if (storedOtp.iat.getTime() + 1000 * 60 * 10 < now) {
    res.status(403).send(`OTP expires`);
    return;
  }
  if (storedOtp.used === true) {
    res.status(403).send(`OTP already used`);
    return;
  }
  if (storedOtp.userId !== userId) {
    res.status(409).send(`otp ${OTP} not associated with user ${userId}`);
    return;
  }
  const updatedOtp = await prisma.otps.update({
    where: {
      id,
    },
    data: {
      used: true,
    },
  });

  const jwt = signJwt({ user: updatedOtp.userId });
  res
    .cookie("authentication", jwt, {
      secure: true,
      sameSite: "strict",
      path: "/",
      httpOnly: true,
    })
    .status(204)
    .send();
});

export default router;

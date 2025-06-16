import express from "express";
import type { Request, Response } from "express";
import { prisma } from "../utils/prismaClient.js";
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
  const { UUID, IAT, used, OTP } = req.body;

  const storedOtp = await prisma.otps.findUnique({
    where: {
      id: UUID,
    },
  });
  if (!storedOtp) {
    res.status(404).send(`no OTP found with id ${UUID}`);
    return;
  }
  if (storedOtp.OTP !== OTP) {
    res.status(403).send(`OTP incorrect`);
  }
  const now = new Date().getTime();
  if (storedOtp.iat.getTime() + 1000 * 60 * 10 > now) {
    res.status(403).send(`OTP expires`);
  }
  if (storedOtp.used === true) {
    res.status(403).send(`OTP already used`);
  }
  const updatedOtp = await prisma.otps.update({
    where: {
      id: UUID,
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

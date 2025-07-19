import express from "express";
import type { Request, Response } from "express";
import { prisma } from "../startup/prismaClient.js";
import usersValidators from "../validators/users.validators.js";
import hashEmail from "../utils/security/hashEmail.js";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const result = usersValidators(req.body, "put");

  if (result.error) {
    console.log(result.error.details[0].message);
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const emailHash = hashEmail(req.body.email);
  const matchingEmail = await prisma.users.findFirst({
    where: { email_hash: emailHash },
    select: { id: true },
  });
  if (matchingEmail) {
    res.send({ unique: false });
    return;
  }
  res.send({ unique: true });
});

export default router;

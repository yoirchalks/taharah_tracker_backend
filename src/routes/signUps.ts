import { encrypt } from "../utils/security/encryption.js";
import express from "express";
import hashEmail from "../utils/security/hashEmail.js";
import * as hash from "../utils/security/hashPassword.js";
import { prisma } from "../startup/prismaClient.js";
import userValidator from "../validators/users.validators.js";

import type { Request, Response } from "express";

const router = express.Router();

interface Encryption {
  encrypted: string;
  iv: string;
  tag: string;
}

router.post("/", async (req, res) => {
  const data = req.body;
  const result = userValidator(data, "post");
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const { email, name, password } = req.body;

  const hashedEmail = hashEmail(email);

  try {
    const isNotUnique = await prisma.users.findFirst({
      where: {
        email_hash: hashedEmail,
      },
    });

    if (isNotUnique) {
      res.status(409).send("email is already in use");
      return;
    }

    const emailEncrypt = encrypt(email);
    const nameEncrypt = encrypt(name);
    const hashedPassword = await hash.hash(password);

    const user = await prisma.users.create({
      data: {
        name_encrypt: nameEncrypt.encrypted,
        name_iv: nameEncrypt.iv,
        name_tag: nameEncrypt.tag,
        email_encrypt: emailEncrypt.encrypted,
        email_iv: emailEncrypt.iv,
        email_tag: emailEncrypt.tag,
        email_hash: hashedEmail,
        password_hash: hashedPassword,
      },
    });
    res.send({ userId: user.id });
  } catch (error) {
    console.log(error);
    res.status(500).send("internal server error");
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const isUser = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });
    if (!isUser) {
      res.status(404).send(`user with id ${userId} not found`);
      return;
    }
  } catch (error) {
    console.error("error", error);
  }
  const result = userValidator(req.body, "put");
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const data: {
    email?: string;
    password?: string;
    name?: string;
  } = req.body;

  try {
    let passwordHash: string | undefined = undefined;
    if (data.password) {
      passwordHash = await hash.hash(data.password);
    }

    let emailEncrypt: Encryption | undefined = undefined;
    let emailHash: string | undefined = undefined;
    if (data.email) {
      emailEncrypt = encrypt(data.email);
      emailHash = hashEmail(data.email);
    }
    let nameEncrypt: Encryption | undefined = undefined;
    if (data.name) {
      nameEncrypt = encrypt(data.name);
    }

    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: {
        ...(emailEncrypt && {
          email_encrypt: emailEncrypt.encrypted,
          email_iv: emailEncrypt.iv,
          email_tag: emailEncrypt.tag,
          email_hash: emailHash,
        }),
        ...(nameEncrypt && {
          name_encrypt: nameEncrypt.encrypted,
          name_iv: nameEncrypt.iv,
          name_tag: nameEncrypt.tag,
        }),
        ...(passwordHash && {
          password_hash: passwordHash,
        }),
      },
    });
    res.send(updatedUser);
  } catch (error) {
    console.log(error);
  }
});

export default router;

import express, { Request, Response } from "express";
import logInsValidators from "../validators/logIns.validators.js";
import { prisma } from "../utils/prismaClient.js";
import { unHash } from "../utils/hashPassword.js";
import { doesEmailMatchHash } from "../utils/hashEmail.js";
import { signJwt } from "../utils/jwt.js";

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
      if (typeof data.password === "number") {
        console.log("using 1tp");
        return;
      }
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
      //TODO:add email validation logic. send 1tp to users email, save in db for 5 min. forward user to login page via link in email.
      res.status(200).send("email correct");
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send("internal server error");
  }
});

export default router;

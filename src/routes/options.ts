import authMiddleware from "../middlewares/jwt.middleware.js";
import express from "express";
import type { Request, Response } from "express";
import { prisma } from "../startup/prismaClient.js";
import validator from "../validators/options.validators.js";

const router = express.Router();

router.get("/", authMiddleware, async (req: Request, res: Response) => {});

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const userId = req.userId;
  const result = validator(req.body, "post");
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const { location, receiveAlerts } = req.body;
  const options = await prisma.options.create({
    data: {
      userId: userId,
      location,
      receiveAlerts,
    },
  });
  res.send(options);
});

router.put("/:id", authMiddleware, async (req: Request, res: Response) => {});

router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  const userId = req.userId;
  const options = await prisma.options.findUnique({
    where: {
      userId,
    },
  });

  if (!options) {
    res.status(404).send(`no options found fo user with id ${userId}`);
    return;
  }

  res.send(options);
});

export default router;

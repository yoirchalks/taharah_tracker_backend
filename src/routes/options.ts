import authMiddleware from "../middlewares/jwt.middleware.js";
import express from "express";
import type { Request, Response } from "express";
import { prisma } from "../utils/prismaClient.js";
import { send } from "process";

const router = express.Router();

router.get("/", authMiddleware, async (req: Request, res: Response) => {});

router.post("/", authMiddleware, async (req: Request, res: Response) => {});

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

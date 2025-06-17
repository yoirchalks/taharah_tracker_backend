import express from "express";
import type { Request, Response } from "express";
import { prisma } from "../utils/prismaClient.js";
import authMiddleware from "../middlewares/jwt.middleware.js";

const router = express.Router();

router.get("/", [authMiddleware], async (req: Request, res: Response) => {
  const userId = req.userId;
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    res.status(404).send(`user with id ${userId} not found`);
    return;
  }
  const periods = await prisma.periods.findMany({
    where: {
      userId,
    },
  });
  res.send(periods);
});

router.post("/", async (req: Request, res: Response) => {});

router.delete("/:id", async (req: Request, res: Response) => {});

router.put("/:id", async (req: Request, res: Response) => {});

router.get("/:id", async (req: Request, res: Response) => {});

export default router;

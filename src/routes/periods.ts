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

router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  const userId = req.userId;
  const periodId = req.params.id;
  const period = await prisma.periods.findUnique({
    where: {
      id: parseInt(periodId),
      userId,
    },
  });
  if (!period) {
    res
      .status(404)
      .send(`no period with id ${periodId} found for user with id ${userId}`);
    return;
  }
  res.send(period);
});

router.post("/", async (req: Request, res: Response) => {});

router.delete("/:id", async (req: Request, res: Response) => {});

router.put("/:id", async (req: Request, res: Response) => {});

router.get("/:id", async (req: Request, res: Response) => {});

export default router;

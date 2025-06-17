import express from "express";
import type { Request, Response } from "express";
import { prisma } from "../utils/prismaClient.js";
import authMiddleware from "../middlewares/jwt.middleware.js";
import getPrismaUserById from "../utils/getPrismaUser.js";

const router = express.Router();

router.get("/", [authMiddleware], async (req: Request, res: Response) => {
  const userId = req.userId;
  const user = await getPrismaUserById(userId);
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

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const userId = req.userId;
  const user = await getPrismaUserById(userId);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const userId = req.userId;
  const periodId = req.params.id;
  const user = await getPrismaUserById(userId);
  if (!user) {
    res.status(404).send(`no user found with id of ${userId}`);
    return;
  }
  const period = await prisma.periods.findUnique({
    where: {
      id: parseInt(periodId),
    },
  });
  if (!period) {
    res.status(404).send(`no period with id ${periodId} found`);
    return;
  }
  if (period.userId !== userId) {
    res
      .status(403)
      .send(
        `period with id ${periodId} doesn't belong to user with id ${userId}`
      );
    return;
  }
  await prisma.periods.delete({
    where: {
      id: parseInt(periodId),
    },
  }); //TODO: add logic here to recalculate and update any vestos that where dependant on this period.
});

router.put("/:id", async (req: Request, res: Response) => {});

export default router;

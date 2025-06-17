import axios from "axios";
import express from "express";

import authMiddleware from "../middlewares/jwt.middleware.js";
import getPrismaUserById from "../utils/getPrismaUser.js";

import pkg from "hebrew-date";
const HebrewDate = pkg.HebrewDate;

import { prisma } from "../utils/prismaClient.js";
import validator from "../validators/periods.validators.js";

import type { Request, Response } from "express";

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
  const result = validator(req.body, "post");
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }
  const { date, time, type } = req.body;

  const userId = req.userId;
  const user = await getPrismaUserById(userId);
  const userOptions = await prisma.options.findUnique({
    where: {
      userId: userId,
    },
  });
  if (!userOptions || !userOptions.location) {
    res.status(422).send(`user must have options and location set to proceed.`);
  }
  const hebrewDate = new HebrewDate(date);
  console.log(hebrewDate);
  res.send();
});

//TODO: replace 403 codes for 401 with invalid JWTs

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

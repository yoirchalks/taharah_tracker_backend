import express from "express";

import authMiddleware from "../middlewares/jwt.middleware.js";
import getPrismaUserById from "../utils/db/getPrismaUser.js";
import { prisma } from "../startup/prismaClient.js";
import validator, {
  validateQueryParams,
  type QueryData,
} from "../validators/periods.validators.js";

import type { Request, Response } from "express";
import handlePeriod from "../handlers/periodHandler.js";
import { addDays, startOfDay } from "date-fns";

const router = express.Router();

router.get("/", authMiddleware, async (req: Request, res: Response) => {
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
  const queryParams = {
    startDate: req.query.startDate,
    endDate: req.query.endDate,
    page: parseInt(req.query.page! as string) | 1,
    limit: parseInt(req.query.limit as string) | 10,
  };
  const { error, value } = validateQueryParams(queryParams);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  const { startDate, endDate, limit, page } = value as QueryData;
  const start = startOfDay(startDate);
  const end = addDays(startOfDay(endDate), 1);
  const skip = (page - 1) * limit;

  const periods = await prisma.periods.findMany({
    where: {
      userId: req.params.id,
      period_dateTime: {
        gte: start,
        lt: end,
      },
    },
    orderBy: { period_dateTime: "asc" },
    skip,
    take: limit,
  });

  res.send(periods);
});

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  const result = validator(req.body, "post");

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const { periodType, dateTime } = req.body;

  if (periodType === "period") {
    handlePeriod(req, res, dateTime);
  }
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

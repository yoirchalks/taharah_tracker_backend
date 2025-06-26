import type { Request, Response } from "express";
import { prisma } from "../startup/prismaClient.js";
import { getLocationFromId } from "../utils/db/getLocationFromDb.js";
import { Zmanim } from "@hebcal/core/dist/esm/zmanim";
import resetSevenDays from "../utils/db/resetSevenClean.js";
import { HDate } from "@hebcal/hdate/dist/esm/hdate";
import { periodDataQue } from "../queues/periods.que.js";

async function handlePeriod(req: Request, res: Response, dateTime: Date) {
  const status = await prisma.users.findUnique({
    where: { id: req.userId },
    select: { currentStatus: true },
  });
  if (status?.currentStatus === "beforeHefsek") {
    res.status(422).send("not relevant to log new period before hefsek");
    return;
  }

  const jsDateTime = new Date(dateTime);
  const userId = req.userId;

  const userOptions = await prisma.options.findUnique({
    where: {
      userId: userId,
    },
  });
  if (!userOptions || !userOptions.location) {
    res.status(422).send(`user must have options and location set to proceed.`);
    return;
  }
  const locationId = await prisma.locations.findUnique({
    where: {
      location: userOptions.location,
    },
    select: {
      code: true,
    },
  });

  const hebcalLoc = await getLocationFromId(locationId!.code);
  const zmanim = new Zmanim(hebcalLoc, jsDateTime, true);
  const time = jsDateTime.getTime();
  let onah: "day" | "night" = "day";

  if (time > zmanim.sunset().getTime()) {
    onah = "night";
    jsDateTime.setDate(jsDateTime.getDate() + 1);
  } else if (time < zmanim.sunrise().getTime()) {
    onah = "night";
  }

  const hebDate = new HDate(jsDateTime);

  if (
    status?.currentStatus === "sevenClean" ||
    status?.currentStatus === "tomei"
  ) {
    const updatedUser = resetSevenDays(userId, jsDateTime);
    res.send({ message: `seven days restarted`, updatedUser });
    return;
  }

  const period = await prisma.periods.create({
    data: {
      locationCode: locationId!.code,
      onah,
      hebrew_day: hebDate.getDate(),
      hebrew_month: hebDate.getMonth(),
      hebrew_year: hebDate.getFullYear(),
      period_dateTime: jsDateTime,
      type: "period",
      userId, //TODO:should i add days in month to db? might be easier then calculating elsewhere. already have it here.
    },
  });
  periodDataQue.add("set_user_status", {
    userId,
    requiredStatus: "beforeHefsek",
  });
  res.send(period);
}

export default handlePeriod;

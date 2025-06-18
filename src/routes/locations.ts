import express from "express";
import type { Request, Response } from "express";
import { prisma } from "../startup/prismaClient.js";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const locations = await prisma.locations.findMany();
  res.send(locations);
});

router.post("/", async (req: Request, res: Response) => {
  const { location, code } = req.body;
  if (typeof location != "string" && typeof code != "number") {
    res.status(404).send("location must be  string and code must be number");
    return;
  }
  const newLocation = await prisma.locations.create({
    data: {
      code,
      location,
    },
  });
  res.send(newLocation);
});

export default router;

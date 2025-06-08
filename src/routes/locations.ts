import express, { Request, Response } from "express";
import { prisma } from "../utils/prismaClient.js";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const locations = await prisma.locations.findMany();
  res.send(locations);
});

export default router;

import authMiddleware from "../middlewares/jwt.middleware.js";
import express from "express";
import type { Request, Response } from "express";
import { prisma } from "../utils/prismaClient.js";

const router = express.Router();

router.get("/", authMiddleware, async (req: Request, res: Response) => {});

router.post("/", authMiddleware, async (req: Request, res: Response) => {});

router.delete(
  "/:id",
  authMiddleware,
  async (req: Request, res: Response) => {}
);

router.put("/:id", authMiddleware, async (req: Request, res: Response) => {});

router.get("/:id", authMiddleware, async (req: Request, res: Response) => {});

export default router;

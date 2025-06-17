import express from "express";
import type { Request, Response } from "express";
import { prisma } from "../utils/prismaClient.js";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {});

router.post("/", async (req: Request, res: Response) => {});

router.delete("/:id", async (req: Request, res: Response) => {});

router.put("/:id", async (req: Request, res: Response) => {});

export default router;

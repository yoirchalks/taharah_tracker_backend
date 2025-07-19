import authMiddleware from "../middlewares/jwt.middleware.js";
import express from "express";
import type { Request, Response } from "express";

const router = express.Router();

router.get("/", authMiddleware, async (req: Request, res: Response) => {
  res.send("auth token found");
});

export default router;

import { Router } from "express";

import type { Request, Response } from "express";
import jwtMiddleware from "../middlewares/jwt.middleware.js";
const router = Router();

router.post("/", jwtMiddleware, (req: Request, res: Response) => {
  res
    .clearCookie("authentication", {
      secure: true,
      sameSite: "strict",
      path: "/",
      httpOnly: true,
    })
    .send(`logged out successfully`);
});

export default router;

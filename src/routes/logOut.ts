import { Router } from "express";

import type { Request, Response } from "express";
const router = Router();

router.post("/", (req: Request, res: Response) => {
  res
    .cookie("authentication", {
      secure: true,
      sameSite: "strict",
      path: "/",
      httpOnly: true,
    })
    .send(`logged out successfully`);
});

export default router;

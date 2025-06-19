import { Router } from "express";

import type { Request, Response } from "express";
const router = Router();

router.post("/", (req: Request, res: Response) => {
  //TODO: add logic to remove cookie
  res.send(`logged out successfully`);
});

export default router;

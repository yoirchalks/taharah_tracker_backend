import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {});

router.post("/", async (req: Request, res: Response) => {});

router.delete("/:id", async (req: Request, res: Response) => {});

router.put("/:id", async (req: Request, res: Response) => {});

router.get("/:id", async (req: Request, res: Response) => {});

router.get("/:patch", async (req: Request, res: Response) => {});

export default router;

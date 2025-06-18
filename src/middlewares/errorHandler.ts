import type { Request, Response, NextFunction } from "express";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err.message, err.stack);
  res.status(500).send(err.message);
}

import type { Request, Response, NextFunction } from "express";
import { decodeJwt } from "../utils/jwt.js";

export default function (req: Request, res: Response, next: NextFunction) {
  const authToken = req.cookies.authentication;

  if (!authToken) {
    res.status(401).send("no auth token included with request");
    return;
  }

  const result = decodeJwt(authToken);
  console.log("result: ", result);

  if (!result.valid) {
    res.status(401).send(result.reason);
    return;
  }

  req.userId = result.value?.uuid;
  console.log("middleware:", req.userId);

  next();
}

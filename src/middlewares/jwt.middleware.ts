import type { Request, Response, NextFunction } from "express";
import { decodeJwt } from "../utils/jwt.js";

export default function (req: Request, res: Response, next: NextFunction) {
  const authToken = req.cookies.authentication;

  if (!authToken) {
    if (req.originalUrl === "/api/logOut") {
      console.log(" logOut called");

      res.send("user not logged in");
      return;
    }
    res.status(401).send("no auth token included with request");
    return;
  }

  const result = decodeJwt(authToken);

  if (!result.valid) {
    res.status(401).send(result.reason);
    return;
  }

  req.userId = result.value?.uuid;

  next();
}

import { Request, Response, NextFunction } from "express";
import { decodeJwt } from "../utils/jwt.js";
import { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export default function (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authToken = req.cookies.authentication;

  if (!authToken) {
    res.status(401).send("no auth token included with request");
    return;
  }

  const result = decodeJwt(authToken);

  if (!result.valid) {
    res.status(401).send(result.reason);
    return;
  }

  req.user = authToken;
  next();
}

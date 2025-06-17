import { JwtToken } from "../jwt.ts";

declare global {
  namespace Express {
    interface Request {
      userId?: JwtPayload;
    }
  }
}

import pkg from "jsonwebtoken";
import dotenv from "dotenv";

import type { JwtPayload } from "jsonwebtoken";

const { JsonWebTokenError, TokenExpiredError, sign, verify } = pkg;

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export function signJwt(data: any, expirationLength?: number) {
  const options = expirationLength
    ? { expiresIn: expirationLength }
    : undefined;
  return sign(data, JWT_SECRET, options);
}

export function decodeJwt(token: string):
  | JwtPayload
  | {
      valid: boolean;
      reason: string;
    } {
  try {
    return verify(token, JWT_SECRET) as JwtPayload;
  } catch (err: unknown) {
    if (err instanceof JsonWebTokenError) {
      return { valid: false, reason: "invalid token provided" };
    } else if (err instanceof TokenExpiredError) {
      return { valid: false, reason: "token expired" };
    } else {
      return { valid: false, reason: "unknown" };
    }
  }
}

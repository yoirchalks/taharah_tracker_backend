import jwt, {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError,
} from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export function sign(data: any, expirationLength?: number) {
  const options = expirationLength
    ? { expiresIn: expirationLength }
    : undefined;
  return jwt.sign(data, JWT_SECRET, options);
}

export function decode(token: string):
  | JwtPayload
  | {
      valid: boolean;
      reason: string;
    } {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
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

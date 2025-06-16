import pkg from "jsonwebtoken";
import dotenv from "dotenv";
const { JsonWebTokenError, TokenExpiredError, sign, verify } = pkg;
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
export function signJwt(data, expirationLength) {
    const options = expirationLength
        ? { expiresIn: expirationLength }
        : undefined;
    return sign(data, JWT_SECRET, options);
}
export function decodeJwt(token) {
    try {
        return verify(token, JWT_SECRET);
    }
    catch (err) {
        if (err instanceof JsonWebTokenError) {
            return { valid: false, reason: "invalid token provided" };
        }
        else if (err instanceof TokenExpiredError) {
            return { valid: false, reason: "token expired" };
        }
        else {
            return { valid: false, reason: "unknown" };
        }
    }
}

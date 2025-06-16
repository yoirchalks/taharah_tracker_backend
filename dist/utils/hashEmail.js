import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
const secretSalt = process.env.SHA_SECRET;
export default function hashEmail(email) {
    const normalizedEmail = email.trim().toLowerCase();
    const data = normalizedEmail + secretSalt;
    const hash = crypto.createHash("sha256").update(data).digest("hex");
    return hash;
}
export function doesEmailMatchHash(email, hash) {
    return hashEmail(email) === hash;
}

import crypto from "crypto";
import dotenv from "dotenv";

const secretSalt = process.env.SHA_SECRET;

export default function hashEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const data = normalizedEmail + secretSalt;
  const hash = crypto.createHash("sha256").update(data).digest("hex");
  return hash;
}

export function doesEmailMatchHash(email: string, hash: string): boolean {
  return hashEmail(email) === hash;
}

import crypto from "crypto";
export default function createOtp() {
    return crypto.randomInt(0, 1000000).toString().padStart(6, "0");
}

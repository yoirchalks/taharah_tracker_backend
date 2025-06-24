import { prisma } from "../startup/prismaClient.js";

export default async function deleteUsedOtp() {
  await prisma.otps.deleteMany({
    where: { used: true },
  });
}

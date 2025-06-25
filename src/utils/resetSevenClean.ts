import { prisma } from "../startup/prismaClient.js";

export default async function resetSevenDays(userId: string, date: Date) {
  date.setDate(date.getDate() + 7);

  const updatedUser = prisma.users.update({
    where: { id: userId },
    data: { statusUntil: date },
  });

  return updatedUser;
}

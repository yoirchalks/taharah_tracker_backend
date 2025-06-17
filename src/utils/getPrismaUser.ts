import { prisma } from "./prismaClient.js";

export default async function getPrismaUserById(userId: string) {
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
}

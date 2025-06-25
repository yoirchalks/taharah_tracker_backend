import { prisma } from "../startup/prismaClient.js";

export default async function updateUserStatus(
  userId: string,
  requiredStatus:
    | "tahor"
    | "beforeHefsek"
    | "tomei"
    | "afterBirth"
    | "sevenClean"
) {
  await prisma.users.update({
    where: { id: userId },
    data: { currentStatus: requiredStatus },
  });
}

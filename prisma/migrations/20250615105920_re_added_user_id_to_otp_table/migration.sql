/*
  Warnings:

  - Added the required column `userId` to the `Otps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Otps" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Otps" ADD CONSTRAINT "Otps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

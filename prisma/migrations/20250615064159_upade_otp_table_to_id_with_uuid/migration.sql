/*
  Warnings:

  - The primary key for the `Otps` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `Otps` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Otps" DROP CONSTRAINT "Otps_userId_fkey";

-- AlterTable
ALTER TABLE "Otps" DROP CONSTRAINT "Otps_pkey",
DROP COLUMN "userId",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Otps_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Otps_id_seq";

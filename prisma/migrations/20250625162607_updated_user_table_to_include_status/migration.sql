/*
  Warnings:

  - Added the required column `currentStatus` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('tahor', 'tomei', 'afterBirth', 'sevenClean');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "currentStatus" "Status" NOT NULL,
ADD COLUMN     "statusUntil" TIMESTAMP(3);

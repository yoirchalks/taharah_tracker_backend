/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Options` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `location` to the `Options` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Options" ADD COLUMN     "location" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Options_userId_key" ON "Options"("userId");

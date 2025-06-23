/*
  Warnings:

  - Added the required column `locationCode` to the `Periods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Periods" ADD COLUMN     "locationCode" TEXT NOT NULL;

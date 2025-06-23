/*
  Warnings:

  - Changed the type of `locationCode` on the `Periods` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Periods" DROP COLUMN "locationCode",
ADD COLUMN     "locationCode" INTEGER NOT NULL;

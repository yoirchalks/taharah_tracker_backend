/*
  Warnings:

  - You are about to drop the column `input_dateTime` on the `Periods` table. All the data in the column will be lost.
  - Added the required column `period_dateTime` to the `Periods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Periods" DROP COLUMN "input_dateTime",
ADD COLUMN     "period_dateTime" TIMESTAMP(3) NOT NULL;

/*
  Warnings:

  - You are about to drop the column `input_date` on the `Periods` table. All the data in the column will be lost.
  - Added the required column `input_dateTime` to the `Periods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Periods" DROP COLUMN "input_date",
ADD COLUMN     "input_dateTime" TIMESTAMP(3) NOT NULL;

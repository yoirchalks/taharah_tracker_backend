/*
  Warnings:

  - You are about to drop the column `input_date_time` on the `Periods` table. All the data in the column will be lost.
  - Added the required column `input_date` to the `Periods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Periods" DROP COLUMN "input_date_time",
ADD COLUMN     "input_date" TEXT NOT NULL;

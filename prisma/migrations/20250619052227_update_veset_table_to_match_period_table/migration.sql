/*
  Warnings:

  - You are about to drop the column `expectedDateTime` on the `PotentialVesets` table. All the data in the column will be lost.
  - Added the required column `expectedDate` to the `PotentialVesets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PotentialVesets" DROP COLUMN "expectedDateTime",
ADD COLUMN     "expectedDate" TEXT NOT NULL;

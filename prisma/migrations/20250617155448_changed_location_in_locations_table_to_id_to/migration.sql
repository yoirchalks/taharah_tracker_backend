/*
  Warnings:

  - You are about to drop the column `alerts` on the `Options` table. All the data in the column will be lost.
  - Added the required column `receiveAlerts` to the `Options` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Locations" ADD CONSTRAINT "Locations_pkey" PRIMARY KEY ("location");

-- AlterTable
ALTER TABLE "Options" DROP COLUMN "alerts",
ADD COLUMN     "receiveAlerts" BOOLEAN NOT NULL;

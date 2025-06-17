/*
  Warnings:

  - Changed the type of `type` on the `Periods` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PeriodType" AS ENUM ('period', 'staining', 'birth', 'miscarriage');

-- AlterTable
ALTER TABLE "Periods" DROP COLUMN "type",
ADD COLUMN     "type" "PeriodType" NOT NULL;

-- DropEnum
DROP TYPE "Type";

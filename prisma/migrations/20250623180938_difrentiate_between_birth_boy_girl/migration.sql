/*
  Warnings:

  - The values [birth] on the enum `PeriodType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PeriodType_new" AS ENUM ('period', 'staining', 'birthBoy', 'birthGirl', 'miscarriage');
ALTER TABLE "Periods" ALTER COLUMN "type" TYPE "PeriodType_new" USING ("type"::text::"PeriodType_new");
ALTER TYPE "PeriodType" RENAME TO "PeriodType_old";
ALTER TYPE "PeriodType_new" RENAME TO "PeriodType";
DROP TYPE "PeriodType_old";
COMMIT;

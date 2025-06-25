/*
  Warnings:

  - The values [fiveDays] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('tahor', 'beforeHefsek', 'tomei', 'afterBirth', 'sevenClean');
ALTER TABLE "Users" ALTER COLUMN "currentStatus" DROP DEFAULT;
ALTER TABLE "Users" ALTER COLUMN "currentStatus" TYPE "Status_new" USING ("currentStatus"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Users" ALTER COLUMN "currentStatus" SET DEFAULT 'tahor';
COMMIT;

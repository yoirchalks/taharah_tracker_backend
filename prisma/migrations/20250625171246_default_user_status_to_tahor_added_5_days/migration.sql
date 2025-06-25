-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'fiveDays';

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "currentStatus" SET DEFAULT 'tahor';

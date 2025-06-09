/*
  Warnings:

  - The values [CHODESH,HAFLAGA,BEINONI] on the enum `VesetType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email_hash]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email_encrypt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email_hash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email_iv` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email_tag` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_encrypt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_iv` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_tag` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Type" ADD VALUE 'miscarriage';

-- AlterEnum
BEGIN;
CREATE TYPE "VesetType_new" AS ENUM ('chodesh', 'haflaga', 'beinoni');
ALTER TABLE "PotentialVeset" ALTER COLUMN "type" TYPE "VesetType_new" USING ("type"::text::"VesetType_new");
ALTER TYPE "VesetType" RENAME TO "VesetType_old";
ALTER TYPE "VesetType_new" RENAME TO "VesetType";
DROP TYPE "VesetType_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "email_encrypt" TEXT NOT NULL,
ADD COLUMN     "email_hash" TEXT NOT NULL,
ADD COLUMN     "email_iv" TEXT NOT NULL,
ADD COLUMN     "email_tag" TEXT NOT NULL,
ADD COLUMN     "name_encrypt" TEXT NOT NULL,
ADD COLUMN     "name_iv" TEXT NOT NULL,
ADD COLUMN     "name_tag" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Location" (
    "location" TEXT NOT NULL,
    "code" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_code_key" ON "Location"("code");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_hash_key" ON "User"("email_hash");

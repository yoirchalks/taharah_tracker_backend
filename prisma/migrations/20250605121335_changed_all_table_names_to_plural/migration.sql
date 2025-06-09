/*
  Warnings:

  - You are about to drop the `FixedVeset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Period` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PotentialVeset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FixedVeset" DROP CONSTRAINT "FixedVeset_period1Id_fkey";

-- DropForeignKey
ALTER TABLE "FixedVeset" DROP CONSTRAINT "FixedVeset_period2Id_fkey";

-- DropForeignKey
ALTER TABLE "FixedVeset" DROP CONSTRAINT "FixedVeset_period3Id_fkey";

-- DropForeignKey
ALTER TABLE "FixedVeset" DROP CONSTRAINT "FixedVeset_userId_fkey";

-- DropForeignKey
ALTER TABLE "Options" DROP CONSTRAINT "Options_userId_fkey";

-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_userId_fkey";

-- DropForeignKey
ALTER TABLE "Period" DROP CONSTRAINT "Period_userId_fkey";

-- DropForeignKey
ALTER TABLE "PotentialVeset" DROP CONSTRAINT "PotentialVeset_periodId_fkey";

-- DropForeignKey
ALTER TABLE "PotentialVeset" DROP CONSTRAINT "PotentialVeset_userId_fkey";

-- DropTable
DROP TABLE "FixedVeset";

-- DropTable
DROP TABLE "Period";

-- DropTable
DROP TABLE "PotentialVeset";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name_encrypt" TEXT NOT NULL,
    "name_iv" TEXT NOT NULL,
    "name_tag" TEXT NOT NULL,
    "email_encrypt" TEXT NOT NULL,
    "email_iv" TEXT NOT NULL,
    "email_tag" TEXT NOT NULL,
    "email_hash" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Periods" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "input_date_time" TIMESTAMP(3) NOT NULL,
    "hebrew_day" INTEGER NOT NULL,
    "hebrew_month" INTEGER NOT NULL,
    "hebrew_year" INTEGER NOT NULL,
    "onah" "Onah" NOT NULL,
    "type" "Type" NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Periods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PotentialVesets" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "VesetType" NOT NULL,
    "periodId" INTEGER NOT NULL,
    "expectedDateTime" TIMESTAMP(3) NOT NULL,
    "onah" "Onah" NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PotentialVesets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FixedVesets" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "period1Id" INTEGER NOT NULL,
    "period2Id" INTEGER NOT NULL,
    "period3Id" INTEGER NOT NULL,
    "expectedDate" TIMESTAMP(3) NOT NULL,
    "onah" "Onah" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FixedVesets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_hash_key" ON "Users"("email_hash");

-- CreateIndex
CREATE UNIQUE INDEX "FixedVesets_userId_key" ON "FixedVesets"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FixedVesets_period1Id_key" ON "FixedVesets"("period1Id");

-- CreateIndex
CREATE UNIQUE INDEX "FixedVesets_period2Id_key" ON "FixedVesets"("period2Id");

-- CreateIndex
CREATE UNIQUE INDEX "FixedVesets_period3Id_key" ON "FixedVesets"("period3Id");

-- AddForeignKey
ALTER TABLE "Options" ADD CONSTRAINT "Options_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Periods" ADD CONSTRAINT "Periods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PotentialVesets" ADD CONSTRAINT "PotentialVesets_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PotentialVesets" ADD CONSTRAINT "PotentialVesets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixedVesets" ADD CONSTRAINT "FixedVesets_period1Id_fkey" FOREIGN KEY ("period1Id") REFERENCES "Periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixedVesets" ADD CONSTRAINT "FixedVesets_period2Id_fkey" FOREIGN KEY ("period2Id") REFERENCES "Periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixedVesets" ADD CONSTRAINT "FixedVesets_period3Id_fkey" FOREIGN KEY ("period3Id") REFERENCES "Periods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixedVesets" ADD CONSTRAINT "FixedVesets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

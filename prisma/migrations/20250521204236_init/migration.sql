-- CreateEnum
CREATE TYPE "Onah" AS ENUM ('day', 'night');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('period', 'staining', 'birth');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('paypal', 'bankTransfer', 'card');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('success', 'fail', 'pending', 'cancelled');

-- CreateEnum
CREATE TYPE "VesetType" AS ENUM ('CHODESH', 'HAFLAGA', 'BEINONI');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Options" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "Options_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Period" (
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

    CONSTRAINT "Period_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "provider" TEXT,
    "providerRef" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PotentialVeset" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "VesetType" NOT NULL,
    "periodId" INTEGER NOT NULL,
    "expectedDateTime" TIMESTAMP(3) NOT NULL,
    "onah" "Onah" NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PotentialVeset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FixedVeset" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "period1Id" INTEGER NOT NULL,
    "period2Id" INTEGER NOT NULL,
    "period3Id" INTEGER NOT NULL,
    "expectedDate" TIMESTAMP(3) NOT NULL,
    "onah" "Onah" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FixedVeset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FixedVeset_userId_key" ON "FixedVeset"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FixedVeset_period1Id_key" ON "FixedVeset"("period1Id");

-- CreateIndex
CREATE UNIQUE INDEX "FixedVeset_period2Id_key" ON "FixedVeset"("period2Id");

-- CreateIndex
CREATE UNIQUE INDEX "FixedVeset_period3Id_key" ON "FixedVeset"("period3Id");

-- AddForeignKey
ALTER TABLE "Options" ADD CONSTRAINT "Options_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Period" ADD CONSTRAINT "Period_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PotentialVeset" ADD CONSTRAINT "PotentialVeset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PotentialVeset" ADD CONSTRAINT "PotentialVeset_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixedVeset" ADD CONSTRAINT "FixedVeset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixedVeset" ADD CONSTRAINT "FixedVeset_period1Id_fkey" FOREIGN KEY ("period1Id") REFERENCES "Period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixedVeset" ADD CONSTRAINT "FixedVeset_period2Id_fkey" FOREIGN KEY ("period2Id") REFERENCES "Period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixedVeset" ADD CONSTRAINT "FixedVeset_period3Id_fkey" FOREIGN KEY ("period3Id") REFERENCES "Period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

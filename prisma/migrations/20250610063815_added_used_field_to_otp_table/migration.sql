/*
  Warnings:

  - You are about to drop the `Otp` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Otp" DROP CONSTRAINT "Otp_userId_fkey";

-- DropTable
DROP TABLE "Otp";

-- CreateTable
CREATE TABLE "Otps" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "OTP" TEXT NOT NULL,
    "iat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "used" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Otps_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Otps" ADD CONSTRAINT "Otps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

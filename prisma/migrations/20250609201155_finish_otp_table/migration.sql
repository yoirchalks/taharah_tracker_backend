/*
  Warnings:

  - You are about to drop the `OneTimePassword` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "OneTimePassword";

-- CreateTable
CREATE TABLE "OneTimePasswords" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "OTP" TEXT NOT NULL,

    CONSTRAINT "OneTimePasswords_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OneTimePasswords" ADD CONSTRAINT "OneTimePasswords_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

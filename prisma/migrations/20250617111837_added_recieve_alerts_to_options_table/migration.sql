/*
  Warnings:

  - Added the required column `alerts` to the `Options` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Options" ADD COLUMN     "alerts" BOOLEAN NOT NULL;

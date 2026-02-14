/*
  Warnings:

  - You are about to drop the column `isReviewed` on the `reviews` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "isReviewed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "isReviewed";

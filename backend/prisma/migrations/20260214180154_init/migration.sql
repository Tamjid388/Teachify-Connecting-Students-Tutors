/*
  Warnings:

  - You are about to drop the column `bookingId` on the `reviews` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[booking_id]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `booking_id` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_bookingId_fkey";

-- DropIndex
DROP INDEX "reviews_bookingId_key";

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "bookingId",
ADD COLUMN     "booking_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "reviews_booking_id_key" ON "reviews"("booking_id");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_booking_id_fkey" FOREIGN KEY ("booking_id") REFERENCES "bookings"("booking_id") ON DELETE RESTRICT ON UPDATE CASCADE;

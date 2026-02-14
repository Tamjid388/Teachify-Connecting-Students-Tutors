/*
  Warnings:

  - You are about to drop the column `bookingId` on the `availability_slots` table. All the data in the column will be lost.
  - Made the column `slotId` on table `bookings` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "availability_slots" DROP CONSTRAINT "availability_slots_bookingId_fkey";

-- DropIndex
DROP INDEX "availability_slots_bookingId_key";

-- AlterTable
ALTER TABLE "availability_slots" DROP COLUMN "bookingId",
ALTER COLUMN "startTime" SET DATA TYPE TEXT,
ALTER COLUMN "endTime" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "bookings" ALTER COLUMN "slotId" SET NOT NULL;

-- CreateIndex
CREATE INDEX "availability_slots_tutorId_idx" ON "availability_slots"("tutorId");

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "availability_slots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

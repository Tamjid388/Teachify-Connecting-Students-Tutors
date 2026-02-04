-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "slotId" TEXT;

-- CreateTable
CREATE TABLE "availability_slots" (
    "id" TEXT NOT NULL,
    "tutorId" TEXT NOT NULL,
    "day" "DayOfWeek" NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bookingId" TEXT,

    CONSTRAINT "availability_slots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "availability_slots_bookingId_key" ON "availability_slots"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "availability_slots_tutorId_day_startTime_endTime_key" ON "availability_slots"("tutorId", "day", "startTime", "endTime");

-- AddForeignKey
ALTER TABLE "availability_slots" ADD CONSTRAINT "availability_slots_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "tutors"("tutor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "availability_slots" ADD CONSTRAINT "availability_slots_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("booking_id") ON DELETE SET NULL ON UPDATE CASCADE;

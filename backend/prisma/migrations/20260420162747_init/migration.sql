/*
  Warnings:

  - You are about to drop the column `paymentStatus` on the `bookings` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentRecordStatus" AS ENUM ('PENDING', 'SUCCEEDED', 'FAILED', 'REFUNDED');

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "paymentStatus";

-- DropEnum
DROP TYPE "PaymentStatus";

-- CreateTable
CREATE TABLE "payments" (
    "stripeEventId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "status" "PaymentRecordStatus" NOT NULL DEFAULT 'PENDING',
    "stripeCheckoutSessionId" TEXT,
    "amountCents" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'usd',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("stripeEventId")
);

-- CreateIndex
CREATE UNIQUE INDEX "payments_bookingId_key" ON "payments"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_stripeCheckoutSessionId_key" ON "payments"("stripeCheckoutSessionId");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("booking_id") ON DELETE CASCADE ON UPDATE CASCADE;

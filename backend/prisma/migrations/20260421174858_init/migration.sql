/*
  Warnings:

  - The values [PENDING,SUCCEEDED] on the enum `PaymentRecordStatus` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `payments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `amountCents` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `payments` table. All the data in the column will be lost.
  - The required column `id` was added to the `payments` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentRecordStatus_new" AS ENUM ('PAID', 'UNPAID', 'FAILED', 'REFUNDED');
ALTER TABLE "public"."payments" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "payments" ALTER COLUMN "status" TYPE "PaymentRecordStatus_new" USING ("status"::text::"PaymentRecordStatus_new");
ALTER TYPE "PaymentRecordStatus" RENAME TO "PaymentRecordStatus_old";
ALTER TYPE "PaymentRecordStatus_new" RENAME TO "PaymentRecordStatus";
DROP TYPE "public"."PaymentRecordStatus_old";
ALTER TABLE "payments" ALTER COLUMN "status" SET DEFAULT 'UNPAID';
COMMIT;

-- AlterTable
ALTER TABLE "payments" DROP CONSTRAINT "payments_pkey",
DROP COLUMN "amountCents",
DROP COLUMN "currency",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'UNPAID',
ADD CONSTRAINT "payments_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "payments_bookingId_idx" ON "payments"("bookingId");

-- CreateIndex
CREATE INDEX "payments_transactionId_idx" ON "payments"("transactionId");

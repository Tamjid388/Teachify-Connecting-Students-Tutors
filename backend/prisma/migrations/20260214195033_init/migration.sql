/*
  Warnings:

  - You are about to drop the column `rating` on the `tutors` table. All the data in the column will be lost.
  - You are about to drop the column `total_reviews` on the `tutors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tutors" DROP COLUMN "rating",
DROP COLUMN "total_reviews";

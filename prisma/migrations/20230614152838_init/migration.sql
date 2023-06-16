/*
  Warnings:

  - You are about to drop the column `author` on the `Sticky` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Sticky" DROP COLUMN "author",
ALTER COLUMN "priority" SET DEFAULT 0;

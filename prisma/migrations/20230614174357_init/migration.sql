/*
  Warnings:

  - The primary key for the `Sticky` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `color` on the `Sticky` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `Sticky` table. All the data in the column will be lost.
  - You are about to drop the column `isArchived` on the `Sticky` table. All the data in the column will be lost.
  - You are about to drop the column `isDone` on the `Sticky` table. All the data in the column will be lost.
  - You are about to drop the column `isPinned` on the `Sticky` table. All the data in the column will be lost.
  - You are about to drop the column `reminder` on the `Sticky` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `Sticky` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Sticky` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Sticky` table. All the data in the column will be lost.
  - The `id` column on the `Sticky` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Tag` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Tag` table. All the data in the column will be lost.
  - The `id` column on the `Tag` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sticky_user_id_fkey` to the `Sticky` table without a default value. This is not possible if the table is not empty.
  - Made the column `priority` on table `Sticky` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `tag_user_id_fkey` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Sticky" DROP CONSTRAINT "Sticky_tagId_fkey";

-- DropForeignKey
ALTER TABLE "Sticky" DROP CONSTRAINT "Sticky_userId_fkey";

-- AlterTable
ALTER TABLE "Sticky" DROP CONSTRAINT "Sticky_pkey",
DROP COLUMN "color",
DROP COLUMN "dueDate",
DROP COLUMN "isArchived",
DROP COLUMN "isDone",
DROP COLUMN "isPinned",
DROP COLUMN "reminder",
DROP COLUMN "tagId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "sticky_user_id_fkey" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "priority" SET NOT NULL,
ALTER COLUMN "priority" DROP DEFAULT,
ALTER COLUMN "priority" SET DATA TYPE TEXT,
ADD CONSTRAINT "Sticky_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "tag_user_id_fkey" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Tag_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "name",
ADD COLUMN     "username" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "_StickyTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_StickyTags_AB_unique" ON "_StickyTags"("A", "B");

-- CreateIndex
CREATE INDEX "_StickyTags_B_index" ON "_StickyTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Sticky" ADD CONSTRAINT "Sticky_sticky_user_id_fkey_fkey" FOREIGN KEY ("sticky_user_id_fkey") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_tag_user_id_fkey_fkey" FOREIGN KEY ("tag_user_id_fkey") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StickyTags" ADD CONSTRAINT "_StickyTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Sticky"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StickyTags" ADD CONSTRAINT "_StickyTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

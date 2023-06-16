/*
  Warnings:

  - You are about to drop the column `TagId` on the `Sticky` table. All the data in the column will be lost.
  - You are about to drop the column `isDaily` on the `Sticky` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Sticky` table. All the data in the column will be lost.
  - You are about to drop the column `taskId` on the `Sticky` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Daily` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_stickyId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Daily" DROP CONSTRAINT "Daily_stickyId_fkey";

-- DropForeignKey
ALTER TABLE "Daily" DROP CONSTRAINT "Daily_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sticky" DROP CONSTRAINT "Sticky_TagId_fkey";

-- DropForeignKey
ALTER TABLE "Sticky" DROP CONSTRAINT "Sticky_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_userId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_userId_fkey";

-- AlterTable
ALTER TABLE "Sticky" DROP COLUMN "TagId",
DROP COLUMN "isDaily",
DROP COLUMN "tags",
DROP COLUMN "taskId",
ADD COLUMN     "tagId" TEXT;

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "name",
DROP COLUMN "userId",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Daily";

-- DropTable
DROP TABLE "Task";

-- AddForeignKey
ALTER TABLE "Sticky" ADD CONSTRAINT "Sticky_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

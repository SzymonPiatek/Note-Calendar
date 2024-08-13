/*
  Warnings:

  - You are about to drop the column `levelId` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `statusId` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the `NoteLevel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NoteStatus` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `level` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_levelId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_statusId_fkey";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "levelId",
DROP COLUMN "statusId",
ADD COLUMN     "level" INTEGER NOT NULL,
ADD COLUMN     "status" INTEGER NOT NULL;

-- DropTable
DROP TABLE "NoteLevel";

-- DropTable
DROP TABLE "NoteStatus";

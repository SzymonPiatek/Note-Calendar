/*
  Warnings:

  - Added the required column `levelId` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "levelId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "NoteLevel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NoteLevel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NoteLevel_name_key" ON "NoteLevel"("name");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "NoteLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

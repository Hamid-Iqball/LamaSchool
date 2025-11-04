/*
  Warnings:

  - You are about to drop the column `dueTime` on the `Assignment` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Exam` table. All the data in the column will be lost.
  - Added the required column `dueDate` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assignment" DROP COLUMN "dueTime",
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "endDate",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL;

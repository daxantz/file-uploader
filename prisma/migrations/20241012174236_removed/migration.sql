/*
  Warnings:

  - You are about to drop the column `destination` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `filename` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `mimetype` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `File` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "destination",
DROP COLUMN "filename",
DROP COLUMN "mimetype",
DROP COLUMN "path";

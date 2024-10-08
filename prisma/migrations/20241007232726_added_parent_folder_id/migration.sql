-- AlterTable
ALTER TABLE "File" ADD COLUMN     "parentFolderId" INTEGER;

-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "parentFolderId" INTEGER;

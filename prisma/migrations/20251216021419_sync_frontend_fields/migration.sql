/*
  Warnings:

  - You are about to drop the column `description` on the `task` table. All the data in the column will be lost.
  - Added the required column `text` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `task` DROP COLUMN `description`,
    ADD COLUMN `author` VARCHAR(191) NULL,
    ADD COLUMN `completed` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `text` VARCHAR(191) NOT NULL;

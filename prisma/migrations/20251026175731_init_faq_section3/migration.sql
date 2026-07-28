/*
  Warnings:

  - You are about to drop the column `overlayColor` on the `faqimage` table. All the data in the column will be lost.
  - You are about to drop the column `overlayPosition` on the `faqimage` table. All the data in the column will be lost.
  - You are about to drop the column `overlaySubtext` on the `faqimage` table. All the data in the column will be lost.
  - You are about to drop the column `overlayText` on the `faqimage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `faqimage` DROP COLUMN `overlayColor`,
    DROP COLUMN `overlayPosition`,
    DROP COLUMN `overlaySubtext`,
    DROP COLUMN `overlayText`,
    ADD COLUMN `marginTop` VARCHAR(191) NULL,
    ADD COLUMN `maxWidth` VARCHAR(191) NULL DEFAULT '280px',
    ADD COLUMN `zIndex` INTEGER NULL DEFAULT 10;

-- CreateTable
CREATE TABLE `FaqStat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL DEFAULT '#3b5d50',
    `order` INTEGER NOT NULL DEFAULT 0,
    `faqSectionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FaqStat` ADD CONSTRAINT `FaqStat_faqSectionId_fkey` FOREIGN KEY (`faqSectionId`) REFERENCES `FaqSection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

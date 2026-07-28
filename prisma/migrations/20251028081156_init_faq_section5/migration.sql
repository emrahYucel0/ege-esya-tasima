/*
  Warnings:

  - You are about to drop the column `marginTop` on the `faqimage` table. All the data in the column will be lost.
  - You are about to drop the column `maxWidth` on the `faqimage` table. All the data in the column will be lost.
  - You are about to drop the column `zIndex` on the `faqimage` table. All the data in the column will be lost.
  - You are about to drop the `faqstat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `faqdetail` DROP FOREIGN KEY `FaqDetail_faqItemId_fkey`;

-- DropForeignKey
ALTER TABLE `faqimage` DROP FOREIGN KEY `FaqImage_faqSectionId_fkey`;

-- DropForeignKey
ALTER TABLE `faqitem` DROP FOREIGN KEY `FaqItem_faqSectionId_fkey`;

-- DropForeignKey
ALTER TABLE `faqstat` DROP FOREIGN KEY `FaqStat_faqSectionId_fkey`;

-- DropIndex
DROP INDEX `FaqDetail_faqItemId_fkey` ON `faqdetail`;

-- DropIndex
DROP INDEX `FaqImage_faqSectionId_fkey` ON `faqimage`;

-- DropIndex
DROP INDEX `FaqItem_faqSectionId_fkey` ON `faqitem`;

-- AlterTable
ALTER TABLE `faqimage` DROP COLUMN `marginTop`,
    DROP COLUMN `maxWidth`,
    DROP COLUMN `zIndex`;

-- AlterTable
ALTER TABLE `faqitem` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE `faqstat`;

-- CreateTable
CREATE TABLE `FaqStatsCard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `bgColor` VARCHAR(191) NOT NULL DEFAULT '#3b5d50',
    `textColor` VARCHAR(191) NOT NULL DEFAULT '#ffffff',
    `position` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `faqSectionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FaqItem` ADD CONSTRAINT `FaqItem_faqSectionId_fkey` FOREIGN KEY (`faqSectionId`) REFERENCES `FaqSection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FaqDetail` ADD CONSTRAINT `FaqDetail_faqItemId_fkey` FOREIGN KEY (`faqItemId`) REFERENCES `FaqItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FaqStatsCard` ADD CONSTRAINT `FaqStatsCard_faqSectionId_fkey` FOREIGN KEY (`faqSectionId`) REFERENCES `FaqSection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FaqImage` ADD CONSTRAINT `FaqImage_faqSectionId_fkey` FOREIGN KEY (`faqSectionId`) REFERENCES `FaqSection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

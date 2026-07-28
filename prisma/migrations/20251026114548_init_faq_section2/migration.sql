/*
  Warnings:

  - You are about to drop the `faqstatistic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `faqdetail` DROP FOREIGN KEY `FaqDetail_faqItemId_fkey`;

-- DropForeignKey
ALTER TABLE `faqstatistic` DROP FOREIGN KEY `FaqStatistic_faqSectionId_fkey`;

-- DropIndex
DROP INDEX `FaqDetail_faqItemId_fkey` ON `faqdetail`;

-- AlterTable
ALTER TABLE `faqsection` MODIFY `ctaTitle` VARCHAR(191) NULL DEFAULT 'Başka sorunuz mu var?';

-- DropTable
DROP TABLE `faqstatistic`;

-- CreateTable
CREATE TABLE `FaqImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imagePath` VARCHAR(191) NOT NULL,
    `altText` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `overlayText` VARCHAR(191) NULL,
    `overlaySubtext` VARCHAR(191) NULL,
    `overlayPosition` VARCHAR(191) NULL,
    `overlayColor` VARCHAR(191) NULL DEFAULT '#3b5d50',
    `faqSectionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FaqDetail` ADD CONSTRAINT `FaqDetail_faqItemId_fkey` FOREIGN KEY (`faqItemId`) REFERENCES `FaqItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FaqImage` ADD CONSTRAINT `FaqImage_faqSectionId_fkey` FOREIGN KEY (`faqSectionId`) REFERENCES `FaqSection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

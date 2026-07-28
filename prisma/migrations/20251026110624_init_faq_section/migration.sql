/*
  Warnings:

  - You are about to drop the column `createdAt` on the `faqitem` table. All the data in the column will be lost.
  - You are about to drop the column `faqId` on the `faqitem` table. All the data in the column will be lost.
  - You are about to drop the column `open` on the `faqitem` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `faqitem` table. All the data in the column will be lost.
  - You are about to drop the `faq` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `faqSectionId` to the `FaqItem` table without a default value. This is not possible if the table is not empty.
  - Made the column `question` on table `faqitem` required. This step will fail if there are existing NULL values in that column.
  - Made the column `answer` on table `faqitem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `faqitem` DROP FOREIGN KEY `FaqItem_faqId_fkey`;

-- DropIndex
DROP INDEX `FaqItem_faqId_fkey` ON `faqitem`;

-- AlterTable
ALTER TABLE `faqitem` DROP COLUMN `createdAt`,
    DROP COLUMN `faqId`,
    DROP COLUMN `open`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `faqSectionId` INTEGER NOT NULL,
    ADD COLUMN `order` INTEGER NOT NULL DEFAULT 0,
    MODIFY `question` VARCHAR(191) NOT NULL,
    MODIFY `answer` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `faq`;

-- CreateTable
CREATE TABLE `FaqSection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sectionName` VARCHAR(191) NOT NULL DEFAULT 'faq-section',
    `mainTitle` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `ctaTitle` VARCHAR(191) NULL,
    `ctaButtonText` VARCHAR(191) NULL DEFAULT 'Bize Ulaşın',
    `ctaButtonLink` VARCHAR(191) NULL DEFAULT '/iletisim',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `FaqSection_sectionName_key`(`sectionName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FaqDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `faqItemId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FaqStatistic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imagePath` VARCHAR(191) NOT NULL,
    `altText` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `faqSectionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FaqItem` ADD CONSTRAINT `FaqItem_faqSectionId_fkey` FOREIGN KEY (`faqSectionId`) REFERENCES `FaqSection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FaqDetail` ADD CONSTRAINT `FaqDetail_faqItemId_fkey` FOREIGN KEY (`faqItemId`) REFERENCES `FaqItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FaqStatistic` ADD CONSTRAINT `FaqStatistic_faqSectionId_fkey` FOREIGN KEY (`faqSectionId`) REFERENCES `FaqSection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

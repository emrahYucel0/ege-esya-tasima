/*
  Warnings:

  - You are about to drop the `fact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `factstatistic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `factstatistic` DROP FOREIGN KEY `FactStatistic_factId_fkey`;

-- DropTable
DROP TABLE `fact`;

-- DropTable
DROP TABLE `factstatistic`;

-- CreateTable
CREATE TABLE `WeHelpSection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sectionName` VARCHAR(191) NOT NULL DEFAULT 'we-help-section',
    `mainTitle` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `buttonText` VARCHAR(191) NULL DEFAULT 'Hizmetlerimizi İnceleyin',
    `buttonLink` VARCHAR(191) NULL DEFAULT '/hizmetlerimiz',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `WeHelpSection_sectionName_key`(`sectionName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WeHelpFeature` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `weHelpSectionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WeHelpImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imagePath` VARCHAR(191) NOT NULL,
    `altText` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `weHelpSectionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WeHelpFeature` ADD CONSTRAINT `WeHelpFeature_weHelpSectionId_fkey` FOREIGN KEY (`weHelpSectionId`) REFERENCES `WeHelpSection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WeHelpImage` ADD CONSTRAINT `WeHelpImage_weHelpSectionId_fkey` FOREIGN KEY (`weHelpSectionId`) REFERENCES `WeHelpSection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

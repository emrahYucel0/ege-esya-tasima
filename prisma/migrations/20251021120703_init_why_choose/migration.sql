/*
  Warnings:

  - You are about to drop the `choose_features` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `chooses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `choose_features` DROP FOREIGN KEY `choose_features_chooseId_fkey`;

-- DropTable
DROP TABLE `choose_features`;

-- DropTable
DROP TABLE `chooses`;

-- CreateTable
CREATE TABLE `WhyChooseSection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sectionName` VARCHAR(191) NOT NULL DEFAULT 'why-choose-us',
    `title` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `closingText` VARCHAR(191) NULL,
    `imagePath` VARCHAR(191) NULL,
    `imageAlt` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `WhyChooseSection_sectionName_key`(`sectionName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WhyChooseFeature` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `iconPath` VARCHAR(191) NULL,
    `iconAlt` VARCHAR(191) NULL,
    `title` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `whyChooseSectionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WhyChooseFeature` ADD CONSTRAINT `WhyChooseFeature_whyChooseSectionId_fkey` FOREIGN KEY (`whyChooseSectionId`) REFERENCES `WhyChooseSection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

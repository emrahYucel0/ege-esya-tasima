/*
  Warnings:

  - You are about to drop the `about` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `about`;

-- CreateTable
CREATE TABLE `AboutSection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sectionName` VARCHAR(191) NOT NULL DEFAULT 'about-section',
    `mainTitle` VARCHAR(191) NOT NULL,
    `description1` VARCHAR(191) NOT NULL,
    `description2` VARCHAR(191) NOT NULL,
    `description3` VARCHAR(191) NOT NULL,
    `teamImage` VARCHAR(191) NOT NULL,
    `teamImageAlt` VARCHAR(191) NOT NULL,
    `historyTitle` VARCHAR(191) NOT NULL,
    `historyText1` VARCHAR(191) NOT NULL,
    `historyText2` VARCHAR(191) NOT NULL,
    `historyText3` VARCHAR(191) NOT NULL,
    `seoTitle` VARCHAR(191) NOT NULL,
    `seoDescription` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AboutSection_sectionName_key`(`sectionName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AboutService` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `iconPath` VARCHAR(191) NOT NULL,
    `iconAlt` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `aboutSectionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AboutStat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `aboutSectionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AboutService` ADD CONSTRAINT `AboutService_aboutSectionId_fkey` FOREIGN KEY (`aboutSectionId`) REFERENCES `AboutSection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AboutStat` ADD CONSTRAINT `AboutStat_aboutSectionId_fkey` FOREIGN KEY (`aboutSectionId`) REFERENCES `AboutSection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

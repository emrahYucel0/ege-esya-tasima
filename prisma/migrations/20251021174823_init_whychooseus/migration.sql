/*
  Warnings:

  - You are about to drop the `whychoosefeature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `whychoosesection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `whychoosefeature` DROP FOREIGN KEY `WhyChooseFeature_whyChooseSectionId_fkey`;

-- DropTable
DROP TABLE `whychoosefeature`;

-- DropTable
DROP TABLE `whychoosesection`;

-- CreateTable
CREATE TABLE `WhyChooseUs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sectionName` VARCHAR(191) NOT NULL DEFAULT 'why-choose-us',
    `mainTitle` VARCHAR(191) NOT NULL,
    `shortDescription` VARCHAR(191) NULL,
    `closingStatement` VARCHAR(191) NULL,
    `mainImage` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `WhyChooseUs_sectionName_key`(`sectionName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WhyChooseUsFeature` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `iconPath` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `whyChooseUsId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WhyChooseUsFeature` ADD CONSTRAINT `WhyChooseUsFeature_whyChooseUsId_fkey` FOREIGN KEY (`whyChooseUsId`) REFERENCES `WhyChooseUs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `sectionName` on the `pricingplan` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `pricingplan` table. All the data in the column will be lost.
  - You are about to drop the `advancedplan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `advancedplantype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `basicplan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `basicplantype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `standardplan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `standardplantype` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `buttonLink` to the `PricingPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buttonText` to the `PricingPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `PricingPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `PricingPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricingSectionId` to the `PricingPlan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `advancedplan` DROP FOREIGN KEY `AdvancedPlan_pricingPlanId_fkey`;

-- DropForeignKey
ALTER TABLE `advancedplantype` DROP FOREIGN KEY `AdvancedPlanType_advancedPlanId_fkey`;

-- DropForeignKey
ALTER TABLE `basicplan` DROP FOREIGN KEY `BasicPlan_pricingPlanId_fkey`;

-- DropForeignKey
ALTER TABLE `basicplantype` DROP FOREIGN KEY `BasicPlanType_basicPlanId_fkey`;

-- DropForeignKey
ALTER TABLE `standardplan` DROP FOREIGN KEY `StandardPlan_pricingPlanId_fkey`;

-- DropForeignKey
ALTER TABLE `standardplantype` DROP FOREIGN KEY `StandardPlanType_standardPlanId_fkey`;

-- DropIndex
DROP INDEX `PricingPlan_sectionName_key` ON `pricingplan`;

-- AlterTable
ALTER TABLE `pricingplan` DROP COLUMN `sectionName`,
    DROP COLUMN `title`,
    ADD COLUMN `buttonAriaLabel` VARCHAR(191) NULL,
    ADD COLUMN `buttonLink` VARCHAR(191) NOT NULL,
    ADD COLUMN `buttonText` VARCHAR(191) NOT NULL,
    ADD COLUMN `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isPopular` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `order` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `price` VARCHAR(191) NOT NULL,
    ADD COLUMN `priceSuffix` VARCHAR(191) NULL DEFAULT '/başlangıç',
    ADD COLUMN `pricingSectionId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `advancedplan`;

-- DropTable
DROP TABLE `advancedplantype`;

-- DropTable
DROP TABLE `basicplan`;

-- DropTable
DROP TABLE `basicplantype`;

-- DropTable
DROP TABLE `standardplan`;

-- DropTable
DROP TABLE `standardplantype`;

-- CreateTable
CREATE TABLE `PricingSection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sectionName` VARCHAR(191) NOT NULL DEFAULT 'pricing-section',
    `mainTitle` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PricingSection_sectionName_key`(`sectionName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PricingFeature` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(191) NOT NULL,
    `isIncluded` BOOLEAN NOT NULL DEFAULT true,
    `order` INTEGER NOT NULL DEFAULT 0,
    `pricingPlanId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PricingPlan` ADD CONSTRAINT `PricingPlan_pricingSectionId_fkey` FOREIGN KEY (`pricingSectionId`) REFERENCES `PricingSection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PricingFeature` ADD CONSTRAINT `PricingFeature_pricingPlanId_fkey` FOREIGN KEY (`pricingPlanId`) REFERENCES `PricingPlan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

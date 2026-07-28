/*
  Warnings:

  - You are about to drop the column `blockquote` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `sectionName` on the `service` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `service` table. All the data in the column will be lost.
  - You are about to drop the `servicecard` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `imagePath` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servicesId` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `service` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `servicecard` DROP FOREIGN KEY `ServiceCard_serviceId_fkey`;

-- DropIndex
DROP INDEX `Service_sectionName_key` ON `service`;

-- AlterTable
ALTER TABLE `service` DROP COLUMN `blockquote`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `sectionName`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `imagePath` VARCHAR(191) NOT NULL,
    ADD COLUMN `order` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `servicesId` INTEGER NOT NULL,
    MODIFY `title` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `servicecard`;

-- CreateTable
CREATE TABLE `Services` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sectionName` VARCHAR(191) NOT NULL DEFAULT 'services',
    `mainTitle` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `buttonText` VARCHAR(191) NULL DEFAULT 'Tüm Hizmetler',
    `buttonLink` VARCHAR(191) NULL DEFAULT '/hizmetlerimiz',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Services_sectionName_key`(`sectionName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Statistic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `iconPath` VARCHAR(191) NULL,
    `value` VARCHAR(191) NOT NULL,
    `label1` VARCHAR(191) NOT NULL,
    `label2` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `servicesId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_servicesId_fkey` FOREIGN KEY (`servicesId`) REFERENCES `Services`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Statistic` ADD CONSTRAINT `Statistic_servicesId_fkey` FOREIGN KEY (`servicesId`) REFERENCES `Services`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

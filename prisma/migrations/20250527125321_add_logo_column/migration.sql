/*
  Warnings:

  - You are about to drop the column `phone` on the `navbar` table. All the data in the column will be lost.
  - You are about to drop the column `subtitle` on the `navbar` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `navbar` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `navbar` DROP COLUMN `phone`,
    DROP COLUMN `subtitle`,
    DROP COLUMN `title`,
    ADD COLUMN `logo` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `NavbarSocialLink` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `url` VARCHAR(191) NULL,
    `navbarId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NavbarContacts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phone` VARCHAR(191) NULL,
    `mail` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `navbarId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `NavbarSocialLink` ADD CONSTRAINT `NavbarSocialLink_navbarId_fkey` FOREIGN KEY (`navbarId`) REFERENCES `Navbar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NavbarContacts` ADD CONSTRAINT `NavbarContacts_navbarId_fkey` FOREIGN KEY (`navbarId`) REFERENCES `Navbar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

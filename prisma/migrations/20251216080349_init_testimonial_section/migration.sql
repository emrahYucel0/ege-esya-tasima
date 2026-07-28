/*
  Warnings:

  - You are about to drop the column `createdAt` on the `testimonial` table. All the data in the column will be lost.
  - You are about to drop the column `sectionName` on the `testimonial` table. All the data in the column will be lost.
  - You are about to drop the column `subtitle` on the `testimonial` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `testimonial` table. All the data in the column will be lost.
  - You are about to drop the `testimonialdetail` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `comment` to the `Testimonial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `Testimonial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Testimonial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceType` to the `Testimonial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testimonialSectionId` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `testimonialdetail` DROP FOREIGN KEY `TestimonialDetail_testimonialId_fkey`;

-- DropIndex
DROP INDEX `Testimonial_sectionName_key` ON `testimonial`;

-- AlterTable
ALTER TABLE `testimonial` DROP COLUMN `createdAt`,
    DROP COLUMN `sectionName`,
    DROP COLUMN `subtitle`,
    DROP COLUMN `title`,
    ADD COLUMN `comment` VARCHAR(191) NOT NULL,
    ADD COLUMN `customerImage` VARCHAR(191) NULL,
    ADD COLUMN `customerName` VARCHAR(191) NOT NULL,
    ADD COLUMN `date` DATETIME(3) NOT NULL,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `location` VARCHAR(191) NULL,
    ADD COLUMN `order` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `rating` INTEGER NOT NULL DEFAULT 5,
    ADD COLUMN `serviceType` VARCHAR(191) NOT NULL,
    ADD COLUMN `serviceTypeIcon` VARCHAR(191) NULL,
    ADD COLUMN `testimonialSectionId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `testimonialdetail`;

-- CreateTable
CREATE TABLE `TestimonialSection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sectionName` VARCHAR(191) NOT NULL DEFAULT 'testimonials-section',
    `mainTitle` VARCHAR(191) NOT NULL,
    `subtitle` VARCHAR(191) NULL,
    `tag` VARCHAR(191) NULL,
    `showDecorations` BOOLEAN NOT NULL DEFAULT true,
    `backgroundColor` VARCHAR(191) NULL,
    `textColor` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TestimonialSection_sectionName_key`(`sectionName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Testimonial` ADD CONSTRAINT `Testimonial_testimonialSectionId_fkey` FOREIGN KEY (`testimonialSectionId`) REFERENCES `TestimonialSection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AlterTable: karakter sinirli (VARCHAR 191) aciklama/yorum alanlari @db.Text'e cevrildi
ALTER TABLE `faqsection` MODIFY `description` TEXT NULL;

ALTER TABLE `pricingplan` MODIFY `subtitle` TEXT NULL;

ALTER TABLE `pricingsection` MODIFY `description` TEXT NULL;

ALTER TABLE `service` MODIFY `description` TEXT NULL;

ALTER TABLE `services` MODIFY `description` TEXT NULL;

ALTER TABLE `testimonial` MODIFY `comment` TEXT NOT NULL;

ALTER TABLE `testimonialsection` MODIFY `subtitle` TEXT NULL;

ALTER TABLE `wehelpsection` MODIFY `description` TEXT NULL;

ALTER TABLE `whychooseus` MODIFY `shortDescription` TEXT NULL,
    MODIFY `closingStatement` TEXT NULL;

ALTER TABLE `whychooseusfeature` MODIFY `description` TEXT NULL;

-- CreateTable: yeni "Taşınma Sürecimiz" bölümü
CREATE TABLE `ProcessSection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sectionName` VARCHAR(191) NOT NULL DEFAULT 'process-section',
    `mainTitle` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ProcessSection_sectionName_key`(`sectionName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `ProcessStep` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `iconPath` VARCHAR(191) NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `processSectionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProcessStep` ADD CONSTRAINT `ProcessStep_processSectionId_fkey` FOREIGN KEY (`processSectionId`) REFERENCES `ProcessSection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

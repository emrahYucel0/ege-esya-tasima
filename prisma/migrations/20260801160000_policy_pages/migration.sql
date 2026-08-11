-- Politika sayfası metinleri: Vue şablonundan veritabanına.
CREATE TABLE `PolicyPage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `subtitle` TEXT NULL,
    `content` LONGTEXT NOT NULL,
    `lastUpdated` DATETIME(3) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PolicyPage_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

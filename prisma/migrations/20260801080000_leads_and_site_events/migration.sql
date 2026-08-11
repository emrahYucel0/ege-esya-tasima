-- Talepler ve dönüşüm ölçümü.
--
-- Bu migration ELLE yazıldı. `prisma migrate dev` kullanılamadı: veritabanında
-- bu çalışmadan ÖNCE var olan bir sapma (bazı tablolarda eksik foreign key)
-- bulunuyor ve Prisma bu durumda veritabanını sıfırlamayı öneriyor. Mevcut
-- 120 bölge, 10 yazı ve tüm site içeriği durduğu için o yol kapalı; sadece
-- yeni tabloları ekleyen bu betik `prisma db execute` ile uygulanıp
-- `prisma migrate resolve --applied` ile geçmişe işlendi.

-- CreateTable
CREATE TABLE `ContactLead` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `message` TEXT NULL,
    `sourcePage` VARCHAR(191) NULL,
    `mailStatus` VARCHAR(191) NOT NULL DEFAULT 'denenmedi',
    `mailError` TEXT NULL,
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ContactLead_createdAt_idx`(`createdAt`),
    INDEX `ContactLead_isRead_idx`(`isRead`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteEvent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `page` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `SiteEvent_type_createdAt_idx`(`type`, `createdAt`),
    INDEX `SiteEvent_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

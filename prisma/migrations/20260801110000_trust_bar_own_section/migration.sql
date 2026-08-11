-- Güven bandının (TrustBar) kendi bölümüne ayrılması.
--
-- NEDEN
-- Güven bandının içeriği `Services` modelinin içinde duruyordu: giriş metni
-- `statsIntro` alanında, rakamlar `Statistic` tablosunda. Bu bağ tarihseldi —
-- band bir zamanlar ana sayfadaki hizmetler bölümünün parçasıydı. O bölüm
-- kaldırıldıktan sonra bağ tamamen anlamsız kaldı: panelde "Hizmetler"
-- ekranını açan kişi karşısında hiç ilgisi olmayan güven bandı alanlarını
-- buluyordu.
--
-- Ayrıca `buttonText` / `buttonLink` de kaldırılıyor: ikisi de kaldırılan ana
-- sayfa bölümünün "Tüm Hizmetler → /hizmetlerimiz" düğmesine aitti ve artık
-- hiçbir bileşen okumuyor.
--
-- SIRA ÖNEMLİ: veri ÖNCE yeni tablolara kopyalanıyor, eski sütun/tablolar
-- ANCAK ondan sonra düşürülüyor. Uygulamadan önce tam yedek alındı.

-- 1) Yeni tablolar
CREATE TABLE `TrustBar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sectionName` VARCHAR(191) NOT NULL DEFAULT 'trust-bar',
    `intro` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `TrustBar_sectionName_key`(`sectionName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `TrustBarItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `iconPath` VARCHAR(191) NULL,
    `value` VARCHAR(191) NOT NULL,
    `label1` VARCHAR(191) NOT NULL,
    `label2` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `trustBarId` INTEGER NOT NULL,

    INDEX `TrustBarItem_trustBarId_idx`(`trustBarId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `TrustBarItem`
  ADD CONSTRAINT `TrustBarItem_trustBarId_fkey`
  FOREIGN KEY (`trustBarId`) REFERENCES `TrustBar`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- 2) Mevcut veriyi taşı
INSERT INTO `TrustBar` (`sectionName`, `intro`, `createdAt`, `updatedAt`)
SELECT 'trust-bar', `statsIntro`, NOW(3), NOW(3) FROM `Services` LIMIT 1;

INSERT INTO `TrustBarItem` (`iconPath`, `value`, `label1`, `label2`, `order`, `trustBarId`)
SELECT s.`iconPath`, s.`value`, s.`label1`, s.`label2`, s.`order`,
       (SELECT `id` FROM `TrustBar` LIMIT 1)
FROM `Statistic` s
ORDER BY s.`order`;

-- 3) Ancak veri taşındıktan SONRA eskiyi kaldır
ALTER TABLE `Services` DROP COLUMN `statsIntro`;
ALTER TABLE `Services` DROP COLUMN `buttonText`;
ALTER TABLE `Services` DROP COLUMN `buttonLink`;
DROP TABLE `Statistic`;

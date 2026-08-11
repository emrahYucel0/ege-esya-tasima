-- Fiyat hesaplama aracının katsayılarının panele açılması.
--
-- Değerler önce PriceEstimator.vue içinde sabitti. Fiyatlar zamanla değişiyor
-- (akaryakıt, işçilik, sezon) ve her değişiklik için kod düzenleyip yeniden
-- dağıtım yapmak sürdürülebilir değil.
--
-- Başlangıç değerleri koddaki değerlerle AYNI — geçiş anında sitedeki hesap
-- değişmesin diye.

CREATE TABLE `PriceEstimator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sectionName` VARCHAR(191) NOT NULL DEFAULT 'price-estimator',
    `floorFee` INTEGER NOT NULL DEFAULT 450,
    `packingMultiplier` DOUBLE NOT NULL DEFAULT 1.18,
    `storageFee` INTEGER NOT NULL DEFAULT 3500,
    `rangePercent` INTEGER NOT NULL DEFAULT 15,
    `roundTo` INTEGER NOT NULL DEFAULT 500,
    `note` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PriceEstimator_sectionName_key`(`sectionName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `PriceEstimatorSize` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,
    `basePrice` INTEGER NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `estimatorId` INTEGER NOT NULL,

    INDEX `PriceEstimatorSize_estimatorId_idx`(`estimatorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `PriceEstimatorDistance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,
    `multiplier` DOUBLE NOT NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `estimatorId` INTEGER NOT NULL,

    INDEX `PriceEstimatorDistance_estimatorId_idx`(`estimatorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `PriceEstimatorSize`
  ADD CONSTRAINT `PriceEstimatorSize_estimatorId_fkey`
  FOREIGN KEY (`estimatorId`) REFERENCES `PriceEstimator`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `PriceEstimatorDistance`
  ADD CONSTRAINT `PriceEstimatorDistance_estimatorId_fkey`
  FOREIGN KEY (`estimatorId`) REFERENCES `PriceEstimator`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Başlangıç verisi: koddaki değerlerin birebir aynısı.
INSERT INTO `PriceEstimator`
  (`sectionName`, `floorFee`, `packingMultiplier`, `storageFee`, `rangePercent`, `roundTo`, `note`, `createdAt`, `updatedAt`)
VALUES
  ('price-estimator', 450, 1.18, 3500, 15, 500,
   'Bu bir ön tahmindir, teklif değildir. Kesin fiyat; eşya miktarı, park mesafesi, asansör uygunluğu ve montaj ihtiyacına göre ücretsiz keşif sonrasında netleşir.',
   NOW(3), NOW(3));

SET @e = (SELECT `id` FROM `PriceEstimator` WHERE `sectionName` = 'price-estimator');

INSERT INTO `PriceEstimatorSize` (`label`, `basePrice`, `order`, `estimatorId`) VALUES
  ('1+0 / Stüdyo',    6000, 0, @e),
  ('1+1',             8500, 1, @e),
  ('2+1',            12000, 2, @e),
  ('3+1',            16000, 3, @e),
  ('4+1 ve üzeri',   21000, 4, @e),
  ('Ofis / İşyeri',  18000, 5, @e);

INSERT INTO `PriceEstimatorDistance` (`label`, `multiplier`, `order`, `estimatorId`) VALUES
  ('Aynı şehir içinde',        1.00, 0, @e),
  ('Komşu şehir (0–300 km)',   1.45, 1, @e),
  ('Orta mesafe (300–700 km)', 1.85, 2, @e),
  ('Uzun mesafe (700 km+)',    2.30, 3, @e);

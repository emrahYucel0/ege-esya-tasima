-- Yapısal veri (MovingCompany) için konum ve fiyat aralığı alanları.
ALTER TABLE `SiteSettings`
  ADD COLUMN `latitude` DOUBLE NULL,
  ADD COLUMN `longitude` DOUBLE NULL,
  ADD COLUMN `priceRange` VARCHAR(191) NULL;

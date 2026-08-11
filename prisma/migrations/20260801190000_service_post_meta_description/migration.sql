-- Hizmet ve blog sayfaları için ayrı arama açıklaması. Boşsa excerpt kullanılır.
ALTER TABLE `Service` ADD COLUMN `metaDescription` TEXT NULL;
ALTER TABLE `Post` ADD COLUMN `metaDescription` TEXT NULL;

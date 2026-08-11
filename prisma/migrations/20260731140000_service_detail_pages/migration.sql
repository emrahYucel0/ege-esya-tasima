-- Hizmetlere kendi detay sayfası alanları.
--
-- NEDEN: "asansörlü nakliyat", "parça eşya taşıma", "ofis taşıma", "eşya
-- depolama" gibi hizmet niyetli aramalar konum niyetli aramalardan ayrı bir
-- küme ve site şu an bunlar için tek bir sayfa taşımıyor; bu ifadeler
-- yalnızca bölge sayfalarının SSS'leri içinde geçiyordu.
--
-- `slug` NULL kabul ediyor ÇÜNKÜ her hizmetin sayfası olmayacak:
-- "Evden Eve Nakliyat" kartı kalıyor ama sayfası açılmıyor (ana sayfa ve
-- 120 bölge sayfası zaten o baş terimi hedefliyor; üçüncü bir sayfa
-- anahtar kelime yamyamlığı yaratırdı).
--
-- UNIQUE indeks NULL değerleri kısıtlamaz (MySQL davranışı), yani sayfası
-- olmayan birden fazla hizmet bir arada durabilir.
ALTER TABLE `Service` ADD COLUMN `slug` VARCHAR(191) NULL;
ALTER TABLE `Service` ADD COLUMN `excerpt` TEXT NULL;
ALTER TABLE `Service` ADD COLUMN `content` TEXT NULL;
ALTER TABLE `Service` ADD COLUMN `includes` JSON NULL;
ALTER TABLE `Service` ADD COLUMN `faqs` JSON NULL;
CREATE UNIQUE INDEX `Service_slug_key` ON `Service`(`slug`);

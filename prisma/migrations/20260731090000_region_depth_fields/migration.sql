-- Bölge sayfalarına derinlik alanları.
--
-- NEDEN: bölge içeriklerinin medyanı 135 kelimeydi ve 120 sayfanın 114'ü
-- 200 kelimenin altındaydı. Programatik konum sayfalarında bu profil,
-- Google'ın "scaled content abuse" politikasının tarif ettiği ince içerik
-- riskini taşıyor. Bu dört alan, her bölgeye o bölgeye ÖZGÜ ve yapılandırılmış
-- içerik eklemeyi mümkün kılıyor (mahalleler, künye, SSS, güzergâhlar).
--
-- Hepsi NULL kabul ediyor: mevcut 120 kayıt migration sonrası da geçerli
-- kalıyor, alanlar doldurulana kadar ilgili bölümler render edilmiyor.
ALTER TABLE `Region` ADD COLUMN `neighborhoods` JSON NULL;
ALTER TABLE `Region` ADD COLUMN `facts` JSON NULL;
ALTER TABLE `Region` ADD COLUMN `faqs` JSON NULL;
ALTER TABLE `Region` ADD COLUMN `routes` JSON NULL;

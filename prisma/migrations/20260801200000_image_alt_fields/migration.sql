-- Panelden yüklenen görseller için panelden yazılabilir alt metni.
--
-- NEDEN: bu altı görselin dosyası panelden değişebiliyordu ama alt metni
-- ya koda gömülüydü (Hero, Choose) ya da başlıktan türetiliyordu (Service,
-- Post, Region). Resim değişince metin resmi tarif etmez oluyordu ve
-- düzeltmenin panelden yolu yoktu.
--
-- Hepsi NULL: boş bırakıldığında bugünkü otomatik metin aynen üretilmeye
-- devam ediyor. Yani bu alanlar zorunlu alan değil, ÜSTÜNE YAZMA alanı.
-- Aynı desen projede zaten var: WeHelpImage.altText, FaqImage.altText,
-- AboutSection.teamImageAlt.

ALTER TABLE `HeroPage` ADD COLUMN `imageAlt` VARCHAR(191) NULL;
ALTER TABLE `HeroPage` ADD COLUMN `backgroundImageAlt` VARCHAR(191) NULL;

ALTER TABLE `WhyChooseUs` ADD COLUMN `mainImageAlt` VARCHAR(191) NULL;

ALTER TABLE `Service` ADD COLUMN `imageAlt` VARCHAR(191) NULL;
ALTER TABLE `Post` ADD COLUMN `imageAlt` VARCHAR(191) NULL;
ALTER TABLE `Region` ADD COLUMN `imageAlt` VARCHAR(191) NULL;

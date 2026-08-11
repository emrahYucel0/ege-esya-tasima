-- Ziyaretçilerin yorum gönderebilmesi.
--
-- Yorumlar artık iki kaynaktan geliyor: panelden elle girilenler ve siteden
-- gelenler. Ayrı bir tablo AÇILMADI — mevcut `Testimonial` genişletildi ki
-- ikisi aynı listede, aynı sırayla gösterilebilsin.
--
-- `isApproved` varsayılanı true: mevcut yorumların hepsi panelden girilmiş ve
-- yayında, geriye dönük olarak gizlenmemeli. Siteden gelen yorumlar API
-- tarafında açıkça false ile oluşturuluyor.

ALTER TABLE `Testimonial`
  ADD COLUMN `isApproved` BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN `source` VARCHAR(191) NOT NULL DEFAULT 'admin',
  ADD COLUMN `email` VARCHAR(191) NULL;

-- Moderasyon ekranı "onay bekleyenler"i sık sorgulayacak.
CREATE INDEX `Testimonial_isApproved_idx` ON `Testimonial`(`isApproved`);

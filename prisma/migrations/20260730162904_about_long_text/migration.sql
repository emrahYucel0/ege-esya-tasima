-- Hakkımızda metin alanları VARCHAR(191) idi; bir paragraf bu sınıra
-- sığmıyor ve uzun metin sessizce reddediliyordu. TEXT'e çevriliyor.
ALTER TABLE `aboutsection`
  MODIFY `description1` TEXT NOT NULL,
  MODIFY `description2` TEXT NOT NULL,
  MODIFY `description3` TEXT NOT NULL,
  MODIFY `historyText1` TEXT NOT NULL,
  MODIFY `historyText2` TEXT NOT NULL,
  MODIFY `historyText3` TEXT NOT NULL;

ALTER TABLE `aboutservice`
  MODIFY `description` TEXT NOT NULL;

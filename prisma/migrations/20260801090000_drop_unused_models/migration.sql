-- Kullanılmayan tabloların kaldırılması.
--
-- Feature/FeatureType ve Card/CardItem projede hiçbir yerde kullanılmıyordu:
-- API rotası yok, admin paneli yok, `prisma.*` çağrısı yok, canlı bir modelden
-- gelen ilişki yok ve dördü de BOŞ (0 kayıt). Bu proje bundan sonraki siteler
-- için kök proje olacağı için, kullanılmayan her tablo her klona miras kalırdı.
--
-- ÖNEMLİ AYRIM: ilk incelemede FaqStatsCard ve FaqImage de ölü sanılmıştı
-- çünkü `prisma.faqStatsCard` gibi doğrudan bir çağrı yok. Oysa ikisi de canlı
-- FaqSection'ın ilişkisi üzerinden her GET'te include ediliyor ve ikisinde de
-- gerçek içerik var. Bu yüzden onlara DOKUNULMADI.
--
-- Silmeden önce tam veritabanı yedeği alındı (scripts/yedekle.mjs).

-- Çocuk tablolar önce: foreign key kısıtları sebebiyle sıra önemli.
DROP TABLE IF EXISTS `CardItem`;
DROP TABLE IF EXISTS `Card`;
DROP TABLE IF EXISTS `FeatureType`;
DROP TABLE IF EXISTS `Feature`;

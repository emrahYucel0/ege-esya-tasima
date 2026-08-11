// server/domain/regions/regions.repository.ts
import prisma from '../../utils/prisma'

/**
 * `light` modunda ATILAN sütunlar.
 *
 * ÖNCEDEN yalnızca `content` atılıyordu ve bu yetersizdi: 120 bölgenin
 * SSS'leri (kayıt başına ~1.1 KB), künye tabloları, güzergâhları ve mahalle
 * listeleri hâlâ geliyordu. Ölçüldü — `/api/regions?light=true` yanıtı
 * 277 KB'tı ve bu JSON, listeyi çeken HER sayfanın HTML'ine gömülüyordu:
 * ana sayfa 437 KB, /bolgelerimiz 465 KB, bölge sayfaları ~425 KB.
 * Sayfaların yaklaşık 130'u bu yükü taşıyordu.
 *
 * Listeyi tüketen beş yerin (RegionFinder, RegionCarousel, region/List,
 * bolgelerimiz, [...slug]) hiçbiri bu alanları OKUMUYOR — tek tek
 * doğrulandı. Ağır alanlar zaten tekil bölge kaydından geliyor
 * (RegionView `props.region` üzerinden okuyor), listeden değil.
 *
 * `excerpt`, `image` ve `cities` KALIYOR: kartlar, arama süzgeci ve
 * il/ilçe kırılımı bunları kullanıyor. `createdAt` de kalıyor —
 * bölgeler arası önceki/sonraki gezinmesi tarihe göre sıralıyor.
 *
 * `imageAlt` de KALIYOR: bölge kartları görsel gösteriyor, alt metnini de
 * oradan okuyorlar. Alan 120 bölgenin neredeyse tamamında NULL kalacak
 * (bkz. schema.prisma → Region.imageAlt'taki gerekçe), yani listeye
 * eklediği yük ~2 KB ham / ~0.2 KB sıkıştırılmış. Atılsaydı, öne çıkan bir
 * bölgeye elle metin yazıldığında kart eski otomatik metni, detay sayfası
 * yeni metni gösterirdi.
 */
const AGIR_SUTUNLAR = {
  content: true,
  // Yalnızca detay sayfasının <head>'inde kullanılıyor (o da findUnique ile
  // çekiliyor). Listeye konsaydı 120 × ~150 bayt boşuna taşınırdı.
  metaDescription: true,
  faqs: true,
  facts: true,
  routes: true,
  neighborhoods: true,
  priceFactors: true,
  priceFactorsTitle: true,
  priceFactorsImage: true,
} as const

export const regionsRepository = {
  findUnique: (where: any) => prisma.region.findUnique({ where }),
  // `light`: liste/gezinme amaçlı tüketiciler (bölge bulucu, carousel,
  // ilgili bölge gezinmesi) ağır içerik sütunlarına ihtiyaç duymuyor.
  // Admin panelinin liste görünümü (useListCrud) düzenleme formunu
  // doğrudan bu listeden doldurduğu için ORADA hepsi gerekli — bu yüzden
  // varsayılan davranış değişmedi, yalnızca `light: true` geçildiğinde
  // sütunlar düşürülüyor.
  findMany: (where: any, options: { light?: boolean; take?: number; skip?: number } = {}) =>
    prisma.region.findMany({
      where,
      orderBy: { title: 'asc' },
      ...(options.light ? { omit: AGIR_SUTUNLAR } : {}),
      ...(options.take !== undefined ? { take: options.take, skip: options.skip ?? 0 } : {}),
    }),
  count: (where: any) => prisma.region.count({ where }),
  create: (data: any) => prisma.region.create({ data }),
  update: (slug: string, data: any) => prisma.region.update({ where: { slug }, data }),
  remove: (slug: string) => prisma.region.delete({ where: { slug } }),
}

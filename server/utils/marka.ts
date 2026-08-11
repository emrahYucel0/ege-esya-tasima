// server/utils/marka.ts
//
// Marka adının SUNUCU TARAFINDAKİ tek okuma noktası.
//
// NEDEN VAR
// Marka adı iki yerde birden yaşıyordu: ön yüz `useSiteSettings()` ile
// veritabanından okuyordu, sunucu tarafı ise koda gömülü bir sabit
// kullanıyordu (`server/api/leads.ts` içinde `const brandName =
// 'EveNakliyatEvden'`). Panelden ad değiştirildiğinde site değişiyor ama
// teklif bildirimi e-postasının konusu eski adda kalıyordu — kimsenin
// fark etmeyeceği türden bir sapma.
//
// YEDEK DEĞER NEDEN VAR
// Bu fonksiyon müşteri adayı bildirimi gönderilirken çağrılıyor. Ayar satırı
// silinmişse ya da veritabanı o an cevap vermiyorsa, mail HİÇ gitmemektense
// yedek adla gitsin: kaybedilen şey e-posta konusundaki bir kelime değil,
// müşteri adayının kendisi olurdu.
//
// Yedek `NUXT_SITE_NAME` ortam değişkeninden, o da yoksa nuxt.config'teki
// `site.name` alanından geliyor — yani kodda marka adı YAZILI DEĞİL.
import prisma from './prisma'

const YEDEK_MARKA = 'Nakliyat'

export async function markaAdiniOku(): Promise<string> {
  try {
    const ayar = await prisma.siteSettings.findFirst({
      select: { brandName: true, siteName: true },
    })
    const ad = ayar?.brandName?.trim() || ayar?.siteName?.trim()
    if (ad) return ad
  } catch {
    // Yutuluyor — gerekçe yukarıda.
  }

  return useRuntimeConfig().public?.site?.name || process.env.NUXT_SITE_NAME || YEDEK_MARKA
}

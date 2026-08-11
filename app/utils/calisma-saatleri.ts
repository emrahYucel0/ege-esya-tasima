// app/utils/calisma-saatleri.ts
//
// Site Ayarları'ndaki serbest metin çalışma saatlerini schema.org
// `openingHoursSpecification` yapısına çevirir.
//
// NEDEN AYRIŞTIRICI, NEDEN YENİ BİR ALAN DEĞİL
// Saatler zaten panelde girili ve footer'da gösteriliyor. Admin'den bir de
// "Mo-Sa 09:00-19:00" gibi schema.org sözdizimi istemek makul değildi;
// aynı bilgiyi iki yerde tutmak da zamanla ayrışırdı.
//
// KURAL: EMİN DEĞİLSE ÜRETME. Tanımadığı bir satırı atlar, hiçbir şey
// tanımazsa boş dizi döner ve şemaya alan hiç eklenmez. Yanlış biçimli
// bir openingHoursSpecification, Search Console'da yapısal veri hatası
// üretir — eksik olmasından kötüdür.

/** Türkçe gün adı → schema.org günü. Kısaltmalar da kabul edilir. */
const GUNLER: Record<string, string> = {
  pazartesi: 'Monday',
  sali: 'Tuesday',
  salı: 'Tuesday',
  carsamba: 'Wednesday',
  çarşamba: 'Wednesday',
  persembe: 'Thursday',
  perşembe: 'Thursday',
  cuma: 'Friday',
  cumartesi: 'Saturday',
  pazar: 'Sunday',
}

/** Hafta sırası — "Pazartesi - Cuma" gibi aralıkları açmak için. */
const SIRA = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const gunuCoz = (ham: string): string | null => {
  const anahtar = ham.trim().toLocaleLowerCase('tr-TR')
  return GUNLER[anahtar] ?? null
}

/**
 * "Pazartesi - Cuma: 09:00 - 19:00" biçimindeki tek bir satırı çözer.
 * Dikkat: gün ayracı ile saat ayracı aynı karakter ("-"), bu yüzden önce
 * iki nokta üst üsteden bölünüyor.
 */
const satiriCoz = (satir: string) => {
  const parcalar = satir.split(':')
  // En az "günler" + "SS" + "DD" olmalı; saatlerde de iki nokta var.
  if (parcalar.length < 3) return null

  const gunKismi = parcalar[0]
  const saatKismi = parcalar.slice(1).join(':')

  const saatler = saatKismi.match(/(\d{1,2}:\d{2})\s*[-–—]\s*(\d{1,2}:\d{2})/)
  if (!saatler) return null

  // "Cumartesi" (tek gün) ya da "Pazartesi - Cuma" (aralık)
  const gunler: string[] = []
  const aralik = gunKismi.split(/[-–—]/)
  if (aralik.length === 2) {
    const bas = gunuCoz(aralik[0])
    const son = gunuCoz(aralik[1])
    if (!bas || !son) return null
    const i = SIRA.indexOf(bas)
    const j = SIRA.indexOf(son)
    if (i < 0 || j < 0 || j < i) return null
    gunler.push(...SIRA.slice(i, j + 1))
  } else {
    const tek = gunuCoz(gunKismi)
    if (!tek) return null
    gunler.push(tek)
  }

  // "9:00" → "09:00": schema.org saatin iki haneli olmasını bekliyor.
  const ikiHane = (s: string) => (s.length === 4 ? `0${s}` : s)

  return {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: gunler,
    opens: ikiHane(saatler[1]),
    closes: ikiHane(saatler[2]),
  }
}

/**
 * Serbest metni OpeningHoursSpecification dizisine çevirir.
 * Satırlar yeni satır veya "/" ile ayrılabilir.
 */
export const calismaSaatleriSemasi = (ham: unknown) => {
  if (typeof ham !== 'string' || !ham.trim()) return []
  return ham
    .split(/[\n/]+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map(satiriCoz)
    .filter((x): x is NonNullable<typeof x> => x !== null)
}

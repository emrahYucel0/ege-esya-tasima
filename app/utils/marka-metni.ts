// app/utils/marka-metni.ts
//
// Panelden girilen İÇERİK metinlerinde marka adının yerine geçen yer tutucu.
//
// NEDEN VAR
// Marka adı üç içerik alanına ELLE yazılmıştı (hero açıklaması, "Neden ...'i
// Tercih Etmelisiniz?" başlığı, kapanış cümlesi). Site Ayarları'ndan ad
// değiştirildiğinde başlık ve meta etiketleri değişiyor ama bu üç cümle eski
// adda kalıyordu — sayfanın bir yerinde yeni, başka yerinde eski ad.
//
// Artık içerikte `{marka}` yazılıyor, gerçek değer render sırasında konuyor.
//
// ─────────────────────────────────────────────────────────────────────────
// TÜRKÇE EK SORUNU — bu dosyanın asıl sebebi
//
// "Neden EveNakliyatEvden'i Tercih Etmelisiniz?" cümlesindeki `'i` eki
// markanın SON ÜNLÜSÜNE bağlı. Yer tutucuyu düz değiştirseydik marka
// "Eve Nakliyat" olduğunda "Eve Nakliyat'i" çıkardı — doğrusu "Eve
// Nakliyat'ı". Yani sessizce bozuk Türkçe üretirdik.
//
// Bu yüzden belirtme hâli AYRI bir yer tutucu: `{marka'yı}`. Ek, dört
// ünlü grubuna göre (a,ı → ı | e,i → i | o,u → u | ö,ü → ü) seçiliyor ve
// marka ünlüyle bitiyorsa araya kaynaştırma `y`'si giriyor.
//
//   EveNakliyatEvden  → son ünlü e, ünsüzle biter → EveNakliyatEvden'i
//   Eve Nakliyat      → son ünlü a, ünsüzle biter → Eve Nakliyat'ı
//   Ege Nakliye       → son ünlü e, ÜNLÜYLE biter → Ege Nakliye'yi

const KALIN_DUZ = 'aıAI'
const INCE_DUZ = 'eiEİ'
const KALIN_YUVARLAK = 'ouOU'
const UNLULER = 'aeıioöuüAEIİOÖUÜ'

/** Belirtme (-i) hâli. Özel ada kesme işaretiyle eklenir. */
export function belirtmeHali(ad: string): string {
  const temiz = ad.trim()
  if (!temiz) return temiz

  // Son ünlüyü sondan başlayarak bul; yoksa ince kabul et (en yaygın).
  let sonUnlu = ''
  for (let i = temiz.length - 1; i >= 0; i--) {
    if (UNLULER.includes(temiz[i])) {
      sonUnlu = temiz[i]
      break
    }
  }

  // `sonUnlu` BOŞ OLABİLİR (ünlüsüz ad: "XYZ"). Boş kontrolü ÖNCE yapılmak
  // zorunda: JavaScript'te `'aıAI'.includes('')` TRUE döner, yani boş değer
  // ilk gruba eşleşip sessizce yanlış ek üretirdi ("XYZ'ı").
  let ek: string
  if (!sonUnlu) ek = 'i'
  else if (KALIN_DUZ.includes(sonUnlu)) ek = 'ı'
  else if (INCE_DUZ.includes(sonUnlu)) ek = 'i'
  else if (KALIN_YUVARLAK.includes(sonUnlu)) ek = 'u'
  else ek = 'ü'

  // Ünlüyle biten ada kaynaştırma ünsüzü: "Ege Nakliye'yi".
  const kaynastirma = UNLULER.includes(temiz[temiz.length - 1]) ? 'y' : ''

  return `${temiz}'${kaynastirma}${ek}`
}

/**
 * İçerik metnindeki marka yer tutucularını doldurur.
 * Yer tutucu yoksa metin olduğu gibi döner — her alana güvenle uygulanabilir.
 */
export function markaMetni(metin: string | null | undefined, marka: string): string {
  if (!metin) return ''
  if (!metin.includes('{marka')) return metin

  return metin
    .replace(/\{marka'yı\}/g, belirtmeHali(marka))
    .replace(/\{marka\}/g, marka)
}

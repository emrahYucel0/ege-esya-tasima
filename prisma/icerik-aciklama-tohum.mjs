// prisma/icerik-aciklama-tohum.mjs
//
// HİZMET ve BLOG sayfalarının Google arama açıklamaları.
// (Bölge sayfaları ayrı betikte: bolge-aciklama-tohum.mjs)
//
// İKİ FARKLI NİYET, İKİ FARKLI KALIP
//
// Hizmet sayfaları TİCARİ niyet taşıyor — arayan kişi hizmet satın almak
// istiyor. Kalıp: [hizmet adı] + [kapsam] + [farklılaştırıcı] + [eylem çağrısı]
//
// Blog yazıları BİLGİLENDİRİCİ niyet taşıyor — arayan kişi bir soruya cevap
// arıyor, henüz satın almıyor. Buraya "ücretsiz keşif" gibi bir satış çağrısı
// koymak tıklanmayı DÜŞÜRÜR: kullanıcı bilgi beklerken reklam gördüğünü
// anlar ve bir alttaki sonuca geçer. Kalıp: [yazının cevapladığı soru] +
// [okuyunca ne öğreneceği]. Satış cümlesi YOK.
//
// TEKRAR ÇALIŞTIRILABİLİR: yalnızca boş alanları doldurur, elle yazdığınızı
// ezmez. Hepsini yeniden yazmak için: --hepsini-ez
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from './generated/client/client.ts'

// ── Hizmet sayfaları — ticari niyet ────────────────────────────────────────
const HIZMETLER = {
  'evden-eve-nakliyat':
    "Evden eve nakliyat: keşiften yerleştirmeye kadar tüm aşamalar tek ekipte. Sigortalı taşıma, marangozlu söküm-montaj ve yazılı sabit fiyat. Ücretsiz keşif.",
  'asansorlu-nakliyat':
    "Asansörlü nakliyat: merdivenden geçmeyen eşyalar dış cephe asansörüyle pencereden indirilir. Belediye izni ve sigortalı taşıma bizden. Ücretsiz keşif.",
  'parca-esya-tasima':
    "Parça eşya taşıma: tek koltuk veya birkaç kutu için tüm ev fiyatı ödemeyin. Parsiyel seferle sigortalı ve ambalajlı taşıma. Aynı gün teklif alın.",
  'ofis-tasima':
    "Ofis, atölye ve depo taşıma: iş akışınız durmasın diye mesai dışına planlanır, kurulum aynı gece tamamlanır. Sigortalı taşıma ve yazılı sabit fiyat.",
  'esya-depolama':
    "Eşya depolama: çıkış ve giriş tarihiniz uyuşmuyorsa eşyanız ambalajlı hâlde güvenli depoda bekler, teslim gününde aynı ekiple gelir. Ücretsiz keşif.",
  'sehirler-arasi-nakliyat':
    "Şehirler arası nakliyat: 81 ile sigortalı ve ambalajlı taşıma, teslim günü baştan yazılı bildirilir. Marangozlu montaj dahil. Ücretsiz keşif alın.",
  'paketleme-hizmeti':
    "Paketleme ve ambalajlama hizmeti: mutfak, cam ve elektronik eşya ayrı standartla paketlenir. Malzeme ekibimizden, sigortalı taşıma. Ücretsiz keşif.",
}

// ── Blog yazıları — bilgilendirici niyet, satış cümlesi YOK ────────────────
const YAZILAR = {
  'evden-eve-nakliyat-fiyatlari-neye-gore-belirlenir':
    "Nakliyat fiyatını belirleyen altı kalem: hacim, mesafe, kat, asansör, özel eşya ve ek hizmetler. Teklifleri doğru karşılaştırmanın yolu.",
  'tasinma-oncesi-yapilacaklar-listesi':
    "Taşınmanın zor kısmı taşıma günü değil, öncesindeki dört hafta. Hangi işin hangi hafta yapılacağını gösteren adım adım kontrol listesi.",
  'kirilacak-esyalar-nasil-paketlenir':
    "Kırılan eşyaların çoğu taşıma sırasında değil, yanlış paketleme yüzünden kutu içinde kırılır. Tabak, bardak ve cam eşyanın doğru paketlenmesi.",
  'nakliyat-sigortasi-neyi-kapsar':
    "“Sigortalı taşıma” tek başına yeterli bilgi değil. Teminatın neye göre belirlendiği, neyin kapsam dışı kaldığı ve hasarda izlenecek yol.",
  'beyaz-esya-tasima-rehberi':
    "Beyaz eşyadaki arızaların çoğu taşımadan değil, öncesinde yapılmayan hazırlıktan kaynaklanır. Çamaşır makinesi ve buzdolabında en sık 6 hata.",
  'tasinirken-esyalardan-nasil-kurtulunur':
    "Taşınma, evdeki eşyayı gözden geçirmek için yılda bir gelen fırsat. Neyi götüreceğinize hızlı karar vermenin yöntemi ve elden çıkarma yolları.",
  'kis-aylarinda-tasinmak':
    "Kış, nakliyatın en sakin ve en uygun fiyatlı dönemi. Bu avantajın yanında yağış, buzlanma ve kısa gün ışığına karşı alınacak önlemler.",
  'evcil-hayvanla-tasinmak':
    "Taşınma, kedi ve köpekler için ani ve açıklamasız bir değişim. Süreci onlar için kolaylaştıran hazırlıklar ve yeni eve alıştırma adımları.",
  'kirali-evden-cikarken-depozito':
    "Depozito anlaşmazlıklarının çoğu, evin giriş ve çıkış hâlinin kayıt altına alınmamasından çıkar. Depozitoyu eksiksiz almanın adımları.",
  'tasinma-gunu-ilk-gece-kutusu':
    "Eşya geldikten sonraki en yorucu an, “şimdi hangi kutuda?” aramasıdır. İlk gece kutusunda bulunması gereken eşyaların tam listesi.",
}

// ── Uygulama ───────────────────────────────────────────────────────────────
const hepsiniEz = process.argv.includes('--hepsini-ez')
const p = new PrismaClient({ adapter: new PrismaMariaDb(process.env.DATABASE_URL) })

let yazilan = 0
let atlanan = 0

// Hizmetler
const hizmetler = await p.service.findMany({ select: { id: true, slug: true, metaDescription: true } })
for (const h of hizmetler) {
  const metin = HIZMETLER[h.slug]
  if (!metin) continue
  if (h.metaDescription && !hepsiniEz) { atlanan++; continue }
  await p.service.update({ where: { id: h.id }, data: { metaDescription: metin } })
  yazilan++
}
const eksikH = Object.keys(HIZMETLER).filter((s) => !hizmetler.some((h) => h.slug === s))
if (eksikH.length) console.log('UYARI — veritabanında olmayan hizmet slug:', eksikH.join(', '))

// Yazılar
const yazilar = await p.post.findMany({ select: { id: true, slug: true, metaDescription: true } })
for (const y of yazilar) {
  const metin = YAZILAR[y.slug]
  if (!metin) continue
  if (y.metaDescription && !hepsiniEz) { atlanan++; continue }
  await p.post.update({ where: { id: y.id }, data: { metaDescription: metin } })
  yazilan++
}
const yaziliOlmayan = yazilar.filter((y) => !YAZILAR[y.slug]).map((y) => y.slug)
if (yaziliOlmayan.length) console.log('UYARI — metni yazılmamış yazı:', yaziliOlmayan.join(', '))

const tum = [...Object.values(HIZMETLER), ...Object.values(YAZILAR)].map((m) => m.length)
console.log(`\n${yazilan} açıklama yazıldı, ${atlanan} atlandı (zaten doluydu).`)
console.log(
  `uzunluk — en kısa ${Math.min(...tum)}, ortalama ${Math.round(
    tum.reduce((a, b) => a + b, 0) / tum.length
  )}, en uzun ${Math.max(...tum)}`
)

await p.$disconnect()

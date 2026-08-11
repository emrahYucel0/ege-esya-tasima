// server/middleware/mailRateLimit.ts
//
// NEDEN VAR
// İletişim formu `nuxt-mail`'in açtığı `POST /mail/send` uç noktasını
// kullanıyor. Bu uç nokta kimlik doğrulaması istemiyor — istemesi de
// gerekmiyor, herkese açık bir form. Ama hiçbir sınırı da yoktu: bir
// betik saniyede yüzlerce istek atarak işletmenin gelen kutusunu
// doldurabilir ve SMTP kotasını tüketebilirdi.
//
// KAPSAM — abartmamak için not: bu uç nokta AÇIK RÖLE (open relay) DEĞİL.
// nuxt-mail'in `send.js` dosyası istemcinin gönderdiği `to`/`cc`/`bcc`
// alanlarını atıyor ve alıcıyı yalnızca nuxt.config'teki `mail.message`
// yapılandırmasından alıyor. Yani üçüncü kişilere posta gönderilemez;
// risk, site sahibinin kendi kutusuna spam yağmasıdır. Buradaki sınır tam
// olarak onu hedefliyor.
//
// Sayaçlar server/utils/rateLimit.ts üzerinden tutuluyor (login için
// yazılmıştı, anahtar parametreli olduğu için aynen kullanılabiliyor).
// Depolama sürücüsü REDIS_URL varsa Redis, yoksa bellek içi.
//
// KAPSAM GENİŞLEDİ: artık yalnızca /mail/send değil, kimlik doğrulaması
// istemeyen diğer yazma uçları da burada sınırlanıyor. Hepsi aynı desende:
// herkese açık, veritabanına ya da gelen kutusuna yazıyor, dolayısıyla
// sınırsız bırakılamaz.
const SINIRLI_YOLLAR: Record<string, { anahtar: string; sinir: number; mesaj: string }> = {
  // NOT: '/mail/send' kuralı KALDIRILDI — o ucu açan `nuxt-mail` modülü
  // projeden çıkarıldı (gerekçesi nuxt.config.ts içinde). Artık böyle bir
  // yol yok; kural kalsaydı hiçbir zaman eşleşmeyen ölü bir satır olurdu.

  // İletişim formunun ucu: önce veritabanına yazıyor, sonra mail deniyor.
  '/api/leads': { anahtar: 'talep', sinir: 5, mesaj: 'Çok fazla deneme yapıldı. Lütfen bir süre sonra tekrar deneyin.' },

  // Dönüşüm olayı kaydı (telefon/WhatsApp tıklaması). Sınır daha yüksek:
  // tek ziyaretçi birkaç sayfada tıklayabilir. Sınıra takılırsa yalnızca o
  // olay kaydedilmez — ziyaretçi tarafında hiçbir şey bozulmaz.
  '/api/events': { anahtar: 'olay', sinir: 30, mesaj: 'Çok fazla istek.' },

  // Müşteri yorumu. Sınır düşük: normal bir ziyaretçi bir kez yorum yazar.
  // Yorumlar zaten onaydan geçiyor, ama moderasyon kuyruğunu spamla
  // doldurmanın da önüne geçilmesi gerekiyor.
  '/api/reviews': { anahtar: 'yorum', sinir: 3, mesaj: 'Çok fazla yorum gönderildi. Lütfen daha sonra tekrar deneyin.' },
}

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') return

  const path = getRequestURL(event).pathname
  const kural = SINIRLI_YOLLAR[path]
  if (!kural) return

  // Proxy arkasındayken gerçek istemci IP'si X-Forwarded-For'da olur.
  // `xForwardedFor: true` ilk (istemci) değeri alır.
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'bilinmeyen'
  const key = `${kural.anahtar}:${ip}`

  const status = await isRateLimited(key, kural.sinir)
  if (status.blocked) {
    setHeader(event, 'Retry-After', String(status.retryAfterSeconds ?? 900))
    throw createError({ statusCode: 429, statusMessage: kural.mesaj })
  }

  // Sayaç istek BAŞARILI olsa da artıyor: burada "başarısız deneme"
  // diye bir kavram yok, sınırlamak istediğimiz şey gönderim SAYISI.
  await recordFailedAttempt(key, kural.sinir)
})

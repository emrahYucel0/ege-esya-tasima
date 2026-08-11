// server/api/events.post.ts
//
// Dönüşüm olayı kaydı — telefon / WhatsApp tıklaması.
// Herkese açık (hız sınırı server/middleware/mailRateLimit.ts'te).
//
// `navigator.sendBeacon` ile çağrılıyor: sayfa kapanırken bile gidiyor ve
// gezinmeyi bloklamıyor. Beacon yanıtı okumadığı için burada gövde döndürmek
// önemli değil; 204 yeterli ve en ucuzu.
import { eventsService } from '../domain/events/events.service'

export default defineEventHandler(async (event) => {
  // sendBeacon gövdeyi text/plain ya da Blob olarak gönderebiliyor; readBody
  // her iki durumda da metin döndürebileceği için JSON'a burada çevriliyor.
  const ham = await readBody(event)
  let govde: any = ham
  if (typeof ham === 'string') {
    try { govde = JSON.parse(ham) } catch { govde = {} }
  }

  const sonuc = await eventsService.record(String(govde?.type ?? ''), govde?.page)

  // Başarısızlıkta bile 204: bu bir ölçüm ucu, ziyaretçi tarafında hiçbir
  // şeyin bozulmasına sebep olmamalı. Geçersiz tür zaten kaydedilmedi.
  if (!sonuc.success) console.warn('Olay kaydedilemedi:', sonuc.error)

  setResponseStatus(event, 204)
  return null
})

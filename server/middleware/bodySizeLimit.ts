// server/middleware/bodySizeLimit.ts
// h3/Nitro, gövdeyi (readBody/readMultipartFormData) tamamen belleğe
// tamponladıktan SONRA boyut kontrolü yapılmasına izin verir (bkz.
// files.service.ts'deki MAX_SIZE_BYTES kontrolü) — yani kötü niyetli bir
// istemci dev bir gövde göndererek bellek tüketimine (DoS) yol açabilir.
// Content-Length header'ını istek gövdesi okunmadan ÖNCE kontrol ederek
// bunu engelliyoruz. En büyük meşru gövde dosya yüklemedir (10MB, bkz.
// files.service.ts); multipart çerçeveleme payı için biraz üstünde bir
// limit belirliyoruz.
//
// Not: bu, Content-Length göndermeyen (chunked transfer-encoding) bir
// istemciyi engellemez — o senaryoya karşı asıl güvence reverse proxy
// (Nginx/Cloudflare vb.) seviyesindeki bir limit olmalı. Bu middleware
// sadece uygulama katmanında bir savunma derinliği sağlar.
const MAX_BODY_BYTES = 15 * 1024 * 1024 // 15MB

export default defineEventHandler((event) => {
  const contentLength = getRequestHeader(event, 'content-length')
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    throw createError({ statusCode: 413, statusMessage: 'İstek gövdesi çok büyük' })
  }
})

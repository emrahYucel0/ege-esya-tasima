// server/middleware/apiCache.ts
// Site geneli, herkese açık, seyrek değişen içerik endpoint'leri (bölüm
// singleton'ları + posts/regions listeleri) her sayfa görüntülemesinde
// MySQL'e taze bir sorgu atıyordu — navbar/footer/siteSettings gibi
// veriler LİTERALDE HER SAYFADA çekildiği için bu, ölçekte gereksiz
// yere büyük bir veritabanı yükü demek. Bu middleware sadece GET
// isteklerine, sadece aşağıdaki bilinen içerik endpoint'lerine kısa
// ömürlü bir Cache-Control ekliyor; tarayıcı/CDN/reverse-proxy bu
// pencerede aynı URL için MySQL'e hiç gitmeden yanıt verebilir.
const CACHEABLE_PREFIXES = [
  '/api/about-section',
  '/api/card',
  '/api/faq-section',
  '/api/feature',
  '/api/footer',
  '/api/hero',
  '/api/meta',
  '/api/navbar',
  '/api/posts',
  '/api/pricing-section',
  '/api/quote',
  '/api/regions',
  '/api/services',
  '/api/siteSettings',
  '/api/testimonials-section',
  '/api/we-help-section',
  '/api/why-choose-us',
]

export default defineEventHandler((event) => {
  if (event.node.req.method !== 'GET') return
  if (!CACHEABLE_PREFIXES.some((prefix) => event.path.startsWith(prefix))) return

  // Admin oturumu (auth cookie) varsa hiç cache'lenmesin: ör. regions/posts
  // için ?admin=true ile dönen (inaktif/taslak kayıtlar dahil) yanıtların
  // paylaşımlı bir CDN/reverse-proxy tarafından yanlışlıkla anonim
  // ziyaretçilere servis edilmesini engeller.
  if (getCookie(event, 'auth')) return

  setHeader(event, 'Cache-Control', 'public, max-age=60, stale-while-revalidate=30')
})

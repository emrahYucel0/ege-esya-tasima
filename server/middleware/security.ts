// Site'ın gerçekte yüklediği harici kaynaklar: Google Fonts (style+font),
// @nuxt/image için izin verilen domainler (nuxt.config.ts -> image.domains),
// dosya yükleme önizlemesi için blob:/data: (bkz. components/FileUploader.vue),
// ve Site Ayarları'ndan (bkz. app.vue) etkinleştirilebilen Google Analytics/
// Tag Manager/AdSense. Font Awesome (cdnjs.cloudflare.com) kaldırıldığı için
// (kullanılmıyordu) buradan da çıkarıldı.
const CSP = [
  "default-src 'self'",
  // Nuxt'un SSR hydration script'i (window.__NUXT__) nonce altyapısı
  // olmadan inline çalıştığı için 'unsafe-inline' gerekli.
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com",
  // Google Fonts izinleri KALDIRILDI: Inter artık kendi sunucumuzdan
  // geliyor (public/fonts + assets/css/fonts.css). Ölçümde sayfanın hiçbir
  // harici sunucuya isteği kalmadı; izinleri açık bırakmak gereksiz yüzey.
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",
  "img-src 'self' data: blob: https://evenakliyatevden.com https://cdn.evenakliyatevden.com https://www.googletagmanager.com https://www.google-analytics.com",
  "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com",
  // google.com: İletişim sayfasındaki Google Haritalar embed'i (Site
  // Ayarları'ndan giriliyor). Bu izin olmadan admin haritayı ekliyor ama
  // tarayıcı iframe'i CSP nedeniyle sessizce engelliyordu.
  "frame-src https://www.googletagmanager.com https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

export default defineEventHandler((event) => {
  setHeader(event, "X-Frame-Options", "DENY");
  setHeader(event, "X-Content-Type-Options", "nosniff");
  setHeader(event, "Content-Security-Policy", CSP);
  setHeader(event, "Referrer-Policy", "strict-origin-when-cross-origin");
  setHeader(
    event,
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=()"
  );

  if (process.env.NODE_ENV === "production") {
    setHeader(event, "Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }
});

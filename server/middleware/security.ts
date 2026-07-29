// Site'ın gerçekte yüklediği harici kaynaklar: Google Fonts (style+font),
// Font Awesome CDN (style+font), @nuxt/image için izin verilen domainler
// (nuxt.config.ts -> image.domains), dosya yükleme önizlemesi için
// blob:/data: (bkz. components/FileUploader.vue), ve Site Ayarları'ndan
// (bkz. app.vue) etkinleştirilebilen Google Analytics/Tag Manager/AdSense.
const CSP = [
  "default-src 'self'",
  // Nuxt'un SSR hydration script'i (window.__NUXT__) nonce altyapısı
  // olmadan inline çalıştığı için 'unsafe-inline' gerekli.
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
  "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com",
  "img-src 'self' data: blob: https://evenakliyatevden.com https://cdn.evenakliyatevden.com https://www.googletagmanager.com https://www.google-analytics.com",
  "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com",
  "frame-src https://www.googletagmanager.com",
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

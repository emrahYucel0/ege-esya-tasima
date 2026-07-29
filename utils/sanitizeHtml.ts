// utils/sanitizeHtml.ts
// Nuxt bu klasörü otomatik import ediyor (composables/ ile aynı mekanizma).
// v-html ile render edilen tüm admin-yazılabilir CMS alanları (blog/bölge
// içeriği, istatistik ikonları, başlıklar vb.) burada geçmeli — aksi halde
// depolanan XSS'e açık olurlar (bkz. 2026-07-29 güvenlik denetimi bulgu #2).
//
// `sanitize-html` kasıtlı seçildi: saf JS (htmlparser2 tabanlı), jsdom
// gerektirmiyor. `isomorphic-dompurify` denendi ama jsdom'un
// @asamuzakjp/css-color -> @csstools/css-calc zincirindeki ESM/CJS
// uyumsuzluğu SSR'de tüm siteyi 500'e düşürdü (require() ile ESM-only
// modül çağrılıyor) — bu yüzden jsdom'suz bir alternatife geçildi.
import sanitizeHtmlLib from 'sanitize-html'

// TipTap zengin metin editörünün (StarterKit varsayılanları + Heading/
// Bold/Italic/Underline/BulletList/OrderedList/Image eklentileri) ürettiği
// etiketler + admin panellerdeki basit "başlıkta vurgu" span'leri için
// yeterli, script/iframe/on* gibi tehlikeli her şeyi dışarıda bırakan
// bir allowlist.
const ALLOWED_TAGS = [
  'p', 'br', 'span', 'strong', 'b', 'em', 'i', 'u', 's', 'strike',
  'h1', 'h2', 'h3', 'h4',
  'ul', 'ol', 'li',
  'a', 'img',
  'blockquote', 'code', 'pre', 'hr',
]

const ALLOWED_ATTRIBUTES = {
  '*': ['class'],
  a: ['href', 'target', 'rel', 'title'],
  img: ['src', 'alt', 'title'],
}

export function sanitizeHtml(dirty: unknown): string {
  if (typeof dirty !== 'string' || !dirty) return ''
  return sanitizeHtmlLib(dirty, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    disallowedTagsMode: 'discard',
  })
}

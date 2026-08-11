/**
 * useCountUp — istatistik rakamlarının görünür olunca sayarak artması.
 *
 * Güven bandındaki (TrustBar) "12.400+ taşınan ev" gibi rakamlar için.
 * Rakamın kendisi sunucudan gelen HTML'de HAZIR bulunur; bu composable
 * yalnızca görsel bir sunum katmanıdır:
 *
 *   • SSR / JS kapalı / IntersectionObserver yok  → nihai değer yazılı kalır.
 *   • prefers-reduced-motion                      → animasyon yok, nihai değer.
 *
 * Yani sayaç hiçbir koşulda içeriği gizlemez veya "0" bırakmaz.
 *
 * Metin biçimi korunur: "12.400+" gibi bir değerde ön ek/son ek ("+", "%",
 * "/5") ayrıştırılıp sabit tutulur, sadece sayı kısmı animasyonlanır ve
 * tr-TR binlik ayracıyla yazılır.
 */

const DURATION_MS = 1600

export interface CountUpOptions {
  /** Animasyon süresi (ms). */
  duration?: number
}

/** "12.400+" → { prefix:'', value:12400, suffix:'+', decimals:0 } */
export function parseStatValue(raw: string) {
  const text = String(raw ?? '').trim()
  const match = /^(\D*?)([\d.,\s]+)(.*)$/.exec(text)
  if (!match) return null

  const [, prefix, numeric, suffix] = match

  // tr-TR yazımı: nokta binlik, virgül ondalık ayracıdır.
  const normalized = numeric.replace(/[.\s]/g, '').replace(',', '.')
  const value = Number(normalized)
  if (!Number.isFinite(value)) return null

  const decimals = normalized.includes('.') ? normalized.split('.')[1].length : 0
  return { prefix, value, suffix, decimals }
}

/** Sayacın tetiklenmesi için elemanın görünmesi gereken oranı. */
const RUN_THRESHOLD = 0.6

export function useCountUp(
  target: Ref<HTMLElement | null>,
  options: CountUpOptions = {}
) {
  const { duration = DURATION_MS } = options

  let observer: IntersectionObserver | null = null
  let frame = 0
  let parsed: ReturnType<typeof parseStatValue> = null
  /** Animasyon en az bir kez oynadı mı? Sıfırlama yalnızca bundan sonra
   *  yapılır — aksi halde sayfa açılışında ekranın altında kalan bir rakam
   *  hiç görülmeden "0"a çekilir ve JS çalıştıran tarayıcı/tarayıcı botu
   *  sunucudan gelen gerçek değer yerine sıfır görürdü. */
  let hasRun = false
  let running = false

  const format = (value: number, decimals: number) =>
    value.toLocaleString('tr-TR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })

  const render = (el: HTMLElement, value: number) => {
    if (!parsed) return
    el.textContent = `${parsed.prefix}${format(value, parsed.decimals)}${parsed.suffix}`
  }

  const run = (el: HTMLElement) => {
    if (!parsed) return
    running = true
    // Not: `target` composable parametresinin adı; burada gölgelememek için
    // nihai değer `finalValue` olarak tutuluyor.
    const finalValue = parsed.value
    const start = performance.now()

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // easeOutExpo — token'daki --ease-out eğrisinin sayısal karşılığı.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      render(el, finalValue * eased)
      if (progress < 1) {
        frame = requestAnimationFrame(step)
      } else {
        frame = 0
        running = false
        hasRun = true
      }
    }

    frame = requestAnimationFrame(step)
  }

  onMounted(() => {
    const el = target.value
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) return

    // Nihai değer bir kez ayrıştırılıp saklanıyor; sonraki turlarda metin
    // animasyon sırasında değiştiği için tekrar ayrıştırmak güvenilmez olurdu.
    parsed = parseStatValue(el.textContent || '')
    if (!parsed) return

    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return

        if (entry.intersectionRatio >= RUN_THRESHOLD) {
          if (!running) run(el)
          return
        }

        // Eleman ekrandan TAMAMEN çıktığında sayacı başa sarıyoruz; böylece
        // kullanıcı yukarı kaydırıp geri döndüğünde animasyon yeniden
        // oynuyor. Sıfırlama görüş alanının dışında olduğu için ekranda
        // rakamın "0'a düştüğü" görülmez.
        if (entry.intersectionRatio === 0 && hasRun) {
          if (frame) cancelAnimationFrame(frame)
          frame = 0
          running = false
          render(el, 0)
        }
      },
      // İki eşik: 0 (tamamen çıktı) ve 0.6 (yeterince göründü).
      { threshold: [0, RUN_THRESHOLD] }
    )
    observer.observe(el)
  })

  onUnmounted(() => {
    observer?.disconnect()
    if (frame) cancelAnimationFrame(frame)
  })
}

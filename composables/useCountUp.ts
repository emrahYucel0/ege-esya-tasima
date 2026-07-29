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

export function useCountUp(
  target: Ref<HTMLElement | null>,
  options: CountUpOptions = {}
) {
  const { duration = DURATION_MS } = options

  let observer: IntersectionObserver | null = null
  let frame = 0

  const format = (value: number, decimals: number) =>
    value.toLocaleString('tr-TR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })

  const run = (el: HTMLElement) => {
    const parsed = parseStatValue(el.textContent || '')
    if (!parsed) return

    const { prefix, value, suffix, decimals } = parsed
    const start = performance.now()

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // easeOutExpo — token'daki --ease-out eğrisinin sayısal karşılığı.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      el.textContent = `${prefix}${format(value * eased, decimals)}${suffix}`
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
  }

  onMounted(() => {
    const el = target.value
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) return

    observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        observer?.disconnect()
        observer = null
        run(el)
      },
      { threshold: 0.6 }
    )
    observer.observe(el)
  })

  onUnmounted(() => {
    observer?.disconnect()
    if (frame) cancelAnimationFrame(frame)
  })
}

/**
 * useMagnetic — birincil CTA'ların imleci hafifçe "çekmesi".
 *
 * Elemanın üzerinde gezinirken imlecin merkeze göre konumunu, sınırlı bir
 * mesafeyle elemanın transform'una yansıtır. Amaç fark edilir bir efekt
 * değil, tıklanabilirliği artıran bilinçaltı bir geri bildirimdir — bu
 * yüzden varsayılan mesafe küçüktür (8px).
 *
 * Neden JS gerekiyor: imleç konumu CSS'te okunamaz. Ancak JS yalnızca iki
 * CSS değişkeni (--mx / --my) yazar; asıl dönüşümü CSS yapar
 * (bkz. assets/css/main.css → .magnetic). Böylece animasyon compositor'da
 * kalır ve reduced-motion tek noktadan devre dışı bırakılabilir.
 *
 * Kapsam: sadece hassas işaretçili cihazlar (fare/trackpad). Dokunmatikte
 * hover diye bir kavram olmadığı için listener bile bağlanmaz.
 */

type ElementSource = Ref<HTMLElement | { $el?: HTMLElement } | null>

export interface MagneticOptions {
  /** İmleç yönünde izin verilen maksimum kayma (px). */
  strength?: number
  /**
   * İmlecin DİNLENECEĞİ alan. Verilmezse hedefin kendisi dinlenir
   * (klasik manyetik buton). Daha büyük bir kap verilirse hedef, imleç o
   * kabın içinde gezinirken hafifçe kayar — Hero görselinin bölüm boyunca
   * fare hareketini takip etmesi (parallax) böyle kuruluyor.
   */
  area?: ElementSource
}

export function useMagnetic(target: ElementSource, options: MagneticOptions = {}) {
  const { strength = 8, area } = options

  let el: HTMLElement | null = null
  let zone: HTMLElement | null = null
  let frame = 0

  const resolve = (source: ElementSource): HTMLElement | null => {
    const value = source.value
    if (!value) return null
    // NuxtLink gibi component ref'leri DOM elemanını $el altında verir.
    return (value as { $el?: HTMLElement }).$el ?? (value as HTMLElement)
  }

  const onMove = (event: PointerEvent) => {
    if (!el || !zone) return
    if (frame) cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      const rect = zone!.getBoundingClientRect()
      // -1 … +1 aralığına normalize et, sonra strength ile ölçekle.
      const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
      const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
      el!.style.setProperty('--mx', `${clamp(dx) * strength}px`)
      el!.style.setProperty('--my', `${clamp(dy) * strength}px`)
    })
  }

  const reset = () => {
    if (frame) cancelAnimationFrame(frame)
    frame = 0
    el?.style.setProperty('--mx', '0px')
    el?.style.setProperty('--my', '0px')
  }

  onMounted(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    el = resolve(target)
    if (!el) return
    zone = area ? resolve(area) : el
    if (!zone) return

    el.classList.add('magnetic')
    zone.addEventListener('pointermove', onMove)
    zone.addEventListener('pointerleave', reset)
  })

  onUnmounted(() => {
    if (frame) cancelAnimationFrame(frame)
    zone?.removeEventListener('pointermove', onMove)
    zone?.removeEventListener('pointerleave', reset)
    el = null
    zone = null
  })
}

/** Sayıyı -1 … +1 aralığına sıkıştırır. */
function clamp(value: number) {
  return Math.max(-1, Math.min(1, value))
}

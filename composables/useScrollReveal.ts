// composables/useScrollReveal.ts
// Ana sayfadaki TÜM bölümlerin ortak scroll-animasyon dili — her component
// kendi GSAP tween'ini elle yazıp kendi zamanlama/easing değerlerini
// seçmek yerine, aynı "belirme" hissini (aynı mesafe, aynı hız eğrisi, aynı
// stagger aralığı) buradan alır. Bu, sayfa boyunca yukarı/aşağı kaydırırken
// bölümlerin birbirinden kopuk değil, tek bir tasarım sisteminin parçası
// gibi hissettirmesini sağlar.
//
// Temizlik: bu composable'ı çağıran her component, onUnmounted'da
// ScrollTrigger/tween'in .kill() edildiğinden emin olur (bkz. performans
// denetiminde bulunan ve düzeltilen GSAP bellek sızıntıları) — kill()
// çağrısı burada, tek yerde yapılıyor, her component'in kendi tekrar
// etmesine gerek yok.
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export interface ScrollRevealOptions {
  /** Kök element içinde stagger'lanacak alt öğelerin seçicisi (ör. '.reveal-item').
   *  Verilmezse kök elementin kendisi tek parça olarak animasyonlanır. */
  targets?: string
  /** Başlangıç dikey kayma mesafesi (px) */
  y?: number
  /** Başlangıç yatay kayma mesafesi (px) — ör. görselleri yandan getirmek için */
  x?: number
  /** targets verildiğinde öğeler arası gecikme (saniye) */
  stagger?: number
  /** Animasyon süresi (saniye) */
  duration?: number
  /** GSAP ScrollTrigger start değeri */
  start?: string
  /** Animasyon başlamadan önceki gecikme (saniye) */
  delay?: number
  /**
   * true ise ScrollTrigger hiç kullanılmaz, animasyon mount olur olmaz oynar.
   * Sayfa yüklendiğinde ZATEN görünür olan içerik (ör. Hero) için kullanılır:
   * ScrollTrigger'ın "start" mantığı scroll pozisyonuna göre çalışır, element
   * scroll=0'da zaten "geçilmiş" bir tetik noktasındaysa gsap.from()'un
   * başlangıç (opacity:0) durumunda takılı kalmasına yol açabiliyor.
   */
  immediate?: boolean
}

export function useScrollReveal(rootRef: Ref<HTMLElement | null>, options: ScrollRevealOptions = {}) {
  const {
    targets,
    y = 40,
    x = 0,
    stagger = 0.12,
    duration = 0.8,
    start = 'top 85%',
    delay = 0,
    immediate = false,
  } = options

  let tween: gsap.core.Tween | null = null
  let trigger: ScrollTrigger | null = null

  onMounted(() => {
    if (!rootRef.value) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const els = targets ? rootRef.value.querySelectorAll(targets) : rootRef.value
    if (targets && (els as NodeListOf<Element>).length === 0) return

    tween = gsap.from(els, {
      opacity: 0,
      y,
      x,
      duration,
      delay,
      stagger: targets ? stagger : 0,
      ease: 'power2.out',
      ...(immediate
        ? {}
        : {
            scrollTrigger: {
              trigger: rootRef.value,
              start,
              toggleActions: 'play none none none',
            },
          }),
    })
    trigger = tween.scrollTrigger ?? null
  })

  onUnmounted(() => {
    trigger?.kill()
    tween?.kill()
  })
}

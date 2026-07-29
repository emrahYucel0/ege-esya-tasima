// composables/useScrollReveal.ts
// Ana sayfadaki TÜM bölümlerin ortak scroll-animasyon dili — her component
// kendi tetikleme/animasyon mantığını elle yazmak yerine aynı "belirme"
// hissini (aynı mesafe, aynı hız eğrisi, aynı stagger aralığı) buradan alır.
//
// Tetikleyici olarak GSAP ScrollTrigger DEĞİL, IntersectionObserver
// kullanılıyor: canlı ortamda (Services bölümünde) ScrollTrigger'ın "top 85%"
// hesaplamasının güvenilir şekilde tetiklenmediği, kartların/butonun kalıcı
// olarak opacity:0'da takılı kaldığı tespit edildi. IntersectionObserver hem
// bu projede zaten kanıtlanmış bir desen (bkz. components/base/Card.vue),
// hem de "element mount anında zaten görünür" durumunu (Hero gibi
// üstte-katlanmış içerik) ekstra bir moda gerek kalmadan doğru şekilde
// ele alıyor — gözlemci .observe() çağrıldığı anda mevcut kesişim durumunu
// bildirir.
//
// Temizlik: bu composable'ı çağıran her component, onUnmounted'da
// observer/tween'in kill/disconnect edildiğinden emin olur.
import { gsap } from 'gsap'

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
  /** Animasyon başlamadan önceki gecikme (saniye) */
  delay?: number
  /** true ise IntersectionObserver hiç kullanılmaz, animasyon mount olur olmaz
   *  oynar. Sayfa yüklendiğinde zaten görünür olan içerik (ör. Hero) için. */
  immediate?: boolean
  /** IntersectionObserver eşiği (0-1) — elementin ne kadarı görünür olunca tetiklensin */
  threshold?: number
}

export function useScrollReveal(rootRef: Ref<HTMLElement | null>, options: ScrollRevealOptions = {}) {
  const {
    targets,
    y = 40,
    x = 0,
    stagger = 0.12,
    duration = 0.8,
    delay = 0,
    immediate = false,
    threshold = 0.15,
  } = options

  let tween: gsap.core.Tween | null = null
  let observer: IntersectionObserver | null = null

  const play = () => {
    if (!rootRef.value) return
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
    })
  }

  onMounted(() => {
    if (!rootRef.value) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    if (immediate) {
      play()
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          play()
          observer?.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(rootRef.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
    tween?.kill()
  })
}

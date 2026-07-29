import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin((nuxtApp) => {
  gsap.registerPlugin(ScrollTrigger)
  // Register other plugins as needed

  // ScrollTrigger, oluşturulduğu anki DOM yüksekliğine göre start/end
  // pozisyonlarını hesaplar. Sayfadaki resimler (Hero arka planı, servis
  // kartları vb.) component mount olduktan SONRA yüklenip sayfa yüksekliğini
  // değiştirdiğinde, önceden hesaplanmış tetik noktaları geçersiz kalıyor —
  // bir bölüm hiç scroll'a girmemiş gibi kalıcı olarak opacity:0'da takılı
  // kalabiliyor (canlı ortamda "kartlar/buton hiç görünmüyor" şikayetiyle
  // tespit edildi). Tüm resimler ve fontlar yüklendikten sonra tek seferlik
  // bir refresh() bunu düzeltir.
  if (import.meta.client) {
    window.addEventListener('load', () => ScrollTrigger.refresh())
  }

  return {
    provide: {
      gsap,
      ScrollTrigger
    }
  }
})
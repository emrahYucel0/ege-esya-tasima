/**
 * DÖNÜŞÜM TAKİBİ — telefon ve WhatsApp tıklamaları.
 *
 * Neden bileşenlere tek tek `@click` eklenmedi: telefon bağlantısı şu an 6
 * bileşende geçiyor ve bazıları şablon içinde dinamik olarak üretiliyor
 * (`:href="`tel:${...}`"`). Hepsine kanca takmak hem dağınık olurdu hem de
 * ileride eklenecek bağlantılar sessizce takip dışında kalırdı. Belge
 * seviyesinde tek bir dinleyici, bugünkü ve gelecekteki bütün bağlantıları
 * yakalıyor.
 *
 * `sendBeacon` kullanılıyor: telefon bağlantısına tıklamak sayfadan
 * AYRILMAYA sebep olur (arama uygulaması açılır). Normal bir fetch bu sırada
 * iptal edilebilir; beacon tarayıcı tarafından kuyruğa alınıp sayfa kapansa
 * bile gönderilir. Ayrıca yanıt beklemediği için gezinmeyi hiç geciktirmez.
 *
 * Ölçüm asla ziyaretçiyi engellemez: hata olursa sessizce yutuluyor,
 * bağlantının kendi davranışına (tel: açılması) dokunulmuyor.
 */
export default defineNuxtPlugin(() => {
  const bildir = (type: 'telefon' | 'whatsapp', page: string) => {
    try {
      const govde = JSON.stringify({ type, page })

      if (navigator.sendBeacon) {
        // text/plain: sendBeacon'ın ön uçuş (preflight) istemeyen tek JSON
        // taşıma biçimi. Sunucu tarafı metni JSON'a çeviriyor.
        navigator.sendBeacon('/api/events', new Blob([govde], { type: 'text/plain' }))
        return
      }

      // sendBeacon yoksa (çok eski tarayıcı) keepalive'lı fetch dener.
      fetch('/api/events', {
        method: 'POST',
        body: govde,
        headers: { 'Content-Type': 'text/plain' },
        keepalive: true,
      }).catch(() => { /* ölçüm başarısız olabilir, önemli değil */ })
    } catch {
      /* ölçüm ziyaretçiyi asla etkilemez */
    }
  }

  const tiklama = (olay: MouseEvent) => {
    const hedef = olay.target as HTMLElement | null
    const bag = hedef?.closest?.('a[href]') as HTMLAnchorElement | null
    if (!bag) return

    const adres = bag.getAttribute('href') || ''

    if (adres.startsWith('tel:')) {
      bildir('telefon', window.location.pathname)
      return
    }

    if (/wa\.me|api\.whatsapp\.com|web\.whatsapp\.com/.test(adres)) {
      bildir('whatsapp', window.location.pathname)
    }
  }

  // capture: bağlantı kendi işleyicisinde olayı durdursa bile ölçüm kaçmasın.
  document.addEventListener('click', tiklama, { capture: true, passive: true })
})

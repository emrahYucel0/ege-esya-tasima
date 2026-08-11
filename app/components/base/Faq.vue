<script setup>
/**
 * SIKÇA SORULAN SORULAR — akordeon + yapışkan yan sütun.
 *
 * DÜZELTİLEN HATALAR
 *
 * 1. SESSİZCE KESİLEN CEVAPLAR. Açılan panel `max-h-[500px]` ile
 *    sınırlıydı ve `overflow-hidden` taşan kısmı kırpıyordu. Ölçümde
 *    360px genişlikte 9 sorudan 4'ünün cevabı kesiliyordu; en kötüsünde
 *    724px'lik içeriğin 224px'i (maddeler listesinin tamamı) hiç
 *    görünmüyordu. Yerine `grid-template-rows: 0fr → 1fr` geçişi geldi:
 *    yükseklik sınırı yok, animasyon içeriğin gerçek boyuna göre akıyor.
 *
 * 2. YOK EDİLEN ODAK HALKASI. Akordeon butonlarında `focus:outline-none`
 *    vardı ve yerine hiçbir gösterge konmamıştı; ölçümde odaklanmış
 *    butonun `outline-style` değeri `none` çıkıyordu. Klavyeyle gezen
 *    kişi hangi soruda olduğunu göremiyordu. Kaldırıldı — global
 *    `:focus-visible` kuralı artık devreye giriyor.
 *
 * 3. KAPALI PANELİN EKRAN OKUYUCUYA OKUNMASI. `max-h-0` içeriği görsel
 *    olarak gizler ama erişilebilirlik ağacından ÇIKARMAZ; kapalı 9
 *    cevabın tamamı okunuyor, sekme sırasına giriyordu. Panel artık
 *    kapalıyken `visibility: hidden`.
 *
 * 4. BUTONUN İÇİNDEKİ BAŞLIK. `<button><h3>…</h3></button>` yapısı
 *    başlığı belge ana hattından düşürüyordu. WAI-ARIA APG'nin akordeon
 *    deseni tersini söylüyor: başlık butonu SARAR (`<h3><button>`).
 *
 * 5. TAŞAN GÖRSEL KOLAJI. İki görsel `ml-[-2rem] xl:ml-[-3rem]`,
 *    `mt-[-6rem] … ml-[4rem]` gibi negatif marjlarla üst üste bindiriliyor,
 *    üstlerine de `-top-10 -right-6` ile mutlak konumlu istatistik
 *    kartları oturtuluyordu. Bu yığın 1024px ve üzerinde sayfayı yatay
 *    olarak taşıtıyordu (`body { overflow-x: hidden }` çubuğu gizlediği
 *    için gözle fark edilmiyordu). Yerine iki sütunlu ızgara: istatistik
 *    kartı görselin İÇİNDE, negatif marj yok.
 *
 * 6. KÖK ELEMAN <div>. Bölüm `<div class="py-12">` ile başlıyordu; ne
 *    `<section>` ne de erişilebilir bir adı vardı. Artık <ui-section>.
 *
 * 7. İKİZ LİSTE. Canlı veri ve varsayılan veri için akordeon işaretlemesi
 *    baştan sona İKİ KEZ yazılmıştı (~55 satır kopya). Tek fark, detay
 *    maddelerinin birinde `{ text }` nesnesi diğerinde düz metin olması.
 *    Veri tek bir `faqItems` computed'ında normalize ediliyor, şablon tek.
 *
 * 8. GARANTİSİZ KONTRAST. İstatistik kartlarının `bgColor`/`textColor`
 *    alanları doğrudan inline style'a basılıyordu (bkz. Testimonial'daki
 *    aynı düzeltme). Admin panelinden girilen herhangi iki renk WCAG
 *    eşiğini sağlamayabilir. Kartlar artık design system tonlarını
 *    kullanıyor; bu iki alan cephede KULLANILMIYOR.
 *
 * 9. SABİT RENKLER. `#3b5d50`, `#2d473d`, `#f9bf29` doğrudan yazılıydı;
 *    hepsi token'lara bağlandı. Bileşenin scoped stilindeki
 *    `button:hover { color: #3b5d50 }` kuralı bölümdeki TÜM butonları
 *    (CTA dahil) etkiliyordu; kaldırıldı.
 *
 * YERLEŞİM KARARI
 * Soru listesi solda (asıl içerik, okuma sırasında önce gelir), görsel +
 * istatistik + CTA sağda yapışkan bir sütunda. Eski düzende CTA en altta
 * tek başına duruyordu; 9 soruluk listenin sonuna kadar inmeyen kişi onu
 * hiç görmüyordu. Yapışkan sütunda okuma boyunca ekranda kalıyor.
 *
 * Tek seferde tek panel açık kalır — mevcut davranış korundu.
 */
import { computed, ref } from 'vue'

const { data: faqResponse, error: fetchError } = await useFetch('/api/faq-section')
const faqData = computed(() => faqResponse.value?.data ?? null)

const mainTitle = computed(
  () => faqData.value?.mainTitle || 'Nakliye Sürecinizle İlgili Tüm Sorularınız'
)
const description = computed(
  () =>
    faqData.value?.description ||
    'Evden eve nakliyat sürecinizle ilgili merak ettikleriniz. Profesyonel taşımacılık hizmetlerimiz hakkında en çok sorulan sorular ve detaylı cevapları.'
)
const ctaTitle = computed(() => faqData.value?.ctaTitle || 'Başka sorunuz mu var?')
const ctaButtonText = computed(() => faqData.value?.ctaButtonText || 'Bize Ulaşın')
const ctaButtonLink = computed(() => faqData.value?.ctaButtonLink || '/iletisim')

/** Veri yoksa gösterilecek sorular. */
const DEFAULT_FAQS = [
  {
    question: 'Nakliye öncesi eşyalarımı nasıl hazırlamalıyım?',
    answer:
      'Eşyalarınızın güvenli taşınması için ön hazırlık çok önemlidir. Kırılacak eşyalarınızı özel ambalaj malzemeleriyle paketlemenizi, elektronik eşyalarınızın kablolarını sarmanızı ve özel eşyalarınızı ayrı bir yerde tutmanızı öneririz.',
    details: [
      'Kırılabilir eşyalar için köpük rulo ve özel karton kutular',
      'Elektronik cihazların orijinal kutularını saklayın',
      'Değerli evraklarınızı yanınıza alın',
      'Buzdolabı ve derin dondurucuyu taşımadan 24 saat önce boşaltın',
    ],
  },
  {
    question: 'Taşıma ücreti nasıl hesaplanır?',
    answer:
      'Nakliye ücreti mesafe, eşya hacmi, kat sayısı, asansör varlığı ve özel taşıma gerektiren eşyalar gibi faktörlere göre belirlenir. Ücretsiz keşif hizmetimizle net fiyat alabilirsiniz.',
    details: [
      'Şehir içi ve şehirlerarası farklı tarifeler',
      "50 km'ye kadar ücretsiz keşif",
      'Sabit fiyat garantisi',
      'Özel eşyalar için ek ücret yok',
    ],
  },
  {
    question: 'Sigorta kapsamı nedir?',
    answer:
      'Tüm taşıma işlemlerimiz %100 sigortalıdır. Eşyalarınızın değerine uygun olarak eksper raporu hazırlanır ve olası hasar durumunda ekspertiz heyeti tarafından değerlendirme yapılır.',
    details: [
      'Full kasko sigorta kapsamı',
      "Eşya değerinin %100'üne kadar teminat",
      'Hasar durumunda 7 gün içinde tazminat',
      'Uluslararası standartlarda paketleme garantisi',
    ],
  },
]

/**
 * Canlı veri ile varsayılan veriyi TEK bir şekle indirger. Canlı kayıtta
 * detaylar `{ id, text }` nesnesi, varsayılanda düz metin; şablonun bunu
 * bilmesi gerekmiyor.
 */
const faqItems = computed(() => {
  const live = (faqData.value?.faqs || []).filter((faq) => faq.isActive)
  const source = live.length ? live : DEFAULT_FAQS

  return source.map((item, index) => ({
    key: item.id ?? `default-${index}`,
    question: item.question,
    answer: item.answer,
    details: (item.details || []).map((detail, detailIndex) => ({
      key: detail?.id ?? `d-${detailIndex}`,
      text: typeof detail === 'string' ? detail : detail?.text,
    })),
  }))
})

const openIndex = ref(null)
const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}

const panelId = (index) => `faq-panel-${index}`

/**
 * Yan sütundaki iki görsel.
 *
 * İSTATİSTİK KARTLARI KALDIRILDI. Görsellerin alt kısmına mutlak konumlu
 * iki rakam kartı biniyordu ve fotoğrafın önemli bölümünü kapatıyordu.
 * 230px genişliğindeki bir görselde kartın kapladığı alan, görselin
 * kendisinden daha fazla dikkat çekiyordu.
 *
 * Rakamlar zaten ana sayfada güven bandında var (12+ yıl, 8.500+ taşıma,
 * %100 sigortalı, 81 il) — burada tekrar edilmelerinin bir gerekçesi de
 * yoktu. Veritabanındaki `FaqStatsCard` kayıtları SİLİNMEDİ; yalnızca
 * cephede kullanılmıyorlar.
 */
const FALLBACK_IMAGE = '/images/nakliye2.jpg'

const mediaCards = computed(() => {
  const images = faqData.value?.images || []

  const pick = (position, fallbackAlt) => {
    const found = images.find((image) => image.position === position)
    return {
      src: found?.imagePath || FALLBACK_IMAGE,
      alt: found?.altText || fallbackAlt,
    }
  }

  return [
    pick('primary', 'Profesyonel nakliyat ekibimiz iş başında'),
    pick('secondary', 'Nakliyat araç filomuz'),
  ]
})

const sectionRef = ref(null)
useReveal(sectionRef)
</script>

<template>
  <ui-section id="sss" ref="sectionRef" labelledby="sss-baslik">
    <div v-if="fetchError" class="card p-8 text-center text-ink-muted">
      <p>Sorular yüklenirken bir sorun oluştu.</p>
    </div>

    <template v-else>
      <ui-heading
        id="sss-baslik"
        eyebrow="Sıkça Sorulan Sorular"
        :title="mainTitle"
        :description="description"
        align="split"
      />

      <div class="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <!-- ── Soru listesi ──────────────────────────────────────────── -->
        <div class="lg:col-span-7">
          <div data-reveal-group class="flex flex-col gap-3">
            <div
              v-for="(item, index) in faqItems"
              :key="item.key"
              data-reveal
              class="faq-item"
              :class="{ 'is-open': openIndex === index }"
            >
              <h3 class="faq-item__heading">
                <button
                  type="button"
                  class="faq-item__trigger"
                  :aria-expanded="openIndex === index"
                  :aria-controls="panelId(index)"
                  @click="toggle(index)"
                >
                  <span class="faq-item__question">{{ item.question }}</span>
                  <span class="faq-item__marker" aria-hidden="true">
                    <ui-icon name="chevron-down" :size="18" :stroke="2" />
                  </span>
                </button>
              </h3>

              <!-- Panellere bilerek region rolü verilmedi: dokuz panelin her biri
                   ayrı bir landmark üretir ve ekran okuyucunun bölge listesini
                   kullanılamaz hale getirir; WAI-ARIA APG akordeon deseni de çok
                   panelli durumlar için bunu önermiyor. Butondaki aria-expanded
                   ve aria-controls ilişkiyi zaten kuruyor. -->
              <div :id="panelId(index)" class="faq-item__panel">
                <div class="faq-item__clip">
                  <div class="faq-item__body">
                    <p class="text-pretty">{{ item.answer }}</p>

                    <ul v-if="item.details.length" class="faq-item__details">
                      <li v-for="detail in item.details" :key="detail.key">
                        <ui-icon name="check" :size="16" :stroke="2" class="faq-item__check" />
                        <span>{{ detail.text }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Yapışkan yan sütun ────────────────────────────────────── -->
        <aside class="lg:col-span-5">
          <div class="flex flex-col gap-5 lg:sticky lg:top-28">
            <div class="grid grid-cols-2 gap-4">
              <div v-for="(card, index) in mediaCards" :key="index" data-reveal="scale" class="faq-media">
                <NuxtImg
                  :src="card.src"
                  :alt="card.alt"
                  class="faq-media__img"
                  format="webp"
                  quality="70"
                  sizes="(max-width: 1023px) 45vw, 230px"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <ui-card data-reveal padding="md" class="text-center">
              <span class="faq-cta__icon" aria-hidden="true">
                <ui-icon name="mail" :size="22" />
              </span>
              <p class="mt-4 text-h4 text-ink">{{ ctaTitle }}</p>
              <p class="mt-2 text-sm text-ink-muted">
                Ekibimiz sorunuzu aynı gün içinde yanıtlar.
              </p>
              <ui-button
                :to="ctaButtonLink"
                variant="primary"
                block
                trailing-icon="arrow-right"
                class="mt-5"
              >
                {{ ctaButtonText }}
              </ui-button>
            </ui-card>
          </div>
        </aside>
      </div>
    </template>
  </ui-section>
</template>

<style scoped>
/* ---- Akordeon ------------------------------------------------------- */
.faq-item {
  background: rgb(var(--c-surface));
  border: 1px solid rgb(var(--c-line));
  border-radius: var(--r-lg);
  transition:
    border-color var(--dur-base) var(--ease-soft),
    box-shadow var(--dur-base) var(--ease-soft);
}

.faq-item:hover {
  border-color: rgb(var(--c-line-strong));
}

.faq-item.is-open {
  border-color: rgb(var(--c-brand-600) / 0.35);
  box-shadow: var(--shadow-sm);
}

.faq-item__heading {
  margin: 0;
  font: inherit;
}

.faq-item__trigger {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1.125rem 1.25rem;
  text-align: left;
  color: rgb(var(--c-ink));
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  border-radius: inherit;
  cursor: pointer;
}

.faq-item__question {
  flex: 1 1 auto;
  text-wrap: pretty;
}

/* Açılış göstergesi. Kapalıyken yumuşak marka tonu, açıkken dolu. */
.faq-item__marker {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: var(--r-full);
  background: rgb(var(--c-brand-600) / 0.1);
  color: rgb(var(--c-brand-600));
  transition:
    transform var(--dur-base) var(--ease-out),
    background-color var(--dur-base) var(--ease-soft),
    color var(--dur-base) var(--ease-soft);
}

.faq-item.is-open .faq-item__marker {
  transform: rotate(180deg);
  background: rgb(var(--c-brand-600));
  color: rgb(var(--c-ink-inverse));
}

/*
 * Yükseklik animasyonu `grid-template-rows: 0fr → 1fr` ile yapılıyor.
 * Sabit bir `max-height` tahminine ihtiyaç kalmıyor, dolayısıyla uzun
 * cevaplar kırpılamıyor. Bu geçişi desteklemeyen eski tarayıcılarda
 * animasyon olmadan anında açılır — içerik yine eksiksiz görünür.
 */
.faq-item__panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--dur-base) var(--ease-out);
}

.faq-item.is-open .faq-item__panel {
  grid-template-rows: 1fr;
}

/* `visibility` kapalı paneli erişilebilirlik ağacından ve sekme
   sırasından da çıkarır; salt `overflow: hidden` bunu yapmaz. Geçiş
   süresi verildiği için gizlenme animasyonun SONUNDA uygulanır. */
.faq-item__clip {
  overflow: hidden;
  visibility: hidden;
  transition: visibility var(--dur-base) var(--ease-out);
}

.faq-item.is-open .faq-item__clip {
  visibility: visible;
}

.faq-item__body {
  padding: 0 1.25rem 1.25rem;
  color: rgb(var(--c-ink-muted));
  line-height: 1.7;
}

.faq-item__details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-left: 1rem;
  border-left: 2px solid rgb(var(--c-brand-600) / 0.25);
  list-style: none;
}

.faq-item__details li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.faq-item__check {
  flex-shrink: 0;
  margin-top: 0.3rem;
  color: rgb(var(--c-brand-600));
}

/* ---- Görsel + istatistik ------------------------------------------- */
.faq-media {
  /* `position: relative` KALDIRILDI: yalnızca üstteki mutlak konumlu
     istatistik kartını konumlandırmak içindi, o kart artık yok. */
  overflow: hidden;
  border-radius: var(--r-lg);
  box-shadow: var(--shadow-md);
}

.faq-media__img {
  display: block;
  width: 100%;
  /* 4/3 — Services kartlarıyla aynı oran. Daha uzun bir oran (4/5) yan
     sütunu soru listesi kadar uzun yapıyor ve yapışkanlığa kayacak yer
     bırakmıyordu (ölçüm: 726px hücrede 553px blok → 61px hareket). */
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

/* ---- CTA ------------------------------------------------------------ */
.faq-cta__icon {
  display: inline-grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: var(--r-full);
  background: rgb(var(--c-brand-600) / 0.1);
  color: rgb(var(--c-brand-600));
}
</style>

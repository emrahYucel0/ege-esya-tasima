<script setup>
/**
 * SAYFA BAŞLIĞI BANDI — iç sayfaların üstündeki koyu şerit.
 *
 * DÜZELTİLEN HATALAR
 *
 * 1. ⚠ BREADCRUMB YANLIŞ SAYFAYI GÖSTERİYORDU. Bileşen "Anasayfa / X"
 *    basıyordu ama X bulunulan sayfa DEĞİL, çağıran sayfanın `linkName`
 *    prop'uyla geçtiği BAŞKA bir sayfaydı. Ölçüm (canlı çıktı):
 *        /blog          → "Anasayfa / Bölgelerimiz"
 *        /bolgelerimiz  → "Anasayfa / Blog"
 *        /hakkimizda    → "Anasayfa / İletişim"
 *        /hizmetlerimiz → "Anasayfa / Bölgelerimiz"
 *        /iletisim      → "Anasayfa / Blog"
 *    Yani beş sayfanın beşinde de yol izi yanlıştı. Artık yol, bulunulan
 *    sayfanın kendi başlığından türüyor; `link`/`linkName` prop'ları kalktı,
 *    yanlış değer geçirmek MÜMKÜN DEĞİL.
 *
 * 2. ⚠ YANLIŞ BİLGİ GOOGLE'A GİDİYORDU. Bu değerler Microdata ile
 *    `BreadcrumbList` olarak işaretleniyordu — yani arama motoruna
 *    "/blog'un yolu Anasayfa > Bölgelerimiz'dir" deniyordu. Üstelik
 *    /hizmetlerimiz sayfasında JSON-LD ile ÇELİŞEN ikinci bir bildirim
 *    vardı. İşaretleme artık görünen yol izinin aynı kaynağından üretiliyor;
 *    ikisi ayrışamaz.
 *
 * 3. SON KIRINTI BAĞLANTIYDI. Bulunulan sayfa kendine bağlantı veriyordu.
 *    Artık bağlantı değil, `aria-current="page"` taşıyan düz metin.
 *
 * 4. GEÇERSİZ LİSTE YAPISI. Ayırıcı "/" karakteri `<ol>` altında doğrudan
 *    `<span>` olarak duruyordu; `<ol>` yalnızca `<li>` barındırabilir.
 *    Ayırıcı artık CSS ile (`::before`) veriliyor.
 *
 * 5. TANIMSIZ PROP'LAR KÖK ETİKETE SIZIYORDU. Çağıran sayfalar `page` ve
 *    `imageUrl` geçiyordu ama bileşen ikisini de tanımıyordu; Vue onları
 *    HTML özniteliği olarak basıyordu:
 *        <div … page="Yazılarımız" imageurl="/img/ege-esya-…jpg">
 *    `imageUrl` zaten eski "ege-esya" şablonundan kalma, kullanılmayan bir
 *    dosyayı gösteriyordu. `page` ise kaybolmuş bir alt başlığın kalıntısı —
 *    geri getirildi ve artık `subtitle` olarak gerçekten basılıyor.
 *
 * SADELEŞTİRME
 * 11 iç içe `<div>` (dördü yalnızca dekor), üç `blur-2xl` bulanık daire ve
 * 15 saniyede bir dönen SONSUZ gradient animasyonu vardı. Sonsuz animasyon
 * sayfa açık kaldığı sürece GPU'yu meşgul ediyor ama kimsenin dikkatini
 * çekmiyordu — kaldırıldı. Giriş animasyonu (başlığın belirmesi) kaldı.
 * Renkler ve ölçüler artık tasarım token'larından geliyor; bant 280px'ten
 * ~200px'e indi, kazanılan yer içeriğe gitti.
 */
const props = defineProps({
  /** Sayfanın H1'i. Yol izinin son basamağı da bundan türer. */
  title: { type: String, required: true },
  /** Başlığın altındaki tek cümlelik bağlam. Boşsa satır hiç basılmaz. */
  subtitle: { type: String, default: '' },
})

const route = useRoute()
const { siteUrl } = await useSiteSettings()

/**
 * Yol izi. İki basamaktan fazlası yok: bu bant yalnızca birinci seviye
 * sayfalarda kullanılıyor (blog, bölgelerimiz, hakkımızda, hizmetlerimiz,
 * iletişim). Derinlemesine kırılımı olan bölge/hizmet detay sayfaları bu
 * bandı KULLANMIYOR; onlar kendi JSON-LD kırılımlarını üretiyor.
 */
const basamaklar = computed(() => [
  { ad: 'Anasayfa', yol: '/' },
  { ad: props.title, yol: route.path },
])

/** Microdata `item` özniteliği mutlak adres ister. */
const mutlak = (yol) => `${siteUrl.value || ''}${yol === '/' ? '' : yol}`
</script>

<template>
  <!-- `on-dark`: global odak halkası marka yeşili ve bu koyu zeminde
       görünmüyordu; sınıf içerideki halkaları beyaza çeviriyor
       (bkz. assets/css/main.css). -->
  <header class="on-dark sayfa-bandi">
    <!-- Tek dekoratif katman: ince nokta dokusu. Öncesinde üç bulanık daire
         ve bir gölge katmanı daha vardı; ekranda fark edilmiyorlardı. -->
    <div class="sayfa-bandi__doku" aria-hidden="true"></div>

    <div class="container sayfa-bandi__icerik">
      <nav aria-label="Site yolu">
        <ol
          class="sayfa-bandi__yol"
          itemscope
          itemtype="https://schema.org/BreadcrumbList"
        >
          <li
            v-for="(basamak, i) in basamaklar"
            :key="basamak.yol"
            itemprop="itemListElement"
            itemscope
            itemtype="https://schema.org/ListItem"
          >
            <!-- Son basamak bağlantı DEĞİL: zaten o sayfadasınız. -->
            <NuxtLink
              v-if="i < basamaklar.length - 1"
              :to="basamak.yol"
              itemprop="item"
              class="sayfa-bandi__yol-bag"
            >
              <span itemprop="name">{{ basamak.ad }}</span>
            </NuxtLink>
            <span v-else itemprop="name" aria-current="page">{{ basamak.ad }}</span>

            <meta itemprop="position" :content="String(i + 1)" />
            <meta v-if="i === basamaklar.length - 1" itemprop="item" :content="mutlak(basamak.yol)" />
          </li>
        </ol>
      </nav>

      <h1 class="sayfa-bandi__baslik">{{ title }}</h1>
      <p v-if="subtitle" class="sayfa-bandi__alt">{{ subtitle }}</p>
    </div>
  </header>
</template>

<style scoped>
.sayfa-bandi {
  position: relative;
  overflow: hidden;
  padding-block: clamp(2.5rem, 1.8rem + 3vw, 4rem);
  background: linear-gradient(135deg, rgb(var(--c-brand-800)) 0%, rgb(var(--c-brand-600)) 100%);
  color: rgb(var(--c-ink-inverse));
}

/* Nokta dokusu — zeminin düz bir renk lekesi gibi durmasını engelliyor.
   Ölçü ve opaklık bilerek düşük: dokunun fark edilmesi değil, yüzeye
   derinlik vermesi amaçlanıyor. */
.sayfa-bandi__doku {
  position: absolute;
  inset: 0;
  opacity: 0.12;
  background-image: radial-gradient(circle at 1px 1px, #fff 1px, transparent 0);
  background-size: 22px 22px;
}

.sayfa-bandi__icerik {
  position: relative;
}

/* ---- Yol izi ---------------------------------------------------------- */
.sayfa-bandi__yol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 0.75rem;
  padding: 0;
  list-style: none;
  font-size: 0.875rem;
  color: rgb(var(--c-ink-inverse) / 0.75);
}

/* Ayırıcı CSS'te: öncesinde `<ol>` altında doğrudan `<span>` olarak
   duruyordu ve bu geçersiz HTML'di. */
.sayfa-bandi__yol li + li::before {
  content: '/';
  margin-right: 0.5rem;
  color: rgb(var(--c-ink-inverse) / 0.4);
}

.sayfa-bandi__yol-bag {
  color: inherit;
  transition: color var(--dur-fast) var(--ease-soft);
}

.sayfa-bandi__yol-bag:hover {
  color: rgb(var(--c-accent-300));
}

/* Bulunulan sayfa: bağlantı olmadığı için biraz daha belirgin. */
.sayfa-bandi__yol [aria-current='page'] {
  color: rgb(var(--c-ink-inverse));
  font-weight: 600;
}

/* ---- Başlık ----------------------------------------------------------- */
.sayfa-bandi__baslik {
  /* `text-h1` ölçeğiyle aynı akışkan değer — sitenin geri kalanı da bunu
     kullanıyor. Öncesinde text-2xl…lg:text-5xl elle kurulmuştu. */
  font-size: clamp(2.25rem, 1.6rem + 2.6vw, 3.5rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
  font-weight: 700;
  text-wrap: balance;
  animation: bandiBelir var(--dur-base) var(--ease-out) both;
}

.sayfa-bandi__alt {
  max-width: 52ch;
  margin-top: 0.75rem;
  font-size: clamp(1rem, 0.95rem + 0.3vw, 1.125rem);
  line-height: 1.65;
  color: rgb(var(--c-ink-inverse) / 0.85);
  text-wrap: pretty;
  animation: bandiBelir var(--dur-base) var(--ease-out) 0.08s both;
}

@keyframes bandiBelir {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sayfa-bandi__baslik,
  .sayfa-bandi__alt {
    animation: none;
  }
}
</style>

<script setup>
/**
 * TAŞINMA SÜRECİ — numaralı, dikey zaman çizelgesi.
 *
 * NEDEN YATAY DEĞİL DİKEY
 * Önceki düzen adımları `lg:grid-cols-5` ile beş dar sütuna diziyordu.
 * Ancak veritabanındaki adım açıklamaları 389-451 karakter: 1280px'lik bir
 * kapta beş sütun demek sütun başına ~230px demek, bu da adım başına ~30
 * satırlık bir metin sütunu demek. Okunabilir değildi.
 *
 * Dikey çizelgede metin ~700px genişliğinde akıyor, yani adım başına 5-6
 * satır. Ayrıca aynı düzen mobilde de birebir çalışıyor — ayrı bir mobil
 * kurgu yazmaya gerek kalmıyor.
 *
 * YAPIŞKAN SOL SÜTUN
 * Başlık ve açıklama masaüstünde ekranda sabit kalıyor, adımlar yanından
 * akıyor. Kullanıcı beşinci adımı okurken hangi bölümde olduğunu hâlâ
 * görüyor.
 *
 * DOLAN ÇİZGİ
 * Her adımın kendi çizgi parçası var ve o adım görünür olduğunda
 * yukarıdan aşağı büyüyor. Yeni bir mekanizma eklemedim: parça,
 * useReveal'ın zaten eklediği/kaldırdığı `.is-hidden` sınıfına bağlı.
 * Bu sayede kaydırma ilerledikçe çizgi bir sonraki adıma doğru
 * "çiziliyor" gibi görünüyor ve efekt her tarayıcıda çalışıyor.
 *
 * NOT: Adımlardaki `iconPath` alanı kasıtlı olarak KULLANILMIYOR. Bir
 * sürecin adımlarında doğru gösterge sıra numarasıdır; ikon sırayı
 * anlatmaz. (Alan veritabanında duruyor, ileride ihtiyaç olursa
 * kullanılabilir.)
 */
import { computed } from 'vue'

// `await useFetch` doğrudan burada, setup'ın en üst seviyesinde çağrılıyor
// (bkz. Choose.vue'daki aynı düzeltmenin gerekçesi).
const { data: processResponse, error: fetchError } = await useFetch('/api/process')
const processData = computed(() => processResponse.value?.data ?? null)
const steps = computed(() => processData.value?.steps || [])

const sectionRef = ref(null)
useReveal(sectionRef)
</script>

<template>
  <!--
    KOYU BANT — sayfa ritmi için bilinçli.
    Ana sayfada hero ile kapanış arasında SEKİZ bölüm vardı ve hepsi beyaz
    (255,255,255) ile açık gri (239,242,241) arasında dönüşümlüydü. İki renk
    arasındaki fark %6'nın altında; göz bunu ayrı bant olarak algılamıyor,
    uzun ve tek parça bir yüzey oluşuyordu. Ortadaki bu bölüm koyuya alınarak
    akış ikiye bölündü: koyu hero → açık → KOYU → açık → koyu kapanış.
    Süreç bölümü seçildi çünkü numaralı adımlar koyu zeminde en iyi duran
    içerik ve "nasıl çalışıyoruz" anlatısı görsel olarak ayrı bir bölüm
    gibi okunmayı hak ediyor.
  -->
  <ui-section
    id="surec"
    ref="sectionRef"
    tone="brand"
    labelledby="surec-baslik"
  >
    <div v-if="fetchError" class="card p-8 text-center text-ink-muted">
      <p>Bölüm verileri yüklenirken bir sorun oluştu.</p>
    </div>

    <!-- Izgarada `items-start` KULLANILMIYOR ve yapışkan blok doğrudan
         grid öğesi DEĞİL, onun içindeki bir kap.
         Sebep: position:sticky elemanın KENDİ kapsayıcı bloğu içinde
         hareket eder. `align-self: start` verilseydi sol grid öğesi kendi
         içerik yüksekliğinde (~390px) kalırdı; yapışkan blok da tam o
         boyda olduğu için yapışacak mesafe sıfır olur, efekt hiç
         çalışmazdı. Öğe varsayılan `stretch` ile satır boyunca (~1090px)
         uzayınca içindeki blok ~700px boyunca ekranda kalıyor.
         Ölçüldü: top 112px'de sabitleniyor, bölüm sonuna doğru bırakıyor. -->
    <div v-else-if="processData" class="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <!-- Yapışkan başlık sütunu -->
      <div class="lg:col-span-4">
        <div class="flex flex-col gap-4 lg:sticky lg:top-28">
          <span data-reveal="fade" class="eyebrow">Nasıl Çalışıyoruz</span>
          <h2 id="surec-baslik" data-reveal="blur" class="text-h2">
            {{ processData.mainTitle }}
          </h2>
          <p v-if="processData.description" data-reveal class="text-pretty text-white/75">
            {{ processData.description }}
          </p>
        </div>
      </div>

      <!-- Adımlar -->
      <div class="lg:col-span-8">
        <base-empty-state v-if="!steps.length" message="Henüz bir süreç adımı eklenmemiş." />

        <ol v-else class="process-list">
          <li
            v-for="(step, index) in steps"
            :key="step.id || index"
            data-reveal
            class="process-step"
            :class="{ 'is-last': index === steps.length - 1 }"
          >
            <span class="process-step__badge" aria-hidden="true">
              {{ index + 1 }}
            </span>
            <div class="process-step__body">
              <h3 class="text-h3">{{ step.title }}</h3>
              <p class="mt-2 text-pretty text-white/75">{{ step.description }}</p>
            </div>
          </li>
        </ol>
      </div>
    </div>

    <div v-else class="card p-8 text-center text-ink-muted">
      <p>Bölüm verisi bulunamadı. Lütfen yönetim panelinden bu bölüm için bir kayıt oluşturun.</p>
    </div>
  </ui-section>
</template>

<style scoped>
.process-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.process-step {
  position: relative;
  padding-left: 4rem;
  padding-bottom: 2.5rem;
}

.process-step.is-last {
  padding-bottom: 0;
}

/* Numaralı rozet — SARI, koyu zemin için.
   Öncesinde `brand-600` (59,93,80) idi; bölüm koyuya (brand-900, 30,45,40)
   alınınca ölçüldü: 1.94:1. Rozet bir şekil olarak bile seçilemiyordu
   (grafik öğe eşiği 3:1). accent-400 aynı zeminde 10.9:1 veriyor, içindeki
   rakam da brand-950 ile 10.6:1. Sarı ayrıca marka vurgu rengi — bu bant
   sayfanın tek sarı odaklı yeri olarak dikkati doğru yere çekiyor. */
.process-step__badge {
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: var(--r-full);
  background: rgb(var(--c-accent-400));
  color: rgb(var(--c-brand-950));
  font-size: 1.0625rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  box-shadow: 0 0 0 6px rgb(var(--c-accent-400) / 0.14);
}

/* Adımı bir sonrakine bağlayan çizgi parçası.
   transform-origin: top + scaleY, adım göründüğünde yukarıdan aşağı
   "çiziliyor". Yalnızca transform animasyonlandığı için düzen yeniden
   hesaplanmıyor. */
.process-step:not(.is-last)::before {
  content: "";
  position: absolute;
  top: 3.25rem;
  bottom: 0.5rem;
  left: calc(1.375rem - 1px);
  width: 2px;
  border-radius: 1px;
  /* Koyu zeminde marka yeşili çizgi görünmüyordu; beyazın düşük opaklığı
     hem seçiliyor hem araya girmiyor. */
  background: linear-gradient(
    to bottom,
    rgb(var(--c-ink-inverse) / 0.32),
    rgb(var(--c-ink-inverse) / 0.08)
  );
  transform-origin: top;
  transform: scaleY(1);
  transition: transform var(--dur-slow) var(--ease-out) 0.15s;
}

.process-step.is-hidden:not(.is-last)::before {
  transform: scaleY(0);
}

.process-step__body {
  padding-top: 0.375rem;
}

/* Dar ekranda rozet biraz küçülüyor, metin sütunu genişliyor. */
@media (max-width: 480px) {
  .process-step {
    padding-left: 3.25rem;
    padding-bottom: 2rem;
  }

  .process-step__badge {
    width: 2.25rem;
    height: 2.25rem;
    font-size: 0.9375rem;
    box-shadow: 0 0 0 4px rgb(var(--c-accent-400) / 0.14);
  }

  .process-step:not(.is-last)::before {
    top: 2.75rem;
    left: calc(1.125rem - 1px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .process-step:not(.is-last)::before {
    transition: none;
    transform: none !important;
  }
}
</style>

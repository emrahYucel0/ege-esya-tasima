<script setup>
/**
 * GÜVEN BANDI — Hero'nun hemen altındaki ince bant.
 *
 * NEDEN VAR
 * 1) Güven rakamları önceden Hizmetler bölümünün DİBİNE gömülüydü; ziyaretçi
 *    oraya ulaşana kadar firmanın büyüklüğü hakkında hiçbir sinyal almıyordu.
 *    Rakamlar ilk ekranın hemen altına taşındı.
 * 2) Hero açıklaması 695 karakterdi ve ilk ekranı bir metin duvarına
 *    çeviriyordu. Metin ikiye bölündü: kanca cümleleri Hero'da kaldı,
 *    detay cümleleri buraya (statsIntro) taşındı. Tek kelime içerik
 *    kaybı yok, tüm anahtar kelimeler hâlâ ana sayfada.
 *
 * VERİ
 * Kendi bölümü var: Admin > Güven Bandı.
 *
 * Önceden bu içerik `Services` modelinin İÇİNDE duruyordu (giriş metni
 * `statsIntro` alanında, rakamlar `Statistic` tablosunda). Bağ tarihseldi —
 * band bir zamanlar ana sayfadaki hizmetler bölümünün parçasıydı. O bölüm
 * kaldırılınca bağ tamamen anlamsızlaştı: panelde "Hizmetler" ekranını açan
 * kişi karşısında hiç ilgisi olmayan güven bandı alanlarını buluyordu.
 */
import { computed } from 'vue'

const { data: servicesResponse } = await useFetch('/api/trust-bar', {
  key: 'trust-bar-section',
})

const data = computed(() => servicesResponse.value?.data ?? null)
const intro = computed(() => data.value?.intro || '')
const stats = computed(() => data.value?.items || [])

const sectionRef = ref(null)
useReveal(sectionRef)
</script>

<template>
  <section
    v-if="intro || stats.length"
    ref="sectionRef"
    class="trust-bar"
    aria-label="Firma bilgileri ve rakamlarla güven göstergeleri"
  >
    <div class="container">
      <!-- Dikey düzen (paragraf üstte, rakamlar altta) bilinçli bir tercih:
           yan yana denendiğinde 471 karakterlik paragraf dar sütunda 11
           satıra çıkıp rakamların yanında koca bir boşluk bırakıyordu.
           Üst üste dizilince her iki blok da kendi doğal genişliğinde
           nefes alıyor ve her kırılma noktasında dengeli kalıyor. -->
      <div class="py-section-sm">
        <!-- Giriş metni -->
        <p
          v-if="intro"
          data-reveal
          class="mx-auto max-w-3xl text-pretty text-center text-ink-muted"
        >
          {{ intro }}
        </p>

        <!-- İstatistikler -->
        <dl
          v-if="stats.length"
          data-reveal-group
          class="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
          :class="intro ? 'mt-12' : ''"
        >
          <div
            v-for="(stat, index) in stats"
            :key="stat.id || index"
            data-reveal
            class="trust-stat"
          >
            <!-- Sunucudan gelen HTML'de nihai değer HAZIR yazılı; sayaç
                 yalnızca görsel bir katman (bkz. composables/useCountUp.ts).
                 JS kapalıysa veya hareket hassasiyeti varsa değer olduğu
                 gibi görünür. -->
            <dd class="text-stat text-brand-600">
              <ui-stat-value :value="stat.value" />
            </dd>
            <dt class="mt-2 text-sm leading-snug text-ink-muted">
              {{ [stat.label1, stat.label2].filter(Boolean).join(' ') }}
            </dt>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trust-bar {
  border-block: 1px solid rgb(var(--c-line));
  background: rgb(var(--c-surface));
}

.trust-stat {
  text-align: center;
  position: relative;
}

/* Ayırıcı çizgiler: her sütunun soluna, ilki hariç. Kenarlık yerine
   pseudo-element kullanılıyor ki grid boşluğunun tam ortasına otursun. */
.trust-stat + .trust-stat::before {
  content: "";
  position: absolute;
  inset-block: 0.25rem;
  left: -0.75rem;
  width: 1px;
  background: rgb(var(--c-line));
}

/* İki sütunlu (mobil) düzende sol sütunun çizgisi olmamalı. */
@media (max-width: 639px) {
  .trust-stat:nth-child(odd)::before {
    display: none;
  }
}
</style>

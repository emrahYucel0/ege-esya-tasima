<script setup>
/**
 * HAKKIMIZDA — hikâye / tarihçe.
 *
 * Eski `components/navbar/About.vue` içinde bu bölüm beyaz bir kutuda üç
 * arka arkaya paragraftı ve yanında `border-color: #3b82f6` (MAVİ) çizgili
 * istatistik kutuları vardı. İstatistikler artık girişte tek bir yerde
 * duruyor; burada yalnızca anlatı var.
 *
 * BÖLÜM BAŞLIKLARI NEDEN YOK
 * Üç metni "Kuruluş / Büyüme / Bugün" gibi başlıklarla etiketlemeyi
 * düşündüm ama vazgeçtim: bu alanlar admin panelinden serbestçe
 * değiştirilebiliyor ve yarın başka bir şey anlatan bir metin girildiğinde
 * başlık yalan söyler. Numaralar (01/02/03) içerikten bağımsız olarak
 * doğru kalıyor.
 */
import { computed } from 'vue'

const props = defineProps({
  data: { type: Object, default: null },
})

const title = computed(() => props.data?.historyTitle || '')
const chapters = computed(() =>
  [props.data?.historyText1, props.data?.historyText2, props.data?.historyText3].filter(
    (text) => text && text.trim()
  )
)

const sectionRef = ref(null)
useReveal(sectionRef)
</script>

<template>
  <ui-section v-if="chapters.length" ref="sectionRef" labelledby="hikaye-baslik">
    <div class="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <!-- `items-start` YOK: yapışkan blok, esneyen ızgara hücresinin
           içinde durmalı; hücre içeriğe küçülürse kayacak yer kalmaz
           (bkz. components/base/Process.vue'daki aynı düzeltme). -->
      <div class="lg:col-span-4">
        <div class="flex flex-col gap-4 lg:sticky lg:top-28">
          <span data-reveal="fade" class="eyebrow">Yolculuğumuz</span>
          <h2 id="hikaye-baslik" data-reveal="blur" class="text-h2 text-ink">{{ title }}</h2>
        </div>
      </div>

      <ol data-reveal-group class="story lg:col-span-8">
        <li
          v-for="(text, index) in chapters"
          :key="index"
          data-reveal
          class="story__item"
          :class="{ 'is-last': index === chapters.length - 1 }"
        >
          <span class="story__marker" aria-hidden="true">
            {{ String(index + 1).padStart(2, "0") }}
          </span>
          <p class="story__text">{{ text }}</p>
        </li>
      </ol>
    </div>
  </ui-section>
</template>

<style scoped>
.story {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.story__item {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .story__item {
    gap: 2rem;
  }
}

/* Numaraları birbirine bağlayan dikey ray. Belirme animasyonuyla birlikte
   aşağı doğru çiziliyor; `.is-hidden` kalkınca scaleY(0) → scaleY(1). */
.story__item:not(.is-last)::before {
  content: "";
  position: absolute;
  left: 1.375rem;
  top: 3.25rem;
  bottom: -2.5rem;
  width: 2px;
  background: linear-gradient(
    to bottom,
    rgb(var(--c-brand-600) / 0.35),
    rgb(var(--c-brand-600) / 0.05)
  );
  transform-origin: top center;
  transform: scaleY(1);
  transition: transform var(--dur-reveal) var(--ease-out);
}

.story__item.is-hidden:not(.is-last)::before {
  transform: scaleY(0);
}

.story__marker {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: var(--r-full);
  background: rgb(var(--c-brand-600));
  color: rgb(var(--c-ink-inverse));
  font-size: 0.875rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.story__text {
  margin: 0;
  padding-top: 0.5rem;
  max-width: 62ch;
  text-wrap: pretty;
  color: rgb(var(--c-ink-muted));
  line-height: 1.75;
}
</style>

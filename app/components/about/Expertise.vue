<script setup>
/**
 * HAKKIMIZDA — hizmet alanları kartları.
 *
 * DÜZELTİLEN HATA — 48px'e küçültülmüş fotoğraflar
 * Eski sürümde her kartın `iconPath` alanı 48x48px bir <img> olarak
 * basılıyordu. Alan bir ikon bekliyor ama admin panelinden fotoğraf da
 * girilebiliyor ve 48 piksele küçültülmüş bir fotoğraf okunmuyor.
 * Choose.vue'da kalıcı çözümü kurmuştuk, aynısı burada: değer bir vektör
 * ikon (.svg) ise olduğu gibi gösterilir, değilse design system ikonuna
 * düşülür. Gerçek ikonlar yüklendiğinde kod değişmeden devreye girer.
 */
import { computed } from 'vue'

const props = defineProps({
  data: { type: Object, default: null },
})

const services = computed(() => (props.data?.services || []).filter((item) => item.title))

/**
 * Sıraya göre yedek ikon; `iconPath` gerçek bir vektör ikon olduğunda
 * kullanılmaz. Seçim BİRBİRİNDEN AYIRT EDİLEBİLİR olmalarına göre yapıldı:
 * ilk denemede 4. ve 5. kart (`package` / `box`) neredeyse aynı kutuya
 * benziyordu; parça eşya için `sofa`, depolama için `box` ayrımı net.
 */
const FALLBACK_ICONS = ['home', 'truck', 'building', 'sofa', 'box', 'tools']

const isVectorIcon = (path) => typeof path === 'string' && /\.svg($|\?)/i.test(path)

const sectionRef = ref(null)
useReveal(sectionRef)
</script>

<template>
  <ui-section v-if="services.length" ref="sectionRef" tone="surface" labelledby="uzmanlik-baslik">
    <ui-heading
      id="uzmanlik-baslik"
      eyebrow="Hizmet Alanlarımız"
      title="Hangi İşleri Üstleniyoruz"
      description="Taşınmanın türü değişir, yaklaşımımız değişmez: önce yerinde keşif, sonra yazılı ve sabit fiyat, sonra planlanmış bir taşıma günü."
      align="split"
    />

    <div data-reveal-group class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
      <ui-card
        v-for="(service, index) in services"
        :key="service.id || index"
        data-reveal
        as="article"
        padding="md"
        interactive
      >
        <span class="expertise__icon" aria-hidden="true">
          <img
            v-if="isVectorIcon(service.iconPath)"
            :src="service.iconPath"
            alt=""
            class="h-6 w-6"
            loading="lazy"
          />
          <ui-icon v-else :name="FALLBACK_ICONS[index % FALLBACK_ICONS.length]" :size="24" />
        </span>

        <h3 class="mt-5 text-h4 text-ink">{{ service.title }}</h3>
        <p v-if="service.description" class="mt-2 text-pretty text-ink-muted">
          {{ service.description }}
        </p>
      </ui-card>
    </div>
  </ui-section>
</template>

<style scoped>
.expertise__icon {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: var(--r-md);
  background: rgb(var(--c-brand-600) / 0.08);
  color: rgb(var(--c-brand-600));
}
</style>

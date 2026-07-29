<script setup>
const { data: regionData } = await useFetch("/api/regions?light=true");
const { brandName } = await useSiteSettings();
const regions = computed(() =>
  regionData.value && regionData.value.success ? regionData.value.data : []
);
const recentRegions = computed(() => [...regions.value].reverse().slice(0, 6));

// Sonsuz kayan şerit artık saf CSS keyframe animasyonu (bkz. aşağıdaki
// .carousel-track). Kartlar iki kez render edilip -50% kaydırıldığı için
// döngü kesintisiz görünür; JS ölçüm/tween'ine gerek kalmaz.
const sectionRef = ref(null);
useReveal(sectionRef);
</script>

<template>
  <section ref="sectionRef" class="carousel-section container mx-auto px-4 py-20">
    <div class="text-center mb-16">
      <h3 data-reveal class="text-4xl md:text-5xl font-light text-stone-800">
        <span class="font-serif italic text-stone-600">Hizmet</span>
        Bölgelerimiz
      </h3>
      <p data-reveal class="text-stone-800 mt-4 max-w-2xl mx-auto">
        {{ brandName }} olarak, Türkiye'nin dört bir yanında güvenilir, hızlı ve
        profesyonel nakliye hizmeti sunuyoruz. Şehir içi ve şehirler arası
        taşımacılıkta uzman ekibimizle eşyalarınızı güvenle yeni adresinize
        ulaştırıyoruz.
      </p>
    </div>

    <base-empty-state
      v-if="!recentRegions.length"
      message="Henüz yayınlanmış bir hizmet bölgesi bulunmuyor."
    />
    <div v-else class="carousel-wrapper relative overflow-hidden py-8">
      <div class="carousel-track flex gap-6">
        <template v-for="copy in 2" :key="`copy-${copy}`">
          <div
            v-for="region in recentRegions"
            :key="`${copy}-${region.id}`"
            class="carousel-card relative flex-shrink-0 w-80"
            :aria-hidden="copy === 2 ? 'true' : undefined"
          >
            <div
              class="card-inner bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <NuxtImg
                provider="imgix"
                format="webp"
                quality="70"
                loading="lazy"
                :src="region.image || '/img/default-region.jpg'"
                class="carousel-img w-full h-48 object-cover rounded-t-xl"
                :alt="region.title"
                :title="region.title"
              />
              <div class="p-6">
                <NuxtLink
                  :to="`/${region.slug}`"
                  class="text-xl font-medium text-stone-800 mb-2 hover:underline line-clamp-2"
                  :tabindex="copy === 2 ? -1 : undefined"
                  :aria-label="`${region.title} bölgesi için detaylar`"
                >
                  {{ region.subtitle + " Nakliyat" }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </template>
      </div>

      <div
        class="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"
      ></div>
      <div
        class="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"
      ></div>
    </div>
  </section>
</template>

<style scoped>
.carousel-section {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(250, 250, 249, 0.96) 100%
  );
}

.carousel-wrapper {
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 5%,
    black 95%,
    transparent 100%
  );
}

/* Sonsuz kayan şerit — saf CSS.
   Şerit iki özdeş kart kümesi içerir; -50% kaydığında ikinci küme birincinin
   başlangıç konumuna denk gelir, böylece döngü sıçramasız görünür. */
.carousel-track {
  width: max-content;
  animation: carousel-scroll 60s linear infinite;
  will-change: transform;
}

/* Üzerine gelince dursun: kullanıcı bir karta tıklamak istediğinde hedefin
   kaçması kötü bir deneyimdir. */
.carousel-wrapper:hover .carousel-track,
.carousel-wrapper:focus-within .carousel-track {
  animation-play-state: paused;
}

@keyframes carousel-scroll {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
}

.carousel-card {
  perspective: 1000px;
  transform-style: preserve-3d;
}

.card-inner {
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1),
    box-shadow 0.4s ease;
}

.carousel-card:hover .card-inner {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.1);
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .carousel-card {
    width: 280px;
  }

  .carousel-img {
    height: 180px;
  }

  h2 {
    font-size: 2.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .carousel-card,
  .card-inner {
    transition: none !important;
    transform: none !important;
  }

  /* Sürekli hareket, hareket hassasiyeti olan kullanıcı için en rahatsız
     edici animasyon türüdür — tamamen durdurulur. */
  .carousel-track {
    animation: none !important;
  }
}
</style>

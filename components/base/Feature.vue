<script setup>
const { data: features } = await useFetch("/api/feature", {
  key: "features-data",
  // API artık {success,data} zarfı dönüyor; transform içinde tek noktadan unwrap ediyoruz.
  transform: (response) => {
    const record = response?.data;
    if (!record) return null;
    return {
      ...record,
      image: `${record.image}?auto=format,compress&w=1000&q=60`,
    };
  },
});

// Belirme animasyonu ortak animasyon dilinden geliyor
// (bkz. composables/useReveal.ts). İkonun hover'da dönmesi zaten
// template'teki `group-hover:rotate-12` sınıfıyla CSS tarafından yapılıyordu;
// buradaki eski `gsap.to(".group:hover svg")` çağrısı hiçbir zaman
// çalışmıyordu (":hover" bir CSS sözde sınıfıdır, querySelector ile
// eşleşmez) — kaldırıldı.
const sectionRef = ref(null);
useReveal(sectionRef);
</script>

<template>
  <section ref="sectionRef" id="ycl-feature" class="min-h-screen">
    <div class="container mx-auto px-4 lg:px-0 overflow-hidden max-w-7xl">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div data-reveal-group class="feature-text space-y-8">
          <div
            data-reveal
            class="inline-block bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-md border border-stone-200/50 mb-5"
          >
            <p
              class="text-xl uppercase tracking-wider text-stone-800 font-medium my-auto"
            >
              {{ features?.subtitle || "Nakliye Uzmanlığı" }}
            </p>
          </div>

          <h2
            data-reveal
            class="text-4xl lg:text-5xl font-semibold text-stone-800 font-serif italic leading-tight"
          >
            <span class="font-serif italic text-stone-600 block mb-2">
              {{ features?.title || "Profesyonel Çözümlerimiz" }}
            </span>
          </h2>

          <div data-reveal class="space-y-6">
            <div
              v-for="(type, index) in features?.featureTypes"
              :key="index"
              class="group flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] transition-all duration-300 border border-stone-200/50"
            >
              <div
                class="flex-shrink-0 p-3 bg-stone-100 rounded-lg transform group-hover:rotate-12 transition-transform"
              >
                <svg
                  class="w-6 h-6 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  aria-label="Ege eşya hizmet ikonları"
                >
                  <path v-if="index === 0" d="M5 13l4 4L19 7" />
                  <path
                    v-else-if="index === 1"
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  />
                  <path
                    v-else
                    d="M20.42 4.58a5.4 5.4 0 00-7.65 0l-.77.78-.77-.78a5.4 5.4 0 00-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"
                  />
                </svg>
              </div>

              <div>
                <h3 class="text-lg font-medium text-stone-800 mb-1">
                  {{ type.title || "Premium Hizmet Kalitesi" }}
                </h3>
                <p class="text-stone-800 text-md leading-relaxed">
                  {{
                    type.description ||
                    "20 yıllık deneyimle eşyalarınızı özenle taşıyoruz"
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          data-reveal="right"
          class="feature-image aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] transition-all duration-300 transform-style-preserve-3d"
        >
          <NuxtImg
            provider="imgix"
            class="w-full h-full object-cover"
            :src="features?.image || '/img/ege-esya-tasima-servisler.jpg'"
            :title="features.title"
            alt="Profesyonel Taşıma Hizmeti"
            format="webp"
            quality="70"
            sizes="sm:100vw md:100vw lg:100vw xl:100vw 2xl:1536px"
            decoding="async"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style>
@media (prefers-reduced-motion: reduce) {
  .feature-text > *,
  .feature-image,
  .group:hover svg {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}

.transform-style-preserve-3d {
  transform-style: preserve-3d;
}

@media (min-width: 641px) and (max-width: 1024px) {
  .feature-text h2 {
    text-align: center;
  }

  .feature-text .inline-block {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .feature-text .inline-block p {
    text-align: center;
  }
}

@media (max-width: 640px) {
  .feature-text h2 {
    text-align: center;
  }

  .feature-text .inline-block {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .feature-text .inline-block p {
    text-align: center;
  }
}
</style>

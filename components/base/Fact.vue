<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const fact = ref(null);
const loading = ref(true);
const error = ref(null);

try {
  const { data } = await useFetch("/api/fact");
  fact.value = data.value;
} catch (err) {
  error.value = "An error occurred while loading data. Please try again later.";
} finally {
  loading.value = false;
}

onMounted(() => {
  gsap.utils.toArray(".animate-fade").forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: "power3.out",
      delay: i * 0.2,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
      },
    });
  });

  gsap.to(".group:hover .icon-rotate", {
    rotate: 15,
    duration: 0.5,
    ease: "elastic.out(1, 0.5)",
  });
});
</script>

<template>
  <section
    id="ycl-fact"
    class="relative overflow-hidden min-h-[600px] bg-gradient-to-tr from-stone-100/50 to-transparent"
  >
    <div class="max-w-7xl mx-auto py-20 px-6 lg:px-8">
      <div v-if="loading" class="text-center animate-pulse py-12">
        <p class="text-stone-700 text-xl font-medium">Loading...</p>
      </div>

      <div
        v-else-if="error"
        class="text-center bg-red-50 p-8 rounded-2xl max-w-lg mx-auto shadow-md"
      >
        <p class="text-red-700 text-lg font-semibold">⚠️ {{ error }}</p>
      </div>

      <div
        v-else
        class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-hidden"
      >
        <div
          class="animate-fade rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2"
        >
          <NuxtImg
            provider="imgix"
            src="/img/ege-guvenli-tasima.jpg"
            alt="Ege Eşya Taşıma Profosyonel Nakliyat Görseli"
            title="Ege Eşya Taşıma Profosyonel Nakliyat Görseli"
            class="w-full h-72 lg:h-[520px] object-cover object-center"
            format="webp"
            quality="70"
            sizes="sm:100vw md:100vw lg:50vw xl:50vw 2xl:1536px"
            decoding="async"
            loading="lazy"
          />
        </div>

        <div class="space-y-8 animate-fade">
          <div
            class="inline-block bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-md border border-stone-200/50"
          >
            <p
              class="text-xl uppercase tracking-wider text-stone-800 font-medium my-auto"
            >
              {{ fact?.subtitle || "Bunları Biliyor muydunuz?" }}
            </p>
          </div>

          <h2
            class="text-4xl lg:text-5xl font-semibold text-stone-900 leading-tight"
          >
            <span class="font-serif italic text-stone-700 block mb-3">
              {{
                fact?.title ||
                "Tüm nakliye işlemlerinizi kolayca yönetebileceğiniz bir numaralı adres!"
              }}
            </span>
          </h2>

          <div class="max-w-none">
            <p
              class="text-stone-600 text-lg lg:text-xl leading-relaxed contrast-more:text-stone-800"
            >
              {{
                fact?.description ||
                "Eşya taşıma süreçlerinizi hızlı, güvenli ve uygun fiyatlarla gerçekleştiriyoruz. Evden eve nakliyat, ofis taşıma ve parça eşya taşımacılığı gibi hizmetlerimizle ihtiyaçlarınıza özel çözümler sunuyoruz."
              }}
            </p>
          </div>

          <div
            class="group relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-stone-200 hover:-translate-y-1"
          >
            <div class="flex items-center gap-5">
              <div
                class="p-4 bg-stone-100 rounded-full icon-rotate transition-transform"
              >
                <svg
                  class="w-9 h-9 text-stone-800"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  aria-label="Telefon İkonu"
                  stroke-width="1.75"
                >
                  <path
                    d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5l1.5-2.5 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"
                  />
                </svg>
              </div>
              <div>
                <a
                  :href="`tel:${fact?.phone || '05326454289'}`"
                  aria-label="Telefon Çağrı Linki"
                  class="text-primary text-2xl font-semibold hover:text-stone-700 transition-colors duration-300"
                >
                  {{ fact?.phone || "0532 645 42 89" }}
                </a>
                <p class="text-stone-500 text-sm mt-1 font-medium">
                  {{ fact?.phoneLabel || "24/7 Free Consultation" }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (max-width: 640px) {
  .space-y-8 h2 {
    @apply text-3xl text-center;
  }

  .space-y-8 .inline-block {
    @apply flex justify-center w-full;
  }

  .space-y-8 .inline-block p {
    @apply text-center;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .space-y-8 h2 {
    @apply text-center;
  }

  .space-y-8 .inline-block {
    @apply flex justify-center w-full;
  }

  .space-y-8 .inline-block p {
    @apply text-center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade,
  .group:hover .icon-rotate {
    animation: none;
    transition: none;
  }
}
</style>

<script setup>
import { gsap } from "gsap";

const { data: heroContent } = await useFetch("/api/hero", {
  key: "hero-data",
});

const titleText = ref(null);
const isMobile = ref(false);

onMounted(() => {
  isMobile.value = window.innerWidth < 1024;

  if (!isMobile.value) {
    gsap.from(titleText.value, {
      duration: 1.2,
      y: -200,
      opacity: 0,
      ease: "slow(0.7, 0.7, false)",
      delay: 0.5,
      onStart: () => {
        gsap.set(titleText.value, { opacity: 1 });
      },
    });
  }
});
</script>

<template>
  <section
    id="ycl-hero"
    class="ycl-hero relative min-h-screen lg:overflow-hidden"
  >
    <div
      class="relative z-10 container mx-auto px-4 lg:h-screen flex items-center py-16 lg:py-0"
    >
      <div
        class="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center"
      >
        <div class="relative w-full lg:order-2">
          <div class="relative max-w-2xl mx-auto group">
            <div
              class="absolute w-[110%] h-[110%] -inset-[5%] bg-gradient-to-br from-stone-500/40 to-transparent rounded-3xl shadow-2xl blur-md transform transition-all duration-500 group-hover:scale-105 lg:block hidden"
              aria-hidden="true"
            ></div>
            <NuxtImg
              v-if="heroContent.data.image"
              :src="
                heroContent.data?.image ||
                '/img/ege-esya-tasima-genel-anasayfa.jpg'
              "
              alt="Ege Eşya Taşıma Ana Sayfa Paketlenmiş Eşyalar Görseli"
              title="Ege Eşya Taşıma Ana Sayfa Paketlenmiş Eşyalar"
              provider="imgix"
              format="webp"
              quality="70"
              sizes="sm:100vw md:100vw lg:100vw xl:100vw 2xl:1536px"
              decoding="async"
              fetchpriority="high"
              class="relative z-10 w-full h-full object-cover object-center hero-image rounded-3xl shadow-lg lg:shadow-xl transform transition-all duration-700 ease-out lg:-rotate-6 lg:group-hover:rotate-0 lg:group-hover:scale-105"
              :data-src="heroContent.data.image"
            />
          </div>
        </div>

        <div
          class="hero-content space-y-4 md:space-y-6 lg:space-y-8 text-center lg:text-left lg:order-1"
        >
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light">
            <span
              ref="titleText"
              class="font-serif italic text-stone-900 block mb-2 lg:-skew-y-6"
              >{{ heroContent.data.title }}</span
            >
          </h1>
          <h2
            class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-stone-700"
          >
            {{ heroContent.data.subtitle }}
          </h2>

          <p
            v-if="heroContent.data.description"
            class="text-stone-600 contrast-more:text-stone-800 text-base sm:text-lg lg:text-xl leading-relaxed max-w-prose mx-auto lg:mx-0"
          >
            {{ heroContent.data.description }}
          </p>

          <div
            class="hero-btns flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            aria-label="Yönlendirme Butonları"
          >
            <NuxtLink
              v-if="heroContent.data.primaryButton"
              :to="heroContent.data.primaryLink"
              :aria-label="heroContent.data.primaryButton + ' butonu'"
              prefetch
              tabindex="0"
              class="px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 text-sm sm:text-base lg:text-lg font-medium rounded-full bg-stone-800 text-white hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center"
            >
              {{ heroContent.data.primaryButton }}
              <svg
                class="w-4 h-4 sm:w-5 sm:h-5 inline-block ml-2 -mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-label="sağ yön ok ikonu"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </NuxtLink>

            <NuxtLink
              v-if="heroContent.data.secondaryButton"
              :to="heroContent.data.secondaryLink"
              :aria-label="heroContent.data.secondaryButton + ' butonu'"
              prefetch
              tabindex="0"
              class="px-5 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 text-sm sm:text-base lg:text-lg font-medium rounded-full border-2 border-stone-300 hover:border-stone-400 text-stone-700 hover:text-stone-900 transition-all duration-300 flex items-center justify-center"
            >
              {{ heroContent.data.secondaryButton }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div
      class="bounce absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block"
    >
      <div
        class="w-8 h-14 rounded-3xl border-2 border-stone-400 flex items-start justify-center p-1"
      >
        <div class="w-2 h-2 bg-stone-500 rounded-full animate-scroll"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ycl-hero {
  min-height: calc(100vh - 80px);
}

@keyframes scroll {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
}

.animate-scroll {
  animation: scroll 1.5s infinite;
}

@media (max-width: 1023px) {
  .hero-content {
    padding-top: 1rem;
  }

  .hero-content h1 {
    line-height: 1.2;
  }

  .hero-content h2 {
    line-height: 1.3;
    margin-bottom: 0.5rem;
  }

  .hero-btns {
    margin-top: 1.5rem;
  }

  .hero-image {
    margin-top: 5rem;
    margin-bottom: 1.5rem;
    max-height: 350px;
    object-position: center top;
  }
}

@media (max-width: 640px) {
  .hero-content h1 {
    font-size: 2.25rem;
  }

  .hero-content h2 {
    font-size: 1.75rem;
  }

  .hero-btns a {
    padding: 0.75rem 1.5rem;
  }

  .hero-image {
    max-height: 280px;
  }
}
</style>

<script setup>
import { gsap } from "gsap";

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

const goBack = () => {
  window.history.length > 1 ? window.history.back() : navigateTo('/');
};
</script>

<template>
  <section id="ycl-404" class="ycl-404 relative min-h-screen overflow-hidden">
    <div class="absolute inset-0 z-0 opacity-10">
      <div
        class="absolute w-72 h-72 bg-primary/5 -top-32 -left-32 rotate-45 rounded-3xl"
        aria-hidden="true"
      ></div>
      <div
        class="absolute w-64 h-64 border-4 border-stone-300/20 -bottom-24 -right-24 rotate-12 rounded-[3rem]"
        aria-hidden="true"
      ></div>
    </div>

    <div class="relative z-10 container mx-auto px-4 h-screen flex items-center">
      <div class="flex flex-col lg:flex-row gap-12 items-center justify-center w-full">
        <div class="text-center lg:text-left max-w-2xl">
          <h1 class="text-6xl md:text-7xl lg:text-8xl font-light mb-4">
            <span
              ref="titleText"
              class="font-serif italic text-stone-600 block lg:-skew-y-6"
              >404</span
            >
          </h1>
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-semibold text-stone-600 mb-6">
            Sayfa Bulunamadı
          </h2>

          <p class="text-stone-800 text-lg lg:text-xl leading-relaxed mb-8">
            Aradığınız sayfa taşınmış veya kaldırılmış olabilir.
            <br class="hidden lg:block">
            Ana sayfaya dönerek aradığınız içeriğe ulaşabilirsiniz.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <NuxtLink
              to="/"
              aria-label="Ana sayfaya dön butonu"
              class="px-6 py-3 lg:px-8 lg:py-4 text-base lg:text-lg font-medium rounded-full bg-primary text-white hover:bg-stone-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Ana Sayfaya Dön
              <svg
                class="w-5 h-5 inline-block ml-2 -mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </NuxtLink>

            <button
              @click="goBack"
              aria-label="Geri git butonu"
              class="px-6 py-3 lg:px-8 lg:py-4 text-base lg:text-lg font-medium rounded-full border-2 border-stone-300 hover:border-stone-400 text-stone-700 hover:text-stone-900 transition-all duration-300"
            >
              Geri Git
            </button>
          </div>
        </div>

        <div class="relative w-full max-w-md">
          <div class="relative">
            <div
              class="absolute w-[105%] h-[105%] -inset-[2.5%] bg-stone-500/50 rounded-[2rem] shadow-xl blur-[1px]"
              aria-hidden="true"
            ></div>
            <div class="relative z-10 transform transition-all duration-300">
              <NuxtImg
                src="/img/404-error.jpg"
                alt="404 Sayfa Bulunamadı Görseli"
                title="404 Sayfa Bulunamadı"
                provider="imgix"
                format="webp"
                quality="70"
                sizes="sm:100vw md:100vw lg:100vw xl:100vw 2xl:1536px"
                decoding="async"
                class="w-full h-full object-cover object-center rounded-3xl shadow-lg -rotate-6 hover:rotate-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ycl-404 {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(250, 250, 249, 0.9) 100%
  );
}

@media (max-width: 1024px) {
  .ycl-404 {
    padding: 4rem 0;
  }

  h1 {
    font-size: 4rem !important;
  }

  h2 {
    font-size: 2.5rem !important;
  }
}

@media (max-width: 640px) {
  .ycl-404 {
    min-height: auto;
    padding: 2rem 0;
  }

  h1 {
    font-size: 3rem !important;
  }

  h2 {
    font-size: 2rem !important;
  }

  .font-serif {
    transform: none !important;
    animation: none !important;
  }
}

.btn-primary:hover svg {
  transform: translateX(3px);
  transition: transform 0.3s ease;
}
</style>
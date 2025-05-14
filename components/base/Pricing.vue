<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const { data, error } = await useFetch("/api/price", {});

const pricingPlans = ref([]);
const pricingPlanInfo = ref({
  title: "",
  subtitle: "",
});

if (data.value && !error.value) {
  pricingPlanInfo.value = {
    title: data.value.title,
    subtitle: data.value.subtitle,
  };

  const plans = [
    ...(data.value.basicFeatures || []).map((plan) => ({
      name: plan.planName,
      price: plan.price,
      features: (plan.basicPlanTypes || []).map((item) => item.description),
    })),
    ...(data.value.standardFeatures || []).map((plan) => ({
      name: plan.planName,
      price: plan.price,
      features: (plan.standardPlanTypes || []).map((item) => item.description),
    })),
    ...(data.value.advancedFeatures || []).map((plan) => ({
      name: plan.planName,
      price: plan.price,
      features: (plan.advancedPlanTypes || []).map((item) => item.description),
    })),
  ];

  pricingPlans.value = plans;
}

const startGSAPAnimation = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.utils.toArray(".price-item").forEach((item, index) => {
    gsap.fromTo(
      item,
      { opacity: 0, y: 100, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: index * 0.3,
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          end: "bottom 50%",
          toggleActions: "play none none reverse",
          scrub: 0.5,
        },
      }
    );
  });
};

onMounted(async () => {
  await nextTick();
  startGSAPAnimation();
});
</script>

<template>
  <section id="ycl-price" class="relative py-24 overflow-hidden">
    <div
      v-if="error"
      class="text-red-600 text-center py-12 relative z-10 font-medium text-lg"
    >
      Üzgünüz, fiyatlandırma bilgilerini yüklerken bir hata oluştu.
    </div>

    <section v-else class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
      <header class="text-center mb-16">
        <div
          class="inline-block bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-md border border-stone-200/50 mb-5"
        >
          <p
            class="text-xl uppercase tracking-wider text-stone-800 font-medium my-auto"
          >
            {{ pricingPlanInfo.subtitle || "Fiyatlandırma Planları" }}
          </p>
        </div>
        <h2
          class="text-4xl lg:text-5xl font-semibold text-stone-800 font-serif italic leading-tight"
        >
          {{ pricingPlanInfo.title || "Eşya Taşıma" }}
          <span class="font-serif italic text-stone-600">Fiyatları</span>
        </h2>
        <p
          class="mt-6 max-w-2xl mx-auto text-stone-800 text-lg leading-relaxed contrast-more:text-stone-900 sm:text-base"
        >
          Ege Eşya Taşıma olarak, şeffaf ve güvenilir fiyatlandırma ile
          eşyalarınızı en uygun maliyetle taşıyoruz.
          <strong>Ekonomik, standart ve premium</strong> paketlerimizle,
          ihtiyaçlarınıza özel çözümler sunuyoruz. Tüm planlarımız
          <strong>sigorta, profesyonel paketleme ve güvenli taşıma</strong>
          içerir.
        </p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="(plan, index) in pricingPlans"
          :key="index"
          class="price-item group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-stone-100 sm:p-6"
        >
          <div
            class="absolute -top-4 right-4 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm shadow-md"
          >
            {{ index + 1 }}
          </div>

          <div class="border-b border-stone-200 pb-4 mb-6">
            <h3 class="text-2xl font-semibold text-stone-900">
              {{ plan.name || "Uygun Fiyatlar" }}
            </h3>
            <p class="text-3xl font-bold text-stone-800 mt-2">
              {{ plan.price || "Bize Yazın" }}
            </p>
          </div>

          <ul class="space-y-4">
            <li
              v-for="feature in plan.features"
              :key="feature"
              class="flex items-start text-stone-700 text-base sm:text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="text-stone-600 mr-3 mt-1 shrink-0 group-hover:scale-110 transition-transform"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span>{{ feature }}</span>
            </li>
          </ul>

          <div class="mt-8">
            <NuxtLink
              to="/iletisim"
              :aria-label="`${plan.name} planı için iletişim sayfasına git`"
              class="inline-flex w-full justify-center px-6 py-3 text-white bg-stone-800 rounded-lg font-medium hover:bg-stone-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2"
            >
              Bize Yazın
            </NuxtLink>
          </div>

          <p class="text-sm text-stone-500 mt-4 text-center italic">
            *Başlangıç fiyatlarıdır. Detaylı bilgi için iletişime geçin.*
          </p>
        </article>
      </div>

      <div class="mt-20 max-w-3xl mx-auto text-center">
        <blockquote
          class="relative bg-white p-8 rounded-2xl shadow-xl border-l-4 border-stone-300 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 sm:p-6"
        >
          <div
            class="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-stone-800 rounded-full flex items-center justify-center text-white"
          >
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.403c-2.469 1.228-4.996 4.046-4.996 8.206v7.391h-4.983zm-10.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.403c-2.469 1.228-4.996 4.046-4.996 8.206v7.391h-4.999z"
              />
            </svg>
          </div>
          <p class="text-stone-700 text-lg italic leading-relaxed sm:text-base">
            "Ege Eşya Taşıma ile taşınma sürecim inanılmaz kolay ve stressiz
            geçti.
            <strong>Şeffaf fiyatlandırma</strong> ve profesyonel hizmetleriyle
            bütçemi mükemmel şekilde planladım. Kesinlikle tavsiye ederim!"
          </p>
          <div class="mt-4 text-stone-600 font-medium">
            - Ayşe K., İzmir'den İstanbul'a Taşınan Müşterimiz
          </div>
        </blockquote>
      </div>
    </section>
  </section>
</template>

<style scoped>
h2 {
  font-family: "Merriweather", serif;
}

p,
li {
  font-family: "Inter", sans-serif;
}

@media (prefers-reduced-motion: reduce) {
  .price-item,
  blockquote {
    transition: none;
  }
}
</style>

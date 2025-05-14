<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqData = ref({
  title: "",
  subtitle: "",
});
const faqItems = ref([]);
const isLoading = ref(true);
const error = ref(null);

// Initialize faqItemRefs as an empty array
const faqItemRefs = ref([]);
const faqContainer = ref(null);

const {
  data,
  error: fetchError,
  pending,
} = await useAsyncData("faq", () => $fetch("/api/faq"));

if (fetchError.value) {
  error.value = fetchError.value;
  isLoading.value = false;
} else if (data.value) {
  faqData.value = {
    title: data.value.title || "Eşya Taşıma Hakkında Merak Edilenler",
    subtitle: data.value.subtitle || "Sıkça Sorulan Sorular",
  };
  faqItems.value = data.value.faqItems.map((item) => ({
    question: item.question,
    answer: item.answer,
    open: item.open || false,
    timeline: null,
  }));
  
  // Initialize faqItemRefs with null values
  faqItemRefs.value = Array(faqItems.value.length).fill(null);
}
isLoading.value = false;

onMounted(async () => {
  if (isLoading.value || error.value) return;
  
  // Wait for the next tick to ensure refs are populated
  await nextTick();
  
  // Filter out any null refs
  const validRefs = faqItemRefs.value.filter(ref => ref !== null);
  
  if (!validRefs.length) return;
  
  gsap.set(validRefs, {
    opacity: 0,
    y: 20,
    scale: 0.98,
    immediateRender: false,
  });

  gsap.to(validRefs, {
    opacity: 1,
    y: 0,
    scale: 1,
    stagger: 0.15,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: faqContainer.value,
      start: "top 95%",
      toggleActions: "play none none reverse",
    },
    onStart: () => {
      gsap.set(validRefs, { visibility: "visible" });
    },
  });
});

const toggle = async (index) => {
  const item = faqItems.value[index];
  item.open = !item.open;
  await nextTick();

  if (!faqItemRefs.value[index]) return;
  
  const answerEl = faqItemRefs.value[index].querySelector(
    '[id^="ycl-faq-answer-"]'
  );

  if (!answerEl) return;

  if (!item.timeline) {
    item.timeline = gsap
      .timeline({ paused: true })
      .fromTo(
        answerEl,
        { height: 0, opacity: 0, y: -10, scale: 0.9 },
        {
          height: "auto",
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        }
      )
      .reverse();
  }

  item.timeline.reversed(!item.open);
};
</script>

<template>
  <section id="ycl-faq" class="ycl-faq">
    <div class="max-w-5xl mx-auto px-4 sm:px-6" ref="faqContainer">
      <div v-if="isLoading" class="text-center text-stone-600">
        Yükleniyor...
      </div>
      <div v-else-if="error" class="text-center text-red-600">
        Veri yüklenirken bir hata oluştu: {{ error.message }}
      </div>
      <div v-else>
        <div class="text-center mb-16">
          <div
            class="inline-block bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-md border border-stone-200/50 mb-6"
          >
            <p
              class="text-xl uppercase tracking-wider text-stone-800 font-medium my-auto"
            >
              {{ faqData.subtitle }}
            </p>
          </div>

          <h2 class="text-4xl lg:text-5xl font-semibold text-stone-800 font-serif italic leading-tight">
            {{ faqData.title }}<br />
            <span class="font-serif italic text-stone-600"
              >Merak Edilenler</span
            >
          </h2>
        </div>

        <div class="space-y-6">
          <div
            v-for="(item, index) in faqItems"
            :key="index"
            :ref="(el) => (faqItemRefs[index] = el)"
            class="group p-6 bg-white rounded-xl border border-stone-200 transition-all duration-300 hover:border-stone-300 shadow-sm hover:shadow-md"
            style="visibility: hidden"
          >
            <button
              @click="toggle(index)"
              class="w-full text-left focus:outline-none"
              :aria-expanded="item.open"
              :aria-controls="'faq-answer-' + index"
            >
              <div class="flex justify-between items-center">
                <h3 class="text-lg md:text-xl font-medium text-stone-800 pr-4">
                  {{ item.question }}
                </h3>
                <svg
                  :class="{ 'transform rotate-180 text-stone-800': item.open }"
                  class="w-7 h-7 text-stone-600 transition-all duration-300 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  aria-label="ok simgesi"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </button>
            <div
              v-show="item.open"
              :id="'ycl-faq-answer-' + index"
              class="overflow-hidden"
            >
              <p class="mt-4 text-stone-800 leading-relaxed md:text-lg">
                {{ item.answer }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

.group {
  transform: translateZ(0);
  backface-visibility: hidden;
}

@media (max-width: 640px) {
  .ycl-faq {
    padding: 3rem 1rem;
  }
  h2 {
    font-size: 2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-in,
  .group {
    animation: none !important;
    transition: none !important;
  }

  [style*="visibility: hidden"] {
    visibility: visible !important;
    opacity: 1 !important;
  }
}
</style>

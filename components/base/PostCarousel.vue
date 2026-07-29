<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const { data: postData } = await useFetch("/api/posts?light=true");

const posts = computed(() =>
  postData.value && postData.value.success ? postData.value.data : []
);
const recentPosts = computed(() => [...posts.value].reverse().slice(0,6));

const carouselRef = ref(null);
const cards = ref([]);
let infiniteTween = null;
let scrollTriggerInstance = null;

onMounted(() => {
  cards.value = gsap.utils.toArray(".carousel-card");

  const totalWidth = cards.value.reduce(
    (acc, card) => acc + card.offsetWidth + 24,
    0
  );
  infiniteTween = gsap.to(carouselRef.value, {
    x: `-=${totalWidth}`,
    duration: 60,
    repeat: -1,
    ease: "none",
    modifiers: {
      x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
    },
  });

  scrollTriggerInstance = ScrollTrigger.create({
    trigger: ".carousel-section",
    start: "top center",
    onEnter: () => {
      gsap.from(cards.value, {
        duration: 1,
        opacity: 0,
        y: 50,
        stagger: 0.15,
        ease: "power2.out",
      });
    },
  });
});

// Sonsuz tekrarlı (repeat:-1) tween ve ScrollTrigger, bileşen unmount
// olduğunda (istemci-taraflı sayfa geçişlerinde) durdurulmazsa çalışmaya
// devam eder — artık var olmayan bir DOM elementine referans tutarak
// bellek sızıntısına ve gereksiz CPU kullanımına yol açar.
onUnmounted(() => {
  infiniteTween?.kill();
  scrollTriggerInstance?.kill();
});
</script>

<template>
  <section class="carousel-section container mx-auto px-4 py-20">
    <div class="text-center mb-16">
      <h3 class="text-4xl md:text-5xl font-light text-stone-800">
        <span class="font-serif italic text-stone-600">Öne Çıkan</span>
        Yazılarımız
      </h3>
      <p class="text-stone-600 mt-4 max-w-2xl mx-auto">
        Eşya taşıma sektörüyle ilgili en güncel blog yazılarımızı keşfedin.
        Taşınma sürecinde dikkat edilmesi gerekenler, şehir içi ve şehirler
        arası nakliyat ipuçları, evden eve taşıma rehberleri ve nakliyat
        çözümleri hakkında bilgilendirici içerikler burada!
      </p>
    </div>

    <base-empty-state
      v-if="!recentPosts.length"
      message="Henüz yayınlanmış bir blog yazısı bulunmuyor."
    />
    <div v-else class="carousel-wrapper relative overflow-hidden py-8">
      <div ref="carouselRef" class="carousel flex gap-6">
        <div
          v-for="post in recentPosts"
          :key="post.id"
          class="carousel-card relative flex-shrink-0 w-80"
        >
          <div
            class="card-inner bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <NuxtImg
              provider="imgix"
              format="webp"
              quality="70"
              loading="lazy"
              :src="post.image || '/img/default-blog.jpg'"
              class="carousel-img w-full h-48 object-cover rounded-t-xl"
              :alt="post.title"
            />
            <div class="p-6">
              <NuxtLink
                :to="`/${post.slug}`"
                class="text-xl font-medium text-stone-800 mb-2 hover:underline line-clamp-2"
                :aria-label="`${post.title} yazısı için detaylar`"
              >
                {{ post.shortTitle }}
              </NuxtLink>
            </div>
          </div>
        </div>
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
}
</style>

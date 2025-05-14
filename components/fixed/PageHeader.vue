<script setup>
import { gsap } from "gsap";

defineProps({
  title: { type: String, required: true },
  page: { type: String, required: true },
  imageUrl: { type: String, required: true },
  link: { type: String, required: true },
  linkName: { type: String, required: true },
});

const headerRef = ref(null);
const titleRef = ref(null);
const navRef = ref(null);

const animateHeader = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  tl.fromTo(
    headerRef.value,
    { opacity: 0 },
    { opacity: 1, duration: 0.8 }
  )
    .from(titleRef.value, { y: 20, opacity: 0, duration: 0.6 }, "-=0.6")
    .from(navRef.value, { opacity: 0, y: 10, duration: 0.5 }, "-=0.4");
};

onMounted(() => {
  requestAnimationFrame(animateHeader);
});
</script>

<template>
  <div
    ref="headerRef"
    class="relative py-16 md:py-24  flex items-center justify-center text-center text-white"
    :style="{
      backgroundImage: `url(${imageUrl}?auto=format,compress&w=1600&q=60)`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }"
    lang="tr"
  >
    <div class="absolute inset-0 bg-stone-950/60"></div>

    <div class="container mx-auto px-4 overflow-hidden">
      <h1
        ref="titleRef"
        class="text-3xl sm:text-6xl font-bold text-stone-100 mb-5"
      >
        {{ title }}
      </h1>
      <nav
        ref="navRef"
        class="mt-3 bg-transparent"
        aria-label="Breadcrumb"
      >
        <ol
          class="flex flex-wrap justify-center gap-2 text-base md:text-lg"
          itemscope
          itemtype="https://schema.org/BreadcrumbList"
        >
          <li
            itemprop="itemListElement"
            itemscope
            itemtype="https://schema.org/ListItem"
          >
            <nuxt-link
              to="/"
              class="btn-link"
              aria-label="Anasayfaya geri dön"
            >
              Anasayfa
            </nuxt-link>
            <meta
              itemprop="position"
              content="1"
            />
          </li>
          <span class="text-stone-300">/</span>
          <li
            itemprop="itemListElement"
            itemscope
            itemtype="https://schema.org/ListItem"
          >
            <nuxt-link
              :to="link"
              class="btn-link"
              :aria-label="`${linkName} sayfasına git`"
            >
              {{ linkName }}
            </nuxt-link>
            <meta
              itemprop="position"
              content="2"
            />
          </li>
        </ol>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.btn-link {
  color: white;
}

.btn-link:hover {
  text-decoration: underline;
}

h1 {
  font-family: "Georgia", serif;
}


@media (max-width: 768px) {
  .btn-link {
    font-size: 0.875rem;
    padding: 4px 8px;
  }

  h1 {
    font-size: 2rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .btn-link:hover {
    transform: none;
  }

  .btn-link {
    transition: none;
  }
}
</style>
<script setup>
const marquees = [
  {
    items: [
      { text: "Profesyonel Taşıma Hizmetleri", link: "#ycl-card" },
      { text: "Hızlı ve Güvenilir Teslimat", link: "#ycl-service" },
      { text: "Müşteri Memnuniyeti Odaklı", link: "#ycl-testimonial" },
      { text: "Uygun Fiyatlı Nakliyat", link: "#ycl-price" },
      { text: "Şehirler Arası Taşımacılık", link: "#ycl-hero" },
    ],
    reverse: false,
    contentClass: "content-primary",
    icon: "truck",
  },
  {
    items: [
      { text: "Şehir İçi Hızlı Nakliyat", link: "#ycl-fact" },
      { text: "Uzun Mesafe Güvenli Taşıma", link: "#ycl-feature" },
      { text: "Sigortalı Nakliye Güvencesi", link: "#ycl-card" },
      { text: "Özel Paketleme Çözümleri", link: "#ycl-service" },
      { text: "EveNakliyatEvden Garantisi", link: "#ycl-hero" },
    ],
    reverse: true,
    contentClass: "content-secondary",
    icon: "shield",
  },
];

const formatUrlHash = (text) => {
  const turkishToLatin = {
    ı: "i",
    ğ: "g",
    ü: "u",
    ş: "s",
    ö: "o",
    ç: "c",
    İ: "i",
    Ğ: "g",
    Ü: "u",
    Ş: "s",
    Ö: "o",
    Ç: "c",
  };

  return text
    .toLowerCase()
    .replace(/[ığüşöç]/g, (match) => turkishToLatin[match] || match)
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

const scrollToSection = (id, text) => {
  const cleanId = id.startsWith("#") ? id.slice(1) : id;
  const element = document.getElementById(cleanId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    window.location.hash = formatUrlHash(text);
  } else {
    console.warn(`Element with ID ${cleanId} not found.`);
  }
};

const getIconPath = (icon) => {
  const icons = {
    truck:
      "M9 17H7v-7h10v7h-2M9 5h6v2H9V5m11 9v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9v4h4v8Z",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z",
    box: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",
    clock:
      "M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm1-8.4V7h-2v5.6l3.2 1.9.8-1.3-2-1.2Z",
    check: "M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  };
  return icons[icon] || icons.truck;
};

// Marquee'ler ve giriş animasyonu artık tamamen CSS ile yürüyor:
//   • sonsuz kayma  → .marquee-inner / .is-reverse keyframe'leri
//   • giriş belirmesi → .enter-up (bölüm sayfa açılışında ekranda)
//   • tıklamada basma geri bildirimi → :active { scale }
// Böylece manuel listener kaydı, tween temizliği ve bellek sızıntısı riski
// tamamen ortadan kalkıyor; tıklama Vue'nun kendi @click'iyle yönetiliyor.
const onItemClick = (item) => scrollToSection(item.link, item.text);
</script>

<template>
  <section
    class="hero-section relative overflow-hidden mb-20 bg-stone-900 bg-[url('https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat bg-blend-overlay py-32 sm:py-24 isolate"
  >
    <div
      class="absolute inset-0 bg-gradient-to-b from-stone-900/80 to-stone-900/50"
    ></div>

    <div class="max-w-7xl mx-auto px-4 relative z-10">
      <div class="text-center mb-16 enter-up">
        <h1
          class="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
        >
          <span class="bg-clip-text text-transparent bg-stone-100"
            >Eşyanız Güvenli Ellerde</span
          >
        </h1>
        <p class="text-xl text-stone-200 max-w-3xl mx-auto">
          Profesyonel nakliye hizmetlerimizle eşyalarınız güvenle taşınır. 15
          yıllık deneyimimizle hizmetinizdeyiz.
        </p>
      </div>

      <div
        v-for="(marquee, index) in marquees"
        :key="index"
        :style="{ '--reveal-i': index + 1 }"
        :class="[
          'marquee-container overflow-hidden whitespace-nowrap py-6 bg-white/10 backdrop-blur-xl rounded-2xl my-6 border border-white/10 shadow-xl',
          { 'marquee-reverse border-t border-white/10': marquee.reverse },
          'enter-up',
        ]"
      >
        <div
          class="marquee-inner inline-flex w-[200%]"
          :class="{ 'is-reverse': marquee.reverse }"
        >
          <div
            :class="[
              'marquee-content flex flex-[0_0_50%] items-center gap-8 px-8',
              marquee.contentClass,
            ]"
            v-for="i in 2"
            :key="i"
            :aria-hidden="i === 2"
          >
            <div
              class="item flex items-center p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:shadow-lg hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
              v-for="(item, idx) in marquee.items"
              :key="idx"
            >
              <a
                :href="item.link"
                class="marquee-item-link flex items-center gap-6 text-white no-underline group"
                :tabindex="i === 2 ? -1 : undefined"
                @click.prevent="onItemClick(item)"
              >
                <span
                  class="icon-wrapper w-11 h-11 flex items-center justify-center bg-amber-400/10 rounded-full border border-amber-400/30"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fbbf24"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon w-6 h-6"
                  >
                    <path :d="getIconPath(marquee.icon)" />
                  </svg>
                </span>
                <span class="text text-xl font-medium text-shadow-sm">{{
                  item.text
                }}</span>
                <span
                  class="arrow w-6 h-6 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fbbf24"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col sm:flex-row justify-center gap-6 mt-16 enter-up"
        style="--reveal-i: 3"
      >
        <NuxtLink
          to="/blog"
          aria-label="Blog sayfasına yönlendirme linki"
          class="hero-btn primary inline-flex items-center px-8 py-4 rounded-full font-medium tracking-wide text-white bg-gradient-to-br from-red-600 to-stone-900 hover:from-red-500 hover:to-red-900 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
        >
          <span>Taşıma Rehberi ve İpuçları</span>
          <span class="btn-icon">
            <svg
              class="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </span>
        </NuxtLink>

        <NuxtLink
          to="/bolgelerimiz"
          aria-label="Bölgeler sayfasına yönlendirme linki"
          class="hero-btn secondary inline-flex items-center px-8 py-4 rounded-full font-medium tracking-wide text-white bg-white/10 border border-white/20 hover:bg-white/20 hover:shadow-2xl hover:border-white/30 hover:-translate-y-1 transition-all duration-300 group"
        >
          <span>Bölgelerimize Göz Atın</span>
          <span class="btn-icon">
            <svg
              class="w-5 h-5 ml-3 group-hover:rotate-90 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
          </span>
        </NuxtLink>
      </div>
    </div>

    <div
      class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-900 to-transparent z-10"
    ></div>
  </section>
</template>

<style scoped>
.marquee-container::after {
  content: "";
  @apply absolute inset-0 pointer-events-none bg-gradient-to-r from-stone-900/80 via-transparent to-stone-900/80;
}

/* Sonsuz kayan şerit — saf CSS.
   Şerit iki özdeş içerik kümesi barındırır (w-[200%] + flex-[0_0_50%]),
   bu yüzden -50% kaydığında ikinci küme birincinin yerine geçer ve döngü
   sıçramasız görünür. Ters yön aynı keyframe'in tersine oynatılmasıyla
   elde edilir — ikinci bir keyframe tanımına gerek yok. */
.marquee-inner {
  will-change: transform;
  animation: marquee-scroll 18s linear infinite;
}

.marquee-inner.is-reverse {
  animation-direction: reverse;
  animation-duration: 22s;
}

/* Kullanıcı bir başlığa tıklamak isterken hedefin kaçmaması için durdur. */
.marquee-container:hover .marquee-inner,
.marquee-container:focus-within .marquee-inner {
  animation-play-state: paused;
}

@keyframes marquee-scroll {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
}

/* Tıklama geri bildirimi — eski gsap.to(scale:0.95, yoyo) yerine. */
.marquee-item-link {
  transition: transform var(--dur-fast) var(--ease-out);
}

.marquee-item-link:active {
  transform: scale(0.95);
}

@media (prefers-reduced-motion: reduce) {
  .marquee-inner {
    animation: none !important;
  }
  .marquee-item-link {
    transition: none;
  }
}
</style>

<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navbar = ref(null);
const isMenuOpen = ref(false);
const isScrolled = ref(false);
const navbarData = ref({
  title: "EGE",
  subtitle: "EŞYA",
  phone: "0532 645 42 89",
});

const { data: navbarInfo, error } = await useFetch("/api/navbar", {
  transform: (res) => ({
    title: res?.title || "EGE",
    subtitle: res?.subtitle || "EŞYA",
    phone: res?.phone || "0532 645 42 89",
  }),
});
if (navbarInfo.value) {
  navbarData.value = navbarInfo.value;
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.classList.toggle("overflow-hidden", isMenuOpen.value);
  document.documentElement.style.scrollBehavior = "auto";

  if (isMenuOpen.value) {
    document.querySelector(".mobile-menu")?.focus();
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.classList.remove("overflow-hidden");
};

onMounted(() => {
  if (!process.client) return;

  gsap.config({ nullTargetWarn: false });

  const handleScroll = () => {
    isScrolled.value = window.scrollY > 100;
    if (window.innerWidth > 991) {
      gsap.to(navbar.value, {
        top: isScrolled.value ? "0" : "-100px",
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
        willChange: "transform",
      });
    }
  };

  const debounce = (func, wait = 100) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const handleResize = debounce(() => {
    if (window.innerWidth >= 1024) {
      closeMenu();
    }
  });

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleResize, { passive: true });

  const handleKeyDown = (e) => {
    if (e.key === "Escape" && isMenuOpen.value) {
      closeMenu();
    }
  };
  document.addEventListener("keydown", handleKeyDown);

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleResize);
    document.removeEventListener("keydown", handleKeyDown);
    gsap.killTweensOf(navbar.value);
  });
});
</script>

<template>
  <nav
    ref="navbar"
    class="backdrop-blur-sm shadow-lg border-t-4 border-stone-600 sticky top-0 z-50 transition-all duration-300"
    :class="{
      'bg-white/95': !isScrolled,
      'bg-white/50': isScrolled,
    }"
    :aria-label="
      navbarData?.title
        ? `${navbarData.title} ana navigasyon`
        : 'Ana navigasyon'
    "
    lang="tr"
    itemscope
    itemtype="https://schema.org/SiteNavigationElement"
  >
    <div class="container mx-auto px-4 sm:px-6">
      <div class="flex items-center h-20 justify-between">
        <nuxt-link
          to="/"
          class="nav-logo flex items-center space-x-3 group"
          aria-label="Ana Sayfa"
          itemprop="url"
        >
          <div
            class="w-10 h-10 bg-gradient-to-br from-primary to-stone-800 rounded-lg flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-300 ease-out"
            itemprop="logo"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span
            class="text-2xl font-bold text-stone-800 tracking-tighter"
            itemprop="name"
          >
            {{ navbarData.title }}
          </span>
        </nuxt-link>

        <div class="hidden xl:flex flex-1 justify-center mx-8">
          <ul class="flex items-center gap-x-6 flex-nowrap" role="navigation">
            <li
              v-for="(link, index) in [
                {
                  to: '/',
                  text: 'Anasayfa',
                  aria: 'Ana sayfaya git',
                  icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
                },
                {
                  to: '/hakkimizda',
                  text: 'Hakkımızda',
                  aria: 'Hakkımızda sayfası',
                  icon: 'M5.121 17.804A4 4 0 017 16h10a4 4 0 011.879.804M15 7a3 3 0 11-6 0 3 3 0 016 0zM19 13a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4a2 2 0 012-2h14z',
                },
                {
                  to: '/bolgelerimiz',
                  text: 'Bölgelerimiz',
                  aria: 'Hizmet bölgelerimiz',
                  icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m6-3l4.553 2.276A1 1 0 0121 7.618v10.764a1 1 0 01-1.447.894L15 17M9 7l6-3m0 13V4m0 10V4m-6 13l6-3',
                },
                {
                  to: '/blog',
                  text: 'Blog',
                  aria: 'Blog yazıları',
                  icon: 'M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z',
                },
                {
                  to: '/iletisim',
                  text: 'İletişim',
                  aria: 'İletişim bilgileri',
                  icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
                },
              ]"
              :key="index"
              itemprop="name"
            >
              <nuxt-link
                :to="link.to"
                class="relative flex items-center py-2 px-3 text-stone-800 hover:text-primary font-semibold transition-colors group text-base"
                active-class="text-primary"
                :aria-label="link.aria"
                :aria-current="$route.path === link.to ? 'page' : undefined"
                itemprop="url"
              >
                <svg
                  class="w-5 h-5 flex-shrink-0 mx-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path :d="link.icon" />
                </svg>
                <span class="font-medium">{{ link.text }}</span>
                <span
                  class="absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left transform transition-all duration-300 scale-x-0"
                  :class="{
                    'scale-x-100': $route.path === link.to,
                    'group-hover:scale-x-75': $route.path !== link.to,
                  }"
                />
              </nuxt-link>
            </li>
          </ul>
        </div>

        <div
          class="hidden xl:flex items-center space-x-3 border-l border-gray-200 pl-4"
        >
          <a
            :href="`tel:${navbarData.phone}`"
            class="nav-link flex items-center space-x-2 bg-stone-800 text-white px-6 py-2.5 rounded-full hover:bg-primary transition-all shadow-lg hover:shadow-xl"
            itemprop="telephone"
            :aria-label="`Bizi arayın: ${navbarData.phone}`"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span class="font-medium">{{ navbarData.phone }}</span>
          </a>
        </div>

        <button
          @click="toggleMenu"
          class="xl:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          :aria-label="isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'"
          :aria-expanded="isMenuOpen"
          tabindex="0"
        >
          <svg
            class="w-8 h-8 text-gray-900 transition-transform duration-300"
            :class="{ 'rotate-90': isMenuOpen }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            aria-label="Burger Menü Simgesi"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              :d="
                isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'
              "
            />
          </svg>
        </button>
      </div>

      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 max-h-0"
        enter-to-class="opacity-100 max-h-[100vh]"
        leave-from-class="opacity-100 max-h-[100vh]"
        leave-to-class="opacity-0 max-h-0"
      >
        <div
          v-show="isMenuOpen"
          class="xl:hidden bg-white overflow-hidden mobile-menu"
          role="navigation"
          aria-label="Mobil menü"
          tabindex="-1"
        >
          <ul class="py-4 space-y-2 border-t border-gray-200">
            <li
              v-for="(link, index) in [
                { to: '/', text: 'Anasayfa', aria: 'Ana sayfaya git' },
                {
                  to: '/hakkimizda',
                  text: 'Hakkımızda',
                  aria: 'Hakkımızda sayfası',
                },
                {
                  to: '/bolgelerimiz',
                  text: 'Bölgelerimiz',
                  aria: 'Hizmet bölgelerimiz',
                },
                { to: '/blog', text: 'Blog', aria: 'Blog yazıları' },
                {
                  to: '/iletisim',
                  text: 'İletişim',
                  aria: 'İletişim bilgileri',
                },
              ]"
              :key="index"
              itemprop="name"
            >
              <nuxt-link
                :to="link.to"
                class="block mx-4 px-4 py-3 text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors relative overflow-hidden"
                :class="{
                  'text-primary bg-primary/10': $route.path === link.to,
                }"
                :aria-label="link.aria"
                :aria-current="$route.path === link.to ? 'page' : undefined"
                @click="closeMenu"
                itemprop="url"
              >
                <span class="relative z-10">{{ link.text }}</span>
                <div
                  v-if="$route.path === link.to"
                  class="absolute inset-y-0 left-0 w-1 bg-primary animate-indicator"
                />
              </nuxt-link>
            </li>

            <li class="pt-4 mt-4 border-t border-gray-200 mx-4">
              <a
                :href="`tel:${navbarData.phone}`"
                class="flex items-center space-x-3 px-4 py-3 text-primary font-semibold hover:bg-gray-50 rounded-lg transition-colors"
                :aria-label="`Bizi arayın: ${navbarData.phone}`"
                itemprop="telephone"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                  focusable="false"
                  aria-label="Telefon Simgesi"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span itemprop="telephone">{{ navbarData.phone }}</span>
              </a>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<style>
.animate-indicator {
  animation: indicator 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  transform-origin: top;
}

@keyframes indicator {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}

@media (min-width: 768px) and (max-width: 1279px) {
  .container {
    padding: 0 clamp(1.5rem, 5vw, 2rem);
  }

  nav {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.98);
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-indicator,
  .transition-all {
    animation: none !important;
    transition: none !important;
  }
}

a,
button {
  -webkit-tap-highlight-color: transparent;
}

svg {
  pointer-events: none;
}
</style>

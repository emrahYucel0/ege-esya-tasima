<template>
  <!-- Üst Bilgi Çubuğu -->
  <div class="bg-[#3b5d50]/90 py-2 text-xs sm:text-sm">
    <div class="container mx-auto px-4">
      <div class="flex flex-col sm:flex-row justify-between items-center gap-2">
        <!-- İletişim Bilgileri -->
        <div
          class="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto"
        >
          <!-- Telefon -->
          <a
            v-if="navbarData?.contacts?.[0]?.phone"
            :href="`tel:${navbarData.contacts[0].phone}`"
            class="flex items-center text-white hover:text-[#f9bf29] transition-colors text-xs sm:text-sm"
          >
            <svg
              class="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-secondary flex-shrink-0"
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
            <span class="whitespace-nowrap">{{
              navbarData.contacts[0].phone
            }}</span>
          </a>

          <!-- E-mail -->
          <a
            v-if="navbarData?.contacts?.[0]?.mail"
            :href="`mailto:${navbarData.contacts[0].mail}`"
            class="flex items-center text-white hover:text-[#f9bf29] transition-colors text-xs sm:text-sm"
          >
            <svg
              class="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-secondary flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span class="whitespace-nowrap">{{
              navbarData.contacts[0].mail
            }}</span>
          </a>

          <!-- Adres -->
          <p
            v-if="navbarData?.contacts?.[0]?.address"
            class="flex items-center text-white hover:text-[#f9bf29] transition-colors text-xs sm:text-sm"
          >
            <svg
              class="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-secondary flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
              />
            </svg>
            <span class="whitespace-nowrap">{{
              navbarData.contacts[0].address
            }}</span>
          </p>
        </div>

        <!-- Sosyal Medya İkonları -->
        <div
          v-if="navbarData?.socialLinks?.length"
          class="flex items-center gap-3 sm:gap-4"
        >
          <a
            v-for="socialLink in navbarData.socialLinks"
            :key="socialLink.id"
            :href="socialLink.url || '#'"
            class="hover:text-[#f9bf29] text-white transition-colors"
            :aria-label="socialLink.name"
            target="_blank"
            rel="noopener noreferrer"
          >
            <component
              :is="getSocialIcon(socialLink.name)"
              class="w-4 h-4 sm:w-5 sm:h-5"
            />
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Ana Navbar -->
  <nav
    class="custom-navbar bg-[#3b5d50]/90 backdrop-blur-sm py-3 sticky top-0 z-50"
    aria-label="Navigation bar"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <NuxtLink
          to="/"
          class="navbar-brand text-xl sm:text-2xl font-bold text-white flex-shrink-0"
        >
          <span v-if="navbarData?.logo"
            >{{ navbarData.logo }}<span class="opacity-40">.</span></span
          >
          <span v-else>Logo<span class="opacity-40">.</span></span>
        </NuxtLink>

        <!-- Hamburger Menü Butonu -->
        <button
          class="navbar-toggler lg:hidden border-none focus:outline-none focus:ring-0 p-2"
          :class="{ 'is-active': isMenuOpen }"
          @click="toggleMenu"
          aria-label="Toggle navigation"
          :aria-expanded="isMenuOpen.toString()"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Desktop Menü -->
        <div class="hidden lg:flex lg:items-center lg:w-auto">
          <ul class="custom-navbar-nav flex items-center space-x-6">
            <li v-for="link in navLinks" :key="link.path">
              <NuxtLink
                :to="link.path"
                class="nav-link relative px-3 py-2 text-white hover:text-[#f9bf29] transition-colors duration-300 group"
                :class="{ 'text-[#f9bf29]': $route.path === link.path }"
              >
                {{ link.title }}
                <span
                  class="absolute bottom-0 left-3 right-3 h-0.5 bg-[#f9bf29] transition-all duration-300 origin-left"
                  :class="{
                    'scale-x-100': $route.path === link.path,
                    'scale-x-0 group-hover:scale-x-100':
                      $route.path !== link.path,
                  }"
                ></span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Mobil/Tablet Menü -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 transform -translate-y-2"
          enter-to-class="opacity-100 transform translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 transform translate-y-0"
          leave-to-class="opacity-0 transform -translate-y-2"
        >
          <div
            v-if="isMenuOpen"
            class="absolute top-full left-0 right-0 bg-[#3b5d50]/95 backdrop-blur-sm border-t border-[#f9bf29]/20 shadow-lg lg:hidden"
            id="navbarsFurni"
          >
            <ul class="custom-navbar-nav flex flex-col py-4">
              <li v-for="link in navLinks" :key="link.path" class="w-full">
                <NuxtLink
                  :to="link.path"
                  class="nav-link relative block px-6 py-3 text-white hover:text-[#f9bf29] hover:bg-white/5 transition-all duration-300 group"
                  :class="{
                    'text-[#f9bf29] bg-white/10': $route.path === link.path,
                    'border-l-4 border-[#f9bf29]': $route.path === link.path,
                  }"
                  @click="closeMenu"
                >
                  {{ link.title }}
                  <span
                    class="absolute top-1/2 right-6 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </NuxtLink>
              </li>
            </ul>

            <!-- Mobil Menüde İletişim Bilgileri -->
            <div
              v-if="navbarData?.contacts?.[0]"
              class="border-t border-white/10 px-6 py-4"
            >
              <div class="flex flex-col space-y-3 text-sm">
                <!-- Mobil Telefon -->
                <a
                  v-if="navbarData.contacts[0].phone"
                  :href="`tel:${navbarData.contacts[0].phone}`"
                  class="flex items-center text-white hover:text-[#f9bf29] transition-colors"
                >
                  <svg
                    class="w-4 h-4 mr-2 text-secondary flex-shrink-0"
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
                  {{ navbarData.contacts[0].phone }}
                </a>
                <!-- Mobil E-mail -->
                <a
                  v-if="navbarData.contacts[0].mail"
                  :href="`mailto:${navbarData.contacts[0].mail}`"
                  class="flex items-center text-white hover:text-[#f9bf29] transition-colors"
                >
                  <svg
                    class="w-4 h-4 mr-2 text-secondary flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {{ navbarData.contacts[0].mail }}
                </a>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </nav>

  <!-- Loading State -->
  <div v-if="pending" class="bg-[#3b5d50]/90 py-2 text-center">
    <div class="text-white text-sm">Yükleniyor...</div>
  </div>

  <!-- Error State -->
  <div v-if="error" class="bg-red-500/90 py-2 text-center">
    <div class="text-white text-sm">
      Veri yüklenirken hata oluştu: {{ error.message }}
    </div>
  </div>
</template>

<script setup>
// Reactive state
const isMenuOpen = ref(false);
const navbarData = ref(null);
const pending = ref(true);
const error = ref(null);

// Navigation links (static - you might want to make these dynamic too)
const navLinks = [
  { path: "/", title: "Anasayfa" },
  { path: "/hakkimizda", title: "Hakkımızda" },
  { path: "/bolgelerimiz", title: "Bölgelerimiz" },
  { path: "/blog", title: "Blog" },
  { path: "/iletisim", title: "İletişim" },
];

// Fetch navbar data
const fetchNavbarData = async () => {
  try {
    pending.value = true;
    error.value = null;

    // Replace '/api/navbar' with your actual API endpoint
    const response = await $fetch("/api/navbar", {
      method: "GET",
    });

    navbarData.value = response?.data ?? null;
  } catch (err) {
    error.value = err;
    console.error("Error fetching navbar data:", err);
  } finally {
    pending.value = false;
  }
};

// Social media icon components
const getSocialIcon = (name) => {
  const iconName = name?.toLowerCase();

  if (iconName?.includes("facebook")) {
    return h(
      "svg",
      {
        fill: "currentColor",
        viewBox: "0 0 24 24",
        class: "w-4 h-4 sm:w-5 sm:h-5",
      },
      [
        h("path", {
          d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
        }),
      ]
    );
  }

  if (iconName?.includes("instagram")) {
    return h(
      "svg",
      {
        fill: "currentColor",
        viewBox: "0 0 24 24",
        class: "w-4 h-4 sm:w-5 sm:h-5",
      },
      [
        h("path", {
          d: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z",
        }),
      ]
    );
  }

  if (iconName?.includes("twitter") || iconName?.includes("x")) {
    return h(
      "svg",
      {
        fill: "currentColor",
        viewBox: "0 0 24 24",
        class: "w-4 h-4 sm:w-5 sm:h-5",
      },
      [
        h("path", {
          d: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84",
        }),
      ]
    );
  }

  if (iconName?.includes("linkedin")) {
    return h(
      "svg",
      {
        fill: "currentColor",
        viewBox: "0 0 24 24",
        class: "w-4 h-4 sm:w-5 sm:h-5",
      },
      [
        h("path", {
          d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
        }),
      ]
    );
  }

  if (iconName?.includes("youtube")) {
    return h(
      "svg",
      {
        fill: "currentColor",
        viewBox: "0 0 24 24",
        class: "w-4 h-4 sm:w-5 sm:h-5",
      },
      [
        h("path", {
          d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
        }),
      ]
    );
  }

  // Default social icon
  return h(
    "svg",
    {
      fill: "currentColor",
      viewBox: "0 0 24 24",
      class: "w-4 h-4 sm:w-5 sm:h-5",
    },
    [
      h("path", {
        d: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z",
      }),
    ]
  );
};

// Menu functions
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

// Route watcher
const route = useRoute();
watch(
  () => route.path,
  () => {
    isMenuOpen.value = false;
  }
);

// Click outside handler
onMounted(() => {
  // Fetch data on component mount
  fetchNavbarData();

  const handleClickOutside = (event) => {
    const navbar = document.querySelector(".custom-navbar");
    if (navbar && !navbar.contains(event.target)) {
      isMenuOpen.value = false;
    }
  };

  document.addEventListener("click", handleClickOutside);

  onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
  });
});

// Expose refresh function for manual data refresh
const refreshNavbarData = () => {
  fetchNavbarData();
};

// Make refresh function available to parent components
defineExpose({
  refreshNavbarData,
});
</script>

<style scoped>
/* Navbar Toggler Icon */
.navbar-toggler-icon {
  display: block;
  width: 24px;
  height: 2px;
  background-color: white;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 2px;
}

.navbar-toggler-icon::before,
.navbar-toggler-icon::after {
  content: "";
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: white;
  left: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 2px;
}

.navbar-toggler-icon::before {
  top: -8px;
}

.navbar-toggler-icon::after {
  bottom: -8px;
}

.is-active .navbar-toggler-icon {
  background-color: transparent;
}

.is-active .navbar-toggler-icon::before {
  transform: rotate(45deg);
  top: 0;
}

.is-active .navbar-toggler-icon::after {
  transform: rotate(-45deg);
  bottom: 0;
}

/* Aktif Link Alt Çizgisi */
.nav-link span {
  transform-origin: left center;
}

/* Smooth Scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom Scrollbar for Mobile Menu */
.custom-navbar-nav {
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}

/* Webkit Scrollbar Styling */
.custom-navbar-nav::-webkit-scrollbar {
  width: 4px;
}

.custom-navbar-nav::-webkit-scrollbar-track {
  background: transparent;
}

.custom-navbar-nav::-webkit-scrollbar-thumb {
  background: rgba(249, 191, 41, 0.3);
  border-radius: 2px;
}

.custom-navbar-nav::-webkit-scrollbar-thumb:hover {
  background: rgba(249, 191, 41, 0.5);
}

/* Focus States for Accessibility */
.nav-link:focus,
.navbar-toggler:focus {
  outline: 2px solid #f9bf29;
  outline-offset: 2px;
}

/* Prevent horizontal scroll on mobile */
@media (max-width: 640px) {
  body {
    overflow-x: hidden;
  }
}

/* Tablet Optimizations */
@media (min-width: 640px) and (max-width: 1023px) {
  .container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

/* Animation improvements */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>

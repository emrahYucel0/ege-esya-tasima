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
          v-if="validSocialLinks.length"
          class="flex items-center gap-3 sm:gap-4"
        >
          <a
            v-for="socialLink in validSocialLinks"
            :key="socialLink.id"
            :href="socialLink.url"
            class="hover:text-[#f9bf29] text-white transition-colors"
            :aria-label="socialLink.name || 'Sosyal medya hesabımız'"
            target="_blank"
            rel="noopener noreferrer"
          >
            <base-social-icon
              :name="socialLink.name"
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
        <!-- `focus:outline-none focus:ring-0` KALDIRILDI: yerine hiçbir
             görünür odak göstergesi konmamıştı, dolayısıyla klavyeyle
             gezinen kullanıcı menü butonuna geldiğini anlayamıyordu
             (WCAG 2.4.7). Odak halkası artık global :focus-visible
             kuralından geliyor (bkz. assets/css/main.css). -->
        <button
          class="navbar-toggler lg:hidden border-none p-2"
          :class="{ 'is-active': isMenuOpen }"
          @click="toggleMenu"
          aria-label="Menüyü aç/kapat"
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

// Admin bir sosyal medya satırı ekleyip url'siz bırakabiliyor — url'siz kayıt
// gerçek bir bağlantı değil, tıklanamaz "#" href'i ve isimsiz erişilebilir ad
// (aria-label="") üretiyordu. Sadece gerçek url'si olan kayıtlar render edilir.
const validSocialLinks = computed(
  () => navbarData.value?.socialLinks?.filter((social) => social.url) || []
);

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

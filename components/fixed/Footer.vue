<script setup>
const { data, error } = await useFetch("/api/footer");

const footerData = ref(null);

if (data.value) {
  footerData.value = data.value;
}

if (error.value) {
  console.error("Footer verisi çekilirken hata oluştu:", error.value);
}
</script>

<template>
  <footer
  class="ycl-footer relative bg-gradient-to-br from-stone-800 via-stone-900 to-stone-800 text-stone-100 pt-16 overflow-hidden"  >
  

    <div class="container mx-auto px-4 py-8 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div
          class="group transform transition-all duration-300 hover:-translate-y-1"
        >
          <div
            class="bg-gray-800/30 p-6 rounded-2xl border border-gray-700/50 hover:border-primary/30 transition-colors"
          >
            <h4
              class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400 mb-4"
            >
              İletişim
            </h4>
            <div class="space-y-4">
              <div v-if="footerData" class="flex items-start">
                <div class="flex-shrink-0 mt-1.5">
                  <div
                    class="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      aria-label="Bölge ikonu"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  </div>
                </div>
                <p
                  class="ml-3 text-gray-300 hover:text-primary transition-colors"
                >
                  {{ footerData.address }}
                </p>
              </div>

              <div v-if="footerData" class="flex items-center">
                <div class="flex-shrink-0">
                  <div
                    class="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      aria-label="Telefon İkonu"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </div>
                </div>
                <a
                  :href="'tel:' + footerData.phone"
                  class="ml-3 text-gray-300 hover:text-primary transition-colors"
                  >{{ footerData.phone }}</a
                >
              </div>

              <div v-if="footerData" class="flex items-center">
                <div class="flex-shrink-0">
                  <div
                    class="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      aria-label="Mail İkonu"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </div>
                </div>
                <a
                  :href="'mailto:' + footerData.email"
                  class="ml-3 text-gray-300 hover:text-primary transition-colors"
                  >{{ footerData.email }}</a
                >
              </div>

              <div class="mt-6 flex space-x-3">
                <a
                  v-for="social in footerData?.socialLinks"
                  :key="social.id"
                  :href="social.url"
                  class="social-icon group relative p-2 rounded-full bg-gray-700/30 hover:bg-gradient-to-br from-primary to-cyan-500 transition-all duration-300"
                  :aria-label="`Bizi ${social.name} üzerinden takip edin`"
                >
                  <div
                    class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 animate-ping bg-primary/30"
                  ></div>
                  <svg
                    class="w-5 h-5 text-gray-300 group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <template v-if="social.name.toLowerCase() === 'twitter'">
                      <path
                        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                      />
                    </template>
                    <template
                      v-else-if="social.name.toLowerCase() === 'facebook'"
                    >
                      <path
                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                      />
                    </template>
                    <template
                      v-else-if="social.name.toLowerCase() === 'youtube'"
                    >
                      <path
                        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                      />
                    </template>
                    <template
                      v-else-if="social.name.toLowerCase() === 'instagram'"
                    >
                      <path
                        d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"
                      />
                    </template>
                    <template
                      v-else-if="social.name.toLowerCase() === 'linkedin'"
                    >
                      <path
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                      />
                    </template>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          class="group transform transition-all duration-300 hover:-translate-y-1"
        >
          <div class="p-6 ">
            <h4
              class="text-2xl font-bold  text-stone-100 mb-4"
            >
              Menü
            </h4>
            <nav class="space-y-3 bg-transparent">
              <NuxtLink
                v-for="link in footerData?.quickLinks"
                :key="link.id"
                :to="link.url"
                class="flex items-center group/link text-gray-300 hover:text-white transition-colors"
              >
                <span
                  class="h-px w-4 bg-gray-500 mr-2 transition-all group-hover/link:w-6 group-hover/link:bg-red-600"
                ></span>
                {{ link.name }}
              </NuxtLink>
            </nav>
          </div>
        </div>

        <div
          class="group transform transition-all duration-300 hover:-translate-y-1"
        >
          <div class="p-6">
            <h4
            class="text-2xl font-bold  text-stone-100 mb-4"
            >
              Bölgelerimiz
            </h4>
            <nav class="space-y-3 bg-transparent">
              <NuxtLink
                v-for="link in footerData?.regionLinks"
                :key="link.id"
                :to="link.url"
                class="flex items-center group/link text-gray-300 hover:text-white transition-colors"
              >
                <span
                  class="h-px w-4 bg-gray-500 mr-2 transition-all group-hover/link:w-6 group-hover/link:bg-red-600"
                ></span>
                {{ link.name }}
              </NuxtLink>
            </nav>
          </div>
        </div>

        <div
          class="group transform transition-all duration-300 hover:-translate-y-1"
        >
          <div class="p-6">
            <h4
            class="text-2xl font-bold  text-stone-100 mb-4"
            >
              Diğer Hizmetler
            </h4>
            <nav class="space-y-3 bg-transparent">
              <NuxtLink
                v-for="link in footerData?.blogLinks"
                :key="link.id"
                :to="link.url"
                class="flex items-center group/link text-gray-300 hover:text-white transition-colors"
              >
                <span
                  class="h-px w-4 bg-gray-500 mr-2 transition-all group-hover/link:w-6 group-hover/link:bg-red-600"
                ></span>
                {{ link.name }}
              </NuxtLink>
            </nav>
          </div>
        </div>
      </div>

      <div class="border-t border-gray-700/50 py-6">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4 text-center"
        >
          <p class="text-sm text-gray-400">
            © {{ new Date().getFullYear() }}
            <span
              class="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-cyan-400 hover:opacity-80 transition-opacity"
            >
              Ege Eşya
            </span>
            , Tüm Hakları Saklıdır
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <NuxtLink
              to="/gizlilik-politikasi"
              class="text-gray-400 hover:text-primary transition-colors text-sm hover:underline"
            >
              Gizlilik Politikası
            </NuxtLink>
            <NuxtLink
              to="/kullanim-sartlari"
              class="text-gray-400 hover:text-primary transition-colors text-sm hover:underline"
            >
              Kullanım Şartları
            </NuxtLink>
            <NuxtLink
              to="/cerez-politikasi"
              class="text-gray-400 hover:text-primary transition-colors text-sm hover:underline"
            >
              Çerez Politikası
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div
      class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-cyan-400 to-emerald-400 opacity-20"
    ></div>
  </footer>
</template>

<style scoped>
.social-icon {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.social-icon:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3),
    0 4px 6px -2px rgba(59, 130, 246, 0.15);
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.group:hover .float-animation {
  animation: float 1.5s ease-in-out infinite;
}

@media (max-width: 768px) {
  .grid {
    gap: 2rem;
  }

  .social-icons {
    @apply flex overflow-x-auto pb-2;
    -webkit-overflow-scrolling: touch;
  }

  .social-icon {
    @apply flex-shrink-0;
  }

  nav a {
    @apply text-base;
  }
}

@media (prefers-reduced-motion: reduce) {
  .social-icon,
  .group {
    transition: none;
    animation: none;
  }
}

.border-gradient {
  border-image: linear-gradient(to right, #3b82f6, #60a5fa) 1;
}

</style>

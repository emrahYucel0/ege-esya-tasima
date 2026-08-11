<script setup>
// Nuxt'un standart hata sayfası. pages/[...slug].vue artık eşleşmeyen
// slug'larda gerçek bir HTTP hata kodu (404) fırlattığı için ("soft 404"
// yerine), bu sayfa o hatanın görsel karşılığı — önceden [...slug].vue
// içinde v-if ile gösterilen 404 tasarımıyla aynı.
const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
});

const is404 = computed(() => props.error?.statusCode === 404);

// Hata sayfasının BAŞLIĞI YOKTU: tarayıcı sekmesinde ve yer imlerinde boş
// görünüyordu. `noindex` de ekleniyor — 404 durum kodu zaten dizine
// eklenmesini engelliyor ama 500 gibi diğer hatalarda bu güvence kalmıyor.
useHead({
  title: computed(() => (is404.value ? "Sayfa Bulunamadı" : "Bir Hata Oluştu")),
  meta: [{ name: "robots", content: "noindex, nofollow" }],
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background">
    <div class="max-w-lg mx-auto text-center px-4 sm:px-6 lg:px-8">
      <div class="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-primary shadow-2xl mb-8 transform hover:scale-110 transition-transform duration-300">
        <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 class="text-7xl font-extrabold text-primary mb-4">{{ error?.statusCode || 500 }}</h1>
      <h2 class="text-3xl font-bold text-dark mb-6">
        {{ is404 ? "Sayfa Bulunamadı" : "Bir Şeyler Ters Gitti" }}
      </h2>
      <p class="text-lg text-dark-light mb-10 leading-relaxed">
        {{
          is404
            ? "Aradığınız içerik kaldırılmış veya taşınmış olabilir. Ana sayfaya dönerek aradığınız bilgiye ulaşabilirsiniz."
            : "Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin."
        }}
      </p>
      <button
        type="button"
        @click="handleError"
        class="inline-flex items-center gap-3 px-8 py-4 bg-primary text-base font-semibold rounded-xl text-white shadow-xl hover:shadow-2xl hover:bg-primary-dark transform hover:-translate-y-1 transition-all duration-300"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        Ana Sayfaya Dön
      </button>
    </div>
  </div>
</template>

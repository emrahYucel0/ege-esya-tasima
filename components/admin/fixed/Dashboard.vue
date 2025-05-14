<template>
    <div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div class="max-w-4xl px-12 py-16 rounded-2xl bg-white shadow-xl dark:bg-gray-900 dark:text-white animate-fade-in">
        <!-- Animasyonlu Başlık -->
        <h1 ref="title" class="text-5xl font-extrabold text-gray-800 dark:text-white leading-tight">
          <span class="text-blue-600 dark:text-blue-400">Hoş Geldiniz</span>, Admin!
        </h1>
  
        <!-- Açıklayıcı Metin -->
        <p class="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Yönetim paneline hoş geldiniz! Bu panel ile içeriğinizi kolayca düzenleyebilir, kullanıcıları yönetebilir ve sistem ayarlarınızı optimize edebilirsiniz.  
          <span class="font-semibold text-gray-900 dark:text-gray-200">Sol taraftaki menü</span> aracılığıyla içerik yönetimine başlayabilirsiniz.
        </p>
  
        <!-- Ekstra Bilgilendirme Alanı -->
        <div class="mt-8 space-y-4">
          <p ref="desc1" class="text-lg text-gray-700 dark:text-gray-300">
            📌 **Hızlı Erişim:** Kategorileri ve sayfaları hızla düzenleyin.
          </p>
          <p ref="desc2" class="text-lg text-gray-700 dark:text-gray-300">
            🚀 **Kolay Yönetim:** Kullanıcıları, izinleri ve verileri yönetin.
          </p>
          <p ref="desc3" class="text-lg text-gray-700 dark:text-gray-300">
            🔍 **İçgörüler:** Verilerinizi analiz ederek daha iyi kararlar alın.
          </p>
        </div>
  
        <!-- Alıntı -->
        <div class="mt-10 border-l-4 border-blue-500 pl-4 text-gray-700 dark:text-gray-300 italic opacity-0" ref="quote">
          <p class="text-lg">
            “Verimli bir yönetim, güçlü bir sistemin temelidir.”
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>

  import { ref, onMounted } from "vue";
  import gsap from "gsap";
  
  const title = ref(null);
  const desc1 = ref(null);
  const desc2 = ref(null);
  const desc3 = ref(null);
  const quote = ref(null);
  
  onMounted(() => {
    gsap.fromTo(title.value, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 });
  
    gsap.fromTo(desc1.value, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.5 });
    gsap.fromTo(desc2.value, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.7 });
    gsap.fromTo(desc3.value, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.9 });
  
    gsap.to(quote.value, { opacity: 1, duration: 1.2, delay: 1.2 });
  });
  </script>
  
  <style>
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fade-in 0.8s ease-out;
  }
  </style>
  
<template>
    <div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div class="max-w-4xl px-12 py-16 rounded-2xl bg-white shadow-xl dark:bg-gray-900 dark:text-white animate-fade-in">
        <!-- Animasyonlu Başlık -->
        <h1 class="enter-up text-5xl font-extrabold text-gray-800 dark:text-white leading-tight">
          <span class="text-blue-600 dark:text-blue-400">Hoş Geldiniz</span>, Admin!
        </h1>
  
        <!-- Açıklayıcı Metin -->
        <p class="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Yönetim paneline hoş geldiniz! Bu panel ile içeriğinizi kolayca düzenleyebilir, kullanıcıları yönetebilir ve sistem ayarlarınızı optimize edebilirsiniz.  
          <span class="font-semibold text-gray-900 dark:text-gray-200">Sol taraftaki menü</span> aracılığıyla içerik yönetimine başlayabilirsiniz.
        </p>
  
        <!-- Ekstra Bilgilendirme Alanı -->
        <div class="mt-8 space-y-4">
          <p class="enter-up text-lg text-gray-700 dark:text-gray-300" style="--reveal-i: 2">
            📌 **Hızlı Erişim:** Kategorileri ve sayfaları hızla düzenleyin.
          </p>
          <p class="enter-up text-lg text-gray-700 dark:text-gray-300" style="--reveal-i: 3">
            🚀 **Kolay Yönetim:** Kullanıcıları, izinleri ve verileri yönetin.
          </p>
          <p class="enter-up text-lg text-gray-700 dark:text-gray-300" style="--reveal-i: 4">
            🔍 **İçgörüler:** Verilerinizi analiz ederek daha iyi kararlar alın.
          </p>
        </div>

        <!-- Alıntı -->
        <div
          class="enter-fade mt-10 border-l-4 border-blue-500 pl-4 text-gray-700 dark:text-gray-300 italic"
          style="--reveal-i: 6"
        >
          <p class="text-lg">
            “Verimli bir yönetim, güçlü bir sistemin temelidir.”
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Giriş animasyonu artık saf CSS (.enter-down / .enter-left / .enter-fade,
  // gecikme sırası --reveal-i ile). Panel açılışında zaten ekranda olduğu
  // için gözlemciye gerek yok ve JS beklenmediğinden içerik hiçbir koşulda
  // görünmez kalmaz.
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
  
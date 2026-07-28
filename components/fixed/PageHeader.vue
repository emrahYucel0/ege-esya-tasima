<template>
  <div class="page-header relative overflow-hidden flex items-center justify-center text-center text-white min-h-[200px] md:min-h-[250px] lg:min-h-[280px]">
    <!-- Dekoratif arka plan katmanları -->
    <div class="absolute inset-0 z-0 bg-gradient-to-br from-primary via-primary-dark to-secondary"></div>
    
    <!-- Soyut geometrik şekiller -->
    <div class="absolute inset-0 z-0 opacity-20">
      <div class="absolute top-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute bottom-0 right-0 w-64 h-64 bg-secondary/30 rounded-full blur-2xl translate-x-1/3 translate-y-1/3"></div>
      <div class="absolute top-1/2 left-1/2 w-40 h-40 bg-accent/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
    </div>
    
    <!-- İnce doku deseni -->
    <div 
      class="absolute inset-0 z-0 opacity-10"
      style="background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 1px); background-size: 24px 24px;"
    ></div>
    
    <!-- Hafif gölge gradient overlay -->
    <div class="absolute inset-0 z-0 bg-gradient-to-t from-black/20 to-transparent"></div>

    <!-- İçerik -->
    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-3xl mx-auto">
        <!-- Ana başlık -->
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-3 leading-tight tracking-tight animate-title">
          {{ title }}
        </h1>
        
        <!-- Dekoratif çizgi -->
        <div class="w-12 h-0.5 bg-secondary mx-auto mb-3 md:mb-4 rounded-full animate-line"></div>
        
        <!-- Breadcrumb -->
        <nav class="mt-1 animate-breadcrumb" aria-label="Breadcrumb">
          <ol
            class="flex flex-wrap justify-center gap-1.5 text-xs md:text-sm lg:text-base text-white/80"
            itemscope
            itemtype="https://schema.org/BreadcrumbList"
          >
            <li
              itemprop="itemListElement"
              itemscope
              itemtype="https://schema.org/ListItem"
            >
              <NuxtLink
                to="/"
                class="inline-flex items-center gap-1 hover:text-white transition-colors duration-200"
                aria-label="Anasayfaya geri dön"
              >
                <span>Anasayfa</span>
              </NuxtLink>
              <meta itemprop="position" content="1" />
            </li>
            <span class="text-white/50 select-none">/</span>
            <li
              itemprop="itemListElement"
              itemscope
              itemtype="https://schema.org/ListItem"
            >
              <NuxtLink
                :to="link"
                class="hover:text-white transition-colors duration-200 border-b border-transparent hover:border-white/30"
                :aria-label="`${linkName} sayfasına git`"
              >
                {{ linkName }}
              </NuxtLink>
              <meta itemprop="position" content="2" />
            </li>
          </ol>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  link: { type: String, required: true },
  linkName: { type: String, required: true },
});
</script>

<style scoped>
/* Gradient arka plan animasyonu */
.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}

/* Başlık animasyonu */
.animate-title {
  animation: fadeInUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Dekoratif çizgi animasyonu */
.animate-line {
  animation: expandWidth 0.5s ease-out 0.15s both;
}

@keyframes expandWidth {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 3rem;
    opacity: 1;
  }
}

/* Breadcrumb animasyonu */
.animate-breadcrumb {
  animation: fadeInUp 0.4s ease-out 0.25s both;
}

/* Başlık gölgesi */
h1 {
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}

/* Hover efekti */
nav a {
  transition: all 0.2s ease;
}

/* Mobilde sadece süreleri kısalt, animasyonu kapatma! */
@media (max-width: 640px) {
  .page-header {
    min-height: 180px;
  }
  
  /* Gradient animasyonu mobilde de çalışsın ama daha yumuşak olsun */
  .bg-gradient-to-br {
    animation: gradientShift 20s ease infinite;
  }
  
  /* Animasyon sürelerini kısalt daha hızlı görünsün */
  .animate-title {
    animation-duration: 0.45s;
  }
  
  .animate-line {
    animation-duration: 0.4s;
    animation-delay: 0.1s;
  }
  
  .animate-breadcrumb {
    animation-duration: 0.35s;
    animation-delay: 0.2s;
  }
}

/* Az hareket tercihi için animasyonları durdur */
@media (prefers-reduced-motion: reduce) {
  .bg-gradient-to-br,
  .animate-title,
  .animate-line,
  .animate-breadcrumb {
    animation: none;
  }
  
  .animate-line {
    width: 3rem;
    opacity: 1;
  }
}
</style>
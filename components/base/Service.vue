<script setup>

const services = ref([])
const serviceData = ref(null)
const isLoading = ref(true)

const { data, error } = await useFetch('/api/service', {
})

if (!error.value && data.value) {
  serviceData.value = data.value
  const transformedServices = data.value.features.map(card => ({
    title: card.cardTitle,
    description: card.cardDescription,
    features: card.content.split('|||').filter(item => item.trim() !== '')
  }))
  services.value = transformedServices
} else {
  console.log('Hata:', error.value)
}
isLoading.value = false
</script>

<template>
  <section id="ycl-service" class="ycl-service">
    <div class="container mx-auto px-4 lg:px-0 overflow-hidden">
      <header class="text-center mb-12">
        <div class="inline-block bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-md border border-stone-200/50 mb-5">
          <p class="text-xl uppercase tracking-wider text-stone-800 font-medium my-auto">
            {{ serviceData?.subtitle || 'Premium Taşımacılık Çözümleri' }}
          </p>
        </div>
        <h2 class="text-4xl lg:text-5xl font-semibold text-stone-800 font-serif italic leading-tight">
          {{ serviceData?.title || 'Ege Eşya Taşıma ile Güvenilir Hizmetler' }}
        </h2>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" v-if="!isLoading && services.length > 0">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="group relative h-[400px] bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
          <div class="absolute inset-0 flex flex-col justify-center items-center p-8 transition-all duration-500 group-hover:opacity-0">
            <h3 class="text-2xl font-medium text-stone-800 mb-4">{{ service.title }}</h3>
            <div class="w-16 h-1 bg-red-600 mb-6"></div>
            <p class="text-stone-800 text-center leading-normal">{{ service.description }}</p>
          </div>
          <div class="absolute inset-0 bg-stone-800 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div class="h-full flex flex-col justify-center">
              <h3 class="text-xl font-medium text-white mb-6">{{ service.title }}</h3>
              <ul class="space-y-3">
                <li v-for="(feature, i) in service.features" :key="i" class="flex items-center text-stone-100">
                  <svg class="w-5 h-5 text-stone-400 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {{ feature }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="!isLoading && services.length === 0" class="text-center">
        Veri yüklenemedi, lütfen tekrar deneyin.
      </div>
      <div v-else class="text-center">Yükleniyor...</div>

      <div class="text-center mt-16 space-y-8">
        <blockquote
          class="relative max-w-2xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md border-l-4 border-stone-400/50"
        >
          <p class="text-stone-800 leading-relaxed italic">
            {{ serviceData?.blockquote || '"Ege Eşya Taşıma ile profesyonel nakliye hizmetlerinin farkını yaşamaya hazır mısınız? Bize ulaşarak size özel çözümlerimizden faydalanın ve <strong>eşya taşıma</strong> sürecinizi stressiz bir deneyime dönüştürün."' }}
          </p>
          <div
            class="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-stone-800 rounded-full flex items-center justify-center text-white text-sm font-medium"
          >
            <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" aria-label="tırnak işareti ikonu">
              <path
                d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.403c-2.469 1.228-4.996 4.046-4.996 8.206v7.391h-4.983zm-10.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.403c-2.469 1.228-4.996 4.046-4.996 8.206v7.391h-4.999z"
              />
            </svg>
          </div>
        </blockquote>
      </div>    
    </div>
  </section>
</template>
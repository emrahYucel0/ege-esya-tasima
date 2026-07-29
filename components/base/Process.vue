<script setup>
import { computed } from 'vue'

// `await useFetch` doğrudan burada, setup'ın en üst seviyesinde çağrılıyor
// (bkz. components/base/Choose.vue'daki aynı düzeltmenin gerekçesi — tanımla
// ve await etmeden çağır deseni Vue hydration mismatch'ine yol açıyordu).
const { data: processResponse, error: fetchError } = await useFetch('/api/process')
const processData = computed(() => processResponse.value?.data ?? null)
const steps = computed(() => processData.value?.steps || [])
</script>

<template>
  <section class="process-section py-16 md:py-20 lg:py-28 bg-stone-50">
    <div class="container mx-auto px-4">
      <div v-if="fetchError" class="text-center text-xl text-red-500 py-10">
        <p>Bölüm verileri yüklenirken bir sorun oluştu.</p>
      </div>

      <div v-else-if="processData">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {{ processData.mainTitle }}
          </h2>
          <p v-if="processData.description" class="text-gray-600 text-lg leading-relaxed">
            {{ processData.description }}
          </p>
        </div>

        <base-empty-state v-if="!steps.length" message="Henüz bir süreç adımı eklenmemiş." />
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div
            v-for="(step, index) in steps"
            :key="step.id || index"
            class="process-step relative text-center px-2"
          >
            <div
              class="step-number mx-auto mb-5 w-14 h-14 rounded-full bg-[#3b5d50] text-white flex items-center justify-center text-xl font-bold shadow-lg"
              aria-hidden="true"
            >
              {{ index + 1 }}
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ step.title }}</h3>
            <p class="text-gray-600 leading-relaxed">{{ step.description }}</p>
          </div>
        </div>
      </div>

      <div v-else class="text-center text-xl text-yellow-600 py-10">
        <p>Bölüm verisi bulunamadı. Lütfen yönetim panelinden (Admin) bu bölüm için bir kayıt oluşturun.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (min-width: 1024px) {
  .process-step:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 28px;
    left: calc(50% + 40px);
    width: calc(100% - 80px);
    height: 2px;
    background: repeating-linear-gradient(to right, #d6d3d1 0, #d6d3d1 6px, transparent 6px, transparent 12px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .process-step {
    transition: none !important;
  }
}
</style>

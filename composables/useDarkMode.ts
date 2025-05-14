// composables/useDarkMode.ts
import { ref, onMounted } from 'vue';
import { useState } from '#app'; // Nuxt'un useState'i

export const useDarkMode = () => {
  // useState ile dark mode durumunu tanımla
  const isDark = useState<boolean>('darkMode', () => false);

  // Dark mode toggle fonksiyonu
  const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    // Tarayıcıda çalıştığından emin ol
    if (process.client) {
      if (isDark.value) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  // İlk yüklemede sistem tercihini kontrol et
  onMounted(() => {
    if (process.client && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDark.value = true;
      document.documentElement.classList.add('dark');
    }
  });

  return { isDark, toggleDarkMode };
};  
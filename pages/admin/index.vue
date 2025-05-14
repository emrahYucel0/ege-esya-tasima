S
<script setup>
const email = ref("");
const password = ref("");
const error = ref(null);
const isLoading = ref(false);
const showPassword = ref(false);

const handleLogin = async () => {
  isLoading.value = true;
  error.value = null;

  const loginAttempt = {
    email: email.value,
    password: password.value,
    timestamp: new Date().toISOString(),
    ip: "127.0.0.1",
  };

  try {
    await $fetch("/api/honeypot-login", {
      method: "POST",
      body: loginAttempt,
    });

    error.value = "E-posta veya şifre yanlış.";
  } catch (err) {
    error.value = "Bir hata oluştu, lütfen tekrar deneyin.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div
    class="relative min-h-screen bg-gradient-to-tr from-gray-900 via-indigo-950 to-black overflow-hidden"
  >
    <div class="absolute inset-0 pointer-events-none">
      <div
        class="absolute w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl top-[-200px] left-[-200px] transform rotate-45"
      ></div>
      <div
        class="absolute w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-3xl bottom-[-300px] right-[-300px]"
      ></div>
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0,rgba(0,0,0,0.8)_100%)]"
      ></div>
    </div>

    <div
      class="relative z-10 flex items-center justify-center min-h-screen px-4"
    >
      <div
        class="w-full max-w-lg bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_15px_60px_rgba(0,0,0,0.5)] border border-gray-200/30 p-10"
      >
        <div class="flex justify-center mb-8">
          <div class="relative">
            <svg
              class="w-16 h-16 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 2c-2.76 0-5 2.24-5 5v1h10v-1c0-2.76-2.24-5-5-5z"
              />
            </svg>
            <span
              class="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-ping"
            ></span>
          </div>
        </div>
        <h2 class="text-4xl font-bold text-center text-gray-900 tracking-tight">
          Admin Girişi
        </h2>
        <p class="text-center text-gray-500 mt-2 text-sm font-medium">
          Admin paneline hoş geldiniz
        </p>

        <form @submit.prevent="handleLogin" class="mt-10 space-y-6">
          <div class="relative group">
            <label
              for="email"
              class="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-hover:text-indigo-600"
              >E-posta</label
            >
            <div class="relative">
              <input
                id="email"
                v-model="email"
                type="email"
                class="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                placeholder="E-postanızı girin"
                required
              />
              <span
                class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <svg
                  class="w-5 h-5"
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
              </span>
            </div>
          </div>
          <div class="relative group">
            <label
              for="password"
              class="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-hover:text-indigo-600"
              >Şifre</label
            >
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full p-4 pl-12 pr-12 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-gray-400"
                placeholder="Şifrenizi girin"
                required
              />
              <span
                class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 11c0-1.1-.9-2-2-2s-2 .9-2 2 2 4 2 4m4-4c0-1.1-.9-2-2-2s-2 .9-2 2m-4 6h8m-8-2h8m-8-2h8m-8-2h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                  />
                </svg>
              </span>
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 focus:outline-none transition-colors"
              >
                <svg
                  v-if="showPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.62 0c-1.32 2.75-4.13 4.5-7.62 4.5s-6.3-1.75-7.62-4.5C7.7 9.25 10.51 7.5 14 7.5s6.3 1.75 7.62 4.5zM4 4l16 16"
                  />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.62 0c-1.32 2.75-4.13 4.5-7.62 4.5s-6.3-1.75-7.62-4.5C7.7 9.25 10.51 7.5 14 7.5s6.3 1.75 7.62 4.5z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full p-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold text-lg tracking-wide hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <span v-if="isLoading" class="flex items-center">
              <svg
                class="w-5 h-5 animate-spin mr-2"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Yükleniyor...
            </span>
            <span v-else>Giriş Yap</span>
          </button>
          <transition name="fade">
            <p
              v-if="error"
              class="text-center text-red-500 text-sm font-medium mt-4"
            >
              {{ error }}
            </p>
          </transition>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

input:focus + span svg {
  @apply text-indigo-500;
}
</style>

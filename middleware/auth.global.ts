// middleware/auth.global.ts
import { defineNuxtRouteMiddleware, navigateTo, useRequestFetch } from 'nuxt/app';

export default defineNuxtRouteMiddleware(async (to) => {
  // /evdeneveyonetim (login sayfası) hariç tüm /evdeneveyonetim/* yollarını koru
  if (!to.path.startsWith('/evdeneveyonetim') || to.path === '/evdeneveyonetim') {
    return;
  }

  // useRequestFetch: SSR sırasında gelen isteğin cookie'lerini /api/session'a taşır.
  // Düz $fetch bunu yapmaz, imzalı cookie olsa bile session'ı görünmez sayar.
  const requestFetch = useRequestFetch();
  const { authenticated } = await requestFetch('/api/session');

  if (!authenticated) {
    return navigateTo('/evdeneveyonetim');
  }
});

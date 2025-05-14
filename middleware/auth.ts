// middleware/auth.ts
import { defineNuxtRouteMiddleware, navigateTo, useCookie } from 'nuxt/app';

export default defineNuxtRouteMiddleware((to) => {
  const authCookie = useCookie('auth');
  const user = authCookie.value ? JSON.parse(authCookie.value) : null;

  // /admin hariç tüm /admin/* yollarını koru
  if (to.path.startsWith('/admin') && to.path !== '/admin') {
    if (!user || user.role !== 'admin') {
      return navigateTo('/admin');
    }
  }
});
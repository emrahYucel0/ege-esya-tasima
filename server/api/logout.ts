// server/api/logout.ts
export default defineEventHandler((event) => {
  deleteCookie(event, 'auth', { path: '/' })
  return { success: true }
})

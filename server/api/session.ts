// server/api/session.ts
export default defineEventHandler((event) => {
  const user = getAuthUser(event)

  return {
    authenticated: !!user && user.role === 'admin',
  }
})

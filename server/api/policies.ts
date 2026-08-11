// server/api/policies.ts
import * as yup from 'yup'
import { policiesService, type PolicyInput } from '../domain/policies/policies.service'

// DİKKAT: validateOrError `stripUnknown: true` ile çalışıyor — şemada
// olmayan alan sessizce düşer. Yeni alan eklenirse buraya da eklenmeli.
const schema = yup.object({
  slug: yup.string().trim().required(),
  title: yup.string().trim().required(),
  subtitle: yup.string().notRequired(),
  content: yup.string().required(),
  lastUpdated: yup.string().notRequired(),
  isActive: yup.boolean().notRequired(),
})

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  // Metinler herkese açık (sayfalar bunları basıyor); yazma yönetici işi.
  if (method !== 'GET') requireAdmin(event)

  if (method === 'GET') {
    const { slug } = getQuery(event)
    return policiesService.get(slug ? String(slug) : undefined)
  }

  if (method === 'POST') {
    const v = await validateOrError<PolicyInput>(schema, await readBody(event))
    if (!v.success) return v
    return policiesService.create(v.data)
  }

  if (method === 'PUT') {
    const v = await validateOrError<PolicyInput>(schema, await readBody(event))
    if (!v.success) return v
    return policiesService.update(v.data)
  }

  // DELETE bilerek YOK: politika sayfaları sabit üç adres, silinmeleri
  // sayfayı boş bırakırdı. Yayından kaldırmak için `isActive` kullanılır.
  throw createError({ statusCode: 405, message: 'Desteklenmeyen metot' })
})

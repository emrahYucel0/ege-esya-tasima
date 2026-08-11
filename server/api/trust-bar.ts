// server/api/trust-bar.ts
import * as yup from 'yup'
import { trustBarCrudService, type TrustBarInput } from '../domain/sections/configs/trust-bar.config'

// DİKKAT: validateOrError `stripUnknown: true` ile çalışıyor — şemada olmayan
// bir alan sessizce düşer. Yeni bir alan eklenirse hem buraya hem
// trust-bar.config.ts'deki mapCreate/mapParent* fonksiyonlarına eklenmeli.
const trustBarSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  intro: yup.string().trim().notRequired(),
  items: yup
    .array()
    .of(
      yup.object({
        iconPath: yup.string().trim().notRequired(),
        value: yup.string().trim().required(),
        label1: yup.string().trim().required(),
        label2: yup.string().trim().required(),
        order: yup.number().integer().min(0).notRequired(),
      })
    )
    .notRequired(),
})

const deleteSchema = yup.object({ sectionName: yup.string().trim().notRequired() })

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method !== 'GET') requireAdmin(event)

  if (method === 'GET') return trustBarCrudService.get()

  if (method === 'POST') {
    const v = await validateOrError<TrustBarInput>(trustBarSchema, await readBody(event))
    if (!v.success) return v
    return trustBarCrudService.create(v.data)
  }

  if (method === 'PUT') {
    const v = await validateOrError<TrustBarInput>(trustBarSchema, await readBody(event))
    if (!v.success) return v
    return trustBarCrudService.update(v.data)
  }

  if (method === 'DELETE') {
    const v = await validateOrError<{ sectionName?: string }>(deleteSchema, await readBody(event))
    if (!v.success) return v
    return trustBarCrudService.remove(v.data.sectionName)
  }

  throw createError({ statusCode: 405, message: 'Desteklenmeyen metot' })
})

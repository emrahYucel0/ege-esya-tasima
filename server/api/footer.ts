// server/api/footer.ts
import * as yup from 'yup'
import { footerCrudService, type FooterInput } from '../domain/sections/configs/footer.config'

const linkSchema = yup.object({
  name: yup.string().trim().notRequired(),
  url: yup.string().trim().notRequired(),
})

const footerSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  address: yup.string().trim().notRequired(),
  phone: yup.string().trim().notRequired(),
  email: yup.string().trim().notRequired(),
  copyright: yup.string().trim().notRequired(),
  socialLinks: yup.array().of(linkSchema).notRequired(),
  regionLinks: yup.array().of(linkSchema).notRequired(),
  quickLinks: yup.array().of(linkSchema).notRequired(),
  blogLinks: yup.array().of(linkSchema).notRequired(),
})

const footerDeleteSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
})

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method !== 'GET') {
    requireAdmin(event)
  }

  if (method === 'GET') {
    return footerCrudService.get()
  }

  if (method === 'POST') {
    const validation = await validateOrError<FooterInput>(footerSchema, await readBody(event))
    if (!validation.success) return validation
    return footerCrudService.create(validation.data)
  }

  if (method === 'PUT') {
    const validation = await validateOrError<FooterInput>(footerSchema, await readBody(event))
    if (!validation.success) return validation
    return footerCrudService.update(validation.data)
  }

  if (method === 'DELETE') {
    const validation = await validateOrError<{ sectionName?: string }>(footerDeleteSchema, await readBody(event))
    if (!validation.success) return validation
    return footerCrudService.remove(validation.data.sectionName)
  }

  return { error: `HTTP ${method} metodu desteklenmemektedir.` }
})

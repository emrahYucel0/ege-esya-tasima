import * as yup from 'yup'
import { postsService, type PostInput } from '~/server/domain/posts/posts.service'

const postSchema = yup.object({
  title: yup.string().trim().required(),
  subtitle: yup.string().trim().notRequired(),
  shortTitle: yup.string().trim().notRequired(),
  author: yup.string().trim().notRequired(),
  slug: yup.string().trim().required(),
  content: yup.string().notRequired(),
  excerpt: yup.string().notRequired(),
  image: yup.string().trim().notRequired(),
})

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method !== 'GET') {
    requireAdmin(event)
  }

  if (method === 'GET') {
    const { slug, light } = getQuery(event)
    return postsService.get(slug ? String(slug) : undefined, light === 'true')
  }

  if (method === 'POST') {
    const validation = await validateOrError<PostInput>(postSchema, await readBody(event))
    if (!validation.success) return validation
    return postsService.create(validation.data)
  }

  if (method === 'PUT') {
    const validation = await validateOrError<PostInput>(postSchema, await readBody(event))
    if (!validation.success) return validation
    return postsService.update(validation.data)
  }

  if (method === 'DELETE') {
    const { slug } = getQuery(event)
    return postsService.remove(String(slug))
  }

  return { success: false, error: `HTTP ${method} yöntemi desteklenmiyor.` }
})

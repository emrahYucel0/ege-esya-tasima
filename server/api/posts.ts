import * as yup from 'yup'
import prisma from '~/lib/prisma'

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
  const method = event.node.req.method // HTTP metodunu al

  if (method !== 'GET') {
    requireAdmin(event)
  }

  // GET İşlemi
  if (method === 'GET') {
    try {
      const { slug } = getQuery(event) // URL'den slug parametresini al

      if (slug) {
        const post = await prisma.post.findUnique({
          where: { slug: String(slug) }
        })

        if (!post) {
          throw createError({ statusCode: 404, message: 'Post bulunamadı' })
        }

        return { success: true, data: post }
      }

      const posts = await prisma.post.findMany()
      return { success: true, data: posts }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  // POST İşlemi (Yeni Post Ekleme)
  else if (method === 'POST') {
    try {
      const rawBody = await readBody(event)
      const validation = await validateOrError(postSchema, rawBody)
      if (!validation.success) return validation
      const body = validation.data

      const newPost = await prisma.post.create({
        data: {
          title: body.title,
          subtitle: body.subtitle,
          shortTitle: body.shortTitle,
          author: body.author,
          slug: body.slug,
          content: body.content,
          excerpt: body.excerpt,
          image: body.image
        }
      })

      return { success: true, data: newPost }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  // PUT İşlemi (Post Güncelleme)
  else if (method === 'PUT') {
    try {
      const rawBody = await readBody(event)
      const validation = await validateOrError(postSchema, rawBody)
      if (!validation.success) return validation
      const body = validation.data

      const updatedPost = await prisma.post.update({
        where: { slug: body.slug },
        data: {
          title: body.title,
          subtitle: body.subtitle,
          shortTitle: body.shortTitle,
          author: body.author,
          content: body.content,
          excerpt: body.excerpt,
          image: body.image
        }
      })

      return { success: true, data: updatedPost }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  // DELETE İşlemi (Post Silme)
  else if (method === 'DELETE') {
    try {
      const { slug } = getQuery(event)

      const deletedPost = await prisma.post.delete({
        where: { slug: String(slug) }
      })

      return { success: true, message: 'Post başarıyla silindi', data: deletedPost }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  // Desteklenmeyen HTTP Metodu
  else {
    return { success: false, error: `HTTP ${method} yöntemi desteklenmiyor.` }
  }
})

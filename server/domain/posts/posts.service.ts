// server/domain/posts/posts.service.ts
import { getErrorMessage } from '~/server/utils/prismaError'
import { ok, fail, type ServiceResult } from '../shared/response'
import { postsRepository } from './posts.repository'

export interface PostInput {
  title: string
  subtitle?: string
  shortTitle?: string
  author?: string
  slug: string
  content?: string
  excerpt?: string
  image?: string
}

async function get(slug?: string): Promise<ServiceResult<any>> {
  try {
    if (slug) {
      const post = await postsRepository.findBySlug(slug)
      if (!post) return fail('Post bulunamadı')
      return ok(post)
    }
    return ok(await postsRepository.findAll())
  } catch (error) {
    return fail(getErrorMessage(error))
  }
}

async function create(body: PostInput): Promise<ServiceResult<any>> {
  try {
    const post = await postsRepository.create({
      title: body.title,
      subtitle: body.subtitle,
      shortTitle: body.shortTitle,
      author: body.author,
      slug: body.slug,
      content: body.content,
      excerpt: body.excerpt,
      image: body.image,
    })
    return ok(post)
  } catch (error) {
    return fail(getErrorMessage(error))
  }
}

async function update(body: PostInput): Promise<ServiceResult<any>> {
  try {
    const post = await postsRepository.update(body.slug, {
      title: body.title,
      subtitle: body.subtitle,
      shortTitle: body.shortTitle,
      author: body.author,
      content: body.content,
      excerpt: body.excerpt,
      image: body.image,
    })
    return ok(post)
  } catch (error) {
    return fail(getErrorMessage(error))
  }
}

async function remove(slug: string): Promise<ServiceResult<any>> {
  try {
    const post = await postsRepository.remove(slug)
    return ok(post, 'Post başarıyla silindi')
  } catch (error) {
    return fail(getErrorMessage(error))
  }
}

export const postsService = { get, create, update, remove }

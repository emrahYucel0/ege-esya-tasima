// server/domain/posts/posts.service.ts
import { getSafeErrorMessage } from '../../utils/prismaError'
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
  metaDescription?: string
  image?: string
  imageAlt?: string
}

export interface PaginationInput {
  page?: number
  pageSize?: number
}

const DEFAULT_PAGE_SIZE = 20
const MAX_PAGE_SIZE = 100

// page/pageSize verilmezse (mevcut tüm tüketiciler: carousel'ler, navbar,
// admin'in bugüne kadarki tam liste görünümü) davranış öncekiyle birebir
// aynı kalır — bare bir dizi döner. Sadece `page` açıkça istendiğinde
// {items,total,page,pageSize,totalPages} zarfına geçilir; bu yüzden bu
// geriye dönük tam uyumlu, isteğe bağlı (opt-in) bir davranış.
async function get(slug?: string, light?: boolean, pagination?: PaginationInput): Promise<ServiceResult<any>> {
  try {
    if (slug) {
      const post = await postsRepository.findBySlug(slug)
      if (!post) return fail('Post bulunamadı')
      return ok(post)
    }

    if (pagination?.page) {
      const page = Math.max(1, pagination.page)
      const pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, pagination.pageSize || DEFAULT_PAGE_SIZE))
      const [items, total] = await Promise.all([
        postsRepository.findAll({ light, take: pageSize, skip: (page - 1) * pageSize }),
        postsRepository.count(),
      ])
      return ok({ items, total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)) })
    }

    return ok(await postsRepository.findAll({ light }))
  } catch (error) {
    return fail(getSafeErrorMessage(error))
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
      metaDescription: body.metaDescription,
      image: body.image,
      imageAlt: body.imageAlt,
    })
    return ok(post)
  } catch (error) {
    return fail(getSafeErrorMessage(error))
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
      metaDescription: body.metaDescription,
      image: body.image,
      imageAlt: body.imageAlt,
    })
    return ok(post)
  } catch (error) {
    return fail(getSafeErrorMessage(error))
  }
}

async function remove(slug: string): Promise<ServiceResult<any>> {
  try {
    const post = await postsRepository.remove(slug)
    return ok(post, 'Post başarıyla silindi')
  } catch (error) {
    return fail(getSafeErrorMessage(error))
  }
}

export const postsService = { get, create, update, remove }

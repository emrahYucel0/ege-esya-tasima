// server/domain/regions/regions.service.ts
import { getSafeErrorMessage } from '~/server/utils/prismaError'
import { ok, fail, type ServiceResult } from '../shared/response'
import { regionsRepository } from './regions.repository'

export interface PriceFactorInput {
  factor?: string
  min?: string
  max?: string
}

export interface RegionInput {
  title?: string
  subtitle?: string
  shortTitle?: string
  slug: string
  content?: string
  excerpt?: string
  image?: string
  isActive?: boolean
  cities?: number[]
  priceFactorsTitle?: string
  priceFactorsImage?: string
  priceFactors?: PriceFactorInput[]
}

export interface RegionGetOptions {
  slug?: string
  cityId?: number
  includeInactive: boolean
  light?: boolean
  page?: number
  pageSize?: number
}

const DEFAULT_PAGE_SIZE = 20
const MAX_PAGE_SIZE = 100

// page verilmezse (mevcut tüm tüketiciler) davranış öncekiyle birebir aynı
// kalır — bare bir dizi döner. Sadece `page` açıkça istendiğinde
// {items,total,page,pageSize,totalPages} zarfına geçilir (bkz. posts.service.ts
// içindeki aynı gerekçe).
async function get(options: RegionGetOptions): Promise<ServiceResult<any>> {
  try {
    if (options.slug) {
      const whereClause: any = { slug: options.slug }
      if (!options.includeInactive) whereClause.isActive = true
      const region = await regionsRepository.findUnique(whereClause)
      if (!region) return fail('Bölge bulunamadı veya erişim izni yok')
      return ok(region)
    }

    const whereClause: any = {}
    if (options.cityId !== undefined) {
      // NOT: orijinal kodda burada `path: ['cities']` vardı (PostgreSQL sözdizimi) —
      // ama `cities` alanının kendisi zaten dizi, MySQL'de bu path'i vermek
      // Prisma hatası fırlatıyordu ("Expected String, provided (String)"), yani
      // bu filtre hiç çalışmıyordu. `path` olmadan `array_contains` MySQL'de
      // JSON dizi alanının kökünde doğru şekilde çalışıyor (canlı doğrulandı).
      whereClause.cities = { array_contains: options.cityId }
    }
    if (!options.includeInactive) whereClause.isActive = true

    if (options.page) {
      const page = Math.max(1, options.page)
      const pageSize = Math.min(MAX_PAGE_SIZE, Math.max(1, options.pageSize || DEFAULT_PAGE_SIZE))
      const [items, total] = await Promise.all([
        regionsRepository.findMany(whereClause, { light: options.light, take: pageSize, skip: (page - 1) * pageSize }),
        regionsRepository.count(whereClause),
      ])
      return ok({ items, total, page, pageSize, totalPages: Math.max(1, Math.ceil(total / pageSize)) })
    }

    return ok(await regionsRepository.findMany(whereClause, { light: options.light }))
  } catch (error) {
    return fail(getSafeErrorMessage(error))
  }
}

async function create(body: RegionInput): Promise<ServiceResult<any>> {
  try {
    const region = await regionsRepository.create({
      title: body.title,
      subtitle: body.subtitle || null,
      shortTitle: body.shortTitle || null,
      slug: body.slug,
      content: body.content || null,
      excerpt: body.excerpt || null,
      image: body.image || null,
      isActive: body.isActive ?? false,
      cities: body.cities || [],
      priceFactorsTitle: body.priceFactorsTitle || null,
      priceFactorsImage: body.priceFactorsImage || null,
      priceFactors: body.priceFactors || [],
    })
    return ok(region)
  } catch (error) {
    return fail(getSafeErrorMessage(error))
  }
}

async function update(body: RegionInput): Promise<ServiceResult<any>> {
  try {
    const region = await regionsRepository.update(body.slug, {
      title: body.title,
      subtitle: body.subtitle ?? null,
      shortTitle: body.shortTitle ?? null,
      content: body.content ?? null,
      excerpt: body.excerpt ?? null,
      image: body.image ?? null,
      isActive: body.isActive ?? undefined,
      cities: body.cities ?? undefined,
      priceFactorsTitle: body.priceFactorsTitle ?? null,
      priceFactorsImage: body.priceFactorsImage ?? null,
      priceFactors: body.priceFactors ?? undefined,
    })
    return ok(region)
  } catch (error) {
    return fail(getSafeErrorMessage(error))
  }
}

async function remove(slug: string): Promise<ServiceResult<any>> {
  try {
    const region = await regionsRepository.remove(slug)
    return ok(region, 'Bölge başarıyla silindi')
  } catch (error) {
    return fail(getSafeErrorMessage(error))
  }
}

export const regionsService = { get, create, update, remove }

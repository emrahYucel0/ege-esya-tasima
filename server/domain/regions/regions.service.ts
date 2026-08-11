// server/domain/regions/regions.service.ts
import { getSafeErrorMessage } from '../../utils/prismaError'
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
  metaDescription?: string
  image?: string
  imageAlt?: string
  isActive?: boolean
  cities?: number[]
  priceFactorsTitle?: string
  priceFactorsImage?: string
  priceFactors?: PriceFactorInput[]
  /** Mahalle adları — yerel arama karşılığı için. */
  neighborhoods?: string[]
  /** Bölge künyesi satırları. */
  facts?: { label?: string; value?: string }[]
  /** Bölgeye özgü sık sorulanlar; FAQPage yapısal verisini besler. */
  faqs?: { question?: string; answer?: string }[]
  /** Sık taşınılan güzergâhlar; hedef slug'ı render sırasında çözülür. */
  routes?: { to?: string; note?: string }[]
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

/**
 * Güncellemede bir METİN alanının nasıl yazılacağını belirler:
 *
 *   alan istekte YOKSA   → undefined  (Prisma dokunmaz, mevcut veri korunur)
 *   BOŞ gönderildiyse    → null       (alan temizlenir)
 *   dolu gönderildiyse   → değerin kendisi (kırpılmadan)
 *
 * Önceden burada `?? null` vardı ve bu, ALANI HİÇ TAŞIMAYAN kısmi bir PUT'un
 * metin alanlarını sessizce silmesine yol açıyordu — nitekim bir kez sildi.
 * Panel her zaman tam form gönderdiği için canlı davranış değişmiyor: panel
 * temizlenen alanı '' olarak yolluyor, o da aşağıda null'a çevriliyor.
 *
 * Boşu '' değil null'a çevirmenin sebebi: kayıtların geri kalanı ve tohum
 * betikleri null kullanıyor. İki gösterim bir arada durursa "boş mu?" diye
 * soran her kodun ikisini de bilmesi gerekir.
 */
function metinAlani(deger?: string | null): string | null | undefined {
  if (deger === undefined) return undefined
  if (deger === null) return null
  return deger.trim() === '' ? null : deger
}

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
      metaDescription: body.metaDescription || null,
      image: body.image || null,
      imageAlt: body.imageAlt || null,
      isActive: body.isActive ?? false,
      cities: body.cities || [],
      priceFactorsTitle: body.priceFactorsTitle || null,
      priceFactorsImage: body.priceFactorsImage || null,
      priceFactors: body.priceFactors || [],
      neighborhoods: body.neighborhoods || [],
      facts: body.facts || [],
      faqs: body.faqs || [],
      routes: body.routes || [],
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
      subtitle: metinAlani(body.subtitle),
      shortTitle: metinAlani(body.shortTitle),
      content: metinAlani(body.content),
      excerpt: metinAlani(body.excerpt),
      metaDescription: metinAlani(body.metaDescription),
      image: metinAlani(body.image),
      imageAlt: metinAlani(body.imageAlt),
      isActive: body.isActive ?? undefined,
      cities: body.cities ?? undefined,
      priceFactorsTitle: metinAlani(body.priceFactorsTitle),
      priceFactorsImage: metinAlani(body.priceFactorsImage),
      priceFactors: body.priceFactors ?? undefined,
      // `?? undefined` bilinçli: panel bu alanları göndermezse mevcut veri
      // KORUNUR. `?? null` yazılsaydı, bu alanları taşımayan eski bir istek
      // (ör. başka bir panel bölümünden gelen kısmi güncelleme) doldurduğumuz
      // tüm derinlik içeriğini sessizce silerdi.
      neighborhoods: body.neighborhoods ?? undefined,
      facts: body.facts ?? undefined,
      faqs: body.faqs ?? undefined,
      routes: body.routes ?? undefined,
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

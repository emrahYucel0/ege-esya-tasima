import * as yup from 'yup'
import prisma from '~/lib/prisma'

const priceFactorSchema = yup.object({
  factor: yup.string().trim().notRequired(),
  min: yup.string().trim().notRequired(),
  max: yup.string().trim().notRequired(),
})

const regionCreateSchema = yup.object({
  title: yup.string().trim().required(),
  subtitle: yup.string().trim().notRequired(),
  shortTitle: yup.string().trim().notRequired(),
  slug: yup.string().trim().required(),
  content: yup.string().notRequired(),
  excerpt: yup.string().notRequired(),
  image: yup.string().trim().notRequired(),
  isActive: yup.boolean().notRequired(),
  cities: yup.array().of(yup.number()).notRequired(),
  priceFactorsTitle: yup.string().trim().notRequired(),
  priceFactorsImage: yup.string().trim().notRequired(),
  priceFactors: yup.array().of(priceFactorSchema).notRequired(),
})

const regionUpdateSchema = yup.object({
  title: yup.string().trim().notRequired(),
  subtitle: yup.string().trim().notRequired(),
  shortTitle: yup.string().trim().notRequired(),
  slug: yup.string().trim().required(),
  content: yup.string().notRequired(),
  excerpt: yup.string().notRequired(),
  image: yup.string().trim().notRequired(),
  isActive: yup.boolean().notRequired(),
  cities: yup.array().of(yup.number()).notRequired(),
  priceFactorsTitle: yup.string().trim().notRequired(),
  priceFactorsImage: yup.string().trim().notRequired(),
  priceFactors: yup.array().of(priceFactorSchema).notRequired(),
})

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const { admin } = getQuery(event)

  // Admin modunda mı? (tüm bölgeler gelsin) — bu modu sadece giriş yapmış admin isteyebilir
  const isAdminMode = admin === 'true' || admin === true

  // requireAdmin'i try/catch'in DIŞINDA çağırıyoruz ki 401 gerçekten 401 olarak dönsün,
  // aşağıdaki catch bloğu tarafından 200 + success:false'a çevrilmesin.
  if (method !== 'GET' || isAdminMode) {
    requireAdmin(event)
  }

  // ────────────────────────────────────────────────
  //                  GET - Bölge Listeleme
  // ────────────────────────────────────────────────
  if (method === 'GET') {
    try {
      const { slug, city } = getQuery(event)

      // 1. Tek bölge isteniyorsa (slug ile)
      if (slug) {
        const whereClause: any = { slug: String(slug) }

        // Admin değilse sadece aktif olanı getir
        if (!isAdminMode) {
          whereClause.isActive = true
        }

        const region = await prisma.region.findUnique({
          where: whereClause
        })

        if (!region) {
          throw createError({
            statusCode: 404,
            message: 'Bölge bulunamadı veya erişim izni yok'
          })
        }

        return { success: true, data: region }
      }

      // 2. Belirli bir şehre göre filtreleme
      if (city) {
        const cityId = parseInt(city as string)
        if (isNaN(cityId)) {
          throw createError({ statusCode: 400, message: 'Geçersiz şehir ID' })
        }

        const whereClause: any = {
          cities: {
            path: ['cities'],
            array_contains: cityId
          }
        }

        // Admin değilse sadece aktif bölgeler
        if (!isAdminMode) {
          whereClause.isActive = true
        }

        const regions = await prisma.region.findMany({
          where: whereClause,
          orderBy: { title: 'asc' } // isteğe bağlı sıralama
        })

        return { success: true, data: regions }
      }

      // 3. Genel liste (tüm bölgeler veya sadece aktif olanlar)
      const whereClause: any = {}

      if (!isAdminMode) {
        whereClause.isActive = true
      }

      const regions = await prisma.region.findMany({
        where: whereClause,
        orderBy: { title: 'asc' }
      })

      return { success: true, data: regions }
    } catch (error) {
      console.error(error)
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      }
    }
  }

  // ────────────────────────────────────────────────
  //                  POST - Yeni Bölge Oluştur
  // ────────────────────────────────────────────────
if (method === 'POST') {
  try {
    const rawBody = await readBody(event)
    const validation = await validateOrError(regionCreateSchema, rawBody)
    if (!validation.success) return validation
    const body = validation.data

    const newRegion = await prisma.region.create({
      data: {
        title: body.title,
        subtitle: body.subtitle || null,
        shortTitle: body.shortTitle || null,
        slug: body.slug,
        content: body.content || null,
        excerpt: body.excerpt || null,
        image: body.image || null,
        isActive: body.isActive ?? false,
        cities: body.cities || [],
        // Yeni alanlar
        priceFactorsTitle: body.priceFactorsTitle || null,
        priceFactorsImage: body.priceFactorsImage || null,
        priceFactors: body.priceFactors || []
      }
    })

    return { success: true, data: newRegion }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }
  }
}

  // ────────────────────────────────────────────────
  //                  PUT - Bölge Güncelle
  // ────────────────────────────────────────────────
  if (method === 'PUT') {
  try {
    const rawBody = await readBody(event)
    const validation = await validateOrError(regionUpdateSchema, rawBody)
    if (!validation.success) return validation
    const body = validation.data

    const updatedRegion = await prisma.region.update({
      where: { slug: body.slug },
      data: {
        title: body.title,
        subtitle: body.subtitle ?? null,
        shortTitle: body.shortTitle ?? null,
        content: body.content ?? null,
        excerpt: body.excerpt ?? null,
        image: body.image ?? null,
        isActive: body.isActive ?? undefined,
        cities: body.cities ?? undefined,
        // Yeni alanlar
        priceFactorsTitle: body.priceFactorsTitle ?? null,
        priceFactorsImage: body.priceFactorsImage ?? null,
        priceFactors: body.priceFactors ?? undefined
      }
    })

    return { success: true, data: updatedRegion }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    }
  }
}

  // ────────────────────────────────────────────────
  //                  DELETE - Bölge Sil
  // ────────────────────────────────────────────────
  if (method === 'DELETE') {
    try {
      const { slug } = getQuery(event)

      if (!slug) {
        throw createError({ statusCode: 400, message: 'Slug parametresi zorunludur' })
      }

      const deleted = await prisma.region.delete({
        where: { slug: String(slug) }
      })

      return {
        success: true,
        message: 'Bölge başarıyla silindi',
        data: deleted
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error)
      }
    }
  }

  // Desteklenmeyen method
  return {
    success: false,
    error: `HTTP ${method} yöntemi desteklenmiyor`
  }
})
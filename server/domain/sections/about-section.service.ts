// server/domain/sections/about-section.service.ts
// Bilinçli olarak section-crud.factory.ts KULLANMIYOR. Bu bölüm diğer 13
// tekil-bölümden üç noktada ayrılıyor ve bunlar davranış değişikliği
// yapılmadan (ürünsel bir "drift mi kasıtlı mı" tartışması ayrı bir konu)
// aynen korunuyor:
//   1. GET'te kayıt yoksa null değil, doldurulmuş bir varsayılan obje döner
//      (DB'ye hiçbir şey yazılmaz — card.ts'nin defaultObjectOnMissingGet'i
//      ile aynı fikir, ama bu dosya factory'yi hiç kullanmadığı için burada
//      elle yazılıyor).
//   2. PUT, ilişkili verileri silmeden önce prisma.$transaction ile sarıyor,
//      ve P2025 (kayıt yok) hatası alırsa otomatik olarak POST'a düşüp yeni
//      kayıt oluşturuyor (diğer 17 dosyada olmayan bir upsert-benzeri davranış).
//   3. Diğer dosyalarda olmayan bir PATCH metodu destekliyor.
import prisma from '~/lib/prisma'
import { isUniqueConstraintError, isRecordNotFoundError, getErrorMessage } from '~/server/utils/prismaError'
import { ok, fail, type ServiceResult } from '../shared/response'

const DEFAULT_SECTION_NAME = 'about-section'

export interface AboutServiceItemInput {
  iconPath?: string
  iconAlt?: string
  title?: string
  description?: string
  order?: number
}

export interface AboutStatInput {
  value?: string
  label?: string
  order?: number
}

export interface AboutSectionInput {
  sectionName?: string
  mainTitle?: string
  description1?: string
  description2?: string
  description3?: string
  teamImage?: string
  teamImageAlt?: string
  historyTitle?: string
  historyText1?: string
  historyText2?: string
  historyText3?: string
  seoTitle?: string
  seoDescription?: string
  services?: AboutServiceItemInput[]
  stats?: AboutStatInput[]
}

const includeChildren = { services: true, stats: true }

function mapServicesData(services: AboutSectionInput['services']) {
  return Array.isArray(services)
    ? services.map((s) => ({
        iconPath: s.iconPath || '',
        iconAlt: s.iconAlt || '',
        title: s.title || '',
        description: s.description || '',
        order: s.order || 0,
      }))
    : []
}

function mapStatsData(stats: AboutSectionInput['stats']) {
  return Array.isArray(stats)
    ? stats.map((s) => ({
        value: s.value || '',
        label: s.label || '',
        order: s.order || 0,
      }))
    : []
}

async function get(): Promise<ServiceResult<any>> {
  try {
    const row = await prisma.aboutSection.findFirst({
      where: { sectionName: DEFAULT_SECTION_NAME },
      include: {
        services: { orderBy: { order: 'asc' } },
        stats: { orderBy: { order: 'asc' } },
      },
    })
    return ok(
      row || {
        sectionName: DEFAULT_SECTION_NAME,
        mainTitle: '',
        description1: '',
        description2: '',
        description3: '',
        teamImage: '',
        teamImageAlt: '',
        historyTitle: '',
        historyText1: '',
        historyText2: '',
        historyText3: '',
        seoTitle: '',
        seoDescription: '',
        services: [],
        stats: [],
      }
    )
  } catch (error) {
    return fail('Veri getirilirken bir hata oluştu.')
  }
}

async function create(body: AboutSectionInput): Promise<ServiceResult<any>> {
  try {
    const row = await prisma.aboutSection.create({
      data: {
        sectionName: body.sectionName || DEFAULT_SECTION_NAME,
        mainTitle: body.mainTitle || '',
        description1: body.description1 || '',
        description2: body.description2 || '',
        description3: body.description3 || '',
        teamImage: body.teamImage || '',
        teamImageAlt: body.teamImageAlt || '',
        historyTitle: body.historyTitle || '',
        historyText1: body.historyText1 || '',
        historyText2: body.historyText2 || '',
        historyText3: body.historyText3 || '',
        seoTitle: body.seoTitle || '',
        seoDescription: body.seoDescription || '',
        services: { create: mapServicesData(body.services) },
        stats: { create: mapStatsData(body.stats) },
      },
      include: includeChildren,
    })
    return ok(row)
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return fail(`Hata: '${DEFAULT_SECTION_NAME}' adında bir kayıt zaten mevcut. Güncelleme (PUT) metodunu kullanın.`)
    }
    return fail(getErrorMessage(error))
  }
}

async function update(body: AboutSectionInput): Promise<ServiceResult<any>> {
  const targetSectionName = body.sectionName || DEFAULT_SECTION_NAME
  const servicesData = mapServicesData(body.services)
  const statsData = mapStatsData(body.stats)

  try {
    await prisma.$transaction([
      prisma.aboutService.deleteMany({ where: { aboutSection: { sectionName: targetSectionName } } }),
      prisma.aboutStat.deleteMany({ where: { aboutSection: { sectionName: targetSectionName } } }),
    ])

    const row = await prisma.aboutSection.update({
      where: { sectionName: targetSectionName },
      data: {
        mainTitle: body.mainTitle,
        description1: body.description1,
        description2: body.description2,
        description3: body.description3,
        teamImage: body.teamImage,
        teamImageAlt: body.teamImageAlt,
        historyTitle: body.historyTitle,
        historyText1: body.historyText1,
        historyText2: body.historyText2,
        historyText3: body.historyText3,
        seoTitle: body.seoTitle,
        seoDescription: body.seoDescription,
        services: { create: servicesData },
        stats: { create: statsData },
      },
      include: includeChildren,
    })
    return ok(row)
  } catch (error) {
    if (isRecordNotFoundError(error)) {
      // Kayıt yoksa oluştur (diğer bölümlerde olmayan upsert-benzeri fallback).
      try {
        const created = await prisma.aboutSection.create({
          data: {
            sectionName: targetSectionName,
            mainTitle: body.mainTitle || '',
            description1: body.description1 || '',
            description2: body.description2 || '',
            description3: body.description3 || '',
            teamImage: body.teamImage || '',
            teamImageAlt: body.teamImageAlt || '',
            historyTitle: body.historyTitle || '',
            historyText1: body.historyText1 || '',
            historyText2: body.historyText2 || '',
            historyText3: body.historyText3 || '',
            seoTitle: body.seoTitle || '',
            seoDescription: body.seoDescription || '',
            services: { create: servicesData },
            stats: { create: statsData },
          },
          include: includeChildren,
        })
        return ok(created, 'Kayıt bulunamadı, yeni kayıt oluşturuldu.')
      } catch {
        return fail('Kayıt oluşturulurken hata oluştu.')
      }
    }
    return fail(getErrorMessage(error))
  }
}

async function partialUpdate(body: Partial<AboutSectionInput>): Promise<ServiceResult<any>> {
  const targetSectionName = body.sectionName || DEFAULT_SECTION_NAME
  const updateData: Record<string, any> = {}
  if (body.mainTitle !== undefined) updateData.mainTitle = body.mainTitle
  if (body.description1 !== undefined) updateData.description1 = body.description1
  if (body.description2 !== undefined) updateData.description2 = body.description2
  if (body.description3 !== undefined) updateData.description3 = body.description3
  if (body.teamImage !== undefined) updateData.teamImage = body.teamImage
  if (body.teamImageAlt !== undefined) updateData.teamImageAlt = body.teamImageAlt
  if (body.historyTitle !== undefined) updateData.historyTitle = body.historyTitle
  if (body.historyText1 !== undefined) updateData.historyText1 = body.historyText1
  if (body.historyText2 !== undefined) updateData.historyText2 = body.historyText2
  if (body.historyText3 !== undefined) updateData.historyText3 = body.historyText3
  if (body.seoTitle !== undefined) updateData.seoTitle = body.seoTitle
  if (body.seoDescription !== undefined) updateData.seoDescription = body.seoDescription

  try {
    const row = await prisma.aboutSection.update({
      where: { sectionName: targetSectionName },
      data: updateData,
      include: includeChildren,
    })
    return ok(row)
  } catch (error) {
    if (isRecordNotFoundError(error)) {
      return fail(`Hata: '${targetSectionName}' adında bir kayıt bulunamadı.`)
    }
    return fail(getErrorMessage(error))
  }
}

async function remove(sectionNameInput?: string): Promise<ServiceResult<any>> {
  const targetSectionName = sectionNameInput || DEFAULT_SECTION_NAME
  try {
    const result = await prisma.$transaction(async (tx) => {
      await tx.aboutService.deleteMany({ where: { aboutSection: { sectionName: targetSectionName } } })
      await tx.aboutStat.deleteMany({ where: { aboutSection: { sectionName: targetSectionName } } })
      return tx.aboutSection.delete({ where: { sectionName: targetSectionName } })
    })
    return ok(result)
  } catch (error) {
    if (isRecordNotFoundError(error)) {
      return fail(`Hata: '${targetSectionName}' adında silinecek kayıt bulunamadı.`)
    }
    return fail(getErrorMessage(error))
  }
}

export const aboutSectionService = { get, create, update, partialUpdate, remove }

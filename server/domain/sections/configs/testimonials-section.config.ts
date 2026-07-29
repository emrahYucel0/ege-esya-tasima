// server/domain/sections/configs/testimonials-section.config.ts
import prisma from '~/lib/prisma'
import { createSectionCrudService } from '../section-crud.factory'
import { ok, fail, type ServiceResult } from '../../shared/response'
import { isRecordNotFoundError, getSafeErrorMessage } from '~/server/utils/prismaError'

export interface TestimonialInput {
  customerName?: string
  customerImage?: string
  rating?: number
  comment?: string
  date?: string | Date
  location?: string
  serviceType?: string
  serviceTypeIcon?: string
  isFeatured?: boolean
  isActive?: boolean
  order?: number
}

export interface TestimonialSectionInput {
  sectionName?: string
  mainTitle?: string
  subtitle?: string
  tag?: string
  showDecorations?: boolean
  backgroundColor?: string
  textColor?: string
  testimonials?: TestimonialInput[]
}

const DEFAULT_SECTION_NAME = 'testimonials-section'

const mapTestimonialCreate = (t: TestimonialInput) => {
  let dateValue: Date
  if (t.date instanceof Date) {
    dateValue = t.date
  } else if (typeof t.date === 'string') {
    dateValue = new Date(t.date)
  } else {
    dateValue = new Date()
  }
  return {
    customerName: t.customerName || '',
    customerImage: t.customerImage,
    rating: t.rating || 5,
    comment: t.comment || '',
    date: dateValue,
    location: t.location,
    serviceType: t.serviceType || '',
    serviceTypeIcon: t.serviceTypeIcon,
    isFeatured: t.isFeatured || false,
    isActive: t.isActive !== undefined ? t.isActive : true,
    order: t.order || 0,
  }
}

export const testimonialsSectionCrudService = createSectionCrudService<any, TestimonialSectionInput>(
  prisma.testimonialSection,
  {
    defaultSectionName: DEFAULT_SECTION_NAME,
    // POST/PUT sonrası admin panel TÜM yorumları görmeli (isActive dahil).
    include: { testimonials: true },
    // Herkese açık sayfa da bu endpoint'i kullanıyor (components/base/Testimonial.vue)
    // ve sadece isActive:true yorumları görmeli.
    getInclude: {
      testimonials: { where: { isActive: true }, orderBy: { order: 'asc' } },
    },
    children: [{ relation: 'testimonials', mapCreate: mapTestimonialCreate }],
    mapParentCreate: (b) => ({
      mainTitle: b.mainTitle || '',
      subtitle: b.subtitle,
      tag: b.tag,
      showDecorations: b.showDecorations !== undefined ? b.showDecorations : true,
      backgroundColor: b.backgroundColor,
      textColor: b.textColor,
    }),
    mapParentUpdate: (b) => ({
      mainTitle: b.mainTitle,
      subtitle: b.subtitle,
      tag: b.tag,
      showDecorations: b.showDecorations,
      backgroundColor: b.backgroundColor,
      textColor: b.textColor,
    }),
    deleteStrategy: 'manual',
    manualDeleteDelegates: [
      (sectionName) => prisma.testimonial.deleteMany({ where: { testimonialSection: { sectionName } } }),
    ],
  }
)

// PATCH metodu: skaler alanların kısmi güncellemesi. Frontend'de hiçbir yerden
// çağrılmıyor (bkz. components/ içinde PATCH araması, sonuç yok) — yani ölü kod,
// ama bu refactor "davranışı değiştirmeden taşı" ilkesiyle sınırlı olduğu için
// generic factory'ye zorlanmadan aynen korunuyor.
export async function partialUpdateTestimonialsSection(
  body: Partial<TestimonialSectionInput>
): Promise<ServiceResult<any>> {
  const sectionName = body.sectionName || DEFAULT_SECTION_NAME
  const updateData: Record<string, any> = {}
  if (body.mainTitle !== undefined) updateData.mainTitle = body.mainTitle
  if (body.subtitle !== undefined) updateData.subtitle = body.subtitle
  if (body.tag !== undefined) updateData.tag = body.tag
  if (body.showDecorations !== undefined) updateData.showDecorations = body.showDecorations
  if (body.backgroundColor !== undefined) updateData.backgroundColor = body.backgroundColor
  if (body.textColor !== undefined) updateData.textColor = body.textColor

  try {
    const updated = await prisma.testimonialSection.update({
      where: { sectionName },
      data: updateData,
      include: { testimonials: { where: { isActive: true }, orderBy: { order: 'asc' } } },
    })
    return ok(updated)
  } catch (error) {
    if (isRecordNotFoundError(error)) {
      return fail(`Hata: '${sectionName}' adında bir kayıt bulunamadı.`)
    }
    return fail(getSafeErrorMessage(error))
  }
}

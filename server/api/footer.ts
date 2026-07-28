// server/api/footer.ts
import * as yup from 'yup'
import prisma from '~/lib/prisma'

// ---------------------------------
// TİP TANIMLARI
// ---------------------------------

interface SocialLinkInput {
  name?: string
  url?: string
}

interface RegionLinkInput {
  name?: string
  url?: string
}

interface QuickLinkInput {
  name?: string
  url?: string
}

interface BlogLinkInput {
  name?: string
  url?: string
}

interface FooterInput {
  sectionName?: string
  address?: string
  phone?: string
  email?: string
  copyright?: string
  socialLinks?: SocialLinkInput[]
  regionLinks?: RegionLinkInput[]
  quickLinks?: QuickLinkInput[]
  blogLinks?: BlogLinkInput[]
}

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

// ---------------------------------
// SUNUCU ROTASI
// ---------------------------------

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const defaultSectionName = 'footers' // Modeldeki varsayılan değer

  if (method !== 'GET') {
    requireAdmin(event)
  }

  // GET: Footer verisini ilişkileriyle birlikte getir
  if (method === 'GET') {
    try {
      const footer = await prisma.footer.findFirst({
        where: { sectionName: defaultSectionName },
        include: {
          socialLinks: true,
          regionLinks: true,
          quickLinks: true,
          blogLinks: true,
        },
      })
      return footer
    } catch (error) {
      console.error('GET /api/footer hatası:', error)
      return { success: false, error: 'Veri getirilirken bir hata oluştu.' }
    }
  }

  // POST: Yeni footer oluştur
  else if (method === 'POST') {
    const rawBody = await readBody(event)
    const validation = await validateOrError<FooterInput>(footerSchema, rawBody)
    if (!validation.success) return validation
    const body = validation.data

    // İlişkili verileri hazırla
    const socialData = body.socialLinks?.map((s) => ({ name: s.name, url: s.url })) || []
    const regionData = body.regionLinks?.map((r) => ({ name: r.name, url: r.url })) || []
    const quickData = body.quickLinks?.map((q) => ({ name: q.name, url: q.url })) || []
    const blogData = body.blogLinks?.map((b) => ({ name: b.name, url: b.url })) || []

    try {
      const newFooter = await prisma.footer.create({
        data: {
          sectionName: body.sectionName || defaultSectionName,
          address: body.address,
          phone: body.phone,
          email: body.email,
          copyright: body.copyright,
          socialLinks: { create: socialData },
          regionLinks: { create: regionData },
          quickLinks: { create: quickData },
          blogLinks: { create: blogData },
        },
        include: {
          socialLinks: true,
          regionLinks: true,
          quickLinks: true,
          blogLinks: true,
        },
      })
      return { success: true, data: newFooter }
    } catch (error: any) {
      // Benzersiz sectionName kontrolü
      if (isUniqueConstraintError(error)) {
        return {
          success: false,
          error: `'${defaultSectionName}' adında bir kayıt zaten var. Güncelleme için PUT metodunu kullanın.`,
        }
      }
      return { success: false, error: error.message }
    }
  }

  // PUT: Footer güncelle (ilişkili veriler silinip yeniden oluşturulur)
  else if (method === 'PUT') {
    const rawBody = await readBody(event)
    const validation = await validateOrError<FooterInput>(footerSchema, rawBody)
    if (!validation.success) return validation
    const body = validation.data
    const targetSection = body.sectionName || defaultSectionName

    const socialData = body.socialLinks?.map((s) => ({ name: s.name, url: s.url })) || []
    const regionData = body.regionLinks?.map((r) => ({ name: r.name, url: r.url })) || []
    const quickData = body.quickLinks?.map((q) => ({ name: q.name, url: q.url })) || []
    const blogData = body.blogLinks?.map((b) => ({ name: b.name, url: b.url })) || []

    try {
      const updatedFooter = await prisma.footer.update({
        where: { sectionName: targetSection },
        data: {
          address: body.address,
          phone: body.phone,
          email: body.email,
          copyright: body.copyright,
          // İlişkili verileri tamamen yenile
          socialLinks: {
            deleteMany: {},
            create: socialData,
          },
          regionLinks: {
            deleteMany: {},
            create: regionData,
          },
          quickLinks: {
            deleteMany: {},
            create: quickData,
          },
          blogLinks: {
            deleteMany: {},
            create: blogData,
          },
        },
        include: {
          socialLinks: true,
          regionLinks: true,
          quickLinks: true,
          blogLinks: true,
        },
      })
      return { success: true, data: updatedFooter }
    } catch (error: any) {
      if (isRecordNotFoundError(error)) {
        return {
          success: false,
          error: `'${targetSection}' adında bir kayıt bulunamadı. Önce POST ile oluşturun.`,
        }
      }
      return { success: false, error: error.message }
    }
  }

  // DELETE: Footer ve ilişkili tüm verileri sil
  else if (method === 'DELETE') {
    const rawBody = await readBody(event)
    const validation = await validateOrError<{ sectionName?: string }>(footerDeleteSchema, rawBody)
    if (!validation.success) return validation
    const body = validation.data
    const targetSection = body.sectionName || defaultSectionName

    try {
      // Önce ilişkili verileri manuel sil (CASCADE yoksa)
      await prisma.footerSocialLink.deleteMany({
        where: { footer: { sectionName: targetSection } },
      })
      await prisma.footerRegionLink.deleteMany({
        where: { footer: { sectionName: targetSection } },
      })
      await prisma.quickLink.deleteMany({
        where: { footer: { sectionName: targetSection } },
      })
      await prisma.footerBlogLink.deleteMany({
        where: { footer: { sectionName: targetSection } },
      })

      // Ana kaydı sil
      const deleted = await prisma.footer.delete({
        where: { sectionName: targetSection },
      })
      return { success: true, data: deleted }
    } catch (error: any) {
      if (isRecordNotFoundError(error)) {
        return {
          success: false,
          error: `'${targetSection}' adında silinecek kayıt bulunamadı.`,
        }
      }
      return { success: false, error: error.message }
    }
  }

  // Desteklenmeyen metod
  else {
    return { error: `HTTP ${method} metodu desteklenmemektedir.` }
  }
})
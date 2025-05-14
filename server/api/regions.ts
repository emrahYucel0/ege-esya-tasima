import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const method = event.node.req.method // HTTP metodunu al

  // GET İşlemi
  if (method === 'GET') {
    try {
      const { slug } = getQuery(event) // URL'den slug parametresini al

      // Eğer slug varsa, tek bir bölge getir
      if (slug) {
        const region = await prisma.region.findUnique({
          where: { slug: String(slug) }
        })

        if (!region) {
          throw createError({ statusCode: 404, message: 'Bölge bulunamadı' })
        }

        return { success: true, data: region }
      }

      // Slug yoksa, tüm bölgeleri getir
      const regions = await prisma.region.findMany()
      return { success: true, data: regions }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  // POST İşlemi (Yeni Bölge Ekleme)
  else if (method === 'POST') {
    try {
      const body = await readBody(event) // Request body'sini oku

      // Yeni bölge oluştur
      const newRegion = await prisma.region.create({
        data: {
          title: body.title,
          subtitle: body.subtitle,
          shortTitle: body.shortTitle,
          slug: body.slug,
          content: body.content, // TipTap HTML içeriği
          excerpt: body.excerpt, // Kartlarda gösterilecek kısa açıklama
          image: body.image
        }
      })

      return { success: true, data: newRegion }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  // PUT İşlemi (Bölge Güncelleme)
  else if (method === 'PUT') {
    try {
      const body = await readBody(event) // Request body'sini oku

      // Bölgeyi güncelle
      const updatedRegion = await prisma.region.update({
        where: { slug: body.slug }, // Slug'a göre bölgeyi bul
        data: {
          title: body.title,
          subtitle: body.subtitle,
          shortTitle: body.shortTitle,
          content: body.content,
          excerpt: body.excerpt,
          image: body.image
        }
      })

      return { success: true, data: updatedRegion }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  // DELETE İşlemi (Bölge Silme)
  else if (method === 'DELETE') {
    try {
      const { slug } = getQuery(event) // URL'den slug parametresini al

      // Bölgeyi sil
      const deletedRegion = await prisma.region.delete({
        where: { slug: String(slug) }
      })

      return { success: true, message: 'Bölge başarıyla silindi', data: deletedRegion }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) }
    }
  }

  // Desteklenmeyen HTTP Metodu
  else {
    return { success: false, error: `HTTP ${method} yöntemi desteklenmiyor.` }
  }
})
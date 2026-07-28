import * as yup from 'yup';
import prisma from '~/lib/prisma';

// ---------------------------------
// TİP TANIMLARI
// ---------------------------------

/**
 * FaqDetail modeline veri eklemek/güncellemek için kullanılan tip.
 */
interface FaqDetailInput {
  text?: string;
  order?: number;
}

/**
 * FaqItem modeline veri eklemek/güncellemek için kullanılan tip.
 */
interface FaqItemInput {
  question?: string;
  answer?: string;
  order?: number;
  isActive?: boolean;
  details?: FaqDetailInput[];
}

/**
 * FaqStatsCard modeline veri eklemek/güncellemek için kullanılan tip.
 */
interface FaqStatsCardInput {
  value?: string;
  label?: string;
  bgColor?: string;
  textColor?: string;
  position?: string;
  order?: number;
}

/**
 * FaqImage modeline veri eklemek/güncellemek için kullanılan tip.
 */
interface FaqImageInput {
  imagePath?: string;
  altText?: string;
  position?: string;
  order?: number;
}

/**
 * FaqSection modeline veri eklemek/güncellemek için kullanılan ana tip.
 */
interface FaqSectionInput {
  sectionName?: string;
  mainTitle?: string;
  description?: string;
  ctaTitle?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  faqs?: FaqItemInput[];
  statsCards?: FaqStatsCardInput[];
  images?: FaqImageInput[];
}

const faqDetailSchema = yup.object({
  text: yup.string().trim().notRequired(),
  order: yup.number().notRequired(),
});

const faqItemSchema = yup.object({
  question: yup.string().trim().notRequired(),
  answer: yup.string().notRequired(),
  order: yup.number().notRequired(),
  isActive: yup.boolean().notRequired(),
  details: yup.array().of(faqDetailSchema).notRequired(),
});

const faqStatsCardSchema = yup.object({
  value: yup.string().trim().notRequired(),
  label: yup.string().trim().notRequired(),
  bgColor: yup.string().trim().notRequired(),
  textColor: yup.string().trim().notRequired(),
  position: yup.string().trim().notRequired(),
  order: yup.number().notRequired(),
});

const faqImageSchema = yup.object({
  imagePath: yup.string().trim().notRequired(),
  altText: yup.string().trim().notRequired(),
  position: yup.string().trim().notRequired(),
  order: yup.number().notRequired(),
});

const faqSectionSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  mainTitle: yup.string().trim().notRequired(),
  description: yup.string().notRequired(),
  ctaTitle: yup.string().trim().notRequired(),
  ctaButtonText: yup.string().trim().notRequired(),
  ctaButtonLink: yup.string().trim().notRequired(),
  faqs: yup.array().of(faqItemSchema).notRequired(),
  statsCards: yup.array().of(faqStatsCardSchema).notRequired(),
  images: yup.array().of(faqImageSchema).notRequired(),
});

const faqSectionDeleteSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
});

// ---------------------------------
// SUNUCU ROTASI (HANDLER)
// ---------------------------------

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const defaultSectionName = "faq-section"; // Varsayılan sectionName

  if (method !== 'GET') {
    requireAdmin(event);
  }

  // READ (GET)
  if (method === 'GET') {
    // sectionName'i "faq-section" olan ilk kaydı, ilişkili tüm verilerle getir.
    try {
      const faqSectionData = await prisma.faqSection.findFirst({
        where: { sectionName: defaultSectionName },
        include: {
          faqs: {
            orderBy: {
              order: 'asc', // FAQ'ları 'order' alanına göre sırala
            },
            include: {
              details: {
                orderBy: {
                  order: 'asc', // Detayları 'order' alanına göre sırala
                },
              },
            },
          },
          statsCards: {
            orderBy: {
              order: 'asc', // İstatistik kartlarını 'order' alanına göre sırala
            },
          },
          images: {
            orderBy: {
              order: 'asc', // Görselleri 'order' alanına göre sırala
            },
          },
        },
      });
      return faqSectionData;
    } catch (error) {
      console.error("GET hatası:", error);
      return { success: false, error: 'Veri getirilirken bir hata oluştu.' };
    }
  } 
  
  // CREATE (POST)
  else if (method === 'POST') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<FaqSectionInput>(faqSectionSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;

    // FAQs verilerini hazırlıyoruz (detayları ile birlikte)
    const faqsData = Array.isArray(body.faqs)
      ? body.faqs.map(faq => ({
          question: faq.question || "",
          answer: faq.answer || "",
          order: faq.order || 0,
          isActive: faq.isActive !== undefined ? faq.isActive : true,
          details: {
            create: Array.isArray(faq.details)
              ? faq.details.map(detail => ({
                  text: detail.text || "",
                  order: detail.order || 0,
                }))
              : [],
          },
        }))
      : [];

    // StatsCards verilerini hazırlıyoruz
    const statsCardsData = Array.isArray(body.statsCards)
      ? body.statsCards.map(card => ({
          value: card.value || "",
          label: card.label || "",
          bgColor: card.bgColor || "#3b5d50",
          textColor: card.textColor || "#ffffff",
          position: card.position || "",
          order: card.order || 0,
        }))
      : [];

    // Images verilerini hazırlıyoruz
    const imagesData = Array.isArray(body.images)
      ? body.images.map(image => ({
          imagePath: image.imagePath || "",
          altText: image.altText || "",
          position: image.position || "",
          order: image.order || 0,
        }))
      : [];

    try {
      const newFaqSection = await prisma.faqSection.create({
        data: {
          sectionName: body.sectionName || defaultSectionName,
          mainTitle: body.mainTitle || "",
          description: body.description,
          ctaTitle: body.ctaTitle,
          ctaButtonText: body.ctaButtonText,
          ctaButtonLink: body.ctaButtonLink,
          faqs: { create: faqsData },
          statsCards: { create: statsCardsData },
          images: { create: imagesData },
        },
        include: {
          faqs: {
            include: {
              details: true,
            },
          },
          statsCards: true,
          images: true,
        },
      });
      return { success: true, data: newFaqSection };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      // sectionName unique olduğu için duplicate hatası verebilir.
      if (isUniqueConstraintError(error)) {
         return { success: false, error: `Hata: '${defaultSectionName}' adında bir kayıt zaten mevcut. Güncelleme (PUT) metodunu kullanın.` };
      }
      return { success: false, error: errorMessage };
    }
  } 
  
  // UPDATE (PUT)
  else if (method === 'PUT') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<FaqSectionInput>(faqSectionSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;
    const targetSectionName = body.sectionName || defaultSectionName;

    // FAQs verilerini hazırlıyoruz (detayları ile birlikte)
    const faqsData = Array.isArray(body.faqs)
      ? body.faqs.map(faq => ({
          question: faq.question || "",
          answer: faq.answer || "",
          order: faq.order || 0,
          isActive: faq.isActive !== undefined ? faq.isActive : true,
          details: {
            create: Array.isArray(faq.details)
              ? faq.details.map(detail => ({
                  text: detail.text || "",
                  order: detail.order || 0,
                }))
              : [],
          },
        }))
      : [];

    // StatsCards verilerini hazırlıyoruz
    const statsCardsData = Array.isArray(body.statsCards)
      ? body.statsCards.map(card => ({
          value: card.value || "",
          label: card.label || "",
          bgColor: card.bgColor || "#3b5d50",
          textColor: card.textColor || "#ffffff",
          position: card.position || "",
          order: card.order || 0,
        }))
      : [];

    // Images verilerini hazırlıyoruz
    const imagesData = Array.isArray(body.images)
      ? body.images.map(image => ({
          imagePath: image.imagePath || "",
          altText: image.altText || "",
          position: image.position || "",
          order: image.order || 0,
        }))
      : [];

    try {
      const updatedFaqSection = await prisma.faqSection.update({
        where: { sectionName: targetSectionName },
        data: {
          mainTitle: body.mainTitle,
          description: body.description,
          ctaTitle: body.ctaTitle,
          ctaButtonText: body.ctaButtonText,
          ctaButtonLink: body.ctaButtonLink,
          // İlişkili verileri güncelleme: Önce eskileri sil, sonra yenilerini oluştur
          faqs: {
            deleteMany: {}, // Mevcut tüm ilişkili FAQ'ları sil (cascade ile detaylar da silinir)
            create: faqsData, // Yeni FAQ'ları oluştur
          },
          statsCards: {
            deleteMany: {}, // Mevcut tüm ilişkili istatistik kartlarını sil
            create: statsCardsData, // Yeni kartları oluştur
          },
          images: {
            deleteMany: {}, // Mevcut tüm ilişkili görselleri sil
            create: imagesData, // Yeni görselleri oluştur
          },
        },
        include: {
          faqs: {
            include: {
              details: true,
            },
          },
          statsCards: true,
          images: true,
        },
      });
      return { success: true, data: updatedFaqSection };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
       if (isRecordNotFoundError(error)) {
         return { success: false, error: `Hata: '${targetSectionName}' adında bir kayıt bulunamadı. Önce POST ile oluşturmayı deneyin.` };
      }
      return { success: false, error: errorMessage };
    }
  } 
  
  // DELETE (DELETE)
  else if (method === 'DELETE') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<{ sectionName?: string }>(faqSectionDeleteSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;
    const targetSectionName = body.sectionName || defaultSectionName;

    try {
      // Cascade delete aktif olduğu için sadece ana kaydı silmek yeterli
      // İlişkili FaqItem'lar, FaqDetail'lar, FaqStatsCard'lar ve FaqImage'lar otomatik silinir
      const deletedFaqSection = await prisma.faqSection.delete({
        where: { sectionName: targetSectionName },
      });
      return { success: true, data: deletedFaqSection };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
       if (isRecordNotFoundError(error)) {
         return { success: false, error: `Hata: '${targetSectionName}' adında silinecek kayıt bulunamadı.` };
      }
      return { success: false, error: errorMessage };
    }
  } 
  
  // DESTEKLENMEYEN METOTLAR
  else {
    return { error: `HTTP ${method} metodu desteklenmemektedir.` };
  }
});
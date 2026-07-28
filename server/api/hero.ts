import * as yup from 'yup';
import prisma from '~/lib/prisma';

// ---------------------------------
// TİP TANIMLARI
// ---------------------------------

/**
 * HeroPage modeline veri eklemek/güncellemek için kullanılan ana tip.
 */
interface HeroPageInput {
  sectionName?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButton?: string;
  primaryLink?: string;
  secondaryButton?: string;
  secondaryLink?: string;
  image?: string;
  backgroundImage?: string;
}

const heroPageSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  title: yup.string().trim().notRequired(),
  subtitle: yup.string().trim().notRequired(),
  description: yup.string().notRequired(),
  primaryButton: yup.string().trim().notRequired(),
  primaryLink: yup.string().trim().notRequired(),
  secondaryButton: yup.string().trim().notRequired(),
  secondaryLink: yup.string().trim().notRequired(),
  image: yup.string().trim().notRequired(),
  backgroundImage: yup.string().trim().notRequired(),
});

const heroPageDeleteSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
});

// ---------------------------------
// SUNUCU ROTASI (HANDLER)
// ---------------------------------

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const defaultSectionName = "heros"; // Varsayılan sectionName

  if (method !== 'GET') {
    requireAdmin(event);
  }

  // READ (GET)
  if (method === 'GET') {
    // sectionName'i "heros" olan ilk kaydı getir.
    try {
      const heroPageData = await prisma.heroPage.findFirst({
        where: { sectionName: defaultSectionName },
      });
      
      // TUTARLILIK İÇİN: GET isteğinde de { success, data } formatında dön
      return { 
        success: true, 
        data: heroPageData 
      };
    } catch (error) {
      console.error("GET hatası:", error);
      return { 
        success: false, 
        error: 'Veri getirilirken bir hata oluştu.',
        data: null 
      };
    }
  } 
  
  // CREATE (POST)
  else if (method === 'POST') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<HeroPageInput>(heroPageSchema, rawBody);
    if (!validation.success) return { ...validation, data: null };
    const body = validation.data;

    try {
      const newHeroPage = await prisma.heroPage.create({
        data: {
          sectionName: body.sectionName || defaultSectionName,
          title: body.title || "",
          subtitle: body.subtitle,
          description: body.description,
          primaryButton: body.primaryButton,
          primaryLink: body.primaryLink,
          secondaryButton: body.secondaryButton,
          secondaryLink: body.secondaryLink,
          image: body.image,
          backgroundImage: body.backgroundImage,
        },
      });
      return { 
        success: true, 
        data: newHeroPage 
      };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      if (isUniqueConstraintError(error)) {
         return { 
           success: false, 
           error: `Hata: '${defaultSectionName}' adında bir kayıt zaten mevcut. Güncelleme (PUT) metodunu kullanın.`,
           data: null 
         };
      }
      return { 
        success: false, 
        error: errorMessage,
        data: null 
      };
    }
  } 
  
  // UPDATE (PUT)
  else if (method === 'PUT') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<HeroPageInput>(heroPageSchema, rawBody);
    if (!validation.success) return { ...validation, data: null };
    const body = validation.data;
    const targetSectionName = body.sectionName || defaultSectionName;

    try {
      const updatedHeroPage = await prisma.heroPage.update({
        where: { sectionName: targetSectionName },
        data: {
          title: body.title,
          subtitle: body.subtitle,
          description: body.description,
          primaryButton: body.primaryButton,
          primaryLink: body.primaryLink,
          secondaryButton: body.secondaryButton,
          secondaryLink: body.secondaryLink,
          image: body.image,
          backgroundImage: body.backgroundImage,
        },
      });
      return { 
        success: true, 
        data: updatedHeroPage 
      };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
       if (isRecordNotFoundError(error)) {
         return { 
           success: false, 
           error: `Hata: '${targetSectionName}' adında bir kayıt bulunamadı. Önce POST ile oluşturmayı deneyin.`,
           data: null 
         };
      }
      return { 
        success: false, 
        error: errorMessage,
        data: null 
      };
    }
  } 
  
  // DELETE (DELETE)
  else if (method === 'DELETE') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<{ sectionName?: string }>(heroPageDeleteSchema, rawBody);
    if (!validation.success) return { ...validation, data: null };
    const body = validation.data;
    const targetSectionName = body.sectionName || defaultSectionName;

    try {
      const deletedHeroPage = await prisma.heroPage.delete({
        where: { sectionName: targetSectionName },
      });
      return { 
        success: true, 
        data: deletedHeroPage 
      };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
       if (isRecordNotFoundError(error)) {
         return { 
           success: false, 
           error: `Hata: '${targetSectionName}' adında silinecek kayıt bulunamadı.`,
           data: null 
         };
      }
      return { 
        success: false, 
        error: errorMessage,
        data: null 
      };
    }
  } 
  
  // DESTEKLENMEYEN METOTLAR
  else {
    return { 
      success: false,
      error: `HTTP ${method} metodu desteklenmemektedir.`,
      data: null 
    };
  }
});
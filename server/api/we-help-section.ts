import * as yup from 'yup';
import prisma from '~/lib/prisma';

// ---------------------------------
// TİP TANIMLARI
// ---------------------------------

/**
 * WeHelpFeature modeline veri eklemek/güncellemek için kullanılan tip.
 */
interface WeHelpFeatureInput {
  text?: string;
  order?: number;
}

/**
 * WeHelpImage modeline veri eklemek/güncellemek için kullanılan tip.
 */
interface WeHelpImageInput {
  imagePath?: string;
  altText?: string;
  position?: string;
  order?: number;
}

/**
 * WeHelpSection modeline veri eklemek/güncellemek için kullanılan ana tip.
 */
interface WeHelpSectionInput {
  sectionName?: string;
  mainTitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  features?: WeHelpFeatureInput[];
  images?: WeHelpImageInput[];
}

const weHelpFeatureSchema = yup.object({
  text: yup.string().trim().notRequired(),
  order: yup.number().notRequired(),
});

const weHelpImageSchema = yup.object({
  imagePath: yup.string().trim().notRequired(),
  altText: yup.string().trim().notRequired(),
  position: yup.string().trim().notRequired(),
  order: yup.number().notRequired(),
});

const weHelpSectionSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  mainTitle: yup.string().trim().notRequired(),
  description: yup.string().notRequired(),
  buttonText: yup.string().trim().notRequired(),
  buttonLink: yup.string().trim().notRequired(),
  features: yup.array().of(weHelpFeatureSchema).notRequired(),
  images: yup.array().of(weHelpImageSchema).notRequired(),
});

const weHelpSectionDeleteSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
});

// ---------------------------------
// SUNUCU ROTASI (HANDLER)
// ---------------------------------

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const defaultSectionName = "we-help-section"; // Varsayılan sectionName

  if (method !== 'GET') {
    requireAdmin(event);
  }

  // READ (GET)
  if (method === 'GET') {
    // sectionName'i "we-help-section" olan ilk kaydı, ilişkili tüm özellikleri ve görselleri ile getir.
    try {
      const weHelpSectionData = await prisma.weHelpSection.findFirst({
        where: { sectionName: defaultSectionName },
        include: {
          features: {
            orderBy: {
              order: 'asc', // Özellikleri 'order' alanına göre sırala
            },
          },
          images: {
            orderBy: {
              order: 'asc', // Görselleri 'order' alanına göre sırala
            },
          },
        },
      });
      return weHelpSectionData;
    } catch (error) {
      console.error("GET hatası:", error);
      return { success: false, error: 'Veri getirilirken bir hata oluştu.' };
    }
  } 
  
  // CREATE (POST)
  else if (method === 'POST') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<WeHelpSectionInput>(weHelpSectionSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;

    // Features verilerini hazırlıyoruz
    const featuresData = Array.isArray(body.features)
      ? body.features.map(feature => ({
        text: feature.text || "",
        order: feature.order,
      }))
      : [];

    // Images verilerini hazırlıyoruz
    const imagesData = Array.isArray(body.images)
      ? body.images.map(image => ({
        imagePath: image.imagePath || "",
        altText: image.altText || "",
        position: image.position || "",
        order: image.order,
      }))
      : [];

    try {
      const newWeHelpSection = await prisma.weHelpSection.create({
        data: {
          sectionName: body.sectionName || defaultSectionName,
          mainTitle: body.mainTitle || "",
          description: body.description,
          buttonText: body.buttonText,
          buttonLink: body.buttonLink,
          features: { create: featuresData },
          images: { create: imagesData },
        },
        include: {
          features: true,
          images: true,
        },
      });
      return { success: true, data: newWeHelpSection };
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
    const validation = await validateOrError<WeHelpSectionInput>(weHelpSectionSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;
    const targetSectionName = body.sectionName || defaultSectionName;

    // Features verilerini hazırlıyoruz
    const featuresData = Array.isArray(body.features)
      ? body.features.map(feature => ({
        text: feature.text || "",
        order: feature.order,
      }))
      : [];

    // Images verilerini hazırlıyoruz
    const imagesData = Array.isArray(body.images)
      ? body.images.map(image => ({
        imagePath: image.imagePath || "",
        altText: image.altText || "",
        position: image.position || "",
        order: image.order,
      }))
      : [];

    try {
      const updatedWeHelpSection = await prisma.weHelpSection.update({
        where: { sectionName: targetSectionName },
        data: {
          mainTitle: body.mainTitle,
          description: body.description,
          buttonText: body.buttonText,
          buttonLink: body.buttonLink,
          // İlişkili verileri güncelleme: Önce eskileri sil, sonra yenilerini oluştur
          features: {
            deleteMany: {}, // Mevcut tüm ilişkili özellikleri sil
            create: featuresData, // Yeni özellikleri oluştur
          },
          images: {
            deleteMany: {}, // Mevcut tüm ilişkili görselleri sil
            create: imagesData, // Yeni görselleri oluştur
          },
        },
        include: {
          features: true,
          images: true,
        },
      });
      return { success: true, data: updatedWeHelpSection };
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
    const validation = await validateOrError<{ sectionName?: string }>(weHelpSectionDeleteSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;
    const targetSectionName = body.sectionName || defaultSectionName;

    try {
      // Önce ilişkili verileri (Features ve Images) silmek gerekir (CASCADE yoksa)
      await prisma.weHelpFeature.deleteMany({
        where: {
          weHelpSection: {
            sectionName: targetSectionName,
          },
        },
      });

      await prisma.weHelpImage.deleteMany({
        where: {
          weHelpSection: {
            sectionName: targetSectionName,
          },
        },
      });

      // Ana kaydı sil
      const deletedWeHelpSection = await prisma.weHelpSection.delete({
        where: { sectionName: targetSectionName },
      });
      return { success: true, data: deletedWeHelpSection };
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
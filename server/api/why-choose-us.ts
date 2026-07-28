import * as yup from 'yup';
import prisma from '~/lib/prisma';

// ---------------------------------
// TİP TANIMLARI
// ---------------------------------

/**
 * WhyChooseUsFeature modeline veri eklemek/güncellemek için kullanılan tip.
 */
interface WhyChooseUsFeatureInput {
  iconPath?: string;
  title?: string;
  description?: string;
  order?: number;
}

/**
 * WhyChooseUs modeline veri eklemek/güncellemek için kullanılan ana tip.
 */
interface WhyChooseUsInput {
  sectionName?: string;
  mainTitle?: string;
  shortDescription?: string;
  closingStatement?: string;
  mainImage?: string;
  features?: WhyChooseUsFeatureInput[];
}

const whyChooseUsFeatureSchema = yup.object({
  iconPath: yup.string().trim().notRequired(),
  title: yup.string().trim().notRequired(),
  description: yup.string().trim().notRequired(),
  order: yup.number().notRequired(),
});

const whyChooseUsSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  mainTitle: yup.string().trim().notRequired(),
  shortDescription: yup.string().trim().notRequired(),
  closingStatement: yup.string().trim().notRequired(),
  mainImage: yup.string().trim().notRequired(),
  features: yup.array().of(whyChooseUsFeatureSchema).notRequired(),
});

const whyChooseUsDeleteSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
});

// ---------------------------------
// SUNUCU ROTASI (HANDLER)
// ---------------------------------

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const defaultSectionName = "why-choose-us"; // Varsayılan sectionName

  if (method !== 'GET') {
    requireAdmin(event);
  }

  // READ (GET)
  if (method === 'GET') {
    // sectionName'i "why-choose-us" olan ilk kaydı, ilişkili tüm özellikleri ile getir.
    try {
      const whyChooseUsData = await prisma.whyChooseUs.findFirst({
        where: { sectionName: defaultSectionName },
        include: {
          features: {
            orderBy: {
              order: 'asc', // Özellikleri 'order' alanına göre sırala
            },
          },
        },
      });
      return whyChooseUsData;
    } catch (error) {
      // Kayıt bulunamazsa null dönecektir, bu hata durumu değildir.
      // Diğer veritabanı hatalarını yakalarız.
      console.error("GET hatası:", error);
      return { success: false, error: 'Veri getirilirken bir hata oluştu.' };
    }
  } 
  
  // CREATE (POST)
  else if (method === 'POST') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<WhyChooseUsInput>(whyChooseUsSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;

    // Features verilerini hazırlıyoruz
    const featuresData = Array.isArray(body.features)
      ? body.features.map(feature => ({
        iconPath: feature.iconPath,
        title: feature.title || "", // Title zorunlu alan olduğu için boş bırakmıyoruz
        description: feature.description,
        order: feature.order,
      }))
      : [];

    try {
      const newWhyChooseUs = await prisma.whyChooseUs.create({
        data: {
          sectionName: body.sectionName || defaultSectionName,
          mainTitle: body.mainTitle || "", // Zorunlu alan olduğu için boş string atadık
          shortDescription: body.shortDescription,
          closingStatement: body.closingStatement,
          mainImage: body.mainImage,
          features: { create: featuresData },
        },
        include: {
          features: true,
        },
      });
      return { success: true, data: newWhyChooseUs };
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
    const validation = await validateOrError<WhyChooseUsInput>(whyChooseUsSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;
    const targetSectionName = body.sectionName || defaultSectionName;

    // Features verilerini hazırlıyoruz
    const featuresData = Array.isArray(body.features)
      ? body.features.map(feature => ({
        iconPath: feature.iconPath,
        title: feature.title || "",
        description: feature.description,
        order: feature.order,
      }))
      : [];

    try {
      const updatedWhyChooseUs = await prisma.whyChooseUs.update({
        where: { sectionName: targetSectionName },
        data: {
          mainTitle: body.mainTitle,
          shortDescription: body.shortDescription,
          closingStatement: body.closingStatement,
          mainImage: body.mainImage,
          // İlişkili verileri güncelleme: Önce eskileri sil, sonra yenilerini oluştur
          features: {
            deleteMany: {}, // Mevcut tüm ilişkili özellikleri sil
            create: featuresData, // Yeni özellikleri oluştur
          },
        },
        include: {
          features: true,
        },
      });
      return { success: true, data: updatedWhyChooseUs };
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
    const validation = await validateOrError<{ sectionName?: string }>(whyChooseUsDeleteSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;
    const targetSectionName = body.sectionName || defaultSectionName;

    try {
      // Önce ilişkili verileri (Features) silmek gerekir (CASCADE yoksa)
      await prisma.whyChooseUsFeature.deleteMany({
        where: {
          whyChooseUs: {
            sectionName: targetSectionName,
          },
        },
      });

      // Ana kaydı sil
      const deletedWhyChooseUs = await prisma.whyChooseUs.delete({
        where: { sectionName: targetSectionName },
      });
      return { success: true, data: deletedWhyChooseUs };
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
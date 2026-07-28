import * as yup from 'yup';
import prisma from '~/lib/prisma';

// ---------------------------------
// TİP TANIMLARI
// ---------------------------------

/**
 * Service modeline veri eklemek/güncellemek için kullanılan tip.
 */
interface ServiceInput {
  imagePath?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  order?: number;
}

/**
 * Statistic modeline veri eklemek/güncellemek için kullanılan tip.
 */
interface StatisticInput {
  iconPath?: string;
  value?: string;
  label1?: string;
  label2?: string;
  order?: number;
}

/**
 * Services modeline veri eklemek/güncellemek için kullanılan ana tip.
 */
interface ServicesInput {
  sectionName?: string;
  mainTitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  services?: ServiceInput[];
  statistics?: StatisticInput[];
}

const serviceItemSchema = yup.object({
  imagePath: yup.string().trim().notRequired(),
  title: yup.string().trim().notRequired(),
  subtitle: yup.string().trim().notRequired(),
  description: yup.string().trim().notRequired(),
  order: yup.number().notRequired(),
});

const statisticSchema = yup.object({
  iconPath: yup.string().trim().notRequired(),
  value: yup.string().trim().notRequired(),
  label1: yup.string().trim().notRequired(),
  label2: yup.string().trim().notRequired(),
  order: yup.number().notRequired(),
});

const servicesSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  mainTitle: yup.string().trim().notRequired(),
  description: yup.string().notRequired(),
  buttonText: yup.string().trim().notRequired(),
  buttonLink: yup.string().trim().notRequired(),
  services: yup.array().of(serviceItemSchema).notRequired(),
  statistics: yup.array().of(statisticSchema).notRequired(),
});

const servicesDeleteSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
});

// ---------------------------------
// SUNUCU ROTASI (HANDLER)
// ---------------------------------

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const defaultSectionName = "services"; // Varsayılan sectionName

  if (method !== 'GET') {
    requireAdmin(event);
  }

  // READ (GET)
  if (method === 'GET') {
    // sectionName'i "services" olan ilk kaydı, ilişkili tüm servis ve istatistikleri ile getir.
    try {
      const servicesData = await prisma.services.findFirst({
        where: { sectionName: defaultSectionName },
        include: {
          services: {
            orderBy: {
              order: 'asc', // Servisleri 'order' alanına göre sırala
            },
          },
          statistics: {
            orderBy: {
              order: 'asc', // İstatistikleri 'order' alanına göre sırala
            },
          },
        },
      });
      return servicesData;
    } catch (error) {
      console.error("GET hatası:", error);
      return { success: false, error: 'Veri getirilirken bir hata oluştu.' };
    }
  } 
  
  // CREATE (POST)
  else if (method === 'POST') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<ServicesInput>(servicesSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;

    // Services verilerini hazırlıyoruz
    const servicesData = Array.isArray(body.services)
      ? body.services.map(service => ({
        imagePath: service.imagePath || "",
        title: service.title || "",
        subtitle: service.subtitle,
        description: service.description,
        order: service.order || 0,
      }))
      : [];

    // Statistics verilerini hazırlıyoruz
    const statisticsData = Array.isArray(body.statistics)
      ? body.statistics.map(statistic => ({
        iconPath: statistic.iconPath,
        value: statistic.value || "",
        label1: statistic.label1 || "",
        label2: statistic.label2 || "",
        order: statistic.order || 0,
      }))
      : [];

    try {
      const newServices = await prisma.services.create({
        data: {
          sectionName: body.sectionName || defaultSectionName,
          mainTitle: body.mainTitle || "",
          description: body.description,
          buttonText: body.buttonText,
          buttonLink: body.buttonLink,
          services: { create: servicesData },
          statistics: { create: statisticsData },
        },
        include: {
          services: true,
          statistics: true,
        },
      });
      return { success: true, data: newServices };
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
    const validation = await validateOrError<ServicesInput>(servicesSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;
    const targetSectionName = body.sectionName || defaultSectionName;

    // Services verilerini hazırlıyoruz
    const servicesData = Array.isArray(body.services)
      ? body.services.map(service => ({
        imagePath: service.imagePath || "",
        title: service.title || "",
        subtitle: service.subtitle,
        description: service.description,
        order: service.order || 0,
      }))
      : [];

    // Statistics verilerini hazırlıyoruz
    const statisticsData = Array.isArray(body.statistics)
      ? body.statistics.map(statistic => ({
        iconPath: statistic.iconPath,
        value: statistic.value || "",
        label1: statistic.label1 || "",
        label2: statistic.label2 || "",
        order: statistic.order || 0,
      }))
      : [];

    try {
      const updatedServices = await prisma.services.update({
        where: { sectionName: targetSectionName },
        data: {
          mainTitle: body.mainTitle,
          description: body.description,
          buttonText: body.buttonText,
          buttonLink: body.buttonLink,
          // İlişkili verileri güncelleme: Önce eskileri sil, sonra yenilerini oluştur
          services: {
            deleteMany: {}, // Mevcut tüm ilişkili servisleri sil
            create: servicesData, // Yeni servisleri oluştur
          },
          statistics: {
            deleteMany: {}, // Mevcut tüm ilişkili istatistikleri sil
            create: statisticsData, // Yeni istatistikleri oluştur
          },
        },
        include: {
          services: true,
          statistics: true,
        },
      });
      return { success: true, data: updatedServices };
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
    const validation = await validateOrError<{ sectionName?: string }>(servicesDeleteSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;
    const targetSectionName = body.sectionName || defaultSectionName;

    try {
      // Önce ilişkili verileri (Services ve Statistics) silmek gerekir
      await prisma.service.deleteMany({
        where: {
          services: {
            sectionName: targetSectionName,
          },
        },
      });

      await prisma.statistic.deleteMany({
        where: {
          services: {
            sectionName: targetSectionName,
          },
        },
      });

      // Ana kaydı sil
      const deletedServices = await prisma.services.delete({
        where: { sectionName: targetSectionName },
      });
      return { success: true, data: deletedServices };
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
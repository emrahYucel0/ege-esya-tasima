import * as yup from 'yup';
import prisma from '~/lib/prisma';

// ---------------------------------
// TİP TANIMLARI
// ---------------------------------

/**
 * AboutService modeline veri eklemek/güncellemek için kullanılan tip.
 */
interface AboutServiceInput {
  iconPath?: string;
  iconAlt?: string;
  title?: string;
  description?: string;
  order?: number;
}

/**
 * AboutStat modeline veri eklemek/güncellemek için kullanılan tip.
 */
interface AboutStatInput {
  value?: string;
  label?: string;
  order?: number;
}

/**
 * AboutSection modeline veri eklemek/güncellemek için kullanılan ana tip.
 */
interface AboutSectionInput {
  sectionName?: string;
  mainTitle?: string;
  description1?: string;
  description2?: string;
  description3?: string;
  teamImage?: string;
  teamImageAlt?: string;
  historyTitle?: string;
  historyText1?: string;
  historyText2?: string;
  historyText3?: string;
  seoTitle?: string;
  seoDescription?: string;
  services?: AboutServiceInput[];
  stats?: AboutStatInput[];
}

const aboutServiceSchema = yup.object({
  iconPath: yup.string().trim().notRequired(),
  iconAlt: yup.string().trim().notRequired(),
  title: yup.string().trim().notRequired(),
  description: yup.string().trim().notRequired(),
  order: yup.number().notRequired(),
});

const aboutStatSchema = yup.object({
  value: yup.string().trim().notRequired(),
  label: yup.string().trim().notRequired(),
  order: yup.number().notRequired(),
});

const aboutSectionSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  mainTitle: yup.string().trim().notRequired(),
  description1: yup.string().trim().notRequired(),
  description2: yup.string().trim().notRequired(),
  description3: yup.string().trim().notRequired(),
  teamImage: yup.string().trim().notRequired(),
  teamImageAlt: yup.string().trim().notRequired(),
  historyTitle: yup.string().trim().notRequired(),
  historyText1: yup.string().trim().notRequired(),
  historyText2: yup.string().trim().notRequired(),
  historyText3: yup.string().trim().notRequired(),
  seoTitle: yup.string().trim().notRequired(),
  seoDescription: yup.string().trim().notRequired(),
  services: yup.array().of(aboutServiceSchema).notRequired(),
  stats: yup.array().of(aboutStatSchema).notRequired(),
});

const aboutSectionDeleteSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
});

// ---------------------------------
// SUNUCU ROTASI (HANDLER)
// ---------------------------------

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const defaultSectionName = "about-section";

  if (method !== 'GET') {
    requireAdmin(event);
  }

  // READ (GET)
  if (method === 'GET') {
    try {
      const aboutSectionData = await prisma.aboutSection.findFirst({
        where: { sectionName: defaultSectionName },
        include: {
          services: {
            orderBy: {
              order: 'asc',
            },
          },
          stats: {
            orderBy: {
              order: 'asc',
            },
          },
        },
      });
      return aboutSectionData || {
        sectionName: defaultSectionName,
        mainTitle: "",
        description1: "",
        description2: "",
        description3: "",
        teamImage: "",
        teamImageAlt: "",
        historyTitle: "",
        historyText1: "",
        historyText2: "",
        historyText3: "",
        seoTitle: "",
        seoDescription: "",
        services: [],
        stats: []
      };
    } catch (error) {
      console.error("GET hatası:", error);
      return { success: false, error: 'Veri getirilirken bir hata oluştu.' };
    }
  } 
  
  // CREATE (POST)
  else if (method === 'POST') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<AboutSectionInput>(aboutSectionSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;

    // Services verilerini hazırlıyoruz
    const servicesData = Array.isArray(body.services)
      ? body.services.map(service => ({
        iconPath: service.iconPath || "",
        iconAlt: service.iconAlt || "",
        title: service.title || "",
        description: service.description || "",
        order: service.order || 0,
      }))
      : [];

    // Stats verilerini hazırlıyoruz
    const statsData = Array.isArray(body.stats)
      ? body.stats.map(stat => ({
        value: stat.value || "",
        label: stat.label || "",
        order: stat.order || 0,
      }))
      : [];

    try {
      const newAboutSection = await prisma.aboutSection.create({
        data: {
          sectionName: body.sectionName || defaultSectionName,
          mainTitle: body.mainTitle || "",
          description1: body.description1 || "",
          description2: body.description2 || "",
          description3: body.description3 || "",
          teamImage: body.teamImage || "",
          teamImageAlt: body.teamImageAlt || "",
          historyTitle: body.historyTitle || "",
          historyText1: body.historyText1 || "",
          historyText2: body.historyText2 || "",
          historyText3: body.historyText3 || "",
          seoTitle: body.seoTitle || "",
          seoDescription: body.seoDescription || "",
          services: { create: servicesData },
          stats: { create: statsData },
        },
        include: {
          services: true,
          stats: true,
        },
      });
      return { success: true, data: newAboutSection };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      if (isUniqueConstraintError(error)) {
         return { 
           success: false, 
           error: `Hata: '${defaultSectionName}' adında bir kayıt zaten mevcut. Güncelleme (PUT) metodunu kullanın.` 
         };
      }
      return { success: false, error: errorMessage };
    }
  } 
  
  // UPDATE (PUT)
  else if (method === 'PUT') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<AboutSectionInput>(aboutSectionSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;
    const targetSectionName = body.sectionName || defaultSectionName;

    // Services verilerini hazırlıyoruz
    const servicesData = Array.isArray(body.services)
      ? body.services.map(service => ({
        iconPath: service.iconPath || "",
        iconAlt: service.iconAlt || "",
        title: service.title || "",
        description: service.description || "",
        order: service.order || 0,
      }))
      : [];

    // Stats verilerini hazırlıyoruz
    const statsData = Array.isArray(body.stats)
      ? body.stats.map(stat => ({
        value: stat.value || "",
        label: stat.label || "",
        order: stat.order || 0,
      }))
      : [];

    try {
      // İlk olarak ilişkili verileri sil
      await prisma.$transaction([
        prisma.aboutService.deleteMany({
          where: {
            aboutSection: {
              sectionName: targetSectionName,
            },
          },
        }),
        prisma.aboutStat.deleteMany({
          where: {
            aboutSection: {
              sectionName: targetSectionName,
            },
          },
        }),
      ]);

      // Ana kaydı güncelle ve yeni ilişkili verileri oluştur
      const updatedAboutSection = await prisma.aboutSection.update({
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
        include: {
          services: true,
          stats: true,
        },
      });
      
      return { success: true, data: updatedAboutSection };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      if (isRecordNotFoundError(error)) {
        // Kayıt yoksa oluştur
        try {
          const newAboutSection = await prisma.aboutSection.create({
            data: {
              sectionName: targetSectionName,
              mainTitle: body.mainTitle || "",
              description1: body.description1 || "",
              description2: body.description2 || "",
              description3: body.description3 || "",
              teamImage: body.teamImage || "",
              teamImageAlt: body.teamImageAlt || "",
              historyTitle: body.historyTitle || "",
              historyText1: body.historyText1 || "",
              historyText2: body.historyText2 || "",
              historyText3: body.historyText3 || "",
              seoTitle: body.seoTitle || "",
              seoDescription: body.seoDescription || "",
              services: { create: servicesData },
              stats: { create: statsData },
            },
            include: {
              services: true,
              stats: true,
            },
          });
          return { 
            success: true, 
            message: 'Kayıt bulunamadı, yeni kayıt oluşturuldu.',
            data: newAboutSection 
          };
        } catch (createError) {
          return { 
            success: false, 
            error: 'Kayıt oluşturulurken hata oluştu.' 
          };
        }
      }
      return { success: false, error: errorMessage };
    }
  } 
  
  // PATCH - Kısmi Güncelleme
  else if (method === 'PATCH') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<Partial<AboutSectionInput>>(aboutSectionSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;
    const targetSectionName = body.sectionName || defaultSectionName;

    // Sadece sağlanan alanları güncellemek için bir data objesi oluştur
    const updateData: any = {};
    
    // Ana alanları güncelle
    if (body.mainTitle !== undefined) updateData.mainTitle = body.mainTitle;
    if (body.description1 !== undefined) updateData.description1 = body.description1;
    if (body.description2 !== undefined) updateData.description2 = body.description2;
    if (body.description3 !== undefined) updateData.description3 = body.description3;
    if (body.teamImage !== undefined) updateData.teamImage = body.teamImage;
    if (body.teamImageAlt !== undefined) updateData.teamImageAlt = body.teamImageAlt;
    if (body.historyTitle !== undefined) updateData.historyTitle = body.historyTitle;
    if (body.historyText1 !== undefined) updateData.historyText1 = body.historyText1;
    if (body.historyText2 !== undefined) updateData.historyText2 = body.historyText2;
    if (body.historyText3 !== undefined) updateData.historyText3 = body.historyText3;
    if (body.seoTitle !== undefined) updateData.seoTitle = body.seoTitle;
    if (body.seoDescription !== undefined) updateData.seoDescription = body.seoDescription;

    try {
      const updatedAboutSection = await prisma.aboutSection.update({
        where: { sectionName: targetSectionName },
        data: updateData,
        include: {
          services: true,
          stats: true,
        },
      });
      
      return { success: true, data: updatedAboutSection };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      if (isRecordNotFoundError(error)) {
        return { 
          success: false, 
          error: `Hata: '${targetSectionName}' adında bir kayıt bulunamadı.` 
        };
      }
      return { success: false, error: errorMessage };
    }
  }
  
  // DELETE (DELETE)
  else if (method === 'DELETE') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<{ sectionName?: string }>(aboutSectionDeleteSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;
    const targetSectionName = body.sectionName || defaultSectionName;

    try {
      // Transaction kullanarak tüm ilişkili verileri silelim
      const result = await prisma.$transaction(async (prisma) => {
        // Önce ilişkili verileri sil
        await prisma.aboutService.deleteMany({
          where: {
            aboutSection: {
              sectionName: targetSectionName,
            },
          },
        });

        await prisma.aboutStat.deleteMany({
          where: {
            aboutSection: {
              sectionName: targetSectionName,
            },
          },
        });

        // Ana kaydı sil
        const deletedAboutSection = await prisma.aboutSection.delete({
          where: { sectionName: targetSectionName },
        });
        
        return deletedAboutSection;
      });

      return { success: true, data: result };
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      if (isRecordNotFoundError(error)) {
        return { 
          success: false, 
          error: `Hata: '${targetSectionName}' adında silinecek kayıt bulunamadı.` 
        };
      }
      return { success: false, error: errorMessage };
    }
  } 
  
  // DESTEKLENMEYEN METOTLAR
  else {
    return { 
      success: false, 
      error: `HTTP ${method} metodu desteklenmemektedir. Desteklenen metodlar: GET, POST, PUT, PATCH, DELETE` 
    };
  }
});
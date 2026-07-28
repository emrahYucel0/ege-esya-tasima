import * as yup from 'yup';
import prisma from '~/lib/prisma';

// ---------------------------------
// TİP TANIMLARI
// ---------------------------------

/**
 * PricingFeature modeline veri eklemek/güncellemek için kullanılan tip.
 */
interface PricingFeatureInput {
  text?: string;
  isIncluded?: boolean;
  order?: number;
}

/**
 * PricingPlan modeline veri eklemek/güncellemek için kullanılan tip.
 */
interface PricingPlanInput {
  name?: string;
  subtitle?: string;
  price?: string;
  priceSuffix?: string;
  isPopular?: boolean;
  isFeatured?: boolean;
  buttonText?: string;
  buttonLink?: string;
  buttonAriaLabel?: string;
  order?: number;
  features?: PricingFeatureInput[];
}

/**
 * PricingSection modeline veri eklemek/güncellemek için kullanılan ana tip.
 */
interface PricingSectionInput {
  sectionName?: string;
  mainTitle?: string;
  description?: string;
  pricingPlans?: PricingPlanInput[];
}

const pricingFeatureSchema = yup.object({
  text: yup.string().trim().notRequired(),
  isIncluded: yup.boolean().notRequired(),
  order: yup.number().notRequired(),
});

const pricingPlanSchema = yup.object({
  name: yup.string().trim().notRequired(),
  subtitle: yup.string().trim().notRequired(),
  price: yup.string().trim().notRequired(),
  priceSuffix: yup.string().trim().notRequired(),
  isPopular: yup.boolean().notRequired(),
  isFeatured: yup.boolean().notRequired(),
  buttonText: yup.string().trim().notRequired(),
  buttonLink: yup.string().trim().notRequired(),
  buttonAriaLabel: yup.string().trim().notRequired(),
  order: yup.number().notRequired(),
  features: yup.array().of(pricingFeatureSchema).notRequired(),
});

const pricingSectionSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  mainTitle: yup.string().trim().notRequired(),
  description: yup.string().notRequired(),
  pricingPlans: yup.array().of(pricingPlanSchema).notRequired(),
});

const pricingSectionDeleteSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
});

// ---------------------------------
// SUNUCU ROTASI (HANDLER)
// ---------------------------------

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  const defaultSectionName = "pricing-section"; // Varsayılan sectionName

  if (method !== 'GET') {
    requireAdmin(event);
  }

  // READ (GET)
  if (method === 'GET') {
    // sectionName'i "pricing-section" olan ilk kaydı, ilişkili tüm planları ve özellikleri ile getir.
    try {
      const pricingSectionData = await prisma.pricingSection.findFirst({
        where: { sectionName: defaultSectionName },
        include: {
          pricingPlans: {
            orderBy: {
              order: 'asc', // Planları 'order' alanına göre sırala
            },
            include: {
              features: {
                orderBy: {
                  order: 'asc', // Özellikleri 'order' alanına göre sırala
                },
              },
            },
          },
        },
      });
      return pricingSectionData;
    } catch (error) {
      console.error("GET hatası:", error);
      return { success: false, error: 'Veri getirilirken bir hata oluştu.' };
    }
  } 
  
  // CREATE (POST)
  else if (method === 'POST') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<PricingSectionInput>(pricingSectionSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;

    // PricingPlans verilerini hazırlıyoruz
    const pricingPlansData = Array.isArray(body.pricingPlans)
      ? body.pricingPlans.map(plan => ({
          name: plan.name || "",
          subtitle: plan.subtitle,
          price: plan.price || "",
          priceSuffix: plan.priceSuffix,
          isPopular: plan.isPopular || false,
          isFeatured: plan.isFeatured || false,
          buttonText: plan.buttonText || "",
          buttonLink: plan.buttonLink || "",
          buttonAriaLabel: plan.buttonAriaLabel,
          order: plan.order || 0,
          features: {
            create: Array.isArray(plan.features) 
              ? plan.features.map(feature => ({
                  text: feature.text || "",
                  isIncluded: feature.isIncluded !== undefined ? feature.isIncluded : true,
                  order: feature.order || 0,
                }))
              : [],
          },
        }))
      : [];

    try {
      const newPricingSection = await prisma.pricingSection.create({
        data: {
          sectionName: body.sectionName || defaultSectionName,
          mainTitle: body.mainTitle || "",
          description: body.description,
          pricingPlans: { 
            create: pricingPlansData 
          },
        },
        include: {
          pricingPlans: {
            include: {
              features: true,
            },
          },
        },
      });
      return { success: true, data: newPricingSection };
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
    const validation = await validateOrError<PricingSectionInput>(pricingSectionSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;
    const targetSectionName = body.sectionName || defaultSectionName;

    // PricingPlans verilerini hazırlıyoruz
    const pricingPlansData = Array.isArray(body.pricingPlans)
      ? body.pricingPlans.map(plan => ({
          name: plan.name || "",
          subtitle: plan.subtitle,
          price: plan.price || "",
          priceSuffix: plan.priceSuffix,
          isPopular: plan.isPopular || false,
          isFeatured: plan.isFeatured || false,
          buttonText: plan.buttonText || "",
          buttonLink: plan.buttonLink || "",
          buttonAriaLabel: plan.buttonAriaLabel,
          order: plan.order || 0,
          features: {
            create: Array.isArray(plan.features) 
              ? plan.features.map(feature => ({
                  text: feature.text || "",
                  isIncluded: feature.isIncluded !== undefined ? feature.isIncluded : true,
                  order: feature.order || 0,
                }))
              : [],
          },
        }))
      : [];

    try {
      // Önce ilişkili verileri (PricingPlans ve Features) sil
      await prisma.pricingFeature.deleteMany({
        where: {
          pricingPlan: {
            pricingSection: {
              sectionName: targetSectionName,
            },
          },
        },
      });

      await prisma.pricingPlan.deleteMany({
        where: {
          pricingSection: {
            sectionName: targetSectionName,
          },
        },
      });

      // Ana kaydı güncelle ve yeni planları oluştur
      const updatedPricingSection = await prisma.pricingSection.update({
        where: { sectionName: targetSectionName },
        data: {
          mainTitle: body.mainTitle,
          description: body.description,
          pricingPlans: {
            create: pricingPlansData,
          },
        },
        include: {
          pricingPlans: {
            include: {
              features: true,
            },
          },
        },
      });
      return { success: true, data: updatedPricingSection };
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
    const validation = await validateOrError<{ sectionName?: string }>(pricingSectionDeleteSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;
    const targetSectionName = body.sectionName || defaultSectionName;

    try {
      // Önce ilişkili verileri (Features ve PricingPlans) silmek gerekir
      await prisma.pricingFeature.deleteMany({
        where: {
          pricingPlan: {
            pricingSection: {
              sectionName: targetSectionName,
            },
          },
        },
      });

      await prisma.pricingPlan.deleteMany({
        where: {
          pricingSection: {
            sectionName: targetSectionName,
          },
        },
      });

      // Ana kaydı sil
      const deletedPricingSection = await prisma.pricingSection.delete({
        where: { sectionName: targetSectionName },
      });
      return { success: true, data: deletedPricingSection };
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
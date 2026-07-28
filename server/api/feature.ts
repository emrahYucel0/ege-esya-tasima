import * as yup from 'yup';
import prisma from '~/lib/prisma';

interface FeatureTypeInput {
  title: string;
  description: string;
}

interface FeatureInput {
  sectionName?: string;
  subtitle: string;
  title: string;
  image: string;
  featureTypes?: FeatureTypeInput[];
}

const featureTypeSchema = yup.object({
  title: yup.string().trim().required(),
  description: yup.string().trim().required(),
});

const featureSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
  subtitle: yup.string().trim().required(),
  title: yup.string().trim().required(),
  image: yup.string().trim().required(),
  featureTypes: yup.array().of(featureTypeSchema).notRequired(),
});

const featureDeleteSchema = yup.object({
  sectionName: yup.string().trim().notRequired(),
});

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method !== 'GET') {
    requireAdmin(event);
  }

  if (method === 'GET') {
    // "features" sectionName'ine sahip ilk Feature kaydını ilişkili featureTypes verisiyle birlikte getirir.
    const featureData = await prisma.feature.findFirst({
      where: { sectionName: "features" },
      include: { featureTypes: true },
    });
    return featureData;
  } else if (method === 'POST') {
    // Yeni bir Feature kaydı oluşturur.
    const rawBody = await readBody(event);
    const validation = await validateOrError<FeatureInput>(featureSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;

    const featureTypesData = Array.isArray(body.featureTypes)
      ? body.featureTypes.map((type) => ({ title: type.title, description: type.description }))
      : [];

    const newFeature = await prisma.feature.create({
      data: {
        sectionName: body.sectionName || "features",
        subtitle: body.subtitle,
        title: body.title,
        image: body.image,
        featureTypes: { create: featureTypesData },
      },
      include: { featureTypes: true },
    });
    return newFeature;
  } else if (method === 'PUT') {
    // Belirtilen sectionName'e sahip Feature kaydını günceller.
    const rawBody = await readBody(event);
    const validation = await validateOrError<FeatureInput>(featureSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;

    try {
      const updatedFeature = await prisma.feature.update({
        where: { sectionName: body.sectionName || "features" },
        data: {
          subtitle: body.subtitle,
          title: body.title,
          image: body.image,
          // featureTypes güncellemesi: önce eskileri sil, sonra yenilerini ekle
          featureTypes: {
            deleteMany: {},
            create: Array.isArray(body.featureTypes)
              ? body.featureTypes.map((type) => ({ title: type.title, description: type.description }))
              : [],
          },
        },
        include: { featureTypes: true },
      });
      return { success: true, data: updatedFeature };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { success: false, error: errorMessage };
    }
  } else if (method === 'DELETE') {
    // Belirtilen sectionName'e sahip Feature kaydını siler.
    const rawBody = await readBody(event);
    const validation = await validateOrError<{ sectionName?: string }>(featureDeleteSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;

    const deletedFeature = await prisma.feature.delete({
      where: { sectionName: body.sectionName || "features" },
    });
    return deletedFeature;
  } else {
    return { error: `HTTP ${method} yöntemi desteklenmiyor.` };
  }
});

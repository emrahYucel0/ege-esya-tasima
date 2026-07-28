import * as yup from 'yup';
import prisma from '~/lib/prisma';

interface MetaInput {
  page: string;
  title: string;
  description?: string;
  sectionName?: string;
}

const metaSchema = yup.object({
  page: yup.string().trim().required(),
  title: yup.string().trim().required(),
  description: yup.string().trim().notRequired(),
  sectionName: yup.string().trim().notRequired(),
});

const metaDeleteSchema = yup.object({
  page: yup.string().trim().required(),
});

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method !== 'GET') {
    requireAdmin(event);
  }

  if (method === 'GET') {
    const { page } = getQuery(event);
    if (page) {
      const metaData = await prisma.meta.findUnique({
        where: { page: String(page) },
      });
      return metaData || { error: `Meta data for page '${page}' not found` };
    } else {
      const allMetaData = await prisma.meta.findMany({
        where: { sectionName: "metas" },
      });
      return allMetaData;
    }
  } 
  else if (method === 'POST') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<MetaInput>(metaSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;

    const newMeta = await prisma.meta.create({
      data: {
        sectionName: body.sectionName || "metas",
        page: body.page,
        title: body.title,
        description: body.description,
      },
    });
    return newMeta;
  } 
  else if (method === 'PUT') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<MetaInput>(metaSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;

    try {
      const updatedMeta = await prisma.meta.update({
        where: { page: body.page },
        data: {
          title: body.title,
          description: body.description,
          sectionName: body.sectionName || "metas",
        },
      });
      return { success: true, data: updatedMeta };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { success: false, error: errorMessage };
    }
  } 
  else if (method === 'DELETE') {
    const rawBody = await readBody(event);
    const validation = await validateOrError<{ page: string }>(metaDeleteSchema, rawBody);
    if (!validation.success) return validation;
    const body = validation.data;

    const deletedMeta = await prisma.meta.delete({
      where: { page: body.page },
    });
    return deletedMeta;
  } 
  else {
    return { error: `HTTP ${method} method is not supported.` };
  }
});
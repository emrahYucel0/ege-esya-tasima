import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface MetaInput {
  page: string;
  title: string;
  description?: string;
  sectionName?: string;
}

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

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
    const body = (await readBody(event)) as MetaInput;
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
    const body = (await readBody(event)) as MetaInput;
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
    const body = (await readBody(event)) as { page: string };
    const deletedMeta = await prisma.meta.delete({
      where: { page: body.page },
    });
    return deletedMeta;
  } 
  else {
    return { error: `HTTP ${method} method is not supported.` };
  }
});
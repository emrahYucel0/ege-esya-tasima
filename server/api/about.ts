import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface AboutInput {
  sectionName?: string;
  title: string;
  subtitle: string;
  content: string;
  image: string;
}

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    // "abouts" sectionName'ine sahip ilk About kaydını getirir.
    const aboutData = await prisma.about.findFirst({
      where: { sectionName: "abouts" },
    });
    return aboutData;
  } else if (method === 'POST') {
    // Yeni bir About kaydı oluşturur.
    const body = (await readBody(event)) as AboutInput;
    const newAbout = await prisma.about.create({
      data: {
        sectionName: body.sectionName || "abouts",
        title: body.title,
        subtitle: body.subtitle,
        content: body.content,
        image: body.image,
      },
    });
    return newAbout;
  } else if (method === 'PUT') {
    // Belirtilen sectionName'e sahip About kaydını günceller.
    const body = (await readBody(event)) as AboutInput;
    try {
      const updatedAbout = await prisma.about.update({
        where: { sectionName: body.sectionName || "abouts" },
        data: {
          title: body.title,
          subtitle: body.subtitle,
          content: body.content,
          image: body.image,
        },
      });
      return { success: true, data: updatedAbout };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { success: false, error: errorMessage };
    }
  } else if (method === 'DELETE') {
    // Belirtilen sectionName'e sahip About kaydını siler.
    const body = (await readBody(event)) as { sectionName?: string };
    const deletedAbout = await prisma.about.delete({
      where: { sectionName: body.sectionName || "abouts" },
    });
    return deletedAbout;
  } else {
    return { error: `HTTP ${method} yöntemi desteklenmiyor.` };
  }
});
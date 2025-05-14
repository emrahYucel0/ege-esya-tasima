import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    try {
      const heroPageData = await prisma.heroPage.findFirst({
        where: { sectionName: "heros" },
      });
      return { success: true, data: heroPageData };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  } else if (method === 'POST') {
    try {
      const body = await readBody(event);
      const newHeroPage = await prisma.heroPage.create({
        data: {
          sectionName: "heros",
          title: body.title,
          subtitle: body.subtitle,
          description: body.description,
          primaryButton: body.primaryButton,
          primaryLink: body.primaryLink,
          secondaryButton: body.secondaryButton,
          secondaryLink: body.secondaryLink,
          image: body.image,
        },
      });
      return { success: true, data: newHeroPage };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  } else if (method === 'PUT') {
    try {
      const body = await readBody(event);
      const updatedHeroPage = await prisma.heroPage.update({
        where: { sectionName: "heros" },
        data: {
          title: body.title,
          subtitle: body.subtitle,
          description: body.description,
          primaryButton: body.primaryButton,
          primaryLink: body.primaryLink,
          secondaryButton: body.secondaryButton,
          secondaryLink: body.secondaryLink,
          image: body.image,
        },
      });
      return { success: true, data: updatedHeroPage };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  } else if (method === 'DELETE') {
    try {
      await prisma.heroPage.delete({
        where: { sectionName: "heros" },
      });
      return { success: true, message: "HeroPage kaydı başarıyla silindi." };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  } else {
    return { success: false, error: `HTTP ${method} yöntemi desteklenmiyor.` };
  }
});

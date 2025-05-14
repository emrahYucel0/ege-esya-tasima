import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Eski: const method = event.req.method;
  const method = event.node.req.method;

  if (method === 'GET') {
    const navbarData = await prisma.navbar.findFirst({
      where: { sectionName: "navbars" },
    });
    return navbarData;
  } else if (method === 'POST') {
    const body = await readBody(event);
    const newNavbar = await prisma.navbar.create({
      data: {
        sectionName: body.sectionName || "navbars",
        title: body.title,
        subtitle: body.subtitle,
        phone: body.phone,
      },
    });
    return newNavbar;
  } else if (method === 'PUT') {
    const body = await readBody(event);
    try {
      const updatedNavbar = await prisma.navbar.update({
        where: { sectionName: body.sectionName || "navbars" },
        data: {
          title: body.title,
          subtitle: body.subtitle,
          phone: body.phone,
        },
      });
      return { success: true, data: updatedNavbar };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { success: false, error: errorMessage };
    }
  } else if (method === 'DELETE') {
    const body = await readBody(event);
    const deletedNavbar = await prisma.navbar.delete({
      where: { sectionName: body.sectionName || "navbars" },
    });
    return deletedNavbar;
  } else {
    return { error: `HTTP ${method} yöntemi desteklenmiyor.` };
  }
});

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface FooterLinkInput {
  name: string;
  url: string;
}

interface FooterInput {
  sectionName?: string;
  address: string;
  phone: string;
  email: string;
  copyright: string;
  socialLinks?: FooterLinkInput[];
  regionLinks?: FooterLinkInput[];
  quickLinks?: FooterLinkInput[];
  blogLinks?: FooterLinkInput[];
}

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    // "footers" sectionName'ine sahip ilk Footer kaydını ilişkili tüm link verileriyle birlikte getirir.
    const footerData = await prisma.footer.findFirst({
      where: { sectionName: "footers" },
      include: {
        socialLinks: true,
        regionLinks: true,
        quickLinks: true,
        blogLinks: true,
      },
    });
    return footerData;
  } else if (method === 'POST') {
    // Yeni bir Footer kaydı oluşturur.
    const body = (await readBody(event)) as FooterInput;

    const socialLinksData = Array.isArray(body.socialLinks)
      ? body.socialLinks.map(link => ({ name: link.name, url: link.url }))
      : [];
    const regionLinksData = Array.isArray(body.regionLinks)
      ? body.regionLinks.map(link => ({ name: link.name, url: link.url }))
      : [];
    const quickLinksData = Array.isArray(body.quickLinks)
      ? body.quickLinks.map(link => ({ name: link.name, url: link.url }))
      : [];
    const blogLinksData = Array.isArray(body.blogLinks)
      ? body.blogLinks.map(link => ({ name: link.name, url: link.url }))
      : [];

    const newFooter = await prisma.footer.create({
      data: {
        sectionName: body.sectionName || "footers",
        address: body.address,
        phone: body.phone,
        email: body.email,
        copyright: body.copyright,
        createdAt: new Date(),
        updatedAt: new Date(),
        socialLinks: { create: socialLinksData },
        regionLinks: { create: regionLinksData },
        quickLinks: { create: quickLinksData },
        blogLinks: { create: blogLinksData },
      },
      include: {
        socialLinks: true,
        regionLinks: true,
        quickLinks: true,
        blogLinks: true,
      },
    });
    return newFooter;
  } else if (method === 'PUT') {
    // Belirtilen sectionName'e sahip Footer kaydını günceller.
    const body = (await readBody(event)) as FooterInput;
    try {
      const socialLinksData = Array.isArray(body.socialLinks)
        ? body.socialLinks.map(link => ({ name: link.name, url: link.url }))
        : [];
      const regionLinksData = Array.isArray(body.regionLinks)
        ? body.regionLinks.map(link => ({ name: link.name, url: link.url }))
        : [];
      const quickLinksData = Array.isArray(body.quickLinks)
        ? body.quickLinks.map(link => ({ name: link.name, url: link.url }))
        : [];
      const blogLinksData = Array.isArray(body.blogLinks)
        ? body.blogLinks.map(link => ({ name: link.name, url: link.url }))
        : [];

      const updatedFooter = await prisma.footer.update({
        where: { sectionName: body.sectionName || "footers" },
        data: {
          address: body.address,
          phone: body.phone,
          email: body.email,
          copyright: body.copyright,
          updatedAt: new Date(),
          // İlişkili verileri güncelleme: önce mevcut olanları sil, sonra yenilerini ekle
          socialLinks: {
            deleteMany: {},
            create: socialLinksData,
          },
          regionLinks: {
            deleteMany: {},
            create: regionLinksData,
          },
          quickLinks: {
            deleteMany: {},
            create: quickLinksData,
          },
          blogLinks: {
            deleteMany: {},
            create: blogLinksData,
          },
        },
        include: {
          socialLinks: true,
          regionLinks: true,
          quickLinks: true,
          blogLinks: true,
        },
      });
      return { success: true, data: updatedFooter };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { success: false, error: errorMessage };
    }
  } else if (method === 'DELETE') {
    // Belirtilen sectionName'e sahip Footer kaydını siler.
    const body = (await readBody(event)) as { sectionName?: string };
    const deletedFooter = await prisma.footer.delete({
      where: { sectionName: body.sectionName || "footers" },
    });
    return deletedFooter;
  } else {
    return { error: `HTTP ${method} yöntemi desteklenmiyor.` };
  }
});

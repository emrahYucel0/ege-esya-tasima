import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface ServiceCardInput {
  content: string;
  cardTitle: string;
  cardDescription: string;
}

interface ServiceInput {
  sectionName?: string;
  title: string;
  subtitle: string;
  blockquote: string;
  features?: ServiceCardInput[];
}

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    // "services" sectionName'ine sahip ilk Service kaydını ilişkili ServiceCard'larıyla getirir
    const serviceData = await prisma.service.findFirst({
      where: { sectionName: "services" },
      include: { features: true },
    });
    return serviceData;
    
  } else if (method === 'POST') {
    // Yeni bir Service kaydı oluşturur
    const body = (await readBody(event)) as ServiceInput;
    
    const serviceCardsData = Array.isArray(body.features)
      ? body.features.map(card => ({ 
          content: card.content,
          cardTitle: card.cardTitle,
          cardDescription: card.cardDescription
        }))
      : [];

    const newService = await prisma.service.create({
      data: {
        sectionName: body.sectionName || "services",
        title: body.title,
        subtitle: body.subtitle,
        blockquote: body.blockquote,
        features: { create: serviceCardsData }
      },
      include: { features: true }
    });
    return newService;

  } else if (method === 'PUT') {
    // Mevcut Service kaydını günceller
    const body = (await readBody(event)) as ServiceInput;
    
    try {
      const updatedService = await prisma.service.update({
        where: { sectionName: body.sectionName || "services" },
        data: {
          title: body.title,
          subtitle: body.subtitle,
          blockquote: body.blockquote,
          features: {
            deleteMany: {}, // Tüm ilişkili ServiceCard'ları sil
            create: Array.isArray(body.features)
              ? body.features.map(card => ({ 
                  content: card.content,
                  cardTitle: card.cardTitle,
                  cardDescription: card.cardDescription
                }))
              : []
          }
        },
        include: { features: true }
      });
      return { success: true, data: updatedService };
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { success: false, error: errorMessage };
    }

  } else if (method === 'DELETE') {
    // Service kaydını ve ilişkili ServiceCard'ları siler
    const body = (await readBody(event)) as { sectionName?: string };
    
    try {
      const deletedService = await prisma.service.delete({
        where: { sectionName: body.sectionName || "services" }
      });
      return { success: true, data: deletedService };
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { success: false, error: errorMessage };
    }

  } else {
    return { error: `HTTP ${method} method is not supported.` };
  }
});
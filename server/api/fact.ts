import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface FactStatisticInput {
  title: string;
}

interface FactInput {
  sectionName?: string;
  subtitle: string;
  title: string;
  description: string;
  phoneLabel: string;
  phone: string;
  statistics?: FactStatisticInput[];
}

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    // "facts" sectionName'ine sahip ilk Fact kaydını ilişkili statistics verisiyle birlikte getirir.
    const factData = await prisma.fact.findFirst({
      where: { sectionName: "facts" },
      include: { statistics: true },
    });
    return factData;
  } else if (method === 'POST') {
    // İstek gövdesinden gelen verilerle yeni bir Fact kaydı oluşturur.
    const body = (await readBody(event)) as FactInput;
    const statisticsData = Array.isArray(body.statistics)
      ? body.statistics.map((stat) => ({ title: stat.title }))
      : [];
      
    const newFact = await prisma.fact.create({
      data: {
        sectionName: body.sectionName || "facts",
        subtitle: body.subtitle,
        title: body.title,
        description: body.description,
        phoneLabel: body.phoneLabel,
        phone: body.phone,
        statistics: { create: statisticsData },
      },
      include: { statistics: true },
    });
    return newFact;
  } else if (method === 'PUT') {
    // Belirtilen sectionName'e sahip Fact kaydını günceller.
    const body = (await readBody(event)) as FactInput;
    try {
      const updatedFact = await prisma.fact.update({
        where: { sectionName: body.sectionName || "facts" },
        data: {
          subtitle: body.subtitle,
          title: body.title,
          description: body.description,
          phoneLabel: body.phoneLabel,
          phone: body.phone,
          // statistics güncellemesi: eski kayıtları silip yenilerini ekliyoruz.
          statistics: {
            deleteMany: {},
            create: Array.isArray(body.statistics)
              ? body.statistics.map((stat) => ({ title: stat.title }))
              : [],
          },
        },
        include: { statistics: true },
      });
      return { success: true, data: updatedFact };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return { success: false, error: errorMessage };
    }
  } else if (method === 'DELETE') {
    // Belirtilen sectionName'e sahip Fact kaydını siler.
    const body = (await readBody(event)) as { sectionName?: string };
    const deletedFact = await prisma.fact.delete({
      where: { sectionName: body.sectionName || "facts" },
    });
    return deletedFact;
  } else {
    return { error: `HTTP ${method} yöntemi desteklenmiyor.` };
  }
});

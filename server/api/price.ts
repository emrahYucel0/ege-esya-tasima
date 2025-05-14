import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface PlanTypeInput {
  description: string;
}

interface PlanInput {
  planName: string;
  price: string;
  planTypes?: PlanTypeInput[];
}

interface PricingPlanInput {
  sectionName?: string;
  subtitle: string;
  title: string;
  basicFeatures?: PlanInput[];
  standardFeatures?: PlanInput[];
  advancedFeatures?: PlanInput[];
}

export default defineEventHandler(async (event) => {
  const method = event.node.req.method;

  if (method === 'GET') {
    // "pricings" sectionName'ine sahip ilk PricingPlan kaydını getir.
    const pricingPlan = await prisma.pricingPlan.findFirst({
      where: { sectionName: "pricings" },
      include: {
        basicFeatures: { include: { basicPlanTypes: true } },
        standardFeatures: { include: { standardPlanTypes: true } },
        advancedFeatures: { include: { advancedPlanTypes: true } },
      },
    });
    return pricingPlan;
  } 
  
  else if (method === 'POST') {
    // Yeni bir PricingPlan kaydı oluştur.
    const body = (await readBody(event)) as PricingPlanInput;

    const newPricingPlan = await prisma.pricingPlan.create({
      data: {
        sectionName: body.sectionName || "pricings",
        subtitle: body.subtitle,
        title: body.title,
        basicFeatures: {
          create: body.basicFeatures?.map(plan => ({
            planName: plan.planName,
            price: plan.price,
            basicPlanTypes: {
              create: plan.planTypes?.map(type => ({ description: type.description })) || [],
            },
          })) || [],
        },
        standardFeatures: {
          create: body.standardFeatures?.map(plan => ({
            planName: plan.planName,
            price: plan.price,
            standardPlanTypes: {
              create: plan.planTypes?.map(type => ({ description: type.description })) || [],
            },
          })) || [],
        },
        advancedFeatures: {
          create: body.advancedFeatures?.map(plan => ({
            planName: plan.planName,
            price: plan.price,
            advancedPlanTypes: {
              create: plan.planTypes?.map(type => ({ description: type.description })) || [],
            },
          })) || [],
        },
      },
      include: {
        basicFeatures: { include: { basicPlanTypes: true } },
        standardFeatures: { include: { standardPlanTypes: true } },
        advancedFeatures: { include: { advancedPlanTypes: true } },
      },
    });
    return newPricingPlan;
  } 
  
  else if (method === 'PUT') {
    const body = (await readBody(event)) as PricingPlanInput;
    try {
      // Mevcut PricingPlan'ı ve ilişkili verileri sil
      const existingPlan = await prisma.pricingPlan.findUnique({
        where: { sectionName: body.sectionName || "pricings" },
        include: {
          basicFeatures: { include: { basicPlanTypes: true } },
          standardFeatures: { include: { standardPlanTypes: true } },
          advancedFeatures: { include: { advancedPlanTypes: true } },
        },
      });
  
      if (!existingPlan) {
        return { success: false, error: 'Pricing plan bulunamadı.' };
      }
  
      // İlişkili tüm verileri sil
      await prisma.$transaction([
        // BasicPlanType'ları sil
        prisma.basicPlanType.deleteMany({
          where: { basicPlanId: { in: existingPlan.basicFeatures.map(p => p.id) } }
        }),
        // BasicPlan'ları sil
        prisma.basicPlan.deleteMany({
          where: { pricingPlanId: existingPlan.id }
        }),
        // StandardPlanType'ları sil
        prisma.standardPlanType.deleteMany({
          where: { standardPlanId: { in: existingPlan.standardFeatures.map(p => p.id) } }
        }),
        // StandardPlan'ları sil
        prisma.standardPlan.deleteMany({
          where: { pricingPlanId: existingPlan.id }
        }),
        // AdvancedPlanType'ları sil
        prisma.advancedPlanType.deleteMany({
          where: { advancedPlanId: { in: existingPlan.advancedFeatures.map(p => p.id) } }
        }),
        // AdvancedPlan'ları sil
        prisma.advancedPlan.deleteMany({
          where: { pricingPlanId: existingPlan.id }
        }),
      ]);
  
      // Yeni verileri oluştur
      const updatedPricingPlan = await prisma.pricingPlan.update({
        where: { id: existingPlan.id },
        data: {
          subtitle: body.subtitle,
          title: body.title,
          basicFeatures: {
            create: body.basicFeatures?.map(plan => ({
              planName: plan.planName,
              price: plan.price,
              basicPlanTypes: { create: plan.planTypes || [] }
            })) || [],
          },
          standardFeatures: {
            create: body.standardFeatures?.map(plan => ({
              planName: plan.planName,
              price: plan.price,
              standardPlanTypes: { create: plan.planTypes || [] }
            })) || [],
          },
          advancedFeatures: {
            create: body.advancedFeatures?.map(plan => ({
              planName: plan.planName,
              price: plan.price,
              advancedPlanTypes: { create: plan.planTypes || [] }
            })) || [],
          },
        },
        include: {
          basicFeatures: { include: { basicPlanTypes: true } },
          standardFeatures: { include: { standardPlanTypes: true } },
          advancedFeatures: { include: { advancedPlanTypes: true } },
        },
      });
      return { success: true, data: updatedPricingPlan };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  } 
  
  else if (method === 'DELETE') {
    // PricingPlan silme işlemi
    const body = (await readBody(event)) as { sectionName?: string };
    try {
      const deletedPricingPlan = await prisma.pricingPlan.delete({
        where: { sectionName: body.sectionName || "pricings" },
      });
      return { success: true, data: deletedPricingPlan };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  } 
  
  else {
    return { error: `HTTP ${method} yöntemi desteklenmiyor.` };
  }
});

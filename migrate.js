import dotenv from 'dotenv';
import { PrismaClient as SQLitePrismaClient } from './prisma/generated/sqlite/index.js';
import { PrismaClient } from '@prisma/client';

// .env dosyasını yükle
dotenv.config();

// SQLite ve MySQL için bağlantı dizeleri
const sqliteUrl = process.env.SQLITE_DATABASE_URL;
const mysqlUrl = process.env.DATABASE_URL;

if (!mysqlUrl || !mysqlUrl.startsWith('mysql://')) {
  throw new Error('DATABASE_URL ortam değişkeni tanımlı değil veya "mysql://" ile başlamıyor!');
}

console.log('SQLite URL:', sqliteUrl);
console.log('MySQL URL:', mysqlUrl);

// SQLite ve MySQL için Prisma Client’ları oluştur
const sqlitePrisma = new SQLitePrismaClient();
const mysqlPrisma = new PrismaClient();

async function migrateData() {
  try {
    console.log('Bağımsız modeller taşınıyor...');
    await migrateStandaloneModels();

    console.log('İlişkisel modeller taşınıyor...');
    await migrateRelationalModels();

    console.log('Veri aktarımı tamamlandı!');
  } catch (error) {
    console.error('Hata oluştu:', error);
  } finally {
    await sqlitePrisma.$disconnect();
    await mysqlPrisma.$disconnect();
  }
}

async function migrateStandaloneModels() {
  const navbars = await sqlitePrisma.navbar.findMany();
  for (const navbar of navbars) {
    await mysqlPrisma.navbar.create({ data: navbar });
  }

  const heroPages = await sqlitePrisma.heroPage.findMany();
  for (const heroPage of heroPages) {
    await mysqlPrisma.heroPage.create({ data: heroPage });
  }

  const abouts = await sqlitePrisma.about.findMany();
  for (const about of abouts) {
    await mysqlPrisma.about.create({ data: about });
  }

  const posts = await sqlitePrisma.post.findMany();
  for (const post of posts) {
    await mysqlPrisma.post.create({ data: post });
  }

  const regions = await sqlitePrisma.region.findMany();
  for (const region of regions) {
    await mysqlPrisma.region.create({ data: region });
  }

  const storedFiles = await sqlitePrisma.storedFile.findMany();
  for (const storedFile of storedFiles) {
    await mysqlPrisma.storedFile.create({ data: storedFile });
  }

  const users = await sqlitePrisma.user.findMany();
  for (const user of users) {
    await mysqlPrisma.user.create({ data: user });
  }

  const quoteRequests = await sqlitePrisma.quoteRequest.findMany();
  for (const quoteRequest of quoteRequests) {
    await mysqlPrisma.quoteRequest.create({ data: quoteRequest });
  }
}

async function migrateRelationalModels() {
  const footers = await sqlitePrisma.footer.findMany({
    include: {
      socialLinks: true,
      regionLinks: true,
      quickLinks: true,
      blogLinks: true,
    },
  });
  for (const footer of footers) {
    await mysqlPrisma.footer.create({
      data: {
        sectionName: footer.sectionName,
        address: footer.address,
        phone: footer.phone,
        email: footer.email,
        copyright: footer.copyright,
        createdAt: footer.createdAt,
        updatedAt: footer.updatedAt,
        socialLinks: { create: footer.socialLinks.map(sl => ({ name: sl.name, url: sl.url })) },
        regionLinks: { create: footer.regionLinks.map(rl => ({ name: rl.name, url: rl.url })) },
        quickLinks: { create: footer.quickLinks.map(ql => ({ name: ql.name, url: ql.url })) },
        blogLinks: { create: footer.blogLinks.map(bl => ({ name: bl.name, url: bl.url })) },
      },
    });
  }

  const facts = await sqlitePrisma.fact.findMany({ include: { statistics: true } });
  for (const fact of facts) {
    await mysqlPrisma.fact.create({
      data: {
        sectionName: fact.sectionName,
        subtitle: fact.subtitle,
        title: fact.title,
        description: fact.description,
        phoneLabel: fact.phoneLabel,
        phone: fact.phone,
        createdAt: fact.createdAt,
        updatedAt: fact.updatedAt,
        statistics: { create: fact.statistics.map(stat => ({ title: stat.title, createdAt: stat.createdAt })) },
      },
    });
  }

  const features = await sqlitePrisma.feature.findMany({ include: { featureTypes: true } });
  for (const feature of features) {
    await mysqlPrisma.feature.create({
      data: {
        sectionName: feature.sectionName,
        subtitle: feature.subtitle,
        title: feature.title,
        image: feature.image,
        createdAt: feature.createdAt,
        featureTypes: { create: feature.featureTypes.map(ft => ({ title: ft.title, description: ft.description })) },
      },
    });
  }

  const pricingPlans = await sqlitePrisma.pricingPlan.findMany({
    include: {
      basicFeatures: { include: { basicPlanTypes: true } },
      standardFeatures: { include: { standardPlanTypes: true } },
      advancedFeatures: { include: { advancedPlanTypes: true } },
    },
  });
  for (const pricingPlan of pricingPlans) {
    await mysqlPrisma.pricingPlan.create({
      data: {
        sectionName: pricingPlan.sectionName,
        subtitle: pricingPlan.subtitle,
        title: pricingPlan.title,
        basicFeatures: {
          create: pricingPlan.basicFeatures.map(bf => ({
            planName: bf.planName,
            price: bf.price,
            basicPlanTypes: { create: bf.basicPlanTypes.map(bpt => ({ description: bpt.description })) },
          })),
        },
        standardFeatures: {
          create: pricingPlan.standardFeatures.map(sf => ({
            planName: sf.planName,
            price: sf.price,
            standardPlanTypes: { create: sf.standardPlanTypes.map(spt => ({ description: spt.description })) },
          })),
        },
        advancedFeatures: {
          create: pricingPlan.advancedFeatures.map(af => ({
            planName: af.planName,
            price: af.price,
            advancedPlanTypes: { create: af.advancedPlanTypes.map(apt => ({ description: apt.description })) },
          })),
        },
      },
    });
  }

  const testimonials = await sqlitePrisma.testimonial.findMany({ include: { testimonialDetails: true } });
  for (const testimonial of testimonials) {
    await mysqlPrisma.testimonial.create({
      data: {
        sectionName: testimonial.sectionName,
        title: testimonial.title,
        subtitle: testimonial.subtitle,
        createdAt: testimonial.createdAt,
        testimonialDetails: {
          create: testimonial.testimonialDetails.map(td => ({
            name: td.name,
            profession: td.profession,
            description: td.description,
          })),
        },
      },
    });
  }
}

// Scripti çalıştır
migrateData();
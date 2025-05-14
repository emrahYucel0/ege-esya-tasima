import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
  const email = 'egeesya@yonetici.com';
  const password = '!Ege_Yönetim_Güvenlik_Pass_1350!';
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const admin = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        password: hashedPassword,
        role: 'admin',
      },
    });

    console.log('Admin kullanıcısı eklendi:', admin);
  } catch (error) {
    console.error('Hata:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
// scripts/add-admin.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function addAdmin() {
  const email = 'admin@example.com';
  const password = 'AdminSecurePass123!';
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

addAdmin();
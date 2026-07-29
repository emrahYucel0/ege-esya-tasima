// server/domain/files/stored-file.repository.ts
import prisma from '~/lib/prisma'

export const storedFileRepository = {
  create: (data: { originalName: string; storedName: string; mimeType: string; size: number }) =>
    prisma.storedFile.create({ data }),
  findLatestByOriginalName: (originalName: string) =>
    prisma.storedFile.findFirst({ where: { originalName }, orderBy: { createdAt: 'desc' } }),
}

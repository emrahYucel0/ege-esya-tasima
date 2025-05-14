import fs from 'node:fs'
import path from 'node:path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const originalName = decodeURIComponent(getRouterParam(event, 'name')!) // URL decode ekle

    const fileRecord = await prisma.storedFile.findFirst({
      where: { originalName },
      orderBy: { createdAt: 'desc' } // Son yükleneni getir
    })

    if (!fileRecord) throw createError({ statusCode: 404, message: 'Dosya bulunamadı' })

    const filePath = path.join(
      process.cwd(),
      'server',
      'storage',
      'images',
      fileRecord.storedName
    )

    if (!fs.existsSync(filePath)) throw createError({ statusCode: 404 })

    const fileStream = fs.createReadStream(filePath)
    setHeader(event, 'Content-Type', getContentType(fileRecord.storedName))
    return sendStream(event, fileStream)

  } catch (error) {
    console.error('Dosya okuma hatası:', error)
    throw createError({ statusCode: 500, message: 'Dosya gösterilemiyor' })
  }
})



// MIME type yardımcı fonksiyonu
function getContentType(filename: string) {
  const ext = filename.split('.').pop()?.toLowerCase()
  const types: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp'
  }
  return types[ext!] || 'application/octet-stream'
}

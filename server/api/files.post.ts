// server/api/files.post.ts
import { PrismaClient } from '@prisma/client'
import { readMultipartFormData } from 'h3'
import { randomUUID } from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'

const prisma = new PrismaClient()
const STORAGE_PATH = path.join(process.cwd(), 'server', 'storage', 'images')

export default defineEventHandler(async (event) => {
  try {
    // 1. Dosya kontrolü: multipart veriyi oku ve 'file' isimli dosya parçasını bul.
    const parts = await readMultipartFormData(event)
    const filePart = parts?.find(part => part.name === 'file' && part.filename)

    if (!filePart || !filePart.filename) {
      throw createError({ statusCode: 400, message: 'Geçersiz dosya yükleme' })
    }

    // 2. TypeScript tip tanımı
    interface FilePart {
      name: string
      filename: string
      type: string
      data: Buffer
    }

    // 3. Güvenlik: İzin verilen MIME tipleri ve boyut kontrolü
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedMimeTypes.includes((filePart as FilePart).type)) {
      throw createError({ statusCode: 415, message: 'İzin verilmeyen dosya tipi' })
    }

    const maxSize = 5 * 1024 * 1024 // 5MB
    if ((filePart as FilePart).data.length > maxSize) {
      throw createError({ statusCode: 413, message: 'Dosya boyutu limiti aşıldı' })
    }

    // 4. Dosya işlemleri: Dosya adını oluştur ve tam yol belirle
    const fileExt = path.extname((filePart as FilePart).filename)
    const storedFileName = `${randomUUID()}${fileExt}`
    const filePath = path.join(STORAGE_PATH, storedFileName)

    // 5. Klasör kontrolü: Klasör yoksa oluştur
    await fs.mkdir(STORAGE_PATH, { recursive: true })

    // 6. Dosyayı kaydet
    await fs.writeFile(filePath, (filePart as FilePart).data)

    // 7. Veritabanı kaydı
    const fileRecord = await prisma.storedFile.create({
      data: {
        originalName: (filePart as FilePart).filename,
        storedName: storedFileName,
        mimeType: (filePart as FilePart).type,
        size: (filePart as FilePart).data.length
      }
    })

    return { 
      success: true, 
      file: {
        id: fileRecord.id,
        url: `/api/files/${encodeURIComponent(fileRecord.originalName)}` // URL encode ekle
      }
    }

  } catch (error) {
    console.error('Dosya yükleme hatası:', error)
    throw createError({ 
      statusCode: 500,
      message: 'Dosya yükleme başarısız',
      data: { error }
    })
  }
})

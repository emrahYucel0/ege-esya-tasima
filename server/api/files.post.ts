// server/api/files.post.ts
import { readMultipartFormData } from 'h3'
import { saveUploadedFile, type UploadFilePart } from '../domain/files/files.service'

export default defineEventHandler(async (event) => {
  requireAdmin(event)

  try {
    const parts = await readMultipartFormData(event)

    // ÇOKLU PARÇA: yükleyici artık tek dosya değil, tarayıcıda üretilmiş
    // varyant seti gönderiyor (foto-320.webp, foto-640.webp, …). Hepsi tek
    // istekte geliyor; boyut ve tip doğrulaması her biri için ayrı yapılıyor.
    const fileParts = (parts ?? []).filter((part) => part.name === 'file' && part.filename)

    if (fileParts.length === 0) {
      throw createError({ statusCode: 400, message: 'Geçersiz dosya yükleme' })
    }

    const files = []
    for (const part of fileParts) {
      files.push(await saveUploadedFile(part as UploadFilePart))
    }

    // `file` alanı geriye dönük uyumluluk için duruyor: eski çağıranlar tek
    // bir dosya bekliyordu. En büyük varyant (dizinin sonuncusu) veriliyor.
    return { success: true, files, file: files[files.length - 1] }
  } catch (error: any) {
    if (error?.statusCode) throw error
    console.error('Dosya yükleme hatası:', error)
    throw createError({
      statusCode: 500,
      message: 'Dosya yükleme başarısız',
    })
  }
})

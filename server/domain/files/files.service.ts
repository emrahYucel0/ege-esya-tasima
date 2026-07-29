// server/domain/files/files.service.ts
import { randomUUID } from 'node:crypto'
import fs from 'node:fs/promises'
import fsSync from 'node:fs'
import path from 'node:path'
import { fileTypeFromBuffer } from 'file-type'
import { storedFileRepository } from './stored-file.repository'

export const STORAGE_PATH = path.join(process.cwd(), 'server', 'storage', 'images')

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE_BYTES = 10 * 1024 * 1024 // 10MB

const CONTENT_TYPES: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
}

export function getContentType(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase()
  return (ext && CONTENT_TYPES[ext]) || 'application/octet-stream'
}

export interface UploadFilePart {
  filename: string
  type: string
  data: Buffer
}

export async function saveUploadedFile(filePart: UploadFilePart): Promise<{ id: number; url: string }> {
  if (filePart.data.length > MAX_SIZE_BYTES) {
    throw createError({ statusCode: 413, message: 'Dosya boyutu limiti aşıldı' })
  }

  // Multipart isteğindeki Content-Type header'ı istemci tarafından serbestçe
  // beyan edilir (sahtelenebilir); gerçek dosya tipini magic byte
  // imzasından tespit edip buna göre karar veriyoruz. Uzantı da beyan edilen
  // dosya adından değil, tespit edilen gerçek tipten türetiliyor — böylece
  // örn. ".png" uzantılı ama aslında farklı bir dosya diske yazılamıyor.
  const detected = await fileTypeFromBuffer(filePart.data)
  if (!detected || !ALLOWED_MIME_TYPES.includes(detected.mime)) {
    throw createError({ statusCode: 415, message: 'İzin verilmeyen dosya tipi' })
  }

  const storedFileName = `${randomUUID()}.${detected.ext}`
  const filePath = path.join(STORAGE_PATH, storedFileName)

  await fs.mkdir(STORAGE_PATH, { recursive: true })
  await fs.writeFile(filePath, filePart.data)

  const fileRecord = await storedFileRepository.create({
    originalName: filePart.filename,
    storedName: storedFileName,
    mimeType: detected.mime,
    size: filePart.data.length,
  })

  return {
    id: fileRecord.id,
    url: `/api/files/${encodeURIComponent(fileRecord.originalName)}`,
  }
}

export async function resolveStoredFile(originalName: string): Promise<{ filePath: string; contentType: string }> {
  const fileRecord = await storedFileRepository.findLatestByOriginalName(originalName)
  if (!fileRecord) {
    throw createError({ statusCode: 404, message: 'Dosya bulunamadı' })
  }

  const filePath = path.join(STORAGE_PATH, fileRecord.storedName)
  if (!fsSync.existsSync(filePath)) {
    throw createError({ statusCode: 404 })
  }

  return { filePath, contentType: getContentType(fileRecord.storedName) }
}

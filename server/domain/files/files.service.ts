// server/domain/files/files.service.ts
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileTypeFromBuffer } from 'file-type'
import { storedFileRepository } from './stored-file.repository'

/**
 * YÜKLEME KLASÖRÜ — proje kökünde `yuklemeler/`.
 *
 * Neden `server/storage/images` değil: orada duran dosyalar `/api/files/...`
 * rotasıyla, yani NODE ÜZERİNDEN servis ediliyordu. Ölçüldü — o rota yalnızca
 * Content-Type gönderiyordu: ETag yok, Last-Modified yok, Cache-Control yok.
 * Sonuç, tarayıcının her sayfa görüntülemede görseli baştan indirmesi, üstüne
 * her istekte bir veritabanı sorgusu ve meşgul edilen bir Node işçisiydi.
 * Paylaşımlı hosting'de CPU kotası tam da böyle tükeniyor.
 *
 * Şimdi bu klasör Nitro'nun statik varlık dizini olarak tanımlı
 * (nuxt.config.ts → nitro.publicAssets) ve `/yuklemeler/...` adresinden
 * doğrudan, uzun önbellek başlıklarıyla servis ediliyor.
 *
 * Neden `public/` DEĞİL: Nuxt derlerken `public/` klasörünü `.output/public/`
 * içine kopyalıyor. Çalışma anında yazılan dosya kaynak `public/`'e düşer ve
 * üretimde hiç görünmez. Ayrı bir klasör olması ayrıca yeni sürüm atarken
 * müşterinin yüklediklerinin silinmemesini sağlıyor.
 */
export const STORAGE_PATH = path.join(process.cwd(), 'yuklemeler')

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE_BYTES = 10 * 1024 * 1024 // 10MB

export interface UploadFilePart {
  filename: string
  type: string
  data: Buffer
}

/**
 * Dosya adını güvenli hâle getirir. Yol ayracı, üst dizin (`..`) ve alfanümerik
 * olmayan her şey eleniyor — istemciden gelen ad diske yazılacağı için bu
 * doğrulama zorunlu (path traversal).
 */
const guvenliAd = (ad: string): string => {
  const { name, ext } = path.parse(ad)
  const temizAd = name
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
  return `${temizAd || 'gorsel'}${ext.toLowerCase().replace(/[^a-z0-9.]/g, '')}`
}

export async function saveUploadedFile(filePart: UploadFilePart): Promise<{ id: number; url: string }> {
  if (filePart.data.length > MAX_SIZE_BYTES) {
    throw createError({ statusCode: 413, message: 'Dosya boyutu limiti aşıldı' })
  }

  // Multipart isteğindeki Content-Type header'ı istemci tarafından serbestçe
  // beyan edilir (sahtelenebilir); gerçek dosya tipini magic byte imzasından
  // tespit edip buna göre karar veriyoruz.
  const detected = await fileTypeFromBuffer(filePart.data)
  if (!detected || !ALLOWED_MIME_TYPES.includes(detected.mime)) {
    throw createError({ statusCode: 415, message: 'İzin verilmeyen dosya tipi' })
  }

  // Uzantı, beyan edilen addan değil tespit edilen gerçek tipten türetiliyor.
  const temel = path.parse(guvenliAd(filePart.filename)).name
  const storedFileName = `${temel}.${detected.ext}`

  await fs.mkdir(STORAGE_PATH, { recursive: true })
  await fs.writeFile(path.join(STORAGE_PATH, storedFileName), filePart.data)

  // Kayıt, servis için GEREKLİ DEĞİL (dosya statik veriliyor); yüklemelerin
  // izini tutmak ve ileride bir medya kütüphanesi ekranı yapılabilmesi için
  // korunuyor.
  const fileRecord = await storedFileRepository.create({
    originalName: storedFileName,
    storedName: storedFileName,
    mimeType: detected.mime,
    size: filePart.data.length,
  })

  return {
    id: fileRecord.id,
    url: `/yuklemeler/${encodeURIComponent(storedFileName)}`,
  }
}

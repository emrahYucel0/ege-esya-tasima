// server/domain/files/stored-file.repository.ts
import prisma from '../../utils/prisma'

export const storedFileRepository = {
  create: (data: { originalName: string; storedName: string; mimeType: string; size: number }) =>
    prisma.storedFile.create({ data }),
  findLatestByOriginalName: (originalName: string) =>
    prisma.storedFile.findFirst({ where: { originalName }, orderBy: { createdAt: 'desc' } }),
}

// NOT: Burada bir `findVariantsByBaseName` vardı; istenen varyant yoksa en
// yakınını bulmak için kullanılıyordu. Yüklenen dosyalar artık Node üzerinden
// değil statik olarak servis edildiği için sunucu tarafında böyle bir yedekleme
// yapılamıyor — ve gerekmiyor: yükleyici sabit bir merdivenin (320/640/1024/
// 2048) kaynağa sığan BAŞTAN İTİBAREN kesintisiz bölümünü üretiyor, kaydedilen
// adres de en büyük varyantı gösteriyor. Sağlayıcı o değeri tavan kabul edip
// altındaki basamakları seçtiği için var olmayan bir genişlik hiç istenmiyor.
// (bkz. app/providers/statik.ts)

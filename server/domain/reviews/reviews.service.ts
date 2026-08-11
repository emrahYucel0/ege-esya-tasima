// server/domain/reviews/reviews.service.ts
import { getSafeErrorMessage } from '../../utils/prismaError'
import { ok, fail, type ServiceResult } from '../shared/response'
import { reviewsRepository } from './reviews.repository'

export interface ReviewInput {
  customerName: string
  rating: number
  comment: string
  location?: string
  serviceType?: string
  email?: string
}

/** Formda seçilebilecek hizmet türleri — serbest metin KABUL EDİLMİYOR. */
export const HIZMET_TURLERI = [
  'Evden Eve Nakliyat',
  'Şehirler Arası Nakliyat',
  'Ofis Taşıma',
  'Parça Eşya Taşıma',
  'Asansörlü Nakliyat',
  'Eşya Depolama',
  'Paketleme ve Ambalajlama',
] as const

/**
 * Ziyaretçiden gelen metni temizler.
 *
 * Yorum ekranda `{{ }}` ile basılıyor, yani Vue zaten kaçış yapıyor ve
 * `v-html` hiçbir yerde kullanılmıyor. Buradaki temizlik ikinci savunma
 * katmanı: veritabanına etiket girmesin ki ileride bir yerde ham basılırsa
 * ya da dışa aktarılırsa sorun çıkmasın.
 *
 * Yaklaşım "kötü olanı sil" değil, "yalnızca izin verileni bırak":
 * açılı parantezler tamamen eleniyor, kontrol karakterleri düşüyor,
 * ardışık boşluklar tekleniyor.
 */
export const temizMetin = (deger: unknown, azamiUzunluk: number): string =>
  String(deger ?? '')
    .replace(/[<>]/g, '')
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, azamiUzunluk)

async function submit(input: ReviewInput): Promise<ServiceResult<{ id: number }>> {
  try {
    const puan = Math.trunc(Number(input.rating))
    if (!Number.isFinite(puan) || puan < 1 || puan > 5) {
      return fail('Puan 1 ile 5 arasında olmalı')
    }

    const ad = temizMetin(input.customerName, 60)
    if (ad.length < 2) return fail('Adınızı giriniz')

    const yorum = temizMetin(input.comment, 1000)
    if (yorum.length < 15) return fail('Yorumunuz çok kısa (en az 15 karakter)')

    // Hizmet türü beyaz listeden; eşleşmezse ilk değere düşülüyor.
    const tur = (HIZMET_TURLERI as readonly string[]).includes(String(input.serviceType))
      ? String(input.serviceType)
      : HIZMET_TURLERI[0]

    const bolumId = await reviewsRepository.defaultSectionId()
    if (!bolumId) return fail('Yorum bölümü bulunamadı')

    const kayit = await reviewsRepository.create({
      customerName: ad,
      rating: puan,
      comment: yorum,
      location: temizMetin(input.location, 60) || null,
      serviceType: tur,
      email: temizMetin(input.email, 120) || null,
      testimonialSectionId: bolumId,
    })

    return ok({ id: kayit.id })
  } catch (error) {
    return fail(getSafeErrorMessage(error))
  }
}

async function listPublic(): Promise<ServiceResult<any>> {
  try {
    const [items, stats] = await Promise.all([
      reviewsRepository.findPublic(),
      reviewsRepository.publicStats(),
    ])
    return ok({
      items,
      // AggregateRating için: yalnızca ONAYLI yorumların ortalaması.
      ortalama: stats._avg.rating ? Number(stats._avg.rating.toFixed(1)) : null,
      adet: stats._count._all,
    })
  } catch (error) {
    return fail(getSafeErrorMessage(error))
  }
}

async function listForAdmin(onlyPending: boolean): Promise<ServiceResult<any>> {
  try {
    const [items, pending] = await Promise.all([
      reviewsRepository.findForAdmin(onlyPending),
      reviewsRepository.countPending(),
    ])
    return ok({ items, pending })
  } catch (error) {
    return fail(getSafeErrorMessage(error))
  }
}

async function setApproved(id: number, isApproved: boolean): Promise<ServiceResult<any>> {
  try {
    return ok(await reviewsRepository.setApproved(id, isApproved))
  } catch (error) {
    return fail(getSafeErrorMessage(error))
  }
}

async function remove(id: number): Promise<ServiceResult<null>> {
  try {
    await reviewsRepository.remove(id)
    return ok(null, 'Yorum silindi')
  } catch (error) {
    return fail(getSafeErrorMessage(error))
  }
}

export const reviewsService = { submit, listPublic, listForAdmin, setApproved, remove }

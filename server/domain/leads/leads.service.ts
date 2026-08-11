// server/domain/leads/leads.service.ts
import { getSafeErrorMessage } from '../../utils/prismaError'
import { ok, fail, type ServiceResult } from '../shared/response'
import { leadsRepository } from './leads.repository'

export interface LeadInput {
  name: string
  email?: string
  phone?: string
  message?: string
  sourcePage?: string
}

export const MAIL_DURUMU = {
  denenmedi: 'denenmedi',
  gonderildi: 'gonderildi',
  basarisiz: 'basarisiz',
} as const

/**
 * Talebi KAYDEDER ve kaydın id'sini döner.
 *
 * Mail gönderimi bilerek burada DEĞİL: kayıt ile mail birbirinden ayrıldı ki
 * SMTP çökse bile talep kaybolmasın. Route önce burayı çağırıp kaydı garantiye
 * alıyor, sonra mail deneyip sonucu `mailSonucunuIsle` ile geri yazıyor.
 * Öncesinde form yalnızca mail atıyordu; mail patladığında müşteri adayı
 * tamamen yok oluyordu.
 */
async function create(input: LeadInput): Promise<ServiceResult<{ id: number }>> {
  try {
    const kayit = await leadsRepository.create({
      name: input.name.trim(),
      email: input.email?.trim() || null,
      phone: input.phone?.trim() || null,
      message: input.message?.trim() || null,
      sourcePage: input.sourcePage?.trim() || null,
    })
    return ok({ id: kayit.id })
  } catch (error) {
    return fail(getSafeErrorMessage(error))
  }
}

async function mailSonucunuIsle(id: number, basarili: boolean, hata?: string) {
  try {
    await leadsRepository.setMailResult(
      id,
      basarili ? MAIL_DURUMU.gonderildi : MAIL_DURUMU.basarisiz,
      basarili ? null : (hata ?? 'bilinmeyen hata')
    )
  } catch (error) {
    // Mail durumunu yazamamak talebin kendisini geçersiz kılmaz; sadece logla.
    console.error('Talep mail durumu güncellenemedi:', error)
  }
}

async function list(page = 1, pageSize = 50): Promise<ServiceResult<any>> {
  try {
    const guvenliBoyut = Math.min(Math.max(pageSize, 1), 100)
    const guvenliSayfa = Math.max(page, 1)
    const [items, total, unread] = await Promise.all([
      leadsRepository.findAll({ take: guvenliBoyut, skip: (guvenliSayfa - 1) * guvenliBoyut }),
      leadsRepository.count(),
      leadsRepository.countUnread(),
    ])
    return ok({
      items,
      total,
      unread,
      page: guvenliSayfa,
      pageSize: guvenliBoyut,
      totalPages: Math.max(Math.ceil(total / guvenliBoyut), 1),
    })
  } catch (error) {
    return fail(getSafeErrorMessage(error))
  }
}

async function setRead(id: number, isRead: boolean): Promise<ServiceResult<any>> {
  try {
    return ok(await leadsRepository.setRead(id, isRead))
  } catch (error) {
    return fail(getSafeErrorMessage(error))
  }
}

async function remove(id: number): Promise<ServiceResult<null>> {
  try {
    await leadsRepository.remove(id)
    return ok(null, 'Talep silindi')
  } catch (error) {
    return fail(getSafeErrorMessage(error))
  }
}

export const leadsService = { create, mailSonucunuIsle, list, setRead, remove }

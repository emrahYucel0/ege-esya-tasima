// server/domain/events/events.service.ts
import { getSafeErrorMessage } from '../../utils/prismaError'
import { ok, fail, type ServiceResult } from '../shared/response'
import { eventsRepository } from './events.repository'
import { leadsRepository } from '../leads/leads.repository'

/**
 * Kabul edilen olay türleri — beyaz liste.
 * İstemciden gelen değer doğrudan veritabanına yazılacağı için serbest metne
 * izin verilmiyor; aksi hâlde bu uç nokta herkese açık bir yazma kanalı olurdu.
 */
export const OLAY_TURLERI = ['telefon', 'whatsapp', 'form'] as const
export type OlayTuru = (typeof OLAY_TURLERI)[number]

export const gecerliTur = (deger: unknown): deger is OlayTuru =>
  typeof deger === 'string' && (OLAY_TURLERI as readonly string[]).includes(deger)

/** Sayfa yolu: yalnızca kendi sitemizin yolu, en fazla 191 karakter. */
export const temizSayfa = (deger: unknown): string | null => {
  if (typeof deger !== 'string') return null
  const y = deger.trim()
  if (!y.startsWith('/') || y.startsWith('//')) return null
  return y.slice(0, 191)
}

async function record(type: string, page: unknown): Promise<ServiceResult<null>> {
  try {
    if (!gecerliTur(type)) return fail('Geçersiz olay türü')
    await eventsRepository.create({ type, page: temizSayfa(page) })
    return ok(null)
  } catch (error) {
    return fail(getSafeErrorMessage(error))
  }
}

const gunOnce = (gun: number) => new Date(Date.now() - gun * 24 * 60 * 60 * 1000)

/**
 * Panelin özet ekranı için tek çağrıda tüm sayılar.
 * Sorgular paralel çalışıyor; hepsi indekslenmiş sütunlar üzerinden.
 */
async function summary(): Promise<ServiceResult<any>> {
  try {
    const bugun = new Date(); bugun.setHours(0, 0, 0, 0)
    const hafta = gunOnce(7)
    const ay = gunOnce(30)

    const [turBugun, turHafta, turAy, sayfaAy, talepBugun, talepHafta, talepAy, talepToplam, okunmamis, talepSayfaAy] =
      await Promise.all([
        eventsRepository.groupByType(bugun),
        eventsRepository.groupByType(hafta),
        eventsRepository.groupByType(ay),
        eventsRepository.groupByPage(ay),
        leadsRepository.countSince(bugun),
        leadsRepository.countSince(hafta),
        leadsRepository.countSince(ay),
        leadsRepository.count(),
        leadsRepository.countUnread(),
        leadsRepository.groupBySourcePage(ay),
      ])

    const tureCevir = (satirlar: any[]) =>
      Object.fromEntries(OLAY_TURLERI.map((t) => [
        t,
        satirlar.find((s) => s.type === t)?._count?._all ?? 0,
      ]))

    return ok({
      olaylar: {
        bugun: tureCevir(turBugun),
        hafta: tureCevir(turHafta),
        ay: tureCevir(turAy),
      },
      talepler: { bugun: talepBugun, hafta: talepHafta, ay: talepAy, toplam: talepToplam, okunmamis },
      // Son 30 günde hangi sayfa kaç dönüşüm olayı / kaç talep getirdi
      sayfaBazindaOlay: sayfaAy
        .filter((s) => s.page)
        .map((s) => ({ sayfa: s.page, adet: s._count._all })),
      sayfaBazindaTalep: talepSayfaAy
        .filter((s) => s.sourcePage)
        .map((s) => ({ sayfa: s.sourcePage, adet: s._count._all })),
    })
  } catch (error) {
    return fail(getSafeErrorMessage(error))
  }
}

export const eventsService = { record, summary }

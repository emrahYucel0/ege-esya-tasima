// server/api/stats.get.ts
//
// Panel özet verisi: dönüşüm olayları + talep sayıları + sayfa bazında dağılım.
// Yalnızca admin.
//
// Ziyaretçi SAYISI bilerek burada yok — o iş zaten bağlı olan Google
// Analytics'in (app/app.vue). Her sayfa görüntülemesini MySQL'e yazmak
// paylaşımlı hosting'de en pahalı seçenek olurdu ve bu tablo yalnızca düşük
// hacimli, yüksek değerli olayları tutuyor.
import { eventsService } from '../domain/events/events.service'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  return eventsService.summary()
})

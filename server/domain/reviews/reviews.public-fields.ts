/**
 * Yorumların herkese açık uçlarda döndürülecek alanları.
 *
 * NEDEN AYRI DOSYA
 * Bu liste bir SÖZLEŞME, veri erişimi değil. Repository'nin içindeyken onu
 * kullanmak isteyen her yer prisma istemcisini de yüklemek zorunda kalıyordu
 * — testler dahil, ki testin veritabanına ihtiyacı yok. Ayrılınca hem
 * yan etkisiz import edilebiliyor hem de "tek kaynak" olduğu görünür oluyor.
 *
 * `email` BİLEREK dışarıda: ziyaretçi doğrulama için bırakabiliyor, ama
 * yayınlanan yorumda görünmesi kişisel veri sızıntısı olurdu.
 *
 * `isApproved` ve `source` da dışarıda: moderasyon durumu ziyaretçiyi
 * ilgilendirmiyor ve hangi yorumun beklemede olduğunu dışarı sızdırırdı.
 *
 * Beyaz liste (izin verilenler) olarak yazılıyor, kara liste olarak değil:
 * modele yeni bir alan eklendiğinde varsayılan davranış "dışarı çıkmasın"
 * olsun diye. Kara liste olsaydı her yeni sütun sessizce herkese açılırdı.
 */
export const HERKESE_ACIK_ALANLAR = {
  id: true,
  customerName: true,
  customerImage: true,
  rating: true,
  comment: true,
  date: true,
  location: true,
  serviceType: true,
  serviceTypeIcon: true,
  isFeatured: true,
  order: true,
} as const

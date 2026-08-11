// prisma/bolge-aciklama-tohum.mjs
//
// Bölge sayfalarının GOOGLE ARAMA AÇIKLAMALARI (Region.metaDescription).
//
// NEDEN AYRI BİR ALAN
// `excerpt` dört işi birden yapıyordu: sayfanın giriş paragrafı, kart metni,
// arama açıklaması ve paylaşım açıklaması. İlk ikisi doğal okunmak ister,
// son ikisi tıklanma üretmek. Ölçüldü: 120 excerpt'in HİÇBİRİNDE "evden eve
// nakliyat" ifadesi geçmiyordu — yani arama sonucunda ne sattığımız
// yazmıyordu ve Google sorguyla eşleşen kelimeyi kalınlaştıramıyordu.
//
// YAZIM KALIBI
//   [konum + hizmet] + [bölgeye özgü çözüm] + [farklılaştırıcı] + [eylem]
//   hedef 140-155 karakter, bölge adı ilk 60 karakterde (mobilde kırpılan yer)
//
// İKİ FARKLI NİYET
//   İstanbul ilçeleri → yerel niyet:  "Kadıköy evden eve nakliyat…"
//   Diğer iller       → şehirler arası: "İstanbul'dan Tokat'a evden eve…"
//   İkincisi hem gerçek arama niyetiyle örtüşüyor (arayan kişi İstanbul'da,
//   oraya taşınıyor) hem de beklentiyi dürüst kuruyor — hizmet vermediğimiz
//   yerde "yerel firmayız" izlenimi bırakmıyor.
//
// Farklılaştırıcılar bilerek çeşitlendirildi: 120 sayfada aynı üçlü tekrar
// etseydi Google açıklamayı kendisi yeniden yazmaya başlardı.
//
// TEKRAR ÇALIŞTIRILABİLİR: varsayılan olarak yalnızca BOŞ alanları doldurur.
// Elle yazdığınız metinleri ezmez. Hepsini yeniden yazmak için:
//     node --env-file=.env prisma/bolge-aciklama-tohum.mjs --hepsini-ez
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from './generated/client/client.ts'

// ── İstanbul ilçeleri — yerel niyet ────────────────────────────────────────
const ISTANBUL = {
  istanbul:
    "İstanbul evden eve nakliyat: 39 ilçenin tamamında asansörlü taşıma, sigortalı ambalaj ve marangozlu montaj. Ücretsiz keşif için hemen arayın.",
  adalar:
    "Adalar evden eve nakliyat: vapur saatine göre planlanan taşıma, sigortalı ambalaj ve marangozlu montaj. Ücretsiz keşif için hemen arayın.",
  arnavutkoy:
    "Arnavutköy evden eve nakliyat: havalimanı çevresi ve köy adreslerine kapıdan kapıya taşıma, sigortalı ambalaj. Ücretsiz keşif, yazılı teklif.",
  atasehir:
    "Ataşehir evden eve nakliyat: site yönetimi izni ve yük asansörü randevusu bizden. Sigortalı taşıma, marangozlu montaj. Ücretsiz keşif alın.",
  avcilar:
    "Avcılar evden eve nakliyat: öğrenci ve tek oda taşımalarına uygun parça eşya seçeneği, sigortalı ambalaj. Aynı gün ücretsiz keşif ve teklif.",
  bagcilar:
    "Bağcılar evden eve nakliyat ve işyeri taşıma: atölye, ofis ve konut için ayrı ekip. Sigortalı taşıma, yazılı sabit fiyat. Hemen teklif alın.",
  bahcelievler:
    "Bahçelievler evden eve nakliyat: dar sokaklarda park izni ve dış cephe asansörü çözümü. Sigortalı ambalaj, marangozlu montaj. Ücretsiz keşif.",
  bakirkoy:
    "Bakırköy evden eve nakliyat: E-5 trafiğine göre planlanan saat, asansörlü taşıma ve sigortalı ambalaj. Ücretsiz keşif ve yazılı sabit fiyat.",
  basaksehir:
    "Başakşehir evden eve nakliyat: toplu konut kurallarına uygun taşıma, yük asansörü randevusu ve sigortalı ambalaj. Ücretsiz keşif için arayın.",
  bayrampasa:
    "Bayrampaşa evden eve nakliyat ve işyeri taşıma: hal ve atölye bölgesinde saat planlaması, sigortalı taşıma. Yazılı sabit fiyat için arayın.",
  besiktas:
    "Beşiktaş evden eve nakliyat: yokuşlu dar sokaklarda dış cephe asansörü, rezidanslarda yük asansörü. Sigortalı taşıma ve ücretsiz keşif.",
  beykoz:
    "Beykoz evden eve nakliyat: orman içi yollar ve yalı adresleri için uygun araç seçimi, sigortalı ambalaj. Ücretsiz keşif ve yazılı teklif.",
  beylikduzu:
    "Beylikdüzü evden eve nakliyat: site içi taşıma izni ve yük asansörü randevusu bizden. Sigortalı ambalaj, marangozlu montaj. Ücretsiz keşif.",
  beyoglu:
    "Beyoğlu evden eve nakliyat: tarihi binalarda dış cephe asansörü ve dar merdiven çözümü. Sigortalı ambalaj, deneyimli ekip. Ücretsiz keşif.",
  buyukcekmece:
    "Büyükçekmece evden eve nakliyat: yazlık ve site adreslerine kapıdan kapıya taşıma, sigortalı ambalaj. Eşya depolama seçeneğiyle ücretsiz keşif.",
  catalca:
    "Çatalca evden eve nakliyat: köy ve tarım adreslerine kapıdan kapıya taşıma, sigortalı ambalaj. Ücretsiz keşif ve yazılı sabit fiyat teklifi.",
  cekmekoy:
    "Çekmeköy evden eve nakliyat: villa ve müstakil ev taşımaları için büyük hacimli araç, marangozlu montaj. Sigortalı taşıma, ücretsiz keşif.",
  esenler:
    "Esenler evden eve nakliyat: otogar çevresi trafiğine göre saat planlaması, dar sokakta asansörlü taşıma. Sigortalı ambalaj ve ücretsiz keşif.",
  esenyurt:
    "Esenyurt evden eve nakliyat: her sitenin taşıma kuralı farklı, izin ve asansör randevusunu biz alıyoruz. Sigortalı taşıma, ücretsiz keşif.",
  eyupsultan:
    "Eyüpsultan evden eve nakliyat: tarihi merkez, Haliç kıyısı ve Göktürk villalarına uygun ekip. Sigortalı ambalaj, marangozlu montaj, keşif ücretsiz.",
  fatih:
    "Fatih evden eve nakliyat: tarihi yarımadadaki araç kısıtı ve dar sokaklar için dış cephe asansörü. Sigortalı taşıma ve ücretsiz keşif.",
  gaziosmanpasa:
    "Gaziosmanpaşa evden eve nakliyat: yoğun apartman dokusunda asansörlü taşıma, sigortalı ambalaj ve marangozlu montaj. Ücretsiz keşif için arayın.",
  gungoren:
    "Güngören evden eve nakliyat: sıkışık yapıda park izni ve dış cephe asansörü çözümü, sigortalı ambalaj. Aynı gün ücretsiz keşif ve teklif.",
  kadikoy:
    "Kadıköy evden eve nakliyat: Moda'nın dar sokakları ve asansörsüz eski apartmanlar için dış cephe asansörü. Sigortalı taşıma, ücretsiz keşif.",
  // Şapkasız yazım bilinçli: sayfanın kendi başlığı da, insanların arama
  // kutusuna yazdığı da "Kağıthane". Şapkalı yazım eşleşmeyi zayıflatıyor.
  kagithane:
    "Kağıthane evden eve nakliyat: dar sokaklarda park izni, ofis kulelerinde yük asansörü randevusu. Sigortalı taşıma ve ücretsiz keşif hizmeti.",
  kartal:
    "Kartal evden eve nakliyat: E-5 ve sahil yolu trafiğine göre planlanan saat, asansörlü taşıma. Sigortalı ambalaj, yazılı sabit fiyat teklifi.",
  kucukcekmece:
    "Küçükçekmece evden eve nakliyat: Halkalı ve Sefaköy'ün yoğun dokusunda asansörlü taşıma, sigortalı ambalaj. Ücretsiz keşif, yazılı teklif.",
  maltepe:
    "Maltepe evden eve nakliyat: üst mahallelerdeki asansörsüz binalarda dış cephe asansörü. Sigortalı ambalaj ve marangozlu montaj, keşif ücretsiz.",
  pendik:
    "Pendik evden eve nakliyat: sahilden Kurtköy'e ilçe içi mesafeye göre planlama, asansörlü taşıma. Sigortalı ambalaj ve ücretsiz keşif hizmeti.",
  sancaktepe:
    "Sancaktepe evden eve nakliyat: geniş yollarda hızlı yükleme, yeni bloklarda yük asansörü. Sigortalı taşıma, marangozlu montaj, ücretsiz keşif.",
  sariyer:
    "Sarıyer evden eve nakliyat: boğaz sırtlarındaki dik ve dar yollara uygun araç, dış cephe asansörü. Sigortalı taşıma ve ücretsiz keşif.",
  sile:
    "Şile evden eve nakliyat: merkeze uzak ve yazlık adreslere kapıdan kapıya taşıma, sigortalı ambalaj. Eşya depolama seçeneğiyle ücretsiz keşif.",
  silivri:
    "Silivri evden eve nakliyat: İstanbul'un batı ucuna tam gün planlanan taşıma, sigortalı ambalaj ve marangozlu montaj. Ücretsiz keşif için arayın.",
  sisli:
    "Şişli evden eve nakliyat: rezidanslarda yük asansörü, Kurtuluş'un asansörsüz binalarında dış cephe asansörü. Sigortalı taşıma, ücretsiz keşif.",
  sultanbeyli:
    "Sultanbeyli evden eve nakliyat: dar ara sokaklarda park izni ve asansörlü taşıma, sigortalı ambalaj. Aynı gün ücretsiz keşif ve yazılı teklif.",
  sultangazi:
    "Sultangazi evden eve nakliyat: eğimli sokaklarda güvenli araç konumlandırma ve dış cephe asansörü. Sigortalı taşıma, ücretsiz keşif hizmeti.",
  tuzla:
    "Tuzla evden eve nakliyat ve işyeri taşıma: sanayi bölgesinde ağır araç saatlerine göre planlama. Sigortalı taşıma, yazılı sabit fiyat teklifi.",
  umraniye:
    "Ümraniye evden eve nakliyat: yeni sitelerde yük asansörü, eski dar sokaklarda dış cephe asansörü. Sigortalı ambalaj ve ücretsiz keşif.",
  uskudar:
    "Üsküdar evden eve nakliyat: yokuşlu dar sokaklar ve sit alanındaki eski yapılar için dış cephe asansörü. Sigortalı taşıma, ücretsiz keşif.",
  zeytinburnu:
    "Zeytinburnu evden eve nakliyat: sahildeki yeni bloklarda yük asansörü, içerideki eski dokuda dış cephe asansörü. Sigortalı taşıma, keşif ücretsiz.",
}

// ── Diğer iller — şehirler arası niyet ─────────────────────────────────────
const ILLER = {
  adana:
    "İstanbul'dan Adana'ya evden eve nakliyat. Yaz sıcağına göre planlanan saat, sigortalı taşıma ve marangozlu montaj. Ücretsiz keşif için arayın.",
  adiyaman:
    "İstanbul'dan Adıyaman'a evden eve nakliyat. Yeni yerleşim adreslerine kapıdan kapıya sigortalı taşıma. Yazılı sabit fiyat ve ücretsiz keşif.",
  afyonkarahisar:
    "İstanbul'dan Afyonkarahisar'a evden eve nakliyat. Otoyol üzerinden hızlı güzergâh, sigortalı ambalaj ve marangozlu montaj. Ücretsiz keşif.",
  agri:
    "İstanbul'dan Ağrı'ya evden eve nakliyat. Uzun mesafeye uygun araç ve mevsime göre planlama, sigortalı taşıma. Yazılı sabit fiyat için arayın.",
  aksaray:
    "İstanbul'dan Aksaray'a evden eve nakliyat. Ankara–Adana aksı üzerinden düzenli sefer, sigortalı ambalaj ve montaj. Ücretsiz keşif, net fiyat.",
  amasya:
    "İstanbul'dan Amasya'ya evden eve nakliyat. Vadideki dar sokaklara uygun araç ve dış cephe asansörü. Sigortalı taşıma ve ücretsiz keşif.",
  ankara:
    "İstanbul'dan Ankara'ya evden eve nakliyat. Tayin ve atama taşımalarında tarih garantili sefer, sigortalı ambalaj. Ücretsiz keşif, yazılı fiyat.",
  antalya:
    "İstanbul'dan Antalya'ya evden eve nakliyat. Sezon trafiğine göre planlanan teslim, sigortalı taşıma ve marangozlu montaj. Ücretsiz keşif alın.",
  ardahan:
    "İstanbul'dan Ardahan'a evden eve nakliyat. Dağınık yerleşime kapıdan kapıya teslim, kış koşullarına uygun planlama. Sigortalı taşıma, keşif ücretsiz.",
  artvin:
    "İstanbul'dan Artvin'e evden eve nakliyat. Dar ve virajlı dağ yollarına uygun araç seçimi, sigortalı ambalaj. Ücretsiz keşif ve yazılı teklif.",
  aydin:
    "İstanbul'dan Aydın'a evden eve nakliyat. Kuşadası dahil tüm ilçelere kapıdan kapıya sigortalı taşıma. Marangozlu montaj ve ücretsiz keşif.",
  balikesir:
    "İstanbul'dan Balıkesir'e evden eve nakliyat. Ayvalık, Bandırma ve Edremit dahil tüm ilçelere sigortalı taşıma. Ücretsiz keşif, yazılı fiyat.",
  bartin:
    "İstanbul'dan Bartın'a evden eve nakliyat. Amasra'nın dar sokaklarına uygun araç ve dış cephe asansörü. Sigortalı ambalaj, ücretsiz keşif.",
  batman:
    "İstanbul'dan Batman'a evden eve nakliyat. Geniş caddelerde hızlı teslim, sigortalı taşıma ve marangozlu söküm-montaj. Ücretsiz keşif için arayın.",
  bayburt:
    "İstanbul'dan Bayburt'a evden eve nakliyat. Yüksek rakım ve kış koşullarına göre planlanan sefer, sigortalı taşıma. Yazılı sabit fiyat teklifi.",
  bilecik:
    "İstanbul'dan Bilecik'e evden eve nakliyat. Yamaçtaki eğimli sokaklara uygun araç ve asansör çözümü. Sigortalı ambalaj ve ücretsiz keşif.",
  bingol:
    "İstanbul'dan Bingöl'e evden eve nakliyat. Geçit yollarına göre planlanan güzergâh, sigortalı taşıma ve montaj. Ücretsiz keşif, net teklif.",
  bitlis:
    "İstanbul'dan Bitlis'e evden eve nakliyat. Vadideki dar yollara uygun araç ve dış cephe asansörü. Sigortalı ambalaj, ücretsiz keşif hizmeti.",
  bolu:
    "İstanbul'dan Bolu'ya evden eve nakliyat. Bolu Dağı geçidine göre planlanan güzergâh, sigortalı taşıma. Aynı gün ücretsiz keşif ve yazılı fiyat.",
  burdur:
    "İstanbul'dan Burdur'a evden eve nakliyat. Göl çevresindeki adreslere kapıdan kapıya sigortalı taşıma, marangozlu montaj. Ücretsiz keşif alın.",
  bursa:
    "İstanbul'dan Bursa'ya evden eve nakliyat. Uludağ eteğindeki yokuşlu mahallelerde dış cephe asansörü. Sigortalı taşıma, aynı gün ücretsiz keşif.",
  canakkale:
    "İstanbul'dan Çanakkale'ye evden eve nakliyat. Köprü veya feribot güzergâhıyla planlanan teslim, sigortalı taşıma. Ücretsiz keşif ve net fiyat.",
  cankiri:
    "İstanbul'dan Çankırı'ya evden eve nakliyat. Dar vadi yollarına uygun araç, sigortalı ambalaj ve marangozlu montaj. Ücretsiz keşif için arayın.",
  corum:
    "İstanbul'dan Çorum'a evden eve nakliyat. Düzenli şehir planında hızlı teslim, sigortalı taşıma ve montaj. Yazılı sabit fiyat, ücretsiz keşif.",
  denizli:
    "İstanbul'dan Denizli'ye evden eve nakliyat. Merkez ve sanayi bölgesine kapıdan kapıya sigortalı taşıma. Marangozlu montaj ve ücretsiz keşif.",
  diyarbakir:
    "İstanbul'dan Diyarbakır'a evden eve nakliyat. Suriçi'nin dar sokakları ve Kayapınar'ın sitelerine uygun ekip. Sigortalı taşıma, ücretsiz keşif.",
  duzce:
    "İstanbul'dan Düzce'ye evden eve nakliyat. Otoyola bitişik konumla çoğu iş aynı gün biter. Sigortalı ambalaj, marangozlu montaj, ücretsiz keşif.",
  edirne:
    "İstanbul'dan Edirne'ye evden eve nakliyat. Otoyol boyunca akıcı güzergâh, çoğu taşıma tek günde. Sigortalı taşıma ve ücretsiz keşif hizmeti.",
  elazig:
    "İstanbul'dan Elazığ'a evden eve nakliyat. Yenilenen yapı stokunda yük asansörlü hızlı teslim, sigortalı taşıma. Yazılı sabit fiyat teklifi.",
  erzincan:
    "İstanbul'dan Erzincan'a evden eve nakliyat. Ova tabanındaki düzenli şehirde hızlı teslim, sigortalı ambalaj. Ücretsiz keşif ve net fiyat.",
  erzurum:
    "İstanbul'dan Erzurum'a evden eve nakliyat. Kış takvimine göre planlanan sefer, sigortalı taşıma ve marangozlu montaj. Ücretsiz keşif için arayın.",
  eskisehir:
    "İstanbul'dan Eskişehir'e evden eve nakliyat. Dönem başı yoğunluğunda tarih garantili sefer, sigortalı taşıma. Ücretsiz keşif, yazılı sabit fiyat.",
  gaziantep:
    "İstanbul'dan Gaziantep'e evden eve nakliyat. Güçlü lojistik hattıyla düzenli sefer, sigortalı ambalaj ve montaj. Ücretsiz keşif ve net teklif.",
  giresun:
    "İstanbul'dan Giresun'a evden eve nakliyat. Sahil yolu dışındaki dik yamaçlara uygun araç ve asansör. Sigortalı taşıma, ücretsiz keşif hizmeti.",
  gumushane:
    "İstanbul'dan Gümüşhane'ye evden eve nakliyat. Zigana geçidine ve mevsime göre planlanan güzergâh. Sigortalı taşıma ve ücretsiz keşif teklifi.",
  hakkari:
    "İstanbul'dan Hakkari'ye evden eve nakliyat. Sarp arazi ve mevsime göre araç seçimi, sigortalı ambalaj. Yazılı sabit fiyat ve ücretsiz keşif.",
  hatay:
    "İstanbul'dan Hatay'a evden eve nakliyat. Güncel adres ve güzergâh takibiyle kapıdan kapıya sigortalı taşıma. Ücretsiz keşif, marangozlu montaj.",
  igdir:
    "İstanbul'dan Iğdır'a evden eve nakliyat. Ilıman ovada kış aylarında da kesintisiz sefer, sigortalı taşıma. Ücretsiz keşif ve yazılı sabit fiyat.",
  isparta:
    "İstanbul'dan Isparta'ya evden eve nakliyat. Üniversite dönemlerinde tarih garantili sefer, sigortalı ambalaj. Ücretsiz keşif ve net fiyat.",
  izmir:
    "İstanbul'dan İzmir'e evden eve nakliyat. Yamaç mahallelerde dış cephe asansörü, sigortalı taşıma ve marangozlu montaj. Ücretsiz keşif için arayın.",
  kahramanmaras:
    "İstanbul'dan Kahramanmaraş'a evden eve nakliyat. Değişen yol ve yerleşim düzeninde güncel güzergâh. Sigortalı taşıma, ücretsiz keşif hizmeti.",
  karabuk:
    "İstanbul'dan Karabük'e evden eve nakliyat. Safranbolu'nun korumalı konaklarına özel ambalaj ve ekip. Sigortalı taşıma ve ücretsiz keşif.",
  karaman:
    "İstanbul'dan Karaman'a evden eve nakliyat. Düz ve sakin şehirde hızlı teslim, sigortalı ambalaj ve marangozlu montaj. Ücretsiz keşif, net fiyat.",
  kars:
    "İstanbul'dan Kars'a evden eve nakliyat. Sert kışa göre planlanan sefer ve tarihi taş binalara uygun ekip. Sigortalı taşıma, ücretsiz keşif.",
  kastamonu:
    "İstanbul'dan Kastamonu'ya evden eve nakliyat. Orman yolları ve köy adreslerine kapıdan kapıya sigortalı taşıma. Ücretsiz keşif, yazılı fiyat.",
  kayseri:
    "İstanbul'dan Kayseri'ye evden eve nakliyat. Planlı şehir yapısında hızlı teslim, sigortalı ambalaj ve montaj. Ücretsiz keşif için hemen arayın.",
  kilis:
    "İstanbul'dan Kilis'e evden eve nakliyat. Kısa şehir içi mesafeyle aynı gün teslim, sigortalı taşıma ve montaj. Ücretsiz keşif ve net teklif.",
  kirikkale:
    "İstanbul'dan Kırıkkale'ye evden eve nakliyat. Ankara aksı üzerinden düzenli sefer, sigortalı ambalaj. Marangozlu montaj ve ücretsiz keşif.",
  kirklareli:
    "İstanbul'dan Kırklareli'ne evden eve nakliyat. Merkez ve kıyı ilçelerine kapıdan kapıya sigortalı taşıma. Ücretsiz keşif, yazılı sabit fiyat.",
  kirsehir:
    "İstanbul'dan Kırşehir'e evden eve nakliyat. Üniversite dönemlerinde tarih garantili sefer, sigortalı taşıma. Ücretsiz keşif ve net fiyat teklifi.",
  kocaeli:
    "İstanbul'dan Kocaeli'ne evden eve nakliyat. En yakın komşu il olarak çoğu taşıma aynı gün biter. Sigortalı ambalaj, montaj ve ücretsiz keşif.",
  konya:
    "İstanbul'dan Konya'ya evden eve nakliyat. Geniş bulvarlarda sorunsuz yükleme, sigortalı taşıma ve marangozlu montaj. Ücretsiz keşif, net fiyat.",
  kutahya:
    "İstanbul'dan Kütahya'ya evden eve nakliyat. Tarihi merkezin dar sokaklarında dış cephe asansörü. Sigortalı taşıma ve ücretsiz keşif hizmeti.",
  malatya:
    "İstanbul'dan Malatya'ya evden eve nakliyat. Güncel adres ve güzergâh takibiyle kapıdan kapıya sigortalı taşıma. Marangozlu montaj, ücretsiz keşif.",
  manisa:
    "İstanbul'dan Manisa'ya evden eve nakliyat. Merkez ve ovadaki sanayi ilçelerine sigortalı taşıma. Marangozlu montaj ve ücretsiz keşif hizmeti.",
  mardin:
    "İstanbul'dan Mardin'e evden eve nakliyat. Merdivenli taş sokaklarda dış cephe asansörü ve özel ambalaj. Sigortalı taşıma, ücretsiz keşif.",
  mersin:
    "İstanbul'dan Mersin'e evden eve nakliyat. Sahil şeridi ve Toros ilçelerine kapıdan kapıya sigortalı taşıma. Ücretsiz keşif, yazılı sabit fiyat.",
  mugla:
    "İstanbul'dan Muğla'ya evden eve nakliyat. Bodrum, Fethiye ve Marmaris dahil tüm ilçelere sigortalı taşıma. Eşya depolama ve ücretsiz keşif.",
  mus:
    "İstanbul'dan Muş'a evden eve nakliyat. Geniş ovada yokuşsuz ve hızlı teslim, sigortalı ambalaj ve montaj. Ücretsiz keşif, yazılı sabit fiyat.",
  nevsehir:
    "İstanbul'dan Nevşehir'e evden eve nakliyat. Kapadokya'nın taş ve mağara yapılarına özel ambalaj ve ekip. Sigortalı taşıma, ücretsiz keşif.",
  nigde:
    "İstanbul'dan Niğde'ye evden eve nakliyat. Kırsal adreslere kapıdan kapıya sigortalı taşıma ve eşya depolama. Ücretsiz keşif, net fiyat teklifi.",
  ordu:
    "İstanbul'dan Ordu'ya evden eve nakliyat. Yamaç adreslerdeki kot farkına uygun araç ve asansör. Sigortalı ambalaj ve ücretsiz keşif hizmeti.",
  osmaniye:
    "İstanbul'dan Osmaniye'ye evden eve nakliyat. Otoyol kavşağındaki konumla hızlı teslim, sigortalı taşıma. Marangozlu montaj ve ücretsiz keşif.",
  rize:
    "İstanbul'dan Rize'ye evden eve nakliyat. Çay bahçeleri arasındaki dar ve dik yollara uygun araç. Sigortalı taşıma, ücretsiz keşif ve net fiyat.",
  sakarya:
    "İstanbul'dan Sakarya'ya evden eve nakliyat. Güçlü otoyol bağlantısıyla çoğu taşıma aynı gün biter. Sigortalı ambalaj, montaj ve ücretsiz keşif.",
  samsun:
    "İstanbul'dan Samsun'a evden eve nakliyat. Ovaya kurulu şehirde yokuşsuz ve hızlı teslim, sigortalı taşıma. Ücretsiz keşif, yazılı sabit fiyat.",
  sanliurfa:
    "İstanbul'dan Şanlıurfa'ya evden eve nakliyat. Yaz sıcağına göre erken saat planlaması, sigortalı ambalaj. Marangozlu montaj ve ücretsiz keşif.",
  siirt:
    "İstanbul'dan Siirt'e evden eve nakliyat. Dağınık ilçe adreslerine kapıdan kapıya sigortalı taşıma. Ücretsiz keşif ve yazılı sabit fiyat teklifi.",
  sinop:
    "İstanbul'dan Sinop'a evden eve nakliyat. Dolambaçlı yarımada yollarına uygun araç seçimi, sigortalı taşıma. Ücretsiz keşif, marangozlu montaj.",
  sirnak:
    "İstanbul'dan Şırnak'a evden eve nakliyat. Yüksek rakım ve mevsime göre planlanan sefer, sigortalı ambalaj. Ücretsiz keşif ve net fiyat teklifi.",
  sivas:
    "İstanbul'dan Sivas'a evden eve nakliyat. Sert kış takvimine göre planlanan sefer, sigortalı taşıma ve montaj. Ücretsiz keşif için hemen arayın.",
  tekirdag:
    "İstanbul'dan Tekirdağ'a evden eve nakliyat. Çorlu, Çerkezköy ve sahil ilçelerine aynı gün teslim. Sigortalı taşıma, montaj ve ücretsiz keşif.",
  tokat:
    "İstanbul'dan Tokat'a evden eve nakliyat. Zile ve Niksar dahil tüm ilçelere kapıdan kapıya sigortalı taşıma. Ücretsiz keşif, yazılı sabit fiyat.",
  trabzon:
    "İstanbul'dan Trabzon'a evden eve nakliyat. Dik yamaçlarda aracın yanaşamadığı adreslerde dış cephe asansörü. Sigortalı taşıma, ücretsiz keşif.",
  tunceli:
    "İstanbul'dan Tunceli'ye evden eve nakliyat. Munzur vadisinin virajlı yollarına uygun araç, sigortalı ambalaj. Ücretsiz keşif ve net teklif.",
  usak:
    "İstanbul'dan Uşak'a evden eve nakliyat. Derli toplu şehirde hızlı teslim, sigortalı taşıma ve marangozlu montaj. Ücretsiz keşif, yazılı fiyat.",
  van:
    "İstanbul'dan Van'a evden eve nakliyat. Yenilenen yapı stokunda yük asansörlü hızlı teslim, sigortalı taşıma. Ücretsiz keşif ve net fiyat teklifi.",
  yalova:
    "İstanbul'dan Yalova'ya evden eve nakliyat. Feribot güzergâhıyla kısa süren, aynı gün biten taşıma. Sigortalı ambalaj, montaj ve ücretsiz keşif.",
  yozgat:
    "İstanbul'dan Yozgat'a evden eve nakliyat. Köy ve kırsal adreslere kapıdan kapıya sigortalı taşıma. Ücretsiz keşif ve yazılı sabit fiyat teklifi.",
  zonguldak:
    "İstanbul'dan Zonguldak'a evden eve nakliyat. Merdivenli sokaklarda dış cephe asansörü ve sigortalı ambalaj. Ücretsiz keşif, marangozlu montaj.",
}

const TUMU = { ...ISTANBUL, ...ILLER }

// ── Uygulama ───────────────────────────────────────────────────────────────
const hepsiniEz = process.argv.includes('--hepsini-ez')
const p = new PrismaClient({ adapter: new PrismaMariaDb(process.env.DATABASE_URL) })

const kayitlar = await p.region.findMany({ select: { slug: true, metaDescription: true } })
const mevcutSluglar = new Set(kayitlar.map((k) => k.slug))

// Önce tutarlılık: elimizdeki metin veritabanındaki her bölgeyi karşılıyor mu?
const eksik = [...mevcutSluglar].filter((s) => !TUMU[s])
const fazla = Object.keys(TUMU).filter((s) => !mevcutSluglar.has(s))
if (eksik.length) console.log('UYARI — metni yazılmamış bölge:', eksik.join(', '))
if (fazla.length) console.log('UYARI — veritabanında olmayan slug:', fazla.join(', '))

let yazilan = 0
let atlanan = 0
const uzunlar = []

for (const kayit of kayitlar) {
  const metin = TUMU[kayit.slug]
  if (!metin) continue
  if (kayit.metaDescription && !hepsiniEz) {
    atlanan++
    continue
  }
  if (metin.length > 160) uzunlar.push(`${kayit.slug}:${metin.length}`)
  await p.region.update({ where: { slug: kayit.slug }, data: { metaDescription: metin } })
  yazilan++
}

const uzunluklar = Object.values(TUMU).map((m) => m.length)
console.log(`\n${yazilan} açıklama yazıldı, ${atlanan} atlandı (zaten doluydu).`)
console.log(
  `uzunluk — en kısa ${Math.min(...uzunluklar)}, ortalama ${Math.round(
    uzunluklar.reduce((a, b) => a + b, 0) / uzunluklar.length
  )}, en uzun ${Math.max(...uzunluklar)}`
)
if (uzunlar.length) console.log('160 karakteri aşanlar:', uzunlar.join(', '))

await p.$disconnect()

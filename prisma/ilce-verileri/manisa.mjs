// prisma/ilce-verileri/manisa.mjs
//
// Manisa'nın 17 ilçesinden 8'i. DOKUZU BİLEREK ATLANDI.
//
// ATLANANLAR: Kırkağaç, Saruhanlı, Gördes, Demirci, Selendi, Ahmetli,
//   Gölmarmara, Köprübaşı, Sarıgöl
//   Küçük nüfuslu ve aramada karşılığı düşük. Sarıgöl ayrıca BİLEREK
//   çıkarıldı: doğal ekseni bağcılık olurdu, o eksen hem Alaşehir'le hem
//   İzmir/Ödemiş ve Ankara/Kalecik ile çakışırdı.
//
// DERİNLİK: 'tam' (3) / 'orta' (5)
//
// BU İLDE EKSENLER COĞRAFYADAN DEĞİL, İŞİN KENDİSİNDEN ÇIKARILDI
//   Manisa'nın bariz temaları (organize sanayi, bağcılık, üniversite
//   takvimi, tarihi doku) önceki illerde tüketilmiş durumda:
//     · organize sanayi / işyeri  → İzmir/Kemalpaşa, Çiğli, Aliağa,
//                                    Torbalı; Ankara/Kahramankazan;
//                                    Trabzon/Arsin
//     · üniversite dönemi takvimi → İzmir/Bornova ve Denizli/Pamukkale
//                                    (iki kez kullanıldı, üçüncüsü yok)
//     · bağcılık / hasat          → İzmir/Ödemiş, Ankara/Kalecik,
//                                    Gaziantep/Nizip
//     · tarihi doku + dar sokak + küçük araç
//                                 → Ankara/Beypazarı, İzmir/Tire,
//                                    İzmir/Bergama, Ankara/Altındağ
//   Bu yüzden Manisa'da eksenler yerin özelliği yerine TAŞIMA İŞİNİN
//   kendi aşamaları üzerinden kuruldu: anahtar teslim çalışma, dış cephe
//   asansörünün konumu, teknik montaj, ambalajın önceden bırakılması,
//   teslim tutanağı, iki hedefli yük, aynı gün aynı bina, tescilli yapı.
//   Bunlar hiçbir ilde kullanılmadı ve her ilçede farklı bir aşamayı
//   anlatıyor.
//
// KULA'nın TARİHİ EVLERİ — AYRIM
//   Beypazarı/Tire/Bergama'da eksen SOKAK ve ARAÇ ÖLÇÜSÜ. Kula'da eksen
//   YAPININ KENDİSİ: tescilli binada kapı ve merdiven ölçüsü
//   değiştirilemiyor, bu yüzden eşya yapıya uyduruluyor ve yapı taşıma
//   boyunca korunuyor. Sokak genişliği çerçevesi burada bilerek
//   tekrarlanmıyor.
//
// MAHALLELER
//   Tamamı boş bırakıldı; Manisa mahalle adları konusunda doğrulanmış
//   bilgim yok. (Aynı kural Denizli'de de uygulandı.)
//
// Ortak kurallar: uydurma mahalle/rakam yok, "evden eve nakliyat" sayfa
// başına tam bir kez. (bkz. izmir.mjs başlığındaki ayrıntılı gerekçe)

export const il = { ad: 'Manisa', plaka: 45 }

export const ilceler = [
  // ───────────────────────── TAM DERİNLİK (3) ─────────────────────────
  {
    ad: 'Yunusemre',
    derinlik: 'tam',
    ozet:
      'Yunusemre’de taşımaların bir bölümü ev sahibi yokken yapılıyor; anahtar teslim çalışmanın kendi kuralları var.',
    metaAciklama:
      'Yunusemre evden eve nakliyat: anahtar teslim çalışma, fotoğraflı kayıt, sigortalı ambalaj ve yazılı sabit fiyat.',
    govde: `<p>Yunusemre’de sık gelen taleplerden biri şu: “Taşıma günü işte olacağım, anahtarı vereyim, siz halledin.” Bunu yapıyoruz, ama gelişigüzel değil. Eşyanın nereye konacağına dair kararların taşıma başlamadan alınmış olması gerekiyor, çünkü karar verecek kişi ortada olmayacak.</p><p>Keşifte her odanın hangi odaya karşılık geleceğini birlikte işaretliyoruz; büyük mobilyaların duvar tercihini de o sırada not ediyoruz. Yükleme öncesi ve boşaltma sonrası fotoğraf çekiyor, anahtar teslim ve iade saatini yazıyoruz. Yunusemre’de <strong>evden eve nakliyat</strong> işini bu şekilde yürüttüğümüzde akşam eve gelen kişi kurulu bir evle karşılaşıyor.</p><p>Anahtar teslim çalışmada karar veremeyeceğimiz tek şey ayıklama oluyor: atılacak mı, kalacak mı sorusunun cevabı bizde olmaz. Bu yüzden kararsız kalınan parçaları atmıyor, bir odada toplu hâlde bırakıyoruz; siz döndüğünüzde bakıyorsunuz.</p>`,
    kunye: [
      { label: 'Anahtar teslim', value: 'Ev sahibi yokken taşıma yapılıyor; kararlar önceden alınıyor.' },
      { label: 'Oda eşleştirmesi', value: 'Hangi odanın hangi odaya karşılık geldiği keşifte işaretleniyor.' },
      { label: 'Kayıt', value: 'Yükleme öncesi ve boşaltma sonrası fotoğraf, anahtar teslim ve iade saati yazılı.' },
      { label: 'Ayıklama', value: 'Atma kararı bize bırakılmıyor; kararsız parçalar bir odada toplanıyor.' },
    ],
    guzergahlar: [
      { to: 'Şehzadeler', note: 'Şehir içi geçiş; iş aynı gün bitiyor.' },
      { to: 'Turgutlu', note: 'Güneybatı aksı; günübirlik.' },
      { to: 'İzmir', note: 'Batıya çıkış; güzergâh düz, süre öngörülebilir.' },
      { to: 'Manisa', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Taşıma günü evde olamayacağım, yine de yapılır mı?',
        answer:
          'Yapılır. Anahtarı teslim alıyoruz, keşifte aldığımız kararlara göre kuruyoruz ve anahtarı size iade ediyoruz. Teslim ve iade saati yazılı oluyor.',
      },
      {
        question: 'Eşyaların doğru odaya konduğundan nasıl emin olacağım?',
        answer:
          'Keşifte oda eşleştirmesini birlikte işaretliyoruz. Boşaltma sonrası fotoğraflarla da kaydediyoruz.',
      },
      {
        question: 'Gereksiz eşyayı siz atabilir misiniz?',
        answer:
          'Atma kararını biz vermiyoruz. Kararsız kalınan parçaları bir odada topluyoruz, dönüşünüzde siz karar veriyorsunuz.',
      },
      {
        question: 'Verilen fiyat sonradan değişir mi?',
        answer:
          'Değişmiyor. Keşif sonrası verilen yazılı fiyat taşıma gününe kadar geçerli kalıyor.',
      },
    ],
  },

  {
    ad: 'Şehzadeler',
    derinlik: 'tam',
    ozet:
      'Şehzadeler’de asıl soru dış cephe asansörünün gerekip gerekmediği değil, sokakta nereye kurulacağı.',
    metaAciklama:
      'Şehzadeler evden eve nakliyat: dış cephe asansörü için yer tespiti ve izin, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Şehzadeler, Manisa’nın eski merkezi; asansörsüz dört-beş katlı bina burada hâlâ yaygın. Bu binalarda dış cephe asansörü kullanmak standart bir çözüm. Zorluk asansörün kendisinde değil, onu <em>nereye kuracağımızda</em>: ayağın oturacağı düz bir zemin, cepheye açık bir hat ve yukarıda önü kesilmemiş bir pencere gerekiyor.</p><p>Kaldırıma park etmiş bir araç, cepheye yaslanmış bir ağaç ya da alçaktan geçen bir kablo bu hattı kapatabiliyor. Bu yüzden keşifte binaya değil sokağa da bakıyoruz. Gerekiyorsa taşıma gününden önce komşuları ve bina yönetimini bilgilendirip o alanın boş kalmasını sağlıyoruz. Şehzadeler’de <strong>evden eve nakliyat</strong> planının ilk maddesi çoğu zaman bu oluyor.</p><p>Kurulacak yer bulunamıyorsa iş merdivenden yürüyor; bu durumda süre uzuyor ve ekip büyüyor. İki senaryonun farkını keşifte söylüyoruz, taşıma günü sürprizle karşılaşmıyorsunuz.</p>`,
    kunye: [
      { label: 'Yapı stoğu', value: 'Asansörsüz dört-beş katlı bina yaygın; dış cephe asansörü standart çözüm.' },
      { label: 'Yer tespiti', value: 'Düz zemin, açık cephe hattı ve önü kesilmemiş pencere gerekiyor.' },
      { label: 'Sokak engelleri', value: 'Park eden araç, ağaç ve alçak kablo hattı kapatabiliyor.' },
      { label: 'Alternatif', value: 'Yer bulunamazsa iş merdivenden yürüyor; süre ve ekip farkı önceden söyleniyor.' },
    ],
    guzergahlar: [
      { to: 'Yunusemre', note: 'Şehir içi geçiş; iş aynı gün bitiyor.' },
      { to: 'Turgutlu', note: 'Güneybatı aksı; günübirlik.' },
      { to: 'Akhisar', note: 'Kuzey yönü; yol süresi planlanıyor.' },
      { to: 'Manisa', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Binamızda asansör yok, eşya nasıl inecek?',
        answer:
          'Çoğu adreste dış cephe asansörü kuruyoruz. Kurulacak yeri keşifte tespit ediyoruz; uygun alan yoksa iş merdivenden yürüyor.',
      },
      {
        question: 'Sokakta araçlar park hâlindeyse ne oluyor?',
        answer:
          'Taşıma gününden önce komşuları ve bina yönetimini bilgilendirip o alanın boş kalmasını sağlıyoruz.',
      },
      {
        question: 'Dış cephe asansörü eşyaya zarar verir mi?',
        answer:
          'Vermiyor. Parçalar sabitlenip örtülüyor; ağır ve geniş mobilyalarda ek kayış kullanıyoruz.',
      },
      {
        question: 'Merdivenden taşınırsa fiyat değişir mi?',
        answer:
          'İki senaryonun farkını keşifte söylüyoruz. Hangisi uygulanacaksa fiyat ona göre yazılıyor ve sonradan değişmiyor.',
      },
    ],
  },

  {
    ad: 'Turgutlu',
    derinlik: 'tam',
    ozet:
      'Turgutlu’da taşımanın en çok vakit alan kısmı mobilya değil, beyaz eşya ve tesisat bağlantılarının sökülüp yeniden kurulması.',
    metaAciklama:
      'Turgutlu evden eve nakliyat: beyaz eşya, kombi ve klima söküm-montajı dahil, sigortalı ambalaj ve yazılı fiyat.',
    govde: `<p>Turgutlu’daki taşımalarda işin görünmeyen kısmı teknik bağlantılar oluyor. Çamaşır ve bulaşık makinesi su ve gider hattından ayrılıyor, buzdolabı taşımadan önce kapatılıp boşaltılıyor, kombi ve klima yetkili şekilde sökülüyor, televizyon askı aparatı duvardan çıkarılıyor. Bunların her biri ayrı bir iş ve toplamı çoğu zaman mobilyadan uzun sürüyor.</p><p>Çamaşır makinesinde en sık atlanan ayrıntı nakliye vidası oluyor: tambur sabitlenmeden taşınırsa yolda darbe alıyor. Vidası kaybolmuş makinelerde taşımadan önce uygun sabitlemeyi biz yapıyoruz. Turgutlu’da <strong>evden eve nakliyat</strong> teklifi verirken bu kalemleri tek tek soruyoruz; hangisi varsa süreye ve fiyata baştan yazılıyor.</p><p>Yeni adreste montaj aynı gün tamamlanıyor. Su ve elektrik bağlantısı yapıldıktan sonra makineleri kısa bir test için çalıştırıyoruz; sızıntı ya da titreşim varsa oradayken düzeltiyoruz, ertesi güne bırakmıyoruz.</p>`,
    kunye: [
      { label: 'Teknik kalemler', value: 'Beyaz eşya, kombi, klima ve televizyon askısı ayrı ayrı sökülüp kuruluyor.' },
      { label: 'Nakliye vidası', value: 'Tambur sabitlenmeden taşınmıyor; vidası yoksa uygun sabitleme yapılıyor.' },
      { label: 'Fiyat', value: 'Hangi teknik kalemin bulunduğu keşifte soruluyor, süreye ve fiyata baştan yazılıyor.' },
      { label: 'Test', value: 'Montaj sonrası makineler çalıştırılıyor; sızıntı ve titreşim yerinde gideriliyor.' },
    ],
    guzergahlar: [
      { to: 'Yunusemre', note: 'Kuzeydoğu aksı; günübirlik.' },
      { to: 'Şehzadeler', note: 'Manisa merkezi; iş aynı gün bitiyor.' },
      { to: 'Salihli', note: 'Doğuya geçiş; güzergâh düz.' },
      { to: 'İzmir', note: 'Batıya çıkış; süre öngörülebilir.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Beyaz eşya söküm ve montajı fiyata dahil mi?',
        answer:
          'Dahil. Hangi cihazların bulunduğunu keşifte soruyoruz ve yazılı fiyata baştan yazıyoruz.',
      },
      {
        question: 'Çamaşır makinesinin nakliye vidası yok, sorun olur mu?',
        answer:
          'Olmaz. Tamburu uygun şekilde sabitliyoruz; vidasız taşıma yapmıyoruz çünkü yolda darbe alıyor.',
      },
      {
        question: 'Kombi ve klimayı da siz mi söküyorsunuz?',
        answer:
          'Söküyoruz ve yeni adreste kuruyoruz. Bu işler yetkili şekilde yapılıyor, ayrı bir randevu gerekmiyor.',
      },
      {
        question: 'Montaj aynı gün bitiyor mu?',
        answer:
          'Bitiyor. Bağlantılar tamamlandıktan sonra kısa bir test yapıyoruz; sorun varsa oradayken düzeltiyoruz.',
      },
    ],
  },

  // ───────────────────────── ORTA DERİNLİK (5) ─────────────────────────
  {
    ad: 'Akhisar',
    derinlik: 'orta',
    ozet:
      'Akhisar’da paketlemeyi kendi yapmak isteyenler için ambalaj malzemesi taşımadan günler önce bırakılıyor.',
    metaAciklama:
      'Akhisar evden eve nakliyat: ambalaj malzemesinin önceden teslimi, isteğe bağlı paketleme, yazılı sabit fiyat.',
    govde: `<p>Akhisar’da müşterilerin bir bölümü paketlemeyi kendisi yapmak istiyor; hem maliyeti düşürüyor hem de eşyasını kendi düzeninde topluyor. Bunun tek şartı malzemenin zamanında elde olması. Koli, balonlu naylon, streç ve etiketleri taşıma gününden birkaç gün önce adrese bırakıyoruz.</p><p>Kendi paketleyecek olanlara iki şeyi söylüyoruz: koliyi taşınabilir ağırlıkta tutmak ve üzerine hangi odaya gideceğini yazmak. Bu iki not, boşaltmayı gözle görülür şekilde hızlandırıyor. Akhisar’da <strong>evden eve nakliyat</strong> işlerinde kırılacak eşya paketlemesini yine de biz üstleniyoruz; orada hata payı yüksek.</p>`,
    kunye: [
      { label: 'Önceden teslim', value: 'Koli, balonlu naylon, streç ve etiket taşımadan günler önce bırakılıyor.' },
      { label: 'İki kural', value: 'Koli taşınabilir ağırlıkta olacak ve üzerinde gideceği oda yazacak.' },
      { label: 'Kırılacak eşya', value: 'Müşteri kendi paketlese de kırılacak parçaları ekip paketliyor.' },
    ],
    guzergahlar: [
      { to: 'Şehzadeler', note: 'Güney yönü; Manisa merkezi, yol süresi planlanıyor.' },
      { to: 'Soma', note: 'Kuzeybatı aksı; güzergâh düz.' },
      { to: 'Manisa', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Paketlemeyi kendim yaparsam fiyat düşer mi?', answer: 'Düşer. Kendi paketleyeceğinizi baştan söylerseniz teklifi ona göre veriyoruz.' },
      { question: 'Malzemeyi ne zaman getiriyorsunuz?', answer: 'Taşıma gününden birkaç gün önce adrese bırakıyoruz; acele etmeden toplayabiliyorsunuz.' },
      { question: 'Tabak ve bardakları da ben mi paketleyeceğim?', answer: 'Gerek yok. Kırılacak eşyayı siz istemeseniz de biz paketliyoruz; orada hata payı yüksek.' },
    ],
  },

  {
    ad: 'Salihli',
    derinlik: 'orta',
    ozet:
      'Salihli’de taşıma teslim tutanağıyla kapanıyor; hangi parçanın hangi durumda teslim edildiği yazılı kalıyor.',
    metaAciklama:
      'Salihli evden eve nakliyat: fotoğraflı teslim tutanağı ve sigortalı taşıma, yazılı sabit fiyat.',
    govde: `<p>Salihli’deki işleri teslim tutanağıyla kapatıyoruz. Yükleme öncesinde büyük parçaların ve kırılacak eşyanın durumu fotoğrafla kaydediliyor, boşaltma sonrasında aynı liste üzerinden teslim ediliyor. Bu, iş bittikten sonra “bu çizik önceden var mıydı” tartışmasını tamamen ortadan kaldırıyor.</p><p>Bir hasar oluşursa süreç de tutanak üzerinden yürüyor; sigorta bildirimi bekletilmiyor. Salihli’de <strong>evden eve nakliyat</strong> sözleşmesinde poliçe bilgisi ve tutanak birlikte yer alıyor, ikisi ayrı belge olarak dolaşmıyor.</p>`,
    kunye: [
      { label: 'Teslim tutanağı', value: 'Büyük parçalar ve kırılacak eşya yükleme öncesi fotoğrafla kaydediliyor.' },
      { label: 'Kapanış', value: 'Boşaltma sonrası aynı liste üzerinden teslim yapılıyor.' },
      { label: 'Hasar süreci', value: 'Bildirim tutanak üzerinden yürüyor; poliçe bilgisi sözleşmede yazılı.' },
    ],
    guzergahlar: [
      { to: 'Turgutlu', note: 'Batıya geçiş; güzergâh düz.' },
      { to: 'Alaşehir', note: 'Doğuya devam; günübirlik.' },
      { to: 'Manisa', note: 'İl merkezi; yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Eşyam hasar görürse ne oluyor?', answer: 'Tutanak ve fotoğraflar üzerinden sigorta bildirimi yapılıyor; süreç bekletilmiyor.' },
      { question: 'Tutanağı kim imzalıyor?', answer: 'Teslim sırasında siz ve ekip sorumlusu birlikte imzalıyor; bir nüshası sizde kalıyor.' },
      { question: 'Sigorta ek ücretli mi?', answer: 'Taşıma sigortası hizmete dahil. Kapsam ve poliçe bilgisi sözleşmede yazılı oluyor.' },
    ],
  },

  {
    ad: 'Alaşehir',
    derinlik: 'orta',
    ozet:
      'Alaşehir’de yükün tamamı aynı adrese gitmiyor; bir bölümü depoya, bir bölümü yeni eve ayrılıyor.',
    metaAciklama:
      'Alaşehir evden eve nakliyat: iki hedefe ayrılan yük planlaması, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Alaşehir’de sık karşılaştığımız iş tipi, yükün iki hedefe bölünmesi. Yeni ev eskisinden küçük olduğunda ya da eşyanın bir bölümü şimdilik kullanılmayacağında yük ikiye ayrılıyor: bir kısmı adrese, bir kısmı depoya gidiyor.</p><p>Bu ayrımın taşımadan önce yapılması gerekiyor, çünkü yükleme sırası buna göre kuruluyor: depoya gidecekler araca önce, eve gidecekler sonra biniyor. Alaşehir’de <strong>evden eve nakliyat</strong> planında iki liste ayrı ayrı etiketleniyor; araç tek seferde iki durak yapıyor ve ikinci sefere gerek kalmıyor.</p>`,
    kunye: [
      { label: 'İki hedef', value: 'Yükün bir bölümü yeni adrese, bir bölümü depoya gidiyor.' },
      { label: 'Yükleme sırası', value: 'Depoya gidecekler önce, eve gidecekler sonra yükleniyor.' },
      { label: 'Tek sefer', value: 'Araç iki durak yapıyor; ikinci sefer gerekmiyor.' },
    ],
    guzergahlar: [
      { to: 'Salihli', note: 'Batıya geçiş; günübirlik.' },
      { to: 'Kula', note: 'Kuzeydoğu yönü; yol süresi planlanıyor.' },
      { to: 'Manisa', note: 'İl merkezi; mesafe hesaba katılıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Eşyamın bir kısmını depoya koyabilir miyiz?', answer: 'Koyabilirsiniz. İki listeyi keşifte ayırıyoruz, araç tek seferde iki durak yapıyor.' },
      { question: 'Depodaki eşyayı sonra istediğimde alabilir miyim?', answer: 'Alabilirsiniz. Ne zaman ihtiyaç duyacağınızı baştan söylerseniz yerleşimi ona göre yapıyoruz.' },
      { question: 'İki durak fiyatı ikiye katlıyor mu?', answer: 'Katlamıyor. Tek sefer olduğu için fiyat tek taşıma üzerinden hesaplanıyor.' },
    ],
  },

  {
    ad: 'Soma',
    derinlik: 'orta',
    ozet:
      'Soma’da toplu konut yoğun; aynı binada aynı güne düşen taşımalarda giriş ve asansör sırası önceden ayarlanıyor.',
    metaAciklama:
      'Soma evden eve nakliyat: toplu konutta giriş ve asansör sırası planlaması, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Soma’da toplu konut dokusu yaygın ve taşınmalar belirli günlerde yoğunlaşıyor. Bunun sonucu şu oluyor: aynı binada aynı gün birden fazla taşınma olabiliyor ve tek bir giriş ile tek bir asansör paylaşılıyor. Plan yapılmazsa iki ekip kapıda karşılaşıyor, ikisi de bekliyor.</p><p>Bu yüzden randevuyu alırken bina yönetimine soruyoruz: o gün başka taşınma var mı, asansör kullanımı için saat ayrılmış mı. Soma’da <strong>evden eve nakliyat</strong> saatini buna göre öne ya da arkaya alıyoruz; gerekirse aracı bina girişini kapatmayacak bir noktaya yerleştiriyoruz.</p>`,
    kunye: [
      { label: 'Toplu konut', value: 'Tek giriş ve tek asansör birden fazla taşınma arasında paylaşılıyor.' },
      { label: 'Yönetime soru', value: 'O gün başka taşınma var mı, asansöre saat ayrılmış mı — randevu öncesi soruluyor.' },
      { label: 'Saat ayarı', value: 'Taşıma saati öne ya da arkaya alınıyor; araç girişi kapatmayacak noktaya konuyor.' },
    ],
    guzergahlar: [
      { to: 'Akhisar', note: 'Güneydoğu aksı; güzergâh düz.' },
      { to: 'Manisa', note: 'İl merkezi; yol süresi planlanıyor.' },
      { to: 'Şehzadeler', note: 'Manisa merkezi; mesafe hesaba katılıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Aynı gün binada başka taşınma varsa ne oluyor?', answer: 'Randevu öncesi yönetime soruyoruz ve saati ona göre ayarlıyoruz; iki ekip kapıda karşılaşmıyor.' },
      { question: 'Asansör kullanımı için izin gerekir mi?', answer: 'Bazı bloklarda gerekiyor. İzni ve saat aralığını biz yönetimle ayarlıyoruz.' },
      { question: 'Araç bina girişini kapatır mı?', answer: 'Kapatmayacak bir nokta seçiyoruz; gerekirse yükleme mesafesi biraz uzuyor, bunu keşifte söylüyoruz.' },
    ],
  },

  {
    ad: 'Kula',
    derinlik: 'orta',
    ozet:
      'Kula’nın tescilli evlerinde kapı ve merdiven ölçüsü değiştirilemiyor; eşya yapıya uyduruluyor ve yapı korunuyor.',
    metaAciklama:
      'Kula evden eve nakliyat: tescilli yapıda koruma önlemli taşıma, mobilya sökümü, sigortalı ambalaj ve yazılı fiyat.',
    govde: `<p>Kula’da koruma altındaki evlerde çalışmak, sıradan bir taşımadan iki noktada ayrılıyor. Birincisi: kapı boşluğu, merdiven genişliği ve sahanlık olduğu gibi kalıyor; genişletme ya da söküp yerine takma seçeneği yok. Bu yüzden geçmeyen parçayı yapıya değil, eşyaya müdahale ederek geçiriyoruz — mobilya yerinde sökülüyor.</p><p>İkincisi: yapının kendisi taşıma boyunca korunuyor. Ahşap korkuluk, kapı sövesi, merdiven basamağı ve duvar köşeleri örtüyle kaplanıyor; hiçbir parça duvara yaslanarak taşınmıyor. Kula’da <strong>evden eve nakliyat</strong> yaparken bu hazırlık işin başında yapılıyor ve süreye dahil ediliyor.</p>`,
    kunye: [
      { label: 'Ölçüler sabit', value: 'Kapı, merdiven ve sahanlık değiştirilemiyor; çözüm eşyada aranıyor.' },
      { label: 'Söküm', value: 'Geçmeyen mobilya yerinde sökülüp yeni adreste kuruluyor.' },
      { label: 'Yapı koruması', value: 'Korkuluk, söve, basamak ve duvar köşeleri örtüyle kaplanıyor.' },
      { label: 'Süre', value: 'Koruma hazırlığı işin başında yapılıyor ve süreye dahil ediliyor.' },
    ],
    guzergahlar: [
      { to: 'Alaşehir', note: 'Güneybatı yönü; yol süresi planlanıyor.' },
      { to: 'Salihli', note: 'Batıya geçiş; güzergâh düz.' },
      { to: 'Manisa', note: 'İl merkezi; mesafe hesaba katılıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Tescilli evde taşıma yapılabilir mi?', answer: 'Yapılabilir. Yapıya müdahale etmeden, koruma önlemleriyle çalışıyoruz.' },
      { question: 'Mobilya kapıdan geçmezse ne oluyor?', answer: 'Parçayı yerinde söküyoruz ve yeni adreste kuruyoruz; kapı ya da merdivene dokunmuyoruz.' },
      { question: 'Ahşap yüzeyler zarar görür mü?', answer: 'Korkuluk, söve ve basamaklar örtüyle kaplanıyor; hiçbir parça duvara yaslanarak taşınmıyor.' },
    ],
  },
]

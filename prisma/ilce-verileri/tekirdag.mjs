// prisma/ilce-verileri/tekirdag.mjs
//
// Tekirdağ'ın 11 ilçesinden 8'i. ÜÇÜ BİLEREK ATLANDI.
//
// ATLANANLAR: Hayrabolu, Muratlı, Marmaraereğlisi
//   İlk ikisi küçük nüfuslu ve aramada karşılığı düşük.
//   Marmaraereğlisi ÖZELLİKLE çıkarıldı: doğal ekseni sahil ve yazlık
//   yoğunluğu olurdu, o eksen on ayrı ilçede kullanıldı (Çeşme, Dikili,
//   Foça, Seferihisar, Karataş, Kemer, Manavgat, Selçuk, Mudanya,
//   Kızılcahamam).
//
// DERİNLİK: 'tam' (3) / 'orta' (5)
//
// BU İLİN İKİ BASKIN TEMASI DA KAPALI
//   · İstanbul yönüne taşıma → Kocaeli/Gebze'de kullanıldı ("taşımaların
//     büyük bölümü İstanbul yönüne, plan varış trafiği üzerine kurulu").
//     Tekirdağ'da bu çerçeveye hiç girilmiyor.
//   · Organize sanayi / işyeri → İzmir/Kemalpaşa, Çiğli, Aliağa, Torbalı;
//     Ankara/Kahramankazan, Akyurt; Trabzon/Arsin; Kocaeli/Çayırova.
//     Çerkezköy sanayi ilçesi ama sayfası OSB ve vardiya üzerinden değil,
//     BİLGİSAYAR VE SUNUCU SİSTEMLERİ üzerinden yazıldı — bu, Arsin'in
//     rafından, Karatay'ın tezgâhından, Kocasinan'ın üretim hattından ve
//     Honaz'ın numune odasından farklı bir yük tipi.
//
// EKSENLER YİNE İŞİN AŞAMALARINDAN
//   Manisa'dan beri süren yaklaşım: aktarmasız yük, eski evin teslimi,
//   sunucu sistemleri, tek ağır özel parça, sözleşme ve erteleme, kitap
//   ağırlığı, zemin koruması, taşınmayan değerli eşya. Hiçbiri başka bir
//   ilde kullanılmadı.
//
// ŞEHZADELER'DEN AYRIM
//   Manisa/Şehzadeler'de "komşuları ve yönetimi bilgilendirip alanı boş
//   tutma" geçiyor. Bu ilde hiçbir ilçede komşu bildirimi ekseni
//   kullanılmıyor; Şarköy'ün ekseni bildirim değil, TAŞIMADIĞIMIZ eşya.
//
// MAHALLELER
//   Tamamı boş bırakıldı; Tekirdağ mahalle adları konusunda doğrulanmış
//   bilgim yok. (Aynı kural Denizli, Manisa, Aydın ve Şanlıurfa'da da
//   uygulandı.)
//
// Ortak kurallar: uydurma mahalle/rakam yok, "evden eve nakliyat" sayfa
// başına tam bir kez. (bkz. izmir.mjs başlığındaki ayrıntılı gerekçe)

export const il = { ad: 'Tekirdağ', plaka: 59 }

export const ilceler = [
  // ───────────────────────── TAM DERİNLİK (3) ─────────────────────────
  {
    ad: 'Çorlu',
    derinlik: 'tam',
    ozet:
      'Çorlu’dan yapılan uzun mesafeli taşımalarda yük başka müşterinin yüküyle birleştirilmiyor ve yolda araç değiştirmiyor.',
    metaAciklama:
      'Çorlu evden eve nakliyat: aktarmasız ve tek araçla taşıma, mühürlü kasa, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Uzun mesafeli taşımalarda iki farklı çalışma biçimi var. Birincisinde birkaç müşterinin yükü aynı araca yükleniyor ve araç güzergâh üzerinde tek tek boşaltıyor; ikincisinde araç yalnızca sizin yükünüzü taşıyor. İlki daha ucuz görünüyor ama teslim tarihi başkalarının programına bağlı hâle geliyor ve yük yolda birden fazla kez elleniyor.</p><p>Çorlu’dan çıkan işlerde ikinci yöntemle çalışıyoruz: yükleme sizin adresinizde yapılıyor, kasa kapanıyor ve bir sonraki açılış varış adresinde oluyor. Yolda aktarma yok, başka yük yok. Çorlu’da <strong>evden eve nakliyat</strong> teklifinde teslim tarihi bu yüzden aralık değil, gün olarak verilebiliyor.</p><p>Bu yöntemin karşılığı fiyata yansıyor ve bunu saklamıyoruz — aracın tamamını kullanıyorsunuz. Buna karşılık eşyanın kaç kez elleneceği, ne kadar bekleyeceği ve ne zaman teslim edileceği baştan belli oluyor. Hangisinin size uygun olduğunu keşifte konuşuyoruz.</p>`,
    kunye: [
      { label: 'Aktarma yok', value: 'Kasa yüklemede kapanıyor, bir sonraki açılış varış adresinde.' },
      { label: 'Yük birleştirme yok', value: 'Araçta başka müşterinin yükü bulunmuyor.' },
      { label: 'Teslim tarihi', value: 'Aralık değil, gün olarak verilebiliyor.' },
      { label: 'Fiyat', value: 'Aracın tamamı kullanıldığı için farkı var; keşifte açıkça konuşuluyor.' },
    ],
    guzergahlar: [
      { to: 'Süleymanpaşa', note: 'Güneybatı aksı; Tekirdağ merkezi, günübirlik.' },
      { to: 'Çerkezköy', note: 'Kuzeye geçiş; kısa mesafe.' },
      { to: 'Ergene', note: 'Batıya geçiş; güzergâh düz.' },
      { to: 'Tekirdağ', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Eşyam başka müşterinin eşyasıyla birlikte mi taşınıyor?',
        answer:
          'Taşınmıyor. Araçta yalnızca sizin yükünüz oluyor; kasa yüklemede kapanıp varışta açılıyor.',
      },
      {
        question: 'Uzun mesafede eşya aktarma yapılıyor mu?',
        answer:
          'Yapılmıyor. Yük yolda başka araca geçmiyor, bu yüzden ellenme sayısı en aza iniyor.',
      },
      {
        question: 'Teslim tarihi kesin mi?',
        answer:
          'Aktarma ve bekleme olmadığı için gün olarak verilebiliyor; başka bir müşterinin programına bağlı kalmıyor.',
      },
      {
        question: 'Verilen fiyat sonradan değişir mi?',
        answer:
          'Değişmiyor. Keşif sonrası verilen yazılı fiyat taşıma gününe kadar geçerli kalıyor.',
      },
    ],
  },

  {
    ad: 'Süleymanpaşa',
    derinlik: 'tam',
    ozet:
      'Süleymanpaşa’da iş yeni evde bitmiyor; eski evin boş, temiz ve teslim edilebilir hâlde bırakılması da plana giriyor.',
    metaAciklama:
      'Süleymanpaşa evden eve nakliyat: eski evin teslim hazırlığı ve ambalaj atığı toplama dahil, yazılı sabit fiyat.',
    govde: `<p>Süleymanpaşa’da kiralık konut hareketi yüksek ve taşınmaların çoğu bir teslimle bitiyor. Yeni eve yerleşmek işin yarısı; diğer yarısı eski evi teslim edilebilir hâlde bırakmak. Bu kısım genellikle plana yazılmıyor ve taşıma bittikten sonra tek başına kalınan bir işe dönüşüyor.</p><p>Biz eski evi de listeye alıyoruz. Yükleme bittikten sonra ambalaj atığı, eski koliler ve taşınmayan küçük parçalar ortada bırakılmıyor; duvardan sökülen askı, raf ve perde aparatlarının bıraktığı izler size gösteriliyor. Süleymanpaşa’da <strong>evden eve nakliyat</strong> planında eski evin son hâlini fotoğrafla kaydediyoruz — ev sahibiyle sonradan yaşanabilecek tartışmada elinizde kayıt oluyor.</p><p>Boya ve tamir işi bizim işimiz değil, bunu net söylüyoruz. Ama neyin eksik kaldığını taşıma günü görmek, iki hafta sonra öğrenmekten çok daha kolay çözülüyor.</p>`,
    kunye: [
      { label: 'İki adresli iş', value: 'Yeni eve yerleşmek kadar eski evi teslim edilebilir bırakmak da plana giriyor.' },
      { label: 'Ortada kalanlar', value: 'Ambalaj atığı, eski koli ve taşınmayan küçük parçalar bırakılmıyor.' },
      { label: 'Kayıt', value: 'Eski evin son hâli fotoğrafla kaydediliyor.' },
      { label: 'Kapsam dışı', value: 'Boya ve tamir işi yapılmıyor; eksikler taşıma günü gösteriliyor.' },
    ],
    guzergahlar: [
      { to: 'Çorlu', note: 'Kuzeydoğu aksı; günübirlik.' },
      { to: 'Malkara', note: 'Batıya geçiş; yol süresi planlanıyor.' },
      { to: 'Şarköy', note: 'Güneybatı yönü; sahil hattı.' },
      { to: 'Tekirdağ', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Eski evdeki kolileri ve ambalajı siz mi topluyorsunuz?',
        answer:
          'Topluyoruz. Ambalaj atığı ve taşınmayan küçük parçalar ortada bırakılmıyor.',
      },
      {
        question: 'Duvarda kalan izler için ne yapıyorsunuz?',
        answer:
          'Askı, raf ve perde aparatlarını söküyoruz; bıraktıkları izleri size gösteriyoruz. Boya ve tamir işi kapsam dışı.',
      },
      {
        question: 'Ev sahibiyle sorun çıkarsa elimde ne olacak?',
        answer:
          'Eski evin son hâlini fotoğrafla kaydediyoruz; bu kayıt sizde kalıyor.',
      },
      {
        question: 'Keşif ücretli mi?',
        answer: 'Keşif ücretsiz. Eski evin teslim durumunu da o sırada konuşuyoruz.',
      },
    ],
  },

  {
    ad: 'Çerkezköy',
    derinlik: 'tam',
    ozet:
      'Çerkezköy’deki işyeri taşımalarında en riskli yük bilgisayar ve sunucu sistemleri; kablo düzeni sökülmeden önce kaydediliyor.',
    metaAciklama:
      'Çerkezköy evden eve nakliyat ve işyeri taşıma: bilgisayar ve sunucu sistemlerinde kablo düzeni korunarak taşıma.',
    govde: `<p>Çerkezköy’de gelen işyeri taşımalarında masa ve dolap kolay kısım. Zor kısım bilgisayarlar, sunucu dolabı, ağ cihazları ve bunları birbirine bağlayan kablo düzeni oluyor. Bu düzen bir kez söküldüğünde, hangi kablonun nereye gittiğini hatırlamak çoğu zaman mümkün olmuyor.</p><p>Bu yüzden söküme başlamadan önce arka panelin fotoğrafını çekiyor, her kabloyu iki ucundan etiketliyoruz. Cihazlar kendi kutusu ya da darbe emici ambalajla taşınıyor; sunucu dolabı boşaltılmadan hareket ettirilmiyor. Çerkezköy’de <strong>evden eve nakliyat</strong> ekibimizin yanında bu işlerde kayıt tutan ayrı bir kişi bulunuyor.</p><p>Kurulumu biz yapıyoruz ama sistemi açma ve çalıştığını doğrulama işini sizin bilgi işlem sorumlunuzla birlikte yapıyoruz. Kablolar yerine takıldıktan sonra cihazların açılışını birlikte görmeden adresten ayrılmıyoruz.</p>`,
    kunye: [
      { label: 'Riskli yük', value: 'Bilgisayar, sunucu dolabı, ağ cihazları ve kablo düzeni.' },
      { label: 'Kayıt', value: 'Söküm öncesi arka panel fotoğraflanıyor, her kablo iki ucundan etiketleniyor.' },
      { label: 'Taşıma', value: 'Cihazlar darbe emici ambalajla; sunucu dolabı boşaltılmadan hareket ettirilmiyor.' },
      { label: 'Devir', value: 'Açılış, bilgi işlem sorumlusuyla birlikte görülmeden adresten ayrılınmıyor.' },
    ],
    guzergahlar: [
      { to: 'Kapaklı', note: 'Komşu ilçe; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Çorlu', note: 'Güneye geçiş; günübirlik.' },
      { to: 'Saray', note: 'Kuzeydoğu yönü; güzergâh düz.' },
      { to: 'Tekirdağ', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Sunucu ve bilgisayarlarımızı taşıtabilir miyiz?',
        answer:
          'Taşıtabilirsiniz. Söküm öncesi kablo düzenini fotoğraflayıp etiketliyoruz; kurulumda aynı düzen kuruluyor.',
      },
      {
        question: 'Kablolar karışırsa ne olur?',
        answer:
          'Karışmaması için her kablo iki ucundan etiketleniyor. Ayrıca söküm öncesi arka panelin fotoğrafı çekiliyor.',
      },
      {
        question: 'Sistemin çalıştığını kim doğruluyor?',
        answer:
          'Kurulum sonrası açılışı sizin bilgi işlem sorumlunuzla birlikte görüyoruz; öncesinde adresten ayrılmıyoruz.',
      },
      {
        question: 'İşyeri taşıması çalışmayı kaç gün durdurur?',
        answer:
          'Hedefimiz durdurmamak. İşi mesai dışına ya da hafta sonuna planlıyoruz.',
      },
    ],
  },

  // ───────────────────────── ORTA DERİNLİK (5) ─────────────────────────
  {
    ad: 'Kapaklı',
    derinlik: 'orta',
    ozet:
      'Kapaklı’da piyano, çelik kasa ve koşu bandı gibi tek başına ağır parçalar için ayrı ekip ve ekipman planlanıyor.',
    metaAciklama:
      'Kapaklı evden eve nakliyat: piyano, kasa ve ağır spor aleti taşıma için ayrı ekipman. Yazılı sabit fiyat.',
    govde: `<p>Kapaklı’daki taşımalarda zaman zaman tek bir parça, evin geri kalanından daha çok planlama gerektiriyor: piyano, çelik para kasası, büyük akvaryum kaidesi ya da koşu bandı. Bunlar ağırlığı tek noktada toplanan parçalar; normal ekip ve normal ekipmanla kaldırılmıyor.</p><p>Bu parçalar için ayrı ekipman getiriyor, ekibi büyütüyor ve gerekiyorsa merdiven yerine dış cephe asansörü planlıyoruz. Kapaklı’da <strong>evden eve nakliyat</strong> keşfinde bu tip bir parça varsa onu ayrı ölçüyor, ağırlığını soruyor ve teklifte ayrı satırda gösteriyoruz.</p>`,
    kunye: [
      { label: 'Tek ağır parça', value: 'Piyano, çelik kasa, ağır spor aleti; ağırlık tek noktada toplanıyor.' },
      { label: 'Ekipman', value: 'Ayrı ekipman ve büyütülmüş ekip; gerekirse dış cephe asansörü.' },
      { label: 'Teklif', value: 'Ayrı ölçülüyor ve teklifte ayrı satırda gösteriliyor.' },
    ],
    guzergahlar: [
      { to: 'Çerkezköy', note: 'Komşu ilçe; kısa mesafe.' },
      { to: 'Çorlu', note: 'Güneye geçiş; günübirlik.' },
      { to: 'Tekirdağ', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Piyanomu taşır mısınız?', answer: 'Taşıyoruz. Ayrı ekipman ve büyütülmüş ekiple çalışıyoruz; keşifte ayrı ölçüyoruz.' },
      { question: 'Çelik kasa merdivenden iner mi?', answer: 'Ağırlığına göre değişiyor. İnmiyorsa dış cephe asansörü planlıyoruz.' },
      { question: 'Bu parçalar fiyatı nasıl etkiliyor?', answer: 'Teklifte ayrı satırda gösteriliyor; ne kadar eklediğini baştan görüyorsunuz.' },
    ],
  },

  {
    ad: 'Ergene',
    derinlik: 'orta',
    ozet:
      'Ergene’de randevu alınırken erteleme ve iptal koşulları da yazılıyor; tarih değişikliği sözlü kalmıyor.',
    metaAciklama:
      'Ergene evden eve nakliyat: yazılı erteleme ve iptal koşulları, sigortalı ambalaj ve sabit fiyat.',
    govde: `<p>Ergene’de taşınma tarihleri sık değişiyor — tapu, kira ya da tadilat kaynaklı. Bu normal, ama sözlü konuşulan bir tarih değişikliği sonradan iki tarafın da farklı hatırladığı bir şeye dönüşebiliyor.</p><p>Bu yüzden randevuyla birlikte erteleme ve iptal koşullarını da yazıyoruz: hangi süre içinde tarih değişikliğinin ücretsiz olduğu, hangi durumda ekip ve araç zaten ayrıldığı için maliyet doğduğu. Ergene’de <strong>evden eve nakliyat</strong> sözleşmesinde bu maddeler baştan bulunuyor ve tarih değiştiğinde yazılı olarak güncelleniyor.</p>`,
    kunye: [
      { label: 'Tarih değişikliği', value: 'Tapu, kira ve tadilat kaynaklı değişiklikler sık; sözlü bırakılmıyor.' },
      { label: 'Yazılı koşullar', value: 'Ücretsiz erteleme süresi ve maliyet doğuran durumlar sözleşmede.' },
      { label: 'Güncelleme', value: 'Tarih değiştiğinde sözleşme yazılı olarak güncelleniyor.' },
    ],
    guzergahlar: [
      { to: 'Çorlu', note: 'Doğuya geçiş; güzergâh düz.' },
      { to: 'Süleymanpaşa', note: 'Güney yönü; Tekirdağ merkezi.' },
      { to: 'Tekirdağ', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Tarihi değiştirebilir miyim?', answer: 'Değiştirebilirsiniz. Ücretsiz erteleme süresi sözleşmede yazılı; o süre içindeyse ek maliyet doğmuyor.' },
      { question: 'Son anda iptal edersem ne oluyor?', answer: 'Ekip ve araç ayrılmışsa maliyet doğuyor. Hangi durumda ne olacağı baştan yazılı.' },
      { question: 'Değişikliği nasıl bildiriyorum?', answer: 'Bildirdiğinizde sözleşmeyi yazılı olarak güncelliyoruz; iki tarafta da aynı metin oluyor.' },
    ],
  },

  {
    ad: 'Saray',
    derinlik: 'orta',
    ozet:
      'Saray’da kitap ve dosya gibi ağır küçük eşyalar büyük koliye konmuyor; koli boyutu ağırlığa göre seçiliyor.',
    metaAciklama:
      'Saray evden eve nakliyat: kitap ve ağır küçük eşya için doğru koli boyutu, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Saray’daki taşımalarda en sık düzelttiğimiz hata, kitapların büyük koliye doldurulması oluyor. Büyük koli kitapla dolduğunda taşınamayacak ağırlığa ulaşıyor; ya dibi açılıyor ya da kaldırmaya çalışan kişi zorlanıyor. Aynı sorun dosya, konserve ve alet çantası için de geçerli.</p><p>Çözüm basit: ağır ve küçük hacimli eşya küçük koliye, hafif ve hacimli eşya büyük koliye. Saray’da <strong>evden eve nakliyat</strong> öncesi malzeme bırakırken koli boyutlarını buna göre karışık veriyoruz ve hangisinin neye ayrıldığını söylüyoruz.</p>`,
    kunye: [
      { label: 'Sık yapılan hata', value: 'Kitap ve dosyanın büyük koliye doldurulması; koli taşınamaz hâle geliyor.' },
      { label: 'Kural', value: 'Ağır ve küçük hacimli eşya küçük koliye, hafif ve hacimli eşya büyük koliye.' },
      { label: 'Malzeme', value: 'Koli boyutları karışık veriliyor, hangisinin neye ayrıldığı söyleniyor.' },
    ],
    guzergahlar: [
      { to: 'Çerkezköy', note: 'Güneybatı aksı; güzergâh düz.' },
      { to: 'Kapaklı', note: 'Güney yönü; kısa mesafe.' },
      { to: 'Tekirdağ', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Kitaplarımı hangi koliye koymalıyım?', answer: 'Küçük koliye. Büyük koli kitapla dolunca taşınamaz ağırlığa ulaşıyor ve dibi açılabiliyor.' },
      { question: 'Koli boyutlarını siz mi belirliyorsunuz?', answer: 'Malzemeyi karışık boyutlarda bırakıyor, hangisinin neye ayrıldığını söylüyoruz.' },
      { question: 'Paketlemeyi siz yaparsanız fark eder mi?', answer: 'Biz paketlediğimizde bu ayrımı zaten yapıyoruz; ağırlık dağılımı baştan doğru kuruluyor.' },
    ],
  },

  {
    ad: 'Malkara',
    derinlik: 'orta',
    ozet:
      'Malkara’da taşıma başlamadan önce iki evin de zemini ve giriş yolu örtülüyor; iz ve çizik sonradan konuşulmuyor.',
    metaAciklama:
      'Malkara evden eve nakliyat: zemin ve giriş koruması, sigortalı ambalaj ve montaj, yazılı sabit fiyat.',
    govde: `<p>Malkara’daki işlerde taşımanın ilk adımı eşyaya değil zemine dokunuyor. Laminat, parke ve seramik yüzeyler ağır parça sürtündüğünde iz alıyor; yağmurlu bir günde giriş yolundan taşınan çamur da halıya ve merdivene çıkıyor. İkisi de taşıma bittikten sonra fark ediliyor ve o noktada kimin yaptığı tartışılıyor.</p><p>Bu yüzden çalışmaya başlamadan önce iki adreste de zemin koruması seriyor, merdiven basamaklarını ve kapı çevresini örtüyoruz. Malkara’da <strong>evden eve nakliyat</strong> ekibi yağışlı günlerde ayakkabı kılıfı kullanıyor; hazırlık on beş dakika sürüyor ve sonrasında konuşulacak bir iz kalmıyor.</p>`,
    kunye: [
      { label: 'Zemin', value: 'Laminat, parke ve seramik yüzeylere koruma seriliyor.' },
      { label: 'Giriş yolu', value: 'Merdiven basamakları ve kapı çevresi örtülüyor; yağışta ayakkabı kılıfı.' },
      { label: 'İki adres', value: 'Koruma hem çıkılan hem girilen evde yapılıyor.' },
    ],
    guzergahlar: [
      { to: 'Süleymanpaşa', note: 'Doğuya geçiş; Tekirdağ merkezi, yol süresi planlanıyor.' },
      { to: 'Şarköy', note: 'Güney yönü; güzergâh düz.' },
      { to: 'Tekirdağ', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Parkelerim çizilir mi?', answer: 'Çizilmemesi için taşıma öncesi zemin koruması seriyoruz; ağır parçalar sürüklenmiyor.' },
      { question: 'Yağmurlu günde ev kirlenir mi?', answer: 'Giriş yolu ve merdiven örtülüyor, ekip ayakkabı kılıfı kullanıyor.' },
      { question: 'Koruma hazırlığı süreyi uzatır mı?', answer: 'On beş dakika civarında sürüyor ve sonradan çıkacak tartışmayı tamamen ortadan kaldırıyor.' },
    ],
  },

  {
    ad: 'Şarköy',
    derinlik: 'orta',
    ozet:
      'Şarköy’de nakit, mücevher ve resmî evrak taşınacak eşya listesine alınmıyor; bunlar sahibinin yanında kalıyor.',
    metaAciklama:
      'Şarköy evden eve nakliyat: taşınmayan değerli eşya kuralı ve sigorta kapsamı, yazılı sabit fiyat.',
    govde: `<p>Şarköy’deki işlerde taşımadan önce söylediğimiz şeylerden biri, neyi taşımadığımız oluyor. Nakit para, ziynet eşyası, tapu ve kimlik gibi resmî evrak, ilaç reçetesi ve benzeri belgeler araca yüklenmiyor. Bunun sebebi güvensizlik değil; bu kalemler taşıma sigortasının kapsamı dışında kalıyor ve kaybolması hâlinde telafisi olmuyor.</p><p>Bu eşyaları taşınma günü kendi yanınızda taşımanızı istiyoruz. Şarköy’de <strong>evden eve nakliyat</strong> keşfinde bu listeyi okuyor, kolilere karışmaması için ayrı bir çanta hazırlamanızı söylüyoruz — çünkü koliye girdikten sonra hangi kutuda olduğunu bulmak günler alabiliyor.</p>`,
    kunye: [
      { label: 'Taşınmayanlar', value: 'Nakit, ziynet eşyası ve resmî evrak araca yüklenmiyor.' },
      { label: 'Sebep', value: 'Bu kalemler taşıma sigortasının kapsamı dışında kalıyor.' },
      { label: 'Öneri', value: 'Taşınma günü ayrı bir çantada, sahibinin yanında taşınıyor.' },
    ],
    guzergahlar: [
      { to: 'Süleymanpaşa', note: 'Kuzeydoğu aksı; Tekirdağ merkezi, yol süresi planlanıyor.' },
      { to: 'Malkara', note: 'Kuzey yönü; güzergâh düz.' },
      { to: 'Tekirdağ', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Altınlarımı ve paramı taşır mısınız?', answer: 'Taşımıyoruz. Bu kalemler sigorta kapsamı dışında kalıyor; taşınma günü yanınızda taşımanızı istiyoruz.' },
      { question: 'Tapu ve kimlik gibi evraklar için ne yapmalıyım?', answer: 'Ayrı bir çantada tutun. Koliye girdiğinde hangi kutuda olduğunu bulmak günler alabiliyor.' },
      { question: 'Sigorta neyi kapsıyor?', answer: 'Taşınan ev eşyasını kapsıyor. Kapsam ve poliçe bilgisi sözleşmede yazılı oluyor.' },
    ],
  },
]

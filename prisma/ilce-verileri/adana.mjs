// prisma/ilce-verileri/adana.mjs
//
// Adana'nın 15 ilçesinden 11'i. Dördü BİLEREK ATLANDI.
//
// ATLANANLAR: Saimbeyli, Tufanbeyli, Aladağ, Feke
//   Dördü de Toroslar'ın iç kesiminde, küçük nüfuslu ve nakliyat aramasında
//   karşılığı yok denecek kadar az. Yazacak doğrulanabilir bilgi de yok.
//
// DERİNLİK: 'tam' (6) / 'orta' (5)
//
// ADANA'YA ÖZGÜ EKSEN: SICAK
// Yaz aylarındaki sıcaklık burada "biraz sıcak" değil, işin planını
// değiştiren bir kısıt. Ancak bunu 11 sayfanın hepsinde tekrarlamak kopya
// içerik üretirdi; sıcak yalnızca Seyhan'da ana eksen olarak kullanıldı,
// diğerlerinde geçmiyor.
//
// Ortak kurallar: uydurma mahalle/rakam yok, her metin farklı bir eksenden,
// "evden eve nakliyat" sayfa başına tam bir kez.
// (bkz. izmir.mjs başlığındaki ayrıntılı gerekçe)

export const il = { ad: 'Adana', plaka: 1 }

export const ilceler = [
  // ───────────────────────── TAM DERİNLİK (6) ─────────────────────────
  {
    ad: 'Seyhan',
    derinlik: 'tam',
    ozet:
      'Adana’nın merkez ilçesi Seyhan’da yaz sıcağı, taşımanın saatini eşya hacminden önce belirliyor.',
    metaAciklama:
      'Seyhan evden eve nakliyat: sıcağa göre planlanan çalışma saati, sigortalı taşıma ve yazılı sabit fiyat.',
    govde: `<p>Seyhan’da yaz aylarında taşımanın planını sıcaklık belirliyor. Gün ortasında hem ekibin çalışma hızı düşüyor hem eşya için risk artıyor: ahşap mobilya ve elektronik cihazlar sıcak bir aracın içinde saatlerce bekletilmemeli. Bu yüzden yaz taşımalarını gün doğumunda başlatıyor, yüklemeyi öğleden önce bitirip aracı yola çıkarıyoruz.</p><p>Yapı dokusu ilçe içinde değişiyor. Tepebağ ve çevresindeki eski mahallelerde sokaklar dar, binalar asansörsüz; merkezin yeni bloklarında ise yük asansörü ve otopark var. Seyhan’da <strong>evden eve nakliyat</strong> teklifi verirken adresin hangi dokuda olduğunu bilmek şart.</p><p>İl merkezi olması nedeniyle ilçe içi taşıma oranı yüksek. Yakın adres değişikliklerinde yol süresi neredeyse hiç yok, iş çoğunlukla yarım günde tamamlanıyor.</p>`,
    kunye: [
      { label: 'Yaz sıcağı', value: 'Gün ortası çalışma hızını düşürüyor; yaz işleri gün doğumunda başlatılıyor.' },
      { label: 'Eşya riski', value: 'Ahşap ve elektronik sıcak araçta bekletilmiyor; yükleme öğleden önce bitiriliyor.' },
      { label: 'Yapı farkı', value: 'Eski mahallelerde dar sokak ve asansörsüz bina, yeni bloklarda yük asansörü.' },
      { label: 'İlçe içi taşıma', value: 'Merkez ilçe olduğu için yakın adres değişiklikleri yaygın.' },
      { label: 'Ambalaj', value: 'Sıcakta streç yerine nefes alan örtü tercih ediliyor.' },
    ],
    guzergahlar: [
      { to: 'Çukurova', note: 'Kuzeye geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Yüreğir', note: 'Nehrin doğusu; köprü güzergâhı önceden belirleniyor.' },
      { to: 'Sarıçam', note: 'Kuzeydoğu aksı; adresler arası mesafe hesaba katılıyor.' },
      { to: 'Ceyhan', note: 'Doğuya geçiş; ova yolu, süre öngörülebilir.' },
    ],
    mahalleler: ['Tepebağ', 'Kurtuluş', 'Reşatbey', 'Cemalpaşa', 'Gürselpaşa', 'Mithatpaşa'],
    sorular: [
      {
        question: 'Yaz ortasında taşınmak zorundayım, eşyalarıma zarar gelir mi?',
        answer:
          'Planlı yapıldığında gelmez. İşi gün doğumunda başlatıyor, yüklemeyi öğleden önce bitiriyoruz; eşya sıcak araçta uzun süre kalmıyor.',
      },
      {
        question: 'Öğleden sonra çalışıyor musunuz?',
        answer:
          'Yazın mümkün olduğunca çalışmıyoruz. Gerekirse işi ikiye bölüp sabah ve akşamüstü olarak planlıyoruz.',
      },
      {
        question: 'Eski mahallede binamız asansörsüz, ek ücret çıkar mı?',
        answer:
          'Ek ekip ya da dış cephe asansörü gerekiyorsa keşifte belirlenip fiyata baştan dahil ediliyor.',
      },
      {
        question: 'Verilen fiyat sonradan değişir mi?',
        answer:
          'Değişmiyor. Keşif sonrası verilen yazılı fiyat taşıma gününe kadar geçerli kalıyor.',
      },
    ],
  },

  {
    ad: 'Çukurova',
    derinlik: 'tam',
    ozet:
      'Adana’da taşınılan yön çoğunlukla Çukurova’ya doğru; bu yüzden burada asıl planlama varış tarafında yapılıyor.',
    metaAciklama:
      'Çukurova evden eve nakliyat: varış tarafı planlanmış taşıma, sigortalı ambalaj ve yazılı sabit fiyat.',
    govde: `<p>Çukurova, Adana’da taşınma trafiğinin yönünü gösteren ilçe. İşlerin önemli bir bölümü buraya doğru geliyor: aileler merkez ilçelerden daha büyük dairelere geçiyor. Bunun taşımaya yansıması şu — çıkılan ev küçük, girilen ev büyük oluyor ve eşya hacmi yolda değişmese de yerleştirme süresi uzuyor. Ekip planını buna göre kuruyoruz.</p><p>İlçedeki yerleşim büyük ölçüde planlı; bulvarlar geniş, blokların çoğunda yük asansörü ve kapalı otopark var. Çukurova’da <strong>evden eve nakliyat</strong> işlerinde yükleme tarafı nadiren sorun çıkarıyor; asıl konu varış adresinde asansör saatinin ayarlanması oluyor.</p><p>Merkez ilçelere yakınlık mesafeyi kısaltıyor. Seyhan ve Yüreğir yönündeki taşımalar çoğunlukla tek günde, hatta yarım günde tamamlanıyor.</p>`,
    kunye: [
      { label: 'Taşınma yönü', value: 'İşlerin önemli bölümü buraya doğru; çıkılan ev küçük, girilen ev büyük oluyor.' },
      { label: 'Yerleştirme süresi', value: 'Büyük eve geçişte yerleştirme uzuyor; ekip planı buna göre kuruluyor.' },
      { label: 'Planlı yerleşim', value: 'Geniş bulvarlar, yük asansörü ve kapalı otopark yaygın.' },
      { label: 'Varış tarafı', value: 'Asıl konu varış adresinde asansör saatinin ayarlanması.' },
    ],
    guzergahlar: [
      { to: 'Seyhan', note: 'Güneye geçiş; kısa mesafe, iş yarım günde bitebiliyor.' },
      { to: 'Sarıçam', note: 'Doğuya geçiş; düz güzergâh.' },
      { to: 'Yüreğir', note: 'Nehrin doğusu; köprü güzergâhı önceden belirleniyor.' },
      { to: 'Karaisalı', note: 'Kuzeye geçiş; yol süresi planlanıyor.' },
    ],
    mahalleler: ['Toros', 'Güzelyalı', 'Kurttepe', 'Belediye Evleri', 'Huzurevleri', 'Yurt'],
    sorular: [
      {
        question: 'Daha büyük bir eve taşınıyorum, süre uzar mı?',
        answer:
          'Yerleştirme tarafı uzuyor. Ekip sayısını buna göre planlıyoruz ki iş aynı güne sığsın.',
      },
      {
        question: 'Varış adresinde asansör kullanımı için izin gerekiyor mu?',
        answer:
          'Çoğu blokta gerekiyor. İzni ve saati biz yönetimle görüşerek ayarlıyoruz; araç kapıda beklemiyor.',
      },
      {
        question: 'Mobilya söküm ve montajı dahil mi?',
        answer:
          'Marangozlu söküm ve montaj hizmetimiz var; talep ederseniz teklife dahil ediliyor.',
      },
      {
        question: 'Keşif ücretli mi?',
        answer:
          'Keşif ücretsiz. Hem çıkılan hem girilen adresi görmek istiyorsak ikisine de geliyoruz.',
      },
    ],
  },

  {
    ad: 'Yüreğir',
    derinlik: 'tam',
    ozet:
      'Seyhan nehrinin doğusunda kalan Yüreğir’de güzergâhı belirleyen şey hangi köprünün kullanılacağı oluyor.',
    metaAciklama:
      'Yüreğir evden eve nakliyat: köprü güzergâhı planlanmış taşıma, sigortalı ambalaj ve yazılı sabit fiyat.',
    govde: `<p>Yüreğir, Seyhan nehrinin doğu yakasında ve bu coğrafi ayrım taşımanın planını doğrudan etkiliyor. Şehrin batı tarafına yapılan her iş bir köprü geçişi demek; hangi köprünün kullanılacağı ve o köprüdeki yoğunluk, yol süresini bazen mesafeden daha fazla belirliyor. Güzergâhı taşımadan önce çıkarıyoruz.</p><p>Yapı dokusu karışık. Merkeze yakın mahallelerde yoğun apartmanlaşma var; kırsala doğru gidildikçe müstakil evler ve tarım alanları başlıyor. Yüreğir’de <strong>evden eve nakliyat</strong> teklifi hazırlarken müstakil adreslerde bahçe ve depo eşyasını da hacme dahil ediyoruz.</p><p>İlçe içi taşımalar köprü kullanmadığı için belirgin şekilde hızlı. Bu işlerin çoğu yarım günde tamamlanıyor.</p>`,
    kunye: [
      { label: 'Nehir ayrımı', value: 'Batı yakasına her iş bir köprü geçişi; güzergâh önceden çıkarılıyor.' },
      { label: 'Köprü yoğunluğu', value: 'Yol süresini bazen mesafeden çok köprüdeki yoğunluk belirliyor.' },
      { label: 'Karışık doku', value: 'Merkeze yakın apartmanlaşma, kırsala doğru müstakil ev ve tarım alanı.' },
      { label: 'İlçe içi', value: 'Köprü kullanılmadığı için ilçe içi işler yarım günde bitiyor.' },
    ],
    guzergahlar: [
      { to: 'Seyhan', note: 'Köprü geçişi; güzergâh ve saat önceden belirleniyor.' },
      { to: 'Sarıçam', note: 'Kuzeye geçiş; köprüsüz güzergâh, iş aynı gün bitiyor.' },
      { to: 'Ceyhan', note: 'Doğuya geçiş; ova yolu.' },
      { to: 'Karataş', note: 'Güneye geçiş; yol süresi planlanıyor.' },
    ],
    mahalleler: ['Sinanpaşa', 'Kışla', 'Serinevler', 'Yavuzlar', 'Akıncılar'],
    sorular: [
      {
        question: 'Karşı yakaya taşınıyorum, köprü trafiği sorun olur mu?',
        answer:
          'Güzergâhı ve saati önceden belirleyerek bunu büyük ölçüde çözüyoruz. Yoğun saatlere denk gelmeyecek şekilde planlıyoruz.',
      },
      {
        question: 'Yüreğir içinde taşınıyorum, fiyat düşer mi?',
        answer:
          'Düşer. Köprü kullanılmadığı için yol süresi kısa; bu işlerin çoğu yarım günde bitiyor.',
      },
      {
        question: 'Bahçe ve depo eşyası hacme dahil mi?',
        answer:
          'Dahil. Müstakil adreslerde toplam hacmi artırdığı için keşifte gösterilmesi gerekiyor.',
      },
      {
        question: 'Eşyalarım sigortalı mı?',
        answer:
          'Bütün taşımalar sigortalı ve kapsam sözleşmede yazılı oluyor.',
      },
    ],
  },

  {
    ad: 'Sarıçam',
    derinlik: 'tam',
    ozet:
      'Hızla büyüyen ve geniş bir alana yayılan Sarıçam’da adresler birbirinden uzak; güzergâh planlaması şart.',
    metaAciklama:
      'Sarıçam evden eve nakliyat: dağınık yerleşime göre planlanan güzergâh, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Sarıçam son yıllarda hızla büyüdü ve bu büyüme dağınık oldu. Yeni konut alanları birbirinden uzak noktalarda yükseldi; ilçenin bir ucundan diğerine yapılan bir taşıma, komşu ilçeye yapılan bir işten daha uzun sürebiliyor. Bu yüzden burada güzergâhı keşif sırasında çıkarıyor, gün planını ona göre kuruyoruz.</p><p>Yeni yerleşim alanlarında erişim rahat: yollar geniş, araç bina önüne yanaşabiliyor ve bloklarda asansör bulunuyor. Sarıçam’da <strong>evden eve nakliyat</strong> işlerinde bina kaynaklı zorluk az; süreyi belirleyen şey mesafe ve hacim oluyor.</p><p>Merkez ilçelere bağlantı düzenli. Çukurova ve Yüreğir yönündeki taşımalar çoğunlukla tek günde tamamlanıyor.</p>`,
    kunye: [
      { label: 'Dağınık büyüme', value: 'Yeni konut alanları birbirinden uzak; ilçe içi mesafe uzun olabiliyor.' },
      { label: 'Güzergâh', value: 'Gün planı keşifte çıkarılan güzergâha göre kuruluyor.' },
      { label: 'Yeni yapı', value: 'Yollar geniş, araç yanaşması ve asansör kullanımı sorunsuz.' },
      { label: 'Bağlantı', value: 'Çukurova ve Yüreğir yönündeki işler tek günde tamamlanıyor.' },
    ],
    guzergahlar: [
      { to: 'Çukurova', note: 'Batıya geçiş; düz güzergâh, iş aynı gün bitiyor.' },
      { to: 'Yüreğir', note: 'Güneye geçiş; köprüsüz güzergâh.' },
      { to: 'İmamoğlu', note: 'Kuzeye geçiş; yol süresi planlanıyor.' },
      { to: 'Ceyhan', note: 'Doğuya geçiş; ova yolu.' },
    ],
    mahalleler: ['Balcalı', 'Yeşiloba', 'Suluca', 'İncirlik', 'Kürkçüler'],
    sorular: [
      {
        question: 'Sarıçam içinde taşınıyorum ama mesafe uzun, fiyat nasıl?',
        answer:
          'İlçe içi olsa da mesafe fiyata giriyor. Güzergâhı keşifte çıkarıp yol süresini yazılı fiyata yansıtıyoruz.',
      },
      {
        question: 'Yeni sitedeki dairemden taşınma ne kadar sürer?',
        answer:
          'Erişim rahat olduğu için süreyi hacim belirliyor. Orta ölçekli bir daire yarım gün ile bir gün arasında tamamlanıyor.',
      },
      {
        question: 'Site girişi için izin gerekiyor mu?',
        answer:
          'Bazı sitelerde gerekiyor; izni ve yükleme saatini biz yönetimle görüşerek ayarlıyoruz.',
      },
      {
        question: 'Ambalaj malzemesini siz mi sağlıyorsunuz?',
        answer:
          'Evet. Koli, balonlu naylon, streç ve mobilya battaniyesi ekiple birlikte geliyor.',
      },
    ],
  },

  {
    ad: 'Ceyhan',
    derinlik: 'tam',
    ozet:
      'Kendi merkezi ve ticareti olan Ceyhan’da taşımaların önemli bölümü Adana’ya gitmeden ilçe içinde tamamlanıyor.',
    metaAciklama:
      'Ceyhan evden eve nakliyat: ilçe içi ve şehirlerarası taşımalarda planlı hizmet, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Ceyhan, Adana’ya bağlı olmakla birlikte kendi merkezi, çarşısı ve ticari hayatı olan bir ilçe. Bunun taşımaya yansıması şu: işlerin önemli bir bölümü Adana’ya hiç gitmeden ilçe içinde tamamlanıyor. Bu taşımalarda yol süresi kısa, iş çoğunlukla yarım günde bitiyor ve fiyat belirgin şekilde uygun oluyor.</p><p>İlçe merkezindeki yerleşim düzenli; sokaklar araç geçişine uygun ve binaların çoğu orta katlı. Ceyhan’da <strong>evden eve nakliyat</strong> işlerinde bina kaynaklı zorluk nadiren gündeme geliyor.</p><p>Kırsal mahallelerde ise tablo değişiyor. Tarım alanlarındaki müstakil evlerde depo malzemesi, tarım aleti ve bahçe eşyası taşınacaklar listesine giriyor; bunlar standart mobilyadan farklı ambalaj ve sabitleme gerektiriyor.</p>`,
    kunye: [
      { label: 'Kendi merkezi', value: 'İşlerin önemli bölümü Adana’ya gitmeden ilçe içinde tamamlanıyor.' },
      { label: 'İlçe içi süre', value: 'Yol süresi kısa; bu işler çoğunlukla yarım günde bitiyor.' },
      { label: 'İlçe merkezi', value: 'Düzenli yerleşim, orta katlı binalar, sorunsuz araç geçişi.' },
      { label: 'Kırsal parçalar', value: 'Depo malzemesi ve tarım aleti farklı ambalaj ve sabitleme istiyor.' },
    ],
    guzergahlar: [
      { to: 'Yumurtalık', note: 'Güneye geçiş; sahil yolu, yol süresi planlanıyor.' },
      { to: 'Yüreğir', note: 'Batıya geçiş; ova yolu, iş tek günde bitiyor.' },
      { to: 'Kozan', note: 'Kuzeye geçiş; düzenli güzergâh.' },
      { to: 'Seyhan', note: 'Adana merkezi; süre öngörülebilir.' },
    ],
    mahalleler: ['Kurtkulağı', 'Mercimek', 'Sirkeli', 'İnceyer'],
    sorular: [
      {
        question: 'Ceyhan içinde taşınıyorum, fiyat ne olur?',
        answer:
          'Yol süresi kısa olduğu için en uygun kategoride. Çoğu iş yarım günde bitiyor.',
      },
      {
        question: 'Köydeki evimden taşıma yapıyor musunuz?',
        answer:
          'Yapıyoruz. Yol durumunu keşifte değerlendirip uygun ölçüde araç seçiyoruz.',
      },
      {
        question: 'Tarım aletlerini de taşıyor musunuz?',
        answer:
          'Taşıyoruz. Bu parçalar için ayrı sabitleme uyguluyoruz ve hacme dahil ediyoruz.',
      },
      {
        question: 'Şehirlerarası taşıma yapıyor musunuz?',
        answer:
          'Yapıyoruz. Ceyhan’dan Türkiye’nin her iline taşıma düzenliyoruz; yol fiyata baştan dahil.',
      },
    ],
  },

  {
    ad: 'Kozan',
    derinlik: 'tam',
    ozet:
      'Ovanın dağa dönüştüğü noktada kurulu Kozan’da eğim ile narenciye bahçeleri taşıma planını birlikte belirliyor.',
    metaAciklama:
      'Kozan evden eve nakliyat: eğimli sokak ve bahçeli ev taşımalarına uygun planlama, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Kozan, Çukurova ovasının Toroslar’a dönüştüğü noktada kurulu ve bu iki karakter aynı ilçede yan yana duruyor. Ovaya bakan kesimde yollar düz, araç yanaşması sorunsuz; kale ve eski yerleşim yönünde ise sokaklar daralıp dikleşiyor. Bu adreslerde büyük araçla çıkmak yerine cadde başında aktarma yapıyoruz.</p><p>İlçedeki narenciye bahçeleri konut yapısına da yansıyor: bahçeli müstakil evler yaygın ve taşınacak eşya ev içiyle sınırlı kalmıyor. Kozan’da <strong>evden eve nakliyat</strong> teklifi hazırlarken bahçe mobilyası, depo malzemesi ve hasat ekipmanını da hacme katıyoruz.</p><p>Adana merkezine bağlantı düzenli bir yol üzerinden sağlanıyor. Merkez ilçelere yapılan taşımalarda yol süresi plana ekleniyor ve iş erken başlatılıyor.</p>`,
    kunye: [
      { label: 'İki karakter', value: 'Ovaya bakan kesimde düz yol, kale yönünde dar ve dik sokaklar.' },
      { label: 'Aktarma', value: 'Dik sokaklarda yük cadde başında küçük araca aktarılıyor.' },
      { label: 'Bahçeli evler', value: 'Narenciye bölgesi; bahçe ve depo eşyası hacme ekleniyor.' },
      { label: 'Merkeze mesafe', value: 'Adana merkezine yol süresi plana ekleniyor.' },
    ],
    guzergahlar: [
      { to: 'İmamoğlu', note: 'Batıya geçiş; düzenli güzergâh.' },
      { to: 'Ceyhan', note: 'Güneye geçiş; ova yolu.' },
      { to: 'Sarıçam', note: 'Adana yönü; yol süresi planlanıyor.' },
      { to: 'Feke', note: 'Kuzeye geçiş; dağ yolu, küçük araç tercih ediliyor.' },
    ],
    mahalleler: ['Cumhuriyet', 'Hacıuşağı', 'Tufanlı', 'Karahamzalı'],
    sorular: [
      {
        question: 'Kale çevresindeki sokağımıza araç çıkabilir mi?',
        answer:
          'Her sokağa çıkamıyor. Keşifte yolu görüp uygun ölçüde araç seçiyor, gerekirse cadde başında aktarma yapıyoruz.',
      },
      {
        question: 'Bahçe eşyaları hacme dahil mi?',
        answer:
          'Dahil. Bahçe mobilyası, depo malzemesi ve hasat ekipmanı toplam hacmi artırıyor; keşifte gösterilmesi gerekiyor.',
      },
      {
        question: 'Adana merkezine taşınma tek günde biter mi?',
        answer:
          'Genellikle biter. Yol süresi nedeniyle iş sabah erken başlatılıyor.',
      },
      {
        question: 'Keşif ücretli mi?',
        answer:
          'Keşif ücretsiz. Ekibimiz adrese gelip eşyayı yerinde görüyor.',
      },
    ],
  },

  // ───────────────────────── ORTA DERİNLİK (5) ─────────────────────────
  {
    ad: 'Karataş',
    derinlik: 'orta',
    ozet: 'Sahil hattındaki yazlık yoğunluğuyla Karataş’ta taşınma tarihi büyük ölçüde mevsime bağlı.',
    metaAciklama:
      'Karataş evden eve nakliyat: sezon yoğunluğuna göre planlanan taşıma, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Karataş sahil hattında ve yazlık kullanım yaygın. Yaz aylarında hem hareketlilik hem araç talebi artıyor; sezon dışında ise iş belirgin şekilde hızlı ve uygun ilerliyor.</p><p>Yapı tipi ağırlıklı düşük katlı ve müstakil; merdiven sorunu az. Karataş’ta <strong>evden eve nakliyat</strong> işlerinde eşyanın bir bölümünün depolanması sık talep ediliyor ve aynı teklifin içinde planlanıyor.</p>`,
    kunye: [
      { label: 'Sezon', value: 'Yazın hareketlilik ve araç talebi artıyor; sezon dışı daha uygun.' },
      { label: 'Yapı', value: 'Düşük katlı ve müstakil ağırlıklı; merdiven sorunu az.' },
      { label: 'Depolama', value: 'İkinci konut taşımalarında depolama sık talep ediliyor.' },
    ],
    guzergahlar: [
      { to: 'Yüreğir', note: 'Kuzeye geçiş; Adana yönü, yol süresi planlanıyor.' },
      { to: 'Yumurtalık', note: 'Doğuya geçiş; sahil yolu.' },
      { to: 'Seyhan', note: 'Adana merkezi; iş tek günde tamamlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Yazlığımdaki eşyaları depolayabilir misiniz?', answer: 'Depolayabiliriz. Taşınacak ve depolanacak eşyayı keşifte birlikte ayırıyoruz.' },
      { question: 'Sezon dışında taşınmak daha mı uygun?', answer: 'Belirgin şekilde daha uygun; talep düştüğü için hem gün seçmek kolaylaşıyor hem maliyet azalıyor.' },
      { question: 'Adana merkezine taşınma tek günde biter mi?', answer: 'Biter. Yol süresi plana ekleniyor ve iş sabah erken başlatılıyor.' },
    ],
  },

  {
    ad: 'İmamoğlu',
    derinlik: 'orta',
    ozet: 'Baraj gölü çevresindeki tarım yerleşimiyle İmamoğlu’nda taşınan hacim ev içiyle sınırlı kalmıyor.',
    metaAciklama:
      'İmamoğlu evden eve nakliyat: bahçe ve depo eşyası dahil hacim planlaması, sigortalı taşıma, yazılı fiyat.',
    govde: `<p>İmamoğlu’nda yerleşim tarım alanları arasına dağılmış durumda. Müstakil evler yaygın ve depo, ambar ile bahçe eşyası taşınacak hacmi belirgin şekilde büyütüyor; oda sayısına bakarak fiyat vermek burada yanıltıcı olur.</p><p>İlçe merkezine erişim düzgün, kırsal mahallelere giden bazı yollar dar. İmamoğlu’nda <strong>evden eve nakliyat</strong> planlarken adrese göre araç ölçüsü seçiyor, gerekirse aktarma yapıyoruz.</p>`,
    kunye: [
      { label: 'Tarım yerleşimi', value: 'Müstakil evler tarım alanları arasına dağılmış.' },
      { label: 'Ek hacim', value: 'Depo, ambar ve bahçe eşyası hacmi belirgin şekilde büyütüyor.' },
      { label: 'Kırsal yollar', value: 'Bazı mahalle yolları dar; araç ölçüsü adrese göre seçiliyor.' },
    ],
    guzergahlar: [
      { to: 'Kozan', note: 'Doğuya geçiş; düzenli güzergâh.' },
      { to: 'Sarıçam', note: 'Adana yönü; yol süresi planlanıyor.' },
      { to: 'Karaisalı', note: 'Batıya geçiş; dağ eteği yolu.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Depo ve ambar eşyası taşınıyor mu?', answer: 'Taşınıyor ve hacme dahil ediliyor; keşifte gösterilmesi gerekiyor.' },
      { question: 'Kırsal adrese araç gelebiliyor mu?', answer: 'Yol durumuna göre değişiyor; keşifte değerlendirip uygun ölçüde araç seçiyoruz.' },
      { question: 'Fiyata yol masrafı dahil mi?', answer: 'Dahil. Keşiften sonra verilen yazılı fiyat yol ve yakıt dahil toplam tutardır.' },
    ],
  },

  {
    ad: 'Karaisalı',
    derinlik: 'orta',
    ozet: 'Dağ eteğindeki orman ve vadi yerleşimiyle Karaisalı’da araç seçimi taşımanın ilk kararı oluyor.',
    metaAciklama:
      'Karaisalı evden eve nakliyat: dar ve virajlı yollara uygun araç planı, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Karaisalı’da ilk karar araç ölçüsü. Yerleşimin bir bölümüne dar ve virajlı vadi yollarından ulaşılıyor; büyük araçla her adrese çıkmak mümkün olmuyor. Keşifte yolu görüp uygun aracı seçiyor, gerekirse yükü ana yolda daha küçük bir araca aktarıyoruz.</p><p>Yapı ağırlıklı müstakil ve bahçeli; merdiven sorunu neredeyse yok. Karaisalı’da <strong>evden eve nakliyat</strong> teklifi verirken bahçe ve depo eşyasını da hacme katıyoruz.</p>`,
    kunye: [
      { label: 'Vadi yolları', value: 'Dar ve virajlı; büyük araç her adrese çıkamıyor.' },
      { label: 'Araç seçimi', value: 'Yol keşifte görülüyor; gerekirse ana yolda aktarma yapılıyor.' },
      { label: 'Yapı', value: 'Müstakil ve bahçeli; merdiven sorunu neredeyse yok.' },
    ],
    guzergahlar: [
      { to: 'Çukurova', note: 'Güneye geçiş; Adana yönü, yol süresi planlanıyor.' },
      { to: 'İmamoğlu', note: 'Doğuya geçiş; dağ eteği yolu.' },
      { to: 'Pozantı', note: 'Kuzeye geçiş; dağ yolu, kışın gün seçimi havaya bağlı.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Evimize giden yol dar, taşıma yapılabilir mi?', answer: 'Yapılabilir. Uygun ölçüde araç seçiyor, gerekirse ana yolda küçük araca aktarıyoruz.' },
      { question: 'Bahçe eşyaları hacme dahil mi?', answer: 'Dahil. Keşifte göstermeniz fiyatın baştan doğru çıkması için önemli.' },
      { question: 'Adana merkezine taşınma tek günde biter mi?', answer: 'Çoğunlukla biter; yol süresi nedeniyle iş sabah erken başlatılıyor.' },
    ],
  },

  {
    ad: 'Pozantı',
    derinlik: 'orta',
    ozet: 'Toroslar’ın geçit noktasındaki Pozantı’da rakım ve kış koşulları taşıma gününü belirliyor.',
    metaAciklama:
      'Pozantı evden eve nakliyat: kış koşullarına ve dağ yoluna göre planlanan taşıma, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Pozantı, Toroslar’ın geçit noktasında ve rakımı yüksek. Kış aylarında kar ile buzlanma yol süresini uzatıyor, bazı günlerde ağır araçla geçişi riskli hâle getiriyor. Bu dönemde gün seçimini hava durumuna göre yapıyor, gerekirse tarihi birlikte kaydırıyoruz.</p><p>İlçe, kuzeye giden ana güzergâh üzerinde olduğu için buradan yapılan taşımaların bir bölümü il dışına gidiyor. Pozantı’da <strong>evden eve nakliyat</strong> planlarken şehirlerarası işlerde mola ve sabitleme planı devreye giriyor.</p>`,
    kunye: [
      { label: 'Rakım', value: 'Yüksek rakım; kışın kar ve buzlanma geçişi zorlaştırıyor.' },
      { label: 'Gün seçimi', value: 'Kış aylarında tarih hava durumuna göre belirleniyor.' },
      { label: 'Geçit konumu', value: 'Kuzeye giden ana güzergâh üzerinde; il dışı iş oranı yüksek.' },
    ],
    guzergahlar: [
      { to: 'Karaisalı', note: 'Güneye geçiş; dağ yolu, süre planlanıyor.' },
      { to: 'Çukurova', note: 'Adana yönü; erken başlangıç gerekiyor.' },
      { to: 'Seyhan', note: 'Adana merkezi; yol süresi plana dahil ediliyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Kışın taşınmak zorundayım, risk var mı?', answer: 'Planlı yapıldığında yok. Yolu ve havayı önceden değerlendiriyor, hava sertse günü birlikte değiştiriyoruz.' },
      { question: 'Başka bir ile taşınmak istiyorum, hizmet veriyor musunuz?', answer: 'Veriyoruz. Uzun güzergâhta mola ve sabitleme planı önceden yapılıyor.' },
      { question: 'Eşyalarım yolda sabitleniyor mu?', answer: 'Sabitleniyor. Mobilyalar battaniyeyle sarılıp kayış ve takozla araca bağlanıyor.' },
    ],
  },

  {
    ad: 'Yumurtalık',
    derinlik: 'orta',
    ozet: 'Sahil hattı ile liman tesislerinin bir arada olduğu Yumurtalık’ta konut ve işyeri taşımaları ayrı planlanıyor.',
    metaAciklama:
      'Yumurtalık evden eve nakliyat ve işyeri taşıma: sigortalı, planlı ve yazılı sabit fiyatlı hizmet.',
    govde: `<p>Yumurtalık’ta iki tür talep yan yana duruyor: sahil hattındaki konut ve yazlık taşımaları ile liman çevresindeki işyeri ve depo taşımaları. İkisi farklı ekipman ve farklı gün düzeni istiyor, ayrı planlanıyor.</p><p>Konut tarafında yerleşim toplu, binalar düşük katlı ve araç yanaşması sorunsuz. Yumurtalık’ta <strong>evden eve nakliyat</strong> işlerinde bina kaynaklı zorluk nadiren gündeme geliyor.</p>`,
    kunye: [
      { label: 'İki talep tipi', value: 'Sahilde konut ve yazlık, liman çevresinde işyeri ve depo taşıması.' },
      { label: 'Konut erişimi', value: 'Toplu yerleşim, düşük katlı bina, sorunsuz araç yanaşması.' },
      { label: 'Ayrı planlama', value: 'İki taşıma tipi farklı ekipman ve gün düzeni istiyor.' },
    ],
    guzergahlar: [
      { to: 'Ceyhan', note: 'Kuzeye geçiş; düzenli güzergâh.' },
      { to: 'Karataş', note: 'Batıya geçiş; sahil yolu.' },
      { to: 'Yüreğir', note: 'Adana yönü; yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Depomu taşıtabilir miyim?', answer: 'Taşıtabilirsiniz. Raf ve ağır ekipman için ayrı sabitleme kullanıyoruz.' },
      { question: 'Yazlık taşıması yapıyor musunuz?', answer: 'Yapıyoruz. Eşyanın bir bölümünün depolanması da aynı teklifte planlanabiliyor.' },
      { question: 'Adana merkezine taşınma tek günde biter mi?', answer: 'Genellikle biter; yol süresi nedeniyle iş sabah erken başlatılıyor.' },
    ],
  },
]

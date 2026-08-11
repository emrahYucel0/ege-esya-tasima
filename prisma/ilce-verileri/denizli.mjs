// prisma/ilce-verileri/denizli.mjs
//
// Denizli'nin 19 ilçesinden 8'i. ON BİRİ BİLEREK ATLANDI.
//
// ATLANANLAR: Babadağ, Baklan, Bekilli, Beyağaç, Bozkurt, Çal, Çameli,
//   Çardak, Güney, Kale, Serinhisar
//   Küçük nüfuslu ve aramada karşılığı düşük. Çardak ayrıca BİLEREK
//   çıkarıldı: doğal ekseni havalimanı olurdu, o eksen Bursa/Yenişehir'de
//   kullanıldı.
//
// DERİNLİK: 'tam' (3) / 'orta' (5)
//
// ÖNCEKİ İLLERLE ÇAKIŞMAMAK İÇİN KAÇINILANLAR
//   Denizli'nin en bariz iki teması TEKSTİL ve TARIM; ikisi de daha önce
//   kullanıldı. Bu yüzden:
//     · "dokuma tezgâhı"        → Kayseri/Bünyan'da kullanıldı, girilmiyor
//     · "üretim hattı/fabrika"  → Kayseri/Kocasinan'da kullanıldı
//     · "organize sanayi + vardiya dışı" → Trabzon/Arsin'de kullanıldı
//     · "hasat ritmi"           → İzmir/Ödemiş'te kullanıldı
//     · "kış"                   → Erzurum'un tamamında kullanıldı
//   Honaz'ın sanayi tarafı bu yüzden makine/raf üzerinden değil, DENİZLİ'YE
//   ÖZGÜ olan numune ve kalıp odası üzerinden yazıldı: sıralı, etiketli,
//   karışmaması gereken bir yük. Bu, Arsin'in ağır ekipmanından da
//   Kocasinan'ın üretim hattından da farklı bir iş.
//
// PAMUKKALE ile KAYSERİ/TALAS AYRIMI
//   İkisi de üniversite ilçesi. Talas'ta eksen EŞYANIN KENDİSİ (eşyalı
//   kiralık → mobilya taşınmıyor, sadece koli). Pamukkale'de eksen TAKVİM
//   (randevu yığılması, aynı güne düşen çok sayıda küçük iş). Talas'taki
//   "eşyasız taşınma" çerçevesi burada bilerek tekrarlanmıyor.
//
// MAHALLELER
//   Tamamı boş bırakıldı. Denizli mahalle adları konusunda doğrulanmış
//   bilgim yok; uydurmaktansa alanı boş bırakmak doğru. (Aynı kural
//   Trabzon'un kırsal ilçelerinde de uygulandı.)
//
// Ortak kurallar: uydurma mahalle/rakam yok, "evden eve nakliyat" sayfa
// başına tam bir kez. (bkz. izmir.mjs başlığındaki ayrıntılı gerekçe)

export const il = { ad: 'Denizli', plaka: 20 }

export const ilceler = [
  // ───────────────────────── TAM DERİNLİK (3) ─────────────────────────
  {
    ad: 'Pamukkale',
    derinlik: 'tam',
    ozet:
      'Pamukkale’de taşınmalar takvime yığılıyor; dönem başında aynı güne düşen iş sayısı randevuyu belirleyici kılıyor.',
    metaAciklama:
      'Pamukkale evden eve nakliyat: yoğun dönemde erken randevu, küçük hacimli işlere uygun araç, yazılı sabit fiyat.',
    govde: `<p>Pamukkale’de taşınma talebi yıla eşit dağılmıyor. Üniversite çevresindeki mahallelerde dönem başında ve dönem sonunda talep aynı birkaç haftaya sıkışıyor; yılın geri kalanında ise sakin seyrediyor. Bu, işin zorluğunu değil <em>sırasını</em> belirliyor: aynı güne düşen iş sayısı arttığında araç ve ekip önceden bağlanmış oluyor.</p><p>Bu yüzden Pamukkale’de <strong>evden eve nakliyat</strong> planlarken ilk sorduğumuz şey adres değil tarih oluyor. Yoğun haftalarda randevuyu erken almanızı öneriyoruz; taşıma gününü kendiniz seçebildiğinizde saat aralığı da size kalıyor. Sakin dönemlerde ise aynı hafta içinde gün bulmak sorun olmuyor.</p><p>İşlerin bir bölümü küçük hacimli: birkaç koli, bir yatak, bir dolap. Bunlar için büyük araç göndermiyoruz — küçük araç ve iki kişilik ekiple çalışıyor, fiyatı da o ölçekte tutuyoruz. Büyük daire taşımalarında ise standart ekip ve tam donanım devreye giriyor. İki iş tipini aynı gün içinde ayrı ayrı planlıyoruz.</p>`,
    kunye: [
      { label: 'Takvim yığılması', value: 'Dönem başı ve sonunda talep birkaç haftaya sıkışıyor.' },
      { label: 'Randevu', value: 'Yoğun haftalarda erken alınıyor; gün seçilebilirse saat aralığı da seçiliyor.' },
      { label: 'Küçük hacimli iş', value: 'Birkaç koli ve tek oda için küçük araç, iki kişilik ekip.' },
      { label: 'Büyük daire', value: 'Standart ekip ve tam donanım; iki iş tipi ayrı planlanıyor.' },
    ],
    guzergahlar: [
      { to: 'Merkezefendi', note: 'Şehir içi geçiş; iş aynı gün bitiyor.' },
      { to: 'Honaz', note: 'Doğuya kısa mesafe; günübirlik.' },
      { to: 'Sarayköy', note: 'Kuzeybatı aksı; yol süresi planlanıyor.' },
      { to: 'Denizli', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Dönem başında yer bulabilir miyiz?',
        answer:
          'Bulabilirsiniz, ama o haftalar erken doluyor. Tarihi netleştirdiğiniz gün randevu almanızı öneriyoruz; böylece saat aralığını da siz seçiyorsunuz.',
      },
      {
        question: 'Sadece birkaç kolim ve bir dolabım var, taşır mısınız?',
        answer:
          'Taşıyoruz. Bu ölçekteki işler için küçük araç ve iki kişilik ekip gönderiyoruz; fiyat da büyük taşımayla aynı olmuyor.',
      },
      {
        question: 'Taşıma saatini biz belirleyebilir miyiz?',
        answer:
          'Sakin dönemlerde büyük ölçüde belirleyebiliyorsunuz. Yoğun haftalarda ise erken alınan randevularda saat aralığı seçimi mümkün oluyor.',
      },
      {
        question: 'Verilen fiyat sonradan değişir mi?',
        answer:
          'Değişmiyor. Keşif sonrası verilen yazılı fiyat taşıma gününe kadar geçerli kalıyor.',
      },
    ],
  },

  {
    ad: 'Merkezefendi',
    derinlik: 'tam',
    ozet:
      'Merkezefendi’de çıkış ve giriş tarihleri her zaman örtüşmüyor; aradaki boşluk için eşyanın bekleyeceği yer baştan belirleniyor.',
    metaAciklama:
      'Merkezefendi evden eve nakliyat: tarihler örtüşmediğinde ara depolama, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Merkezefendi’de sık karşılaştığımız durum şu: eski evden çıkış tarihi ile yeni eve giriş tarihi aynı güne denk gelmiyor. Kira bitişi, tadilat ya da tapu işlemi araya bir ya da birkaç gün koyuyor. Bu boşluk çoğu zaman taşınma kararı verildikten sonra fark ediliyor ve iş plansız kalıyor.</p><p>Bunu baştan sorup çözüyoruz. Tarihler örtüşmüyorsa eşya yüklendiği gün depoya alınıyor, giriş günü oradan çıkarılıp yeni adrese kuruluyor. Eşya araçta gecelemiyor; kapalı ve kayıt altında bekliyor. Merkezefendi’de <strong>evden eve nakliyat</strong> teklifi verirken bu bekleme süresini de yazılı fiyata dahil ediyoruz, sonradan eklenen bir kalem olarak değil.</p><p>Bekleme varsa paketleme düzeni de değişiyor: ilk gün ihtiyaç duyulacak parçalar en son yükleniyor, yeni adrese ilk onlar giriyor. Hangi kolinin bu gruba gireceğine keşifte birlikte karar veriyoruz; aksi hâlde depodan tek bir koli için tüm yükü boşaltmak gerekiyor.</p>`,
    kunye: [
      { label: 'Tarih boşluğu', value: 'Çıkış ve giriş günleri örtüşmediğinde eşya depoya alınıyor.' },
      { label: 'Bekleme koşulu', value: 'Araçta gecelemiyor; kapalı alanda ve kayıt altında bekliyor.' },
      { label: 'Fiyat', value: 'Bekleme süresi yazılı fiyata baştan dahil ediliyor.' },
      { label: 'Yükleme sırası', value: 'İlk gün gerekecek parçalar en son yükleniyor, ilk onlar çıkıyor.' },
    ],
    guzergahlar: [
      { to: 'Pamukkale', note: 'Şehir içi geçiş; iş aynı gün bitiyor.' },
      { to: 'Honaz', note: 'Doğuya kısa mesafe; günübirlik.' },
      { to: 'Sarayköy', note: 'Kuzeybatı aksı; yol süresi planlanıyor.' },
      { to: 'Denizli', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Yeni eve iki gün sonra girebiliyoruz, eşya nerede bekler?',
        answer:
          'Depoda bekler. Yüklendiği gün kapalı alana alınıyor, giriş günü çıkarılıp kuruluyor. Araçta gecelemiyor.',
      },
      {
        question: 'Bekleyen eşya için ayrı ücret çıkar mı?',
        answer:
          'Sürpriz bir kalem çıkmıyor. Bekleme süresi keşifte konuşulup yazılı fiyatın içine giriyor.',
      },
      {
        question: 'Bekleme sırasında bir kutuya ihtiyacım olursa ne olur?',
        answer:
          'Bunun için ilk gün gerekecek parçaları ayırıyoruz. Onlar en son yükleniyor ve elimizin altında kalıyor; tüm yükü boşaltmak gerekmiyor.',
      },
      {
        question: 'Eşya depoda sigortalı mı?',
        answer:
          'Taşıma ve bekleme süresi sigorta kapsamında; poliçe bilgisi sözleşmede yazılı oluyor.',
      },
    ],
  },

  {
    ad: 'Honaz',
    derinlik: 'tam',
    ozet:
      'Honaz’daki işyeri taşımalarında en hassas yük numune ve kalıp odası; sırası bozulursa yeniden kurmak zaman alıyor.',
    metaAciklama:
      'Honaz evden eve nakliyat ve işyeri taşıma: numune, kalıp ve dosya düzeni korunarak taşıma, yazılı sabit fiyat.',
    govde: `<p>Honaz’da konut işlerinin yanında işyeri taşımaları düzenli yer tutuyor. Bu işlerde asıl dikkat isteyen kısım masa ve dolap değil, numune ve kalıp odası oluyor. Buradaki parçalar tek tek değerli olmayabilir; değeri veren şey <em>hangi sırada ve hangi etiketle</em> durdukları. Sıra bozulduğunda kayıp yaşanmıyor ama aramak günler alıyor.</p><p>Bu yüzden numune ve kalıp taşımalarında rafı olduğu gibi boşaltmıyoruz: her göz kendi kutusuna, kutu da bulunduğu raf ve sıra bilgisiyle etiketleniyor. Yeni adreste kurulum aynı sırayla yapılıyor, böylece ertesi gün çalışan kişi aradığını eski yerinde buluyor. Honaz’da <strong>evden eve nakliyat</strong> ekibimizin yanında bu işlere ayrı bir kayıt tutan kişi çıkıyor.</p><p>Konut tarafında ilçe merkezi ve çevresinde yerleşim düzenli; araç yanaşması genellikle sorun olmuyor ve işler öngörülebilir sürede tamamlanıyor. Dağ eteğine doğru çıkan adreslerde yol daralıyor, o durumda küçük araçla aktarma yapıyoruz.</p>`,
    kunye: [
      { label: 'Numune ve kalıp', value: 'Değeri sırasında; her göz kendi kutusuna, raf ve sıra bilgisiyle etiketleniyor.' },
      { label: 'Kurulum', value: 'Yeni adreste aynı sırayla diziliyor; ertesi gün arama gerekmiyor.' },
      { label: 'Kayıt', value: 'Bu işlerde ekibin yanında ayrı bir kayıt sorumlusu bulunuyor.' },
      { label: 'Konut erişimi', value: 'Merkez ve çevresinde yanaşma sorunsuz; dağ eteğinde küçük araçla aktarma.' },
    ],
    guzergahlar: [
      { to: 'Merkezefendi', note: 'Batıya kısa mesafe; iş aynı gün bitiyor.' },
      { to: 'Pamukkale', note: 'Kuzeybatı yönü; günübirlik.' },
      { to: 'Denizli', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Numune odamızı taşıtırken karışma riski var mı?',
        answer:
          'Bunu önlemek için her gözü kendi kutusuna alıp raf ve sıra bilgisiyle etiketliyoruz. Yeni adreste aynı sırayla kuruluyor.',
      },
      {
        question: 'İşyeri taşıması çalışmayı kaç gün durdurur?',
        answer:
          'Hedefimiz durdurmamak. İşi mesai dışına ya da hafta sonuna planlıyor, ertesi sabah çalışılabilir hâlde teslim ediyoruz.',
      },
      {
        question: 'Dağ tarafındaki adrese büyük araç çıkar mı?',
        answer:
          'Yol daraldığında çıkmıyor. O durumda yükü küçük araca aktarıyoruz; bunu keşifte tespit edip fiyata yazıyoruz.',
      },
      {
        question: 'Keşif ücretli mi?',
        answer: 'Keşif ücretsiz. Eşyayı yerinde gördükten sonra yazılı sabit fiyat veriyoruz.',
      },
    ],
  },

  // ───────────────────────── ORTA DERİNLİK (5) ─────────────────────────
  {
    ad: 'Sarayköy',
    derinlik: 'orta',
    ozet:
      'Sarayköy’de iki katlı evlerin iç merdiveni dar ve dönüşlü; büyük parçalar merdivenden değil balkondan iniyor.',
    metaAciklama:
      'Sarayköy evden eve nakliyat: dar iç merdivende sökme ve balkondan indirme, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Sarayköy’de yaygın olan iki katlı evlerde iç merdiven dar ve dönüşlü oluyor. Gardırop, buzdolabı ya da büyük kanepe bu merdivenden dönmüyor. İki çözüm var: parçayı yerinde sökmek ya da balkondan halatla indirmek. Hangisinin uygulanacağına eşyayı ve balkonu görmeden karar vermiyoruz.</p><p>Sökme gerekiyorsa marangozumuz parçayı yerinde ayırıp yeni adreste kuruyor; bağlantı parçaları etiketli torbada taşınıyor. Sarayköy’de <strong>evden eve nakliyat</strong> keşfinde merdiven genişliği ve dönüş açısı ölçülüyor, çünkü işin süresini bu belirliyor.</p>`,
    kunye: [
      { label: 'İç merdiven', value: 'Dar ve dönüşlü; büyük parçalar merdivenden dönmüyor.' },
      { label: 'İki yöntem', value: 'Yerinde sökme ya da balkondan halatla indirme; keşifte seçiliyor.' },
      { label: 'Bağlantı parçaları', value: 'Etiketli torbada taşınıyor, yeni adreste aynı parça kullanılıyor.' },
    ],
    guzergahlar: [
      { to: 'Pamukkale', note: 'Güneydoğu aksı; yol süresi planlanıyor.' },
      { to: 'Merkezefendi', note: 'Denizli merkezi; günübirlik.' },
      { to: 'Buldan', note: 'Kuzey yönü; güzergâh düz.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Gardırop merdivenden inmezse ne yapıyorsunuz?', answer: 'Ya yerinde söküyoruz ya da balkondan halatla indiriyoruz. Hangisinin uygun olduğunu keşifte belirliyoruz.' },
      { question: 'Sökülen mobilya yeni evde aynı şekilde kurulur mu?', answer: 'Kuruluyor. Bağlantı parçaları etiketli torbada taşınıyor, eksik parça sorunu çıkmıyor.' },
      { question: 'Balkondan indirme güvenli mi?', answer: 'Uygun ekipman ve sigortalı ambalajla yapılıyor; balkonun uygunluğunu önce yerinde kontrol ediyoruz.' },
    ],
  },

  {
    ad: 'Buldan',
    derinlik: 'orta',
    ozet:
      'Buldan’da yayla ve ilçe merkezi arasında yılda iki kez yapılan kısmi taşımalar düzenli bir iş kalemi.',
    metaAciklama:
      'Buldan evden eve nakliyat ve mevsimlik eşya taşıma: iki adres arası kısmi yük, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Buldan’da taşımaların bir bölümü ev değiştirme değil, iki adres arasında mevsimlik geçiş oluyor: yaz için yaylaya çıkan, kış için merkeze inen eşya. Bu işlerde yükün tamamı taşınmıyor; her seferinde belirli bir grup gidip geliyor. Neyin gideceği yıldan yıla değiştiği için listeyi her seferinde baştan çıkarıyoruz.</p><p>Kısmi yük, tam taşımadan farklı planlanıyor: araç küçülüyor, süre kısalıyor ve fiyat buna göre oluşuyor. Buldan’da <strong>evden eve nakliyat</strong> için kurduğumuz düzenin yanında bu mevsimlik geçişler için ayrı ve daha hafif bir plan tutuyoruz.</p>`,
    kunye: [
      { label: 'İki adres', value: 'Yayla ve merkez arasında mevsimlik geçiş; yükün tamamı taşınmıyor.' },
      { label: 'Liste', value: 'Gidecek eşya her seferinde yeniden belirleniyor.' },
      { label: 'Ölçek', value: 'Kısmi yükte araç küçülüyor, süre ve fiyat buna göre oluşuyor.' },
    ],
    guzergahlar: [
      { to: 'Sarayköy', note: 'Güney yönü; güzergâh düz.' },
      { to: 'Merkezefendi', note: 'Denizli merkezi; yol süresi planlanıyor.' },
      { to: 'Çivril', note: 'Doğu aksı; mesafe hesaba katılıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Eşyanın sadece bir kısmını taşıtabilir miyim?', answer: 'Taşıtabilirsiniz. Kısmi yük için küçük araçla çalışıyoruz, fiyat da tam taşımayla aynı olmuyor.' },
      { question: 'Her yıl aynı fiyatı mı uyguluyorsunuz?', answer: 'Fiyat gidecek eşyaya göre çıkıyor. Liste değiştiğinde fiyat da değişiyor; her seferinde yazılı veriyoruz.' },
      { question: 'Keşif için gelmeniz gerekiyor mu?', answer: 'Kısmi yüklerde çoğu zaman fotoğraf ya da görüntülü görüşme yeterli oluyor.' },
    ],
  },

  {
    ad: 'Çivril',
    derinlik: 'orta',
    ozet:
      'Çivril merkeze uzak; ekibin yol süresi işin bir parçası olduğu için taşımalar sabah erken başlıyor.',
    metaAciklama:
      'Çivril evden eve nakliyat: erken başlangıç ve yol süresi planlaması, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Çivril, Denizli merkezine uzak ilçelerden. Bu, taşımanın zorluğunu değil başlangıç saatini değiştiriyor: ekip yola erken çıkıyor ki yükleme öğleden önce başlasın ve iş aynı gün tamamlansın. Geç başlayan bir taşıma burada kolayca ertesi güne sarkıyor.</p><p>Yol süresini keşifte açıkça konuşup plana yazıyoruz. Çivril’de <strong>evden eve nakliyat</strong> teklifi verirken mesafeyi gizli bir kalem olarak değil, işin süresini belirleyen bilinen bir unsur olarak ele alıyoruz; taşıma günü “yetişmedi” durumu çıkmıyor.</p>`,
    kunye: [
      { label: 'Mesafe', value: 'Merkeze uzak; ekip yola erken çıkıyor.' },
      { label: 'Başlangıç saati', value: 'Yükleme öğleden önce başlıyor ki iş aynı gün bitsin.' },
      { label: 'Şeffaflık', value: 'Yol süresi keşifte konuşulup plana ve fiyata yazılıyor.' },
    ],
    guzergahlar: [
      { to: 'Buldan', note: 'Batı aksı; mesafe hesaba katılıyor.' },
      { to: 'Merkezefendi', note: 'Denizli merkezi; erken çıkışla günübirlik.' },
      { to: 'Denizli', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Taşıma aynı gün biter mi?', answer: 'Erken başlarsa biter. Bu yüzden ekip yola sabah erken çıkıyor ve yükleme öğleden önce başlıyor.' },
      { question: 'Mesafe fiyatı ne kadar etkiliyor?', answer: 'Yol süresi işin bir parçası olduğu için etkiliyor. Ne kadar etkilediğini keşifte açıkça söylüyoruz.' },
      { question: 'Denizli merkezine taşınmalarda araç değişiyor mu?', answer: 'Değişmiyor. Yük tek araçla gidiyor, aktarma gerekmiyor.' },
    ],
  },

  {
    ad: 'Acıpayam',
    derinlik: 'orta',
    ozet:
      'Acıpayam’da eşyanın bir bölümü çoğu zaman eski adreste kalıyor; ne gideceği keşifte listeleniyor.',
    metaAciklama:
      'Acıpayam evden eve nakliyat: gidecek ve kalacak eşyanın ayrıştırılması, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Acıpayam’daki taşımalarda sık rastladığımız durum, evin tamamının boşalmaması. Yeni adres daha küçük olduğunda ya da eski ev tümüyle bırakılmadığında eşyanın bir bölümü yerinde kalıyor. Bu ayrım yapılmadan verilen fiyat gerçeği yansıtmıyor: taşınmayacak eşya hacme ekleniyor ve teklif olduğundan büyük çıkıyor.</p><p>Bu yüzden keşifte iki liste çıkarıyoruz — gidecekler ve kalacaklar. Acıpayam’da <strong>evden eve nakliyat</strong> fiyatı yalnızca birinci listeye göre hesaplanıyor. Taşıma günü tereddüt yaşanmıyor, çünkü hangi parçanın araca gireceği önceden yazılı.</p>`,
    kunye: [
      { label: 'Kısmi boşaltma', value: 'Eşyanın bir bölümü çoğu zaman eski adreste kalıyor.' },
      { label: 'İki liste', value: 'Keşifte gidecekler ve kalacaklar ayrı yazılıyor.' },
      { label: 'Fiyat', value: 'Yalnızca taşınacak hacim üzerinden hesaplanıyor.' },
    ],
    guzergahlar: [
      { to: 'Tavas', note: 'Kuzeybatı aksı; yol süresi planlanıyor.' },
      { to: 'Merkezefendi', note: 'Denizli merkezi; mesafe hesaba katılıyor.' },
      { to: 'Denizli', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Eşyanın bir kısmını bırakacağız, fiyat buna göre mi çıkıyor?', answer: 'Evet. Fiyat yalnızca taşınacak eşya üzerinden hesaplanıyor; kalacaklar hacme girmiyor.' },
      { question: 'Listeyi taşıma günü değiştirebilir miyiz?', answer: 'Küçük değişiklikler sorun olmuyor. Hacmi belirgin şekilde değiştirecek eklemelerde fiyatı birlikte güncelliyoruz.' },
      { question: 'Keşif ücretli mi?', answer: 'Keşif ücretsiz. Yerinde görüp iki listeyi birlikte çıkarıyoruz.' },
    ],
  },

  {
    ad: 'Tavas',
    derinlik: 'orta',
    ozet:
      'Tavas’ta keşfin çoğu görüntülü yapılıyor; ekip yola yalnızca taşıma günü çıkıyor.',
    metaAciklama:
      'Tavas evden eve nakliyat: görüntülü keşif ve yazılı sabit fiyat, sigortalı ambalaj ve montaj.',
    govde: `<p>Tavas’ta keşif için ayrı bir gün ayırmak çoğu zaman gereksiz bir gidiş geliş oluyor. Bunun yerine görüntülü görüşmeyle keşif yapıyoruz: odaları tek tek geziyor, büyük parçaları ve bina girişini görüyor, fiyatı buna göre yazılı veriyoruz. Ekip yola yalnızca taşıma günü çıkmış oluyor.</p><p>Görüntülü keşifte gözden kaçabilecek tek şey bina erişimi olduğu için onu ayrıca soruyoruz: aracın duracağı nokta, kapıya mesafe ve kat sayısı. Tavas’ta <strong>evden eve nakliyat</strong> fiyatının sabit kalmasını sağlayan şey bu üç bilginin baştan doğru alınması.</p>`,
    kunye: [
      { label: 'Görüntülü keşif', value: 'Odalar ve büyük parçalar görüntülü görüşmeyle geziliyor.' },
      { label: 'Tek gidiş', value: 'Ekip yola yalnızca taşıma günü çıkıyor.' },
      { label: 'Erişim soruları', value: 'Araç noktası, kapıya mesafe ve kat sayısı ayrıca soruluyor.' },
    ],
    guzergahlar: [
      { to: 'Acıpayam', note: 'Güneydoğu aksı; yol süresi planlanıyor.' },
      { to: 'Merkezefendi', note: 'Denizli merkezi; günübirlik.' },
      { to: 'Denizli', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Keşif için eve gelmeniz şart mı?', answer: 'Şart değil. Görüntülü görüşmeyle odaları gezip fiyatı yazılı verebiliyoruz.' },
      { question: 'Görüntülü keşifle verilen fiyat sabit mi?', answer: 'Sabit. Bina erişimiyle ilgili üç bilgiyi de baştan aldığımız için taşıma günü değişmiyor.' },
      { question: 'Montaj ve demontaj dahil mi?', answer: 'Dahil. Sökülen mobilyalar yeni adreste ekibimiz tarafından kuruluyor.' },
    ],
  },
]

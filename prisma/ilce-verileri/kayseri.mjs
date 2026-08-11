// prisma/ilce-verileri/kayseri.mjs
//
// Kayseri'nin 16 ilçesinden 8'i. SEKİZİ BİLEREK ATLANDI.
//
// ATLANANLAR: Pınarbaşı, Tomarza, Sarıoğlan, Sarız, Akkışla, Felahiye,
//   Özvatan, Yeşilhisar — hepsi küçük nüfuslu, aramada karşılığı yok.
//
// DERİNLİK: 'tam' (3) / 'orta' (5)
//
// ─────────────────────────────────────────────────────────────────────────
// İKİ TUZAKTAN KAÇINILDI
//
// 1) KIŞ: Kayseri soğuk bir il ama kış ekseni bir önceki turda Erzurum'un
//    dört ilçesinde kullanıldı ve ondan önce sekiz ilçede daha. Burada
//    kıştan HİÇ bahsedilmiyor.
//
// 2) MOBİLYA: Kayseri mobilya üretiminde büyük, ama "mobilya sanayii"
//    ekseni İnegöl'de (Bursa) zaten kullanıldı. Çakışmaması için ölçek
//    ayrıldı: İnegöl atölye ve showroom, Kocasinan FABRİKA — üretim hattı,
//    forklift, tır. İkisi farklı iş.
//
// Ortak kurallar: uydurma mahalle/rakam yok, "evden eve nakliyat" sayfa
// başına tam bir kez. (bkz. izmir.mjs başlığındaki ayrıntılı gerekçe)

export const il = { ad: 'Kayseri', plaka: 38 }

export const ilceler = [
  // ───────────────────────── TAM DERİNLİK (3) ─────────────────────────
  {
    ad: 'Melikgazi',
    derinlik: 'tam',
    ozet:
      'Kapalı çarşı ve han bölgesinde araç içeri giremiyor; Melikgazi’de ticari taşıma tamamen elle ve saat hesabıyla yapılıyor.',
    metaAciklama:
      'Melikgazi evden eve nakliyat ve dükkân taşıma: çarşı içi elle taşıma planı, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Melikgazi’nin merkezinde kapalı çarşı ve han bölgesi var ve buradaki taşıma diğer her yerden farklı işliyor: araç içeri giremiyor. Eşya, çarşı koridorlarından elle taşınıyor ve mesafe bazen yüz metreyi aşıyor. Bu işleri esnafın yoğun olmadığı saatlere alıyoruz — sabah açılıştan önce ya da kapanıştan sonra. Gün ortasında yapılan bir çarşı taşıması hem esnafı hem bizi engelliyor.</p><p>Konut tarafında ilçe iki yüzlü. Kale çevresindeki eski dokuda sokaklar dar; Erciyes eteğine doğru uzanan yeni mahallelerde ise bulvarlar geniş ve bloklarda yük asansörü bulunuyor. Melikgazi’de <strong>evden eve nakliyat</strong> teklifi verirken adresin hangi tarafta olduğunu bilmek şart.</p><p>Elle taşınacak mesafe her iki durumda da keşifte ölçülüyor ve fiyata baştan giriyor; taşıma günü sürpriz bir ek ücret çıkmıyor.</p>`,
    kunye: [
      { label: 'Çarşı içi', value: 'Kapalı çarşı ve hanlara araç giremiyor; eşya koridorlardan elle taşınıyor.' },
      { label: 'Saat seçimi', value: 'Çarşı işleri açılıştan önce ya da kapanıştan sonra yapılıyor.' },
      { label: 'İki doku', value: 'Kale çevresinde dar sokak, Erciyes eteğinde geniş bulvar ve yük asansörü.' },
      { label: 'Elle taşıma mesafesi', value: 'Keşifte ölçülüp fiyata baştan giriyor.' },
    ],
    guzergahlar: [
      { to: 'Kocasinan', note: 'Batıya geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Talas', note: 'Güneydoğu aksı; varışta yamaç hesaba katılıyor.' },
      { to: 'Hacılar', note: 'Güneye geçiş; düz güzergâh.' },
      { to: 'İncesu', note: 'Güneybatı aksı; yol süresi planlanıyor.' },
    ],
    mahalleler: ['Alpaslan', 'Gültepe', 'Hisarcık', 'Erenköy', 'Battalgazi', 'Esentepe'],
    sorular: [
      {
        question: 'Çarşıdaki dükkânımı taşıtabilir miyim?',
        answer:
          'Taşıtabilirsiniz. Araç içeri giremediği için eşya koridorlardan elle taşınıyor; işi açılıştan önce ya da kapanıştan sonra planlıyoruz.',
      },
      {
        question: 'Elle taşıma mesafesi fiyatı etkiler mi?',
        answer:
          'Etkiliyor. Mesafeyi keşifte ölçüp yazılı fiyata baştan yansıtıyoruz; taşıma günü ek ücret çıkmıyor.',
      },
      {
        question: 'Eski mahallede sokağımız dar, araç gelir mi?',
        answer:
          'Uygun ölçüde araç seçiyoruz. Girilemeyen adreslerde yükü cadde başında aktarıp kalan mesafeyi ekiple taşıyoruz.',
      },
      {
        question: 'Verilen fiyat sonradan değişir mi?',
        answer:
          'Değişmiyor. Keşif sonrası verilen yazılı fiyat taşıma gününe kadar geçerli kalıyor.',
      },
    ],
  },

  {
    ad: 'Kocasinan',
    derinlik: 'tam',
    ozet:
      'Fabrika ölçeğinde taşımanın yapıldığı Kocasinan’da üretim hattı, sökülme sırası korunarak yeniden kuruluyor.',
    metaAciklama:
      'Kocasinan evden eve nakliyat ve fabrika taşıma: üretim hattı sırasıyla söküm-montaj, sigortalı, yazılı fiyat.',
    govde: `<p>Kocasinan’da karşımıza çıkan ticari işler atölye ölçeğini aşıyor; burada konu fabrika. Üretim hattı taşımasının atölye taşımasından temel farkı sıra: makineler rastgele sökülüp rastgele kurulamıyor, hattın akış düzeni korunmak zorunda. Söküm öncesi hattı numaralandırıyor, montajı aynı sırayla yapıyoruz. Ağır makineler için forklift ve kızak, uzun parçalar için tır kullanıyoruz.</p><p>Konut tarafında ilçe geniş ve büyük ölçüde planlı. Bulvarlar geniş, yeni bloklarda yük asansörü ve otopark bulunuyor. Kocasinan’da <strong>evden eve nakliyat</strong> işlerinde bina kaynaklı zorluk az; asıl değişken ilçenin genişliği, adresler arası mesafeyi keşifte hesaplıyoruz.</p><p>Fabrika taşımaları üretimi durdurduğu için gün planı kritik. İşi vardiya dışına ya da planlı duruş dönemine alıyor, süreyi keşiften sonra yazılı olarak veriyoruz.</p>`,
    kunye: [
      { label: 'Üretim hattı', value: 'Makineler hattın akış düzeni korunarak sökülüp kuruluyor.' },
      { label: 'Numaralandırma', value: 'Söküm öncesi hat numaralanıyor, montaj aynı sırayla yapılıyor.' },
      { label: 'Ağır ekipman', value: 'Forklift ve kızak; uzun parçalar için tır kullanılıyor.' },
      { label: 'Duruş planı', value: 'İş vardiya dışına ya da planlı duruş dönemine alınıyor.' },
    ],
    guzergahlar: [
      { to: 'Melikgazi', note: 'Doğuya geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'İncesu', note: 'Güneybatı aksı; otoyol bağlantısı.' },
      { to: 'Bünyan', note: 'Doğuya geçiş; yol süresi planlanıyor.' },
      { to: 'Talas', note: 'Güneydoğu aksı; varışta yamaç hesaba katılıyor.' },
    ],
    mahalleler: ['Erkilet', 'Argıncık', 'Mimarsinan', 'Oymaağaç', 'Şeker', 'Ziyagökalp'],
    sorular: [
      {
        question: 'Fabrikamızı taşıtırken üretim hattı bozulur mu?',
        answer:
          'Bozulmaması için söküm öncesi hattı numaralandırıyoruz. Montaj aynı sırayla yapılıyor, akış düzeni korunuyor.',
      },
      {
        question: 'Üretim ne kadar durur?',
        answer:
          'Süreyi keşiften sonra yazılı veriyoruz. İşi vardiya dışına ya da planlı duruş dönemine almayı tercih ediyoruz.',
      },
      {
        question: 'Çok ağır makinelerimiz var, taşıyabilir misiniz?',
        answer:
          'Taşıyabiliyoruz. Forklift, kızak ve uzun parçalar için tır kullanıyoruz; ihtiyaç keşifte belirleniyor.',
      },
      {
        question: 'Konut taşıması ne kadar sürer?',
        answer:
          'Erişim rahat olduğu için süreyi hacim belirliyor; orta ölçekli bir daire yarım gün ile bir gün arasında bitiyor.',
      },
    ],
  },

  {
    ad: 'Talas',
    derinlik: 'tam',
    ozet:
      'Eşyalı kiralığın yaygın olduğu Talas’ta çoğu taşınma mobilyasız; yalnızca kişisel eşya taşınıyor.',
    metaAciklama:
      'Talas evden eve nakliyat: eşyasız taşınmalara uygun küçük araç ve hızlı hizmet, sigortalı, yazılı fiyat.',
    govde: `<p>Talas’taki taşımaların önemli bir bölümü diğer ilçelerdekine benzemiyor: eşyalı kiralık yaygın olduğu için taşınan şey mobilya değil, kişisel eşya. Koli, valiz, kitap, mutfak gereci ve birkaç küçük parçadan ibaret bir yük söz konusu. Bu işler için büyük araç ve kalabalık ekip göndermek hem gereksiz hem pahalı; küçük araçla ve iki kişilik ekiple çalışıyor, fiyatı buna göre veriyoruz.</p><p>Bu tür taşımalarda süreyi belirleyen şey hacim değil, kolilerin hazır olup olmaması. Talas’ta <strong>evden eve nakliyat</strong> talebi geldiğinde ambalaj hizmetini isteyip istemediğinizi baştan soruyoruz; kendiniz paketlerseniz iş bir saatte bitebiliyor.</p><p>İlçe yamaca doğru yükseliyor ve üst mahallelerde sokaklar daralıyor. Küçük araç bu adreslerde ayrıca avantaj sağlıyor.</p>`,
    kunye: [
      { label: 'Eşyasız taşınma', value: 'Eşyalı kiralık yaygın; taşınan şey mobilya değil kişisel eşya.' },
      { label: 'Küçük araç', value: 'Büyük araç ve kalabalık ekip gereksiz; iki kişilik ekiple çalışılıyor.' },
      { label: 'Süreyi belirleyen', value: 'Hacim değil, kolilerin hazır olup olmaması.' },
      { label: 'Yamaç', value: 'Üst mahallelerde sokaklar dar; küçük araç ayrıca avantaj sağlıyor.' },
    ],
    guzergahlar: [
      { to: 'Melikgazi', note: 'Kuzeybatı aksı; kısa mesafe, iş yarım günde bitiyor.' },
      { to: 'Kocasinan', note: 'Batıya geçiş; düz güzergâh.' },
      { to: 'Hacılar', note: 'Güneybatı aksı; kısa mesafe.' },
      { to: 'Develi', note: 'Güneye geçiş; yol süresi planlanıyor.' },
    ],
    mahalleler: ['Mevlana', 'Yenidoğan', 'Harman', 'Kiçiköy', 'Kamber'],
    sorular: [
      {
        question: 'Sadece kolilerim var, mobilyam yok. Yine de geliyor musunuz?',
        answer:
          'Geliyoruz ve bu Talas’ta en sık yaptığımız iş. Küçük araç ve iki kişilik ekiple çalışıyoruz, fiyat da buna göre oluyor.',
      },
      {
        question: 'Kendim paketlersem daha mı ucuz olur?',
        answer:
          'Olur. Ambalaj hizmetini almadığınızda teklif buna göre hesaplanıyor; koliler hazırsa iş bir saatte bitebiliyor.',
      },
      {
        question: 'Koli ve bantı siz veriyor musunuz?',
        answer:
          'Veriyoruz. Paketlemeyi kendiniz yapacak olsanız bile malzemeyi biz sağlayabiliyoruz.',
      },
      {
        question: 'Üst mahallede sokağımız dar, sorun olur mu?',
        answer:
          'Olmaz. Bu işlerde zaten küçük araç kullanıyoruz; dar sokaklarda avantaja dönüşüyor.',
      },
    ],
  },

  // ───────────────────────── ORTA DERİNLİK (5) ─────────────────────────
  {
    ad: 'Develi',
    derinlik: 'orta',
    ozet: 'Kendi çarşısı ve ticareti olan Develi’de taşımaların çoğu Kayseri’ye gitmeden ilçe içinde tamamlanıyor.',
    metaAciklama:
      'Develi evden eve nakliyat: ilçe içi hızlı taşıma ve planlı güzergâh, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Develi, Kayseri’ye bağlı olmakla birlikte kendi çarşısı ve ticaret hayatı olan bir ilçe. Taşımaların önemli bir bölümü il merkezine hiç gitmeden burada tamamlanıyor; bu işlerde yol süresi kısa ve fiyat belirgin şekilde uygun oluyor.</p><p>İlçe merkezindeki yerleşim toplu ve araç yanaşması sorunsuz. Develi’de <strong>evden eve nakliyat</strong> işlerinde kırsal adreslerde yol genişliği plana giriyor; keşifte değerlendirip araç ölçüsünü seçiyoruz.</p>`,
    kunye: [
      { label: 'Kendi çarşısı', value: 'İşlerin çoğu Kayseri’ye gitmeden ilçe içinde tamamlanıyor.' },
      { label: 'İlçe içi süre', value: 'Yol süresi kısa; fiyat belirgin şekilde uygun.' },
      { label: 'Kırsal adres', value: 'Yol genişliği araç seçimini belirliyor.' },
    ],
    guzergahlar: [
      { to: 'Yahyalı', note: 'Güneye geçiş; dağ eteği yolu.' },
      { to: 'Talas', note: 'Kayseri yönü; yol süresi planlanıyor.' },
      { to: 'Melikgazi', note: 'Kayseri merkezi; erken başlangıç gerekiyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Develi içinde taşınıyorum, fiyat ne olur?', answer: 'Yol süresi kısa olduğu için en uygun kategoride; çoğu iş yarım günde bitiyor.' },
      { question: 'Kırsal adrese araç gelebiliyor mu?', answer: 'Yol durumuna göre değişiyor; keşifte değerlendirip uygun ölçüde araç seçiyoruz.' },
      { question: 'Keşif ücretli mi?', answer: 'Keşif ücretsiz. Eşyayı yerinde gördükten sonra yazılı sabit fiyat veriyoruz.' },
    ],
  },

  {
    ad: 'İncesu',
    derinlik: 'orta',
    ozet: 'Otoyol üzerindeki İncesu’ya ulaşım kolay; şehirlerarası taşımalarda doğal bir geçiş noktası.',
    metaAciklama:
      'İncesu evden eve nakliyat: otoyol bağlantısıyla hızlı ulaşım, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>İncesu otoyol üzerinde ve bu ilçeye ulaşımı kolaylaştırıyor. Araç ve ekip öngörülebilir sürede adrese varıyor; hem Kayseri merkezine hem il dışına yapılan taşımalarda yol süresi net hesaplanabiliyor.</p><p>İlçe merkezindeki yerleşim toplu, araç yanaşması sorunsuz. İncesu’da <strong>evden eve nakliyat</strong> işlerinde bina kaynaklı zorluk nadiren gündeme geliyor.</p>`,
    kunye: [
      { label: 'Otoyol bağlantısı', value: 'Ulaşım kolay; yol süresi net hesaplanabiliyor.' },
      { label: 'Geçiş noktası', value: 'Şehirlerarası taşımalarda doğal ara durak.' },
      { label: 'İlçe merkezi', value: 'Toplu yerleşim; araç yanaşması sorunsuz.' },
    ],
    guzergahlar: [
      { to: 'Kocasinan', note: 'Kuzeydoğu aksı; Kayseri yönü.' },
      { to: 'Melikgazi', note: 'Kayseri merkezi; yol süresi planlanıyor.' },
      { to: 'Hacılar', note: 'Doğuya geçiş; düz güzergâh.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Kayseri merkezine taşınma tek günde biter mi?', answer: 'Biter. Otoyol bağlantısı sayesinde yol süresi net hesaplanabiliyor.' },
      { question: 'Başka bir ile taşınmak istiyorum, hizmet veriyor musunuz?', answer: 'Veriyoruz. Otoyol üzerinde olmamız uzun güzergâhları kolaylaştırıyor.' },
      { question: 'Fiyata yol masrafı dahil mi?', answer: 'Dahil. Keşiften sonra verilen yazılı fiyat yol ve yakıt dahil toplam tutardır.' },
    ],
  },

  {
    ad: 'Hacılar',
    derinlik: 'orta',
    ozet: 'Hacılar’da taşımaların çoğu aynı mahalle içinde; bu işlerde fiyat mesafeden değil süreden çıkıyor.',
    metaAciklama:
      'Hacılar evden eve nakliyat: kısa mesafeli taşımalarda süreye göre fiyat, sigortalı ambalaj, yazılı teklif.',
    govde: `<p>Hacılar küçük ve toplu bir yerleşim; taşımaların önemli bir bölümü aynı mahalle içinde, hatta birkaç sokak ötesine yapılıyor. Bu işlerde mesafeye göre fiyat vermek anlamsız kalıyor — araç neredeyse hiç yol almıyor, harcanan şey zaman. Bu nedenle çok kısa mesafeli taşımalarda teklifi süre üzerinden çıkarıyoruz; siz de ne için ödediğinizi net görüyorsunuz.</p><p>Yerleşim toplu ve araç yanaşması sorunsuz. Hacılar’da <strong>evden eve nakliyat</strong> işlerinde asıl belirleyici, eşyanın ne kadar sürede indirilip yükleneceği oluyor; ekip sayısını buna göre kuruyoruz.</p>`,
    kunye: [
      { label: 'Sokak arası taşıma', value: 'İşlerin çoğu aynı mahalle içinde; araç neredeyse hiç yol almıyor.' },
      { label: 'Süreye göre fiyat', value: 'Çok kısa mesafede teklif mesafeden değil harcanan zamandan çıkıyor.' },
      { label: 'Ekip planı', value: 'Belirleyici olan indirme-yükleme süresi; ekip buna göre kuruluyor.' },
    ],
    guzergahlar: [
      { to: 'Melikgazi', note: 'Kuzeye geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Talas', note: 'Kuzeydoğu aksı; kısa mesafe.' },
      { to: 'İncesu', note: 'Batıya geçiş; düz güzergâh.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Birkaç sokak ötesine taşınıyorum, nasıl fiyatlanır?', answer: 'Bu işlerde mesafe anlamsız kaldığı için teklifi süre üzerinden çıkarıyoruz; ne için ödediğinizi net görüyorsunuz.' },
      { question: 'Süre tahmininiz tutmazsa fark alır mısınız?', answer: 'Almıyoruz. Keşifte verilen yazılı tutar sabit; süre uzarsa fark bize kalıyor.' },
      { question: 'Eşyalarım sigortalı mı?', answer: 'Bütün taşımalar sigortalı ve kapsam sözleşmede yazılı oluyor.' },
    ],
  },

  {
    ad: 'Bünyan',
    derinlik: 'orta',
    ozet: 'El dokuma halıcılığın sürdüğü Bünyan’da tezgâh taşımak, mobilyadan tamamen farklı bir iş.',
    metaAciklama:
      'Bünyan evden eve nakliyat ve tezgâh taşıma: dokuma tezgâhında sökümlü taşıma, sigortalı, yazılı fiyat.',
    govde: `<p>Bünyan’da el dokuma halıcılık geleneği sürüyor ve bu, taşımaya kendine özgü bir talep katıyor: dokuma tezgâhı. Tezgâh ahşap, büyük ve gerilimli bir yapı; sökülmeden taşınamıyor, yanlış sökülürse yeniden kurulduğunda gerginlik tutmuyor. Söküm sırasını not ederek çalışıyor, montajı aynı sırayla yapıyoruz.</p><p>Üzerinde iş olan tezgâhlar ayrı bir konu. Bu durumda dokuma bölümü ayrıca sarılıp korunuyor. Bünyan’da <strong>evden eve nakliyat</strong> işlerinde bu tür parçaları keşifte mutlaka görmemiz gerekiyor.</p>`,
    kunye: [
      { label: 'Dokuma tezgâhı', value: 'Sökülmeden taşınamıyor; yanlış sökümde gerginlik tutmuyor.' },
      { label: 'Söküm sırası', value: 'Sıra not ediliyor, montaj aynı sırayla yapılıyor.' },
      { label: 'Üzerinde iş olan tezgâh', value: 'Dokuma bölümü ayrıca sarılıp korunuyor.' },
    ],
    guzergahlar: [
      { to: 'Kocasinan', note: 'Batıya geçiş; Kayseri yönü.' },
      { to: 'Melikgazi', note: 'Kayseri merkezi; yol süresi planlanıyor.' },
      { to: 'Sarıoğlan', note: 'Kuzeye geçiş; komşu ilçe.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Dokuma tezgâhımı taşıtabilir miyim?', answer: 'Taşıtabilirsiniz. Söküm sırasını not ederek çalışıyor, montajı aynı sırayla yapıyoruz.' },
      { question: 'Tezgâhın üzerinde yarım kalmış iş var, zarar görür mü?', answer: 'Dokuma bölümü ayrıca sarılıp korunuyor; keşifte görmemiz gerekiyor.' },
      { question: 'Kayseri merkezine taşınma tek günde biter mi?', answer: 'Biter. Yol süresi plana ekleniyor ve iş erken başlatılıyor.' },
    ],
  },

  {
    ad: 'Yahyalı',
    derinlik: 'orta',
    ozet: 'Aladağlar’ın eteğindeki Yahyalı’da köyler yüksekte ve dağınık; güzergâh planlaması taşımanın ilk adımı.',
    metaAciklama:
      'Yahyalı evden eve nakliyat: dağ köylerine uygun araç ve güzergâh planı, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Yahyalı’nın yüksek köylerine yapılan taşımalarda çoğu zaman tek araçla iş bitmiyor. Uyguladığımız yöntem iki aşamalı: yük önce büyük araçla ilçe merkezine getiriliyor, orada bekletilmeden ikinci ve daha küçük bir araca aktarılıp yukarı çıkarılıyor. Tek araçla zorlamak yerine bu yolu seçmemizin sebebi basit — dar ve virajlı yolda büyük aracı zorlamak hem eşya hem ekip için risk.</p><p>Aktarma noktası ve saati taşımadan önce belirleniyor; yük ortada beklemiyor. Yahyalı’da <strong>evden eve nakliyat</strong> teklifi verirken bu iki aşamayı ayrı ayrı hesaplayıp tek fiyat olarak yazıyoruz.</p>`,
    kunye: [
      { label: 'İki aşamalı taşıma', value: 'Yük merkeze büyük araçla, oradan yukarı küçük araçla çıkarılıyor.' },
      { label: 'Zorlamama', value: 'Dar ve virajlı yolda büyük araç zorlanmıyor; risk eşyada ve ekipte.' },
      { label: 'Aktarma planı', value: 'Nokta ve saat önceden belirleniyor; yük ortada bekletilmiyor.' },
    ],
    guzergahlar: [
      { to: 'Develi', note: 'Kuzeye geçiş; dağ eteği yolu.' },
      { to: 'Talas', note: 'Kayseri yönü; yol süresi planlanıyor.' },
      { to: 'Melikgazi', note: 'Kayseri merkezi; erken başlangıç gerekiyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'İki aşamalı taşıma ek ücret mi demek?', answer: 'İki aşamayı ayrı hesaplayıp tek fiyat olarak yazıyoruz. Keşifte gördüğünüz tutar toplam tutar; sonradan fark çıkmıyor.' },
      { question: 'Eşyam aktarma sırasında bekler mi?', answer: 'Beklemiyor. Aktarma noktası ve saati önceden belirleniyor, ikinci araç orada hazır oluyor.' },
      { question: 'Neden büyük araçla doğrudan çıkmıyorsunuz?', answer: 'Dar ve virajlı yolda büyük aracı zorlamak eşya ve ekip için gerçek bir risk. Güvenli yolu tercih ediyoruz.' },
    ],
  },
]

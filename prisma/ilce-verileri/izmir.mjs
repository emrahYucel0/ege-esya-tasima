// prisma/ilce-verileri/izmir.mjs
//
// İzmir'in 30 ilçesinden 26'sı. Dördü BİLEREK ATLANDI.
//
// ─────────────────────────────────────────────────────────────────────────
// ATLANANLAR: Beydağ, Kiraz, Kınık, Karaburun
//
// Dördü de küçük nüfuslu ve nakliyat aramasında karşılığı yok denecek kadar
// az. Bu ilçeler için sayfa açmak iki yönden zarar:
//   1. Yazacak doğrulanabilir bilgi yok — içerik ya ince ya uydurma olurdu.
//   2. Google site genelinde ortalama kaliteye bakıyor; getirisi olmayan
//      ince sayfalar, getirisi olan sayfaları da aşağı çekiyor.
// İhtiyaç doğarsa sonradan eklenebilirler; eksik bırakmak burada bilinçli
// bir karar.
//
// ─────────────────────────────────────────────────────────────────────────
// İKİ DERİNLİK SEVİYESİ
//
// `derinlik: 'tam'`  → yüksek arama hacmi (14 ilçe)
//     3 paragraf gövde, 4 SSS, 4-5 künye, 4 güzergâh, mahalle listesi
//
// `derinlik: 'orta'` → orta arama hacmi (12 ilçe)
//     2 paragraf gövde, 3 SSS, 3 künye, 3 güzergâh
//     Kısa olması eksiklik değil: söylenecek doğrulanabilir şey kadar
//     yazıldı. Uzatmak için tekrar eklemek, tam da kaçındığımız kopya
//     içeriği üretirdi.
//
// ─────────────────────────────────────────────────────────────────────────
// UYDURMA YOK
// Mahalle listeleri yalnızca kentsel ilçelerde ve yalnızca doğruluğundan
// emin olunan adlarla dolu. Rakam (nüfus, mesafe, rakım) hiçbir yerde yok.
// Her metin farklı bir eksenden yazıldı; şablon kullanılmadı.
//
// ANAHTAR KELİME
// "evden eve nakliyat" her sayfada TAM BİR KEZ geçiyor. İlçe adı 2-3 kez.
// Aynı ifadeyi sayfa başına 3-4 kez tekrarlamak aşırı optimizasyon sinyali.

export const il = { ad: 'İzmir', plaka: 35 }

export const ilceler = [
  // ───────────────────────── TAM DERİNLİK (14) ─────────────────────────
  {
    ad: 'Konak',
    derinlik: 'tam',
    ozet:
      'İzmir’in tarihi ve ticari çekirdeği Konak’ta taşımanın en zor tarafı eşya değil, aracın nereye çekileceğidir.',
    metaAciklama:
      'Konak evden eve nakliyat: yükleme yeri planlanmış, sigortalı ve yazılı sabit fiyatlı taşıma. Ücretsiz keşif için hemen arayın.',
    govde: `<p>Konak’ta taşınma planı sokaktan başlar. İlçe İzmir’in hem tarihi çekirdeğini hem de en yoğun ticaret alanını taşıyor; Kemeraltı ve çevresindeki sokakların bir bölümüne araç hiç giremiyor, girebildiği yerlerde de gün içi park neredeyse imkânsız. Bu adreslerde yükü sokağın girebildiğimiz en yakın noktasına kadar getirip kalan mesafeyi ekiple taşıyoruz.</p><p>Yapı stoğu ilçe içinde belirgin biçimde değişiyor. Alsancak ve Güzelyalı hattındaki apartmanların çoğu asansörlü ama asansörler dar; gardırop ve köşe takımı gibi parçalar merdivenden iniyor. Basmane ve Eşrefpaşa çevresindeki eski yapılarda ise asansör çoğu zaman hiç yok. Konak’ta <strong>evden eve nakliyat</strong> teklifi verirken kat sayısından çok merdiven genişliğine ve sahanlık ölçüsüne bakıyoruz.</p><p>Sahil bandındaki trafik de plana giriyor. İşleri sabah erken başlatıyor, mümkün olduğunca gün ortası yoğunluğundan önce yüklemeyi bitiriyoruz. Ticari adreslerde ise çalışma çoğunlukla mesai dışına alınıyor.</p>`,
    kunye: [
      { label: 'Sokak erişimi', value: 'Kemeraltı ve çevresinde araç giremeyen sokaklar var; elle taşıma mesafesi ölçülüyor.' },
      { label: 'Park', value: 'Cadde üstü adreslerde gün içi park imkânsıza yakın; yer önceden ayırtılıyor.' },
      { label: 'Asansör', value: 'Alsancak hattında asansörler dar, Basmane çevresindeki eski yapılarda çoğu zaman yok.' },
      { label: 'Sahil trafiği', value: 'Gün ortası yoğun; iş sabah erken başlatılıyor.' },
      { label: 'Ticari adres', value: 'Dükkân ve ofis taşımaları mesai dışına planlanıyor.' },
    ],
    guzergahlar: [
      { to: 'Karabağlar', note: 'Güneye geçiş; varış tarafında dar sokak planlaması yapılıyor.' },
      { to: 'Bornova', note: 'Doğu aksı; iş tek günde tamamlanıyor.' },
      { to: 'Karşıyaka', note: 'Körfezin karşı yakası; güzergâh süresi plana dahil ediliyor.' },
      { to: 'Balçova', note: 'Batıya geçiş; varışta eğim hesaba katılıyor.' },
    ],
    mahalleler: ['Alsancak', 'Kemeraltı', 'Basmane', 'Güzelyalı', 'Göztepe', 'Hatay', 'Eşrefpaşa', 'Umurbey'],
    sorular: [
      {
        question: 'Sokağımıza kamyon giremiyor, ne yapıyorsunuz?',
        answer:
          'Yükü girebildiğimiz en yakın noktaya kadar küçük araçla getirip kalan mesafeyi ekiple taşıyoruz. Bu mesafe keşifte ölçülüyor ve fiyata baştan dahil ediliyor.',
      },
      {
        question: 'Asansör dar, mobilyalar sığmıyor. Çözüm var mı?',
        answer:
          'Var. Yüksek katlarda dış cephe asansörü kuruyoruz; sığmayan parçaları marangozumuz yerinde söküp yeni adreste yeniden kuruyor.',
      },
      {
        question: 'Dükkânımı taşıtmak istiyorum, hafta içi kapatmam gerekir mi?',
        answer:
          'Gerekmez. Konak’taki ticari taşımaların çoğunu mesai dışında ya da hafta sonu yapıyoruz; ertesi sabah dükkân çalışır durumda oluyor.',
      },
      {
        question: 'Fiyat keşiften sonra değişir mi?',
        answer:
          'Değişmez. Keşif sonrası verilen yazılı fiyat taşıma gününe kadar geçerli kalıyor.',
      },
    ],
  },

  {
    ad: 'Karşıyaka',
    derinlik: 'tam',
    ozet:
      'Sahil bandına sıkışmış yoğun apartman dokusuyla Karşıyaka’da taşımanın belirleyicisi yükleme yeri bulmaktır.',
    metaAciklama:
      'Karşıyaka evden eve nakliyat: yükleme yeri önceden ayrılmış, sigortalı taşıma ve yazılı sabit fiyat. Ücretsiz keşif için arayın.',
    govde: `<p>Karşıyaka dar bir sahil şeridine yayılmış ve yapı yoğunluğu yüksek. Bostanlı ile Çarşı arasındaki hatta apartmanlar sokağa çok yakın oturuyor, park yeri gün boyu dolu. Taşımada asıl mesele bu: aracı bina önüne çekebilmek. Yükleme yerini bir gün önceden apartman görevlisi ya da site yönetimiyle konuşup ayırtıyoruz, aksi hâlde ekip yolda bekliyor.</p><p>Mavişehir tarafı ilçenin geri kalanından ayrılıyor. Buradaki siteler planlı, yollar geniş, bloklarda yük asansörü var ve iş öngörülebilir ilerliyor. Buna karşılık site girişi çoğunlukla izne ve saat aralığına bağlı. Karşıyaka’da <strong>evden eve nakliyat</strong> planlarken bu izni taşımadan önce yazılı olarak alıyoruz.</p><p>İlçe içi taşımalar burada çok yaygın. Aynı mahallede ya da komşu mahalleye geçen aileler için iş genellikle yarım günde bitiyor, çünkü yol süresi neredeyse hiç yok.</p>`,
    kunye: [
      { label: 'Yükleme yeri', value: 'Sahil hattında park gün boyu dolu; yer bir gün önceden ayırtılıyor.' },
      { label: 'İki farklı doku', value: 'Çarşı çevresinde yoğun apartman, Mavişehir’de planlı siteler.' },
      { label: 'Site izni', value: 'Mavişehir sitelerinde araç girişi izne ve saat aralığına bağlı.' },
      { label: 'İlçe içi taşıma', value: 'Yakın adres değişiklikleri yaygın; çoğu yarım günde tamamlanıyor.' },
    ],
    guzergahlar: [
      { to: 'Çiğli', note: 'Kuzeye geçiş; düz güzergâh, iş tek günde bitiyor.' },
      { to: 'Bayraklı', note: 'Komşu ilçe; kısa mesafe.' },
      { to: 'Konak', note: 'Körfezin karşı yakası; varışta park yeri önceden ayırtılıyor.' },
      { to: 'Bornova', note: 'Doğu aksı; yol süresi plana dahil ediliyor.' },
    ],
    mahalleler: ['Bostanlı', 'Mavişehir', 'Alaybey', 'Bahariye', 'Şemikler', 'Atakent', 'Donanmacı'],
    sorular: [
      {
        question: 'Bina önünde park yeri yok, araç nereye yanaşacak?',
        answer:
          'Yükleme yerini bir gün önceden apartman görevlisi ya da yönetimle konuşup ayırtıyoruz. Mümkün değilse yol izni alıyor ya da aktarma planlıyoruz.',
      },
      {
        question: 'Mavişehir’deki sitem belirli saatte izin veriyor, yetişir mi?',
        answer:
          'Yetişiyor. Saat kısıtını keşifte öğrenip ekip ve araç sayısını ona göre ayarlıyoruz; gerekirse iki araçla eşzamanlı çalışıyoruz.',
      },
      {
        question: 'Karşıyaka içinde taşınıyorum, fiyat düşer mi?',
        answer:
          'Düşer. Yol süresi olmadığı için ilçe içi taşımalar belirgin şekilde daha uygun ve çoğu yarım günde bitiyor.',
      },
      {
        question: 'Eşyalarım sigortalı mı?',
        answer:
          'Bütün taşımalar sigortalı yapılıyor ve kapsam sözleşmede yazılı oluyor.',
      },
    ],
  },

  {
    ad: 'Bornova',
    derinlik: 'tam',
    ozet:
      'Üniversite nüfusu Bornova’da taşınma takvimini akademik döneme bağlıyor; dönem başı ve sonu belirgin şekilde yoğun.',
    metaAciklama:
      'Bornova evden eve nakliyat: öğrenci ve aile taşımalarına uygun planlama, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Bornova’da taşınma trafiğinin ritmini akademik takvim belirliyor. Dönem başında ve sonunda küçük hacimli öğrenci taşımaları yoğunlaşıyor; bu haftalarda uygun gün bulmak zorlaşıyor. Kayıt dönemine denk gelen bir taşınma planlıyorsanız birkaç gün erken haber vermeniz işi kolaylaştırıyor.</p><p>Yapı dokusu iki yüzlü. Kazımdirik ve Evka bölgelerinde toplu konut ve düzenli bloklar var; araç yanaşıyor, asansör kullanılabiliyor. Çamdibi ve Doğanlar tarafında ise sokaklar daralıyor, eski yapılarda asansör bulunmuyor. Bornova’da <strong>evden eve nakliyat</strong> teklifini bu iki duruma göre ayrı hesaplıyoruz.</p><p>İlçenin ana arterlere yakınlığı avantaj: Konak ve Bayraklı yönündeki taşımalar kısa sürüyor, işlerin büyük çoğunluğu tek günde tamamlanıyor.</p>`,
    kunye: [
      { label: 'Akademik takvim', value: 'Dönem başı ve sonunda öğrenci taşımaları yoğunlaşıyor; uygun gün sınırlı.' },
      { label: 'Küçük hacim', value: 'Tek oda ve stüdyo taşımaları yaygın; bu işler yarım günde bitiyor.' },
      { label: 'İki farklı doku', value: 'Kazımdirik ve Evka’da toplu konut, Çamdibi tarafında dar sokak ve eski yapı.' },
      { label: 'Ulaşım', value: 'Ana arterlere yakın; Konak ve Bayraklı yönü kısa sürüyor.' },
    ],
    guzergahlar: [
      { to: 'Bayraklı', note: 'Komşu ilçe; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Konak', note: 'Batıya geçiş; varışta park yeri önceden ayırtılıyor.' },
      { to: 'Buca', note: 'Güneye geçiş; varış tarafında eğim planlanıyor.' },
      { to: 'Kemalpaşa', note: 'Doğu aksı; yol süresi hesaba katılıyor.' },
    ],
    mahalleler: ['Kazımdirik', 'Erzene', 'Çamdibi', 'Mevlana', 'Doğanlar', 'Işıkkent', 'Ergene'],
    sorular: [
      {
        question: 'Öğrenci eviyim, az eşyam var. Küçük iş yapıyor musunuz?',
        answer:
          'Yapıyoruz. Küçük hacimli taşımalar için uygun ölçüde araç ve az kişilik ekip planlıyoruz; bu işler genellikle yarım günde bitiyor.',
      },
      {
        question: 'Dönem başında yer bulabilir miyim?',
        answer:
          'Bulabilirsiniz ama o haftalar hızlı doluyor. Birkaç gün önceden haber vermeniz uygun gün seçmenizi sağlıyor.',
      },
      {
        question: 'Eşyalarımı ben paketlesem fiyat düşer mi?',
        answer:
          'Düşer. Ambalaj hizmetini almadığınızda teklif buna göre hesaplanıyor; malzemeyi yine biz sağlayabiliyoruz.',
      },
      {
        question: 'Asansörsüz binadan taşıma yapılıyor mu?',
        answer:
          'Yapılıyor. Kat yüksekse dış cephe asansörü kuruyoruz, düşükse ekip sayısını artırıyoruz. İhtiyaç keşifte belirleniyor.',
      },
    ],
  },

  {
    ad: 'Buca',
    derinlik: 'tam',
    ozet:
      'Geniş bir alana yayılan ve yer yer eğimli olan Buca’da aracın adrese ne kadar yaklaşabildiği baştan belirleniyor.',
    metaAciklama:
      'Buca evden eve nakliyat: eğimli ve dar sokaklara uygun araç planı, sigortalı taşıma, yazılı sabit fiyat. Ücretsiz keşif.',
    govde: `<p>Buca geniş bir alana yayılıyor ve tek bir karaktere sığmıyor. Şirinyer ve çevresindeki yerleşim düzenli, araç yanaşması sorunsuz; buna karşılık yamaçlara doğru çıkan mahallelerde sokaklar daralıyor ve eğim artıyor. Bu adreslerde büyük araçla çıkmak mümkün olmuyor, yükü cadde başında küçük araca aktarıyoruz.</p><p>Yapı stoğunun önemli bir bölümü düşük ve orta katlı. Asansör her binada bulunmuyor; merdiven genişliği de değişken. Buca’da <strong>evden eve nakliyat</strong> teklifi hazırlarken kat sayısıyla birlikte merdiven ölçüsünü not ediyoruz, çünkü gardırobun dönüp dönmediğini belirleyen şey bu.</p><p>İlçe içi mesafeler uzun olabiliyor. Buca’nın bir ucundan diğerine yapılan bir taşıma, komşu ilçeye yapılan bir işten daha fazla sürebiliyor; güzergâhı önceden çıkarıyoruz.</p>`,
    kunye: [
      { label: 'Yayılım', value: 'İlçe geniş; bir ucundan diğerine mesafe komşu ilçeden uzun olabiliyor.' },
      { label: 'Eğim', value: 'Yamaç mahallelerinde sokaklar dar ve dik; büyük araç çıkamıyor.' },
      { label: 'Aktarma', value: 'Dik sokaklarda yük cadde başında küçük araca aktarılıyor.' },
      { label: 'Yapı', value: 'Ağırlıklı düşük ve orta katlı; asansör her binada yok, merdiven ölçüsü değişken.' },
    ],
    guzergahlar: [
      { to: 'Bornova', note: 'Kuzeye geçiş; iş tek günde tamamlanıyor.' },
      { to: 'Gaziemir', note: 'Batıya geçiş; düz güzergâh.' },
      { to: 'Karabağlar', note: 'Komşu ilçe; varış tarafında dar sokak planlaması yapılıyor.' },
      { to: 'Torbalı', note: 'Güneye geçiş; yol süresi hesaba katılıyor.' },
    ],
    mahalleler: ['Şirinyer', 'Kozağaç', 'Adatepe', 'Tınaztepe', 'Yıldız', 'Çamlıkule'],
    sorular: [
      {
        question: 'Sokağımız dik, kamyon çıkabilir mi?',
        answer:
          'Çoğu dik sokakta büyük araç çıkamıyor. Keşifte sokağı görüp cadde başında aktarma planı yapıyoruz; bu teklifte önceden yazılı oluyor.',
      },
      {
        question: 'Buca içinde taşınıyorum ama mesafe uzun, fiyat nasıl?',
        answer:
          'İlçe içi olsa da mesafe fiyata giriyor. Güzergâhı keşifte çıkarıp yol süresini yazılı fiyata yansıtıyoruz.',
      },
      {
        question: 'Mobilya söküm ve montajı yapıyor musunuz?',
        answer:
          'Marangozlu söküm ve montaj hizmetimiz var. Talep ederseniz teklife dahil ediliyor ve mobilyalar yeni adreste kurulmuş teslim ediliyor.',
      },
      {
        question: 'Keşif ücretli mi?',
        answer:
          'Keşif ücretsiz. Ekibimiz adrese gelip eşyayı ve binayı yerinde görüyor, ardından yazılı sabit fiyat veriyor.',
      },
    ],
  },

  {
    ad: 'Karabağlar',
    derinlik: 'tam',
    ozet:
      'Yoğun ve sıkışık yapı dokusuyla Karabağlar’da taşımanın planı, sokak genişliğine göre kuruluyor.',
    metaAciklama:
      'Karabağlar evden eve nakliyat: dar sokaklara uygun araç ve ekip planı, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Karabağlar İzmir’in en yoğun yerleşimlerinden biri. Binalar birbirine yakın, sokaklar dar ve park yeri gün boyu dolu. Bu koşullarda taşımanın hızını belirleyen şey eşya miktarı değil, aracın bina önüne yanaşıp yanaşamaması oluyor. Keşifte ilk baktığımız şey de bu.</p><p>Yapı stoğu büyük ölçüde orta katlı ve bir bölümünde asansör bulunmuyor. Merdivenler dar, sahanlıklar kısa; büyük mobilyaların bir kısmı sökülmeden inmiyor. Karabağlar’da <strong>evden eve nakliyat</strong> işlerinde marangozu ekiple birlikte gönderiyoruz, böylece iş gün içinde durmuyor.</p><p>İlçenin Konak ve Buca ile komşuluğu, bu yönlerdeki taşımaları kısaltıyor. Çoğu iş tek günde, ilçe içi taşımalar ise yarım günde tamamlanıyor.</p>`,
    kunye: [
      { label: 'Sokak genişliği', value: 'Sokaklar dar, park gün boyu dolu; araç yanaşması planın ilk konusu.' },
      { label: 'Merdiven', value: 'Dar merdiven ve kısa sahanlık yaygın; büyük mobilyalar sökülerek indiriliyor.' },
      { label: 'Marangoz', value: 'Söküm ihtiyacı sık olduğu için marangoz ekiple birlikte gidiyor.' },
      { label: 'Komşuluk', value: 'Konak ve Buca yönündeki taşımalar kısa sürüyor.' },
    ],
    guzergahlar: [
      { to: 'Konak', note: 'Kuzeye geçiş; varışta yükleme yeri önceden ayırtılıyor.' },
      { to: 'Buca', note: 'Doğuya geçiş; varış tarafında eğim planlanıyor.' },
      { to: 'Gaziemir', note: 'Güneye geçiş; düz güzergâh, iş tek günde bitiyor.' },
      { to: 'Balçova', note: 'Batıya geçiş; kısa mesafe.' },
    ],
    mahalleler: ['Bozyaka', 'Yeşilyurt', 'Basın Sitesi', 'Uzundere', 'Vatan', 'Umut'],
    sorular: [
      {
        question: 'Dar sokakta yükleme nasıl yapılıyor?',
        answer:
          'Araç girebiliyorsa bina önüne çekiliyor; giremiyorsa yük cadde başında aktarılıyor ve kalan mesafe ekiple taşınıyor. Mesafe keşifte ölçülüyor.',
      },
      {
        question: 'Gardırobum merdivenden inmiyor, ne olacak?',
        answer:
          'Marangozumuz yerinde söküyor, yeni adreste yeniden kuruyor. Bu hizmet keşifte belirlenip fiyata dahil ediliyor.',
      },
      {
        question: 'Taşıma tek günde biter mi?',
        answer:
          'Karabağlar içindeki ve komşu ilçelere yapılan işlerin neredeyse tamamı tek günde tamamlanıyor.',
      },
      {
        question: 'Ambalaj malzemesini siz mi getiriyorsunuz?',
        answer:
          'Evet. Koli, balonlu naylon, streç ve mobilya battaniyesi ekiple birlikte geliyor.',
      },
    ],
  },

  {
    ad: 'Bayraklı',
    derinlik: 'tam',
    ozet:
      'Yüksek katlı yeni kuleler ile eski mahallelerin yan yana durduğu Bayraklı’da iki farklı taşıma düzeni gerekiyor.',
    metaAciklama:
      'Bayraklı evden eve nakliyat: yüksek katlı bloklar ve eski mahalleler için ayrı planlama, sigortalı taşıma, yazılı fiyat.',
    govde: `<p>Bayraklı son yıllarda İzmir’in en hızlı değişen ilçesi oldu. Salhane hattındaki yüksek katlı kulelerde yük asansörü, kapalı otopark ve düzenli yükleme alanı var; bu adreslerde iş hızlı ve öngörülebilir ilerliyor. Tek dikkat edilen konu asansör rezervasyonu — çoğu blokta önceden saat ayırtmak gerekiyor.</p><p>İlçenin yamaca doğru uzanan eski mahallelerinde tablo değişiyor. Sokaklar daralıyor, binalar asansörsüz ve eğim artıyor. Bayraklı’da <strong>evden eve nakliyat</strong> planlarken adresin hangi tarafta olduğunu bilmek, teklifi doğru çıkarmanın ön şartı.</p><p>Körfez çevresindeki konumu ilçeyi merkeze yakın kılıyor. Konak, Karşıyaka ve Bornova yönündeki taşımalar kısa sürüyor ve tek günde tamamlanıyor.</p>`,
    kunye: [
      { label: 'Yeni kuleler', value: 'Salhane hattında yük asansörü ve kapalı otopark var; asansör önceden ayırtılıyor.' },
      { label: 'Eski mahalleler', value: 'Yamaca doğru sokaklar daralıyor, binalar asansörsüz.' },
      { label: 'Adres farkı', value: 'Teklif, adresin hangi dokuda olduğuna göre değişiyor.' },
      { label: 'Merkeze yakınlık', value: 'Konak, Karşıyaka ve Bornova yönü kısa; işler tek günde bitiyor.' },
    ],
    guzergahlar: [
      { to: 'Karşıyaka', note: 'Komşu ilçe; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Bornova', note: 'Doğuya geçiş; düz güzergâh.' },
      { to: 'Konak', note: 'Güneye geçiş; varışta park yeri önceden ayırtılıyor.' },
      { to: 'Çiğli', note: 'Kuzeye geçiş; yol süresi plana dahil ediliyor.' },
    ],
    mahalleler: ['Mansuroğlu', 'Adalet', 'Manavkuyu', 'Turan', 'Onur', 'Bayraklı Merkez'],
    sorular: [
      {
        question: 'Yüksek katlı bir kulede oturuyorum, taşıma nasıl ilerliyor?',
        answer:
          'Yük asansörü için önceden saat ayırtıyoruz. Rezervasyon yapıldığında iş hızlı ilerliyor; asansör beklemesi olmuyor.',
      },
      {
        question: 'Eski mahallede asansör yok, ek ücret çıkar mı?',
        answer:
          'Ek ekip ya da dış cephe asansörü gerekiyorsa bu keşifte belirlenip fiyata baştan dahil ediliyor; gün içinde sürpriz çıkmıyor.',
      },
      {
        question: 'Kaçıncı kata kadar dış cephe asansörü kuruyorsunuz?',
        answer:
          'Pratikte binanın yüksekliği izin verdiği sürece kuruyoruz. Uygunluğu keşifte yerinde değerlendiriyoruz.',
      },
      {
        question: 'Depolama hizmetiniz var mı?',
        answer:
          'Var. Tarihler arasında boşluk olduğunda eşyalarınızı depolayıp anlaştığımız günde teslim ediyoruz.',
      },
    ],
  },

  {
    ad: 'Çiğli',
    derinlik: 'tam',
    ozet:
      'Planlı toplu konut alanları ve sanayi bölgesiyle Çiğli’de konut ve işyeri taşımaları ayrı planlanıyor.',
    metaAciklama:
      'Çiğli evden eve nakliyat ve işyeri taşıma: planlı, sigortalı ve yazılı sabit fiyatlı hizmet. Ücretsiz keşif için arayın.',
    govde: `<p>Çiğli’de erişim büyük ölçüde rahat. Ataşehir ve Egekent gibi toplu konut alanlarında yollar geniş, araç bina önüne yanaşabiliyor ve bloklarda asansör bulunuyor. Bu, yükleme süresini kısaltıyor ve teklifin öngörülebilir olmasını sağlıyor. Site girişi için izin gerekiyorsa bunu taşımadan önce yönetimle görüşüp alıyoruz.</p><p>İlçenin diğer yüzü organize sanayi. Buradaki taşımalar konut işinden farklı: raf sökümü, makine sabitlemesi ve ağır parça taşıma devreye giriyor, ekipman ve ekip değişiyor. Çiğli’de <strong>evden eve nakliyat</strong> ile işyeri taşımasını aynı teklifte birleştirmiyor, ikisini ayrı planlıyoruz.</p><p>Kuzey aksındaki konumu Karşıyaka ve Menemen yönündeki taşımaları kısaltıyor. Merkez ilçelere yapılan işlerde ise yol süresi hesaba giriyor.</p>`,
    kunye: [
      { label: 'Toplu konut', value: 'Geniş yol ve asansörlü bloklar; yükleme hızlı ve öngörülebilir.' },
      { label: 'Site izni', value: 'Kapalı sitelerde araç girişi önceden yönetim iznine bağlı.' },
      { label: 'Organize sanayi', value: 'İşyeri taşımalarında raf ve makine demontajı ayrı planlanıyor.' },
      { label: 'Konum', value: 'Karşıyaka ve Menemen yönü kısa; merkez ilçelere yol süresi hesaba giriyor.' },
    ],
    guzergahlar: [
      { to: 'Karşıyaka', note: 'Güneye geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Menemen', note: 'Kuzeye geçiş; düz güzergâh.' },
      { to: 'Bayraklı', note: 'Güneydoğu aksı; yol süresi planlanıyor.' },
      { to: 'Konak', note: 'Merkeze geçiş; varışta park yeri önceden ayırtılıyor.' },
    ],
    mahalleler: ['Ataşehir', 'Balatçık', 'Egekent', 'Küçük Çiğli', 'Harmandalı', 'Şirintepe'],
    sorular: [
      {
        question: 'Sanayideki işyerimi taşıtabilir miyim?',
        answer:
          'Taşıtabilirsiniz. Raf sistemleri sökülüp numaralanıyor, makineler sabitlenerek taşınıyor; keşif de bu kapsamda yapılıyor.',
      },
      {
        question: 'Site girişi için izni kim alıyor?',
        answer:
          'İzni ve yükleme saatini biz yönetimle görüşerek ayarlıyoruz. Sizden yalnızca yönetimin iletişim bilgisi yeterli.',
      },
      {
        question: 'İşyeri taşıması hafta sonu yapılabilir mi?',
        answer:
          'Yapılabilir. Üretimin ya da satışın durmaması için işleri çoğunlukla hafta sonuna planlıyoruz.',
      },
      {
        question: 'Beyaz eşya sökümü dahil mi?',
        answer:
          'Dahil. Çamaşır makinesi tamburu sabitleniyor, buzdolabı taşımaya hazırlanıyor ve yeni adreste bağlantıları kuruluyor.',
      },
    ],
  },

  {
    ad: 'Gaziemir',
    derinlik: 'tam',
    ozet:
      'Havalimanı ve lojistik hattına yakınlığıyla Gaziemir’de konut taşımaları kadar işyeri taşımaları da yaygın.',
    metaAciklama:
      'Gaziemir evden eve nakliyat: konut ve işyeri taşımalarına uygun planlama, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Gaziemir’in konumu ilçenin taşıma profilini belirliyor. Havalimanı ve lojistik hattına yakınlık, depo ve işyeri taşımalarını konut işleri kadar yaygın hâle getiriyor. Ticari adreslerde raf sökümü ve ağır parça taşıma için ayrı ekipman planlıyoruz; bu işleri konut taşımasından bağımsız fiyatlandırıyoruz.</p><p>Konut tarafında yerleşim büyük ölçüde düzenli. Sokaklar araç geçişine uygun, binaların çoğunda asansör var ve yükleme sorunsuz ilerliyor. Gaziemir’de <strong>evden eve nakliyat</strong> işlerinde süreyi belirleyen şey erişim değil, eşya hacmi oluyor.</p><p>İlçenin ana yol bağlantıları güçlü. Buca, Karabağlar ve Balçova yönündeki taşımalar kısa sürüyor; çoğu iş tek günde tamamlanıyor.</p>`,
    kunye: [
      { label: 'Lojistik hattı', value: 'Havalimanı çevresinde depo ve işyeri taşıması yaygın.' },
      { label: 'Ticari ekipman', value: 'Raf sökümü ve ağır parça taşıma konut işinden ayrı planlanıyor.' },
      { label: 'Konut erişimi', value: 'Sokaklar geniş, binaların çoğunda asansör var; yükleme sorunsuz.' },
      { label: 'Yol bağlantısı', value: 'Buca, Karabağlar ve Balçova yönü kısa; işler tek günde bitiyor.' },
    ],
    guzergahlar: [
      { to: 'Buca', note: 'Doğuya geçiş; düz güzergâh, iş aynı gün bitiyor.' },
      { to: 'Karabağlar', note: 'Kuzeye geçiş; varış tarafında dar sokak planlaması yapılıyor.' },
      { to: 'Balçova', note: 'Batıya geçiş; kısa mesafe.' },
      { to: 'Menderes', note: 'Güneye geçiş; yol süresi hesaba katılıyor.' },
    ],
    mahalleler: ['Atıfbey', 'Sarnıç', 'Irmak', 'Gazi', 'Emrez'],
    sorular: [
      {
        question: 'Depomu taşıtmak istiyorum, konut taşımasından farkı ne?',
        answer:
          'Ekipman ve ekip farklı. Raf sistemleri sökülüp numaralanıyor, ağır parçalar için taşıma kızağı ve kayış kullanılıyor.',
      },
      {
        question: 'Konut taşıması ne kadar sürüyor?',
        answer:
          'Erişim rahat olduğu için süreyi hacim belirliyor. Orta ölçekli bir daire genellikle yarım gün ile bir gün arasında tamamlanıyor.',
      },
      {
        question: 'Şehirlerarası taşıma yapıyor musunuz?',
        answer:
          'Yapıyoruz. Gaziemir’den Türkiye’nin her iline taşıma düzenliyoruz; yol ve konaklama fiyata baştan dahil.',
      },
      {
        question: 'Sözleşme yapıyor musunuz?',
        answer:
          'Her taşıma için yazılı sözleşme düzenliyoruz; fiyat, tarih, kapsam ve sigorta koşulları içinde yer alıyor.',
      },
    ],
  },

  {
    ad: 'Balçova',
    derinlik: 'tam',
    ozet:
      'Yamaca kurulu ve kompakt bir ilçe olan Balçova’da eğim, taşıma süresini kat sayısından daha çok etkiliyor.',
    metaAciklama:
      'Balçova evden eve nakliyat: eğimli sokaklara uygun araç ve ekip planı, sigortalı taşıma, yazılı sabit fiyat.',
    govde: `<p>Balçova küçük ama dikey bir ilçe. Sahil hattından yamaca doğru çıkıldıkça sokaklar dikleşiyor ve bazı noktalarda büyük araçla manevra yapmak mümkün olmuyor. Eğim, taşıma süresini kat sayısından daha çok etkileyen unsur; yükleme sırasında ekip sayısını buna göre belirliyoruz.</p><p>Yapı stoğu ağırlıklı orta katlı ve büyük bölümünde asansör var. Ancak asansörler dar olabiliyor; büyük mobilyalar merdivenden iniyor. Balçova’da <strong>evden eve nakliyat</strong> teklifi verirken asansörün eşya kabul edip etmediğini yerinde ölçüyoruz.</p><p>İlçe merkeze yakın ve komşularıyla bağlantısı kısa. Konak, Narlıdere ve Karabağlar yönündeki işler çoğunlukla yarım gün ile bir gün arasında tamamlanıyor.</p>`,
    kunye: [
      { label: 'Eğim', value: 'Sahilden yamaca doğru sokaklar dikleşiyor; manevra alanı daralıyor.' },
      { label: 'Ekip sayısı', value: 'Eğimli adreslerde süre uzadığı için ekip sayısı artırılıyor.' },
      { label: 'Asansör ölçüsü', value: 'Asansörler dar olabiliyor; eşya kabul edip etmediği yerinde ölçülüyor.' },
      { label: 'Komşuluk', value: 'Konak, Narlıdere ve Karabağlar yönü kısa; işler tek günde bitiyor.' },
    ],
    guzergahlar: [
      { to: 'Narlıdere', note: 'Batıya geçiş; kısa mesafe, iş yarım günde bitebiliyor.' },
      { to: 'Konak', note: 'Doğuya geçiş; varışta park yeri önceden ayırtılıyor.' },
      { to: 'Karabağlar', note: 'Güneydoğu aksı; varış tarafında dar sokak planlaması yapılıyor.' },
      { to: 'Güzelbahçe', note: 'Batıya devam; düzenli güzergâh.' },
    ],
    mahalleler: ['Korutürk', 'Çetin Emeç', 'Onur', 'Bahçelerarası', 'İnciraltı'],
    sorular: [
      {
        question: 'Sokağımız dik, araç yanaşabilir mi?',
        answer:
          'Çoğu adreste yanaşabiliyor ama manevra alanı dar. Keşifte sokağı görüp uygun araç seçiyor, gerekirse aktarma planlıyoruz.',
      },
      {
        question: 'Asansör küçük, mobilyalar sığmazsa ne olur?',
        answer:
          'Sığmayan parçalar merdivenden iniyor ya da marangoz tarafından yerinde sökülüyor. İki durumu da keşifte belirleyip fiyata yansıtıyoruz.',
      },
      {
        question: 'Balçova içinde taşınıyorum, ne kadar sürer?',
        answer:
          'İlçe kompakt olduğu için ilçe içi taşımalar çoğunlukla yarım günde tamamlanıyor.',
      },
      {
        question: 'Yağmurlu günde taşıma yapıyor musunuz?',
        answer:
          'Yapıyoruz. Eşyalar streç ve naylonla korunuyor; eğimli zeminde ek ekip ve taşıma askısı kullanılıyor.',
      },
    ],
  },

  {
    ad: 'Narlıdere',
    derinlik: 'tam',
    ozet:
      'Planlı yerleşimi ve müstakil ev karışımıyla Narlıdere’de taşınan hacim, aynı oda sayısındaki bir daireden büyük olabiliyor.',
    metaAciklama:
      'Narlıdere evden eve nakliyat: müstakil ev ve site taşımalarına uygun ekip planı, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Narlıdere’de yerleşim iki tipe ayrılıyor. Sahil hattındaki siteler planlı; yollar geniş, araç bina önüne yanaşıyor ve bloklarda asansör bulunuyor. Yamaca doğru ise müstakil ve bahçeli evler artıyor. Bu adreslerde bahçe mobilyası ve depo eşyası hacme ekleniyor, dolayısıyla oda sayısına bakarak fiyat vermek yanıltıcı oluyor.</p><p>Erişim genel olarak rahat. Sokaklar araç geçişine uygun ve park sorunu merkez ilçelerdeki kadar keskin değil. Narlıdere’de <strong>evden eve nakliyat</strong> işlerinde süreyi uzatan şey erişim değil, taşınan toplam hacim; ekip sayısını buna göre planlıyoruz.</p><p>İlçenin batı aksındaki konumu Balçova ve Güzelbahçe yönündeki taşımaları kısaltıyor. Merkeze yapılan işlerde varış tarafındaki park durumu hesaba giriyor.</p>`,
    kunye: [
      { label: 'İki yerleşim tipi', value: 'Sahilde planlı siteler, yamaçta müstakil ve bahçeli evler.' },
      { label: 'Hacim', value: 'Müstakil adreslerde bahçe ve depo eşyası hacmi belirgin şekilde artırıyor.' },
      { label: 'Erişim', value: 'Sokaklar geniş, park sorunu merkez ilçelerdeki kadar keskin değil.' },
      { label: 'Komşuluk', value: 'Balçova ve Güzelbahçe yönü kısa; merkeze giden işlerde park hesaba giriyor.' },
    ],
    guzergahlar: [
      { to: 'Balçova', note: 'Doğuya geçiş; kısa mesafe, iş yarım günde bitebiliyor.' },
      { to: 'Güzelbahçe', note: 'Batıya geçiş; düzenli güzergâh.' },
      { to: 'Konak', note: 'Merkeze geçiş; varışta park yeri önceden ayırtılıyor.' },
      { to: 'Urla', note: 'Batıya devam; yol süresi plana dahil ediliyor.' },
    ],
    mahalleler: ['Sahilevleri', 'Limanreis', 'Çamtepe', 'Altıevler', '2. İnönü'],
    sorular: [
      {
        question: 'Müstakil evden taşınma nasıl fiyatlanıyor?',
        answer:
          'Oda sayısına değil toplam hacme göre. Bahçe mobilyası, depo ve varsa ikinci kat dahil ediliyor; keşifte evin tamamını görmemiz gerekiyor.',
      },
      {
        question: 'Bahçe eşyaları da taşınıyor mu?',
        answer:
          'Taşınıyor. Bahçe takımı, barbekü ve benzeri parçalar ayrıca ambalajlanıp hacme dahil ediliyor.',
      },
      {
        question: 'Sitemize araç girişi izne bağlı, sorun olur mu?',
        answer:
          'Olmaz. İzni ve yükleme saatini biz yönetimle görüşerek ayarlıyoruz.',
      },
      {
        question: 'Kaç kişilik ekip geliyor?',
        answer:
          'Ekip sayısını hacim belirliyor. Büyük evlerde daha kalabalık ekiple çalışıyoruz ki iş aynı güne sığsın.',
      },
    ],
  },

  {
    ad: 'Urla',
    derinlik: 'tam',
    ozet:
      'Bağ evleri ve müstakil yerleşimin yaygın olduğu Urla’da taşınan hacim ev içiyle sınırlı kalmıyor.',
    metaAciklama:
      'Urla evden eve nakliyat: müstakil ev ve bağ evi taşımalarına uygun planlama, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Urla’da taşınma hesabı müstakil yerleşim üzerine kurulu. Bahçeli evler, bağ evleri ve iki katlı yapılar yaygın; taşınacak eşya çoğu zaman ev içiyle sınırlı kalmıyor. Bahçe mobilyası, depo malzemesi ve mevsimlik kullanılan parçalar hacmi büyütüyor. Bu yüzden keşifte evin eklentileriyle birlikte görülmesi gerekiyor.</p><p>Erişim tarafında ilçe merkezine ulaşım rahat, ancak bağ ve kırsal mahallelere giden bazı yollar dar. Urla’da <strong>evden eve nakliyat</strong> planlarken adrese göre araç ölçüsü seçiyor, gerekiyorsa yükü daha küçük bir araçla aktarıyoruz.</p><p>İlçede ikinci konut kullanımı da yaygın. Bu taşımalarda eşyanın bir bölümünün depolanması sık talep ediliyor ve aynı teklifin içinde planlanıyor.</p>`,
    kunye: [
      { label: 'Konut tipi', value: 'Müstakil ve bağ evleri yaygın; iki katlı yapı sık.' },
      { label: 'Ek hacim', value: 'Bahçe mobilyası ve depo malzemesi taşınan hacmi büyütüyor.' },
      { label: 'Kırsal yollar', value: 'Bağ ve kırsal mahalle yolları dar; araç ölçüsü adrese göre seçiliyor.' },
      { label: 'İkinci konut', value: 'Mevsimlik kullanım var; depolama sık talep ediliyor.' },
    ],
    guzergahlar: [
      { to: 'Güzelbahçe', note: 'Doğuya geçiş; düzenli güzergâh, iş tek günde bitiyor.' },
      { to: 'Çeşme', note: 'Batıya geçiş; yaz sezonunda gün planlaması erken yapılıyor.' },
      { to: 'Seferihisar', note: 'Güneye geçiş; yol süresi hesaba katılıyor.' },
      { to: 'Narlıdere', note: 'İzmir yönü; iş tek günde tamamlanıyor.' },
    ],
    mahalleler: ['İskele', 'Zeytinalanı', 'Altıntaş', 'Yenice', 'Rüstem'],
    sorular: [
      {
        question: 'Bağ evimden taşınma yapabilir misiniz?',
        answer:
          'Yapabiliriz. Yolu keşifte değerlendirip uygun ölçüde araç seçiyoruz; dar güzergâhlarda aktarma planlıyoruz.',
      },
      {
        question: 'Depo ve bahçe eşyası hacme dahil mi?',
        answer:
          'Dahil. Toplam hacmi belirgin şekilde artırdığı için keşifte gösterilmesi gerekiyor.',
      },
      {
        question: 'Eşyalarımın bir kısmını depoda tutabilir miyim?',
        answer:
          'Tutabilirsiniz. Hangi eşyanın taşınıp hangisinin depoda kalacağını birlikte belirliyoruz.',
      },
      {
        question: 'İzmir merkezine taşınma tek günde biter mi?',
        answer:
          'Çoğunlukla biter. Hacim büyükse ekip sayısını artırıyor ya da ikinci araç devreye alıyoruz.',
      },
    ],
  },

  {
    ad: 'Çeşme',
    derinlik: 'tam',
    ozet:
      'Yaz sezonunda talebin zirveye çıktığı Çeşme’de taşınma tarihini erken belirlemek, fiyatı da süreyi de doğrudan etkiliyor.',
    metaAciklama:
      'Çeşme evden eve nakliyat: sezon yoğunluğuna göre planlanan taşıma, sigortalı ambalaj ve yazılı sabit fiyat.',
    govde: `<p>Çeşme’de taşımanın en belirleyici değişkeni takvim. Yaz aylarında hem trafik hem araç ve ekip talebi zirveye çıkıyor; bu dönemde uygun gün bulmak zorlaşıyor ve maliyet yükseliyor. Sezon dışında ise iş hem daha hızlı hem daha uygun ilerliyor. Tarihi esnetebiliyorsanız bu tek başına ciddi bir fark yaratıyor.</p><p>Yerleşim ağırlıklı müstakil ev, villa ve yazlık sitelerden oluşuyor. Bu yapı tipinde merdiven sorunu az; buna karşılık bahçe eşyası ve depo malzemesi hacmi büyütüyor. Çeşme’de <strong>evden eve nakliyat</strong> teklifi hazırlarken evin eklentilerini de görmemiz gerekiyor.</p><p>Alaçatı ve eski merkez çevresinde sokaklar dar; bazı adreslere büyük araçla girmek mümkün olmuyor. Bu bölgelerde orta ölçekli araç kullanıyor, gerekirse aktarma yapıyoruz.</p>`,
    kunye: [
      { label: 'Sezon', value: 'Yaz aylarında talep zirvede; uygun gün sınırlı, maliyet yükseliyor.' },
      { label: 'Konut tipi', value: 'Müstakil ev, villa ve yazlık site ağırlıklı; merdiven sorunu az.' },
      { label: 'Ek hacim', value: 'Bahçe eşyası ve depo malzemesi hacmi büyütüyor.' },
      { label: 'Dar sokaklar', value: 'Alaçatı ve eski merkezde büyük araç giremiyor; aktarma planlanıyor.' },
    ],
    guzergahlar: [
      { to: 'Urla', note: 'Doğuya geçiş; iş tek günde tamamlanıyor.' },
      { to: 'Seferihisar', note: 'Güneydoğu aksı; yol süresi planlanıyor.' },
      { to: 'Konak', note: 'İzmir merkezi; uzun güzergâh, erken başlangıç gerekiyor.' },
      { to: 'Güzelbahçe', note: 'Doğuya devam; düzenli güzergâh.' },
    ],
    mahalleler: ['Alaçatı', 'Ilıca', 'Dalyan', 'Ovacık', 'Şifne', 'Musalla'],
    sorular: [
      {
        question: 'Yaz ortasında taşınmam gerekiyor, sorun olur mu?',
        answer:
          'Olmaz ama erken planlamak gerekiyor. Sezonda araç ve ekip talebi yüksek; birkaç hafta önceden haber vermeniz uygun gün seçmenizi sağlıyor.',
      },
      {
        question: 'Sezon dışında taşınmak daha mı uygun?',
        answer:
          'Belirgin şekilde daha uygun. Talep düştüğü için hem gün seçmek kolaylaşıyor hem maliyet azalıyor.',
      },
      {
        question: 'Alaçatı’da sokağımıza araç giremiyor, çözüm var mı?',
        answer:
          'Var. Orta ölçekli araç kullanıyor ya da yükü sokak girişinde aktarıyoruz. Elle taşınacak mesafe keşifte ölçülüp fiyata dahil ediliyor.',
      },
      {
        question: 'Yazlık eşyalarımı depolayabilir misiniz?',
        answer:
          'Depolayabiliriz. Taşınacak ve depolanacak eşyayı keşifte birlikte ayırıyoruz; ikisi tek teklifte yer alıyor.',
      },
    ],
  },

  {
    ad: 'Menemen',
    derinlik: 'tam',
    ozet:
      'İzmir merkezine olan mesafesi Menemen taşımalarında yol süresini planın merkezine koyuyor.',
    metaAciklama:
      'Menemen evden eve nakliyat: yol süresi hesaplanmış planlama, sigortalı taşıma ve yazılı sabit fiyat. Ücretsiz keşif.',
    govde: `<p>Menemen, İzmir merkezine olan mesafesi nedeniyle planlaması diğer merkez ilçelerden farklı kurulan bir yer. Merkeze yapılan taşımalarda yol süresi işin önemli bir bölümünü kaplıyor; bu yüzden çalışmayı sabah erken başlatıyor, eşya çoksa ikinci aracı devreye alıyoruz ki iş aynı güne sığsın.</p><p>Güzergâh ova üzerinden gittiği için yol düz ve süre öngörülebilir. İlçe merkezindeki yerleşim de düzenli; sokaklar geniş, binaların çoğu orta katlı ve araç yanaşması sorun çıkarmıyor. Menemen’de <strong>evden eve nakliyat</strong> işlerinde asıl planlama konusu bina değil, mesafe oluyor.</p><p>Kuzey aksındaki komşularla bağlantı kısa. Çiğli yönündeki taşımalar çoğunlukla tek günde, hatta yarım günde tamamlanıyor.</p>`,
    kunye: [
      { label: 'Merkeze mesafe', value: 'Yol süresi planın merkezinde; iş sabah erken başlatılıyor.' },
      { label: 'Güzergâh', value: 'Ova üzerinden düz yol; süre öngörülebilir.' },
      { label: 'İlçe merkezi', value: 'Düzenli yerleşim, geniş sokak, sorunsuz araç yanaşması.' },
      { label: 'Komşuluk', value: 'Çiğli yönündeki işler tek günde, çoğu zaman yarım günde bitiyor.' },
    ],
    guzergahlar: [
      { to: 'Çiğli', note: 'Güneye geçiş; kısa mesafe, iş yarım günde bitebiliyor.' },
      { to: 'Karşıyaka', note: 'İzmir yönü; yol süresi planlanıyor.' },
      { to: 'Aliağa', note: 'Kuzeye geçiş; düz güzergâh.' },
      { to: 'Foça', note: 'Kuzeybatı aksı; sezonda gün planlaması erken yapılıyor.' },
    ],
    mahalleler: ['Asarlık', 'Ulukent', 'Koyundere', 'Türkelli', 'Villakent'],
    sorular: [
      {
        question: 'İzmir merkezine taşınma tek günde biter mi?',
        answer:
          'Genellikle biter. Yol süresi nedeniyle işi sabah erken başlatıyoruz; eşya fazlaysa iki araçla eşzamanlı çalışıyoruz.',
      },
      {
        question: 'Mesafe fiyatı ne kadar etkiliyor?',
        answer:
          'Yol süresi ve yakıt fiyata giriyor. Kesin tutarı keşiften sonra yazılı veriyoruz ve taşıma gününe kadar değişmiyor.',
      },
      {
        question: 'Köy ya da kırsal adresten taşıma yapıyor musunuz?',
        answer:
          'Yapıyoruz. Yol durumunu keşifte değerlendirip uygun ölçüde araç seçiyoruz.',
      },
      {
        question: 'Ne kadar önceden randevu almalıyım?',
        answer:
          'Birkaç gün yeterli. Ay sonu ve hafta sonu için biraz daha erken haber vermenizi öneriyoruz.',
      },
    ],
  },

  {
    ad: 'Torbalı',
    derinlik: 'tam',
    ozet:
      'Sanayi tesisleri ile tarım alanlarının bir arada olduğu Torbalı’da konut ve ticari taşımalar ayrı planlanıyor.',
    metaAciklama:
      'Torbalı evden eve nakliyat ve işyeri taşıma: sigortalı, planlı ve yazılı sabit fiyatlı hizmet. Ücretsiz keşif için arayın.',
    govde: `<p>Torbalı’da iki tür taşıma talebi yan yana duruyor. Sanayi tesislerinin yoğun olduğu bölgede işyeri, depo ve atölye taşımaları yaygın; bu işlerde raf sökümü, makine sabitlemesi ve ağır parça taşıma devreye giriyor. Konut tarafında ise iş standart bir ilçe taşımasından farksız ilerliyor. İkisini ayrı planlıyor, ayrı fiyatlandırıyoruz.</p><p>Yerleşim düzenli ve yollar geniş; araç bina önüne yanaşabiliyor. Torbalı’da <strong>evden eve nakliyat</strong> işlerinde erişim nadiren sorun oluyor. Asıl değişken İzmir merkezine olan mesafe; merkez ilçelere yapılan taşımalarda yol süresini plana ekliyoruz.</p><p>Ayrancılar ve Pancar gibi büyük mahallelerde konut yoğunluğu artıyor. Buradaki taşımalar çoğunlukla ilçe içinde gerçekleşiyor ve yarım günde tamamlanıyor.</p>`,
    kunye: [
      { label: 'İki talep tipi', value: 'Sanayide işyeri ve depo taşıması, konutta standart daire taşıması.' },
      { label: 'Ağır ekipman', value: 'Ticari adreslerde taşıma kızağı, kayış ve sabitleme ekipmanı kullanılıyor.' },
      { label: 'Erişim', value: 'Yerleşim düzenli, yollar geniş; araç yanaşması sorunsuz.' },
      { label: 'Merkeze mesafe', value: 'İzmir merkezine yol süresi plana ekleniyor.' },
    ],
    guzergahlar: [
      { to: 'Buca', note: 'Kuzeye geçiş; yol süresi planlanıyor.' },
      { to: 'Menderes', note: 'Batıya geçiş; düz güzergâh.' },
      { to: 'Kemalpaşa', note: 'Kuzeydoğu aksı; iş tek günde tamamlanıyor.' },
      { to: 'Bayındır', note: 'Doğuya geçiş; yol süresi hesaba katılıyor.' },
    ],
    mahalleler: ['Ayrancılar', 'Pancar', 'Yazıbaşı', 'Çaybaşı', 'Ertuğrul'],
    sorular: [
      {
        question: 'Fabrikamızı ya da atölyemizi taşıtabilir miyiz?',
        answer:
          'Taşıtabilirsiniz. Makine ve raf sistemleri için ayrı ekipman ve ekip planlıyoruz; keşif de sanayi adresine özel yapılıyor.',
      },
      {
        question: 'İşyeri taşıması üretimi durdurur mu?',
        answer:
          'Durdurmamak için işleri çoğunlukla hafta sonuna ya da vardiya dışına planlıyoruz.',
      },
      {
        question: 'İzmir merkezine taşınma ne kadar sürer?',
        answer:
          'Yol süresi hesaba katılarak planlanıyor; işlerin büyük çoğunluğu tek günde tamamlanıyor.',
      },
      {
        question: 'Depolama hizmetiniz var mı?',
        answer:
          'Var. Tarihler arasında boşluk olduğunda eşyalarınızı depolayıp anlaştığımız günde teslim ediyoruz.',
      },
    ],
  },

  // ───────────────────────── ORTA DERİNLİK (12) ─────────────────────────
  {
    ad: 'Menderes',
    derinlik: 'orta',
    ozet: 'Geniş bir alana yayılan Menderes’te taşıma planının ilk konusu mahalleler arası mesafe oluyor.',
    metaAciklama:
      'Menderes evden eve nakliyat: dağınık yerleşime göre planlanan güzergâh, sigortalı taşıma, yazılı sabit fiyat.',
    govde: `<p>Menderes geniş bir alana yayılıyor ve mahalleler birbirinden uzak. Bu, taşımada güzergâh planlamasını zorunlu kılıyor; hangi adrese hangi sırayla gidileceği belirlenmezse gün içinde ciddi zaman kaybı oluyor. Keşifte yalnızca eşyayı değil yolu da değerlendiriyoruz.</p><p>Yapı stoğu ağırlıklı düşük katlı ve müstakil. Merdiven sorunu az; buna karşılık bahçe ve depo eşyası hacmi artırıyor. Menderes’te <strong>evden eve nakliyat</strong> teklifi verirken evin eklentilerini de hesaba katıyoruz.</p>`,
    kunye: [
      { label: 'Yayılım', value: 'Mahalleler birbirinden uzak; güzergâh önceden çıkarılıyor.' },
      { label: 'Yapı', value: 'Ağırlıklı düşük katlı ve müstakil; merdiven sorunu az.' },
      { label: 'Ek hacim', value: 'Bahçe ve depo eşyası taşınan hacmi artırıyor.' },
    ],
    guzergahlar: [
      { to: 'Gaziemir', note: 'Kuzeye geçiş; düz güzergâh, iş tek günde bitiyor.' },
      { to: 'Torbalı', note: 'Doğuya geçiş; yol süresi planlanıyor.' },
      { to: 'Seferihisar', note: 'Batıya geçiş; süre hesaba katılıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Mahallem merkeze uzak, keşfe gelir misiniz?',
        answer: 'Geliriz ve keşif ücretsiz. Adresi bildirdiğinizde uygun bir gün belirliyoruz.',
      },
      {
        question: 'Müstakil evden taşınma nasıl fiyatlanıyor?',
        answer: 'Toplam hacme göre. Bahçe ve depo eşyası dahil ediliyor, bu yüzden keşifte gösterilmesi gerekiyor.',
      },
      {
        question: 'İzmir merkezine taşınma tek günde biter mi?',
        answer: 'Çoğunlukla biter. Mesafe nedeniyle iş sabah erken başlatılıyor.',
      },
    ],
  },

  {
    ad: 'Güzelbahçe',
    derinlik: 'orta',
    ozet: 'Sahil hattına kurulu küçük ve düzenli bir ilçe olan Güzelbahçe’de taşıma öngörülebilir ilerliyor.',
    metaAciklama:
      'Güzelbahçe evden eve nakliyat: düzenli yerleşime uygun hızlı taşıma, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Güzelbahçe küçük ve düzenli bir ilçe. Sahil hattı boyunca uzanan yerleşimde yollar geniş, araç bina önüne yanaşabiliyor ve park sorunu merkez ilçelerdeki kadar keskin değil. Bu, taşımanın öngörülebilir ilerlemesini sağlıyor.</p><p>Yapı tipi site ve müstakil ev arasında değişiyor. Müstakil adreslerde bahçe eşyası hacme ekleniyor, sitelerde ise araç girişi için izin gerekebiliyor. Güzelbahçe’de <strong>evden eve nakliyat</strong> planlarken bu iki durumu ayrı değerlendiriyoruz.</p>`,
    kunye: [
      { label: 'Erişim', value: 'Yollar geniş, araç yanaşması ve park sorunsuz.' },
      { label: 'İki yapı tipi', value: 'Siteler ve müstakil evler; müstakilde bahçe eşyası hacme ekleniyor.' },
      { label: 'Site izni', value: 'Kapalı sitelerde araç girişi önceden izne bağlı olabiliyor.' },
    ],
    guzergahlar: [
      { to: 'Narlıdere', note: 'Doğuya geçiş; kısa mesafe, iş yarım günde bitebiliyor.' },
      { to: 'Urla', note: 'Batıya geçiş; düzenli güzergâh.' },
      { to: 'Balçova', note: 'İzmir yönü; varış tarafında eğim hesaba katılıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Site iznini kim alıyor?',
        answer: 'İzni ve yükleme saatini biz yönetimle görüşerek ayarlıyoruz.',
      },
      {
        question: 'Bahçe eşyalarım taşınıyor mu?',
        answer: 'Taşınıyor ve hacme dahil ediliyor; keşifte göstermeniz fiyatın doğru çıkması için önemli.',
      },
      {
        question: 'Taşıma ne kadar sürer?',
        answer: 'Erişim rahat olduğu için süreyi hacim belirliyor; çoğu iş yarım gün ile bir gün arasında bitiyor.',
      },
    ],
  },

  {
    ad: 'Aliağa',
    derinlik: 'orta',
    ozet: 'Sanayi ağırlıklı yapısıyla Aliağa’da işyeri ve lojistik taşımaları konut işleri kadar yaygın.',
    metaAciklama:
      'Aliağa evden eve nakliyat ve işyeri taşıma: sigortalı, planlı ve yazılı sabit fiyatlı hizmet. Ücretsiz keşif.',
    govde: `<p>Aliağa’nın taşıma profilini sanayi belirliyor. Tesis ve depo yoğunluğu, işyeri taşımalarını konut işleri kadar yaygın kılıyor. Bu adreslerde ağır parça taşıma, raf sökümü ve sabitleme için ayrı ekipman ve ekip planlıyoruz.</p><p>Konut tarafında yerleşim düzenli; yollar geniş ve araç yanaşması sorun çıkarmıyor. Aliağa’da <strong>evden eve nakliyat</strong> işlerinde süreyi belirleyen şey erişim değil, İzmir merkezine olan mesafe oluyor.</p>`,
    kunye: [
      { label: 'Sanayi ağırlığı', value: 'Tesis ve depo yoğun; işyeri taşıma talebi yüksek.' },
      { label: 'Ağır ekipman', value: 'Ticari adreslerde taşıma kızağı ve sabitleme ekipmanı kullanılıyor.' },
      { label: 'Merkeze mesafe', value: 'İzmir merkezine yol süresi plana ekleniyor.' },
    ],
    guzergahlar: [
      { to: 'Menemen', note: 'Güneye geçiş; düz güzergâh.' },
      { to: 'Foça', note: 'Güneybatı aksı; yol süresi planlanıyor.' },
      { to: 'Çiğli', note: 'İzmir yönü; iş tek günde tamamlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Tesisimizi ya da depomuzu taşıtabilir miyiz?',
        answer: 'Taşıtabilirsiniz. Ağır parçalar için özel ekipman kullanıyor, keşfi sanayi adresine özel yapıyoruz.',
      },
      {
        question: 'İzmir merkezine taşınma tek günde biter mi?',
        answer: 'Genellikle biter. Yol süresi nedeniyle iş sabah erken başlatılıyor.',
      },
      {
        question: 'Taşıma sigortalı mı?',
        answer: 'Bütün taşımalar sigortalı ve kapsam sözleşmede yazılı oluyor.',
      },
    ],
  },

  {
    ad: 'Foça',
    derinlik: 'orta',
    ozet: 'Dar sokakları ve sezonluk yoğunluğuyla Foça’da hem araç ölçüsü hem taşınma tarihi önem taşıyor.',
    metaAciklama:
      'Foça evden eve nakliyat: dar sokak ve sezon yoğunluğuna göre planlanan taşıma, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Foça’da iki şey plana yön veriyor: sokak genişliği ve mevsim. Eski yerleşimin bulunduğu kesimde sokaklar dar, bazı adreslere büyük araçla girmek mümkün olmuyor; orta ölçekli araç kullanıyor ya da yükü sokak girişinde aktarıyoruz.</p><p>Yaz aylarında talep belirgin şekilde artıyor ve uygun gün bulmak zorlaşıyor. Foça’da <strong>evden eve nakliyat</strong> planlıyorsanız sezon dışına denk getirmek hem süreyi hem maliyeti düşürüyor.</p>`,
    kunye: [
      { label: 'Dar sokaklar', value: 'Eski yerleşimde büyük araç giremiyor; aktarma planlanıyor.' },
      { label: 'Sezon', value: 'Yaz aylarında talep artıyor, uygun gün sınırlı.' },
      { label: 'İkinci konut', value: 'Yazlık kullanım yaygın; depolama sık talep ediliyor.' },
    ],
    guzergahlar: [
      { to: 'Menemen', note: 'Güneydoğu aksı; düz güzergâh.' },
      { to: 'Aliağa', note: 'Kuzeydoğu aksı; yol süresi planlanıyor.' },
      { to: 'Çiğli', note: 'İzmir yönü; iş tek günde tamamlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Sokağımıza kamyon giremiyor, çözüm var mı?',
        answer: 'Var. Orta ölçekli araç kullanıyor ya da yükü sokak girişinde aktarıyoruz; mesafe keşifte ölçülüyor.',
      },
      {
        question: 'Yaz sezonunda taşınabilir miyim?',
        answer: 'Taşınabilirsiniz ama erken planlamak gerekiyor; sezonda uygun gün hızlı doluyor.',
      },
      {
        question: 'Yazlık eşyalarımı depolayabilir misiniz?',
        answer: 'Depolayabiliriz. Taşınacak ve depolanacak eşyayı keşifte birlikte ayırıyoruz.',
      },
    ],
  },

  {
    ad: 'Seferihisar',
    derinlik: 'orta',
    ozet: 'Müstakil yerleşim ve mevsimlik kullanımın yaygın olduğu Seferihisar’da hacim ev içiyle sınırlı kalmıyor.',
    metaAciklama:
      'Seferihisar evden eve nakliyat: müstakil ev ve yazlık taşımalarına uygun planlama, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Seferihisar’da yerleşim ağırlıklı müstakil ve bahçeli. Merdiven ve asansör sorunu neredeyse hiç gündeme gelmiyor; buna karşılık bahçe mobilyası, depo malzemesi ve mevsimlik parçalar taşınacak hacmi büyütüyor. Fiyatı doğru çıkarmak için keşifte evin eklentilerini de görmemiz gerekiyor.</p><p>Yaz aylarında ikinci konut hareketliliği artıyor. Seferihisar’da <strong>evden eve nakliyat</strong> taleplerinin bir bölümü mevsimlik oluyor ve bu işlerde eşyanın bir kısmının depolanması sık talep ediliyor.</p>`,
    kunye: [
      { label: 'Konut tipi', value: 'Müstakil ve bahçeli evler yaygın; merdiven sorunu neredeyse yok.' },
      { label: 'Ek hacim', value: 'Bahçe ve depo eşyası taşınan hacmi büyütüyor.' },
      { label: 'Mevsimlik kullanım', value: 'Yazlık hareketliliği var; depolama sık talep ediliyor.' },
    ],
    guzergahlar: [
      { to: 'Urla', note: 'Kuzeye geçiş; yol süresi planlanıyor.' },
      { to: 'Menderes', note: 'Doğuya geçiş; düz güzergâh.' },
      { to: 'Çeşme', note: 'Kuzeybatı aksı; sezonda gün planlaması erken yapılıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Bahçe eşyalarım taşınıyor mu?',
        answer: 'Taşınıyor ve hacme dahil ediliyor; keşifte göstermeniz fiyatın baştan doğru çıkması için önemli.',
      },
      {
        question: 'Eşyalarımın bir kısmını depoda tutabilir miyim?',
        answer: 'Tutabilirsiniz. Taşınacak ve depolanacak eşyayı birlikte ayırıyoruz, ikisi tek teklifte yer alıyor.',
      },
      {
        question: 'İzmir merkezine taşınma ne kadar sürer?',
        answer: 'Yol süresi plana ekleniyor; işlerin büyük çoğunluğu tek günde tamamlanıyor.',
      },
    ],
  },

  {
    ad: 'Bergama',
    derinlik: 'orta',
    ozet: 'İzmir’in kuzeyindeki Bergama’da taşıma planı, uzun güzergâh ve tarihi doku üzerine kuruluyor.',
    metaAciklama:
      'Bergama evden eve nakliyat: uzun mesafeye ve dar sokaklara göre planlanan taşıma, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Bergama İzmir merkezine uzak; buradan yapılan taşımalarda yol süresi işin önemli bir bölümünü kaplıyor. İşi sabah erken başlatıyor, eşya çoksa ikinci aracı devreye alıyoruz ki iş aynı güne sığsın.</p><p>Eski yerleşimin bulunduğu kesimde sokaklar dar ve bazı adreslere büyük araçla girmek mümkün olmuyor. Bergama’da <strong>evden eve nakliyat</strong> planlarken adrese göre araç ölçüsü seçiyor, gerekiyorsa aktarma yapıyoruz.</p>`,
    kunye: [
      { label: 'Merkeze mesafe', value: 'İzmir merkezine uzak; yol süresi işin önemli bölümünü kaplıyor.' },
      { label: 'Eski doku', value: 'Dar sokaklarda büyük araç giremiyor; aktarma planlanıyor.' },
      { label: 'Planlama', value: 'İş sabah erken başlatılıyor, gerekirse ikinci araç devreye alınıyor.' },
    ],
    guzergahlar: [
      { to: 'Dikili', note: 'Batıya geçiş; düzenli güzergâh.' },
      { to: 'Aliağa', note: 'Güneye geçiş; yol süresi planlanıyor.' },
      { to: 'Menemen', note: 'İzmir yönü; erken başlangıç gerekiyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'İzmir merkezine taşınma tek günde biter mi?',
        answer: 'Genellikle biter. Mesafe nedeniyle iş çok erken başlıyor; eşya fazlaysa iki araçla çalışıyoruz.',
      },
      {
        question: 'Dar sokakta yükleme nasıl yapılıyor?',
        answer: 'Yük sokak girişinde aktarılıyor ve kalan mesafe ekiple taşınıyor; mesafe keşifte ölçülüyor.',
      },
      {
        question: 'Şehirlerarası taşıma yapıyor musunuz?',
        answer: 'Yapıyoruz. Bergama’dan Türkiye’nin her iline taşıma düzenliyoruz.',
      },
    ],
  },

  {
    ad: 'Ödemiş',
    derinlik: 'orta',
    ozet: 'İç kesimde yer alan Ödemiş’te taşıma, merkeze olan mesafe üzerine kurulu bir plan gerektiriyor.',
    metaAciklama:
      'Ödemiş evden eve nakliyat: uzun mesafeye göre planlanmış taşıma, sigortalı ambalaj ve yazılı sabit fiyat.',
    govde: `<p>Ödemiş, Küçük Menderes ovasının doğu ucunda kurulu bir ilçe merkezi ve çevresindeki köylerin ticaret noktası. Bu, taşıma taleplerine belirgin bir mevsim ritmi katıyor: hasat sonrası aylarda köyden ilçe merkezine, dönem başlarında ise merkezden İzmir’e doğru hareket artıyor.</p><p>İlçe merkezinde yerleşim düzenli ve araç yanaşması sorunsuz. Köy adreslerinde ise depo, ambar ve tarım aleti taşınacaklar listesine giriyor; bunlar standart mobilyadan farklı ambalaj ve sabitleme istiyor. Ödemiş’te <strong>evden eve nakliyat</strong> teklifi verirken bu ek parçaları keşifte ayrıca not ediyoruz.</p>`,
    kunye: [
      { label: 'Mevsim ritmi', value: 'Hasat sonrası köyden merkeze, dönem başında merkezden İzmir’e hareket artıyor.' },
      { label: 'Ticaret noktası', value: 'Çevre köylerin merkezi; taşımalar iki yönlü.' },
      { label: 'Köy adresleri', value: 'Depo, ambar ve tarım aleti farklı ambalaj ve sabitleme istiyor.' },
    ],
    guzergahlar: [
      { to: 'Tire', note: 'Batıya geçiş; düzenli güzergâh.' },
      { to: 'Bayındır', note: 'Kuzeybatı aksı; yol süresi planlanıyor.' },
      { to: 'Torbalı', note: 'İzmir yönü; erken başlangıç gerekiyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'İzmir merkezine taşınma kaç gün sürer?',
        answer: 'Genellikle tek gün. Mesafe nedeniyle iş sabah erken başlatılıyor.',
      },
      {
        question: 'Kırsal adrese araç gelebiliyor mu?',
        answer: 'Yol durumuna göre değişiyor; keşifte değerlendirip uygun ölçüde araç seçiyoruz.',
      },
      {
        question: 'Fiyata yol masrafı dahil mi?',
        answer: 'Dahil. Keşiften sonra verilen yazılı fiyat yol ve yakıt dahil toplam tutardır.',
      },
    ],
  },

  {
    ad: 'Tire',
    derinlik: 'orta',
    ozet: 'Tarihi merkezi ve dar sokaklarıyla Tire’de taşımanın planı araç ölçüsüyle başlıyor.',
    metaAciklama:
      'Tire evden eve nakliyat: dar sokaklara uygun araç planı, sigortalı ambalaj ve yazılı sabit fiyat. Ücretsiz keşif.',
    govde: `<p>Tire’nin tarihi merkezinde sokaklar dar ve bazı adreslere büyük araçla girmek mümkün olmuyor. Bu bölgelerde orta ölçekli araç kullanıyor, gerekiyorsa yükü sokak girişinde aktarıyoruz. Elle taşınacak mesafe keşifte ölçülüp fiyata baştan ekleniyor.</p><p>Eski yapılarda merdivenler dar ve tavan yükseklikleri değişken; büyük mobilyaların bir kısmı sökülmeden çıkmıyor. Tire’de <strong>evden eve nakliyat</strong> işlerinde marangozu ekiple birlikte gönderiyoruz.</p>`,
    kunye: [
      { label: 'Tarihi merkez', value: 'Sokaklar dar; büyük araç giremiyor, aktarma planlanıyor.' },
      { label: 'Eski yapı', value: 'Dar merdiven ve değişken tavan yüksekliği; mobilya sökümü sık gerekiyor.' },
      { label: 'Merkeze mesafe', value: 'İzmir merkezine yol süresi plana ekleniyor.' },
    ],
    guzergahlar: [
      { to: 'Ödemiş', note: 'Doğuya geçiş; düzenli güzergâh.' },
      { to: 'Bayındır', note: 'Kuzeye geçiş; yol süresi planlanıyor.' },
      { to: 'Torbalı', note: 'İzmir yönü; iş tek günde tamamlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Tarihi evimizin merdiveni dar, mobilyalar çıkar mı?',
        answer: 'Büyük parçalar sökülerek çıkarılıyor. Marangozumuz yerinde söküp yeni adreste yeniden kuruyor.',
      },
      {
        question: 'Sokağımıza araç giremiyor, ek ücret çıkar mı?',
        answer: 'Elle taşınacak mesafe keşifte ölçülüp fiyata baştan dahil ediliyor; sürpriz ek ücret çıkmıyor.',
      },
      {
        question: 'Keşif ücretli mi?',
        answer: 'Keşif ücretsiz. Ekibimiz adrese gelip eşyayı gördükten sonra yazılı fiyat veriyor.',
      },
    ],
  },

  {
    ad: 'Kemalpaşa',
    derinlik: 'orta',
    ozet: 'Organize sanayi bölgesiyle Kemalpaşa’da işyeri taşımaları konut işleri kadar sık talep ediliyor.',
    metaAciklama:
      'Kemalpaşa evden eve nakliyat ve işyeri taşıma: sigortalı, planlı ve yazılı sabit fiyatlı hizmet. Ücretsiz keşif.',
    govde: `<p>Kemalpaşa’da organize sanayi bölgesinin varlığı taşıma taleplerinin önemli bir bölümünü ticari hâle getiriyor. Bu adreslerde raf sökümü, makine sabitlemesi ve ağır parça taşıma devreye giriyor; konut işinden ayrı ekipman ve ekip gerekiyor.</p><p>Konut tarafında yerleşim düzenli, yollar geniş ve araç yanaşması sorunsuz. Kemalpaşa’da <strong>evden eve nakliyat</strong> işlerinde asıl değişken İzmir merkezine olan mesafe oluyor; işi erken başlatarak tek güne sığdırıyoruz.</p>`,
    kunye: [
      { label: 'Organize sanayi', value: 'İşyeri ve depo taşıması yaygın; ağır ekipman gerekiyor.' },
      { label: 'Konut erişimi', value: 'Yollar geniş, araç yanaşması sorunsuz.' },
      { label: 'Merkeze mesafe', value: 'İzmir merkezine yol süresi plana ekleniyor.' },
    ],
    guzergahlar: [
      { to: 'Bornova', note: 'Batıya geçiş; İzmir yönü, iş tek günde tamamlanıyor.' },
      { to: 'Torbalı', note: 'Güneybatı aksı; düz güzergâh.' },
      { to: 'Bayındır', note: 'Güneye geçiş; yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Sanayideki tesisimizi taşıtabilir miyiz?',
        answer: 'Taşıtabilirsiniz. Makine ve raf sistemleri için ayrı ekipman ve ekip planlıyoruz.',
      },
      {
        question: 'İşyeri taşıması hafta sonu yapılabilir mi?',
        answer: 'Yapılabilir. Üretimin durmaması için işleri çoğunlukla hafta sonuna planlıyoruz.',
      },
      {
        question: 'İzmir merkezine taşınma tek günde biter mi?',
        answer: 'Biter. Yol süresi nedeniyle iş sabah erken başlatılıyor.',
      },
    ],
  },

  {
    ad: 'Selçuk',
    derinlik: 'orta',
    ozet: 'Turizm hareketliliği ve küçük ölçekli yerleşimiyle Selçuk’ta taşıma tarihi sezona göre planlanıyor.',
    metaAciklama:
      'Selçuk evden eve nakliyat: sezon yoğunluğuna göre planlanan taşıma, sigortalı ambalaj ve yazılı sabit fiyat.',
    govde: `<p>Selçuk’ta yerleşim küçük ve toplu; binalar ağırlıklı düşük katlı ve araç yanaşması çoğu adreste sorun çıkarmıyor. Merdiven ve asansör kaynaklı zorluk nadiren gündeme geliyor.</p><p>Buna karşılık turizm sezonunda ilçedeki hareketlilik artıyor ve uygun gün bulmak zorlaşıyor. Selçuk’ta <strong>evden eve nakliyat</strong> planlıyorsanız tarihi sezon dışına almak hem süreyi hem maliyeti düşürüyor.</p>`,
    kunye: [
      { label: 'Yerleşim', value: 'Küçük ve toplu; düşük katlı binalar, sorunsuz araç yanaşması.' },
      { label: 'Sezon', value: 'Turizm döneminde hareketlilik artıyor, uygun gün sınırlı.' },
      { label: 'Merkeze mesafe', value: 'İzmir merkezine yol süresi plana ekleniyor.' },
    ],
    guzergahlar: [
      { to: 'Torbalı', note: 'Kuzeye geçiş; İzmir yönü, yol süresi planlanıyor.' },
      { to: 'Tire', note: 'Kuzeydoğu aksı; düzenli güzergâh.' },
      { to: 'Menderes', note: 'Kuzeybatı aksı; iş tek günde tamamlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Sezonda taşınabilir miyim?',
        answer: 'Taşınabilirsiniz ama erken planlamak gerekiyor; sezonda uygun gün hızlı doluyor.',
      },
      {
        question: 'İzmir merkezine taşınma ne kadar sürer?',
        answer: 'Yol süresi plana ekleniyor; işlerin çoğu tek günde tamamlanıyor.',
      },
      {
        question: 'Eşyalarım sigortalı mı?',
        answer: 'Bütün taşımalar sigortalı ve kapsam sözleşmede yazılı oluyor.',
      },
    ],
  },

  {
    ad: 'Dikili',
    derinlik: 'orta',
    ozet: 'Sahil hattındaki yazlık yoğunluğuyla Dikili’de taşınma tarihi, eşya hacminden önce sezona bağlı.',
    metaAciklama:
      'Dikili evden eve nakliyat: sezon ve yazlık yoğunluğuna göre planlanan taşıma, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Dikili’de sahil hattı boyunca yazlık ve ikinci konut yoğunluğu yüksek. Yaz aylarında hem trafik hem araç talebi artıyor; bu dönemde uygun gün bulmak zorlaşıyor. Sezon dışında ise iş hem hızlı hem daha uygun ilerliyor.</p><p>Yapı tipi ağırlıklı düşük katlı ve müstakil. Merdiven sorunu az; buna karşılık bahçe eşyası hacme ekleniyor. Dikili’de <strong>evden eve nakliyat</strong> işlerinde eşyanın bir bölümünün depolanması sık talep ediliyor.</p>`,
    kunye: [
      { label: 'Sezon', value: 'Yaz aylarında talep artıyor; sezon dışı hem hızlı hem uygun.' },
      { label: 'Yapı', value: 'Düşük katlı ve müstakil ağırlıklı; merdiven sorunu az.' },
      { label: 'Depolama', value: 'İkinci konut taşımalarında depolama sık talep ediliyor.' },
    ],
    guzergahlar: [
      { to: 'Bergama', note: 'Doğuya geçiş; düzenli güzergâh.' },
      { to: 'Aliağa', note: 'Güneye geçiş; yol süresi planlanıyor.' },
      { to: 'Menemen', note: 'İzmir yönü; erken başlangıç gerekiyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Yazlığımdaki eşyaları depolayabilir misiniz?',
        answer: 'Depolayabiliriz. Taşınacak ve depolanacak eşyayı keşifte birlikte ayırıyoruz.',
      },
      {
        question: 'Sezonda taşınmak daha mı pahalı?',
        answer: 'Talep yüksek olduğu için maliyet artabiliyor. Tarihi esnetebiliyorsanız sezon dışı belirgin şekilde uygun.',
      },
      {
        question: 'İzmir merkezine taşınma tek günde biter mi?',
        answer: 'Genellikle biter; mesafe nedeniyle iş sabah erken başlatılıyor.',
      },
    ],
  },

  {
    ad: 'Bayındır',
    derinlik: 'orta',
    ozet: 'İç kesimdeki Bayındır’da taşıma planı, merkeze mesafe ve kırsal yol genişliği üzerine kuruluyor.',
    metaAciklama:
      'Bayındır evden eve nakliyat: kırsal yollara ve mesafeye göre planlanan taşıma, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Bayındır iç kesimde yer alıyor ve İzmir merkezine mesafe taşımanın belirleyici unsuru. Yol süresini plana ekleyip işi erken başlatıyoruz; böylece taşıma tek güne sığıyor.</p><p>İlçe merkezindeki yerleşim düzenli, araç yanaşması sorunsuz. Kırsal mahallelerde ise yollar daralıyor ve müstakil evlerde bahçe eşyası hacmi artırıyor. Bayındır’da <strong>evden eve nakliyat</strong> teklifi verirken adrese göre araç ölçüsü seçiyoruz.</p>`,
    kunye: [
      { label: 'Merkeze mesafe', value: 'İç kesimde; yol süresi plana ekleniyor, iş erken başlatılıyor.' },
      { label: 'İlçe merkezi', value: 'Düzenli yerleşim, sorunsuz araç yanaşması.' },
      { label: 'Kırsal adres', value: 'Yollar daralıyor; müstakil evlerde bahçe eşyası hacmi artırıyor.' },
    ],
    guzergahlar: [
      { to: 'Torbalı', note: 'Batıya geçiş; İzmir yönü, düz güzergâh.' },
      { to: 'Tire', note: 'Güneye geçiş; düzenli güzergâh.' },
      { to: 'Kemalpaşa', note: 'Kuzeye geçiş; yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Kırsal adrese araç gelebiliyor mu?',
        answer: 'Yol durumuna göre değişiyor; keşifte değerlendirip uygun ölçüde araç seçiyoruz.',
      },
      {
        question: 'Bahçe eşyaları hacme dahil mi?',
        answer: 'Dahil. Toplam hacmi artırdığı için keşifte gösterilmesi gerekiyor.',
      },
      {
        question: 'İzmir merkezine taşınma tek günde biter mi?',
        answer: 'Çoğunlukla biter. Mesafe nedeniyle iş sabah erken başlatılıyor.',
      },
    ],
  },
]

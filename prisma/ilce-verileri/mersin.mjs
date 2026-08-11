// prisma/ilce-verileri/mersin.mjs
//
// Mersin'in 13 ilçesinden 10'u. Üçü BİLEREK ATLANDI.
//
// ATLANANLAR: Gülnar, Aydıncık, Çamlıyayla
//   Üçü de küçük nüfuslu ve nakliyat aramasında karşılığı yok denecek kadar
//   az; yazacak doğrulanabilir bilgi de yok.
//
// DERİNLİK: 'tam' (6) / 'orta' (4)
//
// SLUG ÇAKIŞMASI BEKLENİYOR
// Mersin'in "Yenişehir" ilçesi, Bursa'nın Yenişehir'iyle aynı slug'ı
// üretiyor. Tohum betiği bunu tespit edip ikinciyi "yenisehir-mersin"
// yapacak (bkz. prisma/ilce-tohum.mjs). Var olan bir sayfanın adresini
// sessizce ezmek YOK.
//
// KIYI İLÇELERİNDE TEKRAR RİSKİ
// Erdemli, Silifke, Anamur ve Bozyazı'nın dördü de kıyıda ve dördünde de
// sezon var. Hepsini "yazın yoğun" diye yazmak Antalya'daki Kumluca-Demre
// çakışmasının aynısını üretirdi. Bu yüzden dördü farklı eksenlerden ele
// alındı: Erdemli uzun sahil şeridi, Silifke delta ve merkez-kıyı mesafesi,
// Anamur il merkezine uzaklık, Bozyazı sera tarımı.
//
// Ortak kurallar: uydurma mahalle/rakam yok, "evden eve nakliyat" sayfa
// başına tam bir kez. (bkz. izmir.mjs başlığındaki ayrıntılı gerekçe)

export const il = { ad: 'Mersin', plaka: 33 }

export const ilceler = [
  // ───────────────────────── TAM DERİNLİK (6) ─────────────────────────
  {
    ad: 'Akdeniz',
    derinlik: 'tam',
    ozet:
      'Liman ve eski çarşı dokusunun iç içe geçtiği Akdeniz ilçesinde taşımanın planı sokak genişliğiyle başlıyor.',
    metaAciklama:
      'Akdeniz evden eve nakliyat: dar çarşı sokaklarına uygun araç planı, sigortalı taşıma, yazılı sabit fiyat.',
    govde: `<p>Akdeniz, Mersin’in kurulduğu yer ve liman ile eski çarşı burada iç içe. Çarşı çevresindeki sokakların bir bölümüne araç hiç giremiyor, girebildiği yerlerde de gündüz yükleme boşaltma trafiği nedeniyle yer bulmak zor. Bu adreslerde yükü girebildiğimiz en yakın noktaya kadar getirip kalan mesafeyi ekiple taşıyoruz.</p><p>Yapı stoğu ağırlıklı eski ve orta katlı; asansör dar ya da bazı binalarda hiç yok. Akdeniz’de <strong>evden eve nakliyat</strong> işlerinde büyük mobilyaların bir kısmı sökülmeden inmiyor, bu yüzden marangozu ekiple birlikte gönderiyoruz.</p><p>Liman çevresindeki ticari adreslerde ise taşıma farklı bir düzende ilerliyor: depo ve dükkân işleri mesai dışına planlanıyor, böylece çarşı trafiği işi yavaşlatmıyor.</p>`,
    kunye: [
      { label: 'Çarşı dokusu', value: 'Bazı sokaklara araç giremiyor; elle taşınacak mesafe keşifte ölçülüyor.' },
      { label: 'Gündüz trafiği', value: 'Yükleme boşaltma yoğunluğu nedeniyle gündüz yer bulmak zor.' },
      { label: 'Eski yapı', value: 'Asansör dar ya da yok; mobilya sökümü sık gerekiyor.' },
      { label: 'Ticari adres', value: 'Depo ve dükkân taşımaları mesai dışına planlanıyor.' },
    ],
    guzergahlar: [
      { to: 'Yenişehir', note: 'Batıya geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Toroslar', note: 'Kuzeye geçiş; varış tarafında eğim hesaba katılıyor.' },
      { to: 'Mezitli', note: 'Batıya devam; sahil aksı.' },
      { to: 'Tarsus', note: 'Doğuya geçiş; ova yolu, süre öngörülebilir.' },
    ],
    mahalleler: ['Camişerif', 'Kiremithane', 'Nusratiye', 'Çankaya', 'Bahçe', 'Turgut Reis'],
    sorular: [
      {
        question: 'Çarşıdaki sokağımıza kamyon giremiyor, ne yapıyorsunuz?',
        answer:
          'Yükü girebildiğimiz en yakın noktaya kadar getirip kalan mesafeyi ekiple taşıyoruz. Mesafe keşifte ölçülüp fiyata dahil ediliyor.',
      },
      {
        question: 'Mobilyalarım dar merdivenden iner mi?',
        answer:
          'Büyük parçalar sökülerek indiriliyor. Marangozumuz ekiple birlikte geliyor ve yeni adreste yeniden kuruyor.',
      },
      {
        question: 'Dükkânımı taşıtmak istiyorum, gündüz kapatmam gerekir mi?',
        answer:
          'Gerekmez. Ticari taşımaların çoğunu mesai dışında yapıyoruz; ertesi sabah dükkân çalışır durumda oluyor.',
      },
      {
        question: 'Fiyat keşiften sonra değişir mi?',
        answer:
          'Değişmez. Keşif sonrası verilen yazılı fiyat taşıma gününe kadar geçerli kalıyor.',
      },
    ],
  },

  {
    ad: 'Toroslar',
    derinlik: 'tam',
    ozet:
      'Şehir apartmanından yayla evine kadar uzanan Toroslar’da aynı ilçede iki bambaşka taşıma düzeni gerekiyor.',
    metaAciklama:
      'Toroslar evden eve nakliyat: şehir ve yayla adreslerine ayrı planlama, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Toroslar, sahil şehrinin bittiği yerden başlayıp dağa doğru uzanıyor. Bu, tek bir ilçede iki bambaşka iş anlamına geliyor: aşağıda şehir apartmanları, yukarıda yayla evleri. İkisi farklı araç, farklı ekip ve farklı gün planı istiyor; keşifte ilk sorduğumuz şey adresin hangi kotta olduğu.</p><p>Şehir tarafındaki bloklarda asansör ve otopark bulunuyor, iş öngörülebilir ilerliyor. Yukarı çıkıldıkça yollar daralıp virajlanıyor ve büyük araçla ulaşmak zorlaşıyor. Toroslar’da <strong>evden eve nakliyat</strong> planlarken yayla adreslerinde orta ölçekli araç kullanıyor, gerekirse aktarma yapıyoruz.</p><p>Yayla taşımaları ayrıca mevsimlik: yaz başında yukarı, sonbaharda aşağı doğru bir hareket var. Bu işlerde eşyanın bir bölümünün depolanması sık talep ediliyor.</p>`,
    kunye: [
      { label: 'İki kot', value: 'Aşağıda şehir apartmanı, yukarıda yayla evi; ikisi ayrı plan istiyor.' },
      { label: 'Şehir tarafı', value: 'Bloklarda asansör ve otopark var; iş öngörülebilir ilerliyor.' },
      { label: 'Yayla yolları', value: 'Yukarı çıkıldıkça yollar daralıp virajlanıyor; orta ölçekli araç tercih ediliyor.' },
      { label: 'Mevsimlik hareket', value: 'Yaz başında yukarı, sonbaharda aşağı; depolama sık talep ediliyor.' },
    ],
    guzergahlar: [
      { to: 'Akdeniz', note: 'Güneye geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Yenişehir', note: 'Güneybatı aksı; düz güzergâh.' },
      { to: 'Mezitli', note: 'Batıya geçiş; yol süresi planlanıyor.' },
      { to: 'Mut', note: 'Kuzeybatı aksı; dağ yolu, erken başlangıç gerekiyor.' },
    ],
    mahalleler: ['Yalınayak', 'Güneş', 'Osmaniye', 'Çukurova', 'Halkkent'],
    sorular: [
      {
        question: 'Yayladaki evime taşıma yapıyor musunuz?',
        answer:
          'Yapıyoruz. Yolu keşifte değerlendirip orta ölçekli araç seçiyor, gerekirse yükü aşağıda aktarıyoruz.',
      },
      {
        question: 'Yaz başında yaylaya, sonbaharda şehre taşınıyorum. İkisini de yapıyor musunuz?',
        answer:
          'Yapıyoruz. Bu mevsimlik taşımalarda eşyanın bir bölümünü depolayıp gerektiğinde teslim de edebiliyoruz.',
      },
      {
        question: 'Şehir tarafındaki dairemden taşınma ne kadar sürer?',
        answer:
          'Erişim rahat olduğu için süreyi hacim belirliyor; orta ölçekli bir daire yarım gün ile bir gün arasında bitiyor.',
      },
      {
        question: 'Eşyalarım sigortalı mı?',
        answer:
          'Bütün taşımalar sigortalı ve kapsam sözleşmede yazılı oluyor.',
      },
    ],
  },

  {
    ad: 'Yenişehir',
    derinlik: 'tam',
    ozet:
      'Sahile paralel uzun ve dar bir şerit olan Yenişehir’de tüm trafik tek arter üzerinden akıyor.',
    metaAciklama:
      'Yenişehir Mersin evden eve nakliyat: yükleme yeri planlanmış taşıma, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Yenişehir sahile paralel, uzun ve dar bir şerit hâlinde uzanıyor. Bunun taşımaya en görünür etkisi trafik: ilçe içindeki hareketin neredeyse tamamı aynı ana arter üzerinden akıyor ve gün ortasında bu hat tıkanıyor. İşleri sabah erken başlatıyor, yüklemeyi yoğun saatlerden önce bitirmeyi hedefliyoruz.</p><p>Yapı dokusu ağırlıklı orta ve yüksek katlı apartman. Bloklarda asansör var ama sahile yakın hatta bina önü park gün boyu dolu; yükleme yerini bir gün önceden apartman görevlisiyle konuşup ayırtıyoruz. Yenişehir’de <strong>evden eve nakliyat</strong> işlerinde asıl kısıt bina değil, aracın nereye çekileceği oluyor.</p><p>İlçe içi taşımalar burada çok yaygın. Aynı hat üzerinde yakın bir adrese geçen aileler için iş çoğunlukla yarım günde tamamlanıyor.</p>`,
    kunye: [
      { label: 'Tek arter', value: 'İlçe içi hareketin tamamı aynı ana yol üzerinden; gün ortası tıkanıyor.' },
      { label: 'Saat seçimi', value: 'İş sabah erken başlatılıp yoğun saatlerden önce bitiriliyor.' },
      { label: 'Yükleme yeri', value: 'Sahile yakın hatta park gün boyu dolu; yer önceden ayırtılıyor.' },
      { label: 'İlçe içi taşıma', value: 'Aynı hat üzerindeki adres değişiklikleri yaygın; çoğu yarım günde bitiyor.' },
    ],
    guzergahlar: [
      { to: 'Mezitli', note: 'Batıya geçiş; sahil aksı, iş yarım günde bitebiliyor.' },
      { to: 'Akdeniz', note: 'Doğuya geçiş; kısa mesafe.' },
      { to: 'Toroslar', note: 'Kuzeye geçiş; varış tarafında eğim hesaba katılıyor.' },
      { to: 'Erdemli', note: 'Batıya devam; sahil yolu, yol süresi planlanıyor.' },
    ],
    mahalleler: ['Pozcu', 'Menteş', 'Batıkent', 'Barbaros', 'Eğriçam', 'Palmiye'],
    sorular: [
      {
        question: 'Ana yol gün ortası çok yoğun, iş gecikir mi?',
        answer:
          'Gecikmemesi için işi sabah erken başlatıyoruz. Yükleme yoğun saatlerden önce bitiyor ve araç yola rahat çıkıyor.',
      },
      {
        question: 'Bina önünde park yeri yok, araç nereye yanaşacak?',
        answer:
          'Yükleme yerini bir gün önceden apartman görevlisiyle konuşup ayırtıyoruz. Mümkün değilse aktarma planlıyoruz.',
      },
      {
        question: 'Yenişehir içinde taşınıyorum, fiyat düşer mi?',
        answer:
          'Düşer. Yol süresi kısa olduğu için bu işlerin çoğu yarım günde bitiyor.',
      },
      {
        question: 'Ambalaj malzemesini siz mi getiriyorsunuz?',
        answer:
          'Evet. Koli, balonlu naylon, streç ve mobilya battaniyesi ekiple birlikte geliyor.',
      },
    ],
  },

  {
    ad: 'Mezitli',
    derinlik: 'tam',
    ozet:
      'Narenciye bahçeleri arasına serpilmiş site dokusuyla Mezitli’de araç yanaşması adresten adrese değişiyor.',
    metaAciklama:
      'Mezitli evden eve nakliyat: site ve bahçe içi adreslere uygun araç planı, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Mezitli’de yerleşim tek parça değil: yeni siteler narenciye bahçelerinin arasına serpilmiş durumda. Ana yola cepheli sitelerde araç bina önüne rahat yanaşıyor; bahçe içlerine doğru giden adreslerde ise yollar daralıyor ve bazı noktalarda büyük araçla manevra alanı kalmıyor. Keşifte baktığımız ilk şey adresin hangi konumda olduğu.</p><p>Site dokusunda asansör ve otopark yaygın; iş öngörülebilir ilerliyor. Tek konu giriş izni oluyor. Mezitli’de <strong>evden eve nakliyat</strong> planlarken bu izni ve yükleme saatini taşımadan önce yönetimle görüşüp alıyoruz.</p><p>Sahil hattındaki bazı adreslerde ikinci konut kullanımı var. Bu taşımalarda eşyanın bir bölümünün depolanması sık talep ediliyor.</p>`,
    kunye: [
      { label: 'Serpik yerleşim', value: 'Siteler narenciye bahçeleri arasına dağılmış; erişim adresten adrese değişiyor.' },
      { label: 'Bahçe içi yollar', value: 'İç adreslerde yol daralıyor, manevra alanı azalıyor.' },
      { label: 'Site izni', value: 'Araç girişi ve yükleme saati önceden yönetimle ayarlanıyor.' },
      { label: 'İkinci konut', value: 'Sahil hattında mevsimlik kullanım; depolama talep ediliyor.' },
    ],
    guzergahlar: [
      { to: 'Yenişehir', note: 'Doğuya geçiş; sahil aksı, iş yarım günde bitebiliyor.' },
      { to: 'Erdemli', note: 'Batıya geçiş; sahil yolu.' },
      { to: 'Toroslar', note: 'Kuzeydoğu aksı; varışta eğim hesaba katılıyor.' },
      { to: 'Akdeniz', note: 'Doğuya devam; yol süresi planlanıyor.' },
    ],
    mahalleler: ['Davultepe', 'Tece', 'Fatih', 'Akdeniz', 'Deniz'],
    sorular: [
      {
        question: 'Bahçe içindeki sitemize araç girebilir mi?',
        answer:
          'Yolu keşifte görüp uygun ölçüde araç seçiyoruz. Manevra alanı yoksa yükü ana yolda aktarıyoruz.',
      },
      {
        question: 'Site iznini kim alıyor?',
        answer:
          'İzni ve yükleme saatini biz yönetimle görüşerek ayarlıyoruz.',
      },
      {
        question: 'Eşyalarımın bir kısmı depoda kalabilir mi?',
        answer:
          'Kalabilir. Taşınacak ve depolanacak eşyayı keşifte birlikte ayırıyoruz.',
      },
      {
        question: 'Beyaz eşya sökümü dahil mi?',
        answer:
          'Dahil. Çamaşır makinesi tamburu sabitleniyor ve yeni adreste bağlantıları kuruluyor.',
      },
    ],
  },

  {
    ad: 'Tarsus',
    derinlik: 'tam',
    ozet:
      'Kendi tarihi merkezi ve ticareti olan Tarsus’ta taşımaların büyük bölümü Mersin’e gitmeden tamamlanıyor.',
    metaAciklama:
      'Tarsus evden eve nakliyat: tarihi merkeze uygun araç planı ve ilçe içi hızlı taşıma, yazılı sabit fiyat.',
    govde: `<p>Tarsus, Mersin’e bağlı olmakla birlikte kendi tarihi merkezi, çarşısı ve ticari hayatı olan bir yer. Taşıma taleplerinin önemli bir bölümü Mersin’e hiç gitmeden ilçe içinde tamamlanıyor; bu işlerde yol süresi kısa ve iş çoğunlukla yarım günde bitiyor.</p><p>Eski merkezdeki sokaklar dar ve bazı adreslere büyük araçla girmek mümkün olmuyor. Bu bölgelerde orta ölçekli araç kullanıyor, gerekirse yükü sokak girişinde aktarıyoruz. Tarsus’ta <strong>evden eve nakliyat</strong> işlerinde eski yapıların dar merdivenleri nedeniyle mobilya sökümü de sık gündeme geliyor.</p><p>Merkez dışındaki ova kesiminde tablo değişiyor: yollar geniş, müstakil evler yaygın ve bahçe ile depo eşyası hacme ekleniyor.</p>`,
    kunye: [
      { label: 'Kendi merkezi', value: 'İşlerin önemli bölümü Mersin’e gitmeden ilçe içinde tamamlanıyor.' },
      { label: 'Eski merkez', value: 'Sokaklar dar; orta ölçekli araç ya da aktarma gerekiyor.' },
      { label: 'Mobilya sökümü', value: 'Eski yapıların dar merdivenleri nedeniyle sık gündeme geliyor.' },
      { label: 'Ova kesimi', value: 'Yollar geniş, müstakil evlerde bahçe ve depo eşyası hacme ekleniyor.' },
    ],
    guzergahlar: [
      { to: 'Akdeniz', note: 'Batıya geçiş; ova yolu, süre öngörülebilir.' },
      { to: 'Yenişehir', note: 'Mersin yönü; yol süresi planlanıyor.' },
      { to: 'Ceyhan', note: 'Doğuya geçiş; il sınırı ötesi, düz güzergâh.' },
      { to: 'Toroslar', note: 'Kuzeybatı aksı; iş tek günde tamamlanıyor.' },
    ],
    mahalleler: ['Şehitkerim', 'Yenice', 'Kızılmurat', 'Bahşiş', 'Gazipaşa'],
    sorular: [
      {
        question: 'Tarsus içinde taşınıyorum, fiyat ne olur?',
        answer:
          'Yol süresi kısa olduğu için en uygun kategoride; çoğu iş yarım günde bitiyor.',
      },
      {
        question: 'Eski merkezde sokağımıza araç giremiyor, çözüm var mı?',
        answer:
          'Var. Orta ölçekli araç kullanıyor ya da yükü sokak girişinde aktarıyoruz; mesafe keşifte ölçülüyor.',
      },
      {
        question: 'Mobilyalar dar merdivenden çıkar mı?',
        answer:
          'Büyük parçalar sökülerek çıkarılıyor; marangozumuz yeni adreste yeniden kuruyor.',
      },
      {
        question: 'Bahçe eşyaları hacme dahil mi?',
        answer:
          'Dahil. Ova kesimindeki müstakil adreslerde keşifte gösterilmesi gerekiyor.',
      },
    ],
  },

  {
    ad: 'Erdemli',
    derinlik: 'tam',
    ozet:
      'Sahil boyunca uzun bir şerit hâlinde uzanan Erdemli’de adresler arası mesafe taşıma planını belirliyor.',
    metaAciklama:
      'Erdemli evden eve nakliyat: uzun sahil şeridine göre planlanan güzergâh, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Erdemli sahil boyunca uzun bir şerit hâlinde uzanıyor ve yerleşim bu hat üzerine dağılmış durumda. İlçenin bir ucundan diğerine yapılan bir taşıma, komşu ilçeye yapılan bir işten daha uzun sürebiliyor. Bu yüzden burada güzergâhı keşif sırasında çıkarıyor, gün planını mesafeye göre kuruyoruz.</p><p>Yapı tipi hat boyunca değişiyor: ilçe merkezinde apartmanlar, sahil hattında yazlık siteler, iç kesimde narenciye bahçeleri arasında müstakil evler var. Erdemli’de <strong>evden eve nakliyat</strong> teklifi hazırlarken müstakil adreslerde bahçe ve depo eşyasını hacme katıyoruz.</p><p>Yazlık sitelerde mevsimlik hareketlilik yüksek. Bu taşımalarda eşyanın bir bölümünün depolanması sık talep ediliyor ve aynı teklifin içinde planlanıyor.</p>`,
    kunye: [
      { label: 'Uzun şerit', value: 'Yerleşim sahil hattına dağılmış; ilçe içi mesafe komşu ilçeden uzun olabiliyor.' },
      { label: 'Üç yapı tipi', value: 'Merkezde apartman, sahilde yazlık site, iç kesimde bahçeli müstakil ev.' },
      { label: 'Ek hacim', value: 'Müstakil adreslerde bahçe ve depo eşyası hacme ekleniyor.' },
      { label: 'Mevsimlik', value: 'Yazlık sitelerde hareketlilik yüksek; depolama sık talep ediliyor.' },
    ],
    guzergahlar: [
      { to: 'Mezitli', note: 'Doğuya geçiş; sahil yolu, iş tek günde bitiyor.' },
      { to: 'Silifke', note: 'Batıya geçiş; yol süresi planlanıyor.' },
      { to: 'Yenişehir', note: 'Mersin yönü; düzenli güzergâh.' },
      { to: 'Toroslar', note: 'Kuzeydoğu aksı; varışta kot farkı hesaba katılıyor.' },
    ],
    mahalleler: ['Ayaş', 'Kocahasanlı', 'Tömük', 'Arpaçbahşiş', 'Alata'],
    sorular: [
      {
        question: 'Erdemli içinde taşınıyorum ama mesafe uzun, fiyat nasıl?',
        answer:
          'İlçe içi olsa da mesafe fiyata giriyor. Güzergâhı keşifte çıkarıp yol süresini yazılı fiyata yansıtıyoruz.',
      },
      {
        question: 'Yazlığımdaki eşyaları depolayabilir misiniz?',
        answer:
          'Depolayabiliriz. Taşınacak ve depolanacak eşyayı keşifte birlikte ayırıyoruz.',
      },
      {
        question: 'Bahçe içindeki eve araç gelebiliyor mu?',
        answer:
          'Yolu keşifte değerlendirip uygun ölçüde araç seçiyoruz; gerekirse aktarma planlıyoruz.',
      },
      {
        question: 'Keşif ücretli mi?',
        answer:
          'Keşif ücretsiz. Ekibimiz adrese gelip eşyayı yerinde görüyor.',
      },
    ],
  },

  // ───────────────────────── ORTA DERİNLİK (4) ─────────────────────────
  {
    ad: 'Silifke',
    derinlik: 'orta',
    ozet: 'İlçe merkezi ile kıyı yerleşimleri arasındaki mesafe Silifke’de güzergâh planlamasını zorunlu kılıyor.',
    metaAciklama:
      'Silifke evden eve nakliyat: merkez ve kıyı arasında planlı güzergâh, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Silifke’de ilçe merkezi iç kesimde, kıyı yerleşimleri ise ondan belirgin biçimde uzakta. Bu iki nokta arasındaki mesafe, taşımanın gün planını doğrudan etkiliyor; güzergâhı önceden çıkarmadan verilen bir süre tutmuyor.</p><p>Delta ovasındaki tarım alanlarında müstakil evler ve depolar yaygın. Silifke’de <strong>evden eve nakliyat</strong> teklifi verirken depo malzemesi ve tarım ekipmanını da hacme katıyoruz.</p>`,
    kunye: [
      { label: 'Merkez–kıyı mesafesi', value: 'İlçe merkezi iç kesimde, kıyı yerleşimleri uzakta; güzergâh şart.' },
      { label: 'Delta ovası', value: 'Tarım alanlarında müstakil ev ve depo yaygın.' },
      { label: 'Ek hacim', value: 'Depo malzemesi ve tarım ekipmanı hacme katılıyor.' },
    ],
    guzergahlar: [
      { to: 'Erdemli', note: 'Doğuya geçiş; sahil yolu, yol süresi planlanıyor.' },
      { to: 'Mut', note: 'Kuzeye geçiş; dağ yolu.' },
      { to: 'Yenişehir', note: 'Mersin yönü; erken başlangıç gerekiyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Kıyıdaki evimden merkeze taşınma ne kadar sürer?', answer: 'Mesafe nedeniyle güzergâhı önceden çıkarıyoruz; iş çoğunlukla tek günde tamamlanıyor.' },
      { question: 'Depo eşyası taşınıyor mu?', answer: 'Taşınıyor ve hacme dahil ediliyor; keşifte gösterilmesi gerekiyor.' },
      { question: 'Fiyata yol masrafı dahil mi?', answer: 'Dahil. Keşiften sonra verilen yazılı fiyat yol ve yakıt dahil toplam tutardır.' },
    ],
  },

  {
    ad: 'Anamur',
    derinlik: 'orta',
    ozet: 'Mersin’in en uzak ilçesi Anamur’da taşımaların bir bölümü il merkezine değil Antalya yönüne yapılıyor.',
    metaAciklama:
      'Anamur evden eve nakliyat: uzun dağ yoluna göre planlanan taşıma, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Anamur, Mersin’in en uzak ilçesi ve il merkezine ulaşım uzun, virajlı bir dağ yolu üzerinden sağlanıyor. Öyle ki buradan yapılan taşımaların bir bölümü Mersin’e değil Antalya yönüne gidiyor. Hangi yöne gidileceği aracın ve ekibin gün planını baştan değiştiriyor.</p><p>Uzun ve virajlı güzergâhta asıl risk eşyanın yolda hareket etmesi. Anamur’da <strong>evden eve nakliyat</strong> işlerinde mobilyaları battaniyeyle sarıp kayış ve takozla sabitliyor, kırılacakları ayrı bölümde taşıyoruz.</p>`,
    kunye: [
      { label: 'En uzak ilçe', value: 'İl merkezine uzun ve virajlı dağ yolu; süre planın merkezinde.' },
      { label: 'İki yön', value: 'Taşımaların bir bölümü Mersin’e değil Antalya yönüne gidiyor.' },
      { label: 'Sabitleme', value: 'Virajlı güzergâhta mobilyalar kayış ve takozla araca bağlanıyor.' },
    ],
    guzergahlar: [
      { to: 'Bozyazı', note: 'Doğuya geçiş; komşu ilçe, kısa mesafe.' },
      { to: 'Gazipaşa', note: 'Batıya geçiş; Antalya yönü, sahil yolu.' },
      { to: 'Silifke', note: 'Mersin yönü; uzun güzergâh, erken başlangıç gerekiyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Antalya yönüne taşıma yapıyor musunuz?', answer: 'Yapıyoruz. Bazı adresler için Antalya yönü Mersin’den daha kısa; güzergâhı buna göre seçiyoruz.' },
      { question: 'Virajlı yolda eşyalarım zarar görür mü?', answer: 'Sabitleme doğru yapıldığında görmez; mobilyalar kayış ve takozla bağlanıyor.' },
      { question: 'Mersin merkezine taşınma tek günde biter mi?', answer: 'Planlı yapıldığında biter; iş gün doğarken başlatılıyor.' },
    ],
  },

  {
    ad: 'Mut',
    derinlik: 'orta',
    ozet: 'Dağ ile ova arasındaki Mut’ta rakım farkı ve kış koşulları taşıma gününü etkiliyor.',
    metaAciklama:
      'Mut evden eve nakliyat: dağ yolu ve kış koşullarına göre planlanan taşıma, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Mut, Toroslar’ın iç kesiminde ve sahil ilçelerinden farklı bir iklime sahip. Kış aylarında yüksek kesimlerde kar ve buzlanma görülüyor; bu dönemde gün seçimini hava durumuna göre yapıyor, gerekirse tarihi kaydırıyoruz.</p><p>Yerleşim ilçe merkezinde toplu, çevrede ise bahçeli müstakil evler yaygın. Mut’ta <strong>evden eve nakliyat</strong> teklifi verirken bahçe ve depo eşyasını hacme katıyoruz.</p>`,
    kunye: [
      { label: 'İç kesim iklimi', value: 'Sahil ilçelerinden farklı; kışın yüksek kesimlerde kar ve buzlanma.' },
      { label: 'Gün seçimi', value: 'Kış aylarında tarih hava durumuna göre belirleniyor.' },
      { label: 'Bahçeli evler', value: 'Çevrede müstakil yerleşim; bahçe ve depo eşyası hacme ekleniyor.' },
    ],
    guzergahlar: [
      { to: 'Silifke', note: 'Güneye geçiş; dağ yolu, süre planlanıyor.' },
      { to: 'Toroslar', note: 'Mersin yönü; erken başlangıç gerekiyor.' },
      { to: 'Erdemli', note: 'Güneydoğu aksı; yol süresi hesaba katılıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Kışın taşınmak zorundayım, risk var mı?', answer: 'Planlı yapıldığında yok. Yolu ve havayı önceden değerlendiriyor, hava sertse günü birlikte değiştiriyoruz.' },
      { question: 'Bahçe eşyaları hacme dahil mi?', answer: 'Dahil. Toplam hacmi artırdığı için keşifte gösterilmesi gerekiyor.' },
      { question: 'Mersin merkezine taşınma tek günde biter mi?', answer: 'Genellikle biter; yol süresi nedeniyle iş sabah erken başlatılıyor.' },
    ],
  },

  {
    ad: 'Bozyazı',
    derinlik: 'orta',
    ozet: 'Sera tarımının yoğun olduğu Bozyazı’da konut taşımalarının yanında depo taşımaları da düzenli talep ediliyor.',
    metaAciklama:
      'Bozyazı evden eve nakliyat ve depo taşıma: sigortalı, planlı ve yazılı sabit fiyatlı hizmet. Ücretsiz keşif.',
    govde: `<p>Bozyazı’da sera tarımının ağırlığı taşıma profiline yansıyor: depo, ambalaj malzemesi ve tarım ekipmanı taşımaları konut işlerinin yanında düzenli olarak talep ediliyor. Bu adreslerde ağır parçalar için ayrı sabitleme kullanıyoruz.</p><p>Konut tarafında yerleşim toplu ve araç yanaşması sorunsuz. Bozyazı’da <strong>evden eve nakliyat</strong> işlerinde asıl değişken il merkezine olan mesafe; güzergâh önceden çıkarılıp iş erken başlatılıyor.</p>`,
    kunye: [
      { label: 'Sera tarımı', value: 'Depo, ambalaj malzemesi ve tarım ekipmanı taşıması düzenli.' },
      { label: 'Konut erişimi', value: 'Yerleşim toplu; araç yanaşması sorunsuz.' },
      { label: 'Merkeze mesafe', value: 'İl merkezine uzak; güzergâh önceden çıkarılıyor.' },
    ],
    guzergahlar: [
      { to: 'Anamur', note: 'Batıya geçiş; komşu ilçe, kısa mesafe.' },
      { to: 'Silifke', note: 'Doğuya geçiş; uzun güzergâh, süre planlanıyor.' },
      { to: 'Mut', note: 'Kuzeydoğu aksı; dağ yolu.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Depomu taşıtabilir miyim?', answer: 'Taşıtabilirsiniz. Ağır parçalar için ayrı sabitleme kullanıyoruz.' },
      { question: 'Mersin merkezine taşınma tek günde biter mi?', answer: 'Planlı yapıldığında biter; güzergâh önceden çıkarılıp iş erken başlatılıyor.' },
      { question: 'Eşyalarım sigortalı mı?', answer: 'Bütün taşımalar sigortalı ve kapsam sözleşmede yazılı oluyor.' },
    ],
  },
]

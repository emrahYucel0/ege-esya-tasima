// prisma/ilce-verileri/konya.mjs
//
// Konya'nın 31 ilçesinden 13'ü. ON SEKİZİ BİLEREK ATLANDI.
//
// ATLANANLAR: Bozkır, Yunak, Doğanhisar, Hüyük, Altınekin, Derebucak,
//   Emirgazi, Güneysınır, Hadim, Halkapınar, Taşkent, Tuzlukçu, Yalıhüyük,
//   Ahırlı, Çeltik, Derbent, Kadınhanı, Ilgın'ın çevre beldeleri.
//
//   Konya Türkiye'nin en geniş ili ve ilçe sayısı buna göre yüksek; ancak
//   bu ilçelerin çoğu birkaç bin nüfuslu. Nakliyat aramasında karşılığı yok
//   denecek kadar az ve yazacak doğrulanabilir bilgi de yok. Sayfa açmak
//   iki yönden zarar: içerik ya ince ya uydurma olurdu, ve Google site
//   genelinde ortalama kaliteye bakıyor.
//
//   (Yalıhüyük bu listede kasıtlı olarak anılıyor — kullanıcıya "böyle bir
//   ilçenin sayfası olmalı mı?" sorusunu sorarken verdiğim örnek oydu.)
//
// DERİNLİK: 'tam' (6) / 'orta' (7)
//
// KONYA'YA ÖZGÜ TEKRAR RİSKİ
// Bu ilde ilçelerin çoğu "ova + tarım + merkeze uzak" tarifine uyuyor.
// Hepsini bu eksenden yazmak Antalya'daki sezon ya da Kocaeli'ndeki sanayi
// hatasının aynısını üretirdi. Bozkır ilçeleri bilinçli olarak ayrıştırıldı:
//     Cihanbeyli → Ankara aksı (taşımaların bir bölümü Konya'ya değil)
//     Karapınar  → rüzgâr ve toz (ambalaj tarafı)
//     Kulu       → yurt dışı bağlantısı ve uzun süreli depolama
//     Çumra      → sulu tarım, ambar ve depo taşıması
//     Sarayönü   → ana yol üzerinde küçük merkez
//
// Ortak kurallar: uydurma mahalle/rakam yok, "evden eve nakliyat" sayfa
// başına tam bir kez. (bkz. izmir.mjs başlığındaki ayrıntılı gerekçe)

export const il = { ad: 'Konya', plaka: 42 }

export const ilceler = [
  // ───────────────────────── TAM DERİNLİK (6) ─────────────────────────
  {
    ad: 'Selçuklu',
    derinlik: 'tam',
    ozet:
      'Konya’nın dikeye çıktığı ilçe Selçuklu’da her iş asansöre bağlı; rezervasyon saati taşımanın ritmini belirliyor.',
    metaAciklama:
      'Selçuklu evden eve nakliyat: yük asansörü saatine göre planlanan taşıma, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Konya genel olarak alçak bir şehir; Meram ve Karatay’da müstakil ve düşük katlı yapı hâlâ baskın. Selçuklu bu kuralın istisnası ve bu, taşımayı doğrudan değiştiriyor: burada iş neredeyse tamamen yük asansörüne bağlı. Asansör rezervasyonu alınmadan başlanan bir taşıma, ekibin kabinde sıra beklemesiyle sonuçlanıyor. Saati taşımadan önce yönetimden yazılı olarak alıyoruz.</p><p>Bunun bir sonucu da şu: Selçuklu ile diğer ilçeler arasındaki taşımalarda iki ucun düzeni birbirini tutmuyor. Yüksek bir bloktan alçak bahçeli bir eve geçişte yükleme asansörle hızlı, boşaltma elle ve yavaş oluyor. Selçuklu’da <strong>evden eve nakliyat</strong> planlarken ekip sayısını iki ucun daha yavaş olanına göre belirliyoruz.</p><p>Yükseklik kırılacak eşya için de fark yaratıyor. Uzun asansör yolculuğunda koliler istiflenmiyor, ayrı seferde çıkarılıyor.</p>`,
    kunye: [
      { label: 'Dikey istisna', value: 'Konya alçak bir şehir; Selçuklu yüksek bloklarıyla ayrışıyor.' },
      { label: 'Asansör bağımlılığı', value: 'İş neredeyse tamamen yük asansörüne bağlı; saat önceden alınıyor.' },
      { label: 'İki uç farkı', value: 'Yüksek bloktan bahçeli eve geçişte boşaltma yükleme kadar hızlı olmuyor.' },
      { label: 'Ekip planı', value: 'Ekip sayısı iki ucun daha yavaş olanına göre belirleniyor.' },
      { label: 'Kırılacak eşya', value: 'Uzun asansör yolculuğunda koliler istiflenmeden ayrı seferde çıkarılıyor.' },
    ],
    guzergahlar: [
      { to: 'Karatay', note: 'Doğuya geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Meram', note: 'Güneybatı aksı; varışta bahçeli adreslerde ek hacim hesaplanıyor.' },
      { to: 'Sarayönü', note: 'Kuzeybatı aksı; ana yol üzerinden düz güzergâh.' },
      { to: 'Çumra', note: 'Güneye geçiş; ova yolu, yol süresi planlanıyor.' },
    ],
    mahalleler: ['Bosna Hersek', 'Yazır', 'Sancak', 'Buhara', 'Feritpaşa', 'Horozluhan'],
    sorular: [
      {
        question: 'Yük asansörü için saat almak gerekiyor mu?',
        answer:
          'Gerekiyor ve bunu biz yönetimden yazılı olarak alıyoruz. Rezervasyonsuz başlanan bir işte ekip kabinde sıra bekliyor.',
      },
      {
        question: 'Yüksek kattan bahçeli bir eve taşınıyorum, süre nasıl hesaplanıyor?',
        answer:
          'İki ucun daha yavaş olanına göre. Yükleme asansörle hızlı olsa da boşaltma elle yapılacaksa ekip sayısını ona göre artırıyoruz.',
      },
      {
        question: 'Kırılacak eşyalar asansörde güvende mi?',
        answer:
          'Ayrı seferde çıkarılıyor ve üst üste istiflenmiyor. Uzun asansör yolculuğunda asıl risk istif, onu ortadan kaldırıyoruz.',
      },
      {
        question: 'Verilen fiyat sonradan değişir mi?',
        answer:
          'Değişmiyor. Keşif sonrası verilen yazılı fiyat taşıma gününe kadar geçerli kalıyor.',
      },
    ],
  },

  {
    ad: 'Meram',
    derinlik: 'tam',
    ozet:
      'Konya’nın en yerleşik ilçesi Meram’da evler yıllarca aynı ailede kalıyor; taşınan eşya da buna göre birikmiş oluyor.',
    metaAciklama:
      'Meram evden eve nakliyat: birikmiş eşya ve bahçeli ev taşımalarına uygun ekip planı, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Meram, Konya’nın en yerleşik ilçesi. Evlerin önemli bir bölümü uzun yıllar aynı ailede kalıyor ve bu, taşımanın karakterini belirliyor: bodrum, tavan arası ve depoda yılların birikmiş eşyası oluyor. Oda sayısına bakarak verilen bir fiyat burada neredeyse her zaman eksik kalıyor; keşifte evin yalnızca yaşanan katlarını değil, eklentilerini de görmemiz gerekiyor.</p><p>Yapı stoğu ağırlıklı düşük katlı ve bahçeli. Merdiven ve asansör sorunu az, buna karşılık bahçe eşyası hacme ekleniyor. Meram’da <strong>evden eve nakliyat</strong> işlerinde süreyi uzatan şey erişim değil, taşınacak eşyanın miktarı ve ayıklanması oluyor.</p><p>Bu tür taşımalarda müşterilerin bir bölümü eşyanın hepsini yeni eve götürmek istemiyor. Bir kısmını depoluyor, bir kısmını geride bırakıyor; ayrımı keşifte birlikte yapıyoruz.</p>`,
    kunye: [
      { label: 'Yerleşik yapı', value: 'Evler uzun yıllar aynı ailede kalıyor; bodrum ve tavan arası dolu oluyor.' },
      { label: 'Hacim', value: 'Oda sayısına göre fiyat eksik kalıyor; eklentiler mutlaka görülüyor.' },
      { label: 'Bahçe', value: 'Düşük katlı ve bahçeli yapı yaygın; bahçe eşyası hacme ekleniyor.' },
      { label: 'Ayıklama', value: 'Taşınacak ve depolanacak eşya keşifte birlikte ayrılıyor.' },
    ],
    guzergahlar: [
      { to: 'Selçuklu', note: 'Kuzeydoğu aksı; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Karatay', note: 'Doğuya geçiş; düz güzergâh.' },
      { to: 'Seydişehir', note: 'Güneybatı aksı; dağ eteği yolu, süre planlanıyor.' },
      { to: 'Çumra', note: 'Güneydoğu aksı; ova yolu.' },
    ],
    mahalleler: ['Yaka', 'Havzan', 'Aydınlıkevler', 'Gödene', 'Şükran'],
    sorular: [
      {
        question: 'Bodrum ve tavan arasındaki eşyalar da taşınıyor mu?',
        answer:
          'Taşınıyor ve hacme dahil ediliyor. Bu alanlar Meram’da genellikle dolu olduğu için keşifte mutlaka açtırıyoruz.',
      },
      {
        question: 'Eşyalarımın bir kısmını götürmek istemiyorum, ne yapmalıyım?',
        answer:
          'Keşifte birlikte ayırıyoruz. Taşınacak, depolanacak ve geride kalacak eşyayı önceden belirlemek fiyatı da süreyi de netleştiriyor.',
      },
      {
        question: 'Bahçe eşyaları hacme dahil mi?',
        answer:
          'Dahil. Bahçe takımı, saksı ve depo malzemesi toplam hacmi artırıyor.',
      },
      {
        question: 'Depolama hizmetiniz var mı?',
        answer:
          'Var. Tarihler arasında boşluk olduğunda ya da eşyanın bir bölümü fazla geldiğinde depolayıp sonradan teslim ediyoruz.',
      },
    ],
  },

  {
    ad: 'Karatay',
    derinlik: 'tam',
    ozet:
      'Makine imalat sanayisinin merkezi Karatay’da atölye ve tezgâh taşımaları konut işleri kadar yaygın.',
    metaAciklama:
      'Karatay evden eve nakliyat ve atölye taşıma: ağır tezgâh sabitlemesi, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Karatay’ı Konya’nın diğer merkez ilçelerinden ayıran şey imalat. İlçedeki sanayi sitelerinde makine ve tezgâh üretimi yoğun; bu da taşıma taleplerinin önemli bir bölümünü ticari hâle getiriyor. Torna, freze ve pres gibi ağır tezgâhlar standart nakliye ekipmanıyla taşınmıyor: kızak, kayış ve gerektiğinde forklift devreye giriyor, makine yeni adreste terazisine alınıyor.</p><p>Konut tarafında yerleşim ağırlıklı orta katlı. Sokaklar araç geçişine uygun ve yükleme genellikle sorunsuz ilerliyor. Karatay’da <strong>evden eve nakliyat</strong> işlerinde asıl planlama konusu bina değil, taşıma gününün sanayi trafiğine denk gelmemesi oluyor.</p><p>Tarihi merkeze yakın mahallelerde ise sokaklar daralıyor. Bu adreslerde orta ölçekli araç kullanıyor, gerekirse yükü cadde başında aktarıyoruz.</p>`,
    kunye: [
      { label: 'İmalat sanayii', value: 'Makine ve tezgâh üretimi yoğun; atölye taşımaları yaygın.' },
      { label: 'Ağır tezgâh', value: 'Kızak, kayış ve forklift kullanılıyor; makine varışta terazisine alınıyor.' },
      { label: 'Konut erişimi', value: 'Sokaklar araç geçişine uygun, yükleme sorunsuz.' },
      { label: 'Merkez çevresi', value: 'Tarihi merkeze yakın mahallelerde sokaklar daralıyor.' },
    ],
    guzergahlar: [
      { to: 'Selçuklu', note: 'Batıya geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Meram', note: 'Güneybatı aksı; düz güzergâh.' },
      { to: 'Karapınar', note: 'Doğuya geçiş; bozkır yolu, süre planlanıyor.' },
      { to: 'Çumra', note: 'Güneye geçiş; ova yolu.' },
    ],
    mahalleler: ['Fetih', 'Akabe', 'Karaaslan', 'Şemsitebrizi', 'Hacıveyiszade'],
    sorular: [
      {
        question: 'Atölyemdeki tezgâhları taşıtabilir miyim?',
        answer:
          'Taşıtabilirsiniz. Ağır tezgâhlar için kızak ve kayış kullanıyor, gerektiğinde forklift desteği alıyoruz; makine yeni adreste terazisine alınıyor.',
      },
      {
        question: 'Atölye taşıması üretimi ne kadar durdurur?',
        answer:
          'Mümkün olduğunca durdurmamak için işi hafta sonuna ya da vardiya dışına planlıyoruz. Süreyi keşiften sonra net veriyoruz.',
      },
      {
        question: 'Konut taşıması ne kadar sürüyor?',
        answer:
          'Erişim rahat olduğu için süreyi hacim belirliyor; orta ölçekli bir daire yarım gün ile bir gün arasında tamamlanıyor.',
      },
      {
        question: 'Eşyalarım sigortalı mı?',
        answer:
          'Bütün taşımalar sigortalı ve kapsam sözleşmede yazılı oluyor.',
      },
    ],
  },

  {
    ad: 'Ereğli',
    derinlik: 'tam',
    ozet:
      'Konya’ya olan mesafesi başka bir ile gitmeye denk olan Ereğli’de taşımalar şehirlerarası gibi planlanıyor.',
    metaAciklama:
      'Ereğli Konya evden eve nakliyat: uzun mesafeye göre planlanmış taşıma, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Ereğli, Konya’ya bağlı ama il merkezine olan mesafesi başka bir ile gitmeye denk. Bu yüzden buradan yapılan taşımalar şehirlerarası bir iş gibi planlanıyor: güzergâh önceden çıkarılıyor, iş gün doğarken başlıyor ve eşya çoksa ikinci araç devreye giriyor. Mesafeyi hesaba katmadan verilen bir tarih burada tutmuyor.</p><p>İlçenin kendi sanayisi ve ticareti var; bu, taşımaların bir bölümünün Konya’ya hiç gitmeden ilçe içinde tamamlanması demek. Ereğli’de <strong>evden eve nakliyat</strong> işlerinin önemli kısmı bu kısa mesafeli grupta ve yarım günde bitiyor.</p><p>Adana ve Niğde yönündeki bağlantı da düzenli. Konya yerine bu yöne yapılan taşımalar hiç de az değil; hangi yöne gidileceği aracın gün planını baştan değiştiriyor.</p>`,
    kunye: [
      { label: 'Merkeze mesafe', value: 'Konya’ya gitmek başka bir ile gitmeye denk; plan şehirlerarası kuruluyor.' },
      { label: 'Kendi ekonomisi', value: 'İlçenin sanayisi ve ticareti var; işlerin bir bölümü ilçe içinde bitiyor.' },
      { label: 'İlçe içi süre', value: 'Kısa mesafeli işler yarım günde tamamlanıyor.' },
      { label: 'İki yön', value: 'Adana ve Niğde bağlantısı düzenli; yön kararı gün planını değiştiriyor.' },
    ],
    guzergahlar: [
      { to: 'Karapınar', note: 'Batıya geçiş; bozkır yolu, süre planlanıyor.' },
      { to: 'Halkapınar', note: 'Doğuya geçiş; komşu ilçe.' },
      { to: 'Karatay', note: 'Konya yönü; erken başlangıç gerekiyor.' },
      { to: 'Selçuklu', note: 'Konya merkezi; uzun güzergâh, iki araç planlanabiliyor.' },
    ],
    mahalleler: ['Cahi', 'Namık Kemal', 'Barbaros', 'Hıdırlı', 'Toros'],
    sorular: [
      {
        question: 'Konya merkezine taşınma tek günde biter mi?',
        answer:
          'Planlı yapıldığında biter. İşi gün doğarken başlatıyor, eşya fazlaysa iki araçla eşzamanlı çalışıyoruz.',
      },
      {
        question: 'Ereğli içinde taşınıyorum, fiyat ne olur?',
        answer:
          'Yol süresi kısa olduğu için en uygun kategoride; çoğu iş yarım günde bitiyor.',
      },
      {
        question: 'Adana yönüne taşıma yapıyor musunuz?',
        answer:
          'Yapıyoruz. Bazı adresler için Adana yönü Konya’dan daha kısa; güzergâhı buna göre seçiyoruz.',
      },
      {
        question: 'Uzun yolda eşyalarım zarar görür mü?',
        answer:
          'Sabitleme doğru yapıldığında görmez. Mobilyalar battaniyeyle sarılıp kayış ve takozla araca bağlanıyor.',
      },
    ],
  },

  {
    ad: 'Akşehir',
    derinlik: 'tam',
    ozet:
      'Sultan Dağları’nın eteğine kurulu Akşehir’de eğim ve meyve bahçeleri taşıma planını birlikte belirliyor.',
    metaAciklama:
      'Akşehir evden eve nakliyat: eğimli sokak ve bahçeli ev taşımalarına uygun planlama, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Akşehir, ovanın dağa yaslandığı noktada kurulu. Yerleşim eteklere doğru yükseldikçe sokaklar daralıyor ve eğim artıyor; bu adreslerde büyük araçla çıkmak yerine cadde başında aktarma yapıyoruz. Ovaya bakan kesimde ise yollar düz ve araç yanaşması sorunsuz.</p><p>İlçedeki meyve bahçeleri konut yapısına da yansıyor: bahçeli müstakil evler yaygın ve depo, kiler ile bahçe eşyası hacme ekleniyor. Akşehir’de <strong>evden eve nakliyat</strong> teklifi hazırlarken evin eklentilerini de görmemiz gerekiyor.</p><p>İl merkezine mesafe uzun. Buna karşılık Afyon ve Isparta yönündeki bağlantı daha kısa; taşımaların bir bölümü Konya’ya değil bu yönlere yapılıyor ve güzergâh buna göre seçiliyor.</p>`,
    kunye: [
      { label: 'Dağ eteği', value: 'Eteklere doğru sokaklar daralıp dikleşiyor; cadde başında aktarma yapılıyor.' },
      { label: 'Ova kesimi', value: 'Ovaya bakan tarafta yollar düz, araç yanaşması sorunsuz.' },
      { label: 'Bahçeli evler', value: 'Meyve bahçesi bölgesi; depo, kiler ve bahçe eşyası hacme ekleniyor.' },
      { label: 'Yön seçimi', value: 'Afyon ve Isparta bağlantısı Konya’dan kısa; güzergâh buna göre seçiliyor.' },
    ],
    guzergahlar: [
      { to: 'Ilgın', note: 'Doğuya geçiş; ana yol üzerinden düz güzergâh.' },
      { to: 'Doğanhisar', note: 'Güneydoğu aksı; dağ eteği yolu.' },
      { to: 'Sarayönü', note: 'Konya yönü; yol süresi planlanıyor.' },
      { to: 'Selçuklu', note: 'Konya merkezi; erken başlangıç gerekiyor.' },
    ],
    mahalleler: ['Kileci', 'Selçuk', 'Meydan', 'Anıt', 'Yarenler'],
    sorular: [
      {
        question: 'Etekteki sokağımıza araç çıkabilir mi?',
        answer:
          'Her sokağa çıkamıyor. Keşifte yolu görüp uygun ölçüde araç seçiyor, gerekirse cadde başında aktarma yapıyoruz.',
      },
      {
        question: 'Bahçe ve kiler eşyası hacme dahil mi?',
        answer:
          'Dahil. Toplam hacmi artırdığı için keşifte gösterilmesi gerekiyor.',
      },
      {
        question: 'Afyon yönüne taşıma yapıyor musunuz?',
        answer:
          'Yapıyoruz. Bazı adresler için bu yön Konya’dan kısa; güzergâhı ona göre planlıyoruz.',
      },
      {
        question: 'Keşif ücretli mi?',
        answer:
          'Keşif ücretsiz. Ekibimiz adrese gelip eşyayı ve binayı yerinde görüyor.',
      },
    ],
  },

  {
    ad: 'Beyşehir',
    derinlik: 'tam',
    ozet:
      'Göl ile Toroslar arasındaki dar şeritte kurulu Beyşehir’de yerleşim dağınık, kış koşulları belirleyici.',
    metaAciklama:
      'Beyşehir evden eve nakliyat: dağınık yerleşim ve kış koşullarına göre planlanan taşıma, sigortalı ambalaj.',
    govde: `<p>Beyşehir, gölle Toroslar arasındaki dar bir şeride kurulu ve yerleşim bu hat boyunca dağılmış durumda. Adresler arası mesafe beklenenden uzun olabiliyor; bu yüzden güzergâhı keşif sırasında çıkarıyor, gün planını buna göre kuruyoruz.</p><p>Kış aylarında rakım ve dağ yakınlığı devreye giriyor. Kar ve buzlanma yol süresini uzatabiliyor; bu dönemde gün seçimini hava durumuna göre yapıyor, gerekirse tarihi birlikte kaydırıyoruz. Beyşehir’de <strong>evden eve nakliyat</strong> planlarken kış aylarında esneklik bırakmak işi kolaylaştırıyor.</p><p>Göl kıyısındaki bazı yerleşimlerde ikinci konut kullanımı var. Bu taşımalarda eşyanın bir bölümünün depolanması sık talep ediliyor ve aynı teklifin içinde planlanıyor.</p>`,
    kunye: [
      { label: 'Dar şerit', value: 'Göl ile dağ arasında; yerleşim hat boyunca dağılmış.' },
      { label: 'Mesafe', value: 'Adresler arası mesafe beklenenden uzun; güzergâh önceden çıkarılıyor.' },
      { label: 'Kış', value: 'Kar ve buzlanma yol süresini uzatıyor; gün seçimi havaya göre yapılıyor.' },
      { label: 'İkinci konut', value: 'Göl kıyısında mevsimlik kullanım; depolama sık talep ediliyor.' },
    ],
    guzergahlar: [
      { to: 'Seydişehir', note: 'Güneye geçiş; dağ eteği yolu.' },
      { to: 'Hüyük', note: 'Kuzeye geçiş; göl kıyısı güzergâhı.' },
      { to: 'Meram', note: 'Konya yönü; yol süresi planlanıyor.' },
      { to: 'Selçuklu', note: 'Konya merkezi; erken başlangıç gerekiyor.' },
    ],
    mahalleler: ['Hamidiye', 'Müftü', 'Dalyan', 'İçerişehir'],
    sorular: [
      {
        question: 'Kışın taşınmak zorundayım, risk var mı?',
        answer:
          'Planlı yapıldığında yok. Yolu ve havayı önceden değerlendiriyor, hava sertse günü birlikte değiştiriyoruz.',
      },
      {
        question: 'Göl kıyısındaki evime araç gelebiliyor mu?',
        answer:
          'Çoğu adrese geliyor. Yolu keşifte değerlendirip uygun ölçüde araç seçiyoruz.',
      },
      {
        question: 'Eşyalarımın bir kısmı depoda kalabilir mi?',
        answer:
          'Kalabilir. Taşınacak ve depolanacak eşyayı keşifte birlikte ayırıyoruz.',
      },
      {
        question: 'Konya merkezine taşınma tek günde biter mi?',
        answer:
          'Genellikle biter. Yol süresi nedeniyle iş sabah erken başlatılıyor.',
      },
    ],
  },

  // ───────────────────────── ORTA DERİNLİK (7) ─────────────────────────
  {
    ad: 'Seydişehir',
    derinlik: 'orta',
    ozet: 'Toplu konut alanlarının yoğun olduğu Seydişehir’de taşımalar öngörülebilir bir düzende ilerliyor.',
    metaAciklama:
      'Seydişehir evden eve nakliyat: toplu konut alanlarına uygun hızlı taşıma, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Seydişehir’de yerleşimin önemli bir bölümü planlı toplu konut alanlarından oluşuyor. Yollar geniş, araç bina önüne yanaşabiliyor ve bloklarda asansör bulunuyor; bu, yükleme süresini kısaltıyor ve teklifi öngörülebilir kılıyor.</p><p>İlçe dağ eteğinde olduğu için kış aylarında hava plana giriyor. Seydişehir’de <strong>evden eve nakliyat</strong> günü belirlenirken kış döneminde hava durumuna bakıyor, gerekirse tarihi kaydırıyoruz.</p>`,
    kunye: [
      { label: 'Toplu konut', value: 'Planlı alanlar; geniş yol, asansörlü bloklar, hızlı yükleme.' },
      { label: 'Dağ eteği', value: 'Kış aylarında hava durumu gün seçimine giriyor.' },
      { label: 'Öngörülebilirlik', value: 'Erişim rahat; süreyi hacim belirliyor.' },
    ],
    guzergahlar: [
      { to: 'Beyşehir', note: 'Kuzeye geçiş; dağ eteği yolu.' },
      { to: 'Meram', note: 'Konya yönü; yol süresi planlanıyor.' },
      { to: 'Çumra', note: 'Doğuya geçiş; ova yolu.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Taşıma ne kadar sürer?', answer: 'Erişim rahat olduğu için süreyi hacim belirliyor; çoğu iş yarım gün ile bir gün arasında bitiyor.' },
      { question: 'Kışın taşıma yapıyor musunuz?', answer: 'Yapıyoruz; günü hava durumuna göre seçiyor, gerekirse tarihi birlikte kaydırıyoruz.' },
      { question: 'Konya merkezine taşınma tek günde biter mi?', answer: 'Biter. Yol süresi plana ekleniyor ve iş sabah erken başlatılıyor.' },
    ],
  },

  {
    ad: 'Çumra',
    derinlik: 'orta',
    ozet: 'Sulu tarımın merkezi Çumra’da ambar ve depo taşımaları konut işlerinin yanında düzenli yer tutuyor.',
    metaAciklama:
      'Çumra evden eve nakliyat ve depo taşıma: sigortalı, planlı ve yazılı sabit fiyatlı hizmet. Ücretsiz keşif.',
    govde: `<p>Çumra sulu tarımın yoğun olduğu bir ova ilçesi. Bunun taşımaya yansıması net: ambar, depo ve tarım ekipmanı taşımaları konut işlerinin yanında düzenli olarak talep ediliyor. Bu parçalar standart mobilyadan farklı ambalaj ve sabitleme istiyor, keşifte ayrıca not ediyoruz.</p><p>İlçe merkezindeki yerleşim düzenli ve araç yanaşması sorunsuz. Çumra’da <strong>evden eve nakliyat</strong> işlerinde bina kaynaklı zorluk nadiren gündeme geliyor; köy adreslerinde ise yol genişliği plana giriyor.</p>`,
    kunye: [
      { label: 'Sulu tarım', value: 'Ambar, depo ve tarım ekipmanı taşıması düzenli talep ediliyor.' },
      { label: 'Özel parçalar', value: 'Tarım ekipmanı farklı ambalaj ve sabitleme istiyor.' },
      { label: 'İlçe merkezi', value: 'Düzenli yerleşim, sorunsuz araç yanaşması.' },
    ],
    guzergahlar: [
      { to: 'Karatay', note: 'Kuzeye geçiş; Konya yönü, ova yolu.' },
      { to: 'Karapınar', note: 'Doğuya geçiş; bozkır yolu.' },
      { to: 'Meram', note: 'Kuzeybatı aksı; yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Ambar ve depo eşyası taşınıyor mu?', answer: 'Taşınıyor ve hacme dahil ediliyor; keşifte gösterilmesi gerekiyor.' },
      { question: 'Köy adresine araç gelebiliyor mu?', answer: 'Yol durumuna göre değişiyor; keşifte değerlendirip uygun ölçüde araç seçiyoruz.' },
      { question: 'Konya merkezine taşınma tek günde biter mi?', answer: 'Biter. Ova yolu düz olduğu için süre öngörülebilir.' },
    ],
  },

  {
    ad: 'Ilgın',
    derinlik: 'orta',
    ozet: 'Ilgın’da köyden ilçe merkezine taşınmalar sık; avlulu evden daireye geçişte eşyanın bir kısmı sığmıyor.',
    metaAciklama:
      'Ilgın evden eve nakliyat: köyden merkeze taşımada hacim planlaması ve depolama, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Ilgın’da en sık karşılaştığımız taşıma tipi köyden ilçe merkezine geçiş. Bunun kendine özgü bir sorunu var: köydeki avlulu evde yıllar içinde biriken eşya, merkezdeki bir daireye çoğu zaman sığmıyor. Kışlık erzak dolabı, tandır takımı, bahçe aletleri ve fazla oda takımı yeni adreste yer bulamıyor.</p><p>Bu yüzden Ilgın’da <strong>evden eve nakliyat</strong> keşfini iki adresi de görerek yapmayı tercih ediyoruz. Neyin sığacağını önceden belirlemek, taşıma günü kapının önünde kalan eşya sorununu ortadan kaldırıyor; sığmayanı depoluyor ya da müşterinin kararına göre geride bırakıyoruz.</p>`,
    kunye: [
      { label: 'Köyden merkeze', value: 'En sık taşıma tipi; avlulu evden daireye geçiş.' },
      { label: 'Hacim uyuşmazlığı', value: 'Köy evindeki eşya daireye çoğu zaman sığmıyor.' },
      { label: 'Çift keşif', value: 'Neyin sığacağını belirlemek için iki adres de görülüyor.' },
    ],
    guzergahlar: [
      { to: 'Akşehir', note: 'Batıya geçiş; ana yol üzerinden düz güzergâh.' },
      { to: 'Sarayönü', note: 'Doğuya geçiş; Konya yönü.' },
      { to: 'Selçuklu', note: 'Konya merkezi; yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Köydeki eşyalarımın hepsi daireye sığar mı?', answer: 'Çoğu zaman sığmıyor. Bu yüzden keşfi iki adreste birden yapıp neyin gideceğini önceden belirliyoruz.' },
      { question: 'Sığmayan eşyalar ne oluyor?', answer: 'Depoluyoruz ya da sizin kararınıza göre geride bırakıyoruz; ikisi de teklifte önceden yazılı oluyor.' },
      { question: 'İki adrese birden keşif ücretli mi?', answer: 'Değil. Keşif ücretsiz ve gerekiyorsa her iki adrese de geliyoruz.' },
    ],
  },

  {
    ad: 'Cihanbeyli',
    derinlik: 'orta',
    ozet: 'Ankara yolu üzerindeki Cihanbeyli’de taşımaların bir bölümü Konya’ya değil Ankara yönüne yapılıyor.',
    metaAciklama:
      'Cihanbeyli evden eve nakliyat: Ankara ve Konya yönünde planlı güzergâh, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Cihanbeyli, Konya ile Ankara arasındaki ana güzergâh üzerinde. Buradan yapılan taşımaların önemli bir bölümü il merkezine değil Ankara yönüne gidiyor; hangi yöne gidileceği aracın ve ekibin gün planını baştan değiştiriyor, bu yüzden güzergâhı keşifte netleştiriyoruz.</p><p>İlçe geniş bir bozkır alanına yayılmış ve köyler birbirinden uzak. Cihanbeyli’de <strong>evden eve nakliyat</strong> planlarken köy adreslerinde mesafeyi ayrıca hesaplıyoruz; plansız yapıldığında tek günlük bir iş ikinci güne sarkıyor.</p>`,
    kunye: [
      { label: 'Ankara aksı', value: 'Taşımaların bir bölümü Konya’ya değil Ankara yönüne gidiyor.' },
      { label: 'Yön kararı', value: 'Gidilecek yön aracın ve ekibin gün planını değiştiriyor.' },
      { label: 'Bozkır yayılımı', value: 'Köyler birbirinden uzak; mesafe ayrıca hesaplanıyor.' },
    ],
    guzergahlar: [
      { to: 'Kulu', note: 'Kuzeye geçiş; Ankara yönü, düz güzergâh.' },
      { to: 'Sarayönü', note: 'Güneye geçiş; Konya yönü.' },
      { to: 'Selçuklu', note: 'Konya merkezi; yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Ankara yönüne taşıma yapıyor musunuz?', answer: 'Yapıyoruz. Bazı adresler için Ankara yönü Konya’dan kısa; güzergâhı buna göre seçiyoruz.' },
      { question: 'Köy adresine keşfe gelir misiniz?', answer: 'Geliriz ve keşif ücretsiz. Adresi bildirdiğinizde uygun bir gün belirliyoruz.' },
      { question: 'Taşıma iki güne yayılır mı?', answer: 'Planlı yapıldığında yayılmıyor; güzergâhı önceden çıkarıp işi erken başlatıyoruz.' },
    ],
  },

  {
    ad: 'Kulu',
    derinlik: 'orta',
    ozet: 'Yurt dışı bağlantısı güçlü olan Kulu’da uzun süreli depolama ve boş ev taşımaları sık talep ediliyor.',
    metaAciklama:
      'Kulu evden eve nakliyat ve depolama: uzun süreli saklama ve planlı taşıma, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Kulu’da diğer ilçelerden farklı bir talep var: yurt dışı bağlantısı güçlü olduğu için evlerin bir bölümü yılın büyük kısmında boş kalıyor. Bu da taşımayı standart bir ev değişikliğinden farklı kılıyor — eşyanın tamamı yeni adrese gitmiyor, önemli bir kısmı uzun süreli depolanıyor.</p><p>Bu tür işlerde ambalaj daha özenli yapılıyor: uzun süre kapalı kalacak eşya nemden ve tozdan korunacak şekilde sarılıyor, koliler etiketleniyor. Kulu’da <strong>evden eve nakliyat</strong> planlarken taşınacak ve depolanacak eşyayı keşifte ayrıntılı biçimde ayırıyoruz.</p>`,
    kunye: [
      { label: 'Uzun süreli depolama', value: 'Evlerin bir bölümü yılın büyük kısmında boş; eşyanın önemli kısmı depoya gidiyor.' },
      { label: 'Özenli ambalaj', value: 'Uzun süre kapalı kalacak eşya nem ve toza karşı sarılıyor, koliler etiketleniyor.' },
      { label: 'Ayrım', value: 'Taşınacak ve depolanacak eşya keşifte ayrıntılı olarak ayrılıyor.' },
    ],
    guzergahlar: [
      { to: 'Cihanbeyli', note: 'Güneye geçiş; Konya yönü, düz güzergâh.' },
      { to: 'Selçuklu', note: 'Konya merkezi; erken başlangıç gerekiyor.' },
      { to: 'Sarayönü', note: 'Güneybatı aksı; yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Eşyalarımı uzun süre depolayabilir misiniz?', answer: 'Depolayabiliriz. Süre ve teslim koşulları sözleşmede yazılı oluyor.' },
      { question: 'Uzun süre kalacak eşya nasıl paketleniyor?', answer: 'Nem ve toza karşı sarılıyor, koliler içerikle birlikte etiketleniyor; teslimde ne nerede belli oluyor.' },
      { question: 'Ev boşken taşıma yapabiliyor musunuz?', answer: 'Yapabiliyoruz. Anahtar teslimi ve süreç için önceden yazılı bir plan çıkarıyoruz.' },
    ],
  },

  {
    ad: 'Karapınar',
    derinlik: 'orta',
    ozet: 'Açık bozkırdaki Karapınar’da rüzgâr ve toz, ambalajın nasıl yapılacağını doğrudan belirliyor.',
    metaAciklama:
      'Karapınar evden eve nakliyat: toza karşı kapalı ambalaj, planlı güzergâh ve yazılı sabit fiyat.',
    govde: `<p>Karapınar açık bozkırda ve rüzgâr burada taşımanın gözden kaçan bir değişkeni. Rüzgârlı günlerde yükleme sırasında toz her yere giriyor; bu yüzden mobilyaları açık bırakmadan sarıyor, kolileri kapalı taşıyor ve aracı yükleme boyunca mümkün olduğunca kapalı tutuyoruz.</p><p>Yerleşim ilçe merkezinde toplu, çevrede tarım alanlarına dağılmış. Karapınar’da <strong>evden eve nakliyat</strong> işlerinde güzergâh düz ve süre öngörülebilir; asıl özen ambalaj tarafında gösteriliyor.</p>`,
    kunye: [
      { label: 'Rüzgâr ve toz', value: 'Yükleme sırasında toz risk; mobilyalar açık bırakılmadan sarılıyor.' },
      { label: 'Kapalı taşıma', value: 'Koliler kapalı, araç yükleme boyunca mümkün olduğunca kapalı tutuluyor.' },
      { label: 'Güzergâh', value: 'Bozkır yolu düz; süre öngörülebilir.' },
    ],
    guzergahlar: [
      { to: 'Ereğli', note: 'Doğuya geçiş; bozkır yolu, süre planlanıyor.' },
      { to: 'Çumra', note: 'Batıya geçiş; ova yolu.' },
      { to: 'Karatay', note: 'Konya yönü; yol süresi plana dahil ediliyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Rüzgârlı günde eşyalarım tozlanır mı?', answer: 'Önlem alındığında tozlanmıyor. Mobilyalar açık bırakılmadan sarılıyor, koliler kapalı taşınıyor.' },
      { question: 'Konya merkezine taşınma tek günde biter mi?', answer: 'Biter. Yol düz olduğu için süre öngörülebilir.' },
      { question: 'Eşyalarım sigortalı mı?', answer: 'Bütün taşımalar sigortalı ve kapsam sözleşmede yazılı oluyor.' },
    ],
  },

  {
    ad: 'Sarayönü',
    derinlik: 'orta',
    ozet: 'Konya’nın kuzeybatı çıkışındaki Sarayönü, ana yol üzerinde olması sayesinde kolay ulaşılan bir ilçe.',
    metaAciklama:
      'Sarayönü evden eve nakliyat: ana yol üzerinden hızlı ulaşım, sigortalı ambalaj ve yazılı sabit fiyat.',
    govde: `<p>Sarayönü, Konya’nın kuzeybatı çıkışında ve ana yol üzerinde. Bu, ilçeye ulaşımı kolaylaştırıyor: araç ve ekip kısa sürede adrese varıyor, dolayısıyla Konya merkezine yapılan taşımalar öngörülebilir sürede tamamlanıyor.</p><p>İlçe merkezindeki yerleşim toplu, binalar düşük ve orta katlı; araç yanaşması sorun çıkarmıyor. Sarayönü’nde <strong>evden eve nakliyat</strong> işlerinde asansör sorunu nadiren gündeme geliyor, kırsal adreslerde ise bahçe ve depo eşyası hacmi artırıyor.</p>`,
    kunye: [
      { label: 'Ana yol üzerinde', value: 'Konya’nın kuzeybatı çıkışında; ulaşım kolay, süre öngörülebilir.' },
      { label: 'Yapı', value: 'Düşük ve orta katlı binalar; asansör sorunu nadir.' },
      { label: 'Kırsal hacim', value: 'Bahçe ve depo eşyası hacmi artırıyor.' },
    ],
    guzergahlar: [
      { to: 'Ilgın', note: 'Batıya geçiş; ana yol üzerinden düz güzergâh.' },
      { to: 'Cihanbeyli', note: 'Kuzeye geçiş; bozkır yolu.' },
      { to: 'Selçuklu', note: 'Konya merkezi; kısa mesafe, iş tek günde bitiyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Konya merkezine taşınma ne kadar sürer?', answer: 'Ana yol üzerinde olduğumuz için kısa; işlerin çoğu tek günde tamamlanıyor.' },
      { question: 'Bahçe eşyaları hacme dahil mi?', answer: 'Dahil. Toplam hacmi artırdığı için keşifte gösterilmesi gerekiyor.' },
      { question: 'Keşif ücretli mi?', answer: 'Keşif ücretsiz. Eşyayı yerinde gördükten sonra yazılı sabit fiyat veriyoruz.' },
    ],
  },
]

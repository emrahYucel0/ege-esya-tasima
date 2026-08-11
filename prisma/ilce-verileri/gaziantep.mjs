// prisma/ilce-verileri/gaziantep.mjs
//
// Gaziantep'in 9 ilçesinden 7'si. İkisi BİLEREK ATLANDI.
//
// ATLANANLAR: Yavuzeli, Karkamış
//   İkisi de küçük nüfuslu ve nakliyat aramasında karşılığı yok denecek
//   kadar az; yazacak doğrulanabilir bilgi de yok.
//
// DERİNLİK: 'tam' (3) / 'orta' (4)
//   Bu ilde 'tam' sayısını bilerek üçte tuttum. Gaziantep'in yedi ilçesi
//   birbirine yakın karakterde; uzun metinlerin sayısını artırmak tekrar
//   riskini büyütürdü.
//
// GAZİANTEP'E ÖZGÜ EKSENLER — hiçbiri başka ilde kullanılmadı
//   Şahinbey    → bakırcı ve gıda atölyeleri (kazan, mermer tezgâh, fırın)
//   Şehitkamil  → halı sanayii; uzun ruloların taşınması
//   Nizip       → fıstık ve zeytin; hasat dönemi depo hareketi
//
// 2023 DEPREMİ HAKKINDA
//   İslahiye ve Nurdağı depremden ağır etkilendi. Yapı stoğu ve yeniden
//   inşa süreci hakkında doğrulanabilir güncel bilgim olmadığı için bu
//   konuya HİÇ girmedim — eksik ya da yanlış bir tespit, hâlâ süren bir
//   sürecin içindeki insanlar için kabul edilebilir değil. Metinler
//   coğrafya ve erişim üzerinden yazıldı.
//
// Ortak kurallar: uydurma mahalle/rakam yok, "evden eve nakliyat" sayfa
// başına tam bir kez. (bkz. izmir.mjs başlığındaki ayrıntılı gerekçe)

export const il = { ad: 'Gaziantep', plaka: 27 }

export const ilceler = [
  // ───────────────────────── TAM DERİNLİK (3) ─────────────────────────
  {
    ad: 'Şahinbey',
    derinlik: 'tam',
    ozet:
      'Zanaat ve gıda atölyelerinin yoğunlaştığı Şahinbey’de bakır kazan ve mermer tezgâh taşımak, ev taşımaktan farklı bir iş.',
    metaAciklama:
      'Şahinbey evden eve nakliyat ve atölye taşıma: ağır tezgâh sabitlemesi, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Şahinbey’de taşıma taleplerinin önemli bir bölümü konut değil atölye. Bakırcılık ve gıda üretiminin yoğunlaştığı bu ilçede karşımıza çıkan parçalar standart mobilyaya benzemiyor: bakır kazan, mermer tezgâh, taş dibek ve fırın kapağı. Mermer tezgâh düz taşınmazsa kendi ağırlığıyla çatlıyor, bakır kazan darbe aldığında şeklini kaybediyor. Bu parçalar için ayrı kızak, kalın keçe ve dik sabitleme kullanıyoruz.</p><p>Konut tarafında ise eski Antep evleri devreye giriyor. Kalın taş duvarlar, dar taş merdivenler ve standart olmayan kapı ölçüleri var; büyük mobilyaların bir kısmı ölçü tutmadığı için sökülmeden geçmiyor. Şahinbey’de <strong>evden eve nakliyat</strong> işlerinde marangozu ekiple birlikte gönderiyoruz.</p><p>Çarşı çevresindeki sokaklar dar ve gündüz yükleme boşaltma trafiği yoğun. Ticari adreslerde işi mesai dışına alıyoruz; böylece hem araç yer buluyor hem esnaf günü kaybetmiyor.</p>`,
    kunye: [
      { label: 'Atölye taşıması', value: 'Bakır kazan, mermer tezgâh ve fırın parçaları; ayrı kızak ve keçe kullanılıyor.' },
      { label: 'Mermer', value: 'Düz taşınırsa kendi ağırlığıyla çatlıyor; dik sabitleniyor.' },
      { label: 'Eski Antep evi', value: 'Kalın taş duvar, dar taş merdiven, standart olmayan kapı ölçüsü.' },
      { label: 'Mobilya sökümü', value: 'Ölçü tutmadığı için büyük parçalar sökülerek geçiriliyor.' },
      { label: 'Çarşı trafiği', value: 'Ticari taşımalar mesai dışına alınıyor.' },
    ],
    guzergahlar: [
      { to: 'Şehitkamil', note: 'Kuzeye geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Oğuzeli', note: 'Güneye geçiş; düz güzergâh.' },
      { to: 'Nizip', note: 'Doğuya geçiş; yol süresi planlanıyor.' },
      { to: 'İslahiye', note: 'Batıya geçiş; uzun güzergâh, erken başlangıç gerekiyor.' },
    ],
    mahalleler: ['Karataş', 'Bey', 'Şehreküstü', 'Güneykent', 'Düztepe'],
    sorular: [
      {
        question: 'Mermer tezgâhımı taşıtabilir miyim?',
        answer:
          'Taşıtabilirsiniz. Mermer düz taşınırsa kendi ağırlığıyla çatlıyor; biz dik konumda, kalın keçeyle sarıp sabitleyerek taşıyoruz.',
      },
      {
        question: 'Bakır kazan ve dibek gibi parçalar için ne yapıyorsunuz?',
        answer:
          'Darbe almaması için tek tek keçeye sarılıp ayrı bölümde taşınıyor, üstlerine yük konmuyor.',
      },
      {
        question: 'Eski taş evimizin merdiveni dar, mobilyalar geçer mi?',
        answer:
          'Büyük parçalar sökülerek geçiriliyor. Marangozumuz ekiple birlikte geliyor ve yeni adreste yeniden kuruyor.',
      },
      {
        question: 'Dükkânımı taşıtırken kapatmam gerekir mi?',
        answer:
          'Gerekmez. Ticari taşımaları mesai dışına planlıyoruz; ertesi sabah dükkân çalışır durumda oluyor.',
      },
    ],
  },

  {
    ad: 'Şehitkamil',
    derinlik: 'tam',
    ozet:
      'Halı sanayisinin merkezi Şehitkamil’de uzun rulolar standart araca sığmıyor; taşıma buna göre planlanıyor.',
    metaAciklama:
      'Şehitkamil evden eve nakliyat ve halı/tekstil taşıma: uzun rulolara uygun araç, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Şehitkamil’de karşımıza çıkan en özel yük halı rulosu. Makine halısı üretiminin yoğunlaştığı ilçede rulolar hem uzun hem ağır ve katlanmıyor; standart bir nakliye aracının iç uzunluğuna sığmadıkları için araç seçimini baştan değiştiriyorlar. Rulolar yatay ve tek sıra hâlinde, birbirine bastırılmadan yükleniyor; üst üste konursa alttaki ezilip iz bırakıyor.</p><p>Konut tarafında ilçe şehrin en yeni ve en geniş yerleşim alanı. Bulvarlar geniş, blokların çoğunda yük asansörü ve otopark var. Şehitkamil’de <strong>evden eve nakliyat</strong> işlerinde bina kaynaklı zorluk az; asıl konu ilçenin genişliği, adresler arası mesafeyi keşifte hesaplıyoruz.</p><p>Ev taşımalarında da halı ayrı bir kalem. Büyük boy halılar katlanmadan rulo yapılıp ayrı taşınıyor; katlanan halıda kalan iz uzun süre çıkmıyor.</p>`,
    kunye: [
      { label: 'Halı rulosu', value: 'Uzun ve katlanmaz; standart aracın iç uzunluğuna sığmıyor, araç seçimi değişiyor.' },
      { label: 'İstifleme', value: 'Rulolar tek sıra yatay yükleniyor; üst üste konursa alttaki iz alıyor.' },
      { label: 'Yeni yerleşim', value: 'Geniş bulvar, yük asansörlü bloklar; bina kaynaklı zorluk az.' },
      { label: 'Ev halıları', value: 'Büyük boy halılar katlanmadan rulo yapılıp ayrı taşınıyor.' },
    ],
    guzergahlar: [
      { to: 'Şahinbey', note: 'Güneye geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Oğuzeli', note: 'Güneydoğu aksı; düz güzergâh.' },
      { to: 'Nizip', note: 'Doğuya geçiş; yol süresi planlanıyor.' },
      { to: 'Araban', note: 'Kuzeydoğu aksı; uzun güzergâh, erken başlangıç gerekiyor.' },
    ],
    mahalleler: ['İbrahimli', 'Mücahitler', 'Değirmiçem', 'Sarıgüllük', 'Gazikent'],
    sorular: [
      {
        question: 'Halı imalathanemi taşıtabilir miyim?',
        answer:
          'Taşıtabilirsiniz. Rulo boyuna uygun araç seçiyor, yüklemeyi tek sıra yatay yapıyoruz ki hiçbir rulo iz almasın.',
      },
      {
        question: 'Evimdeki büyük halıyı katlıyor musunuz?',
        answer:
          'Katlamıyoruz. Büyük boy halılar rulo yapılıp ayrı taşınıyor; katlanan halıda kalan iz uzun süre çıkmıyor.',
      },
      {
        question: 'Şehitkamil içinde taşınıyorum ama mesafe uzun, fiyat nasıl?',
        answer:
          'İlçe içi olsa da mesafe fiyata giriyor. Güzergâhı keşifte çıkarıp yol süresini yazılı fiyata yansıtıyoruz.',
      },
      {
        question: 'Site girişi için izin gerekiyor mu?',
        answer:
          'Bazı sitelerde gerekiyor; izni ve yükleme saatini biz yönetimle görüşerek ayarlıyoruz.',
      },
    ],
  },

  {
    ad: 'Nizip',
    derinlik: 'tam',
    ozet:
      'Fıstık ve zeytin bahçelerinin çevrelediği Nizip’te hasat dönemi, taşıma takvimini de etkiliyor.',
    metaAciklama:
      'Nizip evden eve nakliyat: hasat dönemine göre planlanan taşıma, depo ve ambar taşıması, yazılı sabit fiyat.',
    govde: `<p>Nizip’in çevresini fıstık ve zeytin bahçeleri sarıyor ve bu, taşıma takvimini görünür biçimde etkiliyor. Hasat döneminde hem yollar tarım araçlarıyla yoğunlaşıyor hem ailelerin uygun günü daralıyor; bu haftalarda taşıma planı bir-iki hafta önceden yapılmazsa uygun gün bulmak zorlaşıyor.</p><p>Kırsal adreslerde taşınacaklar listesi de farklı. Depo, ambar, hasat çuvalı ve işleme ekipmanı ev eşyasının yanında yer alıyor; bunlar standart mobilyadan farklı ambalaj ve sabitleme istiyor. Nizip’te <strong>evden eve nakliyat</strong> teklifi hazırlarken bu parçaları keşifte ayrıca not ediyoruz.</p><p>İlçe merkezindeki yerleşim toplu ve araç yanaşması sorunsuz. Kendi çarşısı ve ticareti olduğu için taşımaların önemli bir bölümü Gaziantep’e hiç gitmeden ilçe içinde tamamlanıyor.</p>`,
    kunye: [
      { label: 'Hasat dönemi', value: 'Yollar tarım araçlarıyla yoğunlaşıyor, uygun gün daralıyor.' },
      { label: 'Erken planlama', value: 'Hasat haftalarında taşıma bir-iki hafta önceden ayarlanıyor.' },
      { label: 'Kırsal parçalar', value: 'Depo, ambar ve işleme ekipmanı farklı ambalaj ve sabitleme istiyor.' },
      { label: 'İlçe içi', value: 'Kendi çarşısı var; işlerin bir bölümü Gaziantep’e gitmeden bitiyor.' },
    ],
    guzergahlar: [
      { to: 'Şehitkamil', note: 'Batıya geçiş; Gaziantep yönü, yol süresi planlanıyor.' },
      { to: 'Araban', note: 'Kuzeye geçiş; düzenli güzergâh.' },
      { to: 'Oğuzeli', note: 'Güneybatı aksı; iş tek günde tamamlanıyor.' },
      { to: 'Şahinbey', note: 'Gaziantep merkezi; süre öngörülebilir.' },
    ],
    mahalleler: ['Cumhuriyet', 'Zeugma', 'Fevkani', 'Turgutlu'],
    sorular: [
      {
        question: 'Hasat döneminde taşınabilir miyim?',
        answer:
          'Taşınabilirsiniz ama erken planlamak gerekiyor. O haftalarda hem yollar hem takvim yoğunlaşıyor.',
      },
      {
        question: 'Depo ve ambar eşyası taşınıyor mu?',
        answer:
          'Taşınıyor ve hacme dahil ediliyor; keşifte gösterilmesi fiyatın baştan doğru çıkması için önemli.',
      },
      {
        question: 'Nizip içinde taşınıyorum, fiyat ne olur?',
        answer:
          'Yol süresi kısa olduğu için en uygun kategoride; çoğu iş yarım günde bitiyor.',
      },
      {
        question: 'Keşif ücretli mi?',
        answer:
          'Keşif ücretsiz. Ekibimiz adrese gelip eşyayı yerinde görüyor, ardından yazılı sabit fiyat veriyor.',
      },
    ],
  },

  // ───────────────────────── ORTA DERİNLİK (4) ─────────────────────────
  {
    ad: 'İslahiye',
    derinlik: 'orta',
    ozet: 'Dağlarla çevrili bir ovada kurulu İslahiye’de taşımalar il merkezine uzun bir güzergâh üzerinden yapılıyor.',
    metaAciklama:
      'İslahiye evden eve nakliyat: uzun güzergâha göre planlanan taşıma, sigortalı ambalaj ve yazılı sabit fiyat.',
    govde: `<p>İslahiye, dağlarla çevrili bir ovada ve Gaziantep merkezine mesafesi uzun. Bu yüzden buradan yapılan taşımalarda güzergâhı önceden çıkarıp işi sabah erken başlatıyoruz; eşya çoksa ikinci araç devreye giriyor.</p><p>İlçe merkezindeki yerleşim toplu ve araç yanaşması genellikle sorunsuz. İslahiye’de <strong>evden eve nakliyat</strong> işlerinde asıl planlama konusu bina değil, mesafe oluyor.</p>`,
    kunye: [
      { label: 'Konum', value: 'Dağlarla çevrili ova; Gaziantep merkezine mesafe uzun.' },
      { label: 'Planlama', value: 'Güzergâh önceden çıkarılıyor, iş sabah erken başlatılıyor.' },
      { label: 'İlçe merkezi', value: 'Toplu yerleşim; araç yanaşması genellikle sorunsuz.' },
    ],
    guzergahlar: [
      { to: 'Nurdağı', note: 'Kuzeye geçiş; otoyol bağlantısı.' },
      { to: 'Şahinbey', note: 'Gaziantep yönü; erken başlangıç gerekiyor.' },
      { to: 'Şehitkamil', note: 'Gaziantep merkezi; yol süresi plana dahil ediliyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Gaziantep merkezine taşınma tek günde biter mi?', answer: 'Planlı yapıldığında biter; iş sabah erken başlatılıyor, eşya fazlaysa iki araçla çalışıyoruz.' },
      { question: 'Uzun yolda eşyalarım zarar görür mü?', answer: 'Sabitleme doğru yapıldığında görmez; mobilyalar kayış ve takozla araca bağlanıyor.' },
      { question: 'Fiyata yol masrafı dahil mi?', answer: 'Dahil. Keşiften sonra verilen yazılı fiyat yol ve yakıt dahil toplam tutardır.' },
    ],
  },

  {
    ad: 'Oğuzeli',
    derinlik: 'orta',
    ozet: 'Oğuzeli’nde binalar düşük katlı; asansör hiç gündeme gelmiyor, iş merdivenle ve hızlı ilerliyor.',
    metaAciklama:
      'Oğuzeli evden eve nakliyat: düşük katlı yapıya uygun hızlı taşıma, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Oğuzeli’nde yapı stoğu ağırlıklı olarak iki-üç katlı. Bunun taşımaya doğrudan bir etkisi var: asansör sorusu hiç gündeme gelmiyor, dış cephe asansörü kurma ihtiyacı doğmuyor ve mobilyaların büyük bölümü sökülmeden merdivenden geçiyor. Diğer ilçelerde işin en uzun süren kısmı olan bu aşama burada neredeyse yok.</p><p>Sonuç olarak Oğuzeli’nde <strong>evden eve nakliyat</strong> işleri, aynı hacimdeki bir merkez taşımasına göre belirgin şekilde hızlı bitiyor ve fiyat da bunu yansıtıyor.</p>`,
    kunye: [
      { label: 'İki-üç katlı yapı', value: 'Asansör sorusu gündeme gelmiyor; dış cephe asansörü gerekmiyor.' },
      { label: 'Söküm ihtiyacı', value: 'Mobilyaların büyük bölümü sökülmeden merdivenden geçiyor.' },
      { label: 'Hız', value: 'Aynı hacimdeki merkez taşımasına göre belirgin şekilde hızlı bitiyor.' },
    ],
    guzergahlar: [
      { to: 'Şahinbey', note: 'Kuzeye geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Şehitkamil', note: 'Kuzeye devam; düz güzergâh.' },
      { to: 'Nizip', note: 'Doğuya geçiş; yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Dış cephe asansörü gerekir mi?', answer: 'Neredeyse hiç gerekmiyor. Binalar iki-üç katlı olduğu için mobilyalar merdivenden geçiyor.' },
      { question: 'Mobilyalarım sökülecek mi?', answer: 'Büyük bölümü sökülmeden geçiyor. Ölçü tutmayan bir parça çıkarsa marangozumuz yerinde hallediyor.' },
      { question: 'Eşyalarım sigortalı mı?', answer: 'Bütün taşımalar sigortalı ve kapsam sözleşmede yazılı oluyor.' },
    ],
  },

  {
    ad: 'Nurdağı',
    derinlik: 'orta',
    ozet: 'Nurdağı taşımalarında araç dönüşte boş gidiyor; aynı güne ikinci bir iş denk gelirse fiyat aşağı iniyor.',
    metaAciklama:
      'Nurdağı evden eve nakliyat: dönüş yükü avantajıyla uygun fiyat, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Nurdağı’ndan yapılan taşımaların neredeyse tamamı Gaziantep yönüne gidiyor. Bunun az bilinen bir sonucu var: araç dönüşte boş geliyor. Aynı güne bu güzergâhta ikinci bir iş denk gelirse iki taşımayı birleştiriyor ve maliyeti ikiye bölüyoruz. Tarihiniz esnekse bunu size baştan söylüyoruz; uygun bir gün çıktığında fiyat belirgin şekilde aşağı iniyor.</p><p>İlçe otoyol üzerinde olduğu için ulaşım kolay ve süre net hesaplanabiliyor. Nurdağı’nda <strong>evden eve nakliyat</strong> işlerinde kırsal adreslerde yol genişliği plana giriyor; keşifte değerlendirip araç ölçüsünü ona göre seçiyoruz.</p>`,
    kunye: [
      { label: 'Dönüş yükü', value: 'Araç dönüşte boş geliyor; aynı güne ikinci iş denk gelirse maliyet bölünüyor.' },
      { label: 'Esnek tarih', value: 'Gün esnetilebiliyorsa uygun bir güzergâh çıktığında fiyat düşüyor.' },
      { label: 'Otoyol bağlantısı', value: 'Ulaşım kolay; yol süresi net hesaplanabiliyor.' },
    ],
    guzergahlar: [
      { to: 'İslahiye', note: 'Güneye geçiş; otoyol bağlantısı.' },
      { to: 'Şehitkamil', note: 'Doğuya geçiş; Gaziantep yönü.' },
      { to: 'Şahinbey', note: 'Gaziantep merkezi; yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Dönüş yükü indirimi nasıl işliyor?', answer: 'Aynı güne aynı güzergâhta ikinci bir iş denk gelirse iki taşımayı birleştirip maliyeti bölüyoruz. Böyle bir imkân çıkarsa size baştan söylüyoruz.' },
      { question: 'Tarihimi esnetirsem fiyat düşer mi?', answer: 'Düşebilir. Esnek olduğunuzu bilirsek uygun bir güzergâh çıktığında sizi arıyoruz.' },
      { question: 'Gaziantep merkezine taşınma tek günde biter mi?', answer: 'Biter. Otoyol bağlantısı sayesinde yol süresi net hesaplanabiliyor.' },
    ],
  },

  {
    ad: 'Araban',
    derinlik: 'orta',
    ozet: 'İl merkezine uzak ve köyleri dağınık olan Araban’da gün planı güzergâh üzerine kuruluyor.',
    metaAciklama:
      'Araban evden eve nakliyat: dağınık köy yerleşimine göre planlanan güzergâh, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Araban, Gaziantep’in kuzeydoğu ucunda ve köyleri geniş bir alana dağılmış durumda. Hangi adrese hangi sırayla gidileceği önceden belirlenmezse gün içinde ciddi zaman kaybı oluyor; bu yüzden keşifte yalnızca eşyayı değil yolu da değerlendiriyoruz.</p><p>Yapı ağırlıklı müstakil ve bahçeli; merdiven sorunu az. Araban’da <strong>evden eve nakliyat</strong> teklifi verirken bahçe ve depo eşyasını da hacme katıyoruz.</p>`,
    kunye: [
      { label: 'Dağınık köyler', value: 'Adresler geniş alana yayılmış; güzergâh önceden çıkarılıyor.' },
      { label: 'Yapı', value: 'Müstakil ve bahçeli; merdiven sorunu az.' },
      { label: 'Ek hacim', value: 'Bahçe ve depo eşyası taşınan hacmi artırıyor.' },
    ],
    guzergahlar: [
      { to: 'Nizip', note: 'Güneye geçiş; düzenli güzergâh.' },
      { to: 'Yavuzeli', note: 'Batıya geçiş; komşu ilçe.' },
      { to: 'Şehitkamil', note: 'Gaziantep yönü; erken başlangıç gerekiyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Köy adresine keşfe gelir misiniz?', answer: 'Geliriz ve keşif ücretsiz. Adresi bildirdiğinizde uygun bir gün belirliyoruz.' },
      { question: 'Bahçe ve depo eşyası hacme dahil mi?', answer: 'Dahil. Toplam hacmi artırdığı için keşifte gösterilmesi gerekiyor.' },
      { question: 'Taşıma iki güne yayılır mı?', answer: 'Planlı yapıldığında yayılmıyor; güzergâhı önceden çıkarıp işi erken başlatıyoruz.' },
    ],
  },
]

// prisma/ilce-verileri/antalya.mjs
//
// Antalya'nın 19 ilçesinden 16'sı. Üçü BİLEREK ATLANDI.
//
// ATLANANLAR: Akseki, Gündoğmuş, İbradı
//   Üçü de Toroslar'da, küçük nüfuslu ve nakliyat aramasında karşılığı yok
//   denecek kadar az. Yazacak doğrulanabilir bilgi de yok.
//
// DERİNLİK: 'tam' (8) / 'orta' (8)
// Kurallar ortak: uydurma mahalle/rakam yok, her metin farklı bir eksenden,
// "evden eve nakliyat" sayfa başına tam bir kez.
// (bkz. prisma/ilce-verileri/izmir.mjs başlığındaki ayrıntılı gerekçe)
//
// ANTALYA'YA ÖZGÜ EKSEN: SEZON
// Bu ilde sezon, diğer illerdeki "yaz biraz yoğun" durumundan farklı.
// Turizm ilçelerinde yaz aylarında hem trafik hem araç/ekip talebi
// katlanıyor. Ancak bunu 16 sayfanın hepsinde tekrarlamak kopya içerik
// üretirdi; sezon yalnızca gerçekten belirleyici olduğu ilçelerde
// (Alanya, Manavgat, Kemer, Kaş, Gazipaşa, Demre) ana eksen olarak
// kullanıldı. Kepez, Döşemealtı, Korkuteli, Elmalı gibi iç kesim
// ilçelerinde başka eksenler öne çıkarıldı.

export const il = { ad: 'Antalya', plaka: 7 }

export const ilceler = [
  // ───────────────────────── TAM DERİNLİK (8) ─────────────────────────
  {
    ad: 'Muratpaşa',
    derinlik: 'tam',
    ozet:
      'Antalya’nın merkez ilçesi Muratpaşa’da taşımanın en zor tarafı eşya değil, yükleme yeri bulmak.',
    metaAciklama:
      'Muratpaşa evden eve nakliyat: yükleme yeri planlanmış, sigortalı ve yazılı sabit fiyatlı taşıma. Ücretsiz keşif.',
    govde: `<p>Muratpaşa, Antalya’nın en yoğun konut ve ticaret alanı. Lara ve Konyaaltı yönüne uzanan cadde üstü adreslerde gün içi park neredeyse imkânsız; taşımanın hızını belirleyen şey aracın bina önüne çekilip çekilemediği oluyor. Yükleme yerini bir gün önceden apartman görevlisi ya da site yönetimiyle konuşup ayırtıyoruz.</p><p>Yapı stoğu ilçe içinde değişiyor. Yeni sitelerde yük asansörü ve kapalı otopark var; Kaleiçi ve çevresindeki eski dokuda ise sokaklar dar, bazı adreslere araç hiç giremiyor. Muratpaşa’da <strong>evden eve nakliyat</strong> teklifi verirken adresin hangi tarafta olduğunu bilmek şart.</p><p>Yaz aylarında merkez trafiği belirgin şekilde ağırlaşıyor. Bu dönemde işleri sabah erken başlatıyor, gün ortası yoğunluğundan önce yüklemeyi bitirmeyi hedefliyoruz.</p>`,
    kunye: [
      { label: 'Yükleme yeri', value: 'Cadde üstü adreslerde gün içi park imkânsıza yakın; yer önceden ayırtılıyor.' },
      { label: 'Eski doku', value: 'Kaleiçi çevresinde sokaklar dar; bazı adreslere araç giremiyor.' },
      { label: 'Yeni siteler', value: 'Yük asansörü ve kapalı otopark var; iş öngörülebilir ilerliyor.' },
      { label: 'Yaz trafiği', value: 'Sezonda merkez ağırlaşıyor; iş sabah erken başlatılıyor.' },
    ],
    guzergahlar: [
      { to: 'Konyaaltı', note: 'Batıya geçiş; sahil aksı, iş tek günde bitiyor.' },
      { to: 'Kepez', note: 'Kuzeye geçiş; varış tarafında dar sokak planlaması yapılıyor.' },
      { to: 'Aksu', note: 'Doğuya geçiş; düz güzergâh.' },
      { to: 'Döşemealtı', note: 'Kuzeybatı aksı; yol süresi plana dahil ediliyor.' },
    ],
    mahalleler: ['Lara', 'Kaleiçi', 'Fener', 'Meltem', 'Bahçelievler', 'Güzeloba', 'Şirinyalı'],
    sorular: [
      {
        question: 'Bina önünde park yeri yok, araç nereye yanaşacak?',
        answer:
          'Yükleme yerini bir gün önceden yönetimle konuşup ayırtıyoruz. Mümkün değilse yol izni alıyor ya da aktarma planlıyoruz.',
      },
      {
        question: 'Kaleiçi’nde sokağımıza araç giremiyor, çözüm var mı?',
        answer:
          'Var. Yükü girebildiğimiz en yakın noktaya kadar getirip kalan mesafeyi ekiple taşıyoruz; mesafe keşifte ölçülüp fiyata dahil ediliyor.',
      },
      {
        question: 'Yaz ortasında taşınmam gerekiyor, sorun olur mu?',
        answer:
          'Olmaz ama erken planlamak gerekiyor. Sezonda hem trafik hem talep yüksek; birkaç gün önceden haber vermeniz uygun gün seçmenizi sağlıyor.',
      },
      {
        question: 'Fiyat keşiften sonra değişir mi?',
        answer:
          'Değişmez. Keşif sonrası verilen yazılı fiyat taşıma gününe kadar geçerli kalıyor.',
      },
    ],
  },

  {
    ad: 'Kepez',
    derinlik: 'tam',
    ozet:
      'Geniş bir alana yayılan Kepez’te yapı dokusu mahalleden mahalleye değişiyor; teklif adrese göre çıkıyor.',
    metaAciklama:
      'Kepez evden eve nakliyat: adrese göre planlanan taşıma, sigortalı ambalaj ve yazılı sabit fiyat. Ücretsiz keşif.',
    govde: `<p>Kepez, Antalya’nın en geniş alana yayılan ilçelerinden ve tek bir karaktere sığmıyor. Bir yanda kentsel dönüşümle yükselen yeni bloklar var; buralarda yük asansörü, otopark ve geniş yol bulunuyor, iş hızlı ilerliyor. Öte yanda dönüşüme girmemiş kesimlerde sokaklar dar, binalar asansörsüz.</p><p>Aynı mahallede iki bina arasında bile koşullar değişebiliyor. Bu yüzden Kepez’de <strong>evden eve nakliyat</strong> için keşif yapmadan fiyat vermiyoruz; kat sayısıyla birlikte merdiven genişliğini ve aracın yanaşma mesafesini not ediyoruz.</p><p>İlçe içi mesafeler uzun olabiliyor. Kepez’in bir ucundan diğerine yapılan bir taşıma, komşu ilçeye yapılan bir işten daha fazla sürebiliyor; güzergâhı önceden çıkarıyoruz.</p>`,
    kunye: [
      { label: 'Yayılım', value: 'İlçe geniş; bir ucundan diğerine mesafe komşu ilçeden uzun olabiliyor.' },
      { label: 'Dönüşüm etkisi', value: 'Yeni bloklarda yük asansörü ve otopark var; dönüşmemiş kesimlerde yok.' },
      { label: 'Adres farkı', value: 'Aynı mahallede bina bazında koşullar değişiyor; keşif zorunlu.' },
      { label: 'Merkeze yakınlık', value: 'Muratpaşa yönündeki işler kısa sürüyor.' },
    ],
    guzergahlar: [
      { to: 'Muratpaşa', note: 'Güneye geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Döşemealtı', note: 'Kuzeye geçiş; düz güzergâh.' },
      { to: 'Konyaaltı', note: 'Güneybatı aksı; yol süresi planlanıyor.' },
      { to: 'Aksu', note: 'Doğuya geçiş; iş tek günde tamamlanıyor.' },
    ],
    mahalleler: ['Varsak', 'Santral', 'Habipler', 'Gündoğdu', 'Emek', 'Ahatlı'],
    sorular: [
      {
        question: 'Binamız asansörsüz, ne kadar ek süre gerekiyor?',
        answer:
          'Kat sayısına ve merdiven genişliğine bağlı. Süreyi keşifte hesaplayıp ekip sayısını ona göre planlıyoruz.',
      },
      {
        question: 'Kepez içinde taşınıyorum ama mesafe uzun, fiyat nasıl?',
        answer:
          'İlçe içi olsa da mesafe fiyata giriyor. Güzergâhı keşifte çıkarıp yol süresini yazılı fiyata yansıtıyoruz.',
      },
      {
        question: 'Dar sokakta yükleme nasıl yapılıyor?',
        answer:
          'Araç girebiliyorsa bina önüne çekiliyor; giremiyorsa yük cadde başında aktarılıyor ve kalan mesafe ekiple taşınıyor.',
      },
      {
        question: 'Keşif ücretli mi?',
        answer:
          'Keşif ücretsiz. Ekibimiz adrese gelip eşyayı ve binayı yerinde görüyor, ardından yazılı sabit fiyat veriyor.',
      },
    ],
  },

  {
    ad: 'Konyaaltı',
    derinlik: 'tam',
    ozet:
      'Deniz ile Beydağları arasına sıkışmış Konyaaltı’nda eğim ve rüzgâr, taşıma gününü doğrudan etkiliyor.',
    metaAciklama:
      'Konyaaltı evden eve nakliyat: eğimli sokaklara uygun araç planı, güvenli cephe asansörü, yazılı sabit fiyat.',
    govde: `<p>Konyaaltı, denizle Beydağları arasına sıkışmış dar bir şeride kurulu ve bu coğrafya taşımaya doğrudan yansıyor. Sahil bandından yamaca doğru çıkıldıkça sokaklar dikleşiyor; Hurma ve Uncalı yönündeki bazı adreslerde büyük araçla manevra alanı kalmıyor. Eğimli yükleme süreyi uzattığı için bu adreslerde ekip sayısını artırıyor, ağır parçalarda taşıma askısı kullanıyoruz.</p><p>Falezlerin üstündeki hatta ise rüzgâr hesaba giriyor. Dış cephe asansörü kurulacak işlerde günü rüzgâr durumuna göre seçiyoruz; bu, güvenlik açısından tartışmasız bir kural. Konyaaltı’nda <strong>evden eve nakliyat</strong> planlarken keşifte hem eğimi hem cepheyi değerlendiriyoruz.</p><p>Yaz aylarında sahil bandındaki park yoğunluğu artıyor. Bu dönemde yükleme yerini bir gün önceden ayırtıyor, işi sabah erken başlatıyoruz.</p>`,
    kunye: [
      { label: 'Dar şerit', value: 'Deniz ile Beydağları arasında; yamaca doğru sokaklar dikleşiyor.' },
      { label: 'Manevra', value: 'Hurma ve Uncalı yönünde bazı adreslerde büyük araç dönemiyor.' },
      { label: 'Rüzgâr', value: 'Falez hattında dış cephe asansörü kurulacak gün rüzgâra göre seçiliyor.' },
      { label: 'Yaz park yoğunluğu', value: 'Sezonda yükleme yeri bir gün önceden ayırtılıyor.' },
    ],
    guzergahlar: [
      { to: 'Muratpaşa', note: 'Doğuya geçiş; sahil aksı, iş tek günde bitiyor.' },
      { to: 'Kepez', note: 'Kuzeydoğu aksı; varış tarafında dar sokak planlaması yapılıyor.' },
      { to: 'Döşemealtı', note: 'Kuzeye geçiş; yol süresi planlanıyor.' },
      { to: 'Kemer', note: 'Batıya geçiş; sezonda gün planlaması erken yapılıyor.' },
    ],
    mahalleler: ['Liman', 'Hurma', 'Uncalı', 'Arapsuyu', 'Sarısu', 'Altınkum'],
    sorular: [
      {
        question: 'Dış cephe asansörü rüzgârlı günde kuruluyor mu?',
        answer:
          'Kurulmuyor. Falez hattında rüzgâr sert olabiliyor; güvenlik için o gün ya iç merdivenle çalışıyor ya da tarihi kaydırıyoruz.',
      },
      {
        question: 'Yamaçtaki sokağımıza araç çıkabilir mi?',
        answer:
          'Sokağı keşifte görüp uygun ölçüde araç seçiyoruz. Manevra alanı yoksa cadde başında aktarma planlıyoruz.',
      },
      {
        question: 'Eşyalarım bir süre depoda kalabilir mi?',
        answer:
          'Kalabilir. Tarihler arasında boşluk varsa eşyalarınızı depolayıp anlaştığımız günde yeni adrese teslim ediyoruz.',
      },
      {
        question: 'Taşıma sigortalı mı?',
        answer:
          'Bütün taşımalar sigortalı yapılıyor ve kapsam sözleşmede yazılı oluyor.',
      },
    ],
  },

  {
    ad: 'Alanya',
    derinlik: 'tam',
    ozet:
      'Antalya merkezine uzaklığı ve çok katlı rezidans dokusuyla Alanya’da plan, asansör saati üzerine kuruluyor.',
    metaAciklama:
      'Alanya evden eve nakliyat: uzun mesafe ve rezidans asansörüne göre planlanan taşıma, sigortalı, yazılı fiyat.',
    govde: `<p>Alanya’yı Antalya’nın diğer ilçelerinden ayıran ilk şey mesafe. Merkez ilçelere yapılan taşımalarda yol tek başına işin yarısını kaplayabiliyor; bu yüzden planlama şehirlerarası bir taşıma gibi kuruluyor, iş gün doğarken başlıyor ve eşya çoksa ikinci araç devreye giriyor.</p><p>İkinci ayırt edici unsur yapı: sahil hattında çok katlı rezidanslar yoğun. Buralarda yük asansörü bulunuyor ama kullanımı rezervasyona bağlı ve kat yüksekliği nedeniyle asansör süresi işin ritmini belirliyor. Alanya’da <strong>evden eve nakliyat</strong> planlarken asansör saatini önceden ayırtıyor, ekip sayısını o pencereye göre kuruyoruz.</p><p>İç kesimdeki daha eski apartmanlarda ise tablo değişiyor; asansör dar ya da yok. Aynı ilçede iki farklı çalışma düzeni kuruyoruz.</p>`,
    kunye: [
      { label: 'Mesafe', value: 'Antalya merkezine uzak; plan şehirlerarası taşımaya benziyor, iş gün doğarken başlıyor.' },
      { label: 'Rezidans hattı', value: 'Sahilde çok katlı yapı; asansör süresi işin ritmini belirliyor.' },
      { label: 'Asansör rezervasyonu', value: 'Yük asansörü saati önceden ayırtılıyor, ekip o pencereye göre kuruluyor.' },
      { label: 'İç kesim', value: 'Eski apartmanlarda asansör dar ya da yok; ayrı çalışma düzeni gerekiyor.' },
    ],
    guzergahlar: [
      { to: 'Manavgat', note: 'Batıya geçiş; sahil yolu, yol süresi planlanıyor.' },
      { to: 'Gazipaşa', note: 'Doğuya geçiş; düzenli güzergâh.' },
      { to: 'Muratpaşa', note: 'Antalya merkezi; erken başlangıç gerekiyor.' },
      { to: 'Serik', note: 'Batıya devam; iş tek günde tamamlanıyor.' },
    ],
    mahalleler: ['Mahmutlar', 'Oba', 'Kestel', 'Cikcilli', 'Tosmur', 'Avsallar'],
    sorular: [
      {
        question: 'Yüksek katlı rezidanstan taşınma ne kadar sürer?',
        answer:
          'Süreyi asansör belirliyor. Rezervasyon saatini önceden alıyor, ekip sayısını o pencereye sığacak şekilde planlıyoruz.',
      },
      {
        question: 'Antalya merkezine taşınma iki gün sürer mi?',
        answer:
          'Planlı yapıldığında sürmüyor. İşi gün doğarken başlatıyor, eşya fazlaysa iki araçla eşzamanlı çalışıyoruz.',
      },
      {
        question: 'Rezidansta yük asansörü kullanabilir miyiz?',
        answer:
          'Kullanabiliriz. İzni ve saati biz yönetimle görüşerek ayarlıyoruz; asansör beklemesi olmuyor.',
      },
      {
        question: 'Antalya merkezine taşınma tek günde biter mi?',
        answer:
          'Genellikle biter. Yol süresi nedeniyle iş sabah erken başlatılıyor; eşya fazlaysa iki araçla çalışıyoruz.',
      },
    ],
  },

  {
    ad: 'Manavgat',
    derinlik: 'tam',
    ozet:
      'Geniş bir alana yayılan turizm yerleşimiyle Manavgat’ta güzergâh planlaması taşımanın ilk adımı.',
    metaAciklama:
      'Manavgat evden eve nakliyat: dağınık yerleşime göre planlanan güzergâh, sigortalı taşıma, yazılı sabit fiyat.',
    govde: `<p>Manavgat geniş bir alana yayılıyor ve turizm yerleşimleri sahil boyunca dağılmış durumda. Bu, taşımada güzergâh planlamasını zorunlu kılıyor; hangi adrese hangi sırayla gidileceği önceden belirlenmezse gün içinde ciddi zaman kaybı oluyor. Keşifte yalnızca eşyayı değil yolu da değerlendiriyoruz.</p><p>Yapı tipi ilçe merkezinde apartman, sahil hattında ise site ve villa ağırlıklı. Villa adreslerinde bahçe eşyası ve depo malzemesi hacmi büyütüyor. Manavgat’ta <strong>evden eve nakliyat</strong> teklifi hazırlarken evin eklentilerini de görmemiz gerekiyor.</p><p>Yaz sezonunda hem trafik hem talep artıyor. Bu dönemde uygun gün bulmak için erken planlama gerekiyor; sezon dışında iş belirgin şekilde hızlı ilerliyor.</p>`,
    kunye: [
      { label: 'Yayılım', value: 'Turizm yerleşimleri sahil boyunca dağınık; güzergâh önceden çıkarılıyor.' },
      { label: 'Yapı tipi', value: 'Merkezde apartman, sahilde site ve villa ağırlıklı.' },
      { label: 'Ek hacim', value: 'Villa adreslerinde bahçe ve depo eşyası hacmi büyütüyor.' },
      { label: 'Sezon', value: 'Yazın trafik ve talep artıyor; erken planlama gerekiyor.' },
    ],
    guzergahlar: [
      { to: 'Serik', note: 'Batıya geçiş; sahil yolu, iş tek günde bitiyor.' },
      { to: 'Alanya', note: 'Doğuya geçiş; yol süresi planlanıyor.' },
      { to: 'Aksu', note: 'Antalya yönü; düzenli güzergâh.' },
      { to: 'Muratpaşa', note: 'Antalya merkezi; erken başlangıç gerekiyor.' },
    ],
    mahalleler: ['Side', 'Çolaklı', 'Evrenseki', 'Kızılağaç', 'Sorgun'],
    sorular: [
      {
        question: 'Villa taşımasında fiyat neye göre belirleniyor?',
        answer:
          'Oda sayısına değil toplam hacme. Bahçe eşyası ve depo dahil ediliyor; keşifte evin tamamını görmemiz gerekiyor.',
      },
      {
        question: 'Sahildeki adresime araç gelebiliyor mu?',
        answer:
          'Çoğu adreste geliyor. Yolu keşifte değerlendirip uygun ölçüde araç seçiyoruz; dar güzergâhlarda aktarma planlıyoruz.',
      },
      {
        question: 'Sezonda taşınmak daha mı zor?',
        answer:
          'Uygun gün bulmak zorlaşıyor ve trafik süreyi uzatıyor. Erken planlama bunu büyük ölçüde çözüyor.',
      },
      {
        question: 'Depolama hizmetiniz var mı?',
        answer:
          'Var. Tarihler arasında boşluk olduğunda eşyalarınızı depolayıp anlaştığımız günde teslim ediyoruz.',
      },
    ],
  },

  {
    ad: 'Serik',
    derinlik: 'tam',
    ozet:
      'Tarım alanları ile turizm tesislerinin bir arada olduğu Serik’te taşımalar iki farklı düzende ilerliyor.',
    metaAciklama:
      'Serik evden eve nakliyat: konut ve tesis taşımalarına uygun planlama, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Serik’te iki farklı yerleşim yan yana duruyor. Sahil hattında turizm tesisleri ve siteler, iç kesimde ise tarım alanları ve müstakil evler var. Bu ikisi farklı planlama istiyor: müstakil adreslerde bahçe ve depo eşyası hacmi büyütürken, sitelerde araç girişi izne bağlı olabiliyor.</p><p>İlçe merkezindeki yerleşim düzenli; sokaklar araç geçişine uygun ve yükleme sorunsuz ilerliyor. Serik’te <strong>evden eve nakliyat</strong> işlerinde erişim nadiren sorun oluyor; süreyi belirleyen şey daha çok hacim ve mesafe.</p><p>Antalya merkezine olan bağlantı düzenli bir yol üzerinden sağlanıyor. Aksu ve Manavgat yönündeki taşımalar da kısa sürüyor; işlerin büyük çoğunluğu tek günde tamamlanıyor.</p>`,
    kunye: [
      { label: 'İki yerleşim', value: 'Sahilde turizm tesisi ve siteler, iç kesimde tarım ve müstakil ev.' },
      { label: 'Ek hacim', value: 'Müstakil adreslerde bahçe ve depo eşyası hacmi büyütüyor.' },
      { label: 'Site izni', value: 'Kapalı sitelerde araç girişi önceden izne bağlı olabiliyor.' },
      { label: 'Bağlantı', value: 'Antalya merkezine düzenli yol; işler çoğunlukla tek günde bitiyor.' },
    ],
    guzergahlar: [
      { to: 'Aksu', note: 'Batıya geçiş; düz güzergâh, iş tek günde bitiyor.' },
      { to: 'Manavgat', note: 'Doğuya geçiş; sahil yolu.' },
      { to: 'Muratpaşa', note: 'Antalya merkezi; yol süresi plana dahil ediliyor.' },
      { to: 'Kepez', note: 'Antalya yönü; varış tarafında dar sokak planlaması yapılıyor.' },
    ],
    mahalleler: ['Belek', 'Kadriye', 'Boğazkent', 'Gebiz'],
    sorular: [
      {
        question: 'Müstakil evden taşınma nasıl fiyatlanıyor?',
        answer:
          'Toplam hacme göre. Bahçe ve depo eşyası dahil ediliyor, bu yüzden keşifte evin tamamının görülmesi gerekiyor.',
      },
      {
        question: 'Site girişi için izin gerekiyor mu?',
        answer:
          'Bazı sitelerde gerekiyor; izni ve yükleme saatini biz yönetimle görüşerek ayarlıyoruz.',
      },
      {
        question: 'Antalya merkezine taşınma tek günde biter mi?',
        answer:
          'Biter. Yol düzenli olduğu için süre öngörülebilir.',
      },
      {
        question: 'Ambalaj malzemesini siz mi sağlıyorsunuz?',
        answer:
          'Evet. Koli, balonlu naylon, streç ve mobilya battaniyesi ekiple birlikte geliyor.',
      },
    ],
  },

  {
    ad: 'Aksu',
    derinlik: 'tam',
    ozet:
      'Antalya merkezine komşu ve hızla büyüyen Aksu’da yeni site dokusu taşımayı öngörülebilir kılıyor.',
    metaAciklama:
      'Aksu evden eve nakliyat: yeni site dokusuna uygun hızlı taşıma, sigortalı ambalaj ve yazılı sabit fiyat.',
    govde: `<p>Aksu, Antalya merkezine komşu olması ve son yıllarda hızla büyümesiyle öne çıkıyor. Yeni yapılan sitelerde yollar geniş, araç bina önüne yanaşabiliyor ve bloklarda yük asansörü bulunuyor. Bu, yükleme süresini kısaltıyor ve teklifin öngörülebilir olmasını sağlıyor.</p><p>İlçenin kırsal kesiminde ise tarım alanları ve müstakil evler yaygın. Bu adreslerde bahçe ve depo eşyası hacme ekleniyor, yollar daralabiliyor. Aksu’da <strong>evden eve nakliyat</strong> teklifi verirken adresin hangi kesimde olduğunu bilmek gerekiyor.</p><p>Muratpaşa ve Kepez yönündeki taşımalar kısa sürüyor; işlerin büyük çoğunluğu tek günde, ilçe içi taşımalar ise yarım günde tamamlanıyor.</p>`,
    kunye: [
      { label: 'Yeni siteler', value: 'Geniş yol ve yük asansörlü bloklar; yükleme hızlı ilerliyor.' },
      { label: 'Kırsal kesim', value: 'Tarım alanlarında müstakil ev yaygın; bahçe eşyası hacme ekleniyor.' },
      { label: 'Merkeze yakınlık', value: 'Muratpaşa ve Kepez yönündeki taşımalar kısa sürüyor.' },
      { label: 'İlçe içi', value: 'Yakın adres değişiklikleri çoğunlukla yarım günde tamamlanıyor.' },
    ],
    guzergahlar: [
      { to: 'Muratpaşa', note: 'Batıya geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Serik', note: 'Doğuya geçiş; düz güzergâh.' },
      { to: 'Kepez', note: 'Kuzeybatı aksı; varış tarafında dar sokak planlaması yapılıyor.' },
      { to: 'Manavgat', note: 'Doğuya devam; yol süresi planlanıyor.' },
    ],
    mahalleler: ['Altıntaş', 'Çalkaya', 'Kundu', 'Yurtpınar'],
    sorular: [
      {
        question: 'Sitedeki dairemden taşınma ne kadar sürer?',
        answer:
          'Erişim rahat olduğu için süreyi hacim belirliyor. Orta ölçekli bir daire genellikle yarım gün ile bir gün arasında tamamlanıyor.',
      },
      {
        question: 'Kırsal adrese araç gelebiliyor mu?',
        answer:
          'Yol durumuna göre değişiyor; keşifte değerlendirip uygun ölçüde araç seçiyoruz.',
      },
      {
        question: 'Aksu içinde taşınıyorum, fiyat düşer mi?',
        answer:
          'Düşer. Yol süresi olmadığı için ilçe içi taşımalar daha uygun ve çoğu yarım günde bitiyor.',
      },
      {
        question: 'Beyaz eşya sökümü dahil mi?',
        answer:
          'Dahil. Çamaşır makinesi tamburu sabitleniyor ve yeni adreste bağlantıları kuruluyor.',
      },
    ],
  },

  {
    ad: 'Döşemealtı',
    derinlik: 'tam',
    ozet:
      'Müstakil ev ve bahçeli yerleşimin yaygın olduğu Döşemealtı’nda taşınan hacim ev içiyle sınırlı kalmıyor.',
    metaAciklama:
      'Döşemealtı evden eve nakliyat: müstakil ev taşımalarına uygun ekip planı, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Döşemealtı’nda taşınma hesabı müstakil yerleşim üzerine kurulu. Bahçeli evler, villa siteleri ve iki katlı yapılar yaygın; taşınacak eşya çoğu zaman ev içiyle sınırlı kalmıyor. Bahçe mobilyası, depo malzemesi ve varsa ikinci kat hacmi ciddi biçimde büyütüyor. Oda sayısına bakarak fiyat vermek burada yanıltıcı olur.</p><p>Buna karşılık erişim genellikle rahat. Yollar geniş, bahçeli evlerin çoğunda araç kapıya kadar yanaşabiliyor ve merdiven sorunu yaşanmıyor. Döşemealtı’nda <strong>evden eve nakliyat</strong> işlerinin süresini uzatan şey erişim değil, hacim; ekip ve araç sayısını buna göre planlıyoruz.</p><p>Antalya merkezine olan mesafe de plana giriyor. Kepez ve Muratpaşa yönündeki taşımalarda yol süresini hesaba katıyoruz.</p>`,
    kunye: [
      { label: 'Konut tipi', value: 'Müstakil ev ve villa yaygın; bahçe, depo ve ikinci kat hacme ekleniyor.' },
      { label: 'Erişim', value: 'Yollar geniş, araç çoğu adreste kapıya yanaşabiliyor.' },
      { label: 'Ekip sayısı', value: 'Süreyi hacim belirliyor; büyük evlerde kalabalık ekiple çalışılıyor.' },
      { label: 'Merkeze mesafe', value: 'Kepez ve Muratpaşa yönünde yol süresi plana ekleniyor.' },
    ],
    guzergahlar: [
      { to: 'Kepez', note: 'Güneye geçiş; düz güzergâh, iş tek günde bitiyor.' },
      { to: 'Muratpaşa', note: 'Antalya merkezi; varışta park yeri önceden ayırtılıyor.' },
      { to: 'Korkuteli', note: 'Kuzeybatı aksı; yol süresi planlanıyor.' },
      { to: 'Konyaaltı', note: 'Güneybatı aksı; iş tek günde tamamlanıyor.' },
    ],
    mahalleler: ['Yeniköy', 'Bahçeyaka', 'Çığlık', 'Kovanlık'],
    sorular: [
      {
        question: 'Villa taşımasında fiyat neye göre belirleniyor?',
        answer:
          'Oda sayısına değil toplam hacme. Bahçe, depo ve varsa ikinci kat dahil ediliyor; keşifte evin tamamını görmemiz gerekiyor.',
      },
      {
        question: 'Bahçe mobilyalarını da taşıyor musunuz?',
        answer:
          'Taşıyoruz. Bahçe takımı, barbekü ve benzeri parçalar ayrıca ambalajlanıp hacme dahil ediliyor.',
      },
      {
        question: 'Kaç kişilik ekip geliyor?',
        answer:
          'Ekip sayısını hacim belirliyor. Büyük evlerde daha kalabalık ekiple çalışıyoruz ki iş aynı güne sığsın.',
      },
      {
        question: 'Eşyalarımın bir kısmını depolayabilir misiniz?',
        answer:
          'Depolayabiliriz. Taşınacak ve depolanacak eşyayı keşifte birlikte ayırıyoruz.',
      },
    ],
  },

  // ───────────────────────── ORTA DERİNLİK (8) ─────────────────────────
  {
    ad: 'Kemer',
    derinlik: 'orta',
    ozet: 'Dağ ile deniz arasına sıkışmış Kemer’de hem dar sokaklar hem sezon taşıma planını etkiliyor.',
    metaAciklama:
      'Kemer evden eve nakliyat: dar sokak ve sezon yoğunluğuna göre planlanan taşıma, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Kemer dağ ile deniz arasında dar bir şeride kurulu. Yerleşimin bir bölümünde sokaklar dar ve büyük araçla manevra yapmak mümkün olmuyor; orta ölçekli araç kullanıyor ya da yükü sokak girişinde aktarıyoruz.</p><p>Yaz aylarında hem trafik hem araç talebi belirgin şekilde artıyor. Kemer’de <strong>evden eve nakliyat</strong> tarihini sezon dışına alabiliyorsanız hem süre hem maliyet düşüyor.</p>`,
    kunye: [
      { label: 'Dar şerit', value: 'Dağ ile deniz arası dar yerleşim; bazı sokaklarda manevra alanı yok.' },
      { label: 'Sezon', value: 'Yaz aylarında trafik ve talep artıyor; sezon dışı daha uygun.' },
      { label: 'İkinci konut', value: 'Mevsimlik kullanım yaygın; depolama talep edilebiliyor.' },
    ],
    guzergahlar: [
      { to: 'Konyaaltı', note: 'Kuzeye geçiş; sahil yolu, iş tek günde bitiyor.' },
      { to: 'Muratpaşa', note: 'Antalya merkezi; yol süresi planlanıyor.' },
      { to: 'Kumluca', note: 'Batıya geçiş; düzenli güzergâh.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Sokağımıza büyük araç giremiyor, çözüm var mı?',
        answer: 'Var. Orta ölçekli araç kullanıyor ya da yükü sokak girişinde aktarıyoruz; mesafe keşifte ölçülüyor.',
      },
      {
        question: 'Sezonda taşınabilir miyim?',
        answer: 'Taşınabilirsiniz ama erken planlamak gerekiyor; yazın uygun gün hızlı doluyor.',
      },
      {
        question: 'Antalya merkezine taşınma ne kadar sürer?',
        answer: 'Yol süresi plana ekleniyor; işlerin çoğu tek günde tamamlanıyor.',
      },
    ],
  },

  {
    ad: 'Kaş',
    derinlik: 'orta',
    ozet: 'Virajlı sahil yolu ve dağınık yerleşimiyle Kaş’ta güzergâh planlaması taşımanın ilk adımı.',
    metaAciklama:
      'Kaş evden eve nakliyat: virajlı sahil yoluna ve dağınık yerleşime göre planlanan taşıma, sigortalı ambalaj.',
    govde: `<p>Kaş’a ulaşım virajlı sahil yolu üzerinden sağlanıyor ve yerleşim geniş bir alana dağılmış durumda. Bu iki unsur yol süresini uzatıyor; güzergâhı önceden çıkarıp işi erken başlatıyoruz.</p><p>Merkez ve çevresindeki bazı sokaklar dar; büyük araçla girmek mümkün olmuyor. Kaş’ta <strong>evden eve nakliyat</strong> planlarken adrese göre araç ölçüsü seçiyor, gerekirse aktarma yapıyoruz.</p>`,
    kunye: [
      { label: 'Yol yapısı', value: 'Virajlı sahil yolu; yol süresi düz mesafeye göre daha uzun.' },
      { label: 'Dağınık yerleşim', value: 'Adresler geniş alana yayılmış; güzergâh önceden çıkarılıyor.' },
      { label: 'Dar sokaklar', value: 'Merkez çevresinde büyük araç giremiyor; aktarma planlanıyor.' },
    ],
    guzergahlar: [
      { to: 'Demre', note: 'Doğuya geçiş; sahil yolu, yol süresi planlanıyor.' },
      { to: 'Finike', note: 'Doğuya devam; düzenli güzergâh.' },
      { to: 'Muratpaşa', note: 'Antalya merkezi; erken başlangıç gerekiyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Antalya merkezine taşınma kaç gün sürer?',
        answer: 'Genellikle tek gün, ancak iş çok erken başlıyor. Eşya fazlaysa ikinci araç devreye alınıyor.',
      },
      {
        question: 'Virajlı yolda eşyalarım zarar görür mü?',
        answer: 'Sabitleme bunun için yapılıyor. Mobilyalar battaniyeyle sarılıp kayış ve takozla araca bağlanıyor.',
      },
      {
        question: 'Dar sokağa araç gelebiliyor mu?',
        answer: 'Her adreste gelemiyor; keşifte yolu değerlendirip uygun ölçüde araç seçiyoruz.',
      },
    ],
  },

  {
    ad: 'Kumluca',
    derinlik: 'orta',
    ozet: 'Sera tarımının yoğun olduğu Kumluca’da konut taşımalarının yanında işyeri taşımaları da yaygın.',
    metaAciklama:
      'Kumluca evden eve nakliyat ve işyeri taşıma: sigortalı, planlı ve yazılı sabit fiyatlı hizmet. Ücretsiz keşif.',
    govde: `<p>Kumluca’da sera tarımının ağırlığı, depo ve işyeri taşımalarını konut işleri kadar yaygın kılıyor. Bu adreslerde raf, depo malzemesi ve ağır ekipman taşıma devreye giriyor; konut işinden ayrı planlanıyor.</p><p>İlçe merkezindeki yerleşim düzenli, araç yanaşması sorunsuz. Kumluca’da <strong>evden eve nakliyat</strong> işlerinde asıl değişken Antalya merkezine olan mesafe; iş erken başlatılarak tek güne sığdırılıyor.</p>`,
    kunye: [
      { label: 'Tarımsal ticaret', value: 'Sera tarımı nedeniyle depo ve işyeri taşıması yaygın.' },
      { label: 'İlçe merkezi', value: 'Düzenli yerleşim, sorunsuz araç yanaşması.' },
      { label: 'Merkeze mesafe', value: 'Antalya merkezine yol süresi plana ekleniyor.' },
    ],
    guzergahlar: [
      { to: 'Finike', note: 'Doğuya geçiş; sahil yolu.' },
      { to: 'Kemer', note: 'Kuzeydoğu aksı; düzenli güzergâh.' },
      { to: 'Konyaaltı', note: 'Antalya yönü; yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Depomu taşıtabilir miyim?',
        answer: 'Taşıtabilirsiniz. Raf ve ağır ekipman için özel sabitleme kullanıyor, keşfi ticari adrese özel yapıyoruz.',
      },
      {
        question: 'Antalya merkezine taşınma tek günde biter mi?',
        answer: 'Genellikle biter; yol süresi nedeniyle iş sabah erken başlatılıyor.',
      },
      {
        question: 'Fiyata yol masrafı dahil mi?',
        answer: 'Dahil. Keşiften sonra verilen yazılı fiyat yol ve yakıt dahil toplam tutardır.',
      },
    ],
  },

  {
    ad: 'Finike',
    derinlik: 'orta',
    ozet: 'Sahil hattındaki Finike’de taşımalar hem ilçe içinde hem Antalya yönünde düzenli güzergâhta ilerliyor.',
    metaAciklama:
      'Finike evden eve nakliyat: düzenli güzergâh, sigortalı ambalaj ve yazılı sabit fiyat. Ücretsiz keşif için arayın.',
    govde: `<p>Finike sahil hattında yer alıyor ve Antalya yönündeki bağlantı düzenli bir yol üzerinden sağlanıyor. Yol süresi plana ekleniyor; iş sabah erken başlatıldığında tek güne sığıyor.</p><p>İlçe merkezinde yerleşim toplu, binalar ağırlıklı orta katlı ve araç yanaşması sorun çıkarmıyor. Finike’de <strong>evden eve nakliyat</strong> işlerinde bina kaynaklı zorluk nadiren gündeme geliyor; kırsal adreslerde ise yol genişliği plana giriyor.</p>`,
    kunye: [
      { label: 'Bağlantı', value: 'Antalya yönünde düzenli sahil yolu; süre öngörülebilir.' },
      { label: 'İlçe merkezi', value: 'Toplu yerleşim, orta katlı binalar, sorunsuz araç yanaşması.' },
      { label: 'Kırsal adres', value: 'Mahalle yollarının genişliği araç seçimini belirliyor.' },
    ],
    guzergahlar: [
      { to: 'Kumluca', note: 'Doğuya geçiş; sahil yolu.' },
      { to: 'Demre', note: 'Batıya geçiş; düzenli güzergâh.' },
      { to: 'Konyaaltı', note: 'Antalya yönü; yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Antalya merkezine taşınma tek günde biter mi?',
        answer: 'Biter. Yol düzenli olduğu için süre öngörülebilir; iş sabah erken başlatılıyor.',
      },
      {
        question: 'Kırsal adrese araç gelebiliyor mu?',
        answer: 'Yol durumuna göre değişiyor; keşifte değerlendirip uygun ölçüde araç seçiyoruz.',
      },
      {
        question: 'Eşyalarım sigortalı mı?',
        answer: 'Bütün taşımalar sigortalı ve kapsam sözleşmede yazılı oluyor.',
      },
    ],
  },

  {
    ad: 'Gazipaşa',
    derinlik: 'orta',
    ozet: 'Antalya’nın doğu ucundaki Gazipaşa’da taşıma planı uzun güzergâh üzerine kuruluyor.',
    metaAciklama:
      'Gazipaşa evden eve nakliyat: uzun mesafeye göre planlanmış taşıma, sigortalı ambalaj ve yazılı sabit fiyat.',
    govde: `<p>Gazipaşa, Antalya’nın doğu ucunda yer alıyor; merkeze mesafe taşımanın belirleyici unsuru. Yol süresi hesaba katılmadan verilen bir tarih tutmuyor, bu yüzden işi gün doğarken başlatıyoruz.</p><p>Yerleşim ilçe merkezinde toplu, sahil hattında ise ikinci konut kullanımı yaygın. Gazipaşa’da <strong>evden eve nakliyat</strong> işlerinde eşyanın bir bölümünün depolanması sık talep ediliyor.</p>`,
    kunye: [
      { label: 'Konum', value: 'Antalya’nın doğu ucu; merkeze mesafe planın belirleyici unsuru.' },
      { label: 'İlçe merkezi', value: 'Toplu yerleşim; araç yanaşması sorunsuz.' },
      { label: 'İkinci konut', value: 'Sahil hattında mevsimlik kullanım; depolama sık talep ediliyor.' },
    ],
    guzergahlar: [
      { to: 'Alanya', note: 'Batıya geçiş; sahil yolu, yol süresi planlanıyor.' },
      { to: 'Manavgat', note: 'Batıya devam; düzenli güzergâh.' },
      { to: 'Muratpaşa', note: 'Antalya merkezi; erken başlangıç gerekiyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Antalya merkezine taşınma tek günde biter mi?',
        answer: 'Planlı yapıldığında biter. İşi gün doğarken başlatıyor, eşya fazlaysa iki araçla çalışıyoruz.',
      },
      {
        question: 'Eşyalarımın bir kısmını depolayabilir misiniz?',
        answer: 'Depolayabiliriz. Taşınacak ve depolanacak eşyayı keşifte birlikte ayırıyoruz.',
      },
      {
        question: 'Şehirlerarası taşıma yapıyor musunuz?',
        answer: 'Yapıyoruz. Gazipaşa’dan Türkiye’nin her iline taşıma düzenliyoruz.',
      },
    ],
  },

  {
    ad: 'Korkuteli',
    derinlik: 'orta',
    ozet: 'Yayla kesiminde yer alan Korkuteli’de rakım ve kış koşulları taşıma gününü etkiliyor.',
    metaAciklama:
      'Korkuteli evden eve nakliyat: kış koşullarına göre planlanan taşıma, sigortalı ambalaj ve yazılı sabit fiyat.',
    govde: `<p>Korkuteli, Antalya’nın sahil ilçelerinden farklı olarak yayla kesiminde yer alıyor. Kış aylarında kar ve buzlanma yol süresini uzatabiliyor; bu dönemde gün seçimini hava durumuna göre yapıyor, gerekirse tarihi birlikte kaydırıyoruz.</p><p>Yerleşim ilçe merkezinde toplu, kırsal mahallelerde ise müstakil evler yaygın; bahçe ve depo eşyası hacmi artırıyor. Korkuteli’de <strong>evden eve nakliyat</strong> teklifi verirken evin eklentilerini de hesaba katıyoruz.</p>`,
    kunye: [
      { label: 'Yayla konumu', value: 'Sahil ilçelerinden farklı iklim; kışın kar ve buzlanma görülüyor.' },
      { label: 'Gün seçimi', value: 'Kış aylarında tarih hava durumuna göre belirleniyor.' },
      { label: 'Kırsal hacim', value: 'Müstakil evlerde bahçe ve depo eşyası hacmi artırıyor.' },
    ],
    guzergahlar: [
      { to: 'Döşemealtı', note: 'Güneydoğu aksı; Antalya yönü, yol süresi planlanıyor.' },
      { to: 'Elmalı', note: 'Batıya geçiş; düzenli güzergâh.' },
      { to: 'Kepez', note: 'Antalya merkezi; iş tek günde tamamlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Kışın taşınmak zorundayım, risk var mı?',
        answer: 'Planlı yapıldığında yok. Yolu ve havayı önceden değerlendiriyor, hava sertse günü birlikte değiştiriyoruz.',
      },
      {
        question: 'Bahçe eşyaları hacme dahil mi?',
        answer: 'Dahil. Toplam hacmi artırdığı için keşifte gösterilmesi gerekiyor.',
      },
      {
        question: 'Antalya merkezine taşınma ne kadar sürer?',
        answer: 'Yol süresi plana ekleniyor; işlerin çoğu tek günde tamamlanıyor.',
      },
    ],
  },

  {
    ad: 'Elmalı',
    derinlik: 'orta',
    ozet: 'Ova üzerindeki Elmalı’da güzergâh düz; planı belirleyen şey Antalya merkezine mesafe.',
    metaAciklama:
      'Elmalı evden eve nakliyat: düz güzergâh ve mesafeye göre planlanan taşıma, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Elmalı ova üzerinde yer alıyor; yol düz ve ağır araç için engel yok, süre öngörülebilir. Buna karşılık Antalya merkezine mesafe hesaba giriyor ve iş sabah erken başlatılıyor.</p><p>İlçe merkezindeki yerleşim düzenli, binalar ağırlıklı düşük katlı. Elmalı’da <strong>evden eve nakliyat</strong> işlerinde asansör sorunu nadiren gündeme geliyor; kırsal adreslerde ise bahçe ve depo eşyası hacmi artırıyor.</p>`,
    kunye: [
      { label: 'Güzergâh', value: 'Ova üzerinden düz yol; süre öngörülebilir.' },
      { label: 'Yapı', value: 'Binalar ağırlıklı düşük katlı; asansör sorunu nadir.' },
      { label: 'Kırsal hacim', value: 'Bahçe ve depo eşyası hacmi artırıyor.' },
    ],
    guzergahlar: [
      { to: 'Korkuteli', note: 'Doğuya geçiş; düzenli güzergâh.' },
      { to: 'Finike', note: 'Güneye geçiş; yol süresi planlanıyor.' },
      { to: 'Kepez', note: 'Antalya yönü; erken başlangıç gerekiyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Antalya merkezine taşınma tek günde biter mi?',
        answer: 'Biter. Yol düz olduğu için süre öngörülebilir; iş sabah erken başlatılıyor.',
      },
      {
        question: 'Kırsal adrese araç gelebiliyor mu?',
        answer: 'Yol durumuna göre değişiyor; keşifte değerlendirip uygun ölçüde araç seçiyoruz.',
      },
      {
        question: 'Keşif ücretli mi?',
        answer: 'Keşif ücretsiz. Eşyayı yerinde gördükten sonra yazılı sabit fiyat veriyoruz.',
      },
    ],
  },

  {
    ad: 'Demre',
    derinlik: 'orta',
    ozet: 'Sera alanları ve sahil yerleşiminin bir arada olduğu Demre’de taşımalar iki düzende ilerliyor.',
    metaAciklama:
      'Demre evden eve nakliyat: konut ve depo taşımalarına uygun planlama, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Demre’de sera tarımı yaygın; depo ve işyeri taşımaları konut işlerinin yanında düzenli olarak talep ediliyor. Bu adreslerde raf ve ağır ekipman için ayrı planlama yapıyoruz.</p><p>Konut tarafında yerleşim toplu ve araç yanaşması sorun çıkarmıyor. Demre’de <strong>evden eve nakliyat</strong> işlerinde asıl değişken Antalya merkezine olan mesafe; iş erken başlatılarak tek güne sığdırılıyor.</p>`,
    kunye: [
      { label: 'Tarımsal ticaret', value: 'Sera alanları nedeniyle depo ve işyeri taşıması düzenli talep ediliyor.' },
      { label: 'Konut erişimi', value: 'Yerleşim toplu; araç yanaşması sorunsuz.' },
      { label: 'Merkeze mesafe', value: 'Antalya merkezine yol süresi plana ekleniyor.' },
    ],
    guzergahlar: [
      { to: 'Finike', note: 'Doğuya geçiş; sahil yolu.' },
      { to: 'Kaş', note: 'Batıya geçiş; virajlı yol, süre planlanıyor.' },
      { to: 'Kumluca', note: 'Doğuya devam; düzenli güzergâh.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Depomu taşıtabilir miyim?',
        answer: 'Taşıtabilirsiniz. Raf ve ağır ekipman için özel sabitleme kullanıyoruz.',
      },
      {
        question: 'Antalya merkezine taşınma tek günde biter mi?',
        answer: 'Genellikle biter; yol süresi nedeniyle iş sabah erken başlatılıyor.',
      },
      {
        question: 'Ambalaj malzemesini siz mi sağlıyorsunuz?',
        answer: 'Evet. Koli, balonlu naylon, streç ve mobilya battaniyesi ekiple birlikte geliyor.',
      },
    ],
  },
]

// prisma/ilce-verileri/kocaeli.mjs
//
// Kocaeli'nin 12 ilçesinin TAMAMI. Atlanan yok.
//
// NEDEN ATLAMA YOK
// Diğer illerde küçük ve aramada karşılığı olmayan ilçeleri atladık. Kocaeli
// yoğun ve kentleşmiş bir il; en kırsal ilçesi olan Kandıra bile geniş bir
// yerleşim alanına ve düzenli taşıma talebine sahip. Atlanacak kadar küçük
// bir ilçe yok.
//
// ─────────────────────────────────────────────────────────────────────────
// BU DOSYADAKİ ASIL RİSK: HEPSİ SANAYİ İLÇESİ
//
// Kocaeli baştan sona sanayi. Sekiz ilçeyi birden "organize sanayi + konut"
// ekseninden yazmak kolay olurdu — ve tam olarak bir önceki turda yaptığım
// hata bu oldu: Kestel (Bursa) ile Kemalpaşa (İzmir) metinleri %54 örtüştü,
// ölçüm yakaladı ve ikisini de yeniden yazmak gerekti.
//
// Bu yüzden burada sanayi YALNIZCA üç ilçede ve üçünde de FARKLI bir yönüyle
// ele alındı:
//     Körfez   → vardiya düzeni (taşıma saati)
//     Dilovası → vadi topoğrafyası ve ağır araç trafiği
//     Çayırova → lojistik depo taşımaları
// Kalan dokuz ilçe sanayiden hiç bahsetmeyen eksenlerle yazıldı.
//
// DERİNLİK: 'tam' (8) / 'orta' (4)
// Ortak kurallar: uydurma mahalle/rakam yok, "evden eve nakliyat" sayfa
// başına tam bir kez. (bkz. izmir.mjs başlığındaki ayrıntılı gerekçe)

export const il = { ad: 'Kocaeli', plaka: 41 }

export const ilceler = [
  // ───────────────────────── TAM DERİNLİK (8) ─────────────────────────
  {
    ad: 'İzmit',
    derinlik: 'tam',
    ozet:
      'Körfezden yamaca doğru yükselen İzmit’te taşıma planı, adresin sahilde mi yukarıda mı olduğuna göre değişiyor.',
    metaAciklama:
      'İzmit evden eve nakliyat: eğimli sokaklara uygun araç planı, sigortalı taşıma ve yazılı sabit fiyat. Ücretsiz keşif.',
    govde: `<p>İzmit dar bir kıyı şeridinden başlayıp yamaca doğru yükseliyor ve bu topoğrafya taşımanın planını doğrudan belirliyor. Sahile yakın hatta yollar geniş, araç bina önüne yanaşabiliyor. Yukarı doğru çıkıldıkça sokaklar daralıyor ve dikleşiyor; bazı adreslerde büyük araçla manevra alanı kalmıyor, yükü cadde başında küçük araca aktarıyoruz.</p><p>Yapı stoğu da bu hat boyunca değişiyor. Yahyakaptan ve Umuttepe çevresindeki yeni bloklarda yük asansörü ve otopark bulunurken, Cedit ve Kozluk gibi eski mahallelerde asansör dar ya da hiç yok. İzmit’te <strong>evden eve nakliyat</strong> teklifi verirken kat sayısı kadar merdiven genişliğini de not ediyoruz.</p><p>İl merkezi olması nedeniyle ilçe içi taşıma oranı yüksek. Aynı ilçede yakın bir adrese geçen aileler için iş çoğunlukla yarım günde tamamlanıyor.</p>`,
    kunye: [
      { label: 'Topoğrafya', value: 'Kıyıdan yamaca doğru yükseliyor; yukarıda sokaklar daralıp dikleşiyor.' },
      { label: 'Manevra', value: 'Üst mahallelerde büyük araç dönemiyor; cadde başında aktarma yapılıyor.' },
      { label: 'Yapı farkı', value: 'Yeni bloklarda yük asansörü var, eski mahallelerde asansör dar ya da yok.' },
      { label: 'İlçe içi taşıma', value: 'İl merkezi olduğu için yakın adres değişiklikleri yaygın; çoğu yarım günde bitiyor.' },
      { label: 'Merdiven ölçüsü', value: 'Kat sayısı kadar merdiven genişliği de teklife giriyor.' },
    ],
    guzergahlar: [
      { to: 'Derince', note: 'Batıya geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Başiskele', note: 'Körfezin güney kıyısı; varışta müstakil adreslerde ek hacim hesaplanıyor.' },
      { to: 'Kartepe', note: 'Doğuya geçiş; kışın gün seçimi hava durumuna göre yapılıyor.' },
      { to: 'Gölcük', note: 'Güneybatı aksı; düzenli sahil yolu.' },
    ],
    mahalleler: ['Yahyakaptan', 'Umuttepe', 'Alikahya', 'Cedit', 'Kozluk', 'Yenidoğan'],
    sorular: [
      {
        question: 'Sokağımız dik ve dar, kamyon çıkabilir mi?',
        answer:
          'Çoğu dik sokakta büyük araç çıkamıyor. Keşifte sokağı görüp cadde başında aktarma planı yapıyoruz; bu teklifte önceden yazılı oluyor.',
      },
      {
        question: 'Eski binamızda asansör yok, ek ücret çıkar mı?',
        answer:
          'Ek ekip ya da dış cephe asansörü gerekiyorsa keşifte belirlenip fiyata baştan dahil ediliyor. Taşıma günü sürpriz çıkmıyor.',
      },
      {
        question: 'İzmit içinde taşınıyorum, fiyat düşer mi?',
        answer:
          'Düşer. Yol süresi olmadığı için ilçe içi taşımalar belirgin şekilde daha uygun ve çoğu yarım günde bitiyor.',
      },
      {
        question: 'Verilen fiyat sonradan değişir mi?',
        answer:
          'Değişmiyor. Keşif sonrası verilen yazılı fiyat taşıma gününe kadar geçerli kalıyor.',
      },
    ],
  },

  {
    ad: 'Gebze',
    derinlik: 'tam',
    ozet:
      'Taşımaların büyük bölümü İstanbul yönüne yapıldığı için Gebze’de planın merkezinde varış tarafındaki koşullar var.',
    metaAciklama:
      'Gebze evden eve nakliyat: İstanbul yönü dahil planlı taşıma, sigortalı ambalaj ve yazılı sabit fiyat. Ücretsiz keşif.',
    govde: `<p>Gebze’yi diğer Kocaeli ilçelerinden ayıran şey, taşımaların önemli bir bölümünün il dışına — İstanbul yönüne — yapılması. Bu, planın ağırlık merkezini kaydırıyor: iş yalnızca buradaki yükleme koşullarına göre değil, varış adresindeki park durumuna ve site kurallarına göre de kuruluyor. İstanbul tarafındaki yükleme yerini de biz önceden ayarlıyoruz.</p><p>Güzergâh üzerindeki trafik ayrı bir değişken. Sabah ve akşam saatlerinde geçiş süresi belirgin şekilde uzuyor; bu yüzden Gebze’de <strong>evden eve nakliyat</strong> işlerini gün doğarken başlatıyor, yoğun saatlere denk gelmeden yolu almayı hedefliyoruz.</p><p>İlçe içindeki yapı dokusu ise karışık. Merkeze yakın mahallelerde sokaklar dar ve park sıkışık; çevredeki yeni sitelerde ise araç yanaşması ve asansör kullanımı sorunsuz ilerliyor.</p>`,
    kunye: [
      { label: 'İl dışı yön', value: 'Taşımaların önemli bölümü İstanbul yönüne; plan varış koşullarına göre kuruluyor.' },
      { label: 'Varış tarafı', value: 'İstanbul adresinde park yeri ve site izni de önceden ayarlanıyor.' },
      { label: 'Trafik saati', value: 'Sabah ve akşam geçiş süresi uzuyor; iş gün doğarken başlatılıyor.' },
      { label: 'Karışık doku', value: 'Merkezde dar sokak ve sıkışık park, çevrede yeni siteler.' },
    ],
    guzergahlar: [
      { to: 'Çayırova', note: 'Komşu ilçe; kısa mesafe, iş yarım günde bitebiliyor.' },
      { to: 'Darıca', note: 'Güneye geçiş; varış tarafında dar sokak planlaması yapılıyor.' },
      { to: 'Dilovası', note: 'Doğuya geçiş; ağır araç trafiği hesaba katılıyor.' },
      { to: 'İzmit', note: 'İl merkezi; yol süresi plana dahil ediliyor.' },
    ],
    mahalleler: ['Güzeller', 'Osmanyılmaz', 'Tatlıkuyu', 'Mustafapaşa', 'Hacıhalil', 'Beylikbağı'],
    sorular: [
      {
        question: 'İstanbul’a taşınıyorum, varış adresinde park sorunu olur mu?',
        answer:
          'Olmaması için varış tarafındaki yükleme yerini de biz önceden ayarlıyoruz. Gerekirse site izni ve saat rezervasyonu alıyoruz.',
      },
      {
        question: 'Trafik yüzünden iş ikinci güne sarkar mı?',
        answer:
          'Sarkmaması için işi gün doğarken başlatıyoruz. Eşya çoksa iki araçla eşzamanlı çalışıp günü aşmıyoruz.',
      },
      {
        question: 'İstanbul taşıması fiyatı ne kadar etkiliyor?',
        answer:
          'Yol süresi ve varış koşulları fiyata giriyor. Kesin tutarı keşiften sonra yazılı veriyoruz; taşıma gününe kadar değişmiyor.',
      },
      {
        question: 'Eşyalarım bir süre depoda kalabilir mi?',
        answer:
          'Kalabilir. Tarihler arasında boşluk varsa eşyalarınızı depolayıp anlaştığımız günde teslim ediyoruz.',
      },
    ],
  },

  {
    ad: 'Darıca',
    derinlik: 'tam',
    ozet:
      'Nüfus yoğunluğunun yüksek olduğu Darıca’da taşımaların çoğu ilçe içinde ve kısa mesafede gerçekleşiyor.',
    metaAciklama:
      'Darıca evden eve nakliyat: kısa mesafeli ilçe içi taşımalar, dar sokağa uygun araç planı, yazılı sabit fiyat.',
    govde: `<p>Darıca’da dikkat çeken şey taşıma sıklığı. İlçe içindeki adres değişiklikleri, başka ilçelere yapılan taşımalardan daha yaygın; aileler çoğunlukla aynı çevrede kalıp bina değiştiriyor. Bu işlerde yol süresi neredeyse hiç yok, dolayısıyla iş yarım günde bitiyor ve fiyat belirgin şekilde daha uygun oluyor.</p><p>Buna karşılık yapı yoğunluğu yüksek. Binalar birbirine yakın, sokaklar dar ve park yeri gün boyu dolu. Darıca’da <strong>evden eve nakliyat</strong> planlarken ilk baktığımız şey aracın bina önüne çekilip çekilemediği; çekilemiyorsa yükleme yerini önceden ayırtıyor ya da aktarma planlıyoruz.</p><p>Sahil hattındaki yeni sitelerde tablo değişiyor. Buralarda yük asansörü ve otopark bulunuyor, iş öngörülebilir ilerliyor; tek konu site giriş izni oluyor.</p>`,
    kunye: [
      { label: 'İlçe içi ağırlık', value: 'Adres değişikliklerinin çoğu ilçe içinde; işler yarım günde bitiyor.' },
      { label: 'Yoğunluk', value: 'Binalar birbirine yakın, sokaklar dar, park gün boyu dolu.' },
      { label: 'Yükleme yeri', value: 'Araç yanaşamıyorsa yer önceden ayırtılıyor ya da aktarma planlanıyor.' },
      { label: 'Sahil siteleri', value: 'Yeni sitelerde yük asansörü var; konu yalnızca giriş izni.' },
    ],
    guzergahlar: [
      { to: 'Gebze', note: 'Kuzeye geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Çayırova', note: 'Kuzeydoğu aksı; düz güzergâh.' },
      { to: 'Körfez', note: 'Doğuya geçiş; yol süresi planlanıyor.' },
      { to: 'İzmit', note: 'İl merkezi; iş tek günde tamamlanıyor.' },
    ],
    mahalleler: ['Bayramoğlu', 'Osmangazi', 'Emek', 'Cami', 'Kazım Karabekir'],
    sorular: [
      {
        question: 'Aynı mahallede başka bir binaya taşınıyorum, fiyat ne olur?',
        answer:
          'Yol süresi olmadığı için bu işler en uygun kategoride. Çoğu yarım günde bitiyor ve fiyat buna göre veriliyor.',
      },
      {
        question: 'Sokağımızda park yeri yok, araç nereye yanaşacak?',
        answer:
          'Yükleme yerini bir gün önceden apartman görevlisiyle konuşup ayırtıyoruz. Mümkün değilse aktarma planlıyoruz.',
      },
      {
        question: 'Sitemize araç girişi izne bağlı, sorun olur mu?',
        answer:
          'Olmaz. İzni ve yükleme saatini biz yönetimle görüşerek ayarlıyoruz.',
      },
      {
        question: 'Ambalaj malzemesini siz mi getiriyorsunuz?',
        answer:
          'Evet. Koli, balonlu naylon, streç ve mobilya battaniyesi ekiple birlikte geliyor.',
      },
    ],
  },

  {
    ad: 'Çayırova',
    derinlik: 'tam',
    ozet:
      'Lojistik depolarının yoğunlaştığı Çayırova’da depo ve işyeri taşımaları konut işlerinin yanında düzenli yer tutuyor.',
    metaAciklama:
      'Çayırova evden eve nakliyat ve depo taşıma: sigortalı, planlı ve yazılı sabit fiyatlı hizmet. Ücretsiz keşif.',
    govde: `<p>Çayırova’nın ana yol bağlantılarına yakınlığı ilçeyi bir depolama ve dağıtım noktası hâline getirmiş. Bunun taşımaya yansıması net: raf sistemleri, palet düzeni ve stok taşıması, konut işlerinin yanında düzenli olarak talep ediliyor. Depo taşımalarında raflar sökülüp numaralanıyor, yeni adreste aynı düzende kuruluyor; bu, stokun kaybolmaması için önemli.</p><p>Konut tarafında yerleşim büyük ölçüde yeni ve planlı. Şekerpınar ve çevresindeki bloklarda yollar geniş, araç bina önüne yanaşabiliyor ve yük asansörü bulunuyor. Çayırova’da <strong>evden eve nakliyat</strong> işlerinde erişim nadiren sorun oluyor; süreyi belirleyen şey eşya hacmi.</p><p>İlçe küçük ve komşularına yakın. Gebze ve Darıca yönündeki taşımalar çoğunlukla yarım günde tamamlanıyor.</p>`,
    kunye: [
      { label: 'Depolama noktası', value: 'Ana yol bağlantılarına yakın; depo ve dağıtım taşımaları düzenli.' },
      { label: 'Raf düzeni', value: 'Raflar sökülüp numaralanıyor, yeni adreste aynı düzende kuruluyor.' },
      { label: 'Yeni konut', value: 'Şekerpınar çevresinde geniş yol ve yük asansörlü bloklar.' },
      { label: 'Komşuluk', value: 'Gebze ve Darıca yönündeki işler yarım günde tamamlanıyor.' },
    ],
    guzergahlar: [
      { to: 'Gebze', note: 'Batıya geçiş; kısa mesafe, iş yarım günde bitiyor.' },
      { to: 'Darıca', note: 'Güneybatı aksı; düz güzergâh.' },
      { to: 'Dilovası', note: 'Doğuya geçiş; ağır araç trafiği hesaba katılıyor.' },
      { to: 'İzmit', note: 'İl merkezi; yol süresi plana dahil ediliyor.' },
    ],
    mahalleler: ['Şekerpınar', 'Akse', 'Özgürlük', 'Atatürk', 'Cumhuriyet'],
    sorular: [
      {
        question: 'Depomu taşıtırken stok karışır mı?',
        answer:
          'Karışmaması için raflar sökülmeden önce numaralanıyor ve yeni adreste aynı düzende kuruluyor. Bu, depo taşımasının standart parçası.',
      },
      {
        question: 'Depo taşıması hafta sonu yapılabilir mi?',
        answer:
          'Yapılabilir. Sevkiyatın durmaması için işleri çoğunlukla hafta sonuna ya da mesai dışına planlıyoruz.',
      },
      {
        question: 'Konut taşıması ne kadar sürüyor?',
        answer:
          'Erişim rahat olduğu için süreyi hacim belirliyor. Orta ölçekli bir daire genellikle yarım gün ile bir gün arasında tamamlanıyor.',
      },
      {
        question: 'Ağır parçalar için ekipmanınız var mı?',
        answer:
          'Var. Taşıma kızağı, kayış ve gerektiğinde forklift desteği kullanıyoruz; ihtiyaç keşifte belirleniyor.',
      },
    ],
  },

  {
    ad: 'Gölcük',
    derinlik: 'tam',
    ozet:
      'Yapı stoğunun büyük bölümü 2000 sonrası yenilenmiş olan Gölcük’te asansör ve otopark taşımayı kolaylaştırıyor.',
    metaAciklama:
      'Gölcük evden eve nakliyat: asansörlü yeni yapıya uygun hızlı taşıma, sigortalı ambalaj ve yazılı sabit fiyat.',
    govde: `<p>Gölcük’te taşımayı kolaylaştıran şey yapı stoğunun genç olması. İlçedeki binaların büyük bölümü 2000 sonrasında yapıldığı için yük asansörü, geniş merdiven ve otopark yaygın. Bu, hem yükleme süresini kısaltıyor hem de teklifi öngörülebilir kılıyor; büyük mobilyaların sökülmesi diğer ilçelere göre çok daha az gerekiyor.</p><p>Yerleşim sahil hattı boyunca uzanıyor ve yollar genellikle geniş. Gölcük’te <strong>evden eve nakliyat</strong> işlerinde araç yanaşması nadiren sorun oluyor; süreyi belirleyen şey erişim değil, taşınan eşya hacmi.</p><p>Değirmendere yönündeki yamaç mahallelerinde ise eğim devreye giriyor. Bu adreslerde ekip sayısını artırıyor, yağışlı günlerde taşıma askısı kullanıyoruz.</p>`,
    kunye: [
      { label: 'Genç yapı stoğu', value: 'Binaların büyük bölümü 2000 sonrası; yük asansörü ve otopark yaygın.' },
      { label: 'Söküm ihtiyacı', value: 'Geniş merdiven sayesinde mobilya sökümü diğer ilçelere göre çok daha az.' },
      { label: 'Sahil hattı', value: 'Yollar geniş; araç yanaşması nadiren sorun oluyor.' },
      { label: 'Yamaç mahalleler', value: 'Değirmendere yönünde eğim var; ekip sayısı artırılıyor.' },
    ],
    guzergahlar: [
      { to: 'Başiskele', note: 'Doğuya geçiş; sahil yolu, iş aynı gün bitiyor.' },
      { to: 'İzmit', note: 'İl merkezi; düzenli güzergâh.' },
      { to: 'Karamürsel', note: 'Batıya geçiş; yol süresi planlanıyor.' },
      { to: 'Derince', note: 'Kuzeye geçiş; varış tarafında eğim hesaba katılıyor.' },
    ],
    mahalleler: ['Değirmendere', 'Halıdere', 'İhsaniye', 'Yazlık', 'Hisareyn'],
    sorular: [
      {
        question: 'Mobilyalarımın sökülmesi gerekir mi?',
        answer:
          'Gölcük’teki binalarda merdiven ve asansör genellikle geniş olduğu için söküm ihtiyacı az çıkıyor. Yine de keşifte ölçüp kesin olarak söylüyoruz.',
      },
      {
        question: 'Taşıma ne kadar sürer?',
        answer:
          'Erişim rahat olduğu için süreyi hacim belirliyor. Orta ölçekli bir daire genellikle yarım gün ile bir gün arasında tamamlanıyor.',
      },
      {
        question: 'Yamaçtaki adresime araç çıkabilir mi?',
        answer:
          'Çoğu adrese çıkıyor. Sokağı keşifte görüp uygun ölçüde araç seçiyor, gerekirse aktarma planlıyoruz.',
      },
      {
        question: 'Eşyalarım sigortalı mı?',
        answer:
          'Bütün taşımalar sigortalı yapılıyor ve kapsam sözleşmede yazılı oluyor.',
      },
    ],
  },

  {
    ad: 'Körfez',
    derinlik: 'tam',
    ozet:
      'Vardiya düzeninin hâkim olduğu Körfez’de taşıma saati, ailenin çalışma programına göre belirleniyor.',
    metaAciklama:
      'Körfez evden eve nakliyat: vardiya saatlerine göre planlanan taşıma, sigortalı ambalaj ve yazılı sabit fiyat.',
    govde: `<p>Körfez’de taşıma planının en sık karşılaştığımız kısıtı saat. İlçede çalışan nüfusun önemli bir bölümü vardiya düzeninde; ev sahibinin taşıma sırasında adreste bulunabileceği zaman aralığı dar olabiliyor. Bu yüzden gün ve saati vardiya programına göre belirliyor, gerekirse işi iki yarım güne bölüyoruz.</p><p>Yerleşim ağırlıklı olarak düzenli konut alanlarından oluşuyor. Yollar araç geçişine uygun, binaların çoğunda asansör var. Körfez’de <strong>evden eve nakliyat</strong> işlerinde bina kaynaklı zorluk nadiren gündeme geliyor; asıl planlama konusu zamanlama.</p><p>Hereke yönündeki eski yerleşimde ise sokaklar daralıyor. Bu adreslerde orta ölçekli araç kullanıyor, gerekirse yükü sokak girişinde aktarıyoruz.</p>`,
    kunye: [
      { label: 'Vardiya düzeni', value: 'Ev sahibinin adreste bulunabileceği aralık dar olabiliyor; saat ona göre seçiliyor.' },
      { label: 'Bölünmüş çalışma', value: 'Gerekirse iş iki yarım güne bölünüyor.' },
      { label: 'Konut alanları', value: 'Yollar araç geçişine uygun, binaların çoğunda asansör var.' },
      { label: 'Eski yerleşim', value: 'Hereke yönünde sokaklar daralıyor; orta ölçekli araç tercih ediliyor.' },
    ],
    guzergahlar: [
      { to: 'Derince', note: 'Doğuya geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Dilovası', note: 'Batıya geçiş; ağır araç trafiği hesaba katılıyor.' },
      { to: 'İzmit', note: 'İl merkezi; düzenli güzergâh.' },
      { to: 'Darıca', note: 'Batıya devam; yol süresi planlanıyor.' },
    ],
    mahalleler: ['Hereke', 'Barbaros', 'Yarımca', 'Kirazlıyalı', 'Şirinyalı'],
    sorular: [
      {
        question: 'Vardiyam yüzünden gündüz evde olamıyorum, çözüm var mı?',
        answer:
          'Var. Taşımayı vardiya programınıza göre planlıyoruz; gerekirse işi iki yarım güne bölüp size uygun saatlerde çalışıyoruz.',
      },
      {
        question: 'Hafta sonu taşınabilir miyim?',
        answer:
          'Taşınabilirsiniz. Hafta sonu talebin yoğun olduğu bir dönem; birkaç gün önceden planlamanızı öneriyoruz.',
      },
      {
        question: 'Hereke tarafında sokağımız dar, araç gelir mi?',
        answer:
          'Orta ölçekli araçla çoğu adrese giriyoruz. Girilemeyen yerlerde yükü sokak girişinde aktarıyoruz.',
      },
      {
        question: 'Keşif ücretli mi?',
        answer:
          'Keşif ücretsiz. Ekibimiz size uygun bir saatte gelip eşyayı yerinde görüyor.',
      },
    ],
  },

  {
    ad: 'Derince',
    derinlik: 'tam',
    ozet:
      'Kıyıdan sırta doğru dik biçimde yükselen Derince’de eğim, taşıma süresini kat sayısından daha çok etkiliyor.',
    metaAciklama:
      'Derince evden eve nakliyat: dik yamaçlara uygun araç ve ekip planı, sigortalı taşıma, yazılı sabit fiyat.',
    govde: `<p>Derince, kıyı şeridinden sırta doğru kısa mesafede ciddi biçimde yükseliyor. Bu, ilçedeki taşımaların karakterini belirleyen ana unsur: kuş uçuşu yakın iki adres arasında dik bir tırmanış olabiliyor ve büyük araçla bu yokuşları çıkmak her zaman mümkün değil. Keşifte ölçtüğümüz ilk şey aracın nereye kadar yaklaşabildiği oluyor.</p><p>Eğim yalnızca aracı değil ekibi de etkiliyor. Yokuşta eşya taşımak düz zemine göre belirgin şekilde yavaş; bu yüzden Derince’de <strong>evden eve nakliyat</strong> işlerinde ekip sayısını kat sayısına değil eğime göre belirliyoruz. Yağışlı günlerde zemin kayganlığı için ağır parçalarda taşıma askısı ve kayış kullanıyoruz.</p><p>Kıyıya yakın hatta ise koşullar normalleşiyor; yollar geniş, araç bina önüne yanaşabiliyor ve iş standart bir taşıma gibi ilerliyor.</p>`,
    kunye: [
      { label: 'Dik yükselme', value: 'Kıyıdan sırta kısa mesafede ciddi eğim; büyük araç her yokuşu çıkamıyor.' },
      { label: 'Ekip sayısı', value: 'Yokuşta taşıma yavaşladığı için ekip kat sayısına değil eğime göre belirleniyor.' },
      { label: 'Yağışlı gün', value: 'Zemin kayganlığında taşıma askısı ve kayış kullanılıyor.' },
      { label: 'Kıyı hattı', value: 'Sahile yakın adreslerde yollar geniş; iş standart ilerliyor.' },
    ],
    guzergahlar: [
      { to: 'İzmit', note: 'Doğuya geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Körfez', note: 'Batıya geçiş; düzenli güzergâh.' },
      { to: 'Gölcük', note: 'Güneye geçiş; sahil yolu.' },
      { to: 'Kartepe', note: 'Doğuya devam; kışın gün seçimi hava durumuna göre yapılıyor.' },
    ],
    mahalleler: ['Çenedağ', 'Sırrıpaşa', 'Yenikent', 'Deniz', 'Çınarlı'],
    sorular: [
      {
        question: 'Evimiz dik bir yokuşta, kamyon çıkabilir mi?',
        answer:
          'Her yokuşta çıkamıyor. Keşifte yolu görüp uygun ölçüde araç seçiyor, gerekirse yükü aşağıda küçük araca aktarıyoruz.',
      },
      {
        question: 'Eğim yüzünden fiyat artar mı?',
        answer:
          'Süre uzadığı ve ekip sayısı arttığı için etkiliyor. Bu keşifte hesaplanıp yazılı fiyata baştan yansıyor.',
      },
      {
        question: 'Yağmurlu günde taşıma yapıyor musunuz?',
        answer:
          'Yapıyoruz. Eşyalar streç ve naylonla korunuyor, eğimli zeminde taşıma askısı ve ek ekip kullanılıyor.',
      },
      {
        question: 'Beyaz eşya sökümü dahil mi?',
        answer:
          'Dahil. Çamaşır makinesi tamburu sabitleniyor ve yeni adreste bağlantıları kuruluyor.',
      },
    ],
  },

  {
    ad: 'Kartepe',
    derinlik: 'tam',
    ozet:
      'Dağ eteğindeki konumu nedeniyle Kartepe’de kış koşulları, taşıma gününü eşya hacminden önce belirliyor.',
    metaAciklama:
      'Kartepe evden eve nakliyat: kış koşullarına göre planlanan taşıma, sigortalı ambalaj ve yazılı sabit fiyat.',
    govde: `<p>Kartepe’de taşıma planının merkezinde hava var. İlçe dağ eteğine kurulu ve yukarı kesimlerde kış aylarında kar ile buzlanma sık görülüyor. Bu dönemde ağır araçla yokuş çıkmak riskli olabiliyor; gün seçimini hava durumuna göre yapıyor, gerekirse tarihi birlikte kaydırıyoruz. Zorlayarak yapılan bir taşıma hem riskli hem pahalı oluyor.</p><p>Yerleşim iki tipe ayrılıyor. Ovaya yakın kesimde düzenli konut alanları var; buralarda araç yanaşması ve asansör kullanımı sorunsuz. Maşukiye ve yukarı mahallelerde ise müstakil evler, bahçeler ve dağ evleri yaygın. Kartepe’de <strong>evden eve nakliyat</strong> teklifi hazırlarken bahçe ve depo eşyasını da hacme dahil ediyoruz.</p><p>İkinci konut kullanımı da yaygın. Bu taşımalarda eşyanın bir bölümünün depolanması sık talep ediliyor ve aynı teklifin içinde planlanıyor.</p>`,
    kunye: [
      { label: 'Dağ eteği', value: 'Yukarı kesimlerde kışın kar ve buzlanma sık; gün seçimi havaya göre yapılıyor.' },
      { label: 'İki yerleşim', value: 'Ovada düzenli konut, yukarıda müstakil ev ve dağ evleri.' },
      { label: 'Ek hacim', value: 'Bahçe ve depo eşyası taşınan hacmi büyütüyor.' },
      { label: 'İkinci konut', value: 'Mevsimlik kullanım yaygın; depolama sık talep ediliyor.' },
    ],
    guzergahlar: [
      { to: 'İzmit', note: 'Batıya geçiş; düzenli güzergâh, iş aynı gün bitiyor.' },
      { to: 'Başiskele', note: 'Güneybatı aksı; yol süresi planlanıyor.' },
      { to: 'Derince', note: 'Batıya devam; varış tarafında eğim hesaba katılıyor.' },
      { to: 'Kandıra', note: 'Kuzeye geçiş; uzun güzergâh, erken başlangıç gerekiyor.' },
    ],
    mahalleler: ['Maşukiye', 'Uzuntarla', 'Suadiye', 'Köseköy', 'Acısu'],
    sorular: [
      {
        question: 'Kışın taşınmak zorundayım, risk var mı?',
        answer:
          'Planlı yapıldığında yok. Yolu ve havayı önceden değerlendiriyor, eşyaları neme karşı ekstra koruyoruz. Hava çok sertse günü birlikte değiştiriyoruz.',
      },
      {
        question: 'Dağ evimden taşınma yapabilir misiniz?',
        answer:
          'Yapabiliriz. Yolu keşifte değerlendirip uygun ölçüde araç seçiyoruz; dar ve dik güzergâhlarda aktarma planlıyoruz.',
      },
      {
        question: 'Bahçe eşyaları hacme dahil mi?',
        answer:
          'Dahil. Toplam hacmi belirgin şekilde artırdığı için keşifte gösterilmesi gerekiyor.',
      },
      {
        question: 'Eşyalarımın bir kısmını depoda tutabilir miyim?',
        answer:
          'Tutabilirsiniz. Taşınacak ve depolanacak eşyayı keşifte birlikte ayırıyoruz.',
      },
    ],
  },

  // ───────────────────────── ORTA DERİNLİK (4) ─────────────────────────
  {
    ad: 'Başiskele',
    derinlik: 'orta',
    ozet: 'Körfezin güney kıyısında müstakil ve bahçeli yerleşimin yaygın olduğu Başiskele’de hacim ev içiyle sınırlı kalmıyor.',
    metaAciklama:
      'Başiskele evden eve nakliyat: müstakil ev taşımalarına uygun ekip planı, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Başiskele’de yerleşim körfezin güney kıyısı boyunca yayılıyor ve müstakil, bahçeli evler yaygın. Bu yapı tipinde merdiven sorunu az; buna karşılık bahçe mobilyası, depo malzemesi ve varsa ikinci kat taşınacak hacmi büyütüyor. Oda sayısına bakarak fiyat vermek burada yanıltıcı oluyor.</p><p>Erişim genellikle rahat; yollar geniş ve araç çoğu adreste kapıya yanaşabiliyor. Başiskele’de <strong>evden eve nakliyat</strong> işlerinin süresini uzatan şey erişim değil hacim, ekip sayısını buna göre planlıyoruz.</p>`,
    kunye: [
      { label: 'Konut tipi', value: 'Müstakil ve bahçeli evler yaygın; merdiven sorunu az.' },
      { label: 'Ek hacim', value: 'Bahçe, depo ve ikinci kat taşınan hacmi büyütüyor.' },
      { label: 'Erişim', value: 'Yollar geniş; araç çoğu adreste kapıya yanaşabiliyor.' },
    ],
    guzergahlar: [
      { to: 'İzmit', note: 'Kuzeye geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Gölcük', note: 'Batıya geçiş; sahil yolu.' },
      { to: 'Kartepe', note: 'Doğuya geçiş; kışın gün seçimi havaya göre yapılıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Müstakil evden taşınma nasıl fiyatlanıyor?',
        answer: 'Oda sayısına değil toplam hacme göre. Bahçe, depo ve ikinci kat dahil ediliyor.',
      },
      {
        question: 'Bahçe mobilyalarını da taşıyor musunuz?',
        answer: 'Taşıyoruz. Ayrıca ambalajlanıp hacim hesabına dahil ediliyor.',
      },
      {
        question: 'Kaç kişilik ekip geliyor?',
        answer: 'Ekip sayısını hacim belirliyor; büyük evlerde daha kalabalık ekiple çalışıyoruz.',
      },
    ],
  },

  {
    ad: 'Karamürsel',
    derinlik: 'orta',
    ozet: 'Körfezin batı ucundaki Karamürsel’de taşımalar hem Kocaeli hem Yalova yönüne yapılıyor.',
    metaAciklama:
      'Karamürsel evden eve nakliyat: iki yönlü güzergâh planı, sigortalı ambalaj ve yazılı sabit fiyat. Ücretsiz keşif.',
    govde: `<p>Karamürsel, körfezin batı ucunda ve il sınırına yakın. Buradan yapılan taşımaların bir bölümü Kocaeli içine, bir bölümü ise Yalova yönüne gidiyor. Hangi yöne gidileceği aracın gün planını değiştirdiği için güzergâhı önceden belirliyoruz.</p><p>İlçe merkezindeki yerleşim toplu ve araç yanaşması sorunsuz. Karamürsel’de <strong>evden eve nakliyat</strong> işlerinde bina kaynaklı zorluk nadiren gündeme geliyor; kırsal adreslerde ise yol genişliği plana giriyor.</p>`,
    kunye: [
      { label: 'İki yön', value: 'Taşımaların bir bölümü Kocaeli içine, bir bölümü Yalova yönüne gidiyor.' },
      { label: 'İlçe merkezi', value: 'Toplu yerleşim; araç yanaşması sorunsuz.' },
      { label: 'Kırsal adres', value: 'Mahalle yollarının genişliği araç seçimini belirliyor.' },
    ],
    guzergahlar: [
      { to: 'Gölcük', note: 'Doğuya geçiş; sahil yolu, iş tek günde bitiyor.' },
      { to: 'Başiskele', note: 'Doğuya devam; düzenli güzergâh.' },
      { to: 'İzmit', note: 'İl merkezi; yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Yalova yönüne taşıma yapıyor musunuz?',
        answer: 'Yapıyoruz. İl dışı güzergâhta yol süresi fiyata baştan dahil ediliyor.',
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
    ad: 'Dilovası',
    derinlik: 'orta',
    ozet: 'Dar bir vadiye kurulu Dilovası’nda ağır araç trafiği, taşıma saatinin seçimini zorunlu kılıyor.',
    metaAciklama:
      'Dilovası evden eve nakliyat: yoğun araç trafiğine göre planlanan saat, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Dilovası dar bir vadiye kurulu ve ana yolu gün boyu ağır araç trafiği kullanıyor. Bu, nakliye aracının hem ilçeye girişini hem adrese yanaşmasını zorlaştırıyor. Taşımayı ağır araç yoğunluğunun düştüğü saatlere alıyoruz; bu tek başına işin süresini belirgin şekilde kısaltıyor.</p><p>Yerleşim vadi yamaçlarına yayıldığı için bazı sokaklarda eğim ve darlık birlikte geliyor. Dilovası’nda <strong>evden eve nakliyat</strong> planlarken adrese göre araç ölçüsü seçiyor, gerekirse yükü ana yolda aktarıyoruz.</p>`,
    kunye: [
      { label: 'Vadi yerleşimi', value: 'Dar vadi; yamaçlarda eğim ve darlık birlikte geliyor.' },
      { label: 'Ağır araç trafiği', value: 'Ana yol gün boyu yoğun; taşıma saati buna göre seçiliyor.' },
      { label: 'Araç ölçüsü', value: 'Adrese göre araç seçiliyor; gerekirse ana yolda aktarma yapılıyor.' },
    ],
    guzergahlar: [
      { to: 'Gebze', note: 'Batıya geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Körfez', note: 'Doğuya geçiş; düzenli güzergâh.' },
      { to: 'Çayırova', note: 'Batıya devam; yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Trafik yüzünden araç geç kalır mı?',
        answer: 'Taşımayı ağır araç yoğunluğunun düştüğü saatlere alıyoruz; bu gecikmeyi büyük ölçüde önlüyor.',
      },
      {
        question: 'Yamaçtaki sokağımıza araç çıkabilir mi?',
        answer: 'Sokağı keşifte görüp uygun ölçüde araç seçiyoruz; gerekirse ana yolda aktarma yapıyoruz.',
      },
      {
        question: 'Eşyalarım sigortalı mı?',
        answer: 'Bütün taşımalar sigortalı ve kapsam sözleşmede yazılı oluyor.',
      },
    ],
  },

  {
    ad: 'Kandıra',
    derinlik: 'orta',
    ozet: 'Karadeniz kıyısındaki geniş kırsal alanıyla Kandıra’da güzergâh planlaması taşımanın ilk adımı.',
    metaAciklama:
      'Kandıra evden eve nakliyat: dağınık kırsal yerleşime göre planlanan güzergâh, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Kandıra geniş bir alana yayılıyor ve köyler birbirinden uzak. İlçe merkezi ile Karadeniz kıyısındaki yerleşimler arasındaki mesafe, başka iki ilçe arasındaki yola denk gelebiliyor. Bu yüzden güzergâhı önceden çıkarıyor, işi sabah erken başlatıyoruz.</p><p>Kıyı hattında yazlık kullanım yaygın; bu adreslerde mevsimlik hareketlilik var ve eşyanın bir bölümünün depolanması sık talep ediliyor. Kandıra’da <strong>evden eve nakliyat</strong> planlarken taşınacak ve depolanacak eşyayı keşifte birlikte ayırıyoruz.</p>`,
    kunye: [
      { label: 'Yayılım', value: 'Köyler birbirinden uzak; güzergâh önceden çıkarılıyor.' },
      { label: 'Kıyı hattı', value: 'Yazlık kullanım yaygın; mevsimlik hareketlilik var.' },
      { label: 'Depolama', value: 'İkinci konut taşımalarında depolama sık talep ediliyor.' },
    ],
    guzergahlar: [
      { to: 'İzmit', note: 'Güneye geçiş; yol süresi planlanıyor.' },
      { to: 'Kartepe', note: 'Güneydoğu aksı; erken başlangıç gerekiyor.' },
      { to: 'Körfez', note: 'Güneybatı aksı; uzun güzergâh.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Köydeki evimden taşıma yapıyor musunuz?',
        answer: 'Yapıyoruz. Yol durumunu keşifte değerlendirip uygun ölçüde araç seçiyoruz.',
      },
      {
        question: 'Yazlığımdaki eşyaları depolayabilir misiniz?',
        answer: 'Depolayabiliriz. Taşınacak ve depolanacak eşyayı keşifte birlikte ayırıyoruz.',
      },
      {
        question: 'İzmit’e taşınma tek günde biter mi?',
        answer: 'Genellikle biter. Mesafe nedeniyle iş sabah erken başlatılıyor.',
      },
    ],
  },
]

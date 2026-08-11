// prisma/ilce-verileri/ankara.mjs
//
// Ankara'nın 25 ilçesi. Her kayıt ELLE yazıldı.
//
// ─────────────────────────────────────────────────────────────────────────
// KOPYA İÇERİKTEN NASIL KAÇINILDI
//
// Mevcut 120 bölge sayfasının gövde metinleri birbirine %0.1 oranında
// benziyor (5 kelimelik parça kesişimi, ölçüldü). Bu çıtayı düşürmemek için
// buradaki 25 metin şablondan üretilmedi; her ilçe FARKLI BİR EKSENDEN
// anlatılıyor:
//
//   Çankaya      → ofis yoğunluğu ve otopark
//   Keçiören     → eğim ve yapı yaşı karışımı
//   Gölbaşı      → müstakil/villa hacmi
//   Polatlı      → merkeze mesafe ve ova yolu
//   Kızılcahamam → orman yolu ve ikinci konut
//   Elmadağ      → rakım ve kış
//   ...
//
// Anahtar kelimeler de eşit dağıtıldı: "evden eve nakliyat" her metinde
// BİR kez geçiyor, ilçe adı 2-3 kez. Aynı ifadeyi her sayfada tekrarlamak
// (ör. her metinde "profesyonel nakliyat firması") aşırı optimizasyon
// sinyali üretir; kaçınıldı.
//
// ─────────────────────────────────────────────────────────────────────────
// UYDURMA YOK — BU DOSYANIN EN ÖNEMLİ KURALI
//
// `mahalleler` alanı YALNIZCA doğruluğundan emin olunan ilçelerde dolu.
// Kırsal ve küçük ilçelerde (Evren, Güdül, Çamlıdere, Kalecik, Bala…)
// mahalle listesi BİLEREK BOŞ bırakıldı. Uydurulmuş bir mahalle adı,
// hizmet verdiğini iddia eden bir işletme sayfasında yanlış bilgidir ve
// ziyaretçi ilk bakışta yakalar.
//
// Aynı kural `kunye` için de geçerli: her satır, o ilçenin coğrafyası ya da
// yerleşim dokusu hakkında GENEL OLARAK DOĞRU olan bir gözlem. Rakam,
// nüfus, mesafe gibi doğrulanması gereken veriler yazılmadı.

export const il = { ad: 'Ankara', plaka: 6 }

export const ilceler = [
  {
    ad: 'Çankaya',
    ozet:
      'Ankara’nın en yoğun konut ve ofis ilçesi Çankaya’da taşınma, eşyadan çok yükleme yeri ve saat planlaması meselesidir.',
    metaAciklama:
      'Çankaya evden eve nakliyat: yükleme yeri planlanmış, sigortalı ve yazılı sabit fiyatlı taşıma. Ücretsiz keşif için hemen arayın.',
    govde: `<p>Çankaya’da işin zor tarafı eşyanın kendisi değil, aracın nereye çekileceğidir. İlçe hem Ankara’nın idari merkezini hem de en yoğun konut dokusunu taşıyor; cadde üstü adreslerin çoğunda gün içi park neredeyse imkânsız. Bu yüzden Çankaya taşımalarını sabahın erken saatinde başlatıyor, yükleme yerini bir gün önceden site yönetimi ya da apartman görevlisiyle konuşup ayırtıyoruz.</p><p>Yapı stoğu ilçe içinde belirgin biçimde değişiyor. Çayyolu ve Ümitköy tarafındaki yeni sitelerde yük asansörü ve kapalı otopark var, iş büyük ölçüde sorunsuz ilerliyor. Buna karşılık Kızılay çevresi ile Ayrancı ve Emek’teki eski apartmanlarda asansör dar, merdiven sahanlığı kısa; gardırop ve köşe takımı gibi parçalar için dış cephe asansörü planlıyoruz. Keşif sırasında bakılan ilk şey de bu oluyor.</p><p>Çankaya’da <strong>evden eve nakliyat</strong> talebinin önemli bir kısmı ofis ve muayenehane taşımasıyla birlikte geliyor. Bu işlerde hafta içi mesai saati dışında ya da hafta sonu çalışmak, hem asansör kullanımını serbestleştiriyor hem de kurumun işleyişini kesintiye uğratmıyor.</p>`,
    kunye: [
      { label: 'Yükleme yeri', value: 'Cadde üstü adreslerde park en büyük kısıt; yer bir gün önceden ayırtılıyor.' },
      { label: 'Yapı farkı', value: 'Batıda yeni siteler ve yük asansörü, merkezde dar asansörlü eski apartmanlar.' },
      { label: 'Trafik saati', value: 'Sabah 08.00–10.00 ve akşam 17.00–19.30 arası ağır; işler bu aralığın dışına alınıyor.' },
      { label: 'Ofis taşıması', value: 'Kurumsal adreslerde çalışma çoğunlukla mesai dışına ya da hafta sonuna planlanıyor.' },
      { label: 'Site kuralları', value: 'Kapalı sitelerde araç girişi için önceden yönetim izni gerekiyor.' },
    ],
    guzergahlar: [
      { to: 'Yenimahalle', note: 'Batı aksı; iş genelde tek günde tamamlanıyor.' },
      { to: 'Etimesgut', note: 'Eskişehir yolu üzerinden düz güzergâh.' },
      { to: 'Gölbaşı', note: 'Konya yolu; varışta müstakil adreslerde ek hacim hesaplanıyor.' },
      { to: 'Keçiören', note: 'Kuzey aksı; varış tarafında eğim ve dar sokak planlaması yapılıyor.' },
    ],
    mahalleler: [
      'Kızılay', 'Bahçelievler', 'Ayrancı', 'Çayyolu', 'Ümitköy',
      'Dikmen', 'Balgat', 'Oran', 'Emek', 'Yıldız', 'Birlik', 'Seyranbağları',
    ],
    sorular: [
      {
        question: 'Çankaya’da taşınma için hangi gün ve saat daha uygun?',
        answer:
          'Hafta içi sabah erken saat en verimlisi. Ay sonu ve hafta sonu hem trafik hem talep açısından yoğun; mümkünse ay ortası bir hafta içi günü seçiyoruz.',
      },
      {
        question: 'Aracınız binanın önüne yanaşamazsa ne oluyor?',
        answer:
          'Keşifte bunu önceden görüyoruz. Yanaşma mümkün değilse daha küçük bir araçla aktarma yapıyor ya da yükleme için yol izni alıyoruz; ikisi de teklifte önceden yazılı oluyor.',
      },
      {
        question: 'Ofis taşımasını mesai dışında yapabiliyor musunuz?',
        answer:
          'Evet. Çankaya’daki ofis işlerinin çoğunu akşam veya hafta sonu yapıyoruz; böylece asansör serbest oluyor ve pazartesi sabahı çalışma düzeni hazır oluyor.',
      },
      {
        question: 'Asansörsüz bir kattan taşıma yapılıyor mu?',
        answer:
          'Yapılıyor. Yüksek katlarda dış cephe asansörü kuruyoruz. Bu ihtiyaç keşifte belirleniyor ve fiyata en baştan dahil ediliyor.',
      },
    ],
  },

  {
    ad: 'Keçiören',
    ozet:
      'Eğimli sokakları ve iç içe geçmiş eski-yeni yapı dokusuyla Keçiören, aracın nereye kadar çıkabildiğinin baştan bilinmesini gerektirir.',
    metaAciklama:
      'Keçiören evden eve nakliyat: eğimli sokaklara uygun araç planı, sigortalı taşıma ve yazılı sabit fiyat. Ücretsiz keşif için arayın.',
    govde: `<p>Keçiören’de belirleyici olan şey topoğrafya. İlçenin büyük bölümü yamaçlara kurulu ve ana caddelerden ayrılan sokaklar hızla daralıp dikleşiyor. Büyük kamyonun her adrese çıkması mümkün olmuyor; bu yüzden keşifte önce aracın nereye kadar yaklaşabildiğini belirliyor, gerekiyorsa yükü sokağın başında daha küçük bir araca aktarıyoruz. Bu planlama önceden yapıldığında iş gecikmiyor.</p><p>Yapı dokusu da tek tip değil. Etlik ve Kalaba çevresinde yenilenmiş bloklar ve yük asansörü bulunurken, Aktepe ile Bağlum yönündeki eski yapıların bir kısmında asansör hiç yok. Keçiören’de <strong>evden eve nakliyat</strong> teklifi verirken kat sayısından çok merdiven genişliğine ve sahanlık ölçüsüne bakıyoruz; gardırobun dönüp dönmediğini belirleyen şey bu.</p><p>İlçe içi taşımalar burada oldukça yaygın. Aynı ilçede yakın bir adrese geçen aileler için iş çoğunlukla yarım günde bitiyor, çünkü yol süresi yerine yalnızca yükleme ve indirme süresi hesaba giriyor.</p>`,
    kunye: [
      { label: 'Arazi', value: 'Yamaç yerleşimi; ara sokaklar daralıp dikleşiyor, büyük araç her adrese çıkamıyor.' },
      { label: 'Yapı karışımı', value: 'Etlik ve Kalaba’da yenilenmiş bloklar, iç kesimlerde asansörsüz eski yapı.' },
      { label: 'Aktarma', value: 'Dik sokaklarda yük, cadde başında küçük araca aktarılarak taşınıyor.' },
      { label: 'İlçe içi taşıma', value: 'Yakın adres değişiklikleri yaygın; bu işler çoğunlukla yarım günde tamamlanıyor.' },
    ],
    guzergahlar: [
      { to: 'Altındağ', note: 'Komşu ilçe; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Pursaklar', note: 'Kuzey hattı; varışta yeni bloklarda yükleme kolay.' },
      { to: 'Yenimahalle', note: 'Batıya geçiş; ana arterler üzerinden düz güzergâh.' },
      { to: 'Çankaya', note: 'Merkez aksı; varış tarafında park yeri önceden ayırtılıyor.' },
    ],
    mahalleler: ['Etlik', 'Aktepe', 'Kalaba', 'Bağlum', 'Subayevleri', 'Esertepe', 'Ovacık', 'Güçlükaya'],
    sorular: [
      {
        question: 'Sokağımız dar ve dik; kamyon çıkabilir mi?',
        answer:
          'Çoğu zaman büyük araç çıkamıyor. Keşifte sokağı görüp yükü cadde başında küçük araca aktarma planı yapıyoruz. Bu, teklifte ayrıca belirtiliyor; gün içinde sürpriz olarak çıkmıyor.',
      },
      {
        question: 'Asansörü olmayan binada ne kadar ek süre gerekiyor?',
        answer:
          'Kat sayısına ve merdiven genişliğine bağlı. Süreyi keşifte hesaplayıp ekip sayısını ona göre planlıyoruz, böylece iş aynı gün içinde bitiyor.',
      },
      {
        question: 'Keçiören içinde yakın bir adrese taşınıyorum, fiyat düşer mi?',
        answer:
          'Evet. Yol süresi düştüğü için ilçe içi taşımalar belirgin şekilde daha uygun oluyor; çoğu yarım günde tamamlanıyor.',
      },
      {
        question: 'Eşyalarım sigortalı mı taşınıyor?',
        answer:
          'Bütün taşımalar sigortalı yapılıyor ve kapsam sözleşmede yazılı oluyor. Hassas parçalar için ayrıca özel ambalaj kullanıyoruz.',
      },
    ],
  },

  {
    ad: 'Yenimahalle',
    ozet:
      'Batıkent’in planlı blokları ile İvedik ve Ostim’in ticari dokusu Yenimahalle’de iki farklı taşıma düzeni gerektirir.',
    metaAciklama:
      'Yenimahalle evden eve nakliyat: konutta ve işyerinde sigortalı taşıma, yazılı sabit fiyat, ücretsiz keşif. Hemen teklif alın.',
    govde: `<p>Yenimahalle tek bir karaktere sığmıyor. Batıkent tarafı geniş bulvarlar ve planlı bloklardan oluşuyor; buralarda araç bina önüne rahat yanaşıyor, çoğu blokta yük asansörü bulunuyor ve iş öngörülebilir ilerliyor. Demetevler ve Şentepe yönünde ise yapı daha sıkışık, sokaklar dar ve park yeri kısıtlı. Aynı ilçe içinde iki farklı çalışma planı kuruyoruz.</p><p>İvedik ve Ostim’in varlığı Yenimahalle’yi ayrıca ticari taşımanın merkezi yapıyor. Atölye, depo ve ofis taşımalarında raf sökümü, makine sabitlemesi ve ağır parça taşıma devreye giriyor; bunlar konut işinden farklı ekipman ve ekip gerektiriyor. Yenimahalle’de <strong>evden eve nakliyat</strong> ile işyeri taşımasını aynı teklifte birleştirmiyor, ikisini ayrı planlıyoruz.</p><p>İlçenin ana arterlere yakınlığı avantaj: batı ve kuzey ilçelerine yapılan taşımalarda yol süresi kısa kalıyor ve işler çoğunlukla tek güne sığıyor.</p>`,
    kunye: [
      { label: 'İki farklı doku', value: 'Batıkent’te planlı bloklar ve yük asansörü, Demetevler tarafında sıkışık yapı.' },
      { label: 'Ticari adresler', value: 'İvedik ve Ostim’de atölye/depo taşıması yaygın; raf ve makine demontajı gerekiyor.' },
      { label: 'Araç yanaşma', value: 'Bulvar üstü bloklarda sorun yok; iç mahallelerde park yeri önceden ayrılıyor.' },
      { label: 'Ulaşım aksı', value: 'Ana arterlere yakınlık sayesinde batı ve kuzey ilçelerine taşımalar kısa sürüyor.' },
    ],
    guzergahlar: [
      { to: 'Etimesgut', note: 'Batı aksı; düz ve kısa güzergâh.' },
      { to: 'Sincan', note: 'Batıya devam; yol süresi planlanıyor, iş tek günde bitiyor.' },
      { to: 'Çankaya', note: 'Merkeze geçiş; varışta yükleme yeri önceden ayırtılıyor.' },
      { to: 'Keçiören', note: 'Kuzeye geçiş; varış tarafında eğim hesaba katılıyor.' },
    ],
    mahalleler: ['Batıkent', 'Demetevler', 'İvedik', 'Şentepe', 'Ostim', 'Ragıp Tüzün', 'Çamlıca', 'Karşıyaka'],
    sorular: [
      {
        question: 'Ostim’deki atölyemi taşıtmak istiyorum, konut taşımasından farkı ne?',
        answer:
          'Farkı ekipman ve ekip. Raf sistemleri sökülüp numaralanıyor, makineler sabitlenerek taşınıyor. Bu işleri konut taşımasından ayrı planlıyor ve ayrı fiyatlandırıyoruz.',
      },
      {
        question: 'Batıkent’teki sitede araç girişi için izin gerekiyor mu?',
        answer:
          'Çoğu sitede gerekiyor. İzni ve yükleme saatini biz önceden yönetimle görüşüyoruz, böylece araç kapıda beklemiyor.',
      },
      {
        question: 'Taşınma tek günde biter mi?',
        answer:
          'Yenimahalle içindeki ve komşu ilçelere yapılan taşımaların büyük çoğunluğu tek günde tamamlanıyor. Kesin süreyi keşiften sonra yazılı olarak veriyoruz.',
      },
      {
        question: 'Paketleme malzemesini siz mi getiriyorsunuz?',
        answer:
          'Evet. Koli, balonlu naylon, streç ve mobilya battaniyesi ekibimizle birlikte geliyor; talep ederseniz paketlemeyi de biz yapıyoruz.',
      },
    ],
  },

  {
    ad: 'Mamak',
    ozet:
      'Mamak’ta kentsel dönüşümle yenilenen bloklarla eski yapı yan yana; taşıma planı adresten adrese değişiyor.',
    metaAciklama:
      'Mamak evden eve nakliyat: adrese göre planlanan taşıma, sigortalı ambalaj ve yazılı sabit fiyat. Ücretsiz keşif için arayın.',
    govde: `<p>Mamak son yıllarda gözle görülür biçimde değişti. Kentsel dönüşümle yükselen yeni bloklarda yük asansörü ve otopark var; iş bu adreslerde hızlı ilerliyor. Buna karşılık dönüşüme girmemiş kesimlerde eğimli sokaklar, dar merdivenler ve asansörsüz binalar hâlâ yaygın. Aynı mahallede iki bina arasında bile koşullar değişebiliyor, bu yüzden Mamak’ta keşif yapmadan fiyat vermiyoruz.</p><p>İlçenin şehir merkezine yakınlığı taşıma süresini kısaltıyor. Çankaya ve Altındağ yönüne yapılan işler genellikle yarım gün ile bir gün arasında tamamlanıyor. Mamak’ta <strong>evden eve nakliyat</strong> taleplerinde en sık karşılaştığımız durum, dar sokakta aracın manevra yapamaması; bunu önceden görüp aktarma planı kuruyoruz.</p><p>Eğimli adreslerde eşya indirme ve yükleme sırasında zemin kayganlığı önem taşıyor. Yağışlı günlerde ekip sayısını artırıyor, ağır parçalarda kayış ve taşıma askısı kullanıyoruz.</p>`,
    kunye: [
      { label: 'Dönüşüm etkisi', value: 'Yeni bloklarda yük asansörü ve otopark var; dönüşmemiş kesimlerde yok.' },
      { label: 'Eğim', value: 'Yamaç sokaklarda yükleme daha uzun sürüyor, yağışlı günde ek önlem alınıyor.' },
      { label: 'Manevra', value: 'Dar sokaklarda büyük araç dönemiyor; aktarma planı önceden kuruluyor.' },
      { label: 'Merkeze mesafe', value: 'Şehir merkezine yakın; Çankaya ve Altındağ işleri kısa sürüyor.' },
    ],
    guzergahlar: [
      { to: 'Çankaya', note: 'Kısa mesafe; iş çoğunlukla aynı gün bitiyor.' },
      { to: 'Altındağ', note: 'Komşu ilçe; varış tarafında dar sokak planlaması yapılıyor.' },
      { to: 'Elmadağ', note: 'Doğu aksı; kış aylarında gün seçimi hava durumuna göre yapılıyor.' },
      { to: 'Gölbaşı', note: 'Güneye geçiş; varışta müstakil adreslerde ek hacim hesaplanıyor.' },
    ],
    mahalleler: ['Abidinpaşa', 'Akdere', 'Natoyolu', 'Şahintepe', 'Kutludüğün', 'Üreğil'],
    sorular: [
      {
        question: 'Binamız dönüşüme girmedi, asansör yok. Sorun olur mu?',
        answer:
          'Olmaz. Yüksek katlarda dış cephe asansörü kuruyoruz, düşük katlarda ekip sayısını artırıyoruz. İhtiyaç keşifte belirleniyor ve fiyata baştan yansıyor.',
      },
      {
        question: 'Yağmurlu bir güne denk gelirse taşıma yapılıyor mu?',
        answer:
          'Yapılıyor. Eşyalar streç ve naylonla korunuyor, eğimli zeminlerde ek ekip ve taşıma askısı kullanılıyor. Hava çok sertse günü birlikte değiştiriyoruz.',
      },
      {
        question: 'Keşif ücretli mi?',
        answer:
          'Keşif ücretsiz. Ekibimiz adrese gelip eşyayı ve binayı yerinde görüyor, ardından size yazılı ve sabit bir fiyat veriyoruz.',
      },
      {
        question: 'Verilen fiyat sonradan değişir mi?',
        answer:
          'Değişmiyor. Keşif sonrası verilen yazılı fiyat taşıma gününe kadar geçerli kalıyor; keşifte konuşulmayan bir hizmet sonradan eklenmediği sürece fark çıkmıyor.',
      },
    ],
  },

  {
    ad: 'Etimesgut',
    ozet:
      'Eryaman ve Elvankent’in planlı site dokusu Etimesgut’ta taşımayı öngörülebilir kılıyor; asıl konu site giriş izni.',
    metaAciklama:
      'Etimesgut evden eve nakliyat: site izni önceden alınmış, sigortalı ve yazılı sabit fiyatlı taşıma. Ücretsiz keşif için arayın.',
    govde: `<p>Etimesgut, Ankara’da taşıma planlamasının en rahat yapıldığı ilçelerden biri. Eryaman, Elvankent ve Bağlıca hattı büyük ölçüde planlı sitelerden oluşuyor; bloklarda yük asansörü, çevrede geniş yol ve otopark var. Eşyanın araca kadar taşınacağı mesafe kısa olduğu için iş genellikle öngörülen sürede bitiyor.</p><p>Buradaki asıl konu binanın kendisi değil, sitenin kuralları. Çoğu site nakliye aracının girişini önceden bildirime ve belirli saat aralığına bağlıyor, bazıları asansör kullanımı için ayrı izin istiyor. Etimesgut’ta <strong>evden eve nakliyat</strong> planlarken bu izinleri taşımadan önce yönetimle görüşüp yazılı olarak alıyoruz; araç kapıda bekletilmiyor.</p><p>İlçe batı aksının ortasında yer aldığı için Sincan ve Yenimahalle yönündeki taşımalar kısa sürüyor. Merkeze doğru yapılan işlerde ise varış tarafındaki park sorunu hesaba katılıyor.</p>`,
    kunye: [
      { label: 'Yerleşim', value: 'Ağırlıklı planlı siteler; yük asansörü ve geniş yol yaygın.' },
      { label: 'Site izni', value: 'Araç girişi ve asansör kullanımı çoğu sitede önceden izne bağlı.' },
      { label: 'Saat kısıtı', value: 'Bazı sitelerde yükleme belirli saat aralığına sınırlı; iş ona göre planlanıyor.' },
      { label: 'Konum', value: 'Batı aksının ortasında; Sincan ve Yenimahalle taşımaları kısa sürüyor.' },
    ],
    guzergahlar: [
      { to: 'Sincan', note: 'Batıya kısa mesafe; iş yarım günde tamamlanabiliyor.' },
      { to: 'Yenimahalle', note: 'Doğuya geçiş; düz ve trafiksiz güzergâh.' },
      { to: 'Çankaya', note: 'Merkeze taşıma; varışta park yeri önceden ayırtılıyor.' },
      { to: 'Kahramankazan', note: 'Kuzey aksı; yol süresi planlanıyor.' },
    ],
    mahalleler: ['Eryaman', 'Elvankent', 'Bağlıca', 'Göksu', 'Ahi Mesut', 'Alsancak', 'Piyade'],
    sorular: [
      {
        question: 'Sitemiz nakliye aracına belirli saatte izin veriyor, yetişir mi?',
        answer:
          'Yetişiyor. Saat kısıtını keşifte öğrenip ekip ve araç sayısını ona göre ayarlıyoruz. Gerekirse iki araçla eşzamanlı çalışıp süreyi yarıya indiriyoruz.',
      },
      {
        question: 'Site iznini kim alıyor?',
        answer:
          'İzni ve saat ayarlamasını biz yönetimle görüşerek yapıyoruz. Sizden yalnızca yönetimin iletişim bilgisi yeterli.',
      },
      {
        question: 'Mobilyaların sökülüp yeniden kurulması dahil mi?',
        answer:
          'Marangozlu söküm ve montaj hizmetimiz var. Talep ederseniz teklife dahil ediliyor ve yeni adreste mobilyalar kurulmuş hâlde teslim ediliyor.',
      },
      {
        question: 'Eşyalarım bir süre depoda kalabilir mi?',
        answer:
          'Kalabilir. Tarihler arasında boşluk varsa eşyalarınızı depolayıp anlaştığımız günde yeni adrese teslim ediyoruz.',
      },
    ],
  },

  {
    ad: 'Sincan',
    ozet:
      'Merkeze uzaklığı nedeniyle Sincan taşımalarında yol süresi, yükleme süresi kadar belirleyici oluyor.',
    metaAciklama:
      'Sincan evden eve nakliyat: yol süresi hesaplanmış planlama, sigortalı taşıma ve yazılı sabit fiyat. Ücretsiz keşif için arayın.',
    govde: `<p>Sincan’ın Ankara merkezine olan mesafesi, taşıma planının en belirleyici unsuru. Merkez ilçelerle Sincan arasındaki işlerde yol süresi tek başına saatler tutabiliyor; bu yüzden çalışmayı sabah erken başlatıyor, gerekiyorsa iki araçla eşzamanlı ilerliyoruz. Böylece iş aynı güne sığıyor ve ikinci gün ücreti oluşmuyor.</p><p>Yerleşim dokusu büyük ölçüde planlı. Yenikent ve Törekent tarafındaki toplu konutlarda araç bina önüne yanaşabiliyor, çoğu blokta asansör bulunuyor. İlçe merkezinin eski kesimlerinde ise dar sokak ve asansörsüz bina hâlâ karşımıza çıkıyor. Sincan’da <strong>evden eve nakliyat</strong> teklifi verirken bu iki durumu ayrı ayrı değerlendiriyoruz.</p><p>Batı aksındaki komşu ilçelere yapılan taşımalar buna karşılık oldukça kısa. Etimesgut yönündeki işler çoğu zaman yarım günde tamamlanıyor.</p>`,
    kunye: [
      { label: 'Merkeze mesafe', value: 'Merkez ilçelere taşımada yol süresi belirleyici; iş sabah erken başlatılıyor.' },
      { label: 'Toplu konut', value: 'Yenikent ve Törekent tarafında planlı bloklar; araç yanaşması sorunsuz.' },
      { label: 'Eski merkez', value: 'İlçe merkezinin eski kesimlerinde dar sokak ve asansörsüz bina yaygın.' },
      { label: 'Komşu ilçe', value: 'Etimesgut yönündeki taşımalar çoğunlukla yarım günde bitiyor.' },
    ],
    guzergahlar: [
      { to: 'Etimesgut', note: 'Komşu ilçe; kısa mesafe, iş yarım günde tamamlanıyor.' },
      { to: 'Yenimahalle', note: 'Doğu aksı; düz güzergâh, tek günde bitiyor.' },
      { to: 'Çankaya', note: 'Merkeze uzun mesafe; erken başlangıç ve iki araç planlanabiliyor.' },
      { to: 'Kahramankazan', note: 'Kuzeye geçiş; sanayi adreslerinde ek ekipman gerekebiliyor.' },
    ],
    mahalleler: ['Fatih', 'Yenikent', 'Törekent', 'Plevne', 'Osmanlı', 'Ayaş Yolu'],
    sorular: [
      {
        question: 'Sincan’dan Çankaya’ya taşınma tek günde biter mi?',
        answer:
          'Genellikle biter. Yol süresi uzun olduğu için işi sabah erken başlatıyoruz; eşya çoksa iki araçla eşzamanlı çalışarak günü aşmıyoruz.',
      },
      {
        question: 'Uzun mesafe fiyatı ne kadar etkiliyor?',
        answer:
          'Yol süresi ve yakıt fiyata giriyor. Kesin tutarı keşiften sonra yazılı veriyoruz; taşıma gününe kadar değişmiyor.',
      },
      {
        question: 'Beyaz eşyaların sökümü yapılıyor mu?',
        answer:
          'Yapılıyor. Çamaşır makinesi tamburu sabitleniyor, buzdolabı taşıma öncesi hazırlanıyor ve yeni adreste bağlantıları kuruluyor.',
      },
      {
        question: 'Hafta sonu taşınabilir miyim?',
        answer:
          'Taşınabilirsiniz. Hafta sonu talebin yoğun olduğu bir dönem; uygun gün bulmak için birkaç gün önceden planlama yapmanızı öneriyoruz.',
      },
    ],
  },

  {
    ad: 'Altındağ',
    ozet:
      'Ankara’nın en eski yerleşimi Altındağ’da dar sokaklar ve tarihi doku, taşımanın küçük araçla ve elle planlanmasını gerektiriyor.',
    metaAciklama:
      'Altındağ evden eve nakliyat: dar sokaklara uygun araç ve ekip planı, sigortalı taşıma, yazılı sabit fiyat. Ücretsiz keşif.',
    govde: `<p>Altındağ, Ankara’nın kurulduğu yer. Ulus ve Hamamönü çevresindeki tarihi doku bugün de büyük ölçüde korunuyor; sokaklar dar, bazı noktalarda araç hiç giremiyor. Bu adreslerde eşyayı belirli bir mesafe elle taşımak gerekiyor ve iş, ekip sayısıyla hızlanıyor. Keşifte ölçtüğümüz ilk şey aracın kapıya ne kadar yaklaşabildiği oluyor.</p><p>İlçenin diğer yüzü ise Siteler. Mobilya üretim ve satışının yoğunlaştığı bu bölgede taşıma çoğunlukla ticari nitelikte: atölye, showroom ve depo işleri. Altındağ’da <strong>evden eve nakliyat</strong> ile ticari taşımayı ayrı planlıyoruz, çünkü ikisi farklı ekipman ve farklı gün düzeni istiyor.</p><p>Aydınlıkevler yönündeki konut dokusu daha standart; buradaki apartmanlarda araç yanaşması ve asansör kullanımı genellikle sorun çıkarmıyor.</p>`,
    kunye: [
      { label: 'Tarihi doku', value: 'Ulus ve Hamamönü çevresinde sokaklar dar; bazı adreslere araç giremiyor.' },
      { label: 'Elle taşıma', value: 'Araç uzağa park ettiğinde eşya belirli mesafe elle taşınıyor, ekip sayısı artırılıyor.' },
      { label: 'Siteler', value: 'Mobilya üretim bölgesi; atölye ve depo taşımaları yaygın.' },
      { label: 'Konut kesimi', value: 'Aydınlıkevler tarafında yapı daha standart, yanaşma ve asansör sorunsuz.' },
    ],
    guzergahlar: [
      { to: 'Keçiören', note: 'Komşu ilçe; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Mamak', note: 'Doğuya geçiş; varış tarafında eğim planlanıyor.' },
      { to: 'Çankaya', note: 'Merkez aksı; varışta park yeri önceden ayırtılıyor.' },
      { to: 'Pursaklar', note: 'Kuzey hattı; varışta yeni bloklarda yükleme kolay.' },
    ],
    mahalleler: ['Ulus', 'Hamamönü', 'Siteler', 'Aydınlıkevler', 'Solfasol', 'Hacettepe'],
    sorular: [
      {
        question: 'Sokağımıza kamyon giremiyor, ne yapıyorsunuz?',
        answer:
          'Yükü sokağın girebildiğimiz en yakın noktasına kadar küçük araçla getiriyor, kalan mesafeyi ekiple elle taşıyoruz. Bu mesafe keşifte ölçülüyor ve fiyata baştan dahil ediliyor.',
      },
      {
        question: 'Siteler’deki dükkânımı taşıtabilir miyim?',
        answer:
          'Taşıtabilirsiniz. Ticari taşımalarda raf ve tezgâh sökümü, ağır parça taşıma ve depolama ayrı planlanıyor; teklif de ayrı veriliyor.',
      },
      {
        question: 'Tarihi binada taşıma yapmak sorun oluyor mu?',
        answer:
          'Dar merdiven ve alçak kapı nedeniyle bazı mobilyaların sökülmesi gerekiyor. Marangozumuz bunu yerinde yapıyor ve yeni adreste yeniden kuruyor.',
      },
      {
        question: 'Ne kadar önceden randevu almalıyım?',
        answer:
          'Birkaç gün önceden planlamak yeterli. Ay sonu ve hafta sonu için daha erken haber vermenizi öneriyoruz, o günler hızlı doluyor.',
      },
    ],
  },

  {
    ad: 'Pursaklar',
    ozet:
      'Nispeten yeni bir yerleşim olan Pursaklar’da bloklar düzenli; taşımada belirleyici olan merkeze olan yol süresi.',
    metaAciklama:
      'Pursaklar evden eve nakliyat: düzenli blok yerleşimine uygun hızlı taşıma, sigortalı ambalaj ve yazılı sabit fiyat.',
    govde: `<p>Pursaklar, Ankara’nın görece yeni ilçelerinden. Yapı stoğunun büyük bölümü son yıllarda yükseldiği için bloklar düzenli, yollar geniş ve araç bina önüne rahat yanaşıyor. Asansörlerin çoğu eşya kabul edecek ölçüde; bu da yükleme süresini kısaltıyor ve teklifin öngörülebilir olmasını sağlıyor.</p><p>İşin belirleyici tarafı merkeze olan mesafe. Çankaya ve batı ilçelerine yapılan taşımalarda yol süresi hesaba giriyor; bu nedenle işi sabah erken başlatıyoruz. Buna karşılık Keçiören ve Altındağ yönündeki taşımalar kısa sürüyor. Pursaklar’da <strong>evden eve nakliyat</strong> taleplerinin önemli bir kısmı zaten bu komşu ilçelerle arasında gerçekleşiyor.</p><p>İlçede genç nüfusun ağırlıklı olması, taşınan eşya hacmini de etkiliyor: küçük ve orta ölçekli daire taşımaları burada daha yaygın ve bu işler çoğunlukla yarım günde tamamlanıyor.</p>`,
    kunye: [
      { label: 'Yapı stoğu', value: 'Ağırlıklı yeni bloklar; geniş yol, eşya kabul eden asansör.' },
      { label: 'Merkeze mesafe', value: 'Çankaya ve batı ilçelerine taşımada yol süresi hesaba giriyor.' },
      { label: 'Komşu ilçeler', value: 'Keçiören ve Altındağ yönündeki işler kısa sürüyor.' },
      { label: 'Hacim', value: 'Küçük ve orta ölçekli daire taşımaları yaygın; çoğu yarım günde bitiyor.' },
    ],
    guzergahlar: [
      { to: 'Keçiören', note: 'Komşu ilçe; kısa mesafe, varışta eğim planlanıyor.' },
      { to: 'Altındağ', note: 'Güneye geçiş; iş aynı gün tamamlanıyor.' },
      { to: 'Kahramankazan', note: 'Kuzeybatı aksı; düz güzergâh.' },
      { to: 'Çankaya', note: 'Merkeze uzun mesafe; erken başlangıç planlanıyor.' },
    ],
    mahalleler: ['Merkez', 'Saray', 'Altınova', 'Sirkeli'],
    sorular: [
      {
        question: '1+1 dairemi taşıtmak istiyorum, küçük iş yapıyor musunuz?',
        answer:
          'Yapıyoruz. Küçük hacimli taşımalar için daha az ekip ve uygun ölçüde araç planlıyoruz; bu işler genellikle yarım günde bitiyor ve fiyatı da ona göre oluyor.',
      },
      {
        question: 'Eşyalarımı ben paketlesem fiyat düşer mi?',
        answer:
          'Düşer. Ambalaj hizmetini almadığınızda teklif buna göre hesaplanıyor. Kırılacak eşyaların paketlemesini yine de bize bırakmanızı öneriyoruz.',
      },
      {
        question: 'Asansör kullanımı için izin gerekiyor mu?',
        answer:
          'Bazı bloklarda gerekiyor. Yönetimden izni biz alıyoruz; taşıma günü asansörün müsait olması için saat de önceden ayarlanıyor.',
      },
      {
        question: 'Taşıma sırasında bir eşya zarar görürse ne oluyor?',
        answer:
          'Taşımalar sigortalı. Böyle bir durumda zarar sigorta kapsamında karşılanıyor; kapsamın sınırları sözleşmede açıkça yazılı.',
      },
    ],
  },

  {
    ad: 'Gölbaşı',
    ozet:
      'Müstakil evler ve villa siteleriyle Gölbaşı’nda taşınan hacim, aynı oda sayısındaki bir daireye göre belirgin şekilde büyük oluyor.',
    metaAciklama:
      'Gölbaşı evden eve nakliyat: villa ve müstakil ev taşımasına uygun ekip, sigortalı ambalaj, yazılı sabit fiyat. Ücretsiz keşif.',
    govde: `<p>Gölbaşı’nda taşınma hesabı diğer ilçelerden farklı kurulur. Yerleşimin önemli bir kısmı müstakil ev ve villa sitelerinden oluşuyor; bu adreslerde daire ölçüsüne bakarak fiyat vermek yanıltıcı olur. Bahçe mobilyası, depo, kömürlük ve çoğu zaman ikinci bir kat, taşınan hacmi ciddi biçimde büyütüyor. Keşifte evin tamamını, eklentileriyle birlikte görüyoruz.</p><p>Buna karşılık erişim genellikle rahat. Yollar geniş, bahçeli evlerin çoğunda araç kapıya kadar yanaşabiliyor ve merdiven sorunu yaşanmıyor. Gölbaşı’nda <strong>evden eve nakliyat</strong> işlerinin süresini uzatan şey erişim değil, hacim; bu yüzden ekip ve araç sayısını buna göre planlıyoruz.</p><p>Göl çevresindeki yerleşimin bir bölümü mevsimlik kullanılıyor. İkinci konut taşımalarında eşyanın bir kısmının depolanması sık talep ediliyor ve bunu aynı teklifin içinde çözüyoruz.</p>`,
    kunye: [
      { label: 'Konut tipi', value: 'Müstakil ev ve villa yaygın; bahçe, depo ve kömürlük eşyası hacme ekleniyor.' },
      { label: 'Erişim', value: 'Yollar geniş, araç çoğu adreste kapıya yanaşabiliyor.' },
      { label: 'İki katlı yapı', value: 'Villa taşımalarında ikinci kat ekip sayısını ve süreyi artırıyor.' },
      { label: 'İkinci konut', value: 'Göl çevresinde mevsimlik kullanım var; depolama sık talep ediliyor.' },
    ],
    guzergahlar: [
      { to: 'Çankaya', note: 'Kuzeye geçiş; varışta park yeri önceden ayırtılıyor.' },
      { to: 'Mamak', note: 'Kuzeydoğu aksı; iş tek günde tamamlanıyor.' },
      { to: 'Elmadağ', note: 'Doğu aksı; kışın gün seçimi hava durumuna göre yapılıyor.' },
      { to: 'Etimesgut', note: 'Batıya uzun mesafe; erken başlangıç planlanıyor.' },
    ],
    mahalleler: ['İncek', 'Karşıyaka', 'Bahçelievler', 'Gazi Osman Paşa', 'Seğmenler'],
    sorular: [
      {
        question: 'Villa taşımasında fiyat neye göre belirleniyor?',
        answer:
          'Oda sayısına değil toplam hacme. Bahçe eşyası, depo ve kömürlük dahil ediliyor; bu yüzden keşifte evin tamamını eklentileriyle birlikte görmemiz gerekiyor.',
      },
      {
        question: 'Bahçe mobilyalarını da taşıyor musunuz?',
        answer:
          'Taşıyoruz. Bahçe takımları, barbekü, çocuk oyun grubu gibi parçalar ayrıca ambalajlanıyor ve hacim hesabına dahil ediliyor.',
      },
      {
        question: 'Eşyalarımın bir kısmını depoda tutabilir miyim?',
        answer:
          'Tutabilirsiniz. İkinci konut taşımalarında sık talep edilen bir hizmet; depolama süresi ve teslim günü teklifte yazılı oluyor.',
      },
      {
        question: 'Kaç kişilik ekip geliyor?',
        answer:
          'Ekip sayısını hacim belirliyor. Villa taşımalarında genellikle daha kalabalık ekiple çalışıyoruz ki iş aynı güne sığsın.',
      },
    ],
  },

  {
    ad: 'Polatlı',
    ozet:
      'Ankara merkezine uzaklığı ve ova güzergâhı, Polatlı taşımalarını şehirlerarası bir plana yaklaştırıyor.',
    metaAciklama:
      'Polatlı evden eve nakliyat: uzun mesafeye göre planlanmış taşıma, sigortalı ambalaj ve yazılı sabit fiyat. Ücretsiz keşif.',
    govde: `<p>Polatlı, Ankara’ya bağlı olmasına rağmen merkeze olan mesafesi nedeniyle planlaması şehirlerarası bir taşımaya benziyor. Yol süresi tek başına işin önemli bir bölümünü kaplıyor; bu yüzden çalışmayı gün doğarken başlatıyor ve eşya çoksa ikinci bir araç devreye alıyoruz. Amaç işi aynı güne sığdırmak, çünkü güne yayılan her taşıma maliyeti artırıyor.</p><p>Güzergâhın ova üzerinden gitmesi bir avantaj: yol düz, ağır araç için engel yok ve süre öngörülebilir. İlçe merkezindeki yerleşim de büyük ölçüde düzenli; sokaklar geniş, araç bina önüne yanaşabiliyor. Polatlı’da <strong>evden eve nakliyat</strong> işlerinde asıl planlama konusu bina değil, mesafe oluyor.</p><p>İlçede tarım ve tarımsal ticaretin ağırlığı, konut dışı taşıma taleplerini de artırıyor. Depo ve işyeri taşımalarında ağır ekipman için ayrı planlama yapıyoruz.</p>`,
    kunye: [
      { label: 'Merkeze mesafe', value: 'Ankara merkezine uzak; planlama şehirlerarası taşımaya benziyor.' },
      { label: 'Güzergâh', value: 'Ova üzerinden düz yol; ağır araç için engel yok, süre öngörülebilir.' },
      { label: 'İlçe merkezi', value: 'Sokaklar geniş, araç bina önüne yanaşabiliyor.' },
      { label: 'Ticari taşıma', value: 'Tarımsal ticaret nedeniyle depo ve işyeri taşımaları da yaygın.' },
    ],
    guzergahlar: [
      { to: 'Sincan', note: 'Ankara yönünde ilk durak; yol süresi planlanıyor.' },
      { to: 'Etimesgut', note: 'Batı aksı üzerinden; iş tek günde tamamlanıyor.' },
      { to: 'Çankaya', note: 'Merkeze uzun mesafe; erken başlangıç ve iki araç planlanabiliyor.' },
      { to: 'Haymana', note: 'Güneye geçiş; yol süresi hesaba katılıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Polatlı’dan Ankara merkezine taşınma kaç gün sürer?',
        answer:
          'Çoğunlukla tek gün. İşi sabah çok erken başlatıyoruz; eşya fazlaysa iki araçla eşzamanlı çalışarak günü aşmıyoruz.',
      },
      {
        question: 'Uzun mesafede eşyalar zarar görür mü?',
        answer:
          'Görmemesi için mobilyalar battaniyeyle sarılıyor, araç içinde kayış ve takozla sabitleniyor. Uzun yolda asıl risk hareket; bu yüzden sabitleme özenli yapılıyor.',
      },
      {
        question: 'Şehirlerarası taşıma da yapıyor musunuz?',
        answer:
          'Yapıyoruz. Polatlı’dan Türkiye’nin her iline taşıma düzenliyoruz; uzun güzergâhlarda yol ve konaklama fiyata baştan dahil ediliyor.',
      },
      {
        question: 'Fiyat teklifi almak için ne yapmam gerekiyor?',
        answer:
          'Bize ulaşmanız yeterli. Ücretsiz keşif için gün belirliyoruz, eşyayı yerinde gördükten sonra yazılı ve sabit bir fiyat veriyoruz.',
      },
    ],
  },

  {
    ad: 'Beypazarı',
    ozet:
      'Tarihi evleri ve dar sokaklarıyla Beypazarı, taşımanın küçük araçla ve mobilya sökümüyle planlanmasını gerektiriyor.',
    metaAciklama:
      'Beypazarı evden eve nakliyat: dar sokak ve tarihi yapıya uygun taşıma planı, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Beypazarı’nda taşımanın karakterini eski kent dokusu belirliyor. Korunmuş konak ve tarihi evlerin bulunduğu sokaklar dar, bazıları yalnızca yaya geçişine uygun. Bu adreslerde büyük araç kullanmak mümkün olmuyor; yükü sokağın girişine kadar küçük araçla getirip kalan mesafeyi ekiple taşıyoruz. Planı önceden kurduğumuzda iş gecikmeden ilerliyor.</p><p>Tarihi yapıların merdivenleri dar ve tavan yükseklikleri değişken. Gardırop, vitrin ve büyük köşe takımı gibi parçaların bir kısmı sökülmeden çıkmıyor. Beypazarı’nda <strong>evden eve nakliyat</strong> işlerinde marangozu ekiple birlikte gönderiyoruz; mobilya yerinde sökülüyor, yeni adreste yeniden kuruluyor.</p><p>İlçenin Ankara merkezine mesafesi de hesaba giriyor. Merkeze yapılan taşımalarda yol süresi nedeniyle işi erken başlatıyor, tek güne sığdırmayı planlıyoruz.</p>`,
    kunye: [
      { label: 'Kent dokusu', value: 'Tarihi konak ve dar sokaklar; bazı adreslere yalnızca yaya erişimi var.' },
      { label: 'Araç ölçüsü', value: 'Büyük kamyon giremiyor; yük küçük araçla sokak girişine kadar getiriliyor.' },
      { label: 'Mobilya sökümü', value: 'Dar merdiven nedeniyle büyük parçalar yerinde sökülüyor, varışta kuruluyor.' },
      { label: 'Merkeze mesafe', value: 'Ankara merkezine uzak; yol süresi plana dahil ediliyor.' },
    ],
    guzergahlar: [
      { to: 'Ayaş', note: 'Komşu ilçe; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Nallıhan', note: 'Batıya devam; uzun güzergâh, erken başlangıç planlanıyor.' },
      { to: 'Sincan', note: 'Ankara yönü; yol süresi hesaba katılıyor.' },
      { to: 'Güdül', note: 'Kuzeye geçiş; dar yollarda küçük araç tercih ediliyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Tarihi evimizin merdiveni çok dar, mobilyalar çıkar mı?',
        answer:
          'Büyük parçalar genellikle sökülerek çıkarılıyor. Marangozumuz ekiple birlikte geliyor, mobilyayı yerinde söküyor ve yeni adreste aynı şekilde kuruyor.',
      },
      {
        question: 'Sokağımıza araç giremiyor, ek ücret çıkar mı?',
        answer:
          'Elle taşınacak mesafe keşifte ölçülüp fiyata baştan dahil ediliyor. Taşıma günü sürpriz bir ek ücret çıkmıyor.',
      },
      {
        question: 'Ankara merkezine taşınma ne kadar sürüyor?',
        answer:
          'Yol süresi nedeniyle iş sabah erken başlıyor ve çoğunlukla aynı gün tamamlanıyor. Kesin süreyi keşiften sonra söylüyoruz.',
      },
      {
        question: 'Kırılacak eşyalar nasıl paketleniyor?',
        answer:
          'Cam, porselen ve tablo gibi parçalar balonlu naylonla tek tek sarılıp özel kolilere yerleştiriliyor; koliler araçta ayrı bölümde taşınıyor.',
      },
    ],
  },

  {
    ad: 'Kızılcahamam',
    ozet:
      'Orman içi yollar ve ikinci konut yoğunluğu Kızılcahamam taşımalarında mevsimi ve araç ölçüsünü öne çıkarıyor.',
    metaAciklama:
      'Kızılcahamam evden eve nakliyat: orman yolu ve mevsim koşullarına göre planlanan taşıma, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Kızılcahamam’da taşımanın planı büyük ölçüde yola ve mevsime bağlı. İlçe orman içinde ve yerleşimin bir bölümüne dar, virajlı yollardan ulaşılıyor. Bu güzergâhlarda büyük araç kullanmak hem zor hem riskli; adrese göre orta ölçekli araç tercih ediyor, gerekiyorsa aktarma yapıyoruz.</p><p>Kış aylarında kar ve buzlanma yol süresini uzatıyor, bazı günlerde ulaşımı tamamen sorunlu hâle getiriyor. Bu yüzden Kızılcahamam’da <strong>evden eve nakliyat</strong> günü belirlenirken hava durumuna bakıyor, gerekirse tarihi birlikte değiştiriyoruz. Baharda ve yazın ise iş öngörülebilir ilerliyor.</p><p>İlçedeki termal tesis ve yazlık konut yoğunluğu, mevsimlik taşıma taleplerini artırıyor. İkinci konut işlerinde eşyanın bir kısmının depolanması sık gündeme geliyor ve bunu aynı teklifin içinde planlıyoruz.</p>`,
    kunye: [
      { label: 'Yol yapısı', value: 'Orman içi dar ve virajlı yollar; adrese göre orta ölçekli araç tercih ediliyor.' },
      { label: 'Kış koşulları', value: 'Kar ve buzlanma yol süresini uzatıyor; gün seçimi havaya göre yapılıyor.' },
      { label: 'İkinci konut', value: 'Yazlık ve termal çevresi yerleşim; mevsimlik taşıma talebi yüksek.' },
      { label: 'Depolama', value: 'İkinci konut işlerinde eşyanın bir kısmı için depolama sık talep ediliyor.' },
    ],
    guzergahlar: [
      { to: 'Çamlıdere', note: 'Komşu ilçe; orman yolu, küçük araç tercih ediliyor.' },
      { to: 'Kahramankazan', note: 'Ankara yönü; yol süresi planlanıyor.' },
      { to: 'Çubuk', note: 'Doğuya geçiş; iş tek günde tamamlanıyor.' },
      { to: 'Keçiören', note: 'Merkeze iniş; varış tarafında eğim hesaba katılıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Kış aylarında taşıma yapıyor musunuz?',
        answer:
          'Yapıyoruz, ancak günü hava durumuna göre seçiyoruz. Kar ve buzlanma varsa yolu ve süreyi baştan farklı planlıyor, gerekirse tarihi birlikte değiştiriyoruz.',
      },
      {
        question: 'Yazlığımdaki eşyaların bir kısmını depoya alabilir misiniz?',
        answer:
          'Alabiliriz. Hangi eşyanın taşınıp hangisinin depolanacağını keşifte birlikte belirliyoruz; ikisi de tek teklifte yer alıyor.',
      },
      {
        question: 'Dar orman yolundan kamyon geçebilir mi?',
        answer:
          'Her adreste geçemiyor. Yolu keşifte değerlendirip uygun ölçüde araç seçiyoruz; gerekirse yükü daha küçük bir araçla aktarıyoruz.',
      },
      {
        question: 'Taşıma öncesi ne kadar hazırlık yapmam gerekiyor?',
        answer:
          'Ambalaj hizmetini alırsanız hiçbir hazırlık gerekmiyor; koliden bantına kadar her şeyi biz getiriyoruz. Kendiniz paketlemek isterseniz malzemeyi yine biz sağlıyoruz.',
      },
    ],
  },

  {
    ad: 'Çubuk',
    ozet:
      'Ankara’ya yakın bir ilçe merkezi olan Çubuk’ta taşıma, merkez ile kırsal mahalleler arasında ikiye ayrılıyor.',
    metaAciklama:
      'Çubuk evden eve nakliyat: ilçe merkezi ve kırsal adreslere uygun taşıma planı, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Çubuk’ta iki farklı taşıma düzeni var. İlçe merkezinde yerleşim düzenli, sokaklar araç geçişine uygun ve apartmanlarda yükleme sorunsuz ilerliyor. Merkez dışındaki kırsal mahallelerde ise yollar daralıyor, bazı adreslerde müstakil ev ve bahçe eşyası hacmi büyütüyor. Teklif verirken bu ikisini ayrı değerlendiriyoruz.</p><p>İlçenin Ankara’ya yakınlığı önemli bir avantaj. Keçiören ve Altındağ yönündeki taşımalar kısa sürüyor, çoğu iş tek günde bitiyor. Çubuk’ta <strong>evden eve nakliyat</strong> talebinin büyük bölümü de zaten bu yakın güzergâhlarda gerçekleşiyor.</p><p>Kırsal adreslerde tarım aracı, depo malzemesi ve bahçe eşyası taşınması sık talep ediliyor. Bu parçalar standart mobilyadan farklı ambalaj ve sabitleme gerektiriyor; keşifte ayrıca not ediyoruz.</p>`,
    kunye: [
      { label: 'İki düzen', value: 'İlçe merkezinde düzenli yerleşim, kırsal mahallelerde dar yol ve müstakil ev.' },
      { label: 'Ankara’ya yakınlık', value: 'Keçiören ve Altındağ yönündeki taşımalar kısa sürüyor.' },
      { label: 'Kırsal hacim', value: 'Müstakil evlerde bahçe ve depo eşyası hacmi belirgin şekilde artırıyor.' },
      { label: 'Özel parçalar', value: 'Tarım aracı ve depo malzemesi farklı ambalaj ve sabitleme gerektiriyor.' },
    ],
    guzergahlar: [
      { to: 'Keçiören', note: 'Ankara yönü; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Akyurt', note: 'Komşu ilçe; düz güzergâh.' },
      { to: 'Kalecik', note: 'Doğuya geçiş; yol süresi planlanıyor.' },
      { to: 'Kızılcahamam', note: 'Batıya geçiş; kışın gün seçimi havaya göre yapılıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Köydeki evimden taşınma yapıyor musunuz?',
        answer:
          'Yapıyoruz. Yol durumunu keşifte değerlendirip uygun ölçüde araç seçiyoruz. Bahçe ve depo eşyası varsa hacme dahil ediyoruz.',
      },
      {
        question: 'Ankara merkezine taşınma tek günde biter mi?',
        answer:
          'Biter. Mesafe kısa olduğu için Keçiören ve Altındağ yönündeki işlerin neredeyse tamamı aynı gün tamamlanıyor.',
      },
      {
        question: 'Bahçe ve depo eşyaları da taşınıyor mu?',
        answer:
          'Taşınıyor. Ancak bu parçalar hacmi ciddi biçimde artırıyor; keşifte mutlaka gösterin ki fiyat baştan doğru çıksın.',
      },
      {
        question: 'Sözleşme yapıyor musunuz?',
        answer:
          'Her taşıma için yazılı sözleşme düzenliyoruz. Fiyat, tarih, hizmet kapsamı ve sigorta koşulları sözleşmede açıkça yer alıyor.',
      },
    ],
  },

  {
    ad: 'Elmadağ',
    ozet:
      'Rakımı ve kış koşulları Elmadağ taşımalarında gün seçimini eşya hacminden daha belirleyici hâle getiriyor.',
    metaAciklama:
      'Elmadağ evden eve nakliyat: kış koşullarına göre planlanan taşıma, sigortalı ambalaj ve yazılı sabit fiyat. Ücretsiz keşif.',
    govde: `<p>Elmadağ’da taşıma planının merkezinde hava var. İlçenin rakımı yüksek ve kış aylarında kar ile buzlanma yol süresini belirgin biçimde uzatıyor. Bu dönemde ağır araçla yokuş çıkmak riskli olabiliyor; gün seçimini hava durumuna göre yapıyor, gerekirse tarihi birlikte kaydırıyoruz. Yazın ise iş standart bir ilçe taşımasından farksız ilerliyor.</p><p>Yerleşim büyük ölçüde ilçe merkezinde toplanmış. Sokaklar araç geçişine uygun, binaların çoğu düşük katlı; bu da yükleme süresini kısaltıyor. Elmadağ’da <strong>evden eve nakliyat</strong> işlerinde asansör sorunu nadiren gündeme geliyor, çünkü yüksek kat sayısı düşük.</p><p>Ankara merkezine olan bağlantı düzgün bir yol üzerinden sağlanıyor. Mamak ve Çankaya yönündeki taşımalar, kış dışındaki aylarda tek günde rahatlıkla tamamlanıyor.</p>`,
    kunye: [
      { label: 'Rakım', value: 'Yüksek rakım; kışın kar ve buzlanma yol süresini uzatıyor.' },
      { label: 'Gün seçimi', value: 'Kış aylarında tarih hava durumuna göre belirleniyor.' },
      { label: 'Yapı', value: 'Binalar ağırlıklı düşük katlı; asansör sorunu nadir gündeme geliyor.' },
      { label: 'Ankara bağlantısı', value: 'Mamak ve Çankaya yönü kış dışında tek günde tamamlanıyor.' },
    ],
    guzergahlar: [
      { to: 'Mamak', note: 'Ankara yönü; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Çankaya', note: 'Merkeze geçiş; varışta park yeri önceden ayırtılıyor.' },
      { to: 'Bala', note: 'Güneye geçiş; yol süresi hesaba katılıyor.' },
      { to: 'Kalecik', note: 'Kuzeydoğu aksı; kışın gün seçimi havaya bağlı.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Kışın taşınmak zorundayım, risk var mı?',
        answer:
          'Planlı yapıldığında yok. Yolu ve havayı önceden değerlendiriyor, eşyaları neme karşı ekstra koruyoruz. Hava çok sertse günü birlikte değiştirmeyi öneriyoruz.',
      },
      {
        question: 'Kış taşıması daha mı pahalı?',
        answer:
          'Yol süresi uzadığı ve ek koruma gerektiği için maliyeti bir miktar etkileyebiliyor. Tutar keşiften sonra yazılı veriliyor ve sonradan değişmiyor.',
      },
      {
        question: 'Ankara’ya taşınma ne kadar sürer?',
        answer:
          'Kış dışındaki aylarda Mamak ve Çankaya yönündeki işler tek günde tamamlanıyor. Kışın süre hava koşullarına göre değişebiliyor.',
      },
      {
        question: 'Eşyalar nemden nasıl korunuyor?',
        answer:
          'Mobilyalar battaniyeyle sarılıp streçle kapatılıyor, koliler araçta yerden yükseltilerek istifleniyor. Yağış varsa yükleme sırasında ayrıca örtü kullanılıyor.',
      },
    ],
  },

  {
    ad: 'Akyurt',
    ozet:
      'Sanayi tesisleri ve havalimanı yakınlığıyla Akyurt’ta konut taşımaları kadar işyeri taşımaları da yaygın.',
    metaAciklama:
      'Akyurt evden eve nakliyat ve işyeri taşıma: sigortalı, planlı ve yazılı sabit fiyatlı hizmet. Ücretsiz keşif için arayın.',
    govde: `<p>Akyurt’un karakterini sanayi belirliyor. İlçede üretim tesisleri ve depo alanları yoğun; bu da taşıma taleplerinin önemli bir bölümünü ticari hâle getiriyor. İşyeri taşımalarında raf sökümü, makine sabitlemesi ve ağır parça taşıma devreye giriyor ve bunlar konut işinden ayrı ekipman gerektiriyor. İki hizmeti ayrı planlıyor, ayrı fiyatlandırıyoruz.</p><p>Konut tarafında yerleşim düzenli. Sokaklar geniş, araç bina önüne yanaşabiliyor ve bina yükseklikleri sınırlı. Akyurt’ta <strong>evden eve nakliyat</strong> işlerinde erişim nadiren sorun oluyor; süreyi belirleyen şey daha çok eşya hacmi.</p><p>Havalimanına ve kuzey ana arterlere yakınlık, ilçeler arası taşımalarda yol süresini kısaltıyor. Çubuk ve Pursaklar yönündeki işler çoğunlukla tek günde tamamlanıyor.</p>`,
    kunye: [
      { label: 'Sanayi ağırlığı', value: 'Üretim tesisi ve depo yoğun; işyeri taşıma talebi yüksek.' },
      { label: 'Ticari ekipman', value: 'Raf sökümü ve makine sabitlemesi konut işinden ayrı planlanıyor.' },
      { label: 'Konut erişimi', value: 'Sokaklar geniş, araç yanaşması ve yükleme sorunsuz.' },
      { label: 'Ulaşım', value: 'Kuzey ana arterlere yakın; komşu ilçe taşımaları tek günde bitiyor.' },
    ],
    guzergahlar: [
      { to: 'Çubuk', note: 'Komşu ilçe; düz güzergâh, iş aynı gün bitiyor.' },
      { to: 'Pursaklar', note: 'Ankara yönü; kısa mesafe.' },
      { to: 'Keçiören', note: 'Merkeze iniş; varış tarafında eğim planlanıyor.' },
      { to: 'Kalecik', note: 'Doğuya geçiş; yol süresi hesaba katılıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Fabrikamızı ya da depomuzu taşıtabilir miyiz?',
        answer:
          'Taşıtabilirsiniz. Ticari taşımalarda raf ve tezgâh sökümü, makine sabitlemesi ve ağır parça taşıma ayrı planlanıyor; keşif de bu kapsamda yapılıyor.',
      },
      {
        question: 'İşyeri taşıması hafta sonu yapılabilir mi?',
        answer:
          'Yapılabilir. Üretimin durmaması için işleri çoğunlukla hafta sonuna ya da vardiya dışına planlıyoruz.',
      },
      {
        question: 'Konut taşımasında ne kadar sürüyor?',
        answer:
          'Erişim rahat olduğu için süreyi eşya hacmi belirliyor. Orta ölçekli bir daire genellikle yarım gün ile bir gün arasında tamamlanıyor.',
      },
      {
        question: 'Ağır makineler için özel ekipmanınız var mı?',
        answer:
          'Var. Ağır parçalar için taşıma kızağı, kayış ve gerektiğinde forklift desteği kullanıyoruz. İhtiyaç keşifte belirleniyor.',
      },
    ],
  },

  {
    ad: 'Kahramankazan',
    ozet:
      'Organize sanayi ve toplu konutun bir arada olduğu Kahramankazan’da taşıma planı adres tipine göre değişiyor.',
    metaAciklama:
      'Kahramankazan evden eve nakliyat: konut ve sanayi adreslerine uygun taşıma, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Kahramankazan’da iki tür adres var ve ikisi farklı planlama istiyor. Organize sanayi bölgesindeki işyeri taşımalarında ağır ekipman, raf sistemi ve depo malzemesi söz konusu; bu işler için özel taşıma kızağı ve sabitleme kullanıyoruz. Toplu konut alanlarında ise iş standart bir daire taşımasından farksız ilerliyor.</p><p>Yerleşim büyük ölçüde planlı olduğu için erişim rahat. Yollar geniş, araç bina önüne yanaşabiliyor ve otopark sıkıntısı yaşanmıyor. Kahramankazan’da <strong>evden eve nakliyat</strong> işlerinde asıl değişken bina değil, Ankara merkezine olan mesafe; işleri erken başlatarak tek güne sığdırıyoruz.</p><p>İlçenin kuzeybatı aksında olması, Sincan ve Etimesgut yönündeki taşımaları kısaltıyor. Merkez ilçelere yapılan işlerde ise yol süresi teklifte ayrıca hesaplanıyor.</p>`,
    kunye: [
      { label: 'İki adres tipi', value: 'Organize sanayide işyeri taşıması, toplu konutta standart daire taşıması.' },
      { label: 'Ağır ekipman', value: 'Sanayi adreslerinde taşıma kızağı ve sabitleme ekipmanı kullanılıyor.' },
      { label: 'Erişim', value: 'Planlı yerleşim; geniş yol, araç yanaşması ve otopark sorunsuz.' },
      { label: 'Mesafe', value: 'Merkez ilçelere yol süresi hesaba giriyor; iş erken başlatılıyor.' },
    ],
    guzergahlar: [
      { to: 'Sincan', note: 'Güneybatı aksı; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Etimesgut', note: 'Güneye geçiş; düz güzergâh.' },
      { to: 'Pursaklar', note: 'Doğuya geçiş; yol süresi planlanıyor.' },
      { to: 'Kızılcahamam', note: 'Kuzeye geçiş; kışın gün seçimi havaya bağlı.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Organize sanayideki tesisimizi taşıtabilir miyiz?',
        answer:
          'Taşıtabilirsiniz. Makine ve raf sistemleri için ayrı ekipman ve ekip planlıyoruz; keşif sanayi adresine özel yapılıyor.',
      },
      {
        question: 'Toplu konuttan taşınma nasıl ilerliyor?',
        answer:
          'Erişim rahat olduğu için hızlı ilerliyor. Araç bina önüne yanaşıyor, asansör kullanımı için gerekiyorsa izni biz alıyoruz.',
      },
      {
        question: 'Ankara merkezine taşınma tek günde biter mi?',
        answer:
          'Biter. Yol süresi nedeniyle işi sabah erken başlatıyoruz; eşya çoksa iki araçla eşzamanlı çalışıyoruz.',
      },
      {
        question: 'Depolama hizmetiniz var mı?',
        answer:
          'Var. Tarihler arasında boşluk olduğunda eşyalarınızı depolayıp anlaştığımız günde yeni adrese teslim ediyoruz.',
      },
    ],
  },

  {
    ad: 'Ayaş',
    ozet:
      'Bağ ve bahçe yerleşiminin yaygın olduğu Ayaş’ta taşınan hacim, ev içi eşyanın ötesine geçiyor.',
    metaAciklama:
      'Ayaş evden eve nakliyat: bahçe ve depo eşyası dahil hacim planlaması, sigortalı taşıma, yazılı sabit fiyat.',
    govde: `<p>Ayaş’ta taşınma çoğu zaman yalnızca ev içi eşyayla sınırlı kalmıyor. Bağ, bahçe ve müstakil ev yerleşiminin yaygın olduğu ilçede depo malzemesi, bahçe mobilyası ve tarım aletleri de taşınacaklar listesine giriyor. Bu parçalar hacmi ciddi biçimde büyütüyor; keşifte evin eklentileriyle birlikte görülmesi bu yüzden önemli.</p><p>Yol tarafında ilçe merkezine erişim düzgün, ancak kırsal mahallelere giden bazı yollar dar. Bu adreslerde orta ölçekli araç tercih ediyor, gerekirse aktarma planlıyoruz. Ayaş’ta <strong>evden eve nakliyat</strong> işlerinde süreyi belirleyen şey mesafeden çok bu erişim ve hacim ikilisi oluyor.</p><p>Ankara merkezine ve Beypazarı yönüne yapılan taşımalar düzenli güzergâhlar üzerinden ilerliyor ve çoğunlukla tek günde tamamlanıyor.</p>`,
    kunye: [
      { label: 'Yerleşim', value: 'Bağ, bahçe ve müstakil ev yaygın; taşınan hacim ev içiyle sınırlı kalmıyor.' },
      { label: 'Ek eşya', value: 'Depo malzemesi, bahçe mobilyası ve tarım aleti sık taşınıyor.' },
      { label: 'Kırsal erişim', value: 'Bazı mahalle yolları dar; orta ölçekli araç tercih ediliyor.' },
      { label: 'Güzergâh', value: 'Ankara ve Beypazarı yönü düzenli; işler tek günde tamamlanıyor.' },
    ],
    guzergahlar: [
      { to: 'Beypazarı', note: 'Komşu ilçe; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Sincan', note: 'Ankara yönü; yol süresi planlanıyor.' },
      { to: 'Güdül', note: 'Kuzeye geçiş; dar yollarda küçük araç tercih ediliyor.' },
      { to: 'Etimesgut', note: 'Ankara batı aksı; iş tek günde tamamlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Bahçe eşyalarım da taşınıyor mu?',
        answer:
          'Taşınıyor. Bahçe mobilyası, depo malzemesi ve tarım aletleri hacme dahil ediliyor; keşifte göstermeniz fiyatın baştan doğru çıkması için önemli.',
      },
      {
        question: 'Kırsal mahalleye araç gelebiliyor mu?',
        answer:
          'Yol durumuna göre değişiyor. Keşifte yolu değerlendirip uygun ölçüde araç seçiyoruz; gerekirse yükü küçük araçla aktarıyoruz.',
      },
      {
        question: 'Müstakil ev taşıması ne kadar sürüyor?',
        answer:
          'Hacme bağlı. Eklentileriyle birlikte büyük bir ev için ekip sayısını artırıyoruz ki iş aynı güne sığsın.',
      },
      {
        question: 'Ücretsiz keşif kırsal adreslere de geliyor mu?',
        answer:
          'Geliyor. Keşif için gün belirliyoruz, ekibimiz adrese gelip eşyayı yerinde görüyor ve ardından yazılı fiyat veriliyor.',
      },
    ],
  },

  {
    ad: 'Haymana',
    ozet:
      'Geniş bir alana yayılan yerleşimi nedeniyle Haymana’da il içi mesafeler bile şehirlerarası ölçekte planlanıyor.',
    metaAciklama:
      'Haymana evden eve nakliyat: uzun il içi mesafelere göre planlanan taşıma, sigortalı ambalaj ve yazılı sabit fiyat.',
    govde: `<p>Haymana’da mesafe, taşıma planının en belirleyici unsuru. İlçe geniş bir alana yayılıyor ve merkez ile uzak mahalleler arasındaki yol, başka iki ilçe arasındaki mesafeye denk gelebiliyor. Bu yüzden işi sabah erken başlatıyor, güzergâhı önceden çıkarıyoruz; plansız yapıldığında tek günlük bir taşıma kolayca iki güne yayılıyor.</p><p>Arazi büyük ölçüde açık ve düz; yol yapısı ağır araç için engel oluşturmuyor. İlçe merkezindeki yerleşim de düzenli, binalar düşük katlı ve araç yanaşması sorunsuz. Haymana’da <strong>evden eve nakliyat</strong> işlerinde bina kaynaklı zorluk nadiren gündeme geliyor.</p><p>Termal tesis çevresindeki yerleşimde mevsimlik kullanım var; bu adreslerde eşyanın bir bölümü için depolama sık talep ediliyor ve aynı teklif içinde planlanıyor.</p>`,
    kunye: [
      { label: 'Yayılım', value: 'İlçe geniş alana yayılmış; merkez ile uzak mahalle arası mesafe uzun.' },
      { label: 'Arazi', value: 'Açık ve düz; yol yapısı ağır araç için engel oluşturmuyor.' },
      { label: 'İlçe merkezi', value: 'Düzenli yerleşim, düşük katlı binalar, sorunsuz araç yanaşması.' },
      { label: 'Mevsimlik kullanım', value: 'Termal çevresinde ikinci konut var; depolama sık talep ediliyor.' },
    ],
    guzergahlar: [
      { to: 'Polatlı', note: 'Kuzeybatı aksı; ova yolu, süre öngörülebilir.' },
      { to: 'Gölbaşı', note: 'Ankara yönü; yol süresi planlanıyor.' },
      { to: 'Bala', note: 'Doğuya geçiş; uzun güzergâh, erken başlangıç gerekiyor.' },
      { to: 'Çankaya', note: 'Merkeze uzun mesafe; iki araçla eşzamanlı çalışılabiliyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'İlçe içinde taşınıyorum ama mahallem çok uzak, fiyat nasıl hesaplanıyor?',
        answer:
          'Mesafe fiyata giriyor. Haymana’da il içi bazı güzergâhlar başka ilçeler arası mesafeye denk düşüyor; bunu keşifte hesaplayıp yazılı fiyata yansıtıyoruz.',
      },
      {
        question: 'Taşıma iki güne yayılır mı?',
        answer:
          'Planlı yapıldığında genellikle yayılmıyor. Güzergâhı önceden çıkarıyor ve işi sabah erken başlatıyoruz; eşya çoksa ikinci araç devreye alınıyor.',
      },
      {
        question: 'Uzak mahalleye keşfe geliyor musunuz?',
        answer:
          'Geliyoruz ve keşif ücretsiz. Adresi ve uygun günü bildirmeniz yeterli.',
      },
      {
        question: 'Eşyalarım yolda sabitleniyor mu?',
        answer:
          'Sabitleniyor. Uzun güzergâhta asıl risk hareket; mobilyalar battaniyeyle sarılıp kayış ve takozla araca sabitleniyor.',
      },
    ],
  },

  {
    ad: 'Bala',
    ozet:
      'Yerleşimin geniş bir alana dağıldığı Bala’da taşımanın başarısı, güzergâhın önceden çıkarılmasına bağlı.',
    metaAciklama:
      'Bala evden eve nakliyat: dağınık yerleşime göre planlanan güzergâh, sigortalı taşıma ve yazılı sabit fiyat. Ücretsiz keşif.',
    govde: `<p>Bala’da yerleşim geniş bir alana dağılmış durumda ve mahalleler birbirinden uzak. Bu, taşımada güzergâh planlamasını zorunlu kılıyor: hangi adrese hangi sırayla gidileceği önceden belirlenmezse gün içinde ciddi zaman kaybı oluyor. Keşif sırasında yalnızca eşyayı değil, yolu da değerlendiriyoruz.</p><p>Yapı stoğu ağırlıklı olarak müstakil ve düşük katlı. Bu, merdiven ve asansör sorununu ortadan kaldırıyor; buna karşılık bahçe, depo ve ahır eşyası taşınacak hacmi artırıyor. Bala’da <strong>evden eve nakliyat</strong> teklifi verirken evin içiyle birlikte eklentilerini de hesaba katıyoruz.</p><p>Ankara merkezine olan mesafe nedeniyle merkez ilçelere yapılan taşımalarda işi erken başlatıyoruz. Elmadağ ve Gölbaşı yönündeki işler ise daha kısa sürüyor.</p>`,
    kunye: [
      { label: 'Dağınık yerleşim', value: 'Mahalleler birbirinden uzak; güzergâh önceden çıkarılıyor.' },
      { label: 'Yapı', value: 'Ağırlıklı müstakil ve düşük katlı; merdiven ve asansör sorunu yok.' },
      { label: 'Ek hacim', value: 'Bahçe, depo ve ahır eşyası taşınacak hacmi belirgin şekilde artırıyor.' },
      { label: 'Merkeze mesafe', value: 'Ankara merkezine uzak; iş sabah erken başlatılıyor.' },
    ],
    guzergahlar: [
      { to: 'Elmadağ', note: 'Kuzeye geçiş; iş tek günde tamamlanıyor.' },
      { to: 'Gölbaşı', note: 'Batıya geçiş; düzenli güzergâh.' },
      { to: 'Haymana', note: 'Batıya uzun mesafe; erken başlangıç gerekiyor.' },
      { to: 'Şereflikoçhisar', note: 'Güneydoğu aksı; yol süresi plana dahil ediliyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Mahallem merkeze uzak, keşif için gelir misiniz?',
        answer:
          'Geliriz. Keşif ücretsiz ve uzak adreslere de yapılıyor; adresi bildirdiğinizde uygun bir gün belirliyoruz.',
      },
      {
        question: 'Müstakil evden taşınma nasıl planlanıyor?',
        answer:
          'Ev içiyle birlikte bahçe, depo ve varsa ahır eşyası hacme dahil ediliyor. Ekip sayısını bu toplam hacme göre belirliyoruz.',
      },
      {
        question: 'Ankara merkezine taşınma kaç gün sürer?',
        answer:
          'Genellikle tek gün. Mesafe nedeniyle işi sabah erken başlatıyoruz; eşya fazlaysa ikinci araçla eşzamanlı çalışıyoruz.',
      },
      {
        question: 'Fiyata yol masrafı dahil mi?',
        answer:
          'Dahil. Keşiften sonra verilen yazılı fiyat yol ve yakıt dahil toplam tutardır; taşıma gününe kadar değişmez.',
      },
    ],
  },

  {
    ad: 'Kalecik',
    ozet:
      'Bağcılığıyla bilinen Kalecik’te taşımalar çoğunlukla müstakil evler ve bağ evleri arasında gerçekleşiyor.',
    metaAciklama:
      'Kalecik evden eve nakliyat: müstakil ev ve bağ evi taşımalarına uygun planlama, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Kalecik’te taşınma talebinin büyük bölümü müstakil evler ve bağ evleri arasında gerçekleşiyor. Bu yapı tipinde merdiven ve asansör sorunu neredeyse hiç gündeme gelmiyor; buna karşılık bahçe eşyası, depo malzemesi ve mevsimlik kullanılan parçalar hacmi büyütüyor. Fiyatı doğru çıkarabilmek için keşifte evin eklentilerini de görmemiz gerekiyor.</p><p>İlçe merkezine ulaşım düzgün bir yol üzerinden sağlanıyor, ancak bağ ve kırsal mahallelere giden bazı yollar dar. Kalecik’te <strong>evden eve nakliyat</strong> planlarken adrese göre araç ölçüsü seçiyor, gerekiyorsa yükü daha küçük bir araçla aktarıyoruz.</p><p>Ankara merkezine olan mesafe nedeniyle merkez ilçelere yapılan işlerde yol süresi hesaba giriyor. Çubuk ve Akyurt yönündeki taşımalar ise daha kısa sürüyor.</p>`,
    kunye: [
      { label: 'Konut tipi', value: 'Ağırlıklı müstakil ev ve bağ evi; merdiven sorunu neredeyse yok.' },
      { label: 'Ek hacim', value: 'Bahçe ve depo eşyası ile mevsimlik parçalar hacmi artırıyor.' },
      { label: 'Yol', value: 'İlçe merkezine erişim düzgün; bağ ve kırsal yollar dar.' },
      { label: 'Mesafe', value: 'Merkez ilçelere yol süresi hesaba giriyor; Çubuk ve Akyurt yönü kısa.' },
    ],
    guzergahlar: [
      { to: 'Çubuk', note: 'Batıya geçiş; iş aynı gün bitiyor.' },
      { to: 'Akyurt', note: 'Güneybatı aksı; düz güzergâh.' },
      { to: 'Elmadağ', note: 'Güneye geçiş; kışın gün seçimi havaya bağlı.' },
      { to: 'Keçiören', note: 'Ankara yönü; yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Bağ evimden taşınma yapabilir misiniz?',
        answer:
          'Yapabiliriz. Yolu keşifte değerlendirip uygun ölçüde araç seçiyoruz; dar güzergâhlarda küçük araçla aktarma planlıyoruz.',
      },
      {
        question: 'Depo ve bahçe eşyası hacme dahil mi?',
        answer:
          'Dahil. Bu parçalar toplam hacmi belirgin şekilde artırdığı için keşifte mutlaka gösterilmesi gerekiyor.',
      },
      {
        question: 'Mevsimlik eşyalarımı depolayabilir misiniz?',
        answer:
          'Depolayabiliriz. Hangi eşyanın taşınıp hangisinin depoda kalacağını birlikte belirliyoruz; ikisi tek teklifte yer alıyor.',
      },
      {
        question: 'Taşıma sigortalı mı?',
        answer:
          'Bütün taşımalarımız sigortalı. Kapsam sözleşmede yazılı oluyor ve hassas parçalar için ayrıca özel ambalaj kullanılıyor.',
      },
    ],
  },

  {
    ad: 'Çamlıdere',
    ozet:
      'Orman içi konumu ve kış koşullarıyla Çamlıdere’de taşıma günü, eşya hacminden önce hava durumuna göre belirleniyor.',
    metaAciklama:
      'Çamlıdere evden eve nakliyat: orman yolu ve kış koşullarına göre planlanan taşıma, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Çamlıdere’de taşımanın önündeki asıl değişken hava ve yol. İlçe orman içinde yer alıyor; ulaşım dar ve virajlı güzergâhlar üzerinden sağlanıyor. Bu yollarda büyük araçla ilerlemek her zaman mümkün olmuyor, bu yüzden adrese göre orta ölçekli araç tercih ediyor ya da aktarma planlıyoruz.</p><p>Kış aylarında kar yolu kapatabiliyor ve süreyi öngörülemez hâle getiriyor. Çamlıdere’de <strong>evden eve nakliyat</strong> günü belirlenirken hava tahminini birlikte değerlendiriyor, gerekirse tarihi kaydırıyoruz; zorlayarak yapılan bir taşıma hem riskli hem pahalı oluyor.</p><p>Yerleşim ağırlıklı olarak müstakil ve düşük katlı. Bu, bina kaynaklı zorlukları ortadan kaldırıyor; taşınan hacmi belirleyen şey daha çok bahçe ve depo eşyası oluyor.</p>`,
    kunye: [
      { label: 'Konum', value: 'Orman içi yerleşim; ulaşım dar ve virajlı yollardan sağlanıyor.' },
      { label: 'Araç ölçüsü', value: 'Büyük araç her adrese çıkamıyor; orta ölçekli araç ya da aktarma tercih ediliyor.' },
      { label: 'Kış', value: 'Kar yolu kapatabiliyor; gün seçimi hava tahminine göre yapılıyor.' },
      { label: 'Yapı', value: 'Müstakil ve düşük katlı; hacmi bahçe ve depo eşyası belirliyor.' },
    ],
    guzergahlar: [
      { to: 'Kızılcahamam', note: 'Komşu ilçe; orman yolu, küçük araç tercih ediliyor.' },
      { to: 'Güdül', note: 'Güneybatı aksı; dar yol, süre planlanıyor.' },
      { to: 'Kahramankazan', note: 'Ankara yönü; yol süresi hesaba katılıyor.' },
      { to: 'Çubuk', note: 'Doğuya geçiş; kışın gün seçimi havaya bağlı.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Kışın yol kapanırsa taşıma ne oluyor?',
        answer:
          'Günü önceden hava tahminine göre seçiyoruz. Yol kapanma riski varsa tarihi birlikte kaydırıyoruz; zorlamak hem riskli hem maliyetli oluyor.',
      },
      {
        question: 'Dar orman yolundan araç geçebilir mi?',
        answer:
          'Her güzergâhta büyük araç geçemiyor. Keşifte yolu değerlendirip uygun ölçüde araç seçiyor, gerekirse aktarma yapıyoruz.',
      },
      {
        question: 'Müstakil evden taşınma nasıl fiyatlanıyor?',
        answer:
          'Toplam hacme göre. Bahçe ve depo eşyası da dahil edildiği için keşifte evin tamamının görülmesi gerekiyor.',
      },
      {
        question: 'Ne kadar önceden haber vermeliyim?',
        answer:
          'Birkaç gün yeterli, ancak kış aylarında hava koşullarına göre esneklik kalması için biraz daha erken planlamanızı öneriyoruz.',
      },
    ],
  },

  {
    ad: 'Güdül',
    ozet:
      'Vadi yerleşimi ve dar bağlantı yolları Güdül’de araç seçimini taşımanın ilk kararı hâline getiriyor.',
    metaAciklama:
      'Güdül evden eve nakliyat: dar yollara uygun araç planı, sigortalı ambalaj ve yazılı sabit fiyat. Ücretsiz keşif için arayın.',
    govde: `<p>Güdül’de ilk karar araç ölçüsüdür. Vadi içine kurulmuş yerleşime ulaşan yollar dar ve yer yer eğimli; büyük kamyonla her adrese çıkmak mümkün olmuyor. Keşifte yolu görüp uygun aracı seçiyor, gerekiyorsa yükü ana yolda daha küçük bir araca aktarıyoruz. Bu plan önceden kurulduğunda taşıma gecikmeden ilerliyor.</p><p>Yapı stoğu ağırlıklı müstakil ve bahçeli. Merdiven ve asansör sorunu yok denecek kadar az; buna karşılık bahçe eşyası ve depo malzemesi hacme ekleniyor. Güdül’de <strong>evden eve nakliyat</strong> teklifi hazırlarken evin eklentilerini de görmemiz gerekiyor.</p><p>Ankara merkezine olan mesafe nedeniyle merkez ilçelere yapılan taşımalarda işi erken başlatıyoruz. Beypazarı ve Ayaş yönündeki işler ise kısa sürede tamamlanıyor.</p>`,
    kunye: [
      { label: 'Vadi yerleşimi', value: 'Bağlantı yolları dar ve yer yer eğimli; büyük araç her adrese çıkamıyor.' },
      { label: 'Araç seçimi', value: 'Yol keşifte görülüyor; gerekirse ana yolda küçük araca aktarma yapılıyor.' },
      { label: 'Yapı', value: 'Müstakil ve bahçeli evler yaygın; merdiven sorunu neredeyse yok.' },
      { label: 'Komşu ilçeler', value: 'Beypazarı ve Ayaş yönündeki taşımalar kısa sürüyor.' },
    ],
    guzergahlar: [
      { to: 'Beypazarı', note: 'Güneybatı aksı; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Ayaş', note: 'Güneye geçiş; dar yollarda küçük araç tercih ediliyor.' },
      { to: 'Çamlıdere', note: 'Kuzeydoğu aksı; orman yolu, süre planlanıyor.' },
      { to: 'Sincan', note: 'Ankara yönü; yol süresi hesaba katılıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Evimize giden yol dar, taşıma yapılabilir mi?',
        answer:
          'Yapılabilir. Yolu keşifte görüp uygun ölçüde araç seçiyoruz; gerekirse yükü ana yolda küçük araca aktarıyoruz. Bu, fiyata baştan dahil ediliyor.',
      },
      {
        question: 'Bahçe eşyaları taşınıyor mu?',
        answer:
          'Taşınıyor ve hacme dahil ediliyor. Keşifte göstermeniz, fiyatın baştan doğru çıkması için önemli.',
      },
      {
        question: 'Ankara merkezine taşınma tek günde biter mi?',
        answer:
          'Çoğunlukla biter. Mesafe nedeniyle işi sabah erken başlatıyoruz; eşya fazlaysa ikinci araç devreye giriyor.',
      },
      {
        question: 'Ambalaj malzemesini siz mi sağlıyorsunuz?',
        answer:
          'Evet. Koli, balonlu naylon, streç ve mobilya battaniyesi ekiple birlikte geliyor; ayrıca temin etmenize gerek yok.',
      },
    ],
  },

  {
    ad: 'Şereflikoçhisar',
    ozet:
      'Ankara’nın en uzak ilçelerinden Şereflikoçhisar’da taşıma, yol süresi üzerine kurulu bir plan gerektiriyor.',
    metaAciklama:
      'Şereflikoçhisar evden eve nakliyat: uzun mesafeye göre planlanmış taşıma, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Şereflikoçhisar, Ankara merkezine en uzak ilçelerden biri. Buradan yapılan taşımalarda yol süresi tek başına işin yarısını oluşturabiliyor; bu yüzden planlama şehirlerarası bir taşıma gibi kuruluyor. İşi gün doğarken başlatıyor, eşya çoksa ikinci aracı devreye alıyoruz ki iş aynı güne sığsın.</p><p>Güzergâh büyük ölçüde açık arazi üzerinden gidiyor; yol düz ve ağır araç için engel yok. İlçe merkezindeki yerleşim de düzenli, binalar düşük katlı ve araç yanaşması sorunsuz. Şereflikoçhisar’da <strong>evden eve nakliyat</strong> işlerinde bina kaynaklı zorluk nadiren gündeme geliyor.</p><p>Uzun güzergâhta asıl risk eşyanın yolda hareket etmesi. Mobilyaları battaniyeyle sarıp araç içinde kayış ve takozla sabitliyor, kolileri devrilmeyecek şekilde istifliyoruz.</p>`,
    kunye: [
      { label: 'Mesafe', value: 'Ankara merkezine en uzak ilçelerden; plan şehirlerarası taşımaya benziyor.' },
      { label: 'Güzergâh', value: 'Açık arazi üzerinden düz yol; ağır araç için engel yok.' },
      { label: 'İlçe merkezi', value: 'Düzenli yerleşim, düşük katlı binalar, sorunsuz araç yanaşması.' },
      { label: 'Sabitleme', value: 'Uzun yolda mobilyalar kayış ve takozla araca sabitleniyor.' },
    ],
    guzergahlar: [
      { to: 'Bala', note: 'Kuzeybatı aksı; yol süresi planlanıyor.' },
      { to: 'Gölbaşı', note: 'Ankara yönü; uzun güzergâh, erken başlangıç gerekiyor.' },
      { to: 'Haymana', note: 'Batıya geçiş; süre hesaba katılıyor.' },
      { to: 'Çankaya', note: 'Merkeze uzun mesafe; iki araçla eşzamanlı çalışılabiliyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Ankara merkezine taşınma tek günde biter mi?',
        answer:
          'Planlı yapıldığında biter. İşi gün doğarken başlatıyor, eşya fazlaysa iki araçla eşzamanlı çalışıyoruz.',
      },
      {
        question: 'Uzun yolda eşyalarım zarar görür mü?',
        answer:
          'Sabitleme doğru yapıldığında görmez. Mobilyalar battaniyeyle sarılıp kayış ve takozla araca bağlanıyor, koliler devrilmeyecek şekilde istifleniyor.',
      },
      {
        question: 'Başka bir ile taşınmak istiyorum, hizmet veriyor musunuz?',
        answer:
          'Veriyoruz. Şereflikoçhisar’dan Türkiye’nin her iline taşıma düzenliyoruz; yol ve konaklama fiyata baştan dahil ediliyor.',
      },
      {
        question: 'Fiyat nasıl belirleniyor?',
        answer:
          'Ücretsiz keşifle. Eşyayı yerinde gördükten sonra yol süresi dahil yazılı ve sabit bir fiyat veriyoruz; taşıma gününe kadar değişmiyor.',
      },
    ],
  },

  {
    ad: 'Nallıhan',
    ozet:
      'Ankara’nın batı ucundaki Nallıhan’da taşıma planı, uzun güzergâh ve engebeli yol üzerine kuruluyor.',
    metaAciklama:
      'Nallıhan evden eve nakliyat: uzun ve engebeli güzergâha göre planlanan taşıma, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Nallıhan, Ankara’nın batı ucunda yer alıyor ve merkeze olan mesafe taşımanın en belirleyici unsuru. Güzergâhın bir bölümü engebeli araziden geçtiği için yol süresi düz bir mesafeye göre daha uzun sürüyor. Bu yüzden işi çok erken başlatıyor, güzergâhı ve mola noktalarını önceden planlıyoruz.</p><p>İlçe merkezindeki yerleşim düzenli ve binalar ağırlıklı düşük katlı; araç yanaşması ve yükleme genellikle sorun çıkarmıyor. Kırsal mahallelere giden yollar ise dar. Nallıhan’da <strong>evden eve nakliyat</strong> planlarken adrese göre araç ölçüsü seçiyor, gerekiyorsa aktarma yapıyoruz.</p><p>İlçenin batı komşularıyla bağlantısı, Ankara merkezine göre daha kısa. Beypazarı yönündeki taşımalar tek günde rahatlıkla tamamlanıyor.</p>`,
    kunye: [
      { label: 'Konum', value: 'Ankara’nın batı ucu; merkeze mesafe taşımanın belirleyici unsuru.' },
      { label: 'Güzergâh', value: 'Bir bölümü engebeli arazi; yol süresi düz mesafeye göre daha uzun.' },
      { label: 'İlçe merkezi', value: 'Düzenli yerleşim ve düşük katlı binalar; yükleme sorunsuz.' },
      { label: 'Kırsal yollar', value: 'Mahalle yolları dar; adrese göre araç ölçüsü seçiliyor.' },
    ],
    guzergahlar: [
      { to: 'Beypazarı', note: 'Doğuya geçiş; iş tek günde tamamlanıyor.' },
      { to: 'Güdül', note: 'Kuzeydoğu aksı; dar yollarda küçük araç tercih ediliyor.' },
      { to: 'Ayaş', note: 'Doğu aksı; yol süresi planlanıyor.' },
      { to: 'Sincan', note: 'Ankara yönü; erken başlangıç gerekiyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Ankara merkezine taşınma kaç gün sürer?',
        answer:
          'Genellikle tek gün, ancak iş çok erken başlıyor. Eşya fazlaysa ikinci araçla eşzamanlı çalışarak günü aşmıyoruz.',
      },
      {
        question: 'Engebeli yolda eşyalarım sallanır mı?',
        answer:
          'Sabitleme bunun için yapılıyor. Mobilyalar battaniyeyle sarılıp kayışla bağlanıyor, kırılacaklar araçta ayrı bölümde taşınıyor.',
      },
      {
        question: 'Kırsal mahalleye araç gelebiliyor mu?',
        answer:
          'Yol durumuna göre değişiyor. Keşifte yolu değerlendirip uygun araç seçiyoruz; gerekirse yükü küçük araçla aktarıyoruz.',
      },
      {
        question: 'Şehirlerarası taşıma yapıyor musunuz?',
        answer:
          'Yapıyoruz. Nallıhan’dan komşu illere ve Türkiye geneline taşıma düzenliyoruz; yol ve konaklama fiyata baştan dahil.',
      },
    ],
  },

  {
    ad: 'Evren',
    ozet:
      'Ankara’nın en küçük ilçesi Evren’de taşıma talebi az; buna karşılık mesafe planlamayı zorunlu kılıyor.',
    metaAciklama:
      'Evren evden eve nakliyat: uzak mesafeye göre planlanmış taşıma, sigortalı ambalaj ve yazılı sabit fiyat. Ücretsiz keşif.',
    govde: `<p>Evren, Ankara’nın en küçük ve merkeze en uzak ilçelerinden. Buradan yapılan taşımalarda mesafe tek başına planın ana konusu; yol süresi hesaba katılmadan verilen bir tarih tutmuyor. İşi gün doğarken başlatıyor, güzergâhı önceden çıkarıyoruz.</p><p>Yerleşim küçük ve toplu. Binalar ağırlıklı düşük katlı, sokaklar araç geçişine uygun ve yükleme çoğu adreste sorunsuz ilerliyor. Evren’de <strong>evden eve nakliyat</strong> işlerinde bina kaynaklı bir zorlukla nadiren karşılaşıyoruz; süreyi belirleyen şey yol.</p><p>Uzak mesafe nedeniyle bu güzergâhta çalışırken eşya sabitlemesine özel önem veriyoruz. Mobilyalar battaniyeyle sarılıyor, araç içinde kayış ve takozla bağlanıyor, kırılacak parçalar ayrı bölümde taşınıyor.</p>`,
    kunye: [
      { label: 'Konum', value: 'Ankara’nın en küçük ve merkeze en uzak ilçelerinden.' },
      { label: 'Mesafe', value: 'Yol süresi planın ana konusu; iş gün doğarken başlatılıyor.' },
      { label: 'Yerleşim', value: 'Küçük ve toplu; düşük katlı binalar, sorunsuz araç geçişi.' },
      { label: 'Sabitleme', value: 'Uzun güzergâhta mobilyalar kayış ve takozla araca bağlanıyor.' },
    ],
    guzergahlar: [
      { to: 'Şereflikoçhisar', note: 'Komşu ilçe; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Bala', note: 'Kuzeye geçiş; yol süresi planlanıyor.' },
      { to: 'Gölbaşı', note: 'Ankara yönü; uzun güzergâh, erken başlangıç gerekiyor.' },
      { to: 'Çankaya', note: 'Merkeze uzun mesafe; iki araçla eşzamanlı çalışılabiliyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Bu kadar uzaktan taşıma yapıyor musunuz?',
        answer:
          'Yapıyoruz. Mesafe planlamayı değiştiriyor ama engel değil; işi çok erken başlatıp güzergâhı önceden çıkarıyoruz.',
      },
      {
        question: 'Yol masrafı fiyata dahil mi?',
        answer:
          'Dahil. Keşiften sonra verilen yazılı fiyat yol ve yakıt dahil toplam tutar; taşıma gününe kadar değişmiyor.',
      },
      {
        question: 'Küçük bir ev taşıyacağım, yine de geliyor musunuz?',
        answer:
          'Geliyoruz. Hacim küçükse ekip ve araç ölçüsünü ona göre planlıyoruz; fiyat da bu ölçüde oluşuyor.',
      },
      {
        question: 'Keşif için ücret alıyor musunuz?',
        answer:
          'Almıyoruz. Keşif ücretsiz; ekibimiz adrese gelip eşyayı gördükten sonra yazılı fiyat veriyor.',
      },
    ],
  },
]

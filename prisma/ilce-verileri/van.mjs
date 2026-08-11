// prisma/ilce-verileri/van.mjs
//
// Van'ın 13 ilçesinden 8'i. BEŞİ ATLANDI.
//
// ATLANANLAR: Çaldıran, Saray, Bahçesaray, Çatak, Gürpınar
//   Küçük nüfuslu ve aramada karşılığı düşük. Saray ayrıca Tekirdağ'da
//   aynı adla eklendiği için atlandı; tohumlayıcı slug çakışmasını
//   çözebiliyor ama gereksiz karışıklık yaratmanın anlamı yok.
//   (Edremit'te bu kaçınılmaz: Van'ın merkez ilçelerinden biri ve
//   aramada karşılığı yüksek — slug `edremit-van` olarak ayrıldı.)
//
// DERİNLİK: 'tam' (3) / 'orta' (5)
//
// KIŞ EKSENİ TAMAMEN KAPALI
//   Erzurum'da SEKİZ ilçenin tamamı kış üzerine yazıldı (buzlanma,
//   zincir, kapanan köy yolu, dar taşıma penceresi). Ayrıca Kocaeli/
//   Kartepe, Ankara/Elmadağ ve Çamlıdere, Adana/Pozantı, Mersin/Mut,
//   Konya/Beyşehir de kış eksenini kullandı.
//   Bu ilde kış, kar, buz, don, zincir ve rakım kelimelerinin HİÇBİRİ
//   geçmiyor. Doğu Anadolu'da ikinci il olmanın gereği bu.
//
//   Aynı şekilde kapalı olan ve girilmeyen eksenler:
//     · dağınık köy / uzun güzergâh → Araban, İslahiye, Bala, Haymana,
//       Şereflikoçhisar, Nallıhan, Kandıra
//     · göl kıyısı yerleşim → Konya/Beyşehir
//       (Van Gölü'ne hiç girilmedi)
//     · hayvancılık → Erzurum/Horasan
//
// SINIR İLÇELERİ
//   Özalp ve Başkale sınıra yakın ilçeler. Şanlıurfa'da olduğu gibi bu
//   sayfalarda yalnızca taşıma lojistiği anlatılıyor; doğrulanmış bilgim
//   olmayan ve hizmetle ilgisi bulunmayan konulara girilmiyor.
//
// EKSENLER: EŞYA VE HİZMET SÖZLEŞMESİ
//   Diyarbakır'da eşya tipi, Balıkesir'de hizmet süreci kullanılmıştı.
//   Bu ilde ikisinin karışımı: kapı kanadı, yatak, halı, yakıtlı
//   ekipman (eşya) ile ekip kurulumu, ödeme, garanti, yedek malzeme
//   (hizmet). Hiçbiri başka bir ilde kullanılmadı.
//
// KAPALI YAPI KARŞILAŞTIRMASI
//   Manisa/Kula'da tescilli binada "kapıya dokunmuyoruz, eşyayı
//   söküyoruz" deniyor. İpekyolu'nda TAM TERSİ durum anlatılıyor:
//   sıradan bir dairede kapı kanadı geçici olarak çıkarılıyor. İki sayfa
//   birbirinin zıddı, aynı şeyi tekrarlamıyor.
//
// MAHALLELER
//   Tamamı boş bırakıldı; Van mahalle adları konusunda doğrulanmış
//   bilgim yok.
//
// Ortak kurallar: uydurma mahalle/rakam yok, "evden eve nakliyat" sayfa
// başına tam bir kez. (bkz. izmir.mjs başlığındaki ayrıntılı gerekçe)

export const il = { ad: 'Van', plaka: 65 }

export const ilceler = [
  // ───────────────────────── TAM DERİNLİK (3) ─────────────────────────
  {
    ad: 'İpekyolu',
    derinlik: 'tam',
    ozet:
      'İpekyolu’nda kapıdan geçmeyen parça için mobilya değil, kapı sökülüyor; kanat çıkarılıp iş bitince geri takılıyor.',
    metaAciklama:
      'İpekyolu evden eve nakliyat: kapı kanadı sökülerek geniş parça geçirme, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>İpekyolu’ndaki dairelerde sık karşılaştığımız durum, bir parçanın kapı boşluğundan birkaç santim geniş olması. İlk akla gelen çözüm mobilyayı sökmek oluyor, ama her parça sökülemiyor; tek gövde bir çekyat ya da kanepe söküldüğünde eski sağlamlığına dönmeyebiliyor.</p><p>Bu durumlarda mobilyayı değil kapıyı çıkarıyoruz. Menteşe pimleri sökülüp kanat kaldırılıyor, böylece boşluk birkaç santim genişliyor ve çoğu parça sorunsuz geçiyor. İş bittiğinde kanat aynı menteşelere geri takılıyor, kapanışı kontrol ediliyor. İpekyolu’nda <strong>evden eve nakliyat</strong> keşfinde hangi kapıların çıkarılacağını önceden belirliyoruz.</p><p>Kapı çıkarmak her zaman yetmiyor; kasa da darsa mobilya sökümüne geçiyoruz. Hangisinin gerekeceğine ölçü alarak karar veriyoruz — deneme yanılmayla değil, çünkü zorlanan bir parça hem kendisi hem kasa için risk demek.</p>`,
    kunye: [
      { label: 'Sorun', value: 'Parça kapı boşluğundan birkaç santim geniş; her mobilya sökülemiyor.' },
      { label: 'Çözüm', value: 'Menteşe pimleri sökülüp kanat kaldırılıyor, boşluk genişliyor.' },
      { label: 'Geri takma', value: 'İş bitince kanat aynı menteşelere takılıp kapanışı kontrol ediliyor.' },
      { label: 'Karar', value: 'Ölçü alınarak veriliyor; parça zorlanarak geçirilmiyor.' },
    ],
    guzergahlar: [
      { to: 'Tuşba', note: 'Şehir içi geçiş; iş aynı gün bitiyor.' },
      { to: 'Edremit', note: 'Güneye geçiş; günübirlik.' },
      { to: 'Erciş', note: 'Kuzeye çıkış; yol süresi planlanıyor.' },
      { to: 'Van', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Kanepem kapıdan geçmiyor, ne yapıyorsunuz?',
        answer:
          'Önce kapı kanadını çıkarıyoruz; çoğu parça bu birkaç santimle geçiyor. Yetmezse mobilya sökümüne geçiyoruz.',
      },
      {
        question: 'Kapı sökülünce zarar görür mü?',
        answer:
          'Görmüyor. Menteşe pimleri çıkarılıyor, kanat kaldırılıyor; iş bitince aynı menteşelere takılıp kapanışı kontrol ediliyor.',
      },
      {
        question: 'Mobilyayı sökmek daha iyi değil mi?',
        answer:
          'Her parça sökülemiyor. Tek gövde çekyat ve kanepeler söküldüğünde eski sağlamlığına dönmeyebiliyor; bu yüzden önce kapıyı deniyoruz.',
      },
      {
        question: 'Verilen fiyat sonradan değişir mi?',
        answer:
          'Değişmiyor. Keşif sonrası verilen yazılı fiyat taşıma gününe kadar geçerli kalıyor.',
      },
    ],
  },

  {
    ad: 'Tuşba',
    derinlik: 'tam',
    ozet:
      'Tuşba’da yatak ve baza kendi kuralı olan bir yük; katlanmıyor, yere konmuyor ve kılıfsız taşınmıyor.',
    metaAciklama:
      'Tuşba evden eve nakliyat: yatak ve baza için kılıflı ve düz taşıma, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Tuşba’daki taşımalarda üzerinde ayrı durduğumuz parça yatak oluyor. Görünürde taşıması kolay — hafif ve tek parça — ama yanlış taşındığında en çok zarar gören eşyalardan biri. Yaylı yataklar katlandığında ya da bükülerek merdivenden çıkarıldığında iç yapısı kalıcı olarak bozulabiliyor.</p><p>Yatağı düz taşıyor, kıvırmıyor ve üzerine ağırlık koymuyoruz. Doğrudan yere ya da araç zeminine temas etmiyor; kendi kılıfına alınıyor, çünkü taşıma yüzeyleri temiz olsa bile üzerinde uyunan bir eşya için bu yeterli değil. Tuşba’da <strong>evden eve nakliyat</strong> yaparken yatak kılıfı standart malzemelerimizin içinde, ayrıca istenmesi gerekmiyor.</p><p>Baza tarafında ise durum farklı: sandıklı bazalar çoğu zaman içi dolu hâlde bırakılıyor ve bu hem ağırlığı hem mekanizmayı zorluyor. Bazayı boşaltmanızı istiyoruz; kapağın taşıma sırasında açılmaması için ayrıca sabitliyoruz.</p>`,
    kunye: [
      { label: 'Yatak', value: 'Düz taşınıyor, katlanmıyor, üzerine ağırlık konmuyor.' },
      { label: 'Kılıf', value: 'Yere ve araç zeminine temas etmiyor; kendi kılıfına alınıyor.' },
      { label: 'Malzeme', value: 'Yatak kılıfı standart; ayrıca istenmesi gerekmiyor.' },
      { label: 'Baza', value: 'Sandıklı baza boşaltılıyor, kapağı taşıma boyunca sabitleniyor.' },
    ],
    guzergahlar: [
      { to: 'İpekyolu', note: 'Şehir içi geçiş; iş aynı gün bitiyor.' },
      { to: 'Edremit', note: 'Güneye geçiş; günübirlik.' },
      { to: 'Muradiye', note: 'Kuzeydoğu aksı; yol süresi planlanıyor.' },
      { to: 'Van', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Yatağım merdivenden çıkmıyor, katlayabilir miyiz?',
        answer:
          'Katlamıyoruz. Yaylı yatakta iç yapı kalıcı zarar görebiliyor; başka bir yol bulunamazsa dış cephe asansörü planlıyoruz.',
      },
      {
        question: 'Yatak kılıfı ek ücretli mi?',
        answer:
          'Değil. Standart malzemelerimizin içinde; ayrıca istemenize gerek yok.',
      },
      {
        question: 'Bazanın içindekileri boşaltmalı mıyım?',
        answer:
          'Boşaltmanızı istiyoruz. Dolu baza hem ağır hem mekanizmayı zorluyor; kapağı ayrıca sabitliyoruz.',
      },
      {
        question: 'Keşif ücretli mi?',
        answer: 'Keşif ücretsiz. Yatak ölçüsünü ve merdiven durumunu o sırada birlikte görüyoruz.',
      },
    ],
  },

  {
    ad: 'Erciş',
    derinlik: 'tam',
    ozet:
      'Erciş’te ekip adrese eksiksiz gidiyor; kaç kişinin geleceği ve her birinin ne yapacağı keşifte belirleniyor.',
    metaAciklama:
      'Erciş evden eve nakliyat: ekip büyüklüğü ve görev dağılımı keşifte belirlenen planlı taşıma. Yazılı sabit fiyat.',
    govde: `<p>Erciş Van merkezine uzak ve buraya giden ekip, eksik çıkan bir kişiyi ya da unutulan bir yetkinliği yolda tamamlayamıyor. Şehir içinde “bir kişi daha çağıralım” demek mümkünken burada değil. Bu yüzden ekibi baştan doğru kurmak zorundayız.</p><p>Keşifte yalnızca eşyayı değil, işin hangi becerileri gerektirdiğini de belirliyoruz: paketleme yapacak kişi, taşıyacak kişiler, mobilya söküp kuracak marangoz ve işi yürüten sorumlu. Erciş’te <strong>evden eve nakliyat</strong> için kaç kişi geleceğini ve kimin ne yapacağını teklifte yazıyoruz — “ekip gelecek” gibi belirsiz bir ifade kullanmıyoruz.</p><p>Ekip büyüklüğünü belirleyen şey oda sayısı değil; ağır parça adedi, kat durumu ve söküm gerektiren mobilya sayısı. Aynı büyüklükteki iki ev için farklı ekip çıkabiliyor ve bunun sebebini keşifte açıklıyoruz.</p>`,
    kunye: [
      { label: 'Eksiksiz gidiş', value: 'Uzak adreste eksik kişi ya da yetkinlik yolda tamamlanamıyor.' },
      { label: 'Görev dağılımı', value: 'Paketleyen, taşıyan, marangoz ve sorumlu ayrı ayrı belirleniyor.' },
      { label: 'Teklifte yazılı', value: 'Kaç kişi geleceği ve kimin ne yapacağı yazıyor.' },
      { label: 'Belirleyen', value: 'Oda sayısı değil; ağır parça adedi, kat durumu ve söküm sayısı.' },
    ],
    guzergahlar: [
      { to: 'Muradiye', note: 'Doğuya geçiş; yol süresi planlanıyor.' },
      { to: 'Tuşba', note: 'Güneye çıkış; Van merkezi, mesafe hesaba katılıyor.' },
      { to: 'Van', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Kaç kişi gelecek?',
        answer:
          'Keşifte belirleyip teklifte yazıyoruz. Sayıyı oda sayısı değil, ağır parça adedi ve söküm gerektiren mobilya sayısı belirliyor.',
      },
      {
        question: 'Mobilya söküp kuracak kişi geliyor mu?',
        answer:
          'Geliyor. Marangoz ekibin sabit parçası; ayrıca çağırmanıza gerek kalmıyor.',
      },
      {
        question: 'İş beklenenden büyük çıkarsa ne oluyor?',
        answer:
          'Bu yüzden keşifte ölçüyoruz. Uzak adreste ekip yolda büyütülemediği için baştan doğru kurmayı tercih ediyoruz.',
      },
      {
        question: 'Kimle muhatap olacağım?',
        answer:
          'Ekipte işi yürüten bir sorumlu bulunuyor; gün boyunca sorularınızın muhatabı o oluyor.',
      },
    ],
  },

  // ───────────────────────── ORTA DERİNLİK (5) ─────────────────────────
  {
    ad: 'Edremit',
    derinlik: 'orta',
    ozet:
      'Edremit’te ödemenin ne zaman ve nasıl yapılacağı sözleşmede yazılı; kapora alınıyorsa iade koşulu da belirtiliyor.',
    metaAciklama:
      'Edremit Van evden eve nakliyat: ödeme zamanı, kapora ve iade koşulları yazılı. Sigortalı taşıma, sabit fiyat.',
    govde: `<p>Edremit’te randevu alınırken konuşulan ama çoğu zaman yazılmayan konu ödeme oluyor. Ne zaman, hangi yöntemle ve hangi aşamada ödeneceği belirsiz kaldığında taşıma günü gereksiz bir pazarlık başlıyor.</p><p>Biz bunu baştan yazıyoruz: kapora alınıyorsa tutarı ve hangi durumda iade edileceği, kalan tutarın hangi aşamada ödeneceği ve kabul edilen ödeme yöntemleri sözleşmede yer alıyor. Edremit’te <strong>evden eve nakliyat</strong> için fatura da standart olarak düzenleniyor; talep etmeniz gerekmiyor.</p>`,
    kunye: [
      { label: 'Kapora', value: 'Alınıyorsa tutarı ve iade koşulu sözleşmede yazılı.' },
      { label: 'Kalan tutar', value: 'Hangi aşamada ödeneceği önceden belirli.' },
      { label: 'Fatura', value: 'Standart olarak düzenleniyor; talep gerekmiyor.' },
    ],
    guzergahlar: [
      { to: 'İpekyolu', note: 'Kuzeye geçiş; Van merkezi, iş aynı gün bitiyor.' },
      { to: 'Gevaş', note: 'Güneybatı aksı; günübirlik.' },
      { to: 'Van', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Ödemeyi ne zaman yapacağım?', answer: 'Hangi aşamada ödeneceği sözleşmede yazılı; taşıma günü pazarlık olmuyor.' },
      { question: 'Kapora iade ediliyor mu?', answer: 'İade koşulu sözleşmede belirtiliyor; hangi durumda iade edildiği baştan belli.' },
      { question: 'Fatura kesiliyor mu?', answer: 'Standart olarak düzenleniyor, ayrıca talep etmenize gerek yok.' },
    ],
  },

  {
    ad: 'Gevaş',
    derinlik: 'orta',
    ozet:
      'Gevaş’ta halı ve kilimler katlanmıyor; rulo hâlinde sarılıp dik taşınıyor.',
    metaAciklama:
      'Gevaş evden eve nakliyat: halı ve kilim için rulo sarma ve nemden koruma, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Gevaş’taki taşımalarda halı ve kilimleri katlamıyoruz. Katlanan halıda kat izi kalıcı olabiliyor; el dokuması kilimlerde ise katlama çizgisi boyunca dokuma gevşeyebiliyor. Bunun yerine tersten rulo hâlinde sarıyor, dış yüzeyi örtüyle kaplıyoruz.</p><p>Sarılan rulolar araçta dik değil yatık ve tek başına duruyor; üzerine mobilya konmuyor. Gevaş’ta <strong>evden eve nakliyat</strong> sırasında halıların nemli bir yüzeye temas etmemesine de dikkat ediyoruz — sarılı hâldeki bir halı nem aldığında kuruması günler alıyor.</p>`,
    kunye: [
      { label: 'Katlama yok', value: 'Kat izi kalıcı olabiliyor; el dokumasında dokuma gevşeyebiliyor.' },
      { label: 'Rulo', value: 'Tersten sarılıp dış yüzeyi örtüyle kaplanıyor.' },
      { label: 'Yerleşim', value: 'Araçta tek başına duruyor, üzerine mobilya konmuyor.' },
    ],
    guzergahlar: [
      { to: 'Edremit', note: 'Kuzeydoğu aksı; günübirlik.' },
      { to: 'İpekyolu', note: 'Kuzeye geçiş; Van merkezi, yol süresi planlanıyor.' },
      { to: 'Van', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Halımı katlayabilir miyiz?', answer: 'Katlamıyoruz. Kat izi kalıcı olabiliyor; rulo hâlinde sarıp örtüyle kaplıyoruz.' },
      { question: 'El dokuması kilim için farklı bir şey yapıyor musunuz?', answer: 'Aynı yöntem, ama daha dikkatli sarılıyor; katlama çizgisi dokumayı gevşetebiliyor.' },
      { question: 'Halı araçta ezilir mi?', answer: 'Ezilmiyor. Rulo tek başına duruyor, üzerine mobilya konmuyor.' },
    ],
  },

  {
    ad: 'Muradiye',
    derinlik: 'orta',
    ozet:
      'Muradiye’de kurulan mobilyalarda montaj garantisi var; sonradan çıkan gevşeme ve hiza sorunu için dönülüyor.',
    metaAciklama:
      'Muradiye evden eve nakliyat: montaj garantisi ve sonrasında yerinde düzeltme, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Muradiye’deki işlerde montaj teslim anında sağlam görünüyor olabilir, ama bazı sorunlar birkaç gün kullandıktan sonra ortaya çıkıyor: gevşeyen bir vida, hizası kayan bir kapak, sürtmeye başlayan bir çekmece.</p><p>Kurduğumuz mobilyalar için montaj garantisi veriyoruz. Bu süre içinde montajdan kaynaklanan bir sorun çıkarsa yeniden geliyor ve yerinde düzeltiyoruz. Muradiye’de <strong>evden eve nakliyat</strong> sözleşmesinde garantinin süresi ve neyi kapsadığı yazılı oluyor — mobilyanın kendi kusuru ile montaj kusurunu ayırıyoruz.</p>`,
    kunye: [
      { label: 'Gecikmeli sorun', value: 'Gevşeyen vida, kayan kapak ve sürten çekmece günler sonra ortaya çıkıyor.' },
      { label: 'Garanti', value: 'Montajdan kaynaklanan sorunlarda yerinde düzeltme yapılıyor.' },
      { label: 'Kapsam', value: 'Süre ve kapsam sözleşmede yazılı; mobilya kusuru ile montaj kusuru ayrılıyor.' },
    ],
    guzergahlar: [
      { to: 'Erciş', note: 'Batıya geçiş; yol süresi planlanıyor.' },
      { to: 'Tuşba', note: 'Güneybatı aksı; Van merkezi.' },
      { to: 'Van', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Montajdan sonra sorun çıkarsa geliyor musunuz?', answer: 'Geliyoruz. Montaj garantisi süresi içinde yerinde düzeltiyoruz.' },
      { question: 'Garanti ne kadar sürüyor?', answer: 'Süresi ve kapsamı sözleşmede yazılı oluyor.' },
      { question: 'Mobilyanın kendi arızası da kapsamda mı?', answer: 'Değil. Montaj kusuru ile mobilyanın kendi kusurunu ayırıyoruz; hangisi olduğunu yerinde birlikte görüyoruz.' },
    ],
  },

  {
    ad: 'Başkale',
    derinlik: 'orta',
    ozet:
      'Başkale gibi uzak adreslere ekip fazladan ambalaj ve montaj malzemesiyle gidiyor; eksik için geri dönülemiyor.',
    metaAciklama:
      'Başkale evden eve nakliyat: uzak adrese yedek malzemeyle gitme ve eksiksiz planlama. Yazılı sabit fiyat.',
    govde: `<p>Başkale il merkezine uzak ve buradaki bir işte eksik çıkan malzeme için en yakın markete gidip dönmek gerçekçi değil. Şehir içinde on dakikada çözülen bir eksik, burada işi yarım bırakabiliyor.</p><p>Bu yüzden uzak adreslere giden araçlarda hesaplanandan fazla koli, streç, balonlu naylon, bant ve montaj vidası bulunduruyoruz. Başkale’de <strong>evden eve nakliyat</strong> planında kullanılmayan malzeme için ücret almıyoruz — fazlası geri dönüyor, siz yalnızca kullanılanı ödüyorsunuz.</p>`,
    kunye: [
      { label: 'Sorun', value: 'Uzak adreste eksik malzeme için geri dönmek gerçekçi değil.' },
      { label: 'Önlem', value: 'Hesaplanandan fazla koli, streç, bant ve montaj vidası götürülüyor.' },
      { label: 'Ücret', value: 'Kullanılmayan malzeme geri dönüyor; yalnızca kullanılan ödeniyor.' },
    ],
    guzergahlar: [
      { to: 'Edremit', note: 'Kuzeye geçiş; Van yönü, yol süresi planlanıyor.' },
      { to: 'Van', note: 'İl merkezi; mesafe hesaba katılıyor.' },
      { to: 'Özalp', note: 'Kuzeydoğu aksı; güzergâh planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Malzeme yetmezse ne oluyor?', answer: 'Yetmemesi için fazlasını götürüyoruz. Uzak adreste eksik için geri dönmek işi yarım bırakır.' },
      { question: 'Kullanılmayan malzemeyi ödüyor muyum?', answer: 'Ödemiyorsunuz. Fazlası geri dönüyor, yalnızca kullanılan hesaplanıyor.' },
      { question: 'Keşif için gelmeniz gerekiyor mu?', answer: 'Uzak adreslerde fotoğraf ya da görüntülü görüşme çoğu zaman yeterli oluyor.' },
    ],
  },

  {
    ad: 'Özalp',
    derinlik: 'orta',
    ozet:
      'Özalp’ta yakıtla çalışan ekipman taşınacaksa deposu boşaltılıyor; dolu depoyla araca yüklenmiyor.',
    metaAciklama:
      'Özalp evden eve nakliyat: yakıtlı ekipman için depo boşaltma ve güvenli taşıma, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Özalp’taki taşımalarda ev eşyasının yanında zaman zaman yakıtla çalışan ekipman çıkıyor: çim biçme makinesi, jeneratör, motorlu testere ya da motosiklet. Bunlar dolu depoyla kapalı bir araç kasasına yüklenmiyor — hem sızıntı riski hem kapalı alanda biriken buhar nedeniyle.</p><p>Bu ekipmanların deposu taşımadan önce boşaltılıyor, mümkünse karbüratörü de kurutuluyor. Özalp’ta <strong>evden eve nakliyat</strong> keşfinde bu tip bir ekipman varsa boşaltmayı taşıma gününe bırakmamanızı söylüyoruz; işlem zaman alıyor ve boşaltılan yakıtın da bir yere konması gerekiyor.</p>`,
    kunye: [
      { label: 'Kapsam', value: 'Çim biçme makinesi, jeneratör, motorlu testere, motosiklet.' },
      { label: 'Kural', value: 'Dolu depoyla kapalı kasaya yüklenmiyor; sızıntı ve buhar riski var.' },
      { label: 'Hazırlık', value: 'Depo taşımadan önce boşaltılıyor; işlem taşıma gününe bırakılmıyor.' },
    ],
    guzergahlar: [
      { to: 'Muradiye', note: 'Kuzeybatı aksı; yol süresi planlanıyor.' },
      { to: 'Van', note: 'İl merkezi; mesafe hesaba katılıyor.' },
      { to: 'Başkale', note: 'Güneybatı yönü; güzergâh planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Jeneratörümü taşır mısınız?', answer: 'Taşıyoruz, ama deposu boşaltılmış olarak. Dolu depoyla kapalı kasaya yüklemiyoruz.' },
      { question: 'Depoyu siz mi boşaltıyorsunuz?', answer: 'Taşıma gününden önce boşaltmanızı istiyoruz; işlem zaman alıyor ve yakıtın konacağı bir yer gerekiyor.' },
      { question: 'Motosiklet taşınabilir mi?', answer: 'Taşınabiliyor. Deposu boşaltılıp sabitleniyor; keşifte ölçüsünü ve ağırlığını alıyoruz.' },
    ],
  },
]

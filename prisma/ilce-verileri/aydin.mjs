// prisma/ilce-verileri/aydin.mjs
//
// Aydın'ın 17 ilçesinden 8'i. DOKUZU BİLEREK ATLANDI.
//
// ATLANANLAR: Koçarlı, Köşk, Bozdoğan, Buharkent, Karacasu, Karpuzlu,
//   Kuyucak, Sultanhisar, Yenipazar
//   Küçük nüfuslu ve aramada karşılığı düşük. Karacasu ayrıca BİLEREK
//   çıkarıldı: doğal ekseni çömlekçilik olurdu, seramik/kırılacak eşya
//   ekseni Bursa/İznik'te kullanıldı.
//
// DERİNLİK: 'tam' (3) / 'orta' (5)
//
// EGE'DE DÖRDÜNCÜ İL — KAPALI EKSENLER
//   İzmir, Denizli ve Manisa'dan sonra Aydın'ın bariz temalarının tamamı
//   tükenmiş durumda:
//     · sezon / yazlık / ikinci konut → İzmir'de dört ilçe (Çeşme, Dikili,
//        Foça, Seferihisar), ayrıca Karataş, Kemer, Manavgat, Selçuk,
//        Mudanya, Kızılcahamam
//     · ova + dağınık adres            → Ankara/Bala, İzmir/Menderes,
//        Adana/Sarıçam, Samsun/Terme
//     · tarım / hasat / bahçe          → İzmir/Ödemiş, Gaziantep/Nizip,
//        Ankara/Kalecik, Adana/Kozan, Konya/Akşehir
//     · sahil–yamaç, eğim              → Kocaeli/İzmit ve Derince,
//        İzmir/Balçova, Trabzon/Akçaabat, Samsun/Canik
//     · uzak ilçe / yol süresi         → onlarca ilçede
//   Bu yüzden Kuşadası ve Didim'de turizm ve sezon çerçevesine HİÇ
//   girilmedi; Söke'de ova ve tarım çerçevesine de girilmedi.
//
//   Manisa'da başlattığım yaklaşım burada da sürüyor: eksenler yerin
//   özelliğinden değil TAŞIMA İŞİNİN AŞAMALARINDAN çıkarıldı. Bu ilde
//   kullanılanlar — varış adresinin ölçülmesi, tadilatla sıralama, canlı
//   yük, mağaza teslimi, kapalı kalmış ev, araç içi istif, ev halkının
//   günü, sandıklama — hiçbir ilde kullanılmadı.
//
// YAKIN DURAN VE KAÇINILAN İKİ EKSEN
//   · Konya/Kulu: "boş ev taşımaları ve uzun süreli depolama". Didim'de
//     eksen depolama DEĞİL, uzun süre kapalı kalmış evde TAŞIMA ÖNCESİ
//     HAZIRLIK (elektrik-su kapalı, havalandırma, toz). Depolama
//     çerçevesine girilmiyor.
//   · Konya/Karapınar: "rüzgâr ve toz ambalajı belirliyor". Germencik'te
//     eksen ambalaj değil ARACIN İÇİNDEKİ İSTİF DÜZENİ.
//
// MAHALLELER
//   Tamamı boş bırakıldı; Aydın mahalle adları konusunda doğrulanmış
//   bilgim yok. (Aynı kural Denizli ve Manisa'da da uygulandı.)
//
// Ortak kurallar: uydurma mahalle/rakam yok, "evden eve nakliyat" sayfa
// başına tam bir kez. (bkz. izmir.mjs başlığındaki ayrıntılı gerekçe)

export const il = { ad: 'Aydın', plaka: 9 }

export const ilceler = [
  // ───────────────────────── TAM DERİNLİK (3) ─────────────────────────
  {
    ad: 'Efeler',
    derinlik: 'tam',
    ozet:
      'Efeler’de keşif yalnızca çıkılacak evde yapılmıyor; hangi mobilyanın yeni eve sığacağı varış adresinde ölçülüyor.',
    metaAciklama:
      'Efeler evden eve nakliyat: varış adresi de ölçülüyor, sığmayan parça önceden belirleniyor. Yazılı sabit fiyat.',
    govde: `<p>Efeler’de en sık yaşanan aksaklık taşıma sırasında değil, taşımadan sonra ortaya çıkıyor: köşe takımı salona sığmıyor, gardırop yatak odasının duvarını kapatıyor, buzdolabı nişe girmiyor. Eşya yeni eve girdikten sonra fark edilen bu durumun geri dönüşü yok; parça ya odanın ortasında kalıyor ya da tekrar dışarı çıkıyor.</p><p>Bunu önlemek için keşfi iki adreste yapıyoruz. Çıkılacak evde eşyanın ölçüsünü, girilecek evde ise duvar boylarını, niş genişliğini ve kapı açıklıklarını alıyoruz. Efeler’de <strong>evden eve nakliyat</strong> teklifiyle birlikte size sığmayacak parçaların listesini de veriyoruz — taşımadan önce, karar verebileceğiniz bir zamanda.</p><p>Varış adresi henüz teslim alınmadıysa ölçüleri kat planından ya da tek bir kısa ziyaretle alabiliyoruz. Bu ek adım işi uzatmıyor; aksine boşaltma sırasında “buraya sığmadı, nereye koyalım” duraklamasını ortadan kaldırdığı için toplam süreyi kısaltıyor.</p>`,
    kunye: [
      { label: 'İki adreste keşif', value: 'Çıkılacak evde eşya, girilecek evde duvar ve niş ölçüleri alınıyor.' },
      { label: 'Sığmayan liste', value: 'Hangi parçanın girmeyeceği taşımadan önce yazılı olarak veriliyor.' },
      { label: 'Teslim alınmamış ev', value: 'Ölçüler kat planından ya da tek kısa ziyaretle alınabiliyor.' },
      { label: 'Süre etkisi', value: 'Boşaltmada duraklama olmadığı için toplam süre kısalıyor.' },
    ],
    guzergahlar: [
      { to: 'İncirliova', note: 'Batıya kısa mesafe; iş aynı gün bitiyor.' },
      { to: 'Nazilli', note: 'Doğuya geçiş; günübirlik.' },
      { to: 'Söke', note: 'Güneybatı aksı; yol süresi planlanıyor.' },
      { to: 'Aydın', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Mobilyalarım yeni eve sığacak mı, nasıl anlarız?',
        answer:
          'Keşfi iki adreste yapıyoruz. Yeni evin duvar ve niş ölçülerini alıp sığmayacak parçaların listesini taşımadan önce veriyoruz.',
      },
      {
        question: 'Yeni evi henüz teslim almadık, ölçü alınabilir mi?',
        answer:
          'Alınabilir. Kat planı yeterli oluyor; gerekirse tek bir kısa ziyaretle ölçüleri tamamlıyoruz.',
      },
      {
        question: 'Sığmayan mobilya için ne yapıyorsunuz?',
        answer:
          'Sökülerek geçebiliyorsa söküyoruz. Geçmiyorsa kararı siz veriyorsunuz — taşınmadan önce bildiğiniz için seçenek elinizde kalıyor.',
      },
      {
        question: 'Verilen fiyat sonradan değişir mi?',
        answer:
          'Değişmiyor. Keşif sonrası verilen yazılı fiyat taşıma gününe kadar geçerli kalıyor.',
      },
    ],
  },

  {
    ad: 'Nazilli',
    derinlik: 'tam',
    ozet:
      'Nazilli’de taşınmaların çoğu tadilatla iç içe; eşyanın hangi aşamada gireceği boya ve zemin işine göre belirleniyor.',
    metaAciklama:
      'Nazilli evden eve nakliyat: tadilat takvimiyle uyumlu taşıma planı, sigortalı ambalaj ve yazılı sabit fiyat.',
    govde: `<p>Nazilli’de yeni eve girmeden önce boya, zemin ya da mutfak işi yaptıranlar çoğunlukta. Bu, taşımayı takvim işine dönüştürüyor: eşya erken girerse ustanın önünü kapatıyor ve toz alıyor, geç girerse eski evin teslim tarihi kaçıyor. İki tarafı da tutturmak plan gerektiriyor.</p><p>Bu yüzden randevu alırken tadilatın hangi aşamada olduğunu soruyoruz. Boya yapılmışsa kokunun çekilmesi ve yüzeyin sertleşmesi için süre bırakıyoruz; zemin işi varsa ağır mobilyaların o zemine ne zaman konabileceğini ustadan öğrenmenizi istiyoruz. Nazilli’de <strong>evden eve nakliyat</strong> tarihini bu bilgilere göre belirliyoruz.</p><p>Tadilat gecikirse iş tamamen durmuyor. Eşyayı tek seferde taşıyıp bir odada toplu hâlde bekletiyor, işler bitince kurulumu ayrıca yapıyoruz. Hangi odanın boş bırakılacağını keşifte kararlaştırıyoruz ki bekleyen yük ustaların çalışma alanını daraltmasın.</p>`,
    kunye: [
      { label: 'Tadilat sırası', value: 'Eşyanın hangi aşamada gireceği boya ve zemin işine göre belirleniyor.' },
      { label: 'Boya sonrası', value: 'Kokunun çekilmesi ve yüzeyin sertleşmesi için süre bırakılıyor.' },
      { label: 'Gecikme planı', value: 'Eşya tek seferde taşınıp bir odada bekletiliyor, kurulum sonra yapılıyor.' },
      { label: 'Boş oda', value: 'Bekleyen yükün ustaların alanını daraltmaması için oda önceden seçiliyor.' },
    ],
    guzergahlar: [
      { to: 'Efeler', note: 'Batıya geçiş; Aydın merkezi, günübirlik.' },
      { to: 'Çine', note: 'Güneybatı yönü; yol süresi planlanıyor.' },
      { to: 'Germencik', note: 'Batı aksı; güzergâh düz.' },
      { to: 'Aydın', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Yeni ev boyandı, eşya hemen girebilir mi?',
        answer:
          'Kokunun çekilmesi ve yüzeyin sertleşmesi için süre bırakmak gerekiyor. Boyanın tarihini söylerseniz taşımayı ona göre planlıyoruz.',
      },
      {
        question: 'Tadilat gecikirse taşıma iptal mi olur?',
        answer:
          'Olmuyor. Eşyayı taşıyıp bir odada topluyoruz, işler bitince kurulumu ayrıca yapıyoruz.',
      },
      {
        question: 'Kurulumun ayrı yapılması ek ücret mi?',
        answer:
          'Bunu keşifte konuşuyoruz. Nasıl ilerleyeceği belliyse fiyat baştan yazılıyor ve sonradan değişmiyor.',
      },
      {
        question: 'Eski evi teslim etmemiz gerekiyor, tarih sıkışık olursa?',
        answer:
          'İki tarihi birlikte planlıyoruz. Eski evin teslim günü belirleyiciyse taşımayı ona göre öne alıyoruz.',
      },
    ],
  },

  {
    ad: 'Söke',
    derinlik: 'tam',
    ozet:
      'Söke’de taşınan yükün bir bölümü canlı: saksı bitkileri ve evcil hayvanlar kolilerden ayrı planlanıyor.',
    metaAciklama:
      'Söke evden eve nakliyat: bitki ve evcil hayvan taşımasında ayrı düzen, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Söke’deki evlerde saksı bitkisi çok; taşınmalarda da düzenli olarak karşımıza çıkıyor. Bitki, kolinin kurallarına uymuyor: üst üste konmuyor, kapalı kutuda uzun süre kalmıyor, devrilirse toprağı dağılıyor. Bu yüzden bitkileri yükün en sonuna bırakıyor, dik duracak biçimde ayrı bir bölmede taşıyor ve varışta ilk onları indiriyoruz.</p><p>Evcil hayvanlar ise eşya değil ve araçla taşınmıyorlar. Söke’de <strong>evden eve nakliyat</strong> planı yaparken hayvanın taşıma günü nerede olacağını baştan soruyoruz: kapılar saatlerce açık kalıyor, ekip sürekli girip çıkıyor ve bu ortam hayvan için hem tehlikeli hem yorucu. En iyi çözüm, gün boyunca kapalı ve sakin bir odada ya da evin dışında kalması oluyor.</p><p>Akvaryum ayrı bir konu: suyu boşaltılmadan taşınmıyor, canlılar ayrı kapta gidiyor ve kurulum varışta ilk yapılan işlerden biri oluyor. Bu üç kalemi keşifte tek tek soruyoruz, çünkü listede yazmadıkça taşıma sabahı hatırlanıyor.</p>`,
    kunye: [
      { label: 'Bitkiler', value: 'En sona yükleniyor, dik ve ayrı bölmede taşınıyor, ilk onlar indiriliyor.' },
      { label: 'Evcil hayvan', value: 'Araçla taşınmıyor; taşıma günü kapalı ve sakin bir yerde kalıyor.' },
      { label: 'Akvaryum', value: 'Suyu boşaltılıyor, canlılar ayrı kapta gidiyor, kurulum varışta öncelikli.' },
      { label: 'Liste', value: 'Üç kalem de keşifte tek tek soruluyor; yazılmazsa taşıma sabahı hatırlanıyor.' },
    ],
    guzergahlar: [
      { to: 'Efeler', note: 'Kuzeydoğu aksı; Aydın merkezi, yol süresi planlanıyor.' },
      { to: 'Kuşadası', note: 'Kuzeybatı yönü; günübirlik.' },
      { to: 'Didim', note: 'Güneybatı yönü; güzergâh düz.' },
      { to: 'Aydın', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Saksı bitkilerimi taşır mısınız?',
        answer:
          'Taşıyoruz. En sona yüklüyor, dik duracak şekilde ayrı bölmede götürüyor ve varışta ilk onları indiriyoruz.',
      },
      {
        question: 'Kedimi/köpeğimi araçla götürebilir misiniz?',
        answer:
          'Götürmüyoruz. Taşıma günü kapılar sürekli açık kalıyor; hayvanın kapalı ve sakin bir yerde olması hem güvenli hem daha az yorucu.',
      },
      {
        question: 'Akvaryum taşınabilir mi?',
        answer:
          'Taşınıyor. Suyu boşaltılıyor, canlılar ayrı kapta gidiyor ve kurulumu varışta ilk işlerden biri olarak yapıyoruz.',
      },
      {
        question: 'Keşif ücretli mi?',
        answer: 'Keşif ücretsiz. Bitki, hayvan ve akvaryumu da o sırada listeye alıyoruz.',
      },
    ],
  },

  // ───────────────────────── ORTA DERİNLİK (5) ─────────────────────────
  {
    ad: 'Kuşadası',
    derinlik: 'orta',
    ozet:
      'Kuşadası’nda gelen taleplerin bir bölümü ev taşıma değil; mağazadan alınan yeni mobilyanın eve taşınıp kurulması.',
    metaAciklama:
      'Kuşadası evden eve nakliyat ve mobilya teslim-montaj: mağazadan eve taşıma ve kurulum, yazılı sabit fiyat.',
    govde: `<p>Kuşadası’nda sıkça gelen talep, taşınma değil kurulum oluyor: mağazadan alınmış yatak odası, koltuk takımı ya da beyaz eşyanın adrese getirilip yerine kurulması. Bu iş taşınmadan farklı yürüyor — çıkış noktası bir ev değil mağaza ya da depo, yük ambalajlı ve sayılı, iş de kurulumla bitiyor.</p><p>Burada belirleyici olan şey ölçü: parçanın kapıdan ve asansörden geçip geçmeyeceği alınmadan yola çıkmıyoruz. Kuşadası’nda <strong>evden eve nakliyat</strong> ekibimiz bu işlerde ambalaj atığını da toplayıp götürüyor; kutu ve strafor evde kalmıyor.</p>`,
    kunye: [
      { label: 'Teslim ve montaj', value: 'Mağaza ya da depodan alınan yeni mobilya adrese kuruluyor.' },
      { label: 'Ölçü', value: 'Kapı ve asansörden geçip geçmeyeceği yola çıkmadan belirleniyor.' },
      { label: 'Ambalaj atığı', value: 'Kutu ve strafor ekip tarafından toplanıp götürülüyor.' },
    ],
    guzergahlar: [
      { to: 'Söke', note: 'Güneydoğu aksı; günübirlik.' },
      { to: 'Efeler', note: 'Doğuya geçiş; Aydın merkezi, yol süresi planlanıyor.' },
      { to: 'Didim', note: 'Güney yönü; güzergâh sahil hattından.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Mağazadan aldığım mobilyayı taşır ve kurar mısınız?', answer: 'Taşıyoruz ve kuruyoruz. Çıkış noktası mağaza ya da depo olabiliyor, iş kurulumla bitiyor.' },
      { question: 'Parça asansöre sığmazsa ne oluyor?', answer: 'Ölçüyü yola çıkmadan alıyoruz. Sığmıyorsa merdiven ya da dış cephe asansörü planını baştan kuruyoruz.' },
      { question: 'Kutular evde kalıyor mu?', answer: 'Kalmıyor. Ambalaj atığını toplayıp götürüyoruz.' },
    ],
  },

  {
    ad: 'Didim',
    derinlik: 'orta',
    ozet:
      'Didim’de uzun süre kapalı kalmış evlerden taşıma sık; elektrik ve su açık mı, ev havalandırıldı mı önceden soruluyor.',
    metaAciklama:
      'Didim evden eve nakliyat: uzun süre kapalı kalmış evde taşıma öncesi hazırlık, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Didim’deki işlerin bir bölümü aylardır açılmamış evlerden çıkıyor. Bu evlerde iki şey taşımayı yavaşlatıyor: elektrik ya da su kapalı olabiliyor ve eşya üzerinde toz birikmiş oluyor. Karanlık bir merdivende ağır parça indirmek hem yavaş hem risklidir; tozlu eşyayı da paketlemeden önce silmek gerekiyor.</p><p>Bu yüzden randevudan önce iki soruyu soruyoruz: sayaçlar açık mı, ev taşımadan bir gün önce havalandırılabilir mi. Didim’de <strong>evden eve nakliyat</strong> ekibi gerekirse kendi aydınlatmasıyla geliyor, ama bunu bilerek planlamak taşımanın süresini kısaltıyor.</p>`,
    kunye: [
      { label: 'Kapalı ev', value: 'Aylardır açılmamış evlerde elektrik ya da su kapalı olabiliyor.' },
      { label: 'İki soru', value: 'Sayaçlar açık mı, ev bir gün önce havalandırılabilir mi.' },
      { label: 'Toz', value: 'Eşya paketlenmeden önce siliniyor; bu süre plana yazılıyor.' },
    ],
    guzergahlar: [
      { to: 'Söke', note: 'Kuzeydoğu aksı; yol süresi planlanıyor.' },
      { to: 'Kuşadası', note: 'Kuzey yönü; sahil hattı.' },
      { to: 'Aydın', note: 'İl merkezi; mesafe hesaba katılıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Ev uzun süredir kapalı, sorun olur mu?', answer: 'Olmuyor. Sayaçların açık olup olmadığını önceden soruyoruz; gerekirse kendi aydınlatmamızla geliyoruz.' },
      { question: 'Tozlu eşyayı siz mi temizliyorsunuz?', answer: 'Paketlemeden önce siliyoruz. Bu süre plana yazılıyor, taşıma günü sürpriz olmuyor.' },
      { question: 'Evde olmadan taşıma yaptırabilir miyim?', answer: 'Yaptırabilirsiniz. Anahtar teslim çalışıyor, yükleme ve teslim aşamalarını fotoğrafla kaydediyoruz.' },
    ],
  },

  {
    ad: 'Germencik',
    derinlik: 'orta',
    ozet:
      'Germencik taşımalarında işin görünmeyen kısmı aracın içi; istif düzeni bozulursa yol boyunca eşya birbirine yükleniyor.',
    metaAciklama:
      'Germencik evden eve nakliyat: araç içi istif ve sabitleme düzeni, sigortalı ambalaj ve yazılı sabit fiyat.',
    govde: `<p>Germencik’teki işlerde eşyanın araca hangi sırayla ve nasıl yerleştirildiği, taşıma sırasındaki en belirleyici ayrıntı oluyor. Ağır ve düz parçalar en alta ve dibe, hafif koliler üste; kırılacaklar araya değil, kendi bölmesine. Aralarda boşluk bırakılmıyor, çünkü boşluk yolda hareket demek.</p><p>Yükleme bittiğinde kasa kayışlarla bölümlere ayrılıyor ve her bölüm ayrı sabitleniyor. Germencik’te <strong>evden eve nakliyat</strong> yaparken bu düzeni yükleme sırasında kuruyoruz; sonradan düzeltmek yükün yarısını indirmek anlamına geliyor.</p>`,
    kunye: [
      { label: 'İstif sırası', value: 'Ağır ve düz parçalar alta, hafif koliler üste; kırılacaklar kendi bölmesinde.' },
      { label: 'Boşluk', value: 'Aralarda boşluk bırakılmıyor; boşluk yolda hareket demek.' },
      { label: 'Sabitleme', value: 'Kasa kayışlarla bölümlere ayrılıyor, her bölüm ayrı sabitleniyor.' },
    ],
    guzergahlar: [
      { to: 'İncirliova', note: 'Doğuya geçiş; güzergâh düz.' },
      { to: 'Efeler', note: 'Aydın merkezi; günübirlik.' },
      { to: 'Söke', note: 'Güneybatı yönü; yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Eşyam yolda zarar görür mü?', answer: 'İstif ve sabitleme bunun için var. Kasa kayışlarla bölümlere ayrılıyor, boşluk bırakılmıyor.' },
      { question: 'Kırılacak eşya nereye konuyor?', answer: 'Araya sıkıştırılmıyor; kendi bölmesinde ve sabitlenmiş hâlde taşınıyor.' },
      { question: 'Yükleme neden zaman alıyor?', answer: 'Düzen yükleme sırasında kuruluyor. Sonradan düzeltmek yükün yarısını indirmek anlamına geldiği için baştan doğru yapılıyor.' },
    ],
  },

  {
    ad: 'İncirliova',
    derinlik: 'orta',
    ozet:
      'İncirliova’da taşıma günü ev halkına göre planlanıyor; çocuk ve yaşlı varsa hangi odanın önce kurulacağı belli oluyor.',
    metaAciklama:
      'İncirliova evden eve nakliyat: çocuklu ve yaşlı hanelere uygun taşıma günü düzeni, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>İncirliova’daki işlerde taşıma gününü zorlaştıran şey çoğu zaman eşya değil, evin kendi düzeni oluyor. Çocuklu ya da yaşlı bireyin bulunduğu hanelerde gün boyu açık kapı, sürekli giriş çıkış ve boşalan odalar yorucu hâle geliyor. Bunu plana katıyoruz.</p><p>Varışta ilk kurduğumuz oda genellikle çocuğun odası ya da dinlenilecek oda oluyor; yatak kurulup yatağı yapıldığında evin geri kalanı rahat bekleyebiliyor. İncirliova’da <strong>evden eve nakliyat</strong> sırasında ilk gün gerekecek eşyaları da ayrı bir kutuda topluyoruz: ilaç, havlu, şarj aleti, birkaç bardak. Bu kutu araca en son biniyor ve eve ilk giriyor.</p>`,
    kunye: [
      { label: 'İlk kurulan oda', value: 'Çocuk odası ya da dinlenilecek oda önce kuruluyor, yatak yapılıyor.' },
      { label: 'İlk gün kutusu', value: 'İlaç, havlu, şarj aleti gibi parçalar ayrı kutuda; en son yükleniyor, ilk giriyor.' },
      { label: 'Gün düzeni', value: 'Açık kapı ve sürekli giriş çıkış hesaba katılarak saat planlanıyor.' },
    ],
    guzergahlar: [
      { to: 'Efeler', note: 'Doğuya kısa mesafe; iş aynı gün bitiyor.' },
      { to: 'Germencik', note: 'Batıya geçiş; güzergâh düz.' },
      { to: 'Aydın', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Küçük çocuğumuz var, taşıma günü nasıl ilerliyor?', answer: 'Varışta önce çocuğun odasını kuruyor, yatağını yapıyoruz. Evin geri kalanı bundan sonra rahat bekliyor.' },
      { question: 'İlk gün gerekecek eşyalar karışır mı?', answer: 'Karışmaması için ayrı bir kutuda topluyoruz. O kutu araca en son biniyor, eve ilk giriyor.' },
      { question: 'Taşıma saatini biz seçebilir miyiz?', answer: 'Seçebilirsiniz. Hanenin düzenine uygun saat aralığını keşifte birlikte belirliyoruz.' },
    ],
  },

  {
    ad: 'Çine',
    derinlik: 'orta',
    ozet:
      'Çine’den il dışına giden uzun güzergâhlarda ayna, cam ve tablo gibi düz yüzeyler ahşap sandığa alınıyor.',
    metaAciklama:
      'Çine evden eve nakliyat: uzun güzergâhta ayna ve cam için ahşap sandıklama, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Çine’den yapılan taşımaların bir bölümü il dışına, güney yönüne uzun bir güzergâh üzerinden gidiyor. Yol uzadıkça titreşim süresi de uzuyor ve bundan en çok etkilenen parçalar büyük düz yüzeyler oluyor: boy aynası, cam sehpa tablası, vitrin camı, çerçeveli tablo.</p><p>Bu parçalar için balonlu naylon tek başına yeterli olmuyor; ölçüsüne göre ahşap sandık hazırlayıp içine sabitliyoruz. Çine’de <strong>evden eve nakliyat</strong> teklifinde sandıklama ayrı bir kalem olarak görünüyor, çünkü malzeme ve işçilik gerektiriyor — ama hangi parçalar için gerekli olduğuna keşifte birlikte karar veriyoruz.</p>`,
    kunye: [
      { label: 'Uzun güzergâh', value: 'İl dışı taşımalarda titreşim süresi uzuyor; düz yüzeyler en çok etkileniyor.' },
      { label: 'Sandıklama', value: 'Ayna, cam tabla ve tablo için ölçüsüne göre ahşap sandık hazırlanıyor.' },
      { label: 'Fiyat', value: 'Sandıklama ayrı kalem olarak yazılıyor; hangi parçaya gerekli olduğu keşifte belirleniyor.' },
    ],
    guzergahlar: [
      { to: 'Efeler', note: 'Kuzeye geçiş; Aydın merkezi, yol süresi planlanıyor.' },
      { to: 'Nazilli', note: 'Kuzeydoğu aksı; günübirlik.' },
      { to: 'Aydın', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Boy aynam kırılır mı?', answer: 'Uzun güzergâhta risk artıyor. Bu yüzden ölçüsüne göre ahşap sandık hazırlayıp içine sabitliyoruz.' },
      { question: 'Sandıklama her taşımada gerekiyor mu?', answer: 'Gerekmiyor. Kısa mesafede ambalaj yeterli oluyor; kararı keşifte birlikte veriyoruz.' },
      { question: 'Sandıklama fiyata nasıl yansıyor?', answer: 'Ayrı kalem olarak yazılıyor. Kaç parça için gerektiği baştan belli oluyor, sonradan eklenmiyor.' },
    ],
  },
]

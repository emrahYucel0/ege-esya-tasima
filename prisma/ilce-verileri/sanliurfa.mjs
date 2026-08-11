// prisma/ilce-verileri/sanliurfa.mjs
//
// Şanlıurfa'nın 13 ilçesinden 8'i. BEŞİ BİLEREK ATLANDI.
//
// ATLANANLAR: Ceylanpınar, Bozova, Halfeti, Harran, Hilvan
//   Aramada karşılığı düşük olanların yanında ikisi ÖZELLİKLE çıkarıldı:
//     · Harran — doğal ekseni tek katlı yapı ve asansörsüz çalışma olurdu;
//       o eksen Gaziantep/Oğuzeli'nde kullanıldı.
//     · Halfeti — doğal ekseni su ve tekne üzerinden turizm olurdu; bu
//       konuda doğrulanmış bilgim yok, uydurmaktansa ilçeyi almadım.
//
// DERİNLİK: 'tam' (3) / 'orta' (5)
//
// EN BARİZ EKSEN KAPALI: SICAK
//   Adana/Seyhan'da "yaz sıcağı taşımanın SAATİNİ belirliyor" ekseni
//   kullanıldı. Bu ilde sıcaktan yalnızca Eyyübiye'de söz ediliyor ve
//   orada da mekanizma tamamen farklı: konu saat seçimi DEĞİL, kapalı
//   kasa içindeki sıcaklığın hangi eşyaya ne yaptığı. Saat seçimi
//   çerçevesine hiç girilmiyor.
//
// GAZİANTEP'TEN AYRIŞMA (Güneydoğu'da ikinci il)
//   Gaziantep'te zanaat atölyesi (Şahinbey), halı rulosu (Şehitkamil),
//   hasat (Nizip), uzun güzergâh (İslahiye), düşük katlı yapı (Oğuzeli),
//   dönüş yükü (Nurdağı) ve dağınık köy (Araban) kullanıldı. Bu ilde
//   hiçbirine girilmiyor.
//
//   Manisa ve Aydın'da olduğu gibi eksenler yerin özelliğinden değil
//   TAŞIMA İŞİNİN AŞAMALARINDAN çıkarıldı: araç sayısı, kasa içi koşullar,
//   iki günlük iş, fiyat dökümü, randevu haberleşmesi, eşya ayıklama,
//   adres tarifi, çatıdaki ekipman.
//
// SINIR İLÇELERİ
//   Suruç ve Akçakale sınır ilçeleri. Bu sayfalarda yalnızca taşıma
//   lojistiği anlatılıyor; nüfus, göç ve güvenlik gibi doğrulanmış
//   bilgim olmayan konulara hiç girilmiyor.
//
// MAHALLELER
//   Tamamı boş bırakıldı; Şanlıurfa mahalle adları konusunda doğrulanmış
//   bilgim yok. (Aynı kural Denizli, Manisa ve Aydın'da da uygulandı.)
//
// Ortak kurallar: uydurma mahalle/rakam yok, "evden eve nakliyat" sayfa
// başına tam bir kez. (bkz. izmir.mjs başlığındaki ayrıntılı gerekçe)

export const il = { ad: 'Şanlıurfa', plaka: 63 }

export const ilceler = [
  // ───────────────────────── TAM DERİNLİK (3) ─────────────────────────
  {
    ad: 'Haliliye',
    derinlik: 'tam',
    ozet:
      'Haliliye’de büyük hacimli taşımalarda tek araçla iki sefer yerine iki araçla tek sefer yapılıyor.',
    metaAciklama:
      'Haliliye evden eve nakliyat: büyük hacimde iki araçla tek seferde taşıma, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Haliliye’deki işlerin bir bölümü tek araca sığmıyor. Bu noktada iki yol var: aynı araçla iki sefer yapmak ya da iki aracı aynı anda çalıştırmak. İkisi aynı şey değil — tek araçla iki sefer, ekibin yolda geçirdiği süreyi ikiye katlıyor ve ikinci sefer beklenirken eski evde de yeni evde de iş duruyor.</p><p>Hacim belirli bir ölçünün üzerindeyse iki araçla tek sefer yapmayı tercih ediyoruz. Yükleme ikiye bölünüyor, araçlar birlikte hareket ediyor ve boşaltma tek seferde bitiyor. Haliliye’de <strong>evden eve nakliyat</strong> teklifi verirken hangi seçeneğin uygulanacağını keşifte söylüyoruz; ikisinin süresi de fiyatı da farklı oluyor.</p><p>İki araçlı işlerde neyin hangi araca bineceği de rastgele olmuyor. Bir odanın eşyası bölünmüyor, aynı araçta kalıyor; böylece boşaltmada hangi aracın nereye gideceği belli oluyor ve iki ekip birbirini beklemeden çalışıyor.</p>`,
    kunye: [
      { label: 'İki seçenek', value: 'Tek araçla iki sefer ya da iki araçla tek sefer; ikisi aynı şey değil.' },
      { label: 'Tercih', value: 'Hacim büyükse iki araç birlikte hareket ediyor, boşaltma tek seferde bitiyor.' },
      { label: 'Yük dağılımı', value: 'Bir odanın eşyası bölünmüyor, aynı araçta kalıyor.' },
      { label: 'Karar', value: 'Hangi seçeneğin uygulanacağı keşifte söyleniyor; süre ve fiyat farklı.' },
    ],
    guzergahlar: [
      { to: 'Eyyübiye', note: 'Şehir içi geçiş; iş aynı gün bitiyor.' },
      { to: 'Karaköprü', note: 'Kuzeye geçiş; günübirlik.' },
      { to: 'Viranşehir', note: 'Doğuya çıkış; yol süresi planlanıyor.' },
      { to: 'Şanlıurfa', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Eşyam tek araca sığmazsa ne oluyor?',
        answer:
          'Hacme göre karar veriyoruz. Büyük işlerde iki aracı birlikte gönderiyoruz; boşaltma tek seferde bitiyor ve iş beklemede kalmıyor.',
      },
      {
        question: 'İki araç fiyatı ikiye katlar mı?',
        answer:
          'Katlamıyor. İki araçla tek sefer, tek araçla iki seferden çoğu zaman daha kısa sürüyor; fiyatı keşifte yazılı veriyoruz.',
      },
      {
        question: 'Eşyalar iki araca karışık mı yükleniyor?',
        answer:
          'Hayır. Bir odanın eşyası bölünmüyor; böylece boşaltmada hangi aracın nereye gideceği belli oluyor.',
      },
      {
        question: 'Verilen fiyat sonradan değişir mi?',
        answer:
          'Değişmiyor. Keşif sonrası verilen yazılı fiyat taşıma gününe kadar geçerli kalıyor.',
      },
    ],
  },

  {
    ad: 'Eyyübiye',
    derinlik: 'tam',
    ozet:
      'Eyyübiye’de kapalı kasa içindeki sıcaklık bazı eşyalara zarar veriyor; o parçalar ayrı kutuda ve en son yükleniyor.',
    metaAciklama:
      'Eyyübiye evden eve nakliyat: sıcaktan etkilenen eşya için ayrı paketleme ve yükleme sırası. Yazılı sabit fiyat.',
    govde: `<p>Eyyübiye’deki taşımalarda üzerinde durduğumuz konu, kapalı bir araç kasasının içinin dışarıdan daha sıcak olması. Eşyanın çoğu bundan etkilenmiyor, ama bir bölümü etkileniyor: mum ve balmumu ürünleri yumuşuyor, plastik kutular şekil değiştirebiliyor, ilaç ve kozmetik ürünlerin bir kısmı sıcakta bekletilmemesi gerekenler arasında, elektronik cihazlar ise uzun süre sıcakta kalınca sorun çıkarabiliyor.</p><p>Bu parçaları kolilere karıştırmıyoruz. Ayrı bir kutuda topluyor, kutuyu araca en son yüklüyor ve varışta ilk onu indiriyoruz; böylece kasada geçirdiği süre en aza iniyor. Eyyübiye’de <strong>evden eve nakliyat</strong> keşfinde bu kalemleri tek tek soruyoruz, çünkü koliye girdikten sonra ayırmak mümkün olmuyor.</p><p>Kısa mesafeli şehir içi işlerde bu önlem çoğu zaman gerekmiyor. Uzun güzergâhlarda ve yükün araçta beklediği durumlarda ise fark ediliyor; hangi durumda olduğunuzu keşifte söylüyoruz.</p>`,
    kunye: [
      { label: 'Kasa içi sıcaklık', value: 'Kapalı kasanın içi dışarıdan sıcak; eşyanın bir bölümü bundan etkileniyor.' },
      { label: 'Etkilenen kalemler', value: 'Mum, plastik kutu, ilaç ve kozmetik ile elektronik cihazlar.' },
      { label: 'Yükleme sırası', value: 'Ayrı kutuda toplanıyor, en son yükleniyor, varışta ilk indiriliyor.' },
      { label: 'Ne zaman gerekli', value: 'Kısa şehir içi işlerde çoğu zaman gerekmiyor; uzun güzergâhta fark ediyor.' },
    ],
    guzergahlar: [
      { to: 'Haliliye', note: 'Şehir içi geçiş; iş aynı gün bitiyor.' },
      { to: 'Karaköprü', note: 'Kuzeye geçiş; günübirlik.' },
      { to: 'Akçakale', note: 'Güneye çıkış; yol süresi planlanıyor.' },
      { to: 'Şanlıurfa', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'İlaçlarımı ve kozmetik ürünlerimi taşıyabilir miyim?',
        answer:
          'Taşıyabilirsiniz. Bunları ayrı bir kutuda topluyoruz; kutu araca en son biniyor ve varışta ilk iniyor.',
      },
      {
        question: 'Televizyon ve bilgisayar sıcaktan zarar görür mü?',
        answer:
          'Uzun süre sıcakta kalırsa risk var. Elektronik cihazları da bu ayrı gruba alıyor, kasada geçirdikleri süreyi kısaltıyoruz.',
      },
      {
        question: 'Bu önlem her taşımada uygulanıyor mu?',
        answer:
          'Kısa şehir içi işlerde çoğu zaman gerekmiyor. Uzun güzergâhta ve yükün beklediği durumlarda uyguluyoruz.',
      },
      {
        question: 'Keşif ücretli mi?',
        answer: 'Keşif ücretsiz. Sıcaktan etkilenen kalemleri de o sırada listeye alıyoruz.',
      },
    ],
  },

  {
    ad: 'Siverek',
    derinlik: 'tam',
    ozet:
      'Siverek’te işlerin bir bölümü tek güne sığmıyor; iki günlük planda gece eşyanın nerede kalacağı baştan belirleniyor.',
    metaAciklama:
      'Siverek evden eve nakliyat: iki güne yayılan taşımalarda gece planı ve ekip düzeni, yazılı sabit fiyat.',
    govde: `<p>Siverek il merkezine uzak ve ilçenin kendi içinde de mesafeler var. Büyük hacimli bir iş bu koşullarda tek güne her zaman sığmıyor. Sığmayacağını taşıma günü anlamak en kötü senaryo: ekip yorgun, yük yarıda, iki adres de dağınık kalıyor.</p><p>Bu yüzden keşifte açıkça hesaplıyoruz ve gerekiyorsa işi baştan iki güne yayıyoruz. İki günlük planda üç şey önceden karara bağlanıyor: ilk gün neyin yükleneceği, gece eşyanın nerede kalacağı ve ekibin nerede konaklayacağı. Siverek’te <strong>evden eve nakliyat</strong> yaparken eşyayı gece açıkta bırakmıyoruz; yük ya kapalı araçta mühürlü kalıyor ya da kapalı bir alana alınıyor.</p><p>İlk gün genellikle büyük mobilya ve az kullanılan eşya taşınıyor; günlük ihtiyaç malzemesi ikinci güne bırakılıyor. Böylece siz ilk geceyi eski evde geçirebiliyorsunuz ve iki adres arasında eksik kalan bir şey olmuyor.</p>`,
    kunye: [
      { label: 'Tek güne sığmama', value: 'Hesap keşifte yapılıyor; gerekiyorsa iş baştan iki güne yayılıyor.' },
      { label: 'Gece planı', value: 'Eşya açıkta bırakılmıyor; mühürlü araçta ya da kapalı alanda kalıyor.' },
      { label: 'İlk gün', value: 'Büyük mobilya ve az kullanılan eşya taşınıyor.' },
      { label: 'İkinci gün', value: 'Günlük ihtiyaç malzemesi taşınıyor; ilk gece eski evde geçirilebiliyor.' },
    ],
    guzergahlar: [
      { to: 'Haliliye', note: 'Güneybatı aksı; Şanlıurfa merkezi, yol süresi planlanıyor.' },
      { to: 'Viranşehir', note: 'Güneydoğu yönü; mesafe hesaba katılıyor.' },
      { to: 'Şanlıurfa', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Taşıma tek günde bitmezse ne oluyor?',
        answer:
          'Bunu keşifte hesaplıyoruz. Sığmayacaksa işi baştan iki güne yayıyoruz; taşıma günü sürpriz olmuyor.',
      },
      {
        question: 'Gece eşyam nerede kalıyor?',
        answer:
          'Açıkta bırakmıyoruz. Yük ya kapalı ve mühürlü araçta kalıyor ya da kapalı bir alana alınıyor.',
      },
      {
        question: 'İlk gece nerede kalacağız?',
        answer:
          'Günlük ihtiyaç malzemesini ikinci güne bıraktığımız için ilk geceyi eski evde geçirebiliyorsunuz.',
      },
      {
        question: 'İki günlük iş fiyatı nasıl etkiliyor?',
        answer:
          'Ek süre ve konaklama keşifte hesaplanıp yazılı fiyata giriyor; sonradan eklenen bir kalem olmuyor.',
      },
    ],
  },

  // ───────────────────────── ORTA DERİNLİK (5) ─────────────────────────
  {
    ad: 'Karaköprü',
    derinlik: 'orta',
    ozet:
      'Karaköprü’de teklif tek rakam olarak verilmiyor; araç, ekip, ambalaj ve montaj ayrı kalemler hâlinde yazılıyor.',
    metaAciklama:
      'Karaköprü evden eve nakliyat: kalem kalem fiyat dökümü, sigortalı ambalaj ve montaj dahil, yazılı sabit fiyat.',
    govde: `<p>Karaköprü’de verdiğimiz teklif tek bir rakamdan ibaret değil. Araç, ekip, ambalaj malzemesi, varsa dış cephe asansörü ve montaj ayrı satırlarda yazılıyor. Böylece fiyatın nereden geldiği görünüyor ve hangi kalemin çıkarılabileceğini konuşabiliyoruz.</p><p>Bu döküm, karşılaştırma yaparken de işinize yarıyor: bir teklif diğerinden ucuzsa hangi kalemin eksik olduğunu görebiliyorsunuz. Karaköprü’de <strong>evden eve nakliyat</strong> fiyatının sabit kalmasını sağlayan şey de bu — hangi kalemin dahil olduğu baştan yazılı olduğu için sonradan ek çıkmıyor.</p>`,
    kunye: [
      { label: 'Kalem dökümü', value: 'Araç, ekip, ambalaj, dış cephe asansörü ve montaj ayrı satırlarda.' },
      { label: 'Çıkarılabilir kalem', value: 'Hangi kalemin çıkarılabileceği konuşulabiliyor.' },
      { label: 'Karşılaştırma', value: 'Başka bir teklifte hangi kalemin eksik olduğu görülebiliyor.' },
    ],
    guzergahlar: [
      { to: 'Haliliye', note: 'Güneye geçiş; iş aynı gün bitiyor.' },
      { to: 'Eyyübiye', note: 'Güney yönü; günübirlik.' },
      { to: 'Şanlıurfa', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Fiyata neler dahil?', answer: 'Araç, ekip, ambalaj, gerekiyorsa dış cephe asansörü ve montaj. Hepsi teklifte ayrı satırda yazılı.' },
      { question: 'Ambalajı kendim yaparsam fiyat düşer mi?', answer: 'Düşer. Ambalaj ayrı kalem olduğu için çıkarıldığında fiyat da düşüyor.' },
      { question: 'Sonradan ek ücret çıkar mı?', answer: 'Çıkmıyor. Hangi kalemin dahil olduğu baştan yazılı olduğu için sürpriz olmuyor.' },
    ],
  },

  {
    ad: 'Viranşehir',
    derinlik: 'orta',
    ozet:
      'Viranşehir’de ekip yola çıktığında haber veriliyor; tahmini varış ve gecikme bildirimi işin parçası.',
    metaAciklama:
      'Viranşehir evden eve nakliyat: yola çıkış bildirimi ve tahmini varış saati, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Viranşehir merkeze uzak olduğu için ekibin adrese ulaşması zaman alıyor. Bu mesafede en çok rahatsızlık veren şey gecikmenin kendisi değil, haber alamamak oluyor: “geliyoruz” denip saatlerce ses çıkmaması.</p><p>Bunu bir kurala bağladık. Ekip yola çıktığında haber veriyor, tahmini varış saatini söylüyor; yolda beklenmedik bir durum olursa yeni saati siz sormadan iletiyoruz. Viranşehir’de <strong>evden eve nakliyat</strong> randevusu saat aralığı olarak veriliyor, tek bir dakika olarak değil — böylece verilen söz tutulabilir bir söz oluyor.</p>`,
    kunye: [
      { label: 'Yola çıkış bildirimi', value: 'Ekip hareket ettiğinde haber veriliyor.' },
      { label: 'Tahmini varış', value: 'Varış saati baştan söyleniyor; değişirse sorulmadan iletiliyor.' },
      { label: 'Randevu biçimi', value: 'Saat aralığı olarak veriliyor; tutulabilir bir söz oluyor.' },
    ],
    guzergahlar: [
      { to: 'Haliliye', note: 'Batıya geçiş; Şanlıurfa merkezi, yol süresi planlanıyor.' },
      { to: 'Siverek', note: 'Kuzeybatı yönü; mesafe hesaba katılıyor.' },
      { to: 'Şanlıurfa', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Ekip saat kaçta gelir?', answer: 'Randevuyu saat aralığı olarak veriyoruz. Ekip yola çıktığında haber ediyor ve tahmini varışı söylüyor.' },
      { question: 'Gecikme olursa haber veriyor musunuz?', answer: 'Veriyoruz. Yeni saati siz sormadan iletiyoruz.' },
      { question: 'Mesafe fiyata yansıyor mu?', answer: 'Yol süresi işin parçası olduğu için yansıyor; ne kadar olduğunu keşifte açıkça söylüyoruz.' },
    ],
  },

  {
    ad: 'Birecik',
    derinlik: 'orta',
    ozet:
      'Birecik’te taşımadan önce eşya ayıklanıyor; gitmeyecek parçalar ikinci ele mi bağışa mı ayrılacak birlikte kararlaştırılıyor.',
    metaAciklama:
      'Birecik evden eve nakliyat: taşıma öncesi eşya ayıklama ve hacim azaltma, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Birecik’teki işlerde taşımadan önceki adım çoğu zaman ayıklama oluyor. Yıllarca kullanılmamış eşyayı yeni eve taşımak hem hacmi hem fiyatı büyütüyor; üstelik varışta aynı eşya için yer aranıyor. Keşifte “bu gerçekten gidecek mi” sorusunu her büyük parça için soruyoruz.</p><p>Gitmeyecek parçalar için kararı siz veriyorsunuz: ikinci ele mi, bağışa mı, atılacak mı. Birecik’te <strong>evden eve nakliyat</strong> planında bu üç grup ayrı ayrı işaretleniyor ve taşıma günü karıştırılmıyor. Hacim küçüldüğünde araç ölçüsü ve fiyat da buna göre düşüyor.</p>`,
    kunye: [
      { label: 'Ayıklama', value: 'Her büyük parça için “gerçekten gidecek mi” sorusu soruluyor.' },
      { label: 'Üç grup', value: 'İkinci el, bağış ve atılacak ayrı işaretleniyor; taşıma günü karışmıyor.' },
      { label: 'Fiyat etkisi', value: 'Hacim küçülünce araç ölçüsü ve fiyat da düşüyor.' },
    ],
    guzergahlar: [
      { to: 'Haliliye', note: 'Doğuya geçiş; Şanlıurfa merkezi, yol süresi planlanıyor.' },
      { to: 'Suruç', note: 'Güneydoğu yönü; güzergâh düz.' },
      { to: 'Şanlıurfa', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Taşımayacağım eşyaları siz mi götürüyorsunuz?', answer: 'Kararı siz veriyorsunuz. İkinci el, bağış ve atılacak gruplarını ayrı işaretliyoruz; taşıma günü karışmıyor.' },
      { question: 'Eşya azalırsa fiyat düşer mi?', answer: 'Düşer. Hacim küçülünce araç ölçüsü de fiyat da buna göre iniyor.' },
      { question: 'Ayıklamayı ne zaman yapmalıyız?', answer: 'Keşif sırasında birlikte başlıyoruz; taşıma gününe bırakmamak en iyisi.' },
    ],
  },

  {
    ad: 'Suruç',
    derinlik: 'orta',
    ozet:
      'Suruç’ta kırsal adreslerde kapı numarası her zaman işe yaramıyor; buluşma noktası önceden kararlaştırılıyor.',
    metaAciklama:
      'Suruç evden eve nakliyat: kırsal adreste tarif ve buluşma noktası planlaması, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Suruç’ta ilçe merkezi dışındaki adreslerde kapı numarası ve harita her zaman yeterli olmuyor. Ekip doğru köye ulaşıyor ama doğru eve ulaşamıyor; bu da yükleme başlamadan yarım saat kaybettiriyor. Sorunun çözümü teknik değil, önceden konuşmakla ilgili.</p><p>Randevu alırken ana yol üzerinde bir buluşma noktası belirliyoruz ve bir kişinin telefonunu alıyoruz. Ekip o noktaya ulaştığında arıyor, oradan birlikte gidiliyor. Suruç’ta <strong>evden eve nakliyat</strong> işlerinde bu tek adım, yol kenarında geçen süreyi tamamen ortadan kaldırıyor.</p>`,
    kunye: [
      { label: 'Adres sorunu', value: 'Kırsalda kapı numarası ve harita doğru eve götürmeyebiliyor.' },
      { label: 'Buluşma noktası', value: 'Ana yol üzerinde bir nokta önceden kararlaştırılıyor.' },
      { label: 'İletişim', value: 'Bir kişinin telefonu alınıyor; ekip noktaya varınca arıyor.' },
    ],
    guzergahlar: [
      { to: 'Haliliye', note: 'Doğuya geçiş; Şanlıurfa merkezi, yol süresi planlanıyor.' },
      { to: 'Birecik', note: 'Kuzeybatı yönü; güzergâh düz.' },
      { to: 'Şanlıurfa', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Adresi bulmakta zorlanır mısınız?', answer: 'Zorlanmamak için ana yol üzerinde buluşma noktası belirliyoruz; ekip oraya varınca arıyor.' },
      { question: 'Köy yoluna büyük araç girer mi?', answer: 'Yol genişliğini keşifte soruyoruz. Girmiyorsa yükü küçük araca aktarıyoruz.' },
      { question: 'Keşif için gelmeniz gerekiyor mu?', answer: 'Uzak adreslerde fotoğraf ya da görüntülü görüşme çoğu zaman yeterli oluyor.' },
    ],
  },

  {
    ad: 'Akçakale',
    derinlik: 'orta',
    ozet:
      'Akçakale’de çatıdaki güneş enerjisi sistemi ve su deposu taşınacaksa ayrı bir söküm işi olarak planlanıyor.',
    metaAciklama:
      'Akçakale evden eve nakliyat: çatıdaki güneş enerjisi ve su deposu söküm-montajı dahil, yazılı sabit fiyat.',
    govde: `<p>Akçakale’deki taşımalarda zaman zaman gelen bir talep, çatıdaki güneş enerjisi sistemi ve su deposunun da taşınması oluyor. Bu, ev içi eşyadan farklı bir iş: çatıya çıkmak, tesisat bağlantılarını ayırmak, depoyu boşaltmak ve panelleri kırmadan indirmek gerekiyor.</p><p>Bu yüzden çatıdaki ekipmanı taşıma listesine ayrı bir kalem olarak yazıyoruz; ev eşyasının süresine ekleniyor ve ayrı ekipman gerektiriyor. Akçakale’de <strong>evden eve nakliyat</strong> keşfinde bunu baştan soruyoruz, çünkü taşıma günü karar verilebilecek bir iş değil.</p>`,
    kunye: [
      { label: 'Çatı ekipmanı', value: 'Güneş enerjisi sistemi ve su deposu ayrı bir söküm işi.' },
      { label: 'Adımlar', value: 'Tesisat ayrılıyor, depo boşaltılıyor, paneller kırılmadan indiriliyor.' },
      { label: 'Planlama', value: 'Ayrı kalem olarak yazılıyor; taşıma günü karar verilecek bir iş değil.' },
    ],
    guzergahlar: [
      { to: 'Eyyübiye', note: 'Kuzeye geçiş; Şanlıurfa merkezi, yol süresi planlanıyor.' },
      { to: 'Haliliye', note: 'Kuzey yönü; mesafe hesaba katılıyor.' },
      { to: 'Şanlıurfa', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Çatıdaki güneş enerjisini de taşır mısınız?', answer: 'Taşıyoruz. Tesisatı ayırıp depoyu boşaltıyor, panelleri kırmadan indiriyoruz.' },
      { question: 'Bu iş taşıma süresini uzatır mı?', answer: 'Uzatıyor ve ayrı ekipman gerektiriyor. Bu yüzden ayrı kalem olarak yazılıyor.' },
      { question: 'Taşıma günü karar verebilir miyiz?', answer: 'Veremezsiniz; ekip ve ekipman ona göre planlanıyor. Keşifte baştan soruyoruz.' },
    ],
  },
]

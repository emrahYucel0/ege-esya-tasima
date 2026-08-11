// prisma/ilce-verileri/diyarbakir.mjs
//
// Diyarbakır'ın 17 ilçesinden 8'i. DOKUZU BİLEREK ATLANDI.
//
// ATLANANLAR: Çermik, Dicle, Eğil, Hani, Hazro, Kocaköy, Kulp, Lice,
//   Çüngüş — küçük nüfuslu ve aramada karşılığı düşük.
//
// DERİNLİK: 'tam' (3) / 'orta' (5)
//
// SUR HAKKINDA — İKİ BİLİNÇLİ KARAR
//   1. Sur'un doğal ekseni tarihi doku ve dar sokak olurdu; o eksen altı
//      ilçede kullanıldı (Ankara/Beypazarı ve Altındağ, İzmir/Tire ve
//      Bergama, Manisa/Kula, Mersin/Akdeniz). Bu yüzden Sur'a coğrafi
//      değil, işin aşamasından çıkan bir eksen verildi.
//   2. İlçenin yakın tarihine ait konulara hiç girilmiyor. Bu bir nakliyat
//      hizmet sayfası; doğrulanmış bilgim olmayan ve hizmetle ilgisi
//      bulunmayan hiçbir konuyu yazmıyorum. (Aynı kural Şanlıurfa'nın
//      sınır ilçelerinde de uygulandı.)
//
// GÜNEYDOĞU'DA ÜÇÜNCÜ İL — KAPALI EKSENLER
//   Gaziantep: zanaat atölyesi, halı rulosu, hasat, uzun güzergâh, düşük
//     katlı yapı, dönüş yükü, dağınık köy.
//   Şanlıurfa: iki araç, kasa içi sıcaklık, iki günlük iş, fiyat dökümü,
//     randevu haberleşmesi, ayıklama, kırsalda buluşma noktası, çatı
//     ekipmanı.
//   Bu ilde hiçbirine girilmiyor. Sıcak konusu da — Adana/Seyhan ve
//   Şanlıurfa/Eyyübiye'de iki farklı mekanizmayla kullanıldığı için —
//   burada hiç açılmıyor.
//
// BU İLDE EKSENLER: EŞYANIN KENDİSİ
//   Manisa'dan beri eksenler taşıma işinin aşamalarından çıkarılıyordu.
//   Bu ilde bir alt küme seçildi: EŞYA TİPİ. Gardırop içeriği, tavana ve
//   duvara monte parçalar, ankastre cihazlar, buzdolabı, mutfak çekmecesi
//   — her biri kendi kuralı olan ayrı bir yük. Bunların hiçbiri başka bir
//   ilde eksen olarak kullanılmadı.
//
// TURGUTLU'DAN AYRIM
//   Manisa/Turgutlu'da eksen TEKNİK BAĞLANTILAR (nakliye vidası, kombi,
//   klima, askı aparatı) — yani söküm ve montaj işçiliği. Bu ilde:
//     · Bismil — tek bir cihazın fiziği: buz çözme ve dinlenme süresi
//     · Silvan — ankastre cihazın taşınıp taşınmayacağı sorusu
//   İkisi de montaj işçiliği çerçevesinde değil.
//
// MAHALLELER
//   Tamamı boş bırakıldı; Diyarbakır mahalle adları konusunda doğrulanmış
//   bilgim yok.
//
// Ortak kurallar: uydurma mahalle/rakam yok, "evden eve nakliyat" sayfa
// başına tam bir kez. (bkz. izmir.mjs başlığındaki ayrıntılı gerekçe)

export const il = { ad: 'Diyarbakır', plaka: 21 }

export const ilceler = [
  // ───────────────────────── TAM DERİNLİK (3) ─────────────────────────
  {
    ad: 'Kayapınar',
    derinlik: 'tam',
    ozet:
      'Kayapınar’da gardırop içindeki giysiler koliye katlanmıyor; askıda oldukları gibi taşınıyor.',
    metaAciklama:
      'Kayapınar evden eve nakliyat: askılı gardırop kolisiyle giysi taşıma, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Kayapınar’daki taşımalarda en çok vakit kaybettiren işlerden biri gardırop boşaltmak. Giysiler askıdan çıkarılıp katlanıyor, koliye yerleştiriliyor; yeni evde aynı işlem tersten yapılıyor ve ütü gerektiren bir yığın ortaya çıkıyor. İki uçta da saatler gidiyor.</p><p>Bunun yerine askılı koli kullanıyoruz: içinde askı çubuğu olan, giysilerin asılı durduğu dik kutular. Gardıroptaki askılar olduğu gibi çubuğa geçiriliyor, kutu kapanıyor; yeni evde kutu açılıp askılar doğrudan yeni gardıroba aktarılıyor. Kayapınar’da <strong>evden eve nakliyat</strong> yaparken bu yöntem hem süreyi kısaltıyor hem katlama izini ortadan kaldırıyor.</p><p>Askılı koli her taşımada gerekmiyor; giysi hacmi azsa normal koli yeterli oluyor. Kaç kutuya ihtiyaç olduğunu keşifte gardırop genişliğine bakarak belirliyoruz ve teklifte ayrı satırda gösteriyoruz. Kutular taşıma sonunda geri alınıyor, sizde kalmıyor.</p>`,
    kunye: [
      { label: 'Askılı koli', value: 'İçinde askı çubuğu olan dik kutular; giysiler asılı taşınıyor.' },
      { label: 'Kazanç', value: 'Katlama ve yeniden asma adımları ortadan kalkıyor, ütü gerekmiyor.' },
      { label: 'Adet', value: 'Gardırop genişliğine bakılarak keşifte belirleniyor, teklifte ayrı satırda.' },
      { label: 'İade', value: 'Kutular taşıma sonunda geri alınıyor.' },
    ],
    guzergahlar: [
      { to: 'Bağlar', note: 'Şehir içi geçiş; iş aynı gün bitiyor.' },
      { to: 'Yenişehir', note: 'Şehir içi geçiş; günübirlik.' },
      { to: 'Ergani', note: 'Kuzeybatı aksı; yol süresi planlanıyor.' },
      { to: 'Diyarbakır', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Giysilerimi katlamam gerekiyor mu?',
        answer:
          'Gerekmiyor. Askılı koli kullanıyoruz; giysiler askıda kalıyor ve yeni gardıroba doğrudan aktarılıyor.',
      },
      {
        question: 'Askılı koli ek ücret mi?',
        answer:
          'Teklifte ayrı satırda gösteriliyor. Kaç adet gerektiğini keşifte gardırop genişliğine bakarak belirliyoruz.',
      },
      {
        question: 'Kutular bende mi kalıyor?',
        answer: 'Kalmıyor. Taşıma sonunda geri alıyoruz.',
      },
      {
        question: 'Verilen fiyat sonradan değişir mi?',
        answer:
          'Değişmiyor. Keşif sonrası verilen yazılı fiyat taşıma gününe kadar geçerli kalıyor.',
      },
    ],
  },

  {
    ad: 'Bağlar',
    derinlik: 'tam',
    ozet:
      'Bağlar’da avize, perde sistemi ve duvara monte parçalar taşımanın ayrı bir kalemi; söküm de montaj da ekipte.',
    metaAciklama:
      'Bağlar evden eve nakliyat: avize, perde ve duvara monte parçaların söküm-montajı dahil, yazılı sabit fiyat.',
    govde: `<p>Bağlar’daki taşımalarda mobilya bittikten sonra geriye tavan ve duvarlar kalıyor: avizeler, perde korniş ve rayları, duvara sabitlenmiş raflar, televizyon askısı, ayna ve tablo askı aparatları. Bunlar tek tek küçük işler ama toplamı bir saati rahatlıkla buluyor ve çoğu zaman kimsenin listesinde olmuyor.</p><p>Avizede iki ayrı risk var: elektrik bağlantısı ve cam parçalar. Sigortayı indirip bağlantıyı ayırıyor, sarkan cam parçaları tek tek sökerek ayrı paketliyoruz — takılı hâlde taşınan avize yolda kendi parçalarını kırıyor. Bağlar’da <strong>evden eve nakliyat</strong> yaparken kornişleri de duvardan söküyor, vida ve dübellerini kendi torbasında saklıyoruz.</p><p>Yeni adreste montajı yapıyoruz, ama bir sınırımız var: yeni evde delik açmak gerekiyorsa bunu sizin onayınızla yapıyoruz ve nereye açılacağına siz karar veriyorsunuz. Kiralık evlerde ev sahibinin izni olup olmadığını da soruyoruz.</p>`,
    kunye: [
      { label: 'Kapsam', value: 'Avize, korniş ve ray, duvar rafı, televizyon askısı ve tablo aparatları.' },
      { label: 'Avize', value: 'Sigorta indiriliyor, cam parçalar tek tek sökülüp ayrı paketleniyor.' },
      { label: 'Küçük parçalar', value: 'Vida ve dübeller kendi torbasında saklanıyor.' },
      { label: 'Yeni adres', value: 'Delik açılacaksa onayınızla; kiralıkta ev sahibi izni soruluyor.' },
    ],
    guzergahlar: [
      { to: 'Kayapınar', note: 'Şehir içi geçiş; iş aynı gün bitiyor.' },
      { to: 'Sur', note: 'Doğuya geçiş; kısa mesafe.' },
      { to: 'Çınar', note: 'Güneye çıkış; yol süresi planlanıyor.' },
      { to: 'Diyarbakır', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Avizeyi siz mi söküyorsunuz?',
        answer:
          'Söküyoruz. Sigortayı indirip bağlantıyı ayırıyor, sarkan cam parçaları tek tek sökerek ayrı paketliyoruz.',
      },
      {
        question: 'Perde kornişleri de taşınıyor mu?',
        answer:
          'Taşınıyor. Duvardan söküyor, vida ve dübellerini kendi torbasında saklıyoruz.',
      },
      {
        question: 'Yeni evde montaj için delik açıyor musunuz?',
        answer:
          'Açıyoruz, ama onayınızla ve sizin belirlediğiniz yere. Kiralıksa ev sahibinin izni olup olmadığını soruyoruz.',
      },
      {
        question: 'Bu işler fiyata dahil mi?',
        answer:
          'Hangi kalemlerin bulunduğunu keşifte soruyor ve yazılı fiyata baştan yazıyoruz.',
      },
    ],
  },

  {
    ad: 'Ergani',
    derinlik: 'tam',
    ozet:
      'Ergani’de sigorta öncesinde eşyanın değeri beyan ediliyor; yüksek değerli parçalar listede ayrı gösteriliyor.',
    metaAciklama:
      'Ergani evden eve nakliyat: sigorta beyan değeri ve yüksek değerli parça bildirimi, yazılı sabit fiyat.',
    govde: `<p>Ergani il merkezine uzak ve buradan çıkan işlerin bir bölümü uzun güzergâhta ilerliyor. Yol uzadıkça sigortanın nasıl işlediği daha çok önem kazanıyor — ve sigortanın işleyişi tek bir adıma bağlı: beyan.</p><p>Taşıma sigortası, taşınan eşyanın beyan edilen değeri üzerinden çalışıyor. Değer eksik bildirilirse bir hasar durumunda ödenecek tutar da eksik kalıyor. Bu yüzden keşifte toplam değeri birlikte konuşuyor, yüksek değerli parçaları — büyük ekran televizyon, ciddi bir müzik sistemi, antika bir parça — listede ayrı satırda gösteriyoruz. Ergani’de <strong>evden eve nakliyat</strong> sözleşmesinde beyan edilen değer ve poliçe bilgisi birlikte yazılı oluyor.</p><p>Beyan yükseldiğinde prim de değişebiliyor; bunu saklamıyoruz ve farkı önceden söylüyoruz. Karar sizde kalıyor, ama kararı hasar sonrasında değil öncesinde vermiş oluyorsunuz.</p>`,
    kunye: [
      { label: 'Beyan', value: 'Sigorta, beyan edilen değer üzerinden işliyor; eksik beyan eksik tazminat demek.' },
      { label: 'Yüksek değerli parça', value: 'Televizyon, müzik sistemi, antika parça listede ayrı satırda.' },
      { label: 'Sözleşme', value: 'Beyan edilen değer ve poliçe bilgisi birlikte yazılı.' },
      { label: 'Prim farkı', value: 'Beyan yükseldiğinde prim değişebiliyor; fark önceden söyleniyor.' },
    ],
    guzergahlar: [
      { to: 'Kayapınar', note: 'Güneydoğu aksı; Diyarbakır merkezi, yol süresi planlanıyor.' },
      { to: 'Bağlar', note: 'Güneydoğu yönü; günübirlik.' },
      { to: 'Diyarbakır', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Sigorta neye göre ödeme yapıyor?',
        answer:
          'Beyan edilen değer üzerinden. Değer eksik bildirilirse hasar durumunda ödenecek tutar da eksik kalıyor.',
      },
      {
        question: 'Değerli eşyamı nasıl bildiririm?',
        answer:
          'Keşifte listeye ayrı satır olarak yazıyoruz. Böylece poliçede de ayrı görünüyor.',
      },
      {
        question: 'Beyanı yükseltmek fiyatı artırır mı?',
        answer:
          'Prim değişebiliyor. Farkı önceden söylüyoruz, kararı siz veriyorsunuz.',
      },
      {
        question: 'Poliçeyi görebilir miyim?',
        answer: 'Görebilirsiniz. Poliçe bilgisi sözleşmede yazılı oluyor ve bir nüshası sizde kalıyor.',
      },
    ],
  },

  // ───────────────────────── ORTA DERİNLİK (5) ─────────────────────────
  {
    ad: 'Yenişehir',
    derinlik: 'orta',
    ozet:
      'Yenişehir’de taşıma gününden önce hangi ekibin ve hangi aracın geleceği bildiriliyor.',
    metaAciklama:
      'Yenişehir Diyarbakır evden eve nakliyat: ekip ve araç bilgisi önceden bildirilen, sigortalı ve yazılı fiyatlı taşıma.',
    govde: `<p>Yenişehir’de bir taşınma, tanımadığınız birkaç kişiyi eve almak anlamına geliyor. Bunu hafife almıyoruz. Taşıma gününden önce ekip sorumlusunun adını ve aracın plakasını bildiriyoruz; kapıya gelen kişi bu isimle geliyor.</p><p>Ekip firma kıyafetiyle çalışıyor ve sorumlu kişi baştan kendini tanıtıyor; gün boyunca kime soru soracağınız belli oluyor. Yenişehir’de <strong>evden eve nakliyat</strong> sırasında beklemediğiniz bir isim ya da araç gelirse kapıyı açmamanızı, önce bizi aramanızı söylüyoruz.</p>`,
    kunye: [
      { label: 'Önceden bildirim', value: 'Ekip sorumlusunun adı ve aracın plakası taşımadan önce iletiliyor.' },
      { label: 'Tanıtım', value: 'Ekip firma kıyafetiyle geliyor, sorumlu kişi kendini tanıtıyor.' },
      { label: 'Uyuşmazlık', value: 'Beklenmeyen isim ya da araç gelirse kapı açılmadan önce aranması isteniyor.' },
    ],
    guzergahlar: [
      { to: 'Kayapınar', note: 'Şehir içi geçiş; iş aynı gün bitiyor.' },
      { to: 'Bağlar', note: 'Şehir içi geçiş; günübirlik.' },
      { to: 'Diyarbakır', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Eve kim gelecek, önceden öğrenebilir miyim?', answer: 'Öğrenebilirsiniz. Ekip sorumlusunun adını ve araç plakasını taşımadan önce bildiriyoruz.' },
      { question: 'Ekip kıyafetli mi geliyor?', answer: 'Geliyor. Sorumlu kişi ayrıca kendini tanıtıyor; gün boyu muhatabınız o oluyor.' },
      { question: 'Beklemediğim biri gelirse ne yapmalıyım?', answer: 'Kapıyı açmadan bizi arayın. Bildirdiğimiz isim ve plaka dışında kimse gelmiyor.' },
    ],
  },

  {
    ad: 'Sur',
    derinlik: 'orta',
    ozet:
      'Sur’daki taşımalarda mutfak en uzun süren oda; çekmece ve dolap içi boşaltılmadan taşınmıyor.',
    metaAciklama:
      'Sur evden eve nakliyat: mutfak eşyası ve çekmece içeriği için ayrı paketleme, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Sur’daki işlerde en uzun süren oda neredeyse her zaman mutfak oluyor. Sebebi hacim değil parça sayısı: tabak, bardak, tencere, kapak, çatal bıçak, baharat ve kilerdeki açık paketler. Hepsi ayrı ambalaj mantığı istiyor.</p><p>Dolap ve çekmeceler içi doluyken taşınmıyor — ağırlık raf bağlantısını zorluyor ve çekmece yolda açılıyor. İçindekiler boşaltılıp kendi kolisine giriyor, koli üzerine hangi dolaptan çıktığı yazılıyor. Sur’da <strong>evden eve nakliyat</strong> yaparken açık gıda paketlerini ve dolaptaki yiyecekleri de ayrı soruyoruz; bunların bir kısmı taşınmıyor.</p>`,
    kunye: [
      { label: 'En uzun oda', value: 'Mutfak; sebebi hacim değil parça sayısı.' },
      { label: 'Çekmece ve dolap', value: 'İçi doluyken taşınmıyor; boşaltılıp kendi kolisine giriyor.' },
      { label: 'Etiket', value: 'Koli üzerine hangi dolaptan çıktığı yazılıyor.' },
      { label: 'Gıda', value: 'Açık paketler ve dolap içindekiler ayrı soruluyor; bir kısmı taşınmıyor.' },
    ],
    guzergahlar: [
      { to: 'Bağlar', note: 'Batıya geçiş; kısa mesafe.' },
      { to: 'Yenişehir', note: 'Kuzeybatı yönü; iş aynı gün bitiyor.' },
      { to: 'Diyarbakır', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Mutfağı ben mi boşaltmalıyım?', answer: 'İsterseniz biz boşaltıp paketliyoruz. Dolap ve çekmeceler içi doluyken taşınmıyor.' },
      { question: 'Tabak ve bardaklar kırılır mı?', answer: 'Her biri ayrı sarılıp dik yerleştiriliyor; koli aralarında boşluk bırakılmıyor.' },
      { question: 'Buzdolabındaki yiyecekleri ne yapacağız?', answer: 'Bunu keşifte konuşuyoruz. Açık paketlerin ve bozulabilecek ürünlerin bir kısmı taşınmıyor.' },
    ],
  },

  {
    ad: 'Bismil',
    derinlik: 'orta',
    ozet:
      'Bismil’de buzdolabı taşımadan önce boşaltılıp buzu çözülüyor, yeni adreste hemen çalıştırılmıyor.',
    metaAciklama:
      'Bismil evden eve nakliyat: buzdolabı taşımasında buz çözme ve dinlenme süresi, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Bismil’deki taşımalarda üzerinde ayrıca durduğumuz cihaz buzdolabı oluyor. Taşımadan önce boşaltılması ve buzunun çözülmesi gerekiyor; içinde su kalırsa yolda dökülüyor ve hem kendi hem çevresindeki eşyaya zarar veriyor. Bu işlem birkaç saat sürdüğü için taşıma gününe bırakılmıyor, bir gün önceden yapılıyor.</p><p>İkinci nokta varışta: buzdolabı yeni adrese girer girmez fişe takılmıyor. Yolculuk sırasında sıvı yağ sisteme dağılmış olabiliyor ve yerine dönmesi için dolabın dik konumda bir süre beklemesi gerekiyor. Bismil’de <strong>evden eve nakliyat</strong> yaparken bu bekleme süresini söylüyor, cihazı çalıştırmadan önce beklemenizi istiyoruz.</p>`,
    kunye: [
      { label: 'Bir gün önce', value: 'Buzdolabı boşaltılıp buzu çözülüyor; işlem birkaç saat sürüyor.' },
      { label: 'Su', value: 'İçinde su kalırsa yolda dökülüyor ve çevresindeki eşyaya zarar veriyor.' },
      { label: 'Varışta bekleme', value: 'Dik konumda bir süre bekletiliyor, hemen fişe takılmıyor.' },
    ],
    guzergahlar: [
      { to: 'Diyarbakır', note: 'Kuzeybatı aksı; il merkezi, yol süresi planlanıyor.' },
      { to: 'Çınar', note: 'Batıya geçiş; güzergâh düz.' },
      { to: 'Silvan', note: 'Kuzeydoğu yönü; mesafe hesaba katılıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Buzdolabını ne zaman boşaltmalıyım?', answer: 'Taşımadan bir gün önce. Buzun çözülmesi birkaç saat sürüyor, taşıma gününe bırakılmıyor.' },
      { question: 'Yeni evde hemen çalıştırabilir miyim?', answer: 'Çalıştırmayın. Dik konumda bir süre beklemesi gerekiyor; süreyi taşıma sonunda söylüyoruz.' },
      { question: 'Yatık taşınırsa sorun olur mu?', answer: 'Mümkün olduğunca dik taşıyoruz. Zorunlu durumda bekleme süresi uzuyor, bunu ayrıca belirtiyoruz.' },
    ],
  },

  {
    ad: 'Silvan',
    derinlik: 'orta',
    ozet:
      'Silvan’da ankastre cihazların taşınıp taşınmayacağı taşıma gününde değil, keşifte karara bağlanıyor.',
    metaAciklama:
      'Silvan evden eve nakliyat: ankastre fırın, ocak ve davlumbaz için söküm kararı ve planlama. Yazılı sabit fiyat.',
    govde: `<p>Silvan’daki taşımalarda sık çıkan soru şu: ankastre fırın, ocak ve davlumbaz gidiyor mu, kalıyor mu? Cevap her zaman net olmuyor, çünkü bu cihazlar mutfak dolabının parçası gibi duruyor. Kiralık evlerde çoğu zaman kalıyor, kendi evinizse gidiyor.</p><p>Kararın taşıma gününde verilmesi iki soruna yol açıyor: söküm için ayrılmış süre yok ve yerinden çıkan cihazın bıraktığı boşluk dolabı kullanılamaz hâle getiriyor. Silvan’da <strong>evden eve nakliyat</strong> keşfinde bu cihazları tek tek soruyor, gidecekse söküm süresini plana ve fiyata yazıyoruz. Gaz bağlantılı ocaklarda söküm ve montaj yetkili şekilde yapılıyor.</p>`,
    kunye: [
      { label: 'Belirsizlik', value: 'Ankastre cihazlar dolabın parçası gibi duruyor; gidip gitmeyeceği net olmuyor.' },
      { label: 'Karar zamanı', value: 'Taşıma gününde değil keşifte veriliyor; söküm süresi plana yazılıyor.' },
      { label: 'Gaz bağlantısı', value: 'Ocak söküm ve montajı yetkili şekilde yapılıyor.' },
    ],
    guzergahlar: [
      { to: 'Diyarbakır', note: 'Batıya geçiş; il merkezi, yol süresi planlanıyor.' },
      { to: 'Bismil', note: 'Güneybatı yönü; mesafe hesaba katılıyor.' },
      { to: 'Ergani', note: 'Kuzeybatı aksı; güzergâh planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Ankastre fırınımı taşır mısınız?', answer: 'Taşıyoruz. Gidecekse keşifte söylemeniz yeterli; söküm süresini plana ve fiyata yazıyoruz.' },
      { question: 'Ocak gaz bağlantılı, sökülür mü?', answer: 'Söküm ve montaj yetkili şekilde yapılıyor; ayrı bir randevu gerekmiyor.' },
      { question: 'Kiralık evde ne yapmalıyım?', answer: 'Ankastre cihazların kime ait olduğunu ev sahibiyle netleştirin; keşifte bunu birlikte kayda geçiriyoruz.' },
    ],
  },

  {
    ad: 'Çınar',
    derinlik: 'orta',
    ozet:
      'Çınar’da iş teslimle bitmiyor; kurulum sonrası fark edilen eksikler için bildirim süresi tanımlı.',
    metaAciklama:
      'Çınar evden eve nakliyat: teslim sonrası eksik bildirim süresi ve takip, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Çınar’daki işlerde teslim anında her şey görünmüyor. Kolilerin bir bölümü günler sonra açılıyor ve bir parçanın eksik ya da hasarlı olduğu ancak o zaman fark ediliyor. “Teslim aldınız, bitti” demek bu yüzden doğru değil.</p><p>Teslimden sonra belirli bir bildirim süresi tanımlıyoruz; bu süre içinde fark ettiğiniz eksik ya da hasarı bildirdiğinizde kayıt açılıyor ve tutanakla karşılaştırılıyor. Çınar’da <strong>evden eve nakliyat</strong> sözleşmesinde bu sürenin kaç gün olduğu yazılı oluyor, sözlü bir vaat olarak kalmıyor.</p>`,
    kunye: [
      { label: 'Gecikmeli fark etme', value: 'Koliler günler sonra açılıyor; eksik o zaman görülüyor.' },
      { label: 'Bildirim süresi', value: 'Teslim sonrası tanımlı süre içinde bildirim kayda alınıyor.' },
      { label: 'Yazılı', value: 'Sürenin kaç gün olduğu sözleşmede yer alıyor.' },
    ],
    guzergahlar: [
      { to: 'Diyarbakır', note: 'Kuzeye geçiş; il merkezi, yol süresi planlanıyor.' },
      { to: 'Bağlar', note: 'Kuzey yönü; günübirlik.' },
      { to: 'Bismil', note: 'Doğuya geçiş; güzergâh düz.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Kolileri sonra açtım, eksik çıktı; ne yapmalıyım?', answer: 'Bildirim süresi içinde haber verin. Kayıt açılıyor ve teslim tutanağıyla karşılaştırılıyor.' },
      { question: 'Bildirim süresi ne kadar?', answer: 'Sözleşmede yazılı oluyor; sözlü bir vaat olarak bırakılmıyor.' },
      { question: 'Hasar tespiti nasıl yapılıyor?', answer: 'Yükleme öncesi çekilen fotoğraflar ve tutanak üzerinden yürüyor.' },
    ],
  },
]

// prisma/ilce-verileri/ordu.mjs
//
// Ordu'nun 19 ilçesinden 6'sı. ON ÜÇÜ ATLANDI.
//
// NEDEN SEKİZ DEĞİL ALTI
//   Eskişehir'de olduğu gibi: ilin arama hacmi üç ilçede (Altınordu,
//   Ünye, Fatsa) toplanıyor, geri kalanların çoğu birkaç bin ile yirmi
//   bin arası nüfuslu. Sekize tamamlamak sayı şişirmek olurdu.
//
// ATLANANLAR: Akkuş, Aybastı, Çamaş, Çatalpınar, Çaybaşı, Gülyalı,
//   Gürgentepe, İkizce, Kabadüz, Kabataş, Korgan, Kumru, Mesudiye
//
// DERİNLİK: 'tam' (3) / 'orta' (3)
//
// KARADENİZ'DE ÜÇÜNCÜ İL — TEMALARIN TAMAMI KAPALI
//   Samsun ve Trabzon'dan sonra Ordu'nun doğal eksenlerinin hepsi
//   kullanılmış durumda:
//     · fındık bahçeleri arasına dağılmış evler → Samsun/Çarşamba
//     · sahil şeridi ile yamaç köyleri          → Trabzon/Akçaabat
//     · yağış ve zemin kayganlığı               → Samsun/Canik
//     · vadi boyunca tek yol                    → Trabzon/Of
//     · orman nemi                              → Trabzon/Maçka
//     · merdivenli sokak                        → Trabzon/Ortahisar
//     · liman ve sanayi                         → Samsun/Tekkeköy
//   Bu ilde hiçbirine girilmiyor; fındık, yamaç, yağış ve deniz
//   kelimeleri geçmiyor. Eksenler yine taşıma işinin kendisinden.
//
// YAKIN DURAN VE AYRILAN ÜÇ EKSEN
//   · Manisa/Akhisar: ambalaj MALZEMESİ günler önce bırakılıyor, müşteri
//     kendi paketliyor. Altınordu'da konu malzeme değil EKİP: paketleme
//     bir gün önce, ekip tarafından yapılıyor.
//   · Van/Özalp: yakıtlı EKİPMANIN deposu boşaltılıyor (jeneratör,
//     motosiklet). Fatsa'da konu ekipman değil, KAPTAKİ KİMYASAL —
//     boya, tiner, tüp; bunlar hiç taşınmıyor.
//   · Tekirdağ/Ergene: erteleme ve iptalin SÖZLEŞME koşulları.
//     Gölköy'de konu sözleşme değil, KARARIN NASIL VERİLDİĞİ — kim,
//     ne zamana kadar, hangi ölçüye bakarak.
//
// MAHALLELER
//   Tamamı boş bırakıldı; Ordu mahalle adları konusunda doğrulanmış
//   bilgim yok.
//
// Ortak kurallar: uydurma mahalle/rakam yok, "evden eve nakliyat" sayfa
// başına tam bir kez. (bkz. izmir.mjs başlığındaki ayrıntılı gerekçe)

export const il = { ad: 'Ordu', plaka: 52 }

export const ilceler = [
  // ───────────────────────── TAM DERİNLİK (3) ─────────────────────────
  {
    ad: 'Altınordu',
    derinlik: 'tam',
    ozet:
      'Altınordu’da büyük taşımalarda paketleme bir gün önce yapılıyor; taşıma günü araç sabah dolmaya başlıyor.',
    metaAciklama:
      'Altınordu evden eve nakliyat: paketleme bir gün önce, taşıma ertesi gün. Sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Altınordu’daki büyük taşımalarda tek güne sıkıştırmaya çalıştığımız iki iş var: paketleme ve taşıma. İkisi birden aynı sabah başladığında ekip önce kolileri hazırlıyor, araç öğleye kadar boş bekliyor ve yükleme günün en yorgun saatinde başlıyor.</p><p>Bunu ikiye bölüyoruz. Bir gün önce paketleme ekibi geliyor; mutfak, gardırop ve kırılacak eşya kolilenip etiketleniyor, mobilyaların sökülmesi gerekenler sökülüyor. Ertesi sabah taşıma ekibi geldiğinde ev yüklenmeye hazır oluyor. Altınordu’da <strong>evden eve nakliyat</strong> bu şekilde planlandığında iş günün erken saatinde bitiyor ve akşamı yerleşmeye kalıyor.</p><p>İki günlük plan her işte gerekmiyor; küçük ve orta hacimli taşımalar tek günde rahat tamamlanıyor. Hangi ölçekten sonra bölmenin mantıklı olduğunu keşifte söylüyoruz. Paketleme günü evde bulunmanız gerekmiyor, ama hangi kolinin neye ait olduğunu görmek istiyorsanız o gün uğramanız yeterli.</p>`,
    kunye: [
      { label: 'İki güne bölme', value: 'Paketleme bir gün önce, taşıma ertesi sabah.' },
      { label: 'Kazanç', value: 'Araç sabah dolmaya başlıyor, iş günün erken saatinde bitiyor.' },
      { label: 'Paketleme günü', value: 'Mutfak, gardırop ve kırılacaklar kolileniyor; söküm gerekenler sökülüyor.' },
      { label: 'Ne zaman gerekli', value: 'Küçük ve orta hacimde gerekmiyor; sınırı keşifte söylüyoruz.' },
    ],
    guzergahlar: [
      { to: 'Perşembe', note: 'Batıya geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Ulubey', note: 'Güneye geçiş; günübirlik.' },
      { to: 'Fatsa', note: 'Batı aksı; yol süresi planlanıyor.' },
      { to: 'Ordu', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Paketleme ve taşıma neden iki güne bölünüyor?',
        answer:
          'Büyük işlerde tek güne sığdırıldığında araç öğleye kadar boş bekliyor ve yükleme en yorgun saatte başlıyor. Bölünce iş erken bitiyor.',
      },
      {
        question: 'Paketleme günü evde olmam gerekiyor mu?',
        answer:
          'Gerekmiyor. Hangi kolinin neye ait olduğunu görmek isterseniz o gün uğramanız yeterli.',
      },
      {
        question: 'Her taşımada iki gün mü çalışıyorsunuz?',
        answer:
          'Hayır. Küçük ve orta hacimli işler tek günde tamamlanıyor; sınırı keşifte söylüyoruz.',
      },
      {
        question: 'Verilen fiyat sonradan değişir mi?',
        answer:
          'Değişmiyor. Keşif sonrası verilen yazılı fiyat taşıma gününe kadar geçerli kalıyor.',
      },
    ],
  },

  {
    ad: 'Ünye',
    derinlik: 'tam',
    ozet:
      'Ünye’de yolda araç arızası ihtimali için plan hazır; yük başka araca aktarılmadan çözüm üretiliyor.',
    metaAciklama:
      'Ünye evden eve nakliyat: yolda arıza durumunda yedek araç planı ve bilgilendirme. Yazılı sabit fiyat.',
    govde: `<p>Ünye’den yapılan taşımaların bir bölümü il dışına uzun güzergâhta gidiyor ve bu işlerde kimsenin konuşmak istemediği bir ihtimal var: aracın yolda arızalanması. Nadir ama mümkün ve olduğunda yükünüz bir yerde duruyor.</p><p>Bu yüzden ne yapacağımızı önceden belirledik. Arıza kısa sürede giderilebiliyorsa yük araçta kalıyor ve size yeni tahmini varış saati bildiriliyor. Giderilemiyorsa aynı ölçüde bir araç yola çıkıyor ve aktarma bizim gözetimimizde, kayıt altında yapılıyor. Ünye’de <strong>evden eve nakliyat</strong> sırasında yük hiçbir koşulda gözetimsiz bırakılmıyor; araç yalnız kalmıyor.</p><p>Bu durumların hiçbirinde ek ücret talep etmiyoruz — arıza bizim sorunumuz, sizin değil. Sözleşmede yazan tek şey, teslim tarihinin bu nedenle değişmesi hâlinde nasıl bilgilendirileceğiniz.</p>`,
    kunye: [
      { label: 'İhtimal', value: 'Uzun güzergâhta araç arızası nadir ama mümkün.' },
      { label: 'Kısa arıza', value: 'Yük araçta kalıyor, yeni tahmini varış saati bildiriliyor.' },
      { label: 'Uzun arıza', value: 'Aynı ölçüde araç yola çıkıyor; aktarma gözetim altında ve kayıtlı.' },
      { label: 'Ücret', value: 'Bu durumlarda ek ücret talep edilmiyor.' },
    ],
    guzergahlar: [
      { to: 'Fatsa', note: 'Doğuya geçiş; günübirlik.' },
      { to: 'Altınordu', note: 'Doğuya devam; Ordu merkezi, yol süresi planlanıyor.' },
      { to: 'Ordu', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Araç yolda arızalanırsa eşyam ne olur?',
        answer:
          'Yük gözetimsiz bırakılmıyor. Arıza kısa sürede giderilirse araçta kalıyor; giderilemezse aynı ölçüde bir araç yola çıkıyor.',
      },
      {
        question: 'Aktarma yapılırsa eşyam zarar görür mü?',
        answer:
          'Aktarma bizim gözetimimizde ve kayıt altında yapılıyor. Tercihimiz aktarma yapmamak ama gerekirse süreç belgeli yürüyor.',
      },
      {
        question: 'Gecikme için ek ücret alır mısınız?',
        answer:
          'Almıyoruz. Arıza bizim sorunumuz; sözleşmede yazan tek şey nasıl bilgilendirileceğiniz.',
      },
      {
        question: 'Teslim tarihi değişirse nasıl haber veriyorsunuz?',
        answer:
          'Yeni tahmini saat siz sormadan iletiliyor; değişiklik olduğu anda arıyoruz.',
      },
    ],
  },

  {
    ad: 'Fatsa',
    derinlik: 'tam',
    ozet:
      'Fatsa’da depo ve garaj eşyası ayrı planlanıyor; boya, tiner ve tüp gibi kaplar taşınmıyor.',
    metaAciklama:
      'Fatsa evden eve nakliyat: depo ve garaj eşyasında güvenli ayrım, taşınmayan kimyasallar. Yazılı sabit fiyat.',
    govde: `<p>Fatsa’daki taşımalarda odaların dışında kalan bir alan var ve çoğu zaman en son akla geliyor: depo, garaj ya da kiler. Buradaki eşya ev içindekinden farklı; alet çantası, hırdavat, bahçe malzemesi, yarım kalmış boya kutuları, tiner ve temizlik kimyasalları bir arada duruyor.</p><p>Bunları iki gruba ayırıyoruz. Alet, hırdavat ve bahçe malzemesi ayrı kutulara alınıyor; küçük metal parçalar keskin olduğu için çift katlı kutu kullanılıyor. Fatsa’da <strong>evden eve nakliyat</strong> yaparken açılmış boya, tiner, çözücü ve LPG tüpü ise taşınmıyor — kapalı kasada sızıntı ve buhar riski var, üstelik bu kalemler taşıma sigortasının kapsamı dışında.</p><p>Bu ayrımı keşifte yapıyoruz ki taşıma sabahı sürpriz olmasın. Taşınmayacak kimyasalları nasıl elden çıkaracağınıza dair kararı da o sırada veriyorsunuz; araç kalktıktan sonra bunlar evde kalırsa sorun sizde kalıyor.</p>`,
    kunye: [
      { label: 'Ayrı alan', value: 'Depo, garaj ve kiler; en son akla gelen ama farklı kurallı bölüm.' },
      { label: 'Taşınanlar', value: 'Alet, hırdavat ve bahçe malzemesi; keskin metal için çift katlı kutu.' },
      { label: 'Taşınmayanlar', value: 'Açılmış boya, tiner, çözücü ve LPG tüpü.' },
      { label: 'Sebep', value: 'Kapalı kasada sızıntı ve buhar riski; ayrıca sigorta kapsamı dışında.' },
    ],
    guzergahlar: [
      { to: 'Ünye', note: 'Batıya geçiş; günübirlik.' },
      { to: 'Altınordu', note: 'Doğuya geçiş; Ordu merkezi, yol süresi planlanıyor.' },
      { to: 'Ordu', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Garajdaki aletleri taşır mısınız?',
        answer:
          'Taşıyoruz. Alet ve hırdavat ayrı kutulara alınıyor; keskin metal parçalar için çift katlı kutu kullanıyoruz.',
      },
      {
        question: 'Boya ve tiner taşınıyor mu?',
        answer:
          'Taşınmıyor. Kapalı kasada sızıntı ve buhar riski var; bu kalemler sigorta kapsamının da dışında.',
      },
      {
        question: 'Tüpü ne yapacağız?',
        answer:
          'LPG tüpü araca yüklenmiyor. Nasıl elden çıkaracağınıza keşifte birlikte karar veriyoruz.',
      },
      {
        question: 'Keşif ücretli mi?',
        answer: 'Keşif ücretsiz. Depo ve garajı da o sırada birlikte geziyoruz.',
      },
    ],
  },

  // ───────────────────────── ORTA DERİNLİK (3) ─────────────────────────
  {
    ad: 'Perşembe',
    derinlik: 'orta',
    ozet:
      'Perşembe’de ağır parçalar araç kasasına elle kaldırılmıyor; rampa ile çıkarılıyor.',
    metaAciklama:
      'Perşembe evden eve nakliyat: ağır parçalar için rampa kullanımı ve güvenli yükleme. Yazılı sabit fiyat.',
    govde: `<p>Perşembe’deki taşımalarda az fark edilen bir zorluk, yükün son yarım metresi. Eşya bina kapısına kadar sorunsuz geliyor, ama araç kasası zeminden yüksek ve ağır bir parçayı oraya elle kaldırmak hem yavaş hem sakatlanma riski taşıyan bir iş.</p><p>Bu yüzden ağır parçaları rampayla çıkarıyoruz; buzdolabı, çamaşır makinesi ve büyük mobilyalar kaldırılmıyor, itilerek yükleniyor. Perşembe’de <strong>evden eve nakliyat</strong> sırasında rampanın kurulabilmesi için aracın arkasında birkaç metre düz alan gerekiyor; bunu keşifte kontrol ediyoruz.</p>`,
    kunye: [
      { label: 'Son yarım metre', value: 'Araç kasası zeminden yüksek; ağır parçayı elle kaldırmak riskli.' },
      { label: 'Rampa', value: 'Buzdolabı, çamaşır makinesi ve büyük mobilyalar itilerek yükleniyor.' },
      { label: 'Gereken alan', value: 'Aracın arkasında birkaç metre düz alan; keşifte kontrol ediliyor.' },
    ],
    guzergahlar: [
      { to: 'Altınordu', note: 'Doğuya geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Fatsa', note: 'Batıya geçiş; günübirlik.' },
      { to: 'Ordu', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Buzdolabı araca nasıl yükleniyor?', answer: 'Rampayla. Ağır parçalar kaldırılmıyor, itilerek yükleniyor.' },
      { question: 'Rampa için özel bir yer gerekiyor mu?', answer: 'Aracın arkasında birkaç metre düz alan yeterli; bunu keşifte kontrol ediyoruz.' },
      { question: 'Alan yoksa ne yapıyorsunuz?', answer: 'Aracı farklı bir noktaya alıyoruz; gerekirse yürüme mesafesi uzuyor ve bunu keşifte söylüyoruz.' },
    ],
  },

  {
    ad: 'Gölköy',
    derinlik: 'orta',
    ozet:
      'Gölköy’de erteleme kararı taşıma sabahı değil, bir gün önce akşam veriliyor; kararı biz arayıp söylüyoruz.',
    metaAciklama:
      'Gölköy evden eve nakliyat: erteleme kararının ne zaman ve kim tarafından verildiği. Yazılı sabit fiyat.',
    govde: `<p>Gölköy gibi merkeze uzak adreslerde bir taşımanın ertelenmesi gerekiyorsa, bunu taşıma sabahı fark etmek en kötü senaryo: ekip yola çıkmış, siz evi boşaltmışsınız oluyor.</p><p>Bu yüzden kararı bir gün önce akşam veriyoruz ve aramayı biz yapıyoruz. Ölçümüz de belirli: yol durumu ekibin adrese güvenle ulaşmasını engelliyorsa ya da yükleme koşulları eşyanın zarar görmesine yol açacaksa erteliyoruz. Gölköy’de <strong>evden eve nakliyat</strong> ertelenirse yeni tarih aynı görüşmede belirleniyor ve erteleme için ücret talep edilmiyor.</p>`,
    kunye: [
      { label: 'Karar zamanı', value: 'Taşıma sabahı değil, bir gün önce akşam.' },
      { label: 'Kim arıyor', value: 'Aramayı biz yapıyoruz; sizin sormanız beklenmiyor.' },
      { label: 'Ölçü', value: 'Ekibin güvenle ulaşamaması ya da eşyanın zarar görme ihtimali.' },
      { label: 'Yeni tarih', value: 'Aynı görüşmede belirleniyor; erteleme için ücret alınmıyor.' },
    ],
    guzergahlar: [
      { to: 'Ulubey', note: 'Kuzeybatı aksı; güzergâh planlanıyor.' },
      { to: 'Altınordu', note: 'Kuzeye geçiş; Ordu merkezi, yol süresi planlanıyor.' },
      { to: 'Ordu', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Taşıma ertelenirse ne zaman haber veriyorsunuz?', answer: 'Bir gün önce akşam. Aramayı biz yapıyoruz, sizin sormanızı beklemiyoruz.' },
      { question: 'Erteleme için ücret alıyor musunuz?', answer: 'Almıyoruz. Yeni tarih aynı görüşmede belirleniyor.' },
      { question: 'Kararı neye göre veriyorsunuz?', answer: 'Ekibin adrese güvenle ulaşıp ulaşamayacağına ve eşyanın zarar görme ihtimaline bakıyoruz.' },
    ],
  },

  {
    ad: 'Ulubey',
    derinlik: 'orta',
    ozet:
      'Ulubey’de her eşya paketlenmiyor; gereksiz ambalaj hem maliyeti hem süreyi artırdığı için ayıklanıyor.',
    metaAciklama:
      'Ulubey evden eve nakliyat: ambalaj gerektirmeyen eşyaların ayrılması ve maliyet düşürme. Yazılı sabit fiyat.',
    govde: `<p>Ulubey’deki taşımalarda müşterilerin sık şaşırdığı bir şey söylüyoruz: her eşyanın paketlenmesi gerekmiyor. Metal raf, bahçe masası, plastik saklama kabı, katlanır sandalye gibi parçalar zaten dayanıklı; bunları sarmak malzeme ve işçilik olarak fiyata giriyor ama karşılığında bir koruma sağlamıyor.</p><p>Bu parçaları örtüyle ayırıp doğrudan yüklüyor, ambalajı gerçekten gerekli olan eşyaya ayırıyoruz. Ulubey’de <strong>evden eve nakliyat</strong> keşfinde hangi eşyanın hangi gruba gireceğini birlikte belirliyoruz; ambalaj kalemi teklifte ayrı göründüğü için farkı da görüyorsunuz.</p>`,
    kunye: [
      { label: 'Ambalajsız gidebilenler', value: 'Metal raf, bahçe masası, plastik kap, katlanır sandalye.' },
      { label: 'Gerekçe', value: 'Sarmak fiyata giriyor ama bu parçalarda koruma sağlamıyor.' },
      { label: 'Yöntem', value: 'Örtüyle ayrılıp doğrudan yükleniyor; ambalaj gerçekten gerekene ayrılıyor.' },
    ],
    guzergahlar: [
      { to: 'Altınordu', note: 'Kuzeye geçiş; Ordu merkezi, günübirlik.' },
      { to: 'Gölköy', note: 'Güneydoğu aksı; güzergâh planlanıyor.' },
      { to: 'Ordu', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Her eşya paketleniyor mu?', answer: 'Gerekmiyor. Metal raf ve plastik kap gibi dayanıklı parçalarda ambalaj koruma sağlamıyor, sadece maliyet ekliyor.' },
      { question: 'Ambalajsız taşınan eşya zarar görür mü?', answer: 'Örtüyle ayrılıp sabitlendiği için görmüyor. Kırılgan hiçbir parça bu gruba alınmıyor.' },
      { question: 'Bu ayrım fiyatı ne kadar düşürüyor?', answer: 'Ambalaj teklifte ayrı kalem olduğu için farkı doğrudan görüyorsunuz.' },
    ],
  },
]

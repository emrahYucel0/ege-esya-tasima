// prisma/ilce-verileri/elazig.mjs
//
// Elazığ'ın 11 ilçesinden 5'i. ALTISI ATLANDI.
//
// NEDEN BEŞ
//   İlin nüfusunun büyük bölümü MERKEZ ilçede ve o ilçenin adı da
//   "Merkez". Ona ayrı bir sayfa açmak il sayfasının (Elazığ) birebir
//   kopyası olurdu — hem slug ("merkez") anlamsız, hem içerik ikizlenirdi.
//   Bu yüzden merkez ilçe için ayrı sayfa YOK; il sayfası o işi görüyor.
//   Geriye kalan ilçelerin nüfusu 10-40 bin bandında, gerçekçi olarak
//   beşi yazılmaya değer.
//
// ATLANANLAR: Merkez (yukarıdaki gerekçe), Ağın, Alacakaya, Arıcak,
//   Maden, Sivrice
//   Sivrice ayrıca BİLEREK çıkarıldı: doğal ekseni göl kıyısı yerleşim
//   olurdu, o eksen Konya/Beyşehir'de kullanıldı.
//
// DERİNLİK: 'tam' (2) / 'orta' (3)
//
// YAKIN TARİHE GİRİLMİYOR
//   Elazığ yakın geçmişte deprem yaşadı. Bu sayfalarda o konuya hiç
//   girilmiyor — burası bir nakliyat hizmet sayfası ve doğrulanmış
//   bilgim olmayan, hizmetle ilgisi bulunmayan konuları yazmıyorum.
//   Aynı kural Diyarbakır/Sur ile Şanlıurfa ve Van'ın sınır
//   ilçelerinde de uygulandı.
//
// DOĞU ANADOLU'DA ÜÇÜNCÜ İL — KAPALI EKSENLER
//   Erzurum'da sekiz ilçenin tamamı kış üzerineydi; Van'da kış hiç
//   kullanılmadı ve orada kapı kanadı, yatak, halı, ekip kurulumu,
//   ödeme, garanti, yedek malzeme, yakıtlı ekipman kullanıldı. Bu ilde
//   ikisine de girilmiyor: kış yok, Van'ın sekiz ekseni yok.
//   Ayrıca uzak ilçe / yol süresi ekseni de kapalı (Çivril, Viranşehir,
//   Sincan, Ereğli, Şereflikoçhisar ve diğerleri).
//
// YAKIN DURAN VE AYRILAN İKİ EKSEN
//   · Eskişehir/Çifteler: MÜŞTERİNİN yük taşımaması, onun güvenliği.
//     Palu'da konu tersten — EKİBİN kendi iş güvenliği ve sigortası.
//   · Diyarbakır/Ergani: sigorta BEYAN DEĞERİ, yani tazminatın tavanı.
//     Baskil'de konu tavan değil, TAZMİN ŞEKLİ — onarım mı, değer mi.
//
// MAHALLELER
//   Tamamı boş bırakıldı; Elazığ mahalle adları konusunda doğrulanmış
//   bilgim yok.
//
// Ortak kurallar: uydurma mahalle/rakam yok, "evden eve nakliyat" sayfa
// başına tam bir kez. (bkz. izmir.mjs başlığındaki ayrıntılı gerekçe)

export const il = { ad: 'Elazığ', plaka: 23 }

export const ilceler = [
  // ───────────────────────── TAM DERİNLİK (2) ─────────────────────────
  {
    ad: 'Kovancılar',
    derinlik: 'tam',
    ozet:
      'Kovancılar’da “kaç saat sürer” sorusuna tek rakamla değil aralıkla cevap veriyoruz; hesabın neye dayandığı açık.',
    metaAciklama:
      'Kovancılar evden eve nakliyat: taşıma süresinin nasıl hesaplandığı ve gerçekçi saat aralığı. Yazılı sabit fiyat.',
    govde: `<p>Kovancılar’da fiyattan sonra en çok sorulan şey süre oluyor: “Kaç saatte biter?” Bu soruya tek bir rakamla cevap vermek kolay ama çoğu zaman yanlış çıkıyor, çünkü süreyi belirleyen beş ayrı şey var ve hiçbiri oda sayısı değil.</p><p>Hesabı şu beş kalem üzerinden yapıyoruz: taşınacak hacim, iki adresteki kat durumu ve asansör, aracın durabileceği nokta ile kapı arası mesafe, sökülüp kurulacak mobilya sayısı ve iki adres arasındaki yol süresi. Kovancılar’da <strong>evden eve nakliyat</strong> teklifinde süreyi bu beş kalemin toplamı olarak, alt ve üst sınırıyla birlikte veriyoruz.</p><p>Neden aralık verdiğimizi de söylüyoruz: sökülen bir mobilyanın vidası sıyrılabiliyor, asansör bir başkası tarafından kullanılıyor olabiliyor, hava koşulu yüklemeyi yavaşlatabiliyor. Tek rakam söyleyip tutturamamak yerine gerçekçi bir aralık söylemeyi tercih ediyoruz — o aralığın üstüne çıkmıyoruz.</p>`,
    kunye: [
      { label: 'Beş kalem', value: 'Hacim, kat ve asansör, yürüme mesafesi, söküm sayısı, yol süresi.' },
      { label: 'Oda sayısı değil', value: 'Süreyi belirleyen şey oda sayısı olmuyor.' },
      { label: 'Aralık', value: 'Alt ve üst sınırla veriliyor; üst sınırın üstüne çıkılmıyor.' },
      { label: 'Sapma sebepleri', value: 'Sıyrılan vida, meşgul asansör, hava koşulu.' },
    ],
    guzergahlar: [
      { to: 'Palu', note: 'Batıya geçiş; günübirlik.' },
      { to: 'Karakoçan', note: 'Kuzeye geçiş; yol süresi planlanıyor.' },
      { to: 'Elazığ', note: 'İl merkezi ve il geneli; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Taşıma kaç saat sürer?',
        answer:
          'Hacim, kat durumu, yürüme mesafesi, söküm sayısı ve yol süresini hesaplayıp alt-üst sınırıyla bir aralık veriyoruz.',
      },
      {
        question: 'Neden tek bir saat söylemiyorsunuz?',
        answer:
          'Sıyrılan bir vida ya da meşgul bir asansör süreyi değiştirebiliyor. Tutturulamayacak tek rakam yerine gerçekçi aralık veriyoruz.',
      },
      {
        question: 'Süre aralığı aşılırsa ek ücret çıkar mı?',
        answer:
          'Çıkmıyor. Fiyat sabit; süre tahmini planlama içindir, fiyatlandırma değil.',
      },
      {
        question: 'Verilen fiyat sonradan değişir mi?',
        answer:
          'Değişmiyor. Keşif sonrası verilen yazılı fiyat taşıma gününe kadar geçerli kalıyor.',
      },
    ],
  },

  {
    ad: 'Karakoçan',
    derinlik: 'tam',
    ozet:
      'Karakoçan’da taşınma öncesi hazırlık takvimi veriliyor: bir hafta, üç gün ve bir gün kala yapılacaklar ayrı.',
    metaAciklama:
      'Karakoçan evden eve nakliyat: taşınma öncesi hazırlık takvimi ve adım adım liste. Yazılı sabit fiyat.',
    govde: `<p>Karakoçan’daki taşımalarda en çok işe yarayan şeylerden biri, yapılacakların hepsini son güne yığmamak. Taşınma bir günlük bir olay gibi görünüyor ama hazırlığı haftaya yayıldığında hem daha az yorucu hem daha az hatalı oluyor.</p><p>Randevuyu alırken üç aşamalı bir liste veriyoruz. Bir hafta kala: abonelik nakil başvuruları, kullanılmayan eşyanın ayrılması, kolilerin ve malzemenin teslim alınması. Üç gün kala: mutfak ve gardırobun paketlenmesi, dolapların boşaltılması, ilaç ve evrak gibi yanınızda kalacakların ayrılması. Bir gün kala: buzdolabının boşaltılıp buzunun çözülmesi, cihazların fişten çekilmesi, ilk gün kutusunun hazırlanması. Karakoçan’da <strong>evden eve nakliyat</strong> günü bu üç adım tamamlanmışsa ekibin işi yalnızca taşımak oluyor.</p><p>Listenin tamamını sizin yapmanız gerekmiyor; paketleme bizden isteniyorsa o maddeler listeden düşüyor. Amaç iş yüklemek değil, hangi işin ne zaman yapılması gerektiğini görünür kılmak.</p>`,
    kunye: [
      { label: 'Bir hafta kala', value: 'Abonelik nakli, eşya ayıklama, koli ve malzemenin teslim alınması.' },
      { label: 'Üç gün kala', value: 'Mutfak ve gardırop paketleme, dolapların boşaltılması, evrak ayrımı.' },
      { label: 'Bir gün kala', value: 'Buzdolabı boşaltma ve buz çözme, cihazların fişten çekilmesi, ilk gün kutusu.' },
      { label: 'Esneklik', value: 'Paketleme bizden isteniyorsa ilgili maddeler listeden düşüyor.' },
    ],
    guzergahlar: [
      { to: 'Kovancılar', note: 'Güneye geçiş; yol süresi planlanıyor.' },
      { to: 'Palu', note: 'Güneybatı aksı; güzergâh planlanıyor.' },
      { to: 'Elazığ', note: 'İl merkezi ve il geneli; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Taşınmaya ne zaman hazırlanmaya başlamalıyım?',
        answer:
          'Bir hafta kala yeterli oluyor. Üç aşamalı listeyi randevu alırken veriyoruz.',
      },
      {
        question: 'Bunların hepsini ben mi yapacağım?',
        answer:
          'Hayır. Paketlemeyi bizden isterseniz o maddeler listeden düşüyor; liste iş yüklemek için değil, sırayı göstermek için.',
      },
      {
        question: 'Buzdolabını ne zaman boşaltmalıyım?',
        answer:
          'Bir gün kala. Buzun çözülmesi birkaç saat sürüyor, taşıma sabahına bırakılmıyor.',
      },
      {
        question: 'İlk gün kutusuna ne koymalıyım?',
        answer:
          'İlaç, havlu, şarj aleti, birkaç bardak ve o gece gerekecek kişisel eşya. Bu kutu araca en son biniyor, eve ilk giriyor.',
      },
    ],
  },

  // ───────────────────────── ORTA DERİNLİK (3) ─────────────────────────
  {
    ad: 'Palu',
    derinlik: 'orta',
    ozet:
      'Palu’da çalışan ekip sigortalı ve koruyucu ekipmanlı; taşıma sırasında oluşacak bir kaza müşteriye yansımıyor.',
    metaAciklama:
      'Palu evden eve nakliyat: sigortalı ekip ve iş güvenliği ekipmanı, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Palu’daki işlerde az sorulan ama sorulması gereken bir konu var: eve gelen ekip sigortalı mı? Bunun müşteriyi ilgilendiren tarafı şu — kayıt dışı çalışan bir kişi taşıma sırasında yaralanırsa sorumluluk tartışmalı hâle geliyor ve bu tartışmanın içinde ev sahibi de yer alabiliyor.</p><p>Ekibimiz kayıtlı çalışıyor ve iş güvenliği ekipmanı standart: eldiven, çelik burunlu ayakkabı, ağır parçalarda taşıma askısı ve kayış. Palu’da <strong>evden eve nakliyat</strong> sırasında oluşabilecek bir iş kazası bizim sorumluluğumuzda kalıyor; belgeleri talep ederseniz gösteriyoruz.</p>`,
    kunye: [
      { label: 'Kayıtlı çalışma', value: 'Ekip sigortalı; belgeler talep hâlinde gösteriliyor.' },
      { label: 'Ekipman', value: 'Eldiven, çelik burunlu ayakkabı, ağır parçada askı ve kayış.' },
      { label: 'Sorumluluk', value: 'Taşıma sırasındaki iş kazası müşteriye yansımıyor.' },
    ],
    guzergahlar: [
      { to: 'Kovancılar', note: 'Doğuya geçiş; günübirlik.' },
      { to: 'Karakoçan', note: 'Kuzeydoğu aksı; yol süresi planlanıyor.' },
      { to: 'Elazığ', note: 'İl merkezi ve il geneli; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Ekip sigortalı mı?', answer: 'Kayıtlı çalışıyor. Belgeleri talep ederseniz gösteriyoruz.' },
      { question: 'Taşıma sırasında biri yaralanırsa sorumlu kim?', answer: 'Bizim sorumluluğumuzda. Kayıt dışı çalışmada bu tartışmalı hâle geliyor, biz o riski taşımıyoruz.' },
      { question: 'Koruyucu ekipman kullanıyor musunuz?', answer: 'Eldiven ve çelik burunlu ayakkabı standart; ağır parçalarda taşıma askısı ve kayış kullanılıyor.' },
    ],
  },

  {
    ad: 'Baskil',
    derinlik: 'orta',
    ozet:
      'Baskil’de bir hasar oluşursa onarım mı yoksa bedel mi ödeneceği tek tek konuşuluyor; karar size bırakılıyor.',
    metaAciklama:
      'Baskil evden eve nakliyat: hasar durumunda onarım ve bedel seçenekleri, sigortalı taşıma, yazılı sabit fiyat.',
    govde: `<p>Baskil’deki işlerde hasar nadir ama olduğunda bir sonraki soru hemen geliyor: ne olacak? Bu sorunun tek bir cevabı yok ve olmaması da doğru — çizilen bir dolap kapağıyla kırılan bir cam aynı şey değil.</p><p>Onarılabilir bir hasarda yetkili servis ya da marangozla onarımı biz üstleniyoruz. Onarım eşyayı eski hâline getirmiyorsa ya da siz onarım istemiyorsanız bedel üzerinden çözüyoruz. Baskil’de <strong>evden eve nakliyat</strong> sözleşmesinde bu iki seçeneğin de bulunduğu ve tercihin size ait olduğu yazılı — hangisinin uygulanacağına biz tek başımıza karar vermiyoruz.</p>`,
    kunye: [
      { label: 'İki seçenek', value: 'Onarım ya da bedel; hasarın türüne göre değişiyor.' },
      { label: 'Onarım', value: 'Yetkili servis ya da marangozla, masrafı bizde.' },
      { label: 'Tercih', value: 'Hangisinin uygulanacağına siz karar veriyorsunuz; sözleşmede yazılı.' },
    ],
    guzergahlar: [
      { to: 'Elazığ', note: 'Doğuya geçiş; il merkezi, yol süresi planlanıyor.' },
      { to: 'Keban', note: 'Kuzeye geçiş; güzergâh planlanıyor.' },
      { to: 'Kovancılar', note: 'Doğu aksı; mesafe hesaba katılıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Eşyam hasar görürse onarır mısınız?', answer: 'Onarılabilirse yetkili servis ya da marangozla onarımı biz üstleniyoruz.' },
      { question: 'Onarım istemezsem ne oluyor?', answer: 'Bedel üzerinden çözüyoruz. Tercih size ait ve bu sözleşmede yazılı.' },
      { question: 'Karar kime ait?', answer: 'Size. Hangi yolun izleneceğine tek başımıza karar vermiyoruz.' },
    ],
  },

  {
    ad: 'Keban',
    derinlik: 'orta',
    ozet:
      'Keban’da tek bir koltuk ya da beyaz eşya için de taşıma yapılıyor; bu işlerde asgari ücret uygulanıyor.',
    metaAciklama:
      'Keban evden eve nakliyat ve parça eşya taşıma: tek parça taşımada asgari ücret ve planlama. Yazılı fiyat.',
    govde: `<p>Keban’a gelen taleplerin bir bölümü ev taşıma değil, tek bir parça: bir koltuk, bir çamaşır makinesi, bir gardırop. Bunları da taşıyoruz ve küçük diye geri çevirmiyoruz.</p><p>Ancak burada açık olmak gerekiyor: tek parça işinde de araç yola çıkıyor, ekip geliyor ve aynı yol süresi harcanıyor. Bu yüzden asgari bir ücret uyguluyoruz ve bunun sebebini baştan söylüyoruz — maliyetin çoğu eşyanın hacminden değil, aracın ve ekibin hareket etmesinden geliyor. Keban’da <strong>evden eve nakliyat</strong> ölçeğindeki bir işle tek parça arasındaki fiyat farkı bu yüzden orantılı değil.</p>`,
    kunye: [
      { label: 'Kapsam', value: 'Tek koltuk, tek beyaz eşya ya da tek mobilya taşınıyor.' },
      { label: 'Asgari ücret', value: 'Araç ve ekip yine hareket ettiği için uygulanıyor.' },
      { label: 'Şeffaflık', value: 'Fiyat farkının neden orantılı olmadığı baştan söyleniyor.' },
    ],
    guzergahlar: [
      { to: 'Elazığ', note: 'Güneye geçiş; il merkezi, yol süresi planlanıyor.' },
      { to: 'Baskil', note: 'Güneybatı aksı; güzergâh planlanıyor.' },
      { to: 'Karakoçan', note: 'Doğu yönü; mesafe hesaba katılıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Tek bir mobilya için gelir misiniz?', answer: 'Geliyoruz. Küçük diye geri çevirmiyoruz.' },
      { question: 'Neden asgari ücret var?', answer: 'Tek parçada da araç yola çıkıyor ve ekip geliyor. Maliyetin çoğu hacimden değil hareketten geliyor.' },
      { question: 'Montaj dahil mi?', answer: 'Dahil. Sökülmesi ya da kurulması gereken bir parçaysa ekip bunu da yapıyor.' },
    ],
  },
]

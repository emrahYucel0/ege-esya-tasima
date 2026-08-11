// prisma/ilce-verileri/eskisehir.mjs
//
// Eskişehir'in 14 ilçesinden 6'sı. SEKİZİ ATLANDI.
//
// NEDEN SEKİZ DEĞİL ALTI
//   Önceki illerde ilçe başına sekiz sayfa yazıldı. Eskişehir'de bu sayı
//   zorlama olurdu: ilin nüfusu ve arama hacmi neredeyse tamamen iki
//   merkez ilçede (Odunpazarı, Tepebaşı) toplanıyor. Geri kalan on iki
//   ilçenin çoğu birkaç bin nüfuslu. Kullanıcının kuralı net: araması
//   olmayan ilçe yazılmıyor. Altıda durdum.
//
// ATLANANLAR: Beylikova, Günyüzü, Han, Mahmudiye, Mihalgazi, Mihalıççık,
//   Sarıcakaya, Seyitgazi
//
// DERİNLİK: 'tam' (2) / 'orta' (4)
//
// BU İLİN DÖRT BARİZ EKSENİ DE KAPALI
//   · tarihi ev dokusu (Odunpazarı evleri) → Beypazarı, Altındağ, Tire,
//     Bergama, Kula, Akdeniz — altı ilçede kullanıldı
//   · üniversite dönemi takvimi            → İzmir/Bornova ve
//     Denizli/Pamukkale — iki kez kullanıldı, üçüncüsü yazılmıyor
//   · tramvay hattı ve şehir içi ulaşım    → Samsun/İlkadım
//   · küçük ama değerli parça (lületaşı)   → Erzurum/Oltu
//   Dördüne de girilmedi. Eksenler bu yüzden yine taşıma işinin
//   kendisinden çıkarıldı.
//
// YAKIN DURAN VE AYRILAN ÜÇ EKSEN
//   · Manisa/Alaşehir: TEK çıkıştan İKİ hedefe (biri depo). Odunpazarı'nda
//     tam tersi: İKİ çıkıştan TEK hedefe. Yön farklı, plan farklı.
//   · Tekirdağ/Şarköy: neyi TAŞIMADIĞIMIZ (nakit, ziynet, evrak).
//     İnönü'de konu taşınan ama MÜŞTERİNİN PAKETLEDİĞİ kolilerde
//     sigortanın nasıl işlediği. İkisi farklı soru.
//   · Balıkesir/Ayvalık: eski evde TESİSAT kapatma. Sivrihisar'da konu
//     tesisat değil, UNUTULAN EŞYA — nereye bakıldığı.
//
// MAHALLELER
//   Tamamı boş bırakıldı; Eskişehir mahalle adları konusunda doğrulanmış
//   bilgim yok.
//
// Ortak kurallar: uydurma mahalle/rakam yok, "evden eve nakliyat" sayfa
// başına tam bir kez. (bkz. izmir.mjs başlığındaki ayrıntılı gerekçe)

export const il = { ad: 'Eskişehir', plaka: 26 }

export const ilceler = [
  // ───────────────────────── TAM DERİNLİK (2) ─────────────────────────
  {
    ad: 'Odunpazarı',
    derinlik: 'tam',
    ozet:
      'Odunpazarı’nda iki ayrı evden tek eve taşınma sık; iki yükün aynı güne ve aynı araca sığması planlanıyor.',
    metaAciklama:
      'Odunpazarı evden eve nakliyat: iki adresten tek eve birleşen taşıma planı, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Odunpazarı’nda düzenli olarak karşılaştığımız iş tipi, iki ayrı evin eşyasının tek bir eve taşınması. İki kişi bir araya geliyor, iki hane birleşiyor ya da bir aile ferdi yanına taşınıyor. Bu, iki ayrı taşıma değil; tek bir taşımanın iki çıkış noktası olması demek ve tamamen farklı planlanıyor.</p><p>İlk mesele hacim: iki evin eşyası tek eve çoğu zaman sığmıyor. Bu yüzden keşfi üç adreste birden yapıyoruz — iki çıkış ve bir varış — ve hangi parçanın gideceğine baştan karar veriyoruz. İki koltuk takımından hangisi gidecek, iki buzdolabı ne olacak; bu sorular taşıma günü sorulursa gün orada duruyor. Odunpazarı’nda <strong>evden eve nakliyat</strong> teklifini bu üç adresin toplamı üzerinden veriyoruz.</p><p>İkinci mesele sıra: hangi evin önce boşaltılacağı rastgele değil. Varış evine önce büyük ve yerleşimi belirleyen parçalar giriyor, ikinci adresin eşyası bunların arasına yerleşiyor. Ters sırada çalışıldığında ikinci yük kapıda bekliyor ve iş uzuyor.</p>`,
    kunye: [
      { label: 'İş tipi', value: 'İki ayrı çıkış, tek varış; iki taşıma değil tek taşıma.' },
      { label: 'Üç adreste keşif', value: 'İki çıkış ve bir varış birlikte görülüyor.' },
      { label: 'Hacim kararı', value: 'Çift çıkan parçalarda hangisinin gideceği baştan belirleniyor.' },
      { label: 'Sıra', value: 'Yerleşimi belirleyen büyük parçalar önce; ters sırada ikinci yük kapıda bekliyor.' },
    ],
    guzergahlar: [
      { to: 'Tepebaşı', note: 'Şehir içi geçiş; iş aynı gün bitiyor.' },
      { to: 'Alpu', note: 'Doğuya geçiş; günübirlik.' },
      { to: 'Sivrihisar', note: 'Güneydoğu aksı; yol süresi planlanıyor.' },
      { to: 'Eskişehir', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'İki ayrı evden tek eve taşınıyoruz, tek seferde olur mu?',
        answer:
          'Çoğu zaman oluyor. Keşfi üç adreste birden yapıp hacmi hesaplıyor, tek araçla mı iki araçla mı çalışacağımıza ona göre karar veriyoruz.',
      },
      {
        question: 'İki evin eşyası yeni eve sığmazsa?',
        answer:
          'Bunu taşımadan önce görüyoruz. Çift çıkan parçalarda hangisinin gideceğine keşifte birlikte karar veriyoruz.',
      },
      {
        question: 'Fiyat iki taşıma gibi mi hesaplanıyor?',
        answer:
          'Hayır. Tek iş olarak, üç adresin toplam hacmi ve mesafesi üzerinden hesaplanıyor.',
      },
      {
        question: 'Verilen fiyat sonradan değişir mi?',
        answer:
          'Değişmiyor. Keşif sonrası verilen yazılı fiyat taşıma gününe kadar geçerli kalıyor.',
      },
    ],
  },

  {
    ad: 'Tepebaşı',
    derinlik: 'tam',
    ozet:
      'Tepebaşı’nda boşaltma ile kutu açma iki ayrı iş; isteyene kutuları açıp dolapları yerleştiren ekip veriliyor.',
    metaAciklama:
      'Tepebaşı evden eve nakliyat: kutu açma ve yerleştirme hizmeti dahil seçenek, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Tepebaşı’ndaki işlerde standart taşıma şöyle bitiyor: mobilyalar kurulu, koliler ait oldukları odalara yerleştirilmiş, ekip çıkıyor. Bundan sonrası — kutuları açmak, mutfağı dizmek, dolaplara yerleştirmek — çoğu zaman günlere yayılıyor ve tek başına yapılıyor.</p><p>Bunu ayrı bir hizmet olarak veriyoruz. İstenirse ekip kalıyor; kolileri açıyor, mutfak dolaplarını ve gardırobu yerleştiriyor, boşalan ambalajı topluyor. Tepebaşı’nda <strong>evden eve nakliyat</strong> teklifinde bu seçenek ayrı satırda görünüyor, çünkü zorunlu değil — isteyen almıyor.</p><p>Bu hizmette bir sınır var ve baştan söylüyoruz: neyin nereye gireceğine siz karar veriyorsunuz. Ekip sizin tarif ettiğiniz düzeni kuruyor; kendi kararıyla bir dolabı doldurmuyor. Bu yüzden hizmet, evde bulunduğunuz zamana planlanıyor.</p>`,
    kunye: [
      { label: 'İki ayrı iş', value: 'Boşaltma kolinin odaya konmasıyla biter; kutu açma ayrı hizmet.' },
      { label: 'Kapsam', value: 'Koliler açılıyor, mutfak ve gardırop yerleştiriliyor, ambalaj toplanıyor.' },
      { label: 'Zorunlu değil', value: 'Teklifte ayrı satırda; isteyen almıyor.' },
      { label: 'Sınır', value: 'Düzeni siz tarif ediyorsunuz; hizmet evde olduğunuz zamana planlanıyor.' },
    ],
    guzergahlar: [
      { to: 'Odunpazarı', note: 'Şehir içi geçiş; iş aynı gün bitiyor.' },
      { to: 'İnönü', note: 'Batıya geçiş; günübirlik.' },
      { to: 'Alpu', note: 'Doğuya geçiş; yol süresi planlanıyor.' },
      { to: 'Eskişehir', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Kolileri de siz açıyor musunuz?',
        answer:
          'İsterseniz açıyoruz. Bu ayrı bir hizmet; teklifte ayrı satırda görünüyor ve zorunlu değil.',
      },
      {
        question: 'Mutfağı siz mi diziyorsunuz?',
        answer:
          'Diziyoruz, ama düzeni siz tarif ediyorsunuz. Ekip kendi kararıyla bir dolabı doldurmuyor.',
      },
      {
        question: 'Bu hizmet için evde olmam gerekiyor mu?',
        answer:
          'Gerekiyor. Neyin nereye gireceğine siz karar verdiğiniz için hizmet evde olduğunuz zamana planlanıyor.',
      },
      {
        question: 'Boşalan koliler ne oluyor?',
        answer:
          'Açılan koliler ve ambalaj malzemesi toplanıp götürülüyor; evde yığın kalmıyor.',
      },
    ],
  },

  // ───────────────────────── ORTA DERİNLİK (4) ─────────────────────────
  {
    ad: 'Sivrihisar',
    derinlik: 'orta',
    ozet:
      'Sivrihisar’da araç kalkmadan önce son bir tur atılıyor; unutulan eşya çoğunlukla hep aynı yerlerden çıkıyor.',
    metaAciklama:
      'Sivrihisar evden eve nakliyat: yükleme sonrası son kontrol turu ve unutulan eşya, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Sivrihisar’a ya da buradan yapılan taşımalarda geri dönmek kolay değil; unutulan bir eşya için ayrı bir sefer gerekiyor. Bu yüzden araç kalkmadan önce iki kişiyle son bir tur atıyoruz.</p><p>Tur rastgele değil; unutulan eşya neredeyse hep aynı yerlerden çıkıyor: balkon ve balkon dolabı, çatı arası ya da depo, kombi dolabının içi, ayakkabılığın üstü, kapı arkasındaki askılar, banyodaki üst raf ve klimanın dış ünitesi. Sivrihisar’da <strong>evden eve nakliyat</strong> ekibi bu listeyi tek tek geçiyor ve son onayı sizden alıyor.</p>`,
    kunye: [
      { label: 'Son tur', value: 'Araç kalkmadan önce iki kişiyle yapılıyor.' },
      { label: 'Sabit liste', value: 'Balkon dolabı, çatı arası, kombi dolabı, ayakkabılık üstü, kapı arkası, banyo üst rafı.' },
      { label: 'Onay', value: 'Tur bittikten sonra son onay sizden alınıyor.' },
    ],
    guzergahlar: [
      { to: 'Odunpazarı', note: 'Kuzeybatı aksı; Eskişehir merkezi, yol süresi planlanıyor.' },
      { to: 'Çifteler', note: 'Kuzeye geçiş; güzergâh düz.' },
      { to: 'Eskişehir', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Bir şey unutulursa geri gelir misiniz?', answer: 'Unutulmaması için araç kalkmadan son tur atıyoruz. Yine de olursa çözüm buluyoruz ama uzak mesafede ayrı sefer gerekiyor.' },
      { question: 'Nerelere bakıyorsunuz?', answer: 'Balkon dolabı, çatı arası, kombi dolabı, ayakkabılık üstü, kapı arkası ve banyo üst rafı sabit listemizde.' },
      { question: 'Klimanın dış ünitesi taşınıyor mu?', answer: 'Taşınacaksa keşifte söylemeniz gerekiyor; söküm ayrı planlanıyor ve son turda kontrol ediliyor.' },
    ],
  },

  {
    ad: 'Çifteler',
    derinlik: 'orta',
    ozet:
      'Çifteler’de taşıma sırasında ev sahibinin yük taşımasını istemiyoruz; sorumluluk ve güvenlik ekipte kalıyor.',
    metaAciklama:
      'Çifteler evden eve nakliyat: taşıma güvenliği ve sorumluluk sınırları, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Çifteler’deki işlerde sık yaşanan bir durum, ev sahibinin yardım etmek istemesi. İyi niyetli bir davranış ama iki sorun doğuruyor: taşıma sırasında oluşan bir yaralanma sigortamızın kapsamında değil ve iki farklı ritimde çalışan kişi merdivende birbirini zorluyor.</p><p>Bu yüzden yükü ekibin taşımasını istiyoruz. Çifteler’de <strong>evden eve nakliyat</strong> sırasında sizden beklediğimiz şey farklı: hangi parçanın nereye gideceğini söylemek, kapıları açık tutmak ve karar gerektiren noktalarda ulaşılabilir olmak. İşin hızını da güvenliğini de en çok bu belirliyor.</p>`,
    kunye: [
      { label: 'Kural', value: 'Yükü ekip taşıyor; ev sahibinin taşımaya girmesi istenmiyor.' },
      { label: 'Sebep', value: 'Taşıma sırasında oluşan yaralanma sigorta kapsamında değil.' },
      { label: 'Beklenen', value: 'Yönlendirme, kapıların açık tutulması ve karar anlarında ulaşılabilir olmak.' },
    ],
    guzergahlar: [
      { to: 'Sivrihisar', note: 'Güneye geçiş; güzergâh düz.' },
      { to: 'Odunpazarı', note: 'Kuzeybatı aksı; Eskişehir merkezi.' },
      { to: 'Eskişehir', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Yardım etsem daha hızlı olmaz mı?', answer: 'Genellikle olmuyor. İki farklı ritim merdivende birbirini zorluyor; ayrıca yaralanma sigorta kapsamı dışında.' },
      { question: 'Benden ne bekliyorsunuz?', answer: 'Yönlendirme. Hangi parçanın nereye gideceğini söylemeniz işi en çok hızlandıran şey.' },
      { question: 'Ekip yeterli sayıda mı geliyor?', answer: 'Keşifte belirlenen sayıda geliyor; yardıma ihtiyaç duyulacak şekilde planlamıyoruz.' },
    ],
  },

  {
    ad: 'İnönü',
    derinlik: 'orta',
    ozet:
      'İnönü’de kendi paketlediğiniz kolilerde sigortanın nasıl işlediği baştan konuşuluyor.',
    metaAciklama:
      'İnönü evden eve nakliyat: müşterinin paketlediği kolilerde sigorta kapsamı, yazılı sabit fiyat.',
    govde: `<p>İnönü’de paketlemeyi kendi yapmak isteyen müşteriler var ve bu tamamen mümkün. Ancak baştan söylememiz gereken bir ayrım var: taşıma sigortası, içeriğini görmediğimiz ve bizim paketlemediğimiz bir kolinin içindeki kırılma için aynı şekilde işlemiyor.</p><p>Kapalı bir koliyi teslim alıyoruz; içindekini görmediğimiz için hasarın taşımadan mı yoksa paketlemeden mi kaynaklandığı belirlenemiyor. İnönü’de <strong>evden eve nakliyat</strong> planında bu yüzden kırılacak eşyayı biz paketliyoruz; diğer kolileri siz hazırlıyorsanız kapsamın nasıl değiştiğini sözleşmede yazıyoruz. Amaç sorumluluktan kaçmak değil, hasar anında tartışma çıkmaması.</p>`,
    kunye: [
      { label: 'Ayrım', value: 'Bizim paketlemediğimiz kolinin içeriği görülmediği için kapsam farklı işliyor.' },
      { label: 'Çözüm', value: 'Kırılacak eşya her hâlükârda ekip tarafından paketleniyor.' },
      { label: 'Yazılı', value: 'Kapsamın nasıl değiştiği sözleşmede belirtiliyor.' },
    ],
    guzergahlar: [
      { to: 'Tepebaşı', note: 'Doğuya geçiş; Eskişehir merkezi, günübirlik.' },
      { to: 'Odunpazarı', note: 'Doğuya devam; yol süresi planlanıyor.' },
      { to: 'Eskişehir', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Kendim paketlersem sigorta geçersiz mi oluyor?', answer: 'Geçersiz olmuyor ama kapsam farklı işliyor. Nasıl değiştiğini sözleşmede yazıyoruz.' },
      { question: 'Kırılacak eşyayı da ben paketleyebilir miyim?', answer: 'Önermiyoruz. Kırılacak parçaları siz istemeseniz de biz paketliyoruz.' },
      { question: 'Paketlemeyi ben yaparsam fiyat düşer mi?', answer: 'Düşer. Ambalaj ve işçilik ayrı kalem olduğu için tekliften çıkıyor.' },
    ],
  },

  {
    ad: 'Alpu',
    derinlik: 'orta',
    ozet:
      'Alpu’da kitaplık ve vitrin gibi raflı mobilyalar dolu taşınmıyor; rafları çıkarılıp arkalığı destekleniyor.',
    metaAciklama:
      'Alpu evden eve nakliyat: kitaplık ve vitrin gibi raflı mobilyalarda söküm ve destekleme, yazılı sabit fiyat.',
    govde: `<p>Alpu’daki taşımalarda dikkat isteyen mobilya tipi kitaplık, vitrin ve raflı dolaplar oluyor. Bunlar ayakta dururken sağlam görünüyor ama taşıma sırasında en zayıf noktaları arkalık: ince bir levha olan arkalık, gövde hafifçe burulduğunda çivilerinden çıkıyor ve mobilya bir daha dik durmuyor.</p><p>Bu yüzden raflar çıkarılıyor, gövde boş taşınıyor ve arkalık taşıma boyunca destekleniyor. Alpu’da <strong>evden eve nakliyat</strong> yaparken çıkarılan rafları numaralandırıyoruz, çünkü çoğu kitaplıkta raflar birbirinin aynı değil ve yanlış sıra takıldığında delikler tutmuyor.</p>`,
    kunye: [
      { label: 'Zayıf nokta', value: 'Arkalık; gövde burulduğunda çivilerinden çıkıyor.' },
      { label: 'Yöntem', value: 'Raflar çıkarılıyor, gövde boş taşınıyor, arkalık destekleniyor.' },
      { label: 'Numaralandırma', value: 'Raflar birbirinin aynı olmadığı için sırasıyla işaretleniyor.' },
    ],
    guzergahlar: [
      { to: 'Odunpazarı', note: 'Batıya geçiş; Eskişehir merkezi, günübirlik.' },
      { to: 'Tepebaşı', note: 'Batıya devam; yol süresi planlanıyor.' },
      { to: 'Eskişehir', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Kitaplığı boşaltmalı mıyım?', answer: 'Boşaltılması gerekiyor. Dolu taşınan raflı mobilyada arkalık ayrılıyor ve mobilya dik durmuyor.' },
      { question: 'Raflar karışır mı?', answer: 'Karışmaması için numaralandırıyoruz; çoğu kitaplıkta raflar birbirinin aynı değil.' },
      { question: 'Vitrin camları için ne yapıyorsunuz?', answer: 'Cam raflar ve kapaklar ayrı çıkarılıp sarılıyor, gövdeyle birlikte taşınmıyor.' },
    ],
  },
]

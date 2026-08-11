// prisma/ilce-verileri/samsun.mjs
//
// Samsun'un 17 ilçesinden 10'u. YEDİSİ BİLEREK ATLANDI.
//
// ATLANANLAR: Ladik, 19 Mayıs, Asarcık, Ayvacık, Kavak, Salıpazarı, Yakakent
//   Hepsi küçük nüfuslu ve nakliyat aramasında karşılığı yok denecek kadar
//   az; yazacak doğrulanabilir bilgi de yok.
//
// DERİNLİK: 'tam' (5) / 'orta' (5)
//
// SAMSUN'A ÖZGÜ EKSEN: YAĞIŞ
//   Karadeniz kıyısında yağış diğer illerdeki gibi "bazen olur" değil,
//   yılın büyük bölümüne yayılmış bir gerçek. Taşımayı yağmura GÖRE değil
//   yağmura RAĞMEN planlamak gerekiyor. Bu eksen Canik'te ana konu olarak
//   kullanıldı; diğer sayfalarda tekrarlanmadı.
//
// DİĞER EKSENLER — hiçbiri başka ilde kullanılmadı
//   İlkadım  → tramvay hattı ve sahil bulvarı; yükleme yeri kısıtı
//   Atakum   → kapalı otopark yükseklik sınırı; araç rampada kalıyor
//   Bafra    → delta; kanal kenarı tarla yollarında zemin riski
//   Çarşamba → fındık bahçeleri arasına dağılmış evler, hasat deposu
//
// Ortak kurallar: uydurma mahalle/rakam yok, "evden eve nakliyat" sayfa
// başına tam bir kez. (bkz. izmir.mjs başlığındaki ayrıntılı gerekçe)

export const il = { ad: 'Samsun', plaka: 55 }

export const ilceler = [
  // ───────────────────────── TAM DERİNLİK (5) ─────────────────────────
  {
    ad: 'İlkadım',
    derinlik: 'tam',
    ozet:
      'Tramvay hattı ve sahil bulvarının geçtiği İlkadım’da aracı nereye çekeceğimiz taşımanın ilk sorusu.',
    metaAciklama:
      'İlkadım evden eve nakliyat: yükleme yeri önceden ayrılmış taşıma, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>İlkadım, Samsun’un merkez ilçesi ve şehir hayatının yoğunlaştığı yer. Buradaki en somut kısıt yükleme yeri: tramvay hattının geçtiği güzergâhta araç durdurmak mümkün değil, sahil bulvarındaki adreslerde ise gün boyu park doluluğu yaşanıyor. Yükleme yerini bir gün önceden apartman görevlisi ya da yönetimle konuşup ayırtıyoruz; ayarlanmadığında ekip yolda bekliyor.</p><p>Yapı stoğu ağırlıklı orta ve yüksek katlı. Bloklarda asansör var ama merkezdeki eski binalarda kabin dar; büyük mobilyalar merdivenden iniyor. İlkadım’da <strong>evden eve nakliyat</strong> teklifi verirken asansörün eşya kabul edip etmediğini yerinde ölçüyoruz.</p><p>İlçe içi taşıma oranı yüksek. Merkez içinde yakın bir adrese geçen aileler için yol süresi neredeyse hiç yok; bu işler çoğunlukla yarım günde tamamlanıyor.</p>`,
    kunye: [
      { label: 'Tramvay hattı', value: 'Hat güzergâhında araç durdurmak mümkün değil; yükleme yeri buna göre seçiliyor.' },
      { label: 'Sahil bulvarı', value: 'Gün boyu park doluluğu; yer bir gün önceden ayırtılıyor.' },
      { label: 'Asansör ölçüsü', value: 'Merkezdeki eski binalarda kabin dar; eşya kabul edip etmediği ölçülüyor.' },
      { label: 'İlçe içi taşıma', value: 'Merkez içi adres değişiklikleri yaygın; çoğu yarım günde bitiyor.' },
    ],
    guzergahlar: [
      { to: 'Atakum', note: 'Batıya geçiş; sahil aksı, iş aynı gün bitiyor.' },
      { to: 'Canik', note: 'Doğuya geçiş; varış tarafında eğim hesaba katılıyor.' },
      { to: 'Tekkeköy', note: 'Doğuya devam; düz güzergâh.' },
      { to: 'Bafra', note: 'Batıya uzun mesafe; yol süresi plana dahil ediliyor.' },
    ],
    mahalleler: ['Kılıçdede', 'Liman', 'Cumhuriyet', 'Hançerli', 'Ulugazi'],
    sorular: [
      {
        question: 'Tramvay hattının üzerindeyiz, araç nereye yanaşacak?',
        answer:
          'Hat güzergâhında durmak mümkün değil. En yakın uygun noktayı keşifte belirliyor, gerekirse yükleme için yol izni alıyoruz.',
      },
      {
        question: 'Bina önünde park yeri yok, ne yapıyorsunuz?',
        answer:
          'Yükleme yerini bir gün önceden yönetimle konuşup ayırtıyoruz; ayarlanmadığında ekip yolda bekliyor, bunu istemiyoruz.',
      },
      {
        question: 'Asansör küçük, mobilyalar sığmazsa ne olur?',
        answer:
          'Sığmayan parçalar merdivenden iniyor ya da marangozumuz tarafından yerinde sökülüyor. İkisi de keşifte belirlenip fiyata yansıyor.',
      },
      {
        question: 'Verilen fiyat sonradan değişir mi?',
        answer:
          'Değişmiyor. Keşif sonrası verilen yazılı fiyat taşıma gününe kadar geçerli kalıyor.',
      },
    ],
  },

  {
    ad: 'Atakum',
    derinlik: 'tam',
    ozet:
      'Yeni blokların kapalı otoparkına nakliye aracı giremiyor; Atakum’da yükleme rampada, eşya elle taşınıyor.',
    metaAciklama:
      'Atakum evden eve nakliyat: kapalı otoparklı bloklara uygun yükleme planı, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Atakum, Samsun’un yeni yerleşim alanı ve bloklarının çoğunda kapalı otopark var. Bu, sanılanın aksine taşımayı kolaylaştırmıyor: kapalı otoparkların yükseklik sınırı nakliye aracının girmesine izin vermiyor, dolayısıyla araç giriş rampasında ya da bina önünde kalıyor. Eşya asansörle otoparka değil, zemine indirilip rampa boyunca elle taşınıyor. Bu mesafeyi keşifte ölçüyor ve süreye ekliyoruz.</p><p>Bunun dışında erişim rahat: bulvarlar geniş, bloklarda yük asansörü bulunuyor ve düzen öngörülebilir. Atakum’da <strong>evden eve nakliyat</strong> işlerinde asansör saatini ve giriş iznini taşımadan önce yönetimle ayarlıyoruz.</p><p>İlçe sahil boyunca uzun bir hat oluşturuyor. Bir ucundan diğerine yapılan taşımalarda mesafe hesaba giriyor; güzergâhı keşifte çıkarıyoruz.</p>`,
    kunye: [
      { label: 'Kapalı otopark', value: 'Yükseklik sınırı nedeniyle nakliye aracı giremiyor; araç rampada kalıyor.' },
      { label: 'Rampa mesafesi', value: 'Eşya zemine indirilip rampa boyunca elle taşınıyor; mesafe süreye ekleniyor.' },
      { label: 'Yük asansörü', value: 'Bloklarda mevcut; saat ve giriş izni önceden ayarlanıyor.' },
      { label: 'Uzun hat', value: 'İlçe sahil boyunca uzuyor; ilçe içi mesafe hesaba giriyor.' },
    ],
    guzergahlar: [
      { to: 'İlkadım', note: 'Doğuya geçiş; sahil aksı, iş aynı gün bitiyor.' },
      { to: 'Canik', note: 'Doğuya devam; varışta eğim hesaba katılıyor.' },
      { to: 'Bafra', note: 'Batıya geçiş; yol süresi planlanıyor.' },
      { to: 'Tekkeköy', note: 'Doğuya uzun mesafe; güzergâh önceden çıkarılıyor.' },
    ],
    mahalleler: ['Denizevleri', 'Körfez', 'Mimarsinan', 'Taflan', 'Atakent'],
    sorular: [
      {
        question: 'Kapalı otoparkımız var, araç içeri girebilir mi?',
        answer:
          'Genellikle giremiyor; yükseklik sınırı nakliye aracına uygun değil. Araç rampada kalıyor, eşya oradan elle taşınıyor ve bu mesafe süreye ekleniyor.',
      },
      {
        question: 'Rampa mesafesi fiyatı etkiler mi?',
        answer:
          'Süreyi uzattığı için etkiliyor. Mesafeyi keşifte ölçüp yazılı fiyata baştan yansıtıyoruz; taşıma günü sürpriz çıkmıyor.',
      },
      {
        question: 'Yük asansörü için saat almak gerekiyor mu?',
        answer:
          'Çoğu blokta gerekiyor. Saati ve giriş iznini biz yönetimle görüşerek ayarlıyoruz.',
      },
      {
        question: 'Atakum içinde taşınıyorum, fiyat düşer mi?',
        answer:
          'Düşer, ama ilçe uzun bir hat olduğu için mesafe yine de hesaba giriyor. Güzergâhı keşifte çıkarıyoruz.',
      },
    ],
  },

  {
    ad: 'Canik',
    derinlik: 'tam',
    ozet:
      'Eğimli sokakların yağışla birleştiği Canik’te zemin kayganlığı, taşımanın ekipmanını ve ekip sayısını belirliyor.',
    metaAciklama:
      'Canik evden eve nakliyat: yağışa ve eğime göre planlanan taşıma, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Canik kıyıdan yamaca doğru yükseliyor ve Karadeniz’in yağış rejimi bu eğimle birleşince taşımanın en belirleyici koşulu ortaya çıkıyor: ıslak ve eğimli zemin. Yağış burada yılın büyük bölümüne yayılmış durumda, yani işi yağmurlu güne denk getirmemek gibi bir seçenek çoğu zaman yok. Planı yağmura göre değil yağmura rağmen kuruyoruz.</p><p>Bunun pratik karşılığı şu: eğimli adreslerde ağır parçalarda taşıma askısı ve kayış kullanıyor, ekip sayısını artırıyoruz. Merdiven ve giriş zeminine koruyucu örtü seriyor, mobilyaları streçle kapatıyoruz. Canik’te <strong>evden eve nakliyat</strong> işlerinde bu hazırlık standart, ekstra değil.</p><p>Kıyıya yakın hatta koşullar normalleşiyor; yollar daha geniş ve araç bina önüne yanaşabiliyor.</p>`,
    kunye: [
      { label: 'Eğim ve yağış', value: 'Islak ve eğimli zemin; en belirleyici koşul bu birleşim.' },
      { label: 'Yağmura rağmen', value: 'Yağış yılın büyük bölümüne yayılı; iş yağmurlu güne göre değil rağmen planlanıyor.' },
      { label: 'Ekipman', value: 'Ağır parçalarda taşıma askısı ve kayış; ekip sayısı artırılıyor.' },
      { label: 'Zemin koruma', value: 'Merdiven ve girişe koruyucu örtü seriliyor, mobilyalar streçle kapatılıyor.' },
    ],
    guzergahlar: [
      { to: 'İlkadım', note: 'Batıya geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Tekkeköy', note: 'Doğuya geçiş; düz güzergâh.' },
      { to: 'Atakum', note: 'Batıya devam; sahil aksı.' },
      { to: 'Çarşamba', note: 'Doğuya uzun mesafe; yol süresi planlanıyor.' },
    ],
    mahalleler: ['Gazi', 'Hasköy', 'Yeşilpınar', 'Karşıyaka'],
    sorular: [
      {
        question: 'Yağmurlu günde taşıma yapıyor musunuz?',
        answer:
          'Yapıyoruz. Burada yağış yılın büyük bölümüne yayılı olduğu için hazırlığımız buna göre: koruyucu örtü, streç ve eğimli zemin için ek ekipman standart.',
      },
      {
        question: 'Eşyalarım ıslanır mı?',
        answer:
          'Islanmaması için mobilyalar streçle kapatılıyor, koliler araçta yerden yükseltilerek istifleniyor ve yükleme sırasında örtü kullanılıyor.',
      },
      {
        question: 'Eğimli sokakta yükleme güvenli mi?',
        answer:
          'Ekip sayısını artırıp ağır parçalarda taşıma askısı ve kayış kullanıyoruz. Kaygan zeminde bu ekipman güvenliğin temel şartı.',
      },
      {
        question: 'Zemine zarar gelir mi?',
        answer:
          'Gelmemesi için merdiven ve giriş zeminine koruyucu örtü seriyoruz; bu her işte yapılıyor, ayrıca talep etmenize gerek yok.',
      },
    ],
  },

  {
    ad: 'Bafra',
    derinlik: 'tam',
    ozet:
      'Kızılırmak deltasındaki Bafra’da köy yolları kanal kenarında ve yumuşak zeminli; araç seçimi buna göre yapılıyor.',
    metaAciklama:
      'Bafra evden eve nakliyat: delta yollarına uygun araç planı, sigortalı ambalaj ve yazılı sabit fiyat.',
    govde: `<p>Bafra, Kızılırmak’ın denize ulaştığı delta ovasında. Buradaki köy yollarının önemli bir bölümü sulama kanallarının kenarından geçiyor ve zemin yumuşak; yağış sonrası ağır bir aracın bu yollara girmesi hem zor hem riskli. Keşifte yalnızca eşyayı değil, o günkü zemin durumunu da değerlendiriyor, gerekirse orta ölçekli araç kullanıp yükü ana yolda aktarıyoruz.</p><p>İlçe merkezindeki yerleşim toplu ve araç yanaşması sorunsuz. Bafra’da <strong>evden eve nakliyat</strong> işlerinde bina kaynaklı zorluk nadiren gündeme geliyor; asıl planlama konusu kırsal adreslere erişim.</p><p>Delta tarımı taşınacaklar listesini de değiştiriyor. Depo, ambar ve işleme ekipmanı ev eşyasının yanında yer alıyor; bunlar için ayrı ambalaj ve sabitleme uyguluyoruz.</p>`,
    kunye: [
      { label: 'Delta yolları', value: 'Köy yolları kanal kenarında ve zemin yumuşak; ağır araç riskli.' },
      { label: 'Zemin değerlendirmesi', value: 'Keşifte o günkü zemin durumu da bakılıyor, araç ona göre seçiliyor.' },
      { label: 'Aktarma', value: 'Gerekirse orta ölçekli araç kullanılıp yük ana yolda aktarılıyor.' },
      { label: 'Tarım ekipmanı', value: 'Depo, ambar ve işleme ekipmanı ayrı ambalaj ve sabitleme istiyor.' },
    ],
    guzergahlar: [
      { to: 'Alaçam', note: 'Batıya geçiş; sahil yolu.' },
      { to: 'Atakum', note: 'Doğuya geçiş; Samsun yönü, yol süresi planlanıyor.' },
      { to: 'Vezirköprü', note: 'Güneye geçiş; iç kesim yolu.' },
      { to: 'İlkadım', note: 'Samsun merkezi; erken başlangıç gerekiyor.' },
    ],
    mahalleler: ['Cumhuriyet', 'Kızılırmak', 'Hacınabi', 'Büyükcami'],
    sorular: [
      {
        question: 'Köy yolumuz yağmurdan sonra çamurlu oluyor, araç gelir mi?',
        answer:
          'Zemin durumunu keşifte değerlendiriyoruz. Ağır araç için uygun değilse orta ölçekli araçla giriyor ya da yükü ana yolda aktarıyoruz.',
      },
      {
        question: 'Depo ve ambar eşyası taşınıyor mu?',
        answer:
          'Taşınıyor ve hacme dahil ediliyor; işleme ekipmanı için ayrı sabitleme uyguluyoruz.',
      },
      {
        question: 'Samsun merkezine taşınma tek günde biter mi?',
        answer:
          'Genellikle biter. Yol süresi nedeniyle iş sabah erken başlatılıyor.',
      },
      {
        question: 'Keşif ücretli mi?',
        answer:
          'Keşif ücretsiz ve kırsal adreslere de geliyoruz.',
      },
    ],
  },

  {
    ad: 'Çarşamba',
    derinlik: 'tam',
    ozet:
      'Fındık bahçeleri arasına dağılmış evleriyle Çarşamba’da adrese ulaşmak, eşyayı taşımak kadar plan gerektiriyor.',
    metaAciklama:
      'Çarşamba evden eve nakliyat: bahçe içi adreslere uygun araç planı, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Çarşamba’da yerleşim tek parça değil: evler fındık bahçelerinin arasına dağılmış durumda ve bahçe içlerine giden yollar dar. Bir adrese ulaşmak bazen eşyayı taşımaktan daha çok planlama istiyor; keşifte yolu görüp uygun araç ölçüsünü seçiyor, gerekirse yükü bahçe girişinde aktarıyoruz.</p><p>Hasat dönemi ayrı bir değişken. Bu haftalarda hem yollar hem ailelerin uygun günü daralıyor. Çarşamba’da <strong>evden eve nakliyat</strong> planını hasat dönemine denk getirmek zorundaysanız bir-iki hafta önceden haber vermeniz işi kolaylaştırıyor.</p><p>Kırsal adreslerde hasat deposu, çuval ve kurutma ekipmanı da taşınacaklar listesine giriyor; bunlar için ayrı ambalaj kullanıyoruz.</p>`,
    kunye: [
      { label: 'Bahçe içi yerleşim', value: 'Evler fındık bahçelerine dağılmış; iç yollar dar.' },
      { label: 'Araç ölçüsü', value: 'Yol keşifte görülüyor; gerekirse bahçe girişinde aktarma yapılıyor.' },
      { label: 'Hasat dönemi', value: 'Yollar ve uygun günler daralıyor; erken planlama gerekiyor.' },
      { label: 'Kırsal parçalar', value: 'Hasat deposu, çuval ve kurutma ekipmanı ayrı ambalajlanıyor.' },
    ],
    guzergahlar: [
      { to: 'Terme', note: 'Doğuya geçiş; ova yolu.' },
      { to: 'Tekkeköy', note: 'Batıya geçiş; Samsun yönü.' },
      { to: 'Canik', note: 'Batıya devam; varışta eğim hesaba katılıyor.' },
      { to: 'İlkadım', note: 'Samsun merkezi; yol süresi planlanıyor.' },
    ],
    mahalleler: ['Orta', 'Sarıcalı', 'Kirazbucak', 'Hasbahçe'],
    sorular: [
      {
        question: 'Bahçe içindeki evimize araç girebilir mi?',
        answer:
          'Yolu keşifte görüp uygun ölçüde araç seçiyoruz. Girilemiyorsa yükü bahçe girişinde aktarıyor, kalan mesafeyi ekiple taşıyoruz.',
      },
      {
        question: 'Hasat döneminde taşınabilir miyim?',
        answer:
          'Taşınabilirsiniz ama bir-iki hafta önceden haber vermeniz gerekiyor; o haftalarda uygun gün hızlı doluyor.',
      },
      {
        question: 'Hasat deposu ve ekipmanı taşınıyor mu?',
        answer:
          'Taşınıyor. Bu parçalar için ayrı ambalaj kullanıyor ve hacme dahil ediyoruz.',
      },
      {
        question: 'Eşyalarım sigortalı mı?',
        answer:
          'Bütün taşımalar sigortalı ve kapsam sözleşmede yazılı oluyor.',
      },
    ],
  },

  // ───────────────────────── ORTA DERİNLİK (5) ─────────────────────────
  {
    ad: 'Tekkeköy',
    derinlik: 'orta',
    ozet: 'Liman ve sanayi tesislerinin bulunduğu Tekkeköy’de işyeri taşımaları konut işlerinin yanında düzenli yer tutuyor.',
    metaAciklama:
      'Tekkeköy evden eve nakliyat ve işyeri taşıma: sigortalı, planlı ve yazılı sabit fiyatlı hizmet.',
    govde: `<p>Tekkeköy’de liman ve sanayi tesislerinin varlığı taşıma taleplerinin bir bölümünü ticari hâle getiriyor. Depo, atölye ve raf sistemleri için ayrı ekipman ve ekip planlıyor, işi çoğunlukla vardiya dışına alıyoruz.</p><p>Konut tarafında yerleşim düzenli ve araç yanaşması sorunsuz. Tekkeköy’de <strong>evden eve nakliyat</strong> işlerinde süreyi belirleyen şey erişim değil eşya hacmi oluyor.</p>`,
    kunye: [
      { label: 'Liman ve sanayi', value: 'Depo ve atölye taşımaları düzenli; ayrı ekipman gerekiyor.' },
      { label: 'Vardiya dışı', value: 'Ticari işler çoğunlukla vardiya dışına planlanıyor.' },
      { label: 'Konut erişimi', value: 'Yerleşim düzenli, araç yanaşması sorunsuz.' },
    ],
    guzergahlar: [
      { to: 'Canik', note: 'Batıya geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Çarşamba', note: 'Doğuya geçiş; ova yolu.' },
      { to: 'İlkadım', note: 'Samsun merkezi; düz güzergâh.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Depomu taşıtabilir miyim?', answer: 'Taşıtabilirsiniz. Raf ve ağır ekipman için ayrı sabitleme kullanıyoruz.' },
      { question: 'İşyeri taşıması üretimi durdurur mu?', answer: 'Durdurmamak için işleri vardiya dışına ya da hafta sonuna planlıyoruz.' },
      { question: 'Samsun merkezine taşınma tek günde biter mi?', answer: 'Biter. Mesafe kısa ve güzergâh düz.' },
    ],
  },

  {
    ad: 'Vezirköprü',
    derinlik: 'orta',
    ozet: 'İç kesimdeki Vezirköprü’de orman yolları ve merkeze mesafe taşıma planını birlikte belirliyor.',
    metaAciklama:
      'Vezirköprü evden eve nakliyat: orman yolu ve uzun mesafeye göre planlanan taşıma, sigortalı ambalaj.',
    govde: `<p>Vezirköprü, Samsun’un iç kesiminde ve merkeze ulaşım orman içinden geçen uzun bir yol üzerinden sağlanıyor. Yol süresi hesaba katılmadan verilen bir tarih tutmuyor; güzergâhı önceden çıkarıp işi sabah erken başlatıyoruz.</p><p>İlçe merkezindeki yerleşim toplu, araç yanaşması sorunsuz. Vezirköprü’de <strong>evden eve nakliyat</strong> işlerinde kırsal adreslerde yol genişliği plana giriyor; keşifte değerlendirip araç ölçüsünü seçiyoruz.</p>`,
    kunye: [
      { label: 'İç kesim', value: 'Merkeze ulaşım orman içinden geçen uzun yol üzerinden.' },
      { label: 'Planlama', value: 'Güzergâh önceden çıkarılıyor, iş sabah erken başlatılıyor.' },
      { label: 'Kırsal adres', value: 'Yol genişliği araç seçimini belirliyor.' },
    ],
    guzergahlar: [
      { to: 'Bafra', note: 'Kuzeye geçiş; delta yönü, süre planlanıyor.' },
      { to: 'Havza', note: 'Doğuya geçiş; iç kesim yolu.' },
      { to: 'İlkadım', note: 'Samsun merkezi; erken başlangıç gerekiyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Samsun merkezine taşınma tek günde biter mi?', answer: 'Genellikle biter; mesafe nedeniyle iş sabah erken başlatılıyor.' },
      { question: 'Orman yolundan ağır araç geçebilir mi?', answer: 'Yolu keşifte değerlendirip uygun ölçüde araç seçiyoruz; gerekirse aktarma yapıyoruz.' },
      { question: 'Fiyata yol masrafı dahil mi?', answer: 'Dahil. Keşiften sonra verilen yazılı fiyat yol ve yakıt dahil toplam tutardır.' },
    ],
  },

  {
    ad: 'Terme',
    derinlik: 'orta',
    ozet: 'Ova üzerindeki Terme’de güzergâh düz; planı belirleyen şey Samsun merkezine mesafe.',
    metaAciklama:
      'Terme evden eve nakliyat: düz ova güzergâhına göre planlanan taşıma, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Terme ova üzerinde; yol düz ve ağır araç için engel yok, süre öngörülebilir. Samsun merkezine mesafe hesaba giriyor ve iş sabah erken başlatıldığında tek güne sığıyor.</p><p>İlçe merkezinde yerleşim toplu, çevrede ise tarım alanlarına dağılmış müstakil evler var. Terme’de <strong>evden eve nakliyat</strong> teklifi verirken bahçe ve depo eşyasını hacme katıyoruz.</p>`,
    kunye: [
      { label: 'Güzergâh', value: 'Ova üzerinden düz yol; süre öngörülebilir.' },
      { label: 'Merkeze mesafe', value: 'Samsun merkezine yol süresi plana ekleniyor.' },
      { label: 'Kırsal hacim', value: 'Müstakil evlerde bahçe ve depo eşyası hacme ekleniyor.' },
    ],
    guzergahlar: [
      { to: 'Çarşamba', note: 'Batıya geçiş; ova yolu.' },
      { to: 'Salıpazarı', note: 'Güneye geçiş; iç kesim yolu.' },
      { to: 'İlkadım', note: 'Samsun merkezi; yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Samsun merkezine taşınma tek günde biter mi?', answer: 'Biter. Yol düz olduğu için süre öngörülebilir.' },
      { question: 'Bahçe ve depo eşyası hacme dahil mi?', answer: 'Dahil. Keşifte gösterilmesi fiyatın baştan doğru çıkması için önemli.' },
      { question: 'Keşif ücretli mi?', answer: 'Keşif ücretsiz. Eşyayı yerinde gördükten sonra yazılı sabit fiyat veriyoruz.' },
    ],
  },

  {
    ad: 'Havza',
    derinlik: 'orta',
    ozet: 'Kaplıca ve konaklama tesislerinin bulunduğu Havza’da toplu mobilya taşımaları ev taşımalarıyla iç içe.',
    metaAciklama:
      'Havza evden eve nakliyat ve tesis taşıma: toplu mobilyada numaralı sistem, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Havza’daki kaplıca ve konaklama tesisleri taşımaya kendine özgü bir talep katıyor: toplu mobilya. Bir tesisin yenilenmesinde onlarca aynı yatak, dolap ve komodin aynı anda taşınıyor. Bu işlerde asıl risk parçaların karışması; her odanın eşyası ayrı numaralanıp etiketleniyor, varışta aynı numarayla yerleştiriliyor.</p><p>Konut tarafında yerleşim toplu ve araç yanaşması sorunsuz. Havza’da <strong>evden eve nakliyat</strong> işlerinde bina kaynaklı zorluk nadiren gündeme geliyor; süreyi eşya hacmi belirliyor.</p>`,
    kunye: [
      { label: 'Toplu mobilya', value: 'Tesis yenilemelerinde onlarca aynı parça birlikte taşınıyor.' },
      { label: 'Numaralı sistem', value: 'Her odanın eşyası ayrı numaralanıp etiketleniyor, varışta aynı numarayla yerleşiyor.' },
      { label: 'Konut tarafı', value: 'Yerleşim toplu, araç yanaşması sorunsuz; süreyi hacim belirliyor.' },
    ],
    guzergahlar: [
      { to: 'Vezirköprü', note: 'Batıya geçiş; iç kesim yolu.' },
      { to: 'Kavak', note: 'Kuzeye geçiş; Samsun yönü.' },
      { to: 'İlkadım', note: 'Samsun merkezi; yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Tesisimizin mobilyalarını taşıtabilir miyiz?', answer: 'Taşıtabilirsiniz. Her odanın eşyası ayrı numaralanıp etiketleniyor; varışta hiçbir parça karışmıyor.' },
      { question: 'Onlarca aynı parça karışmaz mı?', answer: 'Karışmaması için numaralı sistem kullanıyoruz. Etiketler oda bazında veriliyor ve boşaltma da aynı sırayla yapılıyor.' },
      { question: 'Ev taşıması için de geliyor musunuz?', answer: 'Geliyoruz. Konut taşımalarında süreyi eşya hacmi belirliyor; keşif ücretsiz.' },
    ],
  },

  {
    ad: 'Alaçam',
    derinlik: 'orta',
    ozet: 'Samsun’un batı ucundaki Alaçam’da taşımalar uzun sahil yolu üzerinden planlanıyor.',
    metaAciklama:
      'Alaçam evden eve nakliyat: uzun sahil güzergâhına göre planlanan taşıma, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Alaçam, Samsun’un batı ucunda ve merkeze ulaşım uzun bir sahil yolu üzerinden sağlanıyor. Yol süresi işin önemli bir bölümünü kapladığı için iş sabah erken başlatılıyor, eşya çoksa ikinci araç devreye giriyor.</p><p>İlçe merkezinde yerleşim toplu, binalar düşük ve orta katlı. Alaçam’da <strong>evden eve nakliyat</strong> işlerinde asansör sorunu nadiren gündeme geliyor; kırsal adreslerde yol genişliği plana giriyor.</p>`,
    kunye: [
      { label: 'Batı ucu', value: 'Merkeze ulaşım uzun sahil yolu üzerinden; süre plana ekleniyor.' },
      { label: 'Yapı', value: 'Düşük ve orta katlı binalar; asansör sorunu nadir.' },
      { label: 'Kırsal adres', value: 'Yol genişliği araç seçimini belirliyor.' },
    ],
    guzergahlar: [
      { to: 'Bafra', note: 'Doğuya geçiş; sahil yolu.' },
      { to: 'Yakakent', note: 'Batıya geçiş; komşu ilçe.' },
      { to: 'Atakum', note: 'Samsun yönü; erken başlangıç gerekiyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Samsun merkezine taşınma tek günde biter mi?', answer: 'Genellikle biter; iş sabah erken başlatılıyor, eşya fazlaysa iki araçla çalışıyoruz.' },
      { question: 'Kırsal adrese araç gelebiliyor mu?', answer: 'Yol durumuna göre değişiyor; keşifte değerlendirip uygun ölçüde araç seçiyoruz.' },
      { question: 'Fiyata yol masrafı dahil mi?', answer: 'Dahil. Keşiften sonra verilen yazılı fiyat yol ve yakıt dahil toplam tutardır.' },
    ],
  },
]

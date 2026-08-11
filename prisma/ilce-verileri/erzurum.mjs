// prisma/ilce-verileri/erzurum.mjs
//
// Erzurum'un 20 ilçesinden 8'i. ON İKİSİ BİLEREK ATLANDI.
//
// ATLANANLAR: Karayazı, Tortum, İspir, Çat, Karaçoban, Narman, Olur,
//   Şenkaya, Tekman, Uzundere, Köprüköy, Pazaryolu
//   Hepsi küçük nüfuslu, dağlık kesimde ve nakliyat aramasında karşılığı
//   yok denecek kadar az; yazacak doğrulanabilir bilgi de yok.
//
// DERİNLİK: 'tam' (4) / 'orta' (4)
//
// ─────────────────────────────────────────────────────────────────────────
// BU DOSYANIN ASIL ZORLUĞU: KIŞ
//
// "Kar ve buzlanma" ekseni bu projede zaten SEKİZ ilçede kullanıldı
// (Elmadağ, Kızılcahamam, Çamlıdere, Kartepe, Korkuteli, Mut, Beyşehir,
// Pozantı). Erzurum'un sekiz ilçesinde birden tekrarlamak, bu oturumda üç
// kez düzeltmek zorunda kaldığım kopya içerik hatasının en büyüğü olurdu.
//
// Bu yüzden kış burada TEK BİR ŞEY olarak değil, her ilçede FARKLI BİR
// PRATİK SONUÇ olarak ele alındı:
//     Yakutiye   → kış istisna değil NORM; ekipman kalıcı olarak araçta
//     Palandöken → rakım + eğim = buz; zincir ve çekici desteği
//     Aziziye    → köy yollarının kapanması; tarih yol açma programına bağlı
//     Hınıs      → taşıma PENCERESİ dar; yılın belirli aylarına sıkışıyor
// Oltu, Pasinler, Horasan ve Aşkale'de kıştan hiç bahsedilmiyor.
//
// Ortak kurallar: uydurma mahalle/rakam yok, "evden eve nakliyat" sayfa
// başına tam bir kez. (bkz. izmir.mjs başlığındaki ayrıntılı gerekçe)

export const il = { ad: 'Erzurum', plaka: 25 }

export const ilceler = [
  // ───────────────────────── TAM DERİNLİK (4) ─────────────────────────
  {
    ad: 'Yakutiye',
    derinlik: 'tam',
    ozet:
      'Erzurum’da kış istisna değil kuralın kendisi; Yakutiye’de taşıma ekipmanı yılın tamamında kışa hazır duruyor.',
    metaAciklama:
      'Yakutiye evden eve nakliyat: kış koşullarına hazır ekipmanla sigortalı taşıma ve yazılı sabit fiyat.',
    govde: `<p>Başka illerde “kışı bekleyelim, havalar düzelsin” demek bir seçenek. Erzurum’da değil — soğuk mevsim yılın büyük bölümünü kaplıyor ve taşınma takvimi buna göre kurulmak zorunda. Bu yüzden Yakutiye’de kış taşıması bizim için özel bir durum sayılmıyor: kar küreği, tuz, kaymaz zemin örtüsü ve araç zinciri ekipte kalıcı olarak duruyor, ayrıca hazırlanmıyor.</p><p>Pratikte bu şu demek: yükleme öncesi bina girişi ve merdiven temizleniyor, zemine kaymaz örtü seriliyor, mobilyalar araca alınmadan önce kar ve nemden korunacak şekilde kapatılıyor. Yakutiye’de <strong>evden eve nakliyat</strong> teklifi verirken bu hazırlığı ayrı bir kalem olarak yazmıyoruz; işin doğal parçası.</p><p>İlçe şehrin merkezi olduğu için yapı stoğu karışık: merkezde orta katlı eski binalar, çevrede daha yeni bloklar var. Asansörün eşya kabul edip etmediğini keşifte yerinde ölçüyoruz.</p>`,
    kunye: [
      { label: 'Kış = norm', value: 'Soğuk mevsim yılın büyük bölümünü kaplıyor; taşıma takvimi buna göre kuruluyor.' },
      { label: 'Kalıcı ekipman', value: 'Kar küreği, tuz, kaymaz örtü ve zincir ekipte sürekli bulunuyor.' },
      { label: 'Yükleme hazırlığı', value: 'Bina girişi ve merdiven temizleniyor, zemine kaymaz örtü seriliyor.' },
      { label: 'Nem koruması', value: 'Mobilyalar araca alınmadan kar ve neme karşı kapatılıyor.' },
      { label: 'Yapı karışımı', value: 'Merkezde orta katlı eski bina, çevrede yeni bloklar.' },
    ],
    guzergahlar: [
      { to: 'Palandöken', note: 'Güneye geçiş; kısa mesafe, varışta buzlanma hesaba katılıyor.' },
      { to: 'Aziziye', note: 'Batıya geçiş; iş aynı gün bitiyor.' },
      { to: 'Pasinler', note: 'Doğuya geçiş; ova yolu, süre öngörülebilir.' },
      { to: 'Aşkale', note: 'Batıya devam; şehirlerarası çıkış aksı.' },
    ],
    mahalleler: ['Yoncalık', 'Şükrüpaşa', 'Cumhuriyet', 'Muratpaşa', 'Kâzım Karabekir'],
    sorular: [
      {
        question: 'Kışın taşınmak zorundayım, beklemem mi gerekir?',
        answer:
          'Gerekmez. Erzurum’da kış zaten yılın büyük bölümü; ekipmanımız buna göre hazır ve kış taşıması bizim için olağan bir iş.',
      },
      {
        question: 'Kar yağarken eşyalarım ıslanır mı?',
        answer:
          'Islanmaması için mobilyalar araca alınmadan kapatılıyor, koliler yerden yükseltilerek istifleniyor ve yükleme sırasında örtü kullanılıyor.',
      },
      {
        question: 'Kış hazırlığı için ayrı ücret alıyor musunuz?',
        answer:
          'Almıyoruz. Kar küreği, tuz ve kaymaz örtü işin doğal parçası; teklifte ayrı kalem olarak görünmüyor.',
      },
      {
        question: 'Verilen fiyat sonradan değişir mi?',
        answer:
          'Değişmiyor. Keşif sonrası verilen yazılı fiyat taşıma gününe kadar geçerli kalıyor.',
      },
    ],
  },

  {
    ad: 'Palandöken',
    derinlik: 'tam',
    ozet:
      'Rakım ile eğimin birleştiği Palandöken’de yaklaşma yolları buzlanıyor; araç zincirsiz çıkmıyor.',
    metaAciklama:
      'Palandöken evden eve nakliyat: buzlanan eğimli yollara uygun araç ve ekipman, sigortalı taşıma, yazılı fiyat.',
    govde: `<p>Palandöken’de taşımanın tek belirleyicisi kar değil, karın eğimle birleşmesi. İlçe dağ yamacına doğru yükseliyor ve yaklaşma yolları buzlandığında ağır bir araç zincirsiz tırmanamıyor. Bu yüzden burada zincir standart donanım; gerektiğinde çekici desteğiyle çıkıyoruz. Buzlu bir yokuşta araç zorlamak hem eşya hem ekip için gerçek bir risk, o yüzden zorlamıyoruz.</p><p>Yamaç boyunca yerleşim de değişiyor. Aşağı kesimde düzenli bloklar ve otopark var; yukarı çıkıldıkça sokaklar daralıyor ve manevra alanı azalıyor. Palandöken’de <strong>evden eve nakliyat</strong> planlarken adresin hangi kotta olduğunu keşifte belirliyor, araç ölçüsünü ona göre seçiyoruz.</p><p>Kayak sezonunda konaklama tesislerinden gelen toplu mobilya talepleri de oluyor. Bu işler konut taşımasından ayrı planlanıyor ve genellikle sezon dışına alınıyor.</p>`,
    kunye: [
      { label: 'Rakım + eğim', value: 'Yaklaşma yolları buzlanıyor; ağır araç zincirsiz tırmanamıyor.' },
      { label: 'Zincir standart', value: 'Zincir kalıcı donanım; gerektiğinde çekici desteğiyle çıkılıyor.' },
      { label: 'Zorlamama kuralı', value: 'Buzlu yokuşta araç zorlanmıyor; eşya ve ekip için gerçek risk.' },
      { label: 'Kot farkı', value: 'Aşağıda düzenli bloklar, yukarıda dar sokak ve az manevra alanı.' },
    ],
    guzergahlar: [
      { to: 'Yakutiye', note: 'Kuzeye geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Aziziye', note: 'Kuzeybatı aksı; düz güzergâh.' },
      { to: 'Pasinler', note: 'Doğuya geçiş; ova yolu.' },
      { to: 'Hınıs', note: 'Güneye geçiş; dağ yolu, mevsime göre planlanıyor.' },
    ],
    mahalleler: ['Yıldızkent', 'Yenidoğan', 'Hüseyin Avni Ulaş', 'Solakzade'],
    sorular: [
      {
        question: 'Buzlu yokuşta araç çıkabilir mi?',
        answer:
          'Zincirle çoğu adrese çıkıyoruz. Çıkamayacağımız bir durumda zorlamıyor, çekici desteği alıyor ya da yükü aşağıda aktarıyoruz.',
      },
      {
        question: 'Zincir ve çekici için ek ücret var mı?',
        answer:
          'Zincir standart donanım, ayrı ücreti yok. Çekici gerekiyorsa bu keşifte öngörülüp fiyata baştan yazılıyor.',
      },
      {
        question: 'Yukarı mahallede sokağımız dar, ne yapıyorsunuz?',
        answer:
          'Adresin kotunu ve sokağı keşifte görüp araç ölçüsünü seçiyoruz; manevra alanı yoksa aşağıda aktarma planlıyoruz.',
      },
      {
        question: 'Tesisimizin mobilyalarını taşıtabilir miyiz?',
        answer:
          'Taşıtabilirsiniz. Toplu mobilya işlerini konut taşımasından ayrı planlıyor ve genellikle sezon dışına alıyoruz.',
      },
    ],
  },

  {
    ad: 'Aziziye',
    derinlik: 'tam',
    ozet:
      'Aziziye’de köy yolları kışın kapanabiliyor; taşıma tarihi yolun açık olduğu güne göre belirleniyor.',
    metaAciklama:
      'Aziziye evden eve nakliyat: köy yolu durumuna göre planlanan tarih, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Aziziye’de şehir tarafı ile köyler arasında pratik bir fark var: merkeze yakın yerleşimde taşıma yıl boyu planlanabiliyor, kırsal mahallelerde ise kışın yolun açık olup olmadığı belirleyici oluyor. Kar yağışı sonrası bazı köy yolları belirli bir programa göre açılıyor; taşıma tarihini bu programa göre belirliyor, gerekirse birkaç gün kaydırıyoruz.</p><p>Bu, planı baştan değiştiren bir kısıt. Yolun kapalı olduğu bir güne verilen randevu tutmuyor ve iş yarım kalıyor. Aziziye’de <strong>evden eve nakliyat</strong> için kırsal adreslerde tarihi esnek tutmanızı öneriyoruz; açık bir gün çıktığında hızlı hareket ediyoruz.</p><p>Şehir tarafında ise yerleşim düzenli. Yollar geniş, bloklarda asansör bulunuyor ve iş öngörülebilir sürede tamamlanıyor.</p>`,
    kunye: [
      { label: 'Köy yolu durumu', value: 'Kışın bazı yollar programa göre açılıyor; tarih buna bağlı.' },
      { label: 'Esnek tarih', value: 'Kırsal adreslerde tarih esnek tutuluyor; açık gün çıktığında hızlı hareket ediliyor.' },
      { label: 'Yarım kalma riski', value: 'Kapalı güne verilen randevu tutmuyor; plan baştan buna göre kuruluyor.' },
      { label: 'Şehir tarafı', value: 'Düzenli yerleşim; geniş yol, asansörlü bloklar, öngörülebilir süre.' },
    ],
    guzergahlar: [
      { to: 'Yakutiye', note: 'Doğuya geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Aşkale', note: 'Batıya geçiş; ana yol üzerinden düz güzergâh.' },
      { to: 'Palandöken', note: 'Güneydoğu aksı; varışta eğim hesaba katılıyor.' },
      { to: 'Pasinler', note: 'Doğuya devam; ova yolu.' },
    ],
    mahalleler: ['Ilıca', 'Dumlu', 'Gezköy', 'Yarımca'],
    sorular: [
      {
        question: 'Köyümüzün yolu kışın kapanıyor, taşıma yapılabilir mi?',
        answer:
          'Yapılabilir ama tarihi yolun açık olduğu güne göre belirliyoruz. Esnek olursanız açık bir gün çıktığında hemen planlıyoruz.',
      },
      {
        question: 'Randevu günü yol kapanırsa ne oluyor?',
        answer:
          'Zorlamıyoruz; günü birlikte kaydırıyoruz. Yarım kalan bir taşıma hem maliyetli hem riskli oluyor.',
      },
      {
        question: 'Şehir tarafında taşınma ne kadar sürer?',
        answer:
          'Erişim rahat olduğu için süreyi hacim belirliyor; çoğu iş yarım gün ile bir gün arasında bitiyor.',
      },
      {
        question: 'Keşif ücretli mi?',
        answer:
          'Keşif ücretsiz ve kırsal adreslere de geliyoruz.',
      },
    ],
  },

  {
    ad: 'Oltu',
    derinlik: 'tam',
    ozet:
      'Oltu taşı atölyelerinin bulunduğu ilçede küçük ama değerli parçalar, mobilyadan çok daha fazla özen istiyor.',
    metaAciklama:
      'Oltu evden eve nakliyat ve atölye taşıma: değerli küçük parçalarda özel ambalaj, sigortalı taşıma, yazılı fiyat.',
    govde: `<p>Oltu’da karşımıza çıkan en özel taşıma işi atölye. Oltu taşı işlemeciliğinde hem ham taş sandıkları hem işlenmiş küçük parçalar var ve ikisi bambaşka muamele istiyor. Ham taş ağır ve sandıkları istiflenebiliyor; işlenmiş parçalar ise küçük, değerli ve kırılgan. Bunları sayım yaparak, bölmeli kutulara yerleştirip ayrı taşıyoruz ve teslimde aynı sayımı tekrarlıyoruz.</p><p>Atölyelerdeki torna ve zımpara tezgâhları da standart mobilya gibi taşınmıyor; hareketli parçaları sabitlenip ayrı bağlanıyor. Oltu’da <strong>evden eve nakliyat</strong> ile atölye taşımasını aynı teklifte birleştirmiyor, ikisini ayrı planlıyoruz.</p><p>İlçe, Erzurum merkezine göre vadi içinde ve daha alçakta kalıyor. Bu, merkeze kıyasla daha ılıman bir hava demek; yıl içinde çalışılabilir gün sayısı burada belirgin şekilde fazla.</p>`,
    kunye: [
      { label: 'Atölye taşıması', value: 'Ham taş sandıkları ağır, işlenmiş parçalar küçük ve kırılgan; ikisi ayrı muamele görüyor.' },
      { label: 'Sayımlı teslim', value: 'Değerli küçük parçalar sayılarak bölmeli kutuya konuyor, teslimde sayım tekrarlanıyor.' },
      { label: 'Tezgâh', value: 'Torna ve zımparanın hareketli parçaları sabitlenip ayrı bağlanıyor.' },
      { label: 'Vadi konumu', value: 'Merkeze göre alçakta ve daha ılıman; çalışılabilir gün sayısı fazla.' },
    ],
    guzergahlar: [
      { to: 'Narman', note: 'Batıya geçiş; dağ yolu, süre planlanıyor.' },
      { to: 'Tortum', note: 'Kuzeybatı aksı; vadi yolu.' },
      { to: 'Yakutiye', note: 'Erzurum merkezi; uzun güzergâh, erken başlangıç gerekiyor.' },
      { to: 'Şenkaya', note: 'Doğuya geçiş; komşu ilçe.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Atölyemdeki işlenmiş taşları taşıtabilir miyim?',
        answer:
          'Taşıtabilirsiniz. Sayım yaparak bölmeli kutulara yerleştiriyor, ayrı taşıyor ve teslimde aynı sayımı tekrarlıyoruz.',
      },
      {
        question: 'Torna tezgâhı nasıl taşınıyor?',
        answer:
          'Hareketli parçaları sabitlenip battaniyeye sarılıyor, araçta ayrı bağlanıyor ve üstüne yük konmuyor.',
      },
      {
        question: 'Erzurum merkezine taşınma tek günde biter mi?',
        answer:
          'Genellikle biter. Mesafe nedeniyle iş sabah erken başlatılıyor.',
      },
      {
        question: 'Eşyalarım sigortalı mı?',
        answer:
          'Bütün taşımalar sigortalı ve kapsam sözleşmede yazılı oluyor; değerli parçalar için kapsamı ayrıca konuşuyoruz.',
      },
    ],
  },

  // ───────────────────────── ORTA DERİNLİK (4) ─────────────────────────
  {
    ad: 'Pasinler',
    derinlik: 'orta',
    ozet: 'Erzurum merkezine en yakın ova ilçesi olan Pasinler’de taşımalar çoğunlukla günübirlik tamamlanıyor.',
    metaAciklama:
      'Pasinler evden eve nakliyat: merkeze yakın hızlı taşıma, sigortalı ambalaj ve yazılı sabit fiyat.',
    govde: `<p>Pasinler, Erzurum merkezine yakın bir ova ilçesi ve güzergâh düz. Bu ikisi bir araya gelince taşımaların büyük bölümü günübirlik tamamlanıyor; Yakutiye ve Aziziye yönündeki işlerde yol süresi hesaba bile zor giriyor.</p><p>İlçe merkezindeki yerleşim toplu, binalar ağırlıklı orta katlı ve araç yanaşması sorunsuz. Pasinler’de <strong>evden eve nakliyat</strong> işlerinde süreyi belirleyen şey erişim değil eşya hacmi oluyor.</p>`,
    kunye: [
      { label: 'Merkeze yakınlık', value: 'Ova üzerinde ve yakın; taşımaların çoğu günübirlik tamamlanıyor.' },
      { label: 'Güzergâh', value: 'Yol düz; süre öngörülebilir.' },
      { label: 'İlçe merkezi', value: 'Toplu yerleşim, orta katlı binalar, sorunsuz araç yanaşması.' },
    ],
    guzergahlar: [
      { to: 'Yakutiye', note: 'Batıya geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Horasan', note: 'Doğuya geçiş; ova yolu.' },
      { to: 'Aziziye', note: 'Batıya devam; düz güzergâh.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Erzurum merkezine taşınma ne kadar sürer?', answer: 'Mesafe kısa; işlerin neredeyse tamamı günübirlik tamamlanıyor.' },
      { question: 'Küçük hacimli taşıma yapıyor musunuz?', answer: 'Yapıyoruz. Uygun ölçüde araç ve az kişilik ekiple planlıyoruz, fiyat da buna göre oluyor.' },
      { question: 'Keşif ücretli mi?', answer: 'Keşif ücretsiz. Eşyayı yerinde gördükten sonra yazılı sabit fiyat veriyoruz.' },
    ],
  },

  {
    ad: 'Horasan',
    derinlik: 'orta',
    ozet: 'Hayvancılığın yaygın olduğu Horasan’da köy taşımalarında ahır ve yem deposu ekipmanı da listeye giriyor.',
    metaAciklama:
      'Horasan evden eve nakliyat: köy adreslerinde ek ekipman taşıması, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Horasan’ın köy adreslerinde taşınacaklar listesi ev eşyasıyla bitmiyor. Hayvancılığın yaygın olduğu ilçede ahır ekipmanı, yemlik, süt kabı ve yem deposu malzemesi de taşınıyor. Bunlar hem ağır hem şekilsiz parçalar; standart mobilya ambalajı işe yaramıyor, ayrı sabitleme ve ayrı istif gerekiyor.</p><p>İlçe merkezinde yerleşim toplu ve araç yanaşması sorunsuz. Horasan’da <strong>evden eve nakliyat</strong> teklifi hazırlarken kırsal adreslerde bu ek parçaları keşifte mutlaka not ediyoruz; hacmi ciddi biçimde değiştiriyorlar.</p>`,
    kunye: [
      { label: 'Hayvancılık', value: 'Ahır ekipmanı, yemlik ve yem deposu malzemesi listeye giriyor.' },
      { label: 'Şekilsiz parçalar', value: 'Standart mobilya ambalajı yetmiyor; ayrı sabitleme ve istif gerekiyor.' },
      { label: 'Hacim etkisi', value: 'Bu parçalar toplam hacmi ciddi biçimde değiştiriyor.' },
    ],
    guzergahlar: [
      { to: 'Pasinler', note: 'Batıya geçiş; ova yolu, süre öngörülebilir.' },
      { to: 'Köprüköy', note: 'Batıya devam; komşu ilçe.' },
      { to: 'Yakutiye', note: 'Erzurum merkezi; yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Ahır ekipmanı da taşınıyor mu?', answer: 'Taşınıyor. Ayrı sabitleme uyguluyor ve hacme dahil ediyoruz; keşifte göstermeniz önemli.' },
      { question: 'Köy adresine araç gelebiliyor mu?', answer: 'Yol durumuna göre değişiyor; keşifte değerlendirip uygun ölçüde araç seçiyoruz.' },
      { question: 'Erzurum merkezine taşınma tek günde biter mi?', answer: 'Genellikle biter; yol süresi plana ekleniyor ve iş erken başlatılıyor.' },
    ],
  },

  {
    ad: 'Aşkale',
    derinlik: 'orta',
    ozet: 'Erzurum’un batıya açılan kapısı Aşkale, şehirlerarası taşımaların ilk ve son durağı konumunda.',
    metaAciklama:
      'Aşkale evden eve nakliyat: şehirlerarası güzergâhta planlı taşıma, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Aşkale, Erzurum’un batıya açılan kapısı. İl dışına giden ve ilden gelen yükün büyük bölümü buradan geçiyor; bu da ilçeyi şehirlerarası taşımaların doğal ilk ve son durağı yapıyor. Uzun güzergâhlarda mola noktası ve sabitleme kontrolü burada planlanıyor.</p><p>İlçe merkezindeki yerleşim toplu, araç yanaşması sorunsuz. Aşkale’de <strong>evden eve nakliyat</strong> işlerinde bina kaynaklı zorluk nadiren gündeme geliyor; asıl konu güzergâhın uzunluğu oluyor.</p>`,
    kunye: [
      { label: 'Batı kapısı', value: 'İl dışına giden ve gelen yükün büyük bölümü buradan geçiyor.' },
      { label: 'Şehirlerarası', value: 'Uzun güzergâhta mola noktası ve sabitleme kontrolü burada planlanıyor.' },
      { label: 'İlçe merkezi', value: 'Toplu yerleşim; araç yanaşması sorunsuz.' },
    ],
    guzergahlar: [
      { to: 'Aziziye', note: 'Doğuya geçiş; Erzurum yönü, düz güzergâh.' },
      { to: 'Yakutiye', note: 'Erzurum merkezi; yol süresi planlanıyor.' },
      { to: 'Çat', note: 'Güneye geçiş; dağ yolu.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Başka bir ile taşınmak istiyorum, hizmet veriyor musunuz?', answer: 'Veriyoruz. Uzun güzergâhta mola ve sabitleme kontrolü önceden planlanıyor.' },
      { question: 'Uzun yolda eşyalarım zarar görür mü?', answer: 'Sabitleme doğru yapıldığında görmez; mobilyalar kayış ve takozla araca bağlanıyor.' },
      { question: 'Fiyata yol masrafı dahil mi?', answer: 'Dahil. Keşiften sonra verilen yazılı fiyat yol ve yakıt dahil toplam tutardır.' },
    ],
  },

  {
    ad: 'Hınıs',
    derinlik: 'orta',
    ozet: 'Hınıs’ta taşıma penceresi dar; yılın belirli aylarında planlamak hem güvenli hem uygun oluyor.',
    metaAciklama:
      'Hınıs evden eve nakliyat: uygun mevsim penceresinde planlanan taşıma, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Hınıs’ta taşımayı diğer ilçelerden ayıran şey takvimin darlığı. Dağlık konum ve uzun kış nedeniyle rahat çalışılabilen aylar sınırlı; bu pencereyi kaçırmamak hem güvenlik hem maliyet açısından fark yaratıyor. Taşınma planınız belliyse erken haber vermeniz, uygun bir güne yerleşmenizi sağlıyor.</p><p>Yapı ağırlıklı düşük katlı; merdiven ve asansör sorunu az. Hınıs’ta <strong>evden eve nakliyat</strong> işlerinde asıl planlama konusu bina değil, doğru aya denk gelmek oluyor.</p>`,
    kunye: [
      { label: 'Dar pencere', value: 'Rahat çalışılabilen aylar sınırlı; bu pencere planlamanın merkezinde.' },
      { label: 'Erken haber', value: 'Planı önceden bildirmek uygun bir güne yerleşmeyi sağlıyor.' },
      { label: 'Yapı', value: 'Ağırlıklı düşük katlı; merdiven ve asansör sorunu az.' },
    ],
    guzergahlar: [
      { to: 'Karaçoban', note: 'Doğuya geçiş; komşu ilçe.' },
      { to: 'Tekman', note: 'Batıya geçiş; dağ yolu.' },
      { to: 'Palandöken', note: 'Erzurum yönü; mevsime göre planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Ne zaman taşınmalıyım?', answer: 'Rahat çalışılabilen aylar sınırlı; planınız belliyse erken haber vermeniz uygun bir güne yerleşmenizi sağlıyor.' },
      { question: 'Kış ortasında taşıma yapılabilir mi?', answer: 'Koşullara bağlı. Yolu ve havayı değerlendirip birlikte karar veriyoruz; güvenli değilse zorlamıyoruz.' },
      { question: 'Erzurum merkezine taşınma tek günde biter mi?', answer: 'Uygun mevsimde biter; iş sabah erken başlatılıyor.' },
    ],
  },
]

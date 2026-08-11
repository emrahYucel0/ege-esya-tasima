// prisma/ilce-verileri/bursa.mjs
//
// Bursa'nın 17 ilçesinden 13'ü. Dördü BİLEREK ATLANDI.
//
// ATLANANLAR: Orhaneli, Keles, Büyükorhan, Harmancık
//   Dördü de dağlık kesimde, küçük nüfuslu ve nakliyat aramasında karşılığı
//   yok denecek kadar az. Ayrıca yazacak doğrulanabilir bilgi yok; içerik
//   ya ince ya uydurma olurdu. Gerekirse sonradan eklenebilirler.
//
// DERİNLİK: 'tam' (6) → 3 paragraf, 4 SSS, 4-5 künye, 4 güzergâh, mahalle
//           'orta' (7) → 2 paragraf, 3 SSS, 3 künye, 3 güzergâh
//
// Kurallar dosya başlarında ortak: uydurma mahalle/rakam yok, her metin
// farklı bir eksenden, "evden eve nakliyat" sayfa başına tam bir kez.
// (bkz. prisma/ilce-verileri/izmir.mjs başlığındaki ayrıntılı gerekçe)

export const il = { ad: 'Bursa', plaka: 16 }

export const ilceler = [
  // ───────────────────────── TAM DERİNLİK (6) ─────────────────────────
  {
    ad: 'Osmangazi',
    derinlik: 'tam',
    ozet:
      'Bursa’nın tarihi çekirdeğini taşıyan Osmangazi’de taşıma planı, sokağın aracı kaldırıp kaldırmadığıyla başlıyor.',
    metaAciklama:
      'Osmangazi evden eve nakliyat: dar sokaklara uygun araç planı, sigortalı taşıma ve yazılı sabit fiyat. Ücretsiz keşif.',
    govde: `<p>Osmangazi, Bursa’nın hem tarihi merkezini hem de en yoğun konut dokusunu barındırıyor. Hisar ve çevresindeki eski mahallelerde sokaklar dar, bazı noktalarda araç hiç giremiyor; buralarda yükü girebildiğimiz en yakın noktaya kadar getirip kalan mesafeyi ekiple taşıyoruz. Keşifte ölçtüğümüz ilk şey bu mesafe oluyor.</p><p>İlçenin Uludağ eteklerine doğru uzanan kesiminde ise eğim devreye giriyor. Çekirge yönündeki bazı sokaklarda büyük araçla manevra yapmak mümkün olmuyor. Buna karşılık Demirtaş ve Panayır tarafındaki yeni bloklarda yük asansörü ve otopark var, iş öngörülebilir ilerliyor. Osmangazi’de <strong>evden eve nakliyat</strong> teklifi verirken adresin hangi dokuda olduğunu bilmek şart.</p><p>Şehir merkezindeki trafik de plana giriyor. İşleri sabah erken başlatıyor, gün ortası yoğunluğundan önce yüklemeyi bitirmeyi hedefliyoruz.</p>`,
    kunye: [
      { label: 'Tarihi doku', value: 'Hisar çevresinde sokaklar dar; bazı adreslere araç giremiyor.' },
      { label: 'Eğim', value: 'Uludağ eteklerine doğru manevra alanı daralıyor.' },
      { label: 'Yeni yapı', value: 'Demirtaş ve Panayır tarafında yük asansörü ve otopark bulunuyor.' },
      { label: 'Trafik', value: 'Merkez gün ortası yoğun; iş sabah erken başlatılıyor.' },
      { label: 'Elle taşıma', value: 'Araç yanaşamayan adreslerde mesafe keşifte ölçülüp fiyata ekleniyor.' },
    ],
    guzergahlar: [
      { to: 'Nilüfer', note: 'Batı aksı; düz güzergâh, iş tek günde tamamlanıyor.' },
      { to: 'Yıldırım', note: 'Komşu ilçe; varış tarafında dar sokak planlaması yapılıyor.' },
      { to: 'Gemlik', note: 'Kuzeybatı aksı; yol süresi plana dahil ediliyor.' },
      { to: 'Mudanya', note: 'Sahile iniş; sezonda gün planlaması erken yapılıyor.' },
    ],
    mahalleler: ['Çekirge', 'Altıparmak', 'Soğanlı', 'Demirtaş', 'Panayır', 'Hisar', 'Santral Garaj'],
    sorular: [
      {
        question: 'Sokağımıza kamyon giremiyor, ne yapıyorsunuz?',
        answer:
          'Yükü girebildiğimiz en yakın noktaya kadar küçük araçla getirip kalan mesafeyi ekiple taşıyoruz. Mesafe keşifte ölçülüyor ve fiyata baştan dahil ediliyor.',
      },
      {
        question: 'Eğimli sokakta yükleme sorun olur mu?',
        answer:
          'Süreyi uzatıyor ama engel değil. Ekip sayısını artırıyor, ağır parçalarda kayış ve taşıma askısı kullanıyoruz.',
      },
      {
        question: 'Asansörsüz binadan taşıma yapılıyor mu?',
        answer:
          'Yapılıyor. Yüksek katlarda dış cephe asansörü kuruyoruz; ihtiyaç keşifte belirlenip fiyata dahil ediliyor.',
      },
      {
        question: 'Verilen fiyat sonradan değişir mi?',
        answer:
          'Değişmiyor. Keşif sonrası verilen yazılı fiyat taşıma gününe kadar geçerli kalıyor.',
      },
    ],
  },

  {
    ad: 'Nilüfer',
    derinlik: 'tam',
    ozet:
      'Planlı yapısı ve geniş bulvarlarıyla Nilüfer, Bursa’da taşımanın en öngörülebilir ilerlediği ilçe.',
    metaAciklama:
      'Nilüfer evden eve nakliyat: site izni önceden alınmış, sigortalı ve yazılı sabit fiyatlı taşıma. Ücretsiz keşif için arayın.',
    govde: `<p>Nilüfer’de taşınma trafiğinin ritmini iki takvim belirliyor. Birincisi akademik takvim: Görükle çevresindeki üniversite nüfusu nedeniyle dönem başında ve sonunda küçük hacimli taşımalar yoğunlaşıyor, o haftalarda uygun gün bulmak zorlaşıyor. İkincisi sanayi takvimi: organize sanayi bölgesindeki işyeri taşımaları vardiya dışına ya da hafta sonuna planlanıyor.</p><p>Konut tarafında yerleşim büyük ölçüde planlı ve bu işi kolaylaştırıyor; bulvarlar geniş, blokların çoğunda yük asansörü var. Nilüfer’de <strong>evden eve nakliyat</strong> işlerinde süreyi uzatan şey bina değil, doğru güne denk gelmek oluyor.</p><p>Öğrenci taşımaları burada ayrı bir kalem. Tek oda ya da stüdyo hacmindeki işler için küçük araç ve az kişilik ekiple çalışıyor, fiyatı buna göre veriyoruz.</p>`,
    kunye: [
      { label: 'Akademik takvim', value: 'Görükle çevresinde dönem başı ve sonunda küçük taşımalar yoğunlaşıyor.' },
      { label: 'Sanayi takvimi', value: 'Organize sanayide işler vardiya dışına ya da hafta sonuna planlanıyor.' },
      { label: 'Öğrenci taşıması', value: 'Tek oda ve stüdyo işleri küçük araç ve az kişilik ekiple yapılıyor.' },
      { label: 'Planlı yerleşim', value: 'Geniş bulvarlar ve yük asansörlü bloklar; bina kaynaklı zorluk az.' },
    ],
    guzergahlar: [
      { to: 'Osmangazi', note: 'Doğuya geçiş; düz güzergâh, iş tek günde bitiyor.' },
      { to: 'Karacabey', note: 'Batı aksı; yol süresi planlanıyor.' },
      { to: 'Mudanya', note: 'Kuzeye iniş; sezonda gün planlaması erken yapılıyor.' },
      { to: 'Yıldırım', note: 'Doğuya devam; varışta dar sokak planlaması yapılıyor.' },
    ],
    mahalleler: ['Görükle', 'Özlüce', 'Beşevler', 'İhsaniye', 'Ataevler', 'Odunluk', 'Çalı'],
    sorular: [
      {
        question: 'Dönem başında yer bulabilir miyim?',
        answer:
          'Bulabilirsiniz ama o haftalar hızlı doluyor. Bir hafta önceden haber vermeniz gün seçmenizi sağlıyor.',
      },
      {
        question: 'Sanayideki işyerimizi hafta sonu taşıtabilir miyiz?',
        answer:
          'Taşıtabilirsiniz. Üretimin durmaması için işleri vardiya dışına ya da hafta sonuna planlıyoruz.',
      },
      {
        question: 'Öğrenci eviyim, az eşyam var. Küçük iş yapıyor musunuz?',
        answer:
          'Yapıyoruz. Küçük hacimli taşımalar için uygun ölçüde araç ve az kişilik ekip planlıyoruz; bu işler genellikle yarım günde bitiyor.',
      },
      {
        question: 'Mobilya söküm ve montajı dahil mi?',
        answer:
          'Marangozlu söküm ve montaj hizmetimiz var; talep ederseniz teklife dahil ediliyor ve mobilyalar yeni adreste kurulmuş teslim ediliyor.',
      },
    ],
  },

  {
    ad: 'Yıldırım',
    derinlik: 'tam',
    ozet:
      'Yoğun ve sıkışık yapı dokusuyla Yıldırım’da taşımanın hızını sokak genişliği ve merdiven ölçüsü belirliyor.',
    metaAciklama:
      'Yıldırım evden eve nakliyat: dar sokaklara uygun araç ve ekip planı, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Yıldırım’ı diğer merkez ilçelerden ayıran şey, konut dokusunun içine karışmış küçük atölyeler. Aynı sokakta bir apartman dairesiyle bir dikimhane yan yana olabiliyor; bu da taşıma taleplerinin bir bölümünü ev ile işyeri arasında bir yere koyuyor. Makine, tezgâh ve top kumaş gibi parçalar standart mobilyadan farklı sabitleme istiyor, keşifte ayrıca not ediyoruz.</p><p>Konut tarafında yapı stoğu ağırlıklı orta katlı ve bir kısmında asansör yok. Yıldırım’da <strong>evden eve nakliyat</strong> teklifi verirken kat sayısıyla birlikte merdiven ölçüsünü alıyoruz; gardırobun dönüp dönmediğini belirleyen şey bu.</p><p>İlçe Uludağ’a doğru yükseldikçe sokaklar dikleşiyor. Bu adreslerde büyük araçla çıkmak yerine cadde başında aktarma yapıyoruz.</p>`,
    kunye: [
      { label: 'Karma doku', value: 'Konut arasına karışmış küçük atölyeler; ev ve işyeri taşıması iç içe.' },
      { label: 'Özel parçalar', value: 'Makine, tezgâh ve top kumaş standart mobilyadan farklı sabitleme istiyor.' },
      { label: 'Merdiven ölçüsü', value: 'Kat sayısı kadar merdiven genişliği de teklife giriyor.' },
      { label: 'Yükselen sokaklar', value: 'Uludağ yönünde dikleşen sokaklarda cadde başında aktarma yapılıyor.' },
    ],
    guzergahlar: [
      { to: 'Osmangazi', note: 'Komşu ilçe; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Gürsu', note: 'Doğuya geçiş; düz güzergâh.' },
      { to: 'Kestel', note: 'Doğuya devam; yol süresi planlanıyor.' },
      { to: 'Nilüfer', note: 'Batıya geçiş; varışta site izni önceden alınıyor.' },
    ],
    mahalleler: ['Duaçınarı', 'Değirmenönü', 'Arabayatağı', 'Esenevler', 'Millet', 'Yeşilyayla'],
    sorular: [
      {
        question: 'Evimle birlikte küçük atölyemi de taşıtabilir miyim?',
        answer:
          'Taşıtabilirsiniz. Makine ve tezgâh için ayrı sabitleme uyguluyoruz; iki taşımayı tek günde planlayıp tek teklifte veriyoruz.',
      },
      {
        question: 'Dikiş makinesi gibi hassas ekipman nasıl taşınıyor?',
        answer:
          'Hareketli parçaları sabitlenip battaniyeyle sarılıyor, araçta kayışla bağlanıyor ve üstüne yük konmuyor.',
      },
      {
        question: 'Yıldırım içinde taşınıyorum, fiyat düşer mi?',
        answer:
          'Düşer. Yol süresi olmadığı için ilçe içi taşımalar daha uygun ve çoğu yarım günde bitiyor.',
      },
      {
        question: 'Ambalaj malzemesini siz mi getiriyorsunuz?',
        answer:
          'Evet. Koli, balonlu naylon, streç ve mobilya battaniyesi ekiple birlikte geliyor.',
      },
    ],
  },

  {
    ad: 'Gemlik',
    derinlik: 'tam',
    ozet:
      'Liman ve sanayi hattıyla sahil yerleşiminin bir arada olduğu Gemlik’te konut ve ticari taşımalar ayrı planlanıyor.',
    metaAciklama:
      'Gemlik evden eve nakliyat ve işyeri taşıma: sigortalı, planlı ve yazılı sabit fiyatlı hizmet. Ücretsiz keşif için arayın.',
    govde: `<p>Gemlik’te iki tür taşıma talebi yan yana duruyor. Liman ve sanayi hattındaki işyeri, depo ve atölye taşımalarında raf sökümü, makine sabitlemesi ve ağır parça taşıma devreye giriyor; bunlar konut işinden ayrı ekipman ve ekip gerektiriyor. İki hizmeti ayrı planlıyor, ayrı fiyatlandırıyoruz.</p><p>Konut tarafında yerleşim ağırlıklı olarak sahil hattı boyunca uzanıyor. İlçe merkezindeki sokaklar araç geçişine uygun, binaların çoğu orta katlı. Gemlik’te <strong>evden eve nakliyat</strong> işlerinde erişim genellikle sorun çıkarmıyor; süreyi belirleyen şey eşya hacmi oluyor.</p><p>Kumla yönündeki yazlık yerleşimde mevsimlik hareketlilik var. Bu adreslerde eşyanın bir bölümünün depolanması sık talep ediliyor ve aynı teklifin içinde çözülüyor.</p>`,
    kunye: [
      { label: 'İki talep tipi', value: 'Liman ve sanayide işyeri taşıması, sahilde konut taşıması.' },
      { label: 'Ağır ekipman', value: 'Ticari adreslerde taşıma kızağı, kayış ve sabitleme ekipmanı kullanılıyor.' },
      { label: 'Konut erişimi', value: 'İlçe merkezinde sokaklar araç geçişine uygun; yükleme sorunsuz.' },
      { label: 'Yazlık hattı', value: 'Kumla yönünde mevsimlik kullanım var; depolama sık talep ediliyor.' },
    ],
    guzergahlar: [
      { to: 'Orhangazi', note: 'Kuzeydoğu aksı; düzenli güzergâh.' },
      { to: 'Mudanya', note: 'Batıya geçiş; sahil yolu, iş tek günde bitiyor.' },
      { to: 'Osmangazi', note: 'Bursa merkezi; yol süresi plana dahil ediliyor.' },
      { to: 'İznik', note: 'Doğuya geçiş; yol süresi hesaba katılıyor.' },
    ],
    mahalleler: ['Umurbey', 'Küçükkumla', 'Büyükkumla', 'Hamidiye', 'Osmaniye'],
    sorular: [
      {
        question: 'Depomu ya da atölyemi taşıtabilir miyim?',
        answer:
          'Taşıtabilirsiniz. Raf sistemleri sökülüp numaralanıyor, ağır parçalar için taşıma kızağı ve kayış kullanılıyor.',
      },
      {
        question: 'Yazlığımdaki eşyaları depolayabilir misiniz?',
        answer:
          'Depolayabiliriz. Taşınacak ve depolanacak eşyayı keşifte birlikte ayırıyoruz; ikisi tek teklifte yer alıyor.',
      },
      {
        question: 'Bursa merkezine taşınma tek günde biter mi?',
        answer:
          'Genellikle biter. Yol süresi plana ekleniyor ve iş sabah erken başlatılıyor.',
      },
      {
        question: 'Beyaz eşya sökümü dahil mi?',
        answer:
          'Dahil. Çamaşır makinesi tamburu sabitleniyor, buzdolabı taşımaya hazırlanıyor ve yeni adreste bağlantıları kuruluyor.',
      },
    ],
  },

  {
    ad: 'İnegöl',
    derinlik: 'tam',
    ozet:
      'Mobilya üretiminin merkezi olan İnegöl’de taşımaların önemli bölümü ticari; ev taşımalarında da montaj beklentisi yüksek.',
    metaAciklama:
      'İnegöl evden eve nakliyat: marangozlu söküm-montaj, işyeri taşıma, sigortalı ambalaj ve yazılı sabit fiyat.',
    govde: `<p>İnegöl’ün mobilya üretimindeki ağırlığı taşıma profilini de belirliyor. Atölye, showroom ve depo taşımaları burada konut işleri kadar yaygın; bu işlerde raf sökümü, tezgâh taşıma ve ağır makine sabitlemesi devreye giriyor. Ticari taşımaları konut işinden ayrı planlıyor ve ayrı fiyatlandırıyoruz.</p><p>Konut tarafında da bir fark var: mobilyanın şehrin işi olduğu bir yerde söküm ve montaj beklentisi doğal olarak yüksek. İnegöl’de <strong>evden eve nakliyat</strong> taleplerinin büyük bölümünde marangozlu hizmet isteniyor; marangozu ekiple birlikte gönderiyor, mobilyaları yeni adreste kurulmuş hâlde teslim ediyoruz.</p><p>İlçenin Bursa merkezine mesafesi de plana giriyor. Merkez ilçelere yapılan taşımalarda yol süresi hesaba katılıyor ve iş erken başlatılıyor.</p>`,
    kunye: [
      { label: 'Mobilya sanayii', value: 'Atölye, showroom ve depo taşımaları konut işleri kadar yaygın.' },
      { label: 'Ticari ekipman', value: 'Raf sökümü, tezgâh taşıma ve makine sabitlemesi ayrı planlanıyor.' },
      { label: 'Montaj beklentisi', value: 'Konut taşımalarında da marangozlu söküm-montaj sık talep ediliyor.' },
      { label: 'Merkeze mesafe', value: 'Bursa merkezine yol süresi plana ekleniyor; iş erken başlatılıyor.' },
    ],
    guzergahlar: [
      { to: 'Yenişehir', note: 'Kuzeye geçiş; düzenli güzergâh.' },
      { to: 'Kestel', note: 'Bursa yönü; yol süresi planlanıyor.' },
      { to: 'Osmangazi', note: 'Bursa merkezi; erken başlangıç gerekiyor.' },
      { to: 'Yıldırım', note: 'Bursa yönü; varışta dar sokak planlaması yapılıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Mobilya atölyemi taşıtabilir miyim?',
        answer:
          'Taşıtabilirsiniz. Tezgâh ve makineler için özel sabitleme, raf sistemleri için söküm-numaralama yapıyoruz; keşif ticari adrese özel.',
      },
      {
        question: 'Mobilyalarım yeni adreste kurulacak mı?',
        answer:
          'Marangozlu montaj hizmetiyle evet. Mobilyalar sökülüp taşınıyor ve yeni adreste kurulmuş hâlde teslim ediliyor.',
      },
      {
        question: 'İşyeri taşıması üretimi durdurur mu?',
        answer:
          'Durdurmamak için işleri çoğunlukla hafta sonuna ya da vardiya dışına planlıyoruz.',
      },
      {
        question: 'Bursa merkezine taşınma ne kadar sürer?',
        answer:
          'Yol süresi plana ekleniyor; işlerin büyük çoğunluğu tek günde tamamlanıyor.',
      },
    ],
  },

  {
    ad: 'Mudanya',
    derinlik: 'tam',
    ozet:
      'Sahil hattı ve tarihi Tirilye dokusuyla Mudanya’da hem araç ölçüsü hem mevsim taşıma planını etkiliyor.',
    metaAciklama:
      'Mudanya evden eve nakliyat: dar sokak ve sezon yoğunluğuna göre planlanan taşıma, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Mudanya’da iki şey plana yön veriyor: sokak genişliği ve takvim. Tirilye ve eski sahil yerleşimindeki sokakların bir bölümü dar; bu adreslere büyük araçla girmek mümkün olmuyor. Orta ölçekli araç kullanıyor ya da yükü sokak girişinde aktarıyoruz. Elle taşınacak mesafe keşifte ölçülüp fiyata baştan ekleniyor.</p><p>Yaz aylarında sahil hattındaki hareketlilik artıyor; hem trafik hem araç ve ekip talebi yükseliyor. Mudanya’da <strong>evden eve nakliyat</strong> tarihini sezon dışına alabiliyorsanız hem süre hem maliyet belirgin şekilde düşüyor.</p><p>Yerleşimin bir bölümü ikinci konut olarak kullanılıyor. Bu taşımalarda eşyanın bir kısmının depolanması sık talep ediliyor ve aynı teklifin içinde planlanıyor.</p>`,
    kunye: [
      { label: 'Dar sokaklar', value: 'Tirilye ve eski sahil yerleşiminde büyük araç giremiyor; aktarma planlanıyor.' },
      { label: 'Sezon', value: 'Yaz aylarında talep ve trafik artıyor; sezon dışı hem hızlı hem uygun.' },
      { label: 'İkinci konut', value: 'Mevsimlik kullanım yaygın; depolama sık talep ediliyor.' },
      { label: 'Bursa bağlantısı', value: 'Merkeze düzenli yol; işler çoğunlukla tek günde tamamlanıyor.' },
    ],
    guzergahlar: [
      { to: 'Nilüfer', note: 'Bursa yönü; düz güzergâh, iş tek günde bitiyor.' },
      { to: 'Osmangazi', note: 'Bursa merkezi; yol süresi plana dahil ediliyor.' },
      { to: 'Gemlik', note: 'Doğuya geçiş; sahil yolu.' },
      { to: 'Karacabey', note: 'Batıya geçiş; yol süresi planlanıyor.' },
    ],
    mahalleler: ['Tirilye', 'Güzelyalı', 'Kumyaka', 'Çağrışan', 'Halitpaşa'],
    sorular: [
      {
        question: 'Tirilye’de sokağımıza araç giremiyor, çözüm var mı?',
        answer:
          'Var. Orta ölçekli araç kullanıyor ya da yükü sokak girişinde aktarıyoruz; mesafe keşifte ölçülüp fiyata dahil ediliyor.',
      },
      {
        question: 'Yaz sezonunda taşınabilir miyim?',
        answer:
          'Taşınabilirsiniz ama erken planlamak gerekiyor; sezonda uygun gün hızlı doluyor.',
      },
      {
        question: 'Eşyalarımın bir kısmını depoda tutabilir miyim?',
        answer:
          'Tutabilirsiniz. Taşınacak ve depolanacak eşyayı keşifte birlikte ayırıyoruz.',
      },
      {
        question: 'Bursa merkezine taşınma ne kadar sürer?',
        answer:
          'Düzenli yol sayesinde işlerin çoğu tek günde tamamlanıyor.',
      },
    ],
  },

  // ───────────────────────── ORTA DERİNLİK (7) ─────────────────────────
  {
    ad: 'Gürsu',
    derinlik: 'orta',
    ozet: 'Bursa merkezine komşu ve hızla büyüyen Gürsu’da taşımaların çoğu kısa mesafeli oluyor.',
    metaAciklama:
      'Gürsu evden eve nakliyat: kısa mesafeli hızlı taşıma, sigortalı ambalaj ve yazılı sabit fiyat. Ücretsiz keşif.',
    govde: `<p>Gürsu, Bursa merkezine komşu olduğu için buradan yapılan taşımaların büyük bölümü kısa mesafeli. Yıldırım ve Kestel yönündeki işler çoğunlukla yarım günde tamamlanıyor; yol süresi neredeyse hiç hesaba girmiyor.</p><p>Yerleşim son yıllarda hızla yenilendi; yeni bloklarda asansör ve otopark bulunuyor, araç bina önüne yanaşabiliyor. Gürsu’da <strong>evden eve nakliyat</strong> işlerinde süreyi belirleyen şey erişim değil, eşya hacmi oluyor.</p>`,
    kunye: [
      { label: 'Merkeze yakınlık', value: 'Bursa merkezine komşu; taşımaların çoğu kısa mesafeli.' },
      { label: 'Yeni yapı', value: 'Yeni bloklarda asansör ve otopark var; araç yanaşması sorunsuz.' },
      { label: 'Süre', value: 'Yıldırım ve Kestel yönündeki işler çoğunlukla yarım günde bitiyor.' },
    ],
    guzergahlar: [
      { to: 'Kestel', note: 'Komşu ilçe; kısa mesafe, iş yarım günde bitiyor.' },
      { to: 'Yıldırım', note: 'Bursa yönü; varışta dar sokak planlaması yapılıyor.' },
      { to: 'Osmangazi', note: 'Bursa merkezi; iş tek günde tamamlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Bursa merkezine taşınma ne kadar sürer?',
        answer: 'Mesafe kısa olduğu için işlerin neredeyse tamamı tek günde, çoğu yarım günde tamamlanıyor.',
      },
      {
        question: 'Asansör kullanımı için izin gerekiyor mu?',
        answer: 'Bazı bloklarda gerekiyor; izni ve saati biz yönetimle görüşerek ayarlıyoruz.',
      },
      {
        question: 'Keşif ücretli mi?',
        answer: 'Keşif ücretsiz. Ekibimiz adrese gelip eşyayı gördükten sonra yazılı sabit fiyat veriyor.',
      },
    ],
  },

  {
    ad: 'Kestel',
    derinlik: 'orta',
    ozet: 'Bursa’nın doğu kapısı Kestel, hem şehir içi hem şehirlerarası taşımaların geçiş noktasında duruyor.',
    metaAciklama:
      'Kestel evden eve nakliyat: şehir içi ve şehirlerarası taşımalarda planlı güzergâh, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Kestel, Bursa’nın doğu çıkışında, Uludağ’ın eteklerinin şehirden ayrıldığı noktada yer alıyor. Bu konum ilçeyi bir geçiş noktası hâline getiriyor: hem Bursa içine yapılan kısa taşımalar hem İnegöl ve Ankara yönüne giden uzun güzergâhlar buradan başlıyor. İki iş tipini ayrı planlıyoruz — kısa taşımalarda tek araç yeterken uzun güzergâhta sabitleme ve mola planı devreye giriyor.</p><p>Yerleşim son yıllarda yenilendi; yeni bloklarda asansör ve otopark bulunuyor. Yamaca doğru çıkan kesimlerde ise eğim artıyor ve sokaklar daralıyor. Kestel’de <strong>evden eve nakliyat</strong> teklifi verirken adresin ovada mı yamaçta mı olduğunu not ediyoruz.</p>`,
    kunye: [
      { label: 'Geçiş noktası', value: 'Bursa’nın doğu çıkışı; kısa şehir içi ve uzun şehirlerarası işler birlikte.' },
      { label: 'Eğim farkı', value: 'Ovada erişim rahat, yamaca doğru sokaklar daralıyor.' },
      { label: 'Uzun güzergâh', value: 'İnegöl ve Ankara yönünde sabitleme ve mola planı devreye giriyor.' },
    ],
    guzergahlar: [
      { to: 'Gürsu', note: 'Komşu ilçe; kısa mesafe, iş yarım günde bitiyor.' },
      { to: 'Yıldırım', note: 'Bursa yönü; düz güzergâh.' },
      { to: 'İnegöl', note: 'Güneydoğu aksı; yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Ankara yönüne şehirlerarası taşıma yapıyor musunuz?',
        answer:
          'Yapıyoruz. Uzun güzergâhta mobilyalar kayış ve takozla sabitleniyor, mola noktaları önceden planlanıyor.',
      },
      {
        question: 'Yamaçtaki adresime araç çıkabilir mi?',
        answer:
          'Çoğu adrese çıkıyor. Sokağı keşifte görüp uygun ölçüde araç seçiyor, gerekirse cadde başında aktarma yapıyoruz.',
      },
      {
        question: 'Bursa merkezine taşınma ne kadar sürer?',
        answer: 'Mesafe kısa; işlerin çoğu tek günde, ilçe içi taşımalar yarım günde tamamlanıyor.',
      },
    ],
  },

  {
    ad: 'Mustafakemalpaşa',
    derinlik: 'orta',
    ozet: 'Bursa’nın batısındaki Mustafakemalpaşa’da taşıma planı merkeze mesafe üzerine kuruluyor.',
    metaAciklama:
      'Mustafakemalpaşa evden eve nakliyat: uzun mesafeye göre planlanmış taşıma, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Mustafakemalpaşa, Bursa’nın batı sınırında yer alıyor ve buradan yapılan taşımaların bir bölümü Bursa’ya değil Balıkesir yönüne gidiyor. Bu, ilçeyi iki ayrı güzergâhın kesiştiği bir yer hâline getiriyor; hangi yöne gidileceği aracın ve ekibin gün planını baştan değiştiriyor.</p><p>İlçe geniş bir alana yayılmış ve köyler birbirinden uzak. Mustafakemalpaşa’da <strong>evden eve nakliyat</strong> planlarken güzergâhı önceden çıkarıyoruz; aksi hâlde tek günlük bir iş kolayca ikinci güne sarkıyor.</p>`,
    kunye: [
      { label: 'İki yön', value: 'Taşımaların bir bölümü Bursa’ya, bir bölümü Balıkesir yönüne gidiyor.' },
      { label: 'Yayılım', value: 'Köyler birbirinden uzak; güzergâh önceden çıkarılıyor.' },
      { label: 'Gün planı', value: 'Yön kararı araç ve ekip planını baştan değiştiriyor.' },
    ],
    guzergahlar: [
      { to: 'Karacabey', note: 'Kuzeye geçiş; düzenli güzergâh.' },
      { to: 'Nilüfer', note: 'Bursa yönü; erken başlangıç gerekiyor.' },
      { to: 'Osmangazi', note: 'Bursa merkezi; yol süresi plana dahil ediliyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Bursa merkezine taşınma kaç gün sürer?',
        answer: 'Genellikle tek gün. Mesafe nedeniyle iş sabah erken başlatılıyor.',
      },
      {
        question: 'Kırsal adrese araç gelebiliyor mu?',
        answer: 'Yol durumuna göre değişiyor; keşifte değerlendirip uygun ölçüde araç seçiyoruz.',
      },
      {
        question: 'Fiyata yol masrafı dahil mi?',
        answer: 'Dahil. Keşiften sonra verilen yazılı fiyat yol ve yakıt dahil toplam tutardır.',
      },
    ],
  },

  {
    ad: 'Karacabey',
    derinlik: 'orta',
    ozet: 'Ova üzerindeki konumuyla Karacabey’de güzergâh düz; planı belirleyen şey mesafe oluyor.',
    metaAciklama:
      'Karacabey evden eve nakliyat: ova güzergâhına ve mesafeye göre planlanan taşıma, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Karacabey ova üzerinde yer alıyor; güzergâh düz ve ağır araç için engel yok, bu da süreyi öngörülebilir kılıyor. Buna karşılık Bursa merkezine mesafe hesaba giriyor ve iş sabah erken başlatılıyor.</p><p>İlçe merkezinde sokaklar geniş, araç bina önüne yanaşabiliyor. Kırsal mahallelerde ise müstakil evler yaygın; bahçe ve depo eşyası hacmi artırıyor. Karacabey’de <strong>evden eve nakliyat</strong> teklifi verirken evin eklentilerini de hesaba katıyoruz.</p>`,
    kunye: [
      { label: 'Güzergâh', value: 'Ova üzerinden düz yol; süre öngörülebilir.' },
      { label: 'İlçe merkezi', value: 'Sokaklar geniş, araç bina önüne yanaşabiliyor.' },
      { label: 'Kırsal hacim', value: 'Müstakil evlerde bahçe ve depo eşyası hacmi artırıyor.' },
    ],
    guzergahlar: [
      { to: 'Mustafakemalpaşa', note: 'Güneye geçiş; düzenli güzergâh.' },
      { to: 'Mudanya', note: 'Doğuya geçiş; yol süresi planlanıyor.' },
      { to: 'Nilüfer', note: 'Bursa yönü; iş tek günde tamamlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Bahçe ve depo eşyası hacme dahil mi?',
        answer: 'Dahil. Toplam hacmi artırdığı için keşifte gösterilmesi gerekiyor.',
      },
      {
        question: 'Bursa merkezine taşınma tek günde biter mi?',
        answer: 'Biter. Yol düz olduğu için süre öngörülebilir; iş sabah erken başlatılıyor.',
      },
      {
        question: 'Şehirlerarası taşıma yapıyor musunuz?',
        answer: 'Yapıyoruz. Karacabey’den Türkiye’nin her iline taşıma düzenliyoruz.',
      },
    ],
  },

  {
    ad: 'Orhangazi',
    derinlik: 'orta',
    ozet: 'Bursa ile İznik gölü arasındaki konumuyla Orhangazi’de taşımalar iki yöne birden yapılıyor.',
    metaAciklama:
      'Orhangazi evden eve nakliyat: sigortalı ambalaj, planlı güzergâh ve yazılı sabit fiyat. Ücretsiz keşif için arayın.',
    govde: `<p>Orhangazi, Bursa ile İznik arasındaki hat üzerinde yer alıyor; taşımalar hem Bursa merkezine hem göl çevresine doğru yapılıyor. Güzergâhlar düzenli ve süre öngörülebilir; işler çoğunlukla tek günde tamamlanıyor.</p><p>Yerleşim ilçe merkezinde toplu, kırsal mahallelerde ise müstakil ve bahçeli evler yaygın. Orhangazi’de <strong>evden eve nakliyat</strong> teklifi hazırlarken bahçe ve depo eşyasını da hacme dahil ediyoruz.</p>`,
    kunye: [
      { label: 'Konum', value: 'Bursa ile İznik arasında; taşımalar iki yöne birden yapılıyor.' },
      { label: 'Güzergâh', value: 'Düzenli yollar; süre öngörülebilir, işler tek günde bitiyor.' },
      { label: 'Kırsal hacim', value: 'Müstakil ve bahçeli evlerde ek eşya hacmi artırıyor.' },
    ],
    guzergahlar: [
      { to: 'Gemlik', note: 'Batıya geçiş; düzenli güzergâh.' },
      { to: 'İznik', note: 'Doğuya geçiş; göl çevresi yolu.' },
      { to: 'Osmangazi', note: 'Bursa merkezi; yol süresi plana dahil ediliyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Bursa merkezine taşınma tek günde biter mi?',
        answer: 'Biter. Güzergâh düzenli ve süre öngörülebilir.',
      },
      {
        question: 'Bahçe eşyaları taşınıyor mu?',
        answer: 'Taşınıyor ve hacme dahil ediliyor; keşifte göstermeniz önemli.',
      },
      {
        question: 'Eşyalarım sigortalı mı?',
        answer: 'Bütün taşımalar sigortalı ve kapsam sözleşmede yazılı oluyor.',
      },
    ],
  },

  {
    ad: 'İznik',
    derinlik: 'orta',
    ozet: 'Çini atölyeleri ve göl kıyısı yerleşimiyle İznik’te taşımanın öne çıkan konusu kırılacak eşya oluyor.',
    metaAciklama:
      'İznik evden eve nakliyat: kırılacak eşyada özel ambalaj, göl kıyısı adreslerde planlı taşıma, yazılı sabit fiyat.',
    govde: `<p>İznik’te taşımaya damgasını vuran şey çini geleneği. İlçedeki atölyeler ve ev koleksiyonları nedeniyle kırılacak eşya oranı diğer ilçelere göre belirgin şekilde yüksek. Bu parçaları tek tek balonlu naylona sarıp bölmeli kolilere yerleştiriyor, araçta ayrı ve sabit bir bölümde taşıyoruz; kolilerin üstüne başka yük konmuyor.</p><p>Göl kıyısındaki yerleşimde mevsimlik kullanım yaygın. Bu adreslerde eşyanın bir bölümünün depolanması sık talep ediliyor ve aynı teklifin içinde çözülüyor. İznik’te <strong>evden eve nakliyat</strong> planlarken hangi eşyanın taşınıp hangisinin depoda kalacağını keşifte birlikte ayırıyoruz.</p>`,
    kunye: [
      { label: 'Kırılacak eşya', value: 'Çini ve seramik yoğunluğu yüksek; bölmeli koli ve ayrı araç bölümü kullanılıyor.' },
      { label: 'İstifleme', value: 'Kırılacak kolilerin üstüne başka yük konmuyor, araçta sabitleniyor.' },
      { label: 'Göl kıyısı', value: 'Mevsimlik kullanım yaygın; depolama sık talep ediliyor.' },
    ],
    guzergahlar: [
      { to: 'Orhangazi', note: 'Batıya geçiş; göl çevresi yolu.' },
      { to: 'Yenişehir', note: 'Güneye geçiş; yol süresi planlanıyor.' },
      { to: 'Gemlik', note: 'Bursa yönü; iş tek günde tamamlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Çini ve porselen koleksiyonum var, nasıl taşınacak?',
        answer:
          'Her parça ayrı sarılıp bölmeli koliye yerleştiriliyor. Bu koliler araçta ayrı bir bölümde, sabitlenmiş hâlde ve üstüne yük konmadan taşınıyor.',
      },
      {
        question: 'Atölyemi taşıtabilir miyim?',
        answer:
          'Taşıtabilirsiniz. Fırın ve tezgâh için ayrı sabitleme, bitmiş ürünler için kırılacak eşya ambalajı uyguluyoruz.',
      },
      {
        question: 'Eşyalarımın bir kısmı depoda kalabilir mi?',
        answer: 'Kalabilir. Taşınacak ve depolanacak eşyayı keşifte birlikte ayırıyoruz.',
      },
    ],
  },

  {
    ad: 'Yenişehir',
    derinlik: 'orta',
    ozet: 'Ova üzerindeki Yenişehir’de güzergâh düz; planı belirleyen şey Bursa merkezine mesafe.',
    metaAciklama:
      'Yenişehir evden eve nakliyat: düz güzergâh ve mesafeye göre planlanan taşıma, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Yenişehir, Bursa’yı Bilecik ve Eskişehir yönüne bağlayan hat üzerinde. Bu konum ilçeden yapılan taşımaların önemli bir bölümünü il dışına yöneltiyor; şehirlerarası işlerde yol ve konaklama planı devreye giriyor, iş şehir içi bir taşımadan farklı kurgulanıyor.</p><p>İlçedeki havalimanı çevresinde lojistik hareketlilik var; depo ve işyeri taşımaları düzenli olarak talep ediliyor. Yenişehir’de <strong>evden eve nakliyat</strong> işleri ise ağırlıklı olarak ilçe merkezinde ve çevre köylerde gerçekleşiyor.</p>`,
    kunye: [
      { label: 'İl dışı bağlantı', value: 'Bilecik ve Eskişehir hattı; şehirlerarası iş oranı yüksek.' },
      { label: 'Lojistik hareketlilik', value: 'Havalimanı çevresinde depo ve işyeri taşıması düzenli talep ediliyor.' },
      { label: 'Konut işleri', value: 'Ağırlıklı olarak ilçe merkezi ve çevre köylerde gerçekleşiyor.' },
    ],
    guzergahlar: [
      { to: 'İnegöl', note: 'Güneye geçiş; düzenli güzergâh.' },
      { to: 'İznik', note: 'Kuzeye geçiş; yol süresi planlanıyor.' },
      { to: 'Kestel', note: 'Bursa yönü; iş tek günde tamamlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Bursa merkezine taşınma tek günde biter mi?',
        answer: 'Biter. Yol düz olduğu için süre öngörülebilir; iş sabah erken başlatılıyor.',
      },
      {
        question: 'Bahçe eşyaları hacme dahil mi?',
        answer: 'Dahil. Toplam hacmi artırdığı için keşifte gösterilmesi gerekiyor.',
      },
      {
        question: 'Keşif ücretli mi?',
        answer: 'Keşif ücretsiz. Eşyayı yerinde gördükten sonra yazılı sabit fiyat veriyoruz.',
      },
    ],
  },
]

// prisma/ilce-verileri/trabzon.mjs
//
// Trabzon'un 18 ilçesinden 7'si. ON BİRİ BİLEREK ATLANDI.
//
// ATLANANLAR: Sürmene, Beşikdüzü, Çaykara, Düzköy, Şalpazarı, Tonya,
//   Dernekpazarı, Hayrat, Köprübaşı, Çarşıbaşı, Araklı
//   Çoğu küçük nüfuslu ve aramada karşılığı düşük. Araklı ayrıca BİLEREK
//   çıkarıldı: yazacağım eksen (vadi + fındık) hem Of ile hem Samsun'un
//   Çarşamba'sıyla çakışacaktı; zorlama bir farklılık uydurmaktansa
//   ilçeyi listeden çıkardım.
//
// DERİNLİK: 'tam' (3) / 'orta' (4)
//
// SAMSUN'DAN AYRIŞMA
//   Karadeniz'de ikinci il bu. Samsun'da yağış (Canik) ve fındık
//   (Çarşamba) eksenleri kullanıldı; Trabzon'da ikisine de girilmiyor.
//   Buradaki eksenler tamamen topoğrafya üzerinden:
//     Ortahisar → MERDİVENLİ SOKAK; araç değil, basamak
//     Akçaabat  → sahil şeridi ile yamaç köyleri arasında iki ayrı iş
//     Of        → vadi boyunca tek yol; aracın geri dönecek yeri yok
//
// Ortak kurallar: uydurma mahalle/rakam yok, "evden eve nakliyat" sayfa
// başına tam bir kez. (bkz. izmir.mjs başlığındaki ayrıntılı gerekçe)

export const il = { ad: 'Trabzon', plaka: 61 }

export const ilceler = [
  // ───────────────────────── TAM DERİNLİK (3) ─────────────────────────
  {
    ad: 'Ortahisar',
    derinlik: 'tam',
    ozet:
      'Ortahisar’ın bazı sokakları araç yolu değil merdiven; o adreslerde eşya basamak basamak taşınıyor.',
    metaAciklama:
      'Ortahisar evden eve nakliyat: merdivenli sokaklara uygun ekip planı, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Trabzon merkezinde bazı sokaklar mecazi anlamda değil, gerçek anlamda merdiven. Yamaca kurulu mahallelerde araç yolu bitiyor ve devamı basamaklarla çıkıyor. Bu adreslerde araç en yakın cadde ağzında kalıyor, eşya basamak basamak taşınıyor. Kaç basamak olduğunu keşifte sayıyoruz — çünkü ekip sayısını ve süreyi doğrudan bu belirliyor, kat sayısı değil.</p><p>Basamaklı taşımada ağır parçalar tek kişiyle çıkmıyor; taşıma askısı ve kayış kullanıyor, ekibi büyütüyoruz. Ortahisar’da <strong>evden eve nakliyat</strong> teklifi verirken bu ek emeği fiyata baştan yazıyoruz; taşıma günü sürpriz çıkmıyor.</p><p>Sahile yakın ve düz kesimde koşullar normalleşiyor: yollar araç geçişine uygun, binalarda asansör bulunuyor ve iş standart bir merkez taşıması gibi ilerliyor. Aynı ilçede iki bambaşka düzen kuruyoruz.</p>`,
    kunye: [
      { label: 'Merdivenli sokak', value: 'Araç yolu bitiyor, devamı basamak; eşya basamak basamak taşınıyor.' },
      { label: 'Basamak sayımı', value: 'Keşifte basamak sayılıyor; ekip ve süreyi kat sayısı değil bu belirliyor.' },
      { label: 'Ekipman', value: 'Ağır parçalarda taşıma askısı ve kayış; ekip büyütülüyor.' },
      { label: 'Düz kesim', value: 'Sahile yakın hatta yollar uygun, binalarda asansör var.' },
    ],
    guzergahlar: [
      { to: 'Akçaabat', note: 'Batıya geçiş; sahil yolu, iş aynı gün bitiyor.' },
      { to: 'Yomra', note: 'Doğuya geçiş; sahil aksı.' },
      { to: 'Arsin', note: 'Doğuya devam; düz güzergâh.' },
      { to: 'Maçka', note: 'Güneye geçiş; dağ yolu, süre planlanıyor.' },
    ],
    mahalleler: ['Kalkınma', 'Çukurçayır', 'Yenicuma', 'Boztepe', 'Beşirli', 'Konaklar'],
    sorular: [
      {
        question: 'Sokağımız merdivenli, taşıma yapılabilir mi?',
        answer:
          'Yapılabilir. Araç cadde ağzında kalıyor, eşya basamaklardan taşınıyor. Keşifte basamak sayısını sayıp ekibi ona göre planlıyoruz.',
      },
      {
        question: 'Basamaklı taşıma fiyatı ne kadar etkiler?',
        answer:
          'Ek emek gerektirdiği için etkiliyor. Keşifte hesaplanıp yazılı fiyata baştan giriyor; taşıma günü sürpriz çıkmıyor.',
      },
      {
        question: 'Ağır mobilyalar basamaktan çıkar mı?',
        answer:
          'Taşıma askısı ve kayışla çıkıyor. Gerekirse marangozumuz parçayı yerinde söküp yeni adreste kuruyor.',
      },
      {
        question: 'Verilen fiyat sonradan değişir mi?',
        answer:
          'Değişmiyor. Keşif sonrası verilen yazılı fiyat taşıma gününe kadar geçerli kalıyor.',
      },
    ],
  },

  {
    ad: 'Akçaabat',
    derinlik: 'tam',
    ozet:
      'Akçaabat’ta sahil şeridi ile yamaç köyleri arasında iki ayrı taşıma düzeni gerekiyor.',
    metaAciklama:
      'Akçaabat evden eve nakliyat: sahil ve yamaç adreslerine ayrı planlama, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Akçaabat aslında iki ayrı yer. Sahil şeridinde yeni bloklar, geniş yol ve otopark var; iş burada öngörülebilir ilerliyor ve araç bina önüne yanaşabiliyor. Yamaca doğru çıkan köylerde ise yollar daralıyor, virajlanıyor ve büyük araç için uygun olmaktan çıkıyor. İki adres tipi için iki ayrı araç ve ekip planı kuruyoruz.</p><p>En sık karşılaştığımız iş de bu ikisi arasında oluyor: yamaçtaki köy evinden sahildeki daireye taşınma. Bu geçişte yükleme küçük araçla ve elle, boşaltma ise asansörle yapılıyor. Akçaabat’ta <strong>evden eve nakliyat</strong> planlarken süreyi iki ucun daha yavaş olanına göre hesaplıyoruz.</p><p>Köy evlerinde taşınacaklar listesi de daha uzun; depo, kiler ve bahçe eşyası hacme ekleniyor ve bunlar sahildeki dairede çoğu zaman yer bulmuyor. Neyin gideceğini keşifte birlikte belirliyoruz.</p>`,
    kunye: [
      { label: 'İki yerleşim', value: 'Sahilde yeni bloklar ve geniş yol, yamaçta dar ve virajlı köy yolları.' },
      { label: 'En sık iş', value: 'Yamaçtaki köy evinden sahildeki daireye geçiş.' },
      { label: 'Süre hesabı', value: 'İki ucun daha yavaş olanına göre yapılıyor.' },
      { label: 'Hacim uyuşmazlığı', value: 'Köy evinin depo ve bahçe eşyası dairede yer bulmuyor; keşifte ayrılıyor.' },
    ],
    guzergahlar: [
      { to: 'Ortahisar', note: 'Doğuya geçiş; sahil yolu, iş aynı gün bitiyor.' },
      { to: 'Vakfıkebir', note: 'Batıya geçiş; sahil aksı.' },
      { to: 'Maçka', note: 'Güneydoğu aksı; dağ yolu, süre planlanıyor.' },
      { to: 'Yomra', note: 'Doğuya devam; yol süresi hesaba katılıyor.' },
    ],
    mahalleler: ['Söğütlü', 'Darıca', 'Yıldızlı', 'Akçakale', 'Dürbinar'],
    sorular: [
      {
        question: 'Köyden sahildeki daireye taşınıyorum, eşyalarım sığar mı?',
        answer:
          'Çoğu zaman tamamı sığmıyor. Keşifte neyin gideceğini birlikte belirliyoruz; kalanı depolayabiliyoruz.',
      },
      {
        question: 'Yamaçtaki köye araç çıkabilir mi?',
        answer:
          'Yolu keşifte görüp uygun ölçüde araç seçiyoruz. Büyük araç çıkamıyorsa küçük araçla giriyor ya da aşağıda aktarıyoruz.',
      },
      {
        question: 'Taşıma ne kadar sürer?',
        answer:
          'Süreyi iki ucun daha yavaş olanı belirliyor. Yükleme elle, boşaltma asansörle olacaksa ekip sayısını buna göre artırıyoruz.',
      },
      {
        question: 'Depolama hizmetiniz var mı?',
        answer:
          'Var. Sığmayan eşyalar için süre ve teslim koşulları sözleşmede yazılı oluyor.',
      },
    ],
  },

  {
    ad: 'Of',
    derinlik: 'tam',
    ozet:
      'Of’ta yerleşim vadi boyunca tek yol üzerinde sıralanıyor; aracın geri dönecek yeri olmadığı için sıra önceden kuruluyor.',
    metaAciklama:
      'Of evden eve nakliyat: vadi yoluna göre planlanan yükleme sırası, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Of’ta yerleşimin önemli bir bölümü vadi içinde, dere boyunca uzanan tek bir yol üzerinde sıralanıyor. Bunun taşımada somut bir sonucu var: araç bir kez yukarı çıktığında geri dönecek yer bulamıyor. Bu yüzden yükleme sırasını önceden kuruyoruz — hangi adrese hangi sırayla girileceği, aracın nerede dönebileceği ve nerede duracağı taşımadan önce belli oluyor.</p><p>Vadi yolunda karşıdan gelen bir araçla karşılaşmak da süreyi uzatıyor; genişleme cepleri sınırlı. Of’ta <strong>evden eve nakliyat</strong> işlerini bu nedenle sabah erken saatlere alıyor, yol boşken çalışmayı tercih ediyoruz.</p><p>İlçe merkezindeki sahil kesiminde tablo değişiyor: yollar geniş, araç yanaşması ve yükleme sorunsuz ilerliyor.</p>`,
    kunye: [
      { label: 'Tek yol', value: 'Vadi boyunca tek güzergâh; araç yukarı çıkınca dönecek yer bulamıyor.' },
      { label: 'Sıra planı', value: 'Hangi adrese hangi sırayla girileceği taşımadan önce belirleniyor.' },
      { label: 'Karşılaşma', value: 'Genişleme cepleri sınırlı; iş sabah erken saatlere alınıyor.' },
      { label: 'Sahil kesimi', value: 'Merkezde yollar geniş; yanaşma ve yükleme sorunsuz.' },
    ],
    guzergahlar: [
      { to: 'Arsin', note: 'Batıya geçiş; sahil yolu.' },
      { to: 'Yomra', note: 'Batıya devam; Trabzon yönü.' },
      { to: 'Ortahisar', note: 'Trabzon merkezi; yol süresi planlanıyor.' },
      { to: 'Çaykara', note: 'Güneye geçiş; vadi yolu, süre uzuyor.' },
    ],
    mahalleler: ['Cumhuriyet', 'Solaklı', 'Kıyıcık', 'Bölümlü'],
    sorular: [
      {
        question: 'Vadideki evimize araç çıkabilir mi?',
        answer:
          'Çıkabiliyor ama dönüş yeri sınırlı. Bu yüzden sırayı ve duracağı noktayı taşımadan önce planlıyoruz.',
      },
      {
        question: 'Yolda karşıdan araç gelirse ne oluyor?',
        answer:
          'Genişleme cepleri sınırlı olduğu için süre uzuyor. İşi sabah erken saate alarak bu riski büyük ölçüde azaltıyoruz.',
      },
      {
        question: 'Trabzon merkezine taşınma tek günde biter mi?',
        answer:
          'Genellikle biter. Yol süresi plana ekleniyor ve iş erken başlatılıyor.',
      },
      {
        question: 'Eşyalarım sigortalı mı?',
        answer:
          'Bütün taşımalar sigortalı ve kapsam sözleşmede yazılı oluyor.',
      },
    ],
  },

  // ───────────────────────── ORTA DERİNLİK (4) ─────────────────────────
  {
    ad: 'Yomra',
    derinlik: 'orta',
    ozet: 'Havalimanına komşu Yomra’da yeni bloklar yaygın; taşıma öngörülebilir sürede tamamlanıyor.',
    metaAciklama:
      'Yomra evden eve nakliyat: yeni blok yerleşimine uygun hızlı taşıma, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Yomra, Trabzon merkezine ve havalimanına komşu. Sahil hattındaki yeni bloklarda yollar geniş, araç bina önüne yanaşabiliyor ve yük asansörü bulunuyor; bu, yükleme süresini kısaltıyor ve teklifi öngörülebilir kılıyor.</p><p>Merkeze yakınlık sayesinde Ortahisar yönündeki taşımalar kısa sürüyor. Yomra’da <strong>evden eve nakliyat</strong> işlerinde süreyi belirleyen şey erişim değil eşya hacmi oluyor.</p>`,
    kunye: [
      { label: 'Yeni bloklar', value: 'Geniş yol, yük asansörü; yükleme süresi kısa.' },
      { label: 'Merkeze yakınlık', value: 'Ortahisar yönündeki taşımalar kısa sürüyor.' },
      { label: 'Süre', value: 'Erişim rahat; süreyi eşya hacmi belirliyor.' },
    ],
    guzergahlar: [
      { to: 'Ortahisar', note: 'Batıya geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Arsin', note: 'Doğuya geçiş; sahil yolu.' },
      { to: 'Akçaabat', note: 'Batıya devam; yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Trabzon merkezine taşınma ne kadar sürer?', answer: 'Mesafe kısa; işlerin çoğu günübirlik tamamlanıyor.' },
      { question: 'Yük asansörü için izin gerekiyor mu?', answer: 'Bazı bloklarda gerekiyor; izni ve saati biz yönetimle ayarlıyoruz.' },
      { question: 'Keşif ücretli mi?', answer: 'Keşif ücretsiz. Eşyayı yerinde gördükten sonra yazılı sabit fiyat veriyoruz.' },
    ],
  },

  {
    ad: 'Arsin',
    derinlik: 'orta',
    ozet: 'Organize sanayinin bulunduğu Arsin’de işyeri taşımaları konut işlerinin yanında düzenli yer tutuyor.',
    metaAciklama:
      'Arsin evden eve nakliyat ve işyeri taşıma: sigortalı, planlı ve yazılı sabit fiyatlı hizmet.',
    govde: `<p>Arsin’de organize sanayi bölgesi taşıma taleplerinin bir bölümünü ticari hâle getiriyor. Raf sistemleri, depo malzemesi ve ağır ekipman için ayrı ekipman ve ekip planlıyor, işi vardiya dışına alıyoruz.</p><p>Konut tarafında sahil hattındaki yerleşim düzenli ve araç yanaşması sorunsuz. Arsin’de <strong>evden eve nakliyat</strong> işlerinde bina kaynaklı zorluk nadiren gündeme geliyor.</p>`,
    kunye: [
      { label: 'Organize sanayi', value: 'Raf, depo ve ağır ekipman taşımaları düzenli.' },
      { label: 'Vardiya dışı', value: 'Ticari işler vardiya dışına planlanıyor.' },
      { label: 'Konut erişimi', value: 'Sahil hattında yerleşim düzenli, yanaşma sorunsuz.' },
    ],
    guzergahlar: [
      { to: 'Yomra', note: 'Batıya geçiş; sahil yolu, iş aynı gün bitiyor.' },
      { to: 'Of', note: 'Doğuya geçiş; sahil aksı.' },
      { to: 'Ortahisar', note: 'Trabzon merkezi; yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Sanayideki işyerimizi taşıtabilir miyiz?', answer: 'Taşıtabilirsiniz. Raf ve ağır ekipman için ayrı sabitleme kullanıyoruz.' },
      { question: 'İşyeri taşıması üretimi durdurur mu?', answer: 'Durdurmamak için işleri vardiya dışına ya da hafta sonuna planlıyoruz.' },
      { question: 'Trabzon merkezine taşınma tek günde biter mi?', answer: 'Biter. Sahil yolu üzerinden güzergâh düz ve süre öngörülebilir.' },
    ],
  },

  {
    ad: 'Vakfıkebir',
    derinlik: 'orta',
    ozet: 'Pazar kurulduğu gün Vakfıkebir merkezine araç giremiyor; taşıma günü buna göre seçiliyor.',
    metaAciklama:
      'Vakfıkebir evden eve nakliyat: pazar gününe göre planlanan taşıma, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Vakfıkebir’de taşıma gününü belirleyen en pratik şey haftalık pazar. Pazarın kurulduğu gün merkezdeki caddeler tezgâhlarla kapanıyor ve nakliye aracının bina önüne yanaşması mümkün olmuyor. Taşımayı o güne koymuyoruz; koyulursa araç uzakta kalıyor, eşya uzun mesafe elle taşınıyor ve iş iki katına çıkıyor.</p><p>Pazar dışındaki günlerde merkez rahat; yollar araç geçişine uygun ve yükleme sorunsuz ilerliyor. Vakfıkebir’de <strong>evden eve nakliyat</strong> planlarken ilk sorduğumuz şey adresin pazar alanına ne kadar yakın olduğu.</p>`,
    kunye: [
      { label: 'Pazar günü', value: 'Caddeler tezgâhlarla kapanıyor; araç bina önüne yanaşamıyor.' },
      { label: 'Gün seçimi', value: 'Taşıma pazar gününe konmuyor; konursa iş iki katına çıkıyor.' },
      { label: 'Pazar alanına uzaklık', value: 'Planın ilk sorusu adresin pazara ne kadar yakın olduğu.' },
    ],
    guzergahlar: [
      { to: 'Akçaabat', note: 'Doğuya geçiş; sahil yolu.' },
      { to: 'Beşikdüzü', note: 'Batıya geçiş; komşu ilçe.' },
      { to: 'Ortahisar', note: 'Trabzon merkezi; yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Pazar günü taşınabilir miyim?', answer: 'Önermiyoruz. O gün caddeler kapalı, araç uzakta kalıyor ve elle taşıma mesafesi işi iki katına çıkarıyor.' },
      { question: 'Adresim pazara çok yakın, ne yapmalıyız?', answer: 'Taşımayı pazar dışındaki bir güne alıyoruz. Zorunluysa yükleme yeri için önceden izin çıkarıyoruz.' },
      { question: 'Eşyalarım sigortalı mı?', answer: 'Bütün taşımalar sigortalı ve kapsam sözleşmede yazılı oluyor.' },
    ],
  },

  {
    ad: 'Maçka',
    derinlik: 'orta',
    ozet: 'Orman içindeki Maçka’da yaylalara çıkan yollar dar ve virajlı; araç seçimi taşımanın ilk kararı.',
    metaAciklama:
      'Maçka evden eve nakliyat: dar ve virajlı dağ yollarına uygun araç planı, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Maçka orman içinde ve buranın gözden kaçan sorunu nem. Havadaki nem oranı yüksek olduğu için ahşap mobilya, yatak ve tekstil ürünleri araçta uzun süre kapalı kaldığında nem çekiyor; varışta küf kokusu çıkabiliyor. Bu yüzden yüklemeyi sıkıştırmadan yapıyor, araç içinde hava dolaşımına yer bırakıyor ve teslimde eşyayı bekletmeden açtırıyoruz.</p><p>Yollar dar ve virajlı; büyük araçla her adrese ulaşmak mümkün olmuyor. Maçka’da <strong>evden eve nakliyat</strong> planlarken uygun araç ölçüsünü keşifte seçiyor, gerekirse yükü aşağıda aktarıyoruz.</p>`,
    kunye: [
      { label: 'Nem', value: 'Ahşap ve tekstil araçta kapalı kaldığında nem çekiyor; hava dolaşımı bırakılıyor.' },
      { label: 'Sıkıştırmadan yükleme', value: 'Yük istiflenirken araç içinde boşluk bırakılıyor.' },
      { label: 'Dar ve virajlı yol', value: 'Büyük araç her adrese ulaşamıyor; gerekirse aşağıda aktarma yapılıyor.' },
    ],
    guzergahlar: [
      { to: 'Ortahisar', note: 'Kuzeye geçiş; Trabzon yönü, yol süresi planlanıyor.' },
      { to: 'Akçaabat', note: 'Kuzeybatı aksı; dağ yolu.' },
      { to: 'Düzköy', note: 'Batıya geçiş; komşu ilçe.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Eşyalarım nem çeker mi?', answer: 'Sıkıştırmadan yükleyip hava dolaşımına yer bırakıyoruz ve teslimde bekletmeden açtırıyoruz. Asıl risk uzun süre kapalı kalmak.' },
      { question: 'Yayladaki evime araç çıkabilir mi?', answer: 'Yolu keşifte değerlendirip uygun ölçüde araç seçiyoruz; çıkılamayan adreslerde aşağıda aktarma yapıyoruz.' },
      { question: 'Trabzon merkezine taşınma tek günde biter mi?', answer: 'Genellikle biter; yol süresi plana ekleniyor ve iş erken başlatılıyor.' },
    ],
  },
]

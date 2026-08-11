// prisma/ilce-verileri/mugla.mjs
//
// Muğla'nın 13 ilçesinden 8'i. BEŞİ ATLANDI.
//
// ATLANANLAR: Köyceğiz, Seydikemer, Ula, Yatağan, Kavaklıdere
//   Aramada karşılığı düşük. Yatağan ayrıca BİLEREK çıkarıldı: doğal
//   ekseni sanayi tesisi olurdu, o eksen çok sayıda ilçede kullanıldı.
//
// DERİNLİK: 'tam' (3) / 'orta' (5)
//
// BU İLDE COĞRAFİ EKSENLERİN TAMAMI KAPALI
//   Muğla'nın sekiz ilçesinin doğal eksenlerinin hepsi daha önce
//   kullanıldı:
//     · sezon / yazlık / turizm  → Çeşme, Dikili, Foça, Seferihisar,
//        Karataş, Kemer, Manavgat, Selçuk, Mudanya, Kızılcahamam (ON ilçe)
//     · havalimanı yakınlığı     → Bursa/Yenişehir, Ankara/Akyurt,
//        İzmir/Gaziemir, Trabzon/Yomra
//     · uzak yarımada / tek yol  → Trabzon/Of, Antalya/Kaş, Mersin/Anamur
//     · çok katlı rezidans + asansör saati → Antalya/Alanya
//     · zeytin ve hasat          → Ödemiş, Nizip, Kalecik, Kozan, Akşehir
//     · üniversite takvimi       → Bornova, Pamukkale (iki kez, üçüncüsü yok)
//
//   Bu yüzden SEKİZ SAYFANIN HİÇBİRİNDE sezon, tatil, yazlık, turist,
//   deniz, plaj, sahil, koy ve marina kelimeleri geçmiyor. Balıkesir'de
//   uygulanan kuralın aynısı; orada da beş kıyı ilçesi bu şekilde yazıldı.
//
// EKSENLER YİNE İŞTEN VE EŞYADAN
//   Ay sonu kira döngüsü, devrilme güvenliği, kısmen eşyalı ev, kat
//   sınırı, çift kutu, örtü hijyeni, hacim tahmininin sapması, hafta sonu
//   planlaması. Hiçbiri başka bir ilde kullanılmadı.
//
// YAKIN DURAN VE AYRILAN ÜÇ EKSEN
//   · Bornova ve Pamukkale: AKADEMİK dönem takvimi. Bodrum'da eksen
//     KİRA DÖNGÜSÜ — ay sonu ve ay başı. Farklı takvim, farklı sebep.
//   · Kayseri/Talas: eşyalı kiralıkta NEYİN taşındığı (mobilya yok,
//     sadece koli). Menteşe'de konu taşınan eşya değil, evde HÂLİHAZIRDA
//     BULUNAN mobilyanın korunması ve yerleştirmeye dahil edilmesi.
//   · Manisa/Şehzadeler: dış cephe asansörünün NEREYE kurulacağı.
//     Marmaris'te konu NE ZAMAN gerektiği — kat sınırı.
//
// MAHALLELER
//   Tamamı boş bırakıldı; Muğla mahalle adları konusunda doğrulanmış
//   bilgim yok.
//
// Ortak kurallar: uydurma mahalle/rakam yok, "evden eve nakliyat" sayfa
// başına tam bir kez. (bkz. izmir.mjs başlığındaki ayrıntılı gerekçe)

export const il = { ad: 'Muğla', plaka: 48 }

export const ilceler = [
  // ───────────────────────── TAM DERİNLİK (3) ─────────────────────────
  {
    ad: 'Bodrum',
    derinlik: 'tam',
    ozet:
      'Bodrum’da taşınmalar ayın son ve ilk günlerine yığılıyor; o günlerde randevu erken alınmazsa gün bulmak zorlaşıyor.',
    metaAciklama:
      'Bodrum evden eve nakliyat: ay sonu yoğunluğunda randevu planlaması, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Bodrum’da kiralık konut hareketi yüksek ve kira sözleşmeleri büyük ölçüde ay başında başlayıp ay sonunda bitiyor. Bunun taşımaya doğrudan bir sonucu var: talep ayın son üç ve ilk üç gününe sıkışıyor, ortasındaki iki hafta ise sakin geçiyor.</p><p>Bu yığılma işin zorluğunu değil sırasını değiştiriyor. Yoğun günlerde araç ve ekip önceden bağlanmış oluyor; geç arayan kişi istediği günü değil, kalan günü alıyor. Bodrum’da <strong>evden eve nakliyat</strong> için tarihiniz belliyse randevuyu hemen almanızı öneriyoruz — sonradan aynı fiyata gün bulmak her zaman mümkün olmuyor.</p><p>Esnekliğiniz varsa tersini de söylüyoruz: taşınmayı ayın ortasına alabiliyorsanız hem gün seçimi hem saat aralığı sizde kalıyor. Kira bitişi buna izin vermiyorsa, çıkış ile giriş arasındaki farkı nasıl yöneteceğimizi keşifte birlikte planlıyoruz.</p>`,
    kunye: [
      { label: 'Yığılma', value: 'Talep ayın son üç ve ilk üç gününe sıkışıyor.' },
      { label: 'Sonuç', value: 'Yoğun günlerde araç ve ekip önceden bağlanıyor; geç arayan kalan günü alıyor.' },
      { label: 'Öneri', value: 'Tarih belliyse randevu hemen alınıyor.' },
      { label: 'Esneklik', value: 'Ayın ortasına alınabilirse gün ve saat aralığı seçilebiliyor.' },
    ],
    guzergahlar: [
      { to: 'Milas', note: 'Kuzeydoğu aksı; günübirlik.' },
      { to: 'Menteşe', note: 'Doğuya geçiş; Muğla merkezi, yol süresi planlanıyor.' },
      { to: 'Marmaris', note: 'Güneydoğu yönü; güzergâh planlanıyor.' },
      { to: 'Muğla', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Ayın sonunda taşınacağız, yer bulabilir miyiz?',
        answer:
          'O günler erken doluyor. Tarihinizi netleştirdiğiniz gün randevu almanızı öneriyoruz; böylece saat aralığını da siz seçiyorsunuz.',
      },
      {
        question: 'Ayın ortasında taşınmak avantajlı mı?',
        answer:
          'Planlama açısından evet. Gün ve saat seçimi büyük ölçüde sizde kalıyor.',
      },
      {
        question: 'Eski evden çıkışla yeni eve giriş aynı güne denk gelmiyor.',
        answer:
          'Bu farkı nasıl yöneteceğimizi keşifte birlikte planlıyoruz; eşyanın bekleyeceği yer önceden belirleniyor.',
      },
      {
        question: 'Verilen fiyat sonradan değişir mi?',
        answer:
          'Değişmiyor. Keşif sonrası verilen yazılı fiyat taşıma gününe kadar geçerli kalıyor.',
      },
    ],
  },

  {
    ad: 'Fethiye',
    derinlik: 'tam',
    ozet:
      'Fethiye’de uzun gardırop ve kitaplıklar yeni evde duvara sabitleniyor; devrilme riski montajın parçası sayılıyor.',
    metaAciklama:
      'Fethiye evden eve nakliyat: uzun mobilyaların duvara sabitlenmesi ve devrilme güvenliği. Yazılı sabit fiyat.',
    govde: `<p>Fethiye’deki kurulumlarda üzerinde durduğumuz konu, uzun ve dar mobilyaların dengesi. Boyu genişliğinden fazla olan bir gardırop, kitaplık ya da vitrin, altındaki çekmece açıldığında ya da üst rafına ağırlık konduğunda öne doğru ağırlaşıyor. Bu, mobilyanın kalitesiyle ilgili bir kusur değil; fizik.</p><p>Eski evde yıllarca sorunsuz duran bir mobilya yeni evde aynı şekilde durmayabiliyor, çünkü zemin ve duvar farklı. Bu yüzden uzun parçaları kurulumdan sonra duvara sabitliyoruz. Fethiye’de <strong>evden eve nakliyat</strong> kapsamında bu işlem, çocuklu hanelerde ayrıca soruyoruz — tırmanılan bir rafın devrilmesi en ciddi ev kazalarından biri.</p><p>Sabitleme duvara delik açmayı gerektiriyor ve bunu onayınız olmadan yapmıyoruz. Kiralık evlerde ev sahibinin izni olup olmadığını soruyoruz; izin yoksa alternatif olarak mobilyanın yerleşimini ve ağırlık dağılımını değiştiriyoruz.</p>`,
    kunye: [
      { label: 'Risk', value: 'Boyu genişliğinden fazla mobilya, çekmece açıldığında öne ağırlaşıyor.' },
      { label: 'Yeni ev farkı', value: 'Zemin ve duvar farklı olduğu için eski evdeki denge korunmuyor.' },
      { label: 'Çocuklu hane', value: 'Ayrıca soruluyor; tırmanılan rafın devrilmesi ciddi bir kaza.' },
      { label: 'İzin', value: 'Delik açmak onaya bağlı; izin yoksa yerleşim ve ağırlık dağılımı değiştiriliyor.' },
    ],
    guzergahlar: [
      { to: 'Dalaman', note: 'Batıya geçiş; günübirlik.' },
      { to: 'Ortaca', note: 'Batı aksı; güzergâh planlanıyor.' },
      { to: 'Menteşe', note: 'Kuzeybatı yönü; Muğla merkezi, yol süresi planlanıyor.' },
      { to: 'Muğla', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Gardırobu duvara sabitliyor musunuz?',
        answer:
          'Sabitliyoruz. Uzun ve dar mobilyalarda devrilme riski olduğu için bunu montajın parçası sayıyoruz.',
      },
      {
        question: 'Eski evde hiç sorun olmamıştı, gerekli mi?',
        answer:
          'Yeni evin zemini ve duvarı farklı olduğu için denge de farklı oluyor. Bu yüzden yeniden değerlendiriyoruz.',
      },
      {
        question: 'Kiralık evde duvara delik açılır mı?',
        answer:
          'Onayınız ve ev sahibinin izni olmadan açmıyoruz. İzin yoksa yerleşimi ve ağırlık dağılımını değiştiriyoruz.',
      },
      {
        question: 'Bu işlem fiyata dahil mi?',
        answer:
          'Montaj kapsamında; hangi parçalarda gerekeceğini keşifte belirleyip teklifte gösteriyoruz.',
      },
    ],
  },

  {
    ad: 'Menteşe',
    derinlik: 'tam',
    ozet:
      'Menteşe’de yeni evde hâlihazırda mobilya varsa taşıma planı değişiyor; mevcut eşya korunuyor ve yerleşime dahil ediliyor.',
    metaAciklama:
      'Menteşe evden eve nakliyat: kısmen eşyalı eve taşınma, mevcut mobilyanın korunması ve yerleşim planı.',
    govde: `<p>Menteşe’deki taşımaların bir bölümü boş bir eve değil, içinde mobilya bulunan bir eve yapılıyor. Bu, işi iki yönden değiştiriyor: gelen eşyaya yer açmak gerekiyor ve mevcut eşyanın taşıma sırasında zarar görmemesi gerekiyor.</p><p>Boşaltmaya başlamadan önce evde duran mobilyaları örtüyor, geçiş yolu üzerindekileri geçici olarak kenara alıyoruz. Menteşe’de <strong>evden eve nakliyat</strong> keşfinde varış adresini de gezip hangi parçanın kalacağını, hangisinin yer değiştireceğini birlikte işaretliyoruz; bu karar taşıma günü verilirse ekip ortada bekliyor.</p><p>Bir de kapsam sınırı var, onu net söylüyoruz: evde zaten bulunan mobilyaya taşıma sigortamız uygulanmıyor, çünkü onu biz taşımadık. Yer değiştirmesi gerekiyorsa yapıyoruz, ama bu işlemi de kayda geçirip durumunu önce fotoğraflıyoruz.</p>`,
    kunye: [
      { label: 'İki yönlü etki', value: 'Gelen eşyaya yer açmak ve mevcut eşyayı korumak birlikte planlanıyor.' },
      { label: 'Hazırlık', value: 'Evdeki mobilyalar örtülüyor, geçiş yolundakiler kenara alınıyor.' },
      { label: 'Karar', value: 'Neyin kalacağı ve neyin yer değiştireceği keşifte işaretleniyor.' },
      { label: 'Kapsam', value: 'Evde bulunan mobilya sigorta dışında; yer değiştirme kayda geçiriliyor.' },
    ],
    guzergahlar: [
      { to: 'Milas', note: 'Batıya geçiş; günübirlik.' },
      { to: 'Marmaris', note: 'Güneye geçiş; yol süresi planlanıyor.' },
      { to: 'Ortaca', note: 'Güneydoğu aksı; güzergâh planlanıyor.' },
      { to: 'Muğla', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Yeni evde eşya var, taşıma yapılabilir mi?',
        answer:
          'Yapılabilir. Mevcut mobilyaları örtüyor, geçiş yolundakileri kenara alıyoruz; yerleşimi keşifte birlikte planlıyoruz.',
      },
      {
        question: 'Evdeki mobilyayı yer değiştirebilir misiniz?',
        answer:
          'Yapabiliyoruz. İşlemi kayda geçirip mobilyanın durumunu önceden fotoğraflıyoruz.',
      },
      {
        question: 'Mevcut mobilyaya zarar gelirse ne oluyor?',
        answer:
          'Taşıma sigortamız bizim taşımadığımız eşyayı kapsamıyor. Bu yüzden koruma ve fotoğraflı kayıt üzerinde duruyoruz.',
      },
      {
        question: 'Keşif ücretli mi?',
        answer: 'Keşif ücretsiz. Varış adresini de gezip yerleşim kararlarını orada veriyoruz.',
      },
    ],
  },

  // ───────────────────────── ORTA DERİNLİK (5) ─────────────────────────
  {
    ad: 'Marmaris',
    derinlik: 'orta',
    ozet:
      'Marmaris’te dış cephe asansörünün hangi kattan sonra gerekli olduğu keşifte karara bağlanıyor.',
    metaAciklama:
      'Marmaris evden eve nakliyat: asansörsüz binada kat sınırı ve dış cephe asansörü kararı. Yazılı sabit fiyat.',
    govde: `<p>Marmaris’teki asansörsüz binalarda sorulan ilk soru, eşyanın merdivenden çıkıp çıkamayacağı değil; hangi noktadan sonra merdivenin makul olmaktan çıktığı. Bunun tek bir cevabı yok, çünkü kat sayısı kadar merdiven genişliği, sahanlık dönüşü ve eşyanın ağırlığı da belirleyici.</p><p>Pratikte şu ölçüyü kullanıyoruz: ağır parçalar için üçüncü kattan sonra merdiven hem süreyi hem riski belirgin şekilde artırıyor. Marmaris’te <strong>evden eve nakliyat</strong> keşfinde kat sayısını, merdiven genişliğini ve ağır parça adedini birlikte değerlendirip dış cephe asansörünün gerekip gerekmediğini söylüyoruz — kararı taşıma gününe bırakmıyoruz.</p>`,
    kunye: [
      { label: 'Tek cevap yok', value: 'Kat sayısı kadar merdiven genişliği, sahanlık dönüşü ve ağırlık da belirleyici.' },
      { label: 'Ölçü', value: 'Ağır parçalarda üçüncü kattan sonra merdiven süreyi ve riski belirgin artırıyor.' },
      { label: 'Karar', value: 'Keşifte veriliyor; taşıma gününe bırakılmıyor.' },
    ],
    guzergahlar: [
      { to: 'Menteşe', note: 'Kuzeye geçiş; Muğla merkezi, yol süresi planlanıyor.' },
      { to: 'Datça', note: 'Batıya geçiş; güzergâh planlanıyor.' },
      { to: 'Muğla', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Kaçıncı kattan sonra dış cephe asansörü gerekiyor?', answer: 'Ağır parçalarda genellikle üçüncü kattan sonra. Ama merdiven genişliği ve sahanlık dönüşü de belirleyici; keşifte söylüyoruz.' },
      { question: 'Merdivenle taşınırsa ne değişiyor?', answer: 'Süre uzuyor ve ekip büyüyor. İki seçeneğin farkını keşifte yazılı veriyoruz.' },
      { question: 'Dış cephe asansörü fiyata dahil mi?', answer: 'Gerekiyorsa teklifte ayrı satırda gösteriliyor; sonradan eklenmiyor.' },
    ],
  },

  {
    ad: 'Milas',
    derinlik: 'orta',
    ozet:
      'Milas’ta en kırılgan parçalar tek kutuya konmuyor; kutu içinde kutu yöntemiyle iki katmanlı paketleniyor.',
    metaAciklama:
      'Milas evden eve nakliyat: kırılacak eşyada çift kutu yöntemi ve dolgu, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Milas’taki taşımalarda en kırılgan parçalar için tek kat ambalajı yeterli görmüyoruz. Sarılan parça bir kutuya konuyor, o kutu da dolgu malzemesiyle çevrelenip ikinci bir kutunun içine yerleştiriliyor. Aradaki boşluk darbeyi iç kutuya ulaşmadan söndürüyor.</p><p>Bu yöntem her eşya için gerekli değil; hacmi ve maliyeti artırdığı için yalnızca kırılganlığı yüksek ve yeri doldurulamayacak parçalarda kullanıyoruz. Milas’ta <strong>evden eve nakliyat</strong> keşfinde hangi parçaların bu gruba gireceğini birlikte belirliyoruz.</p>`,
    kunye: [
      { label: 'Yöntem', value: 'Sarılan parça bir kutuya, o kutu dolguyla ikinci kutunun içine yerleştiriliyor.' },
      { label: 'Mantık', value: 'Aradaki boşluk darbeyi iç kutuya ulaşmadan söndürüyor.' },
      { label: 'Kapsam', value: 'Hacmi artırdığı için yalnızca yeri doldurulamayacak parçalarda kullanılıyor.' },
    ],
    guzergahlar: [
      { to: 'Bodrum', note: 'Güneybatı aksı; günübirlik.' },
      { to: 'Menteşe', note: 'Doğuya geçiş; Muğla merkezi.' },
      { to: 'Muğla', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Çok kıymetli bir parçam var, nasıl paketlenir?', answer: 'Çift kutu yöntemiyle: iç kutu dolguyla çevrelenip ikinci kutuya yerleştiriliyor.' },
      { question: 'Her kırılacak eşya böyle mi paketleniyor?', answer: 'Hayır. Hacmi artırdığı için yalnızca yeri doldurulamayacak parçalarda kullanıyoruz.' },
      { question: 'Bu ek ücret mi?', answer: 'Malzeme kalemine giriyor. Kaç parça için gerektiği keşifte belirlenip teklifte gösteriliyor.' },
    ],
  },

  {
    ad: 'Dalaman',
    derinlik: 'orta',
    ozet:
      'Dalaman’da eşyanın sarıldığı örtü ve battaniyeler her işten sonra temizleniyor; kirli örtüyle mobilya sarılmıyor.',
    metaAciklama:
      'Dalaman evden eve nakliyat: temiz örtü ve battaniyeyle mobilya sarma, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Dalaman’daki taşımalarda az konuşulan ama her eşyaya doğrudan temas eden bir konu var: mobilyayı sardığımız örtüler. Bu örtüler bir önceki işte başka bir evde kullanılmış oluyor ve üzerinde toz, kum ya da nem taşıyabiliyor. Kirli bir örtüyle sarılan açık renk bir koltuk, taşıma bitiminde temizlik gerektirebiliyor.</p><p>Bu yüzden örtü ve battaniyeleri iş aralarında değiştiriyor, kullanılanları yıkanmak üzere ayırıyoruz. Dalaman’da <strong>evden eve nakliyat</strong> sırasında açık renk kumaş ve deri yüzeylerde ayrıca tek kullanımlık streç uyguluyoruz; örtü doğrudan yüzeye temas etmiyor.</p>`,
    kunye: [
      { label: 'Sorun', value: 'Örtüler önceki işten toz, kum ya da nem taşıyabiliyor.' },
      { label: 'Uygulama', value: 'İş aralarında değiştiriliyor, kullanılanlar yıkanmak üzere ayrılıyor.' },
      { label: 'Hassas yüzey', value: 'Açık renk kumaş ve deride önce streç uygulanıyor, örtü yüzeye değmiyor.' },
    ],
    guzergahlar: [
      { to: 'Ortaca', note: 'Batıya geçiş; kısa mesafe.' },
      { to: 'Fethiye', note: 'Doğuya geçiş; günübirlik.' },
      { to: 'Muğla', note: 'İl merkezi; yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Koltuğum kirlenir mi?', answer: 'Kirlenmemesi için örtüleri iş aralarında değiştiriyoruz; açık renk yüzeylerde ayrıca streç uyguluyoruz.' },
      { question: 'Örtüler yıkanıyor mu?', answer: 'Kullanılan örtüler yıkanmak üzere ayrılıyor; kirli örtüyle mobilya sarmıyoruz.' },
      { question: 'Deri koltuk için farklı bir şey yapıyor musunuz?', answer: 'Önce streç uygulanıyor, örtü yüzeye doğrudan temas etmiyor.' },
    ],
  },

  {
    ad: 'Datça',
    derinlik: 'orta',
    ozet:
      'Datça’da keşifte hesaplanan hacim tutmazsa ne yapılacağı baştan konuşuluyor; taşıma günü karar aranmıyor.',
    metaAciklama:
      'Datça evden eve nakliyat: hacim tahmini sapmasında izlenen yol ve şeffaf planlama. Yazılı sabit fiyat.',
    govde: `<p>Datça’ya giden bir işte yükün araca sığmaması en maliyetli sürpriz oluyor; ikinci sefer aynı gün mümkün olmuyor. Keşifte hacmi ölçüyoruz, ama ölçüm bir tahmin ve tahminler sapabiliyor — özellikle sonradan eklenen eşya varsa.</p><p>Bu yüzden ne yapılacağını baştan konuşuyoruz. Sapma küçükse araç zaten pay bırakılarak seçiliyor. Büyükse iki yol var: ya baştan bir üst araç sınıfına geçiyoruz ya da ikinci sefere kalacak parçalar önceden belirleniyor. Datça’da <strong>evden eve nakliyat</strong> teklifinde hangi aracın seçildiği ve ne kadar pay bırakıldığı yazılı oluyor.</p>`,
    kunye: [
      { label: 'Risk', value: 'Yükün sığmaması; uzak adreste ikinci sefer aynı gün mümkün olmuyor.' },
      { label: 'Pay', value: 'Araç, ölçülen hacmin üzerine pay bırakılarak seçiliyor.' },
      { label: 'Plan B', value: 'Üst araç sınıfına geçmek ya da ikinci sefere kalacakları önceden belirlemek.' },
    ],
    guzergahlar: [
      { to: 'Marmaris', note: 'Doğuya geçiş; yol süresi planlanıyor.' },
      { to: 'Menteşe', note: 'Kuzeydoğu aksı; Muğla merkezi.' },
      { to: 'Muğla', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Eşyam araca sığmazsa ne oluyor?', answer: 'Bu yüzden araç pay bırakılarak seçiliyor. Yine de sapma olursa izlenecek yol keşifte kararlaştırılmış oluyor.' },
      { question: 'Sonradan eşya eklersem?', answer: 'Söyleyin, hacmi güncelleyelim. Hacmi belirgin değiştiren eklemelerde fiyatı da birlikte güncelliyoruz.' },
      { question: 'Hangi araçla geleceğinizi önceden biliyor muyum?', answer: 'Biliyorsunuz. Seçilen araç ve bırakılan pay teklifte yazılı oluyor.' },
    ],
  },

  {
    ad: 'Ortaca',
    derinlik: 'orta',
    ozet:
      'Ortaca’da hafta sonu ve resmî tatil taşımaları ayrı planlanıyor; o günlerde bina yönetimi ve esnaf desteği sınırlı oluyor.',
    metaAciklama:
      'Ortaca evden eve nakliyat: hafta sonu ve resmî tatil günlerinde taşıma planlaması. Yazılı sabit fiyat.',
    govde: `<p>Ortaca’da çalışan hanelerin çoğu taşınmayı hafta sonuna ya da resmî tatile denk getirmek istiyor. Bunu yapıyoruz, ama o günlerin kendine has bir kısıtı var: bina yönetimine ulaşmak, apartman görevlisinden yardım almak ya da eksik bir malzeme için esnafa gitmek hafta içindeki kadar kolay olmuyor.</p><p>Bu yüzden hafta sonu işlerinde hazırlığı bir gün önceden tamamlıyoruz: asansör izni alınıyorsa cuma günü alınıyor, malzeme fazlasıyla yükleniyor, otopark için gereken konuşmalar önceden yapılıyor. Ortaca’da <strong>evden eve nakliyat</strong> için hafta sonu randevusu veriyoruz; sadece planı bir gün öne çekiyoruz.</p>`,
    kunye: [
      { label: 'Talep', value: 'Çalışan haneler hafta sonu ve resmî tatili tercih ediyor.' },
      { label: 'Kısıt', value: 'Bina yönetimi, görevli ve esnaf desteği o günlerde sınırlı.' },
      { label: 'Önlem', value: 'İzinler, malzeme ve otopark konuşmaları bir gün önceden tamamlanıyor.' },
    ],
    guzergahlar: [
      { to: 'Dalaman', note: 'Doğuya geçiş; kısa mesafe.' },
      { to: 'Menteşe', note: 'Kuzeybatı aksı; Muğla merkezi, yol süresi planlanıyor.' },
      { to: 'Muğla', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Hafta sonu taşıma yapıyor musunuz?', answer: 'Yapıyoruz. Hazırlığı bir gün öne çekiyoruz; izinler ve malzeme cuma günü tamamlanıyor.' },
      { question: 'Resmî tatilde fiyat değişiyor mu?', answer: 'Değişiyorsa teklifte yazılı oluyor; sonradan eklenen bir fark çıkmıyor.' },
      { question: 'Asansör izni hafta sonu alınabiliyor mu?', answer: 'Genellikle önceden alınması gerekiyor; bunu biz yönetimle hafta içinde hallediyoruz.' },
    ],
  },
]

// prisma/ilce-verileri/balikesir.mjs
//
// Balıkesir'in 20 ilçesinden 8'i. ON İKİSİ ATLANDI.
//
// ATLANANLAR: Balya, Bigadiç, Dursunbey, Gömeç, Havran, İvrindi, Kepsut,
//   Manyas, Marmara, Savaştepe, Sındırgı, Susurluk
//   Çoğu küçük nüfuslu. Marmara ÖZELLİKLE çıkarıldı: ada ilçesi olduğu
//   için doğal ekseni feribotla taşıma olurdu ve bu konuda doğrulanmış
//   bilgim yok — uydurmaktansa ilçeyi almadım.
//
// DERİNLİK: 'tam' (3) / 'orta' (5)
//
// SAHİL İLÇELERİ ATLANMADI — AMA SEZON EKSENİ KULLANILMADI
//   Sekiz ilçenin BEŞİ kıyıda: Bandırma, Ayvalık, Edremit, Burhaniye,
//   Erdek. Bunlar aramada karşılığı yüksek yerler, atlanmaları doğru
//   olmazdı.
//
//   Ancak "yazlık / sezon / ikinci konut" ekseni ON ilçede kullanıldı
//   (İzmir'de Çeşme, Dikili, Foça, Seferihisar; ayrıca Karataş, Kemer,
//   Manavgat, Selçuk, Mudanya, Kızılcahamam). Bu yüzden beş kıyı
//   ilçesinin HİÇBİRİNDE sezon, tatil, yazlık ya da mevsimlik yoğunluk
//   çerçevesine girilmedi. Denizin adı bile geçmiyor; eksenlerin tamamı
//   taşıma işinin kendi aşamalarından çıkarıldı.
//
// AYRICA KAPALI OLANLAR
//   · tarihi doku + dar sokak → Beypazarı, Altındağ, Tire, Bergama,
//     Kula, Akdeniz, (Sur bilerek dışarıda tutuldu)
//     → Ayvalık'ın doğal ekseni bu olurdu, girilmedi.
//   · zeytin / hasat → Ödemiş, Nizip, Kalecik, Kozan, Akşehir
//     → Edremit ve Burhaniye'nin doğal ekseni bu olurdu, girilmedi.
//   · liman / sanayi → Gemlik, Aliağa, Tekkeköy, Yumurtalık
//     → Bandırma'nın doğal ekseni bu olurdu, girilmedi.
//
// YAKIN DURAN VE AYRILAN İKİ EKSEN
//   · Tekirdağ/Süleymanpaşa: "eski evin teslimi" — orada konu temizlik,
//     ambalaj atığı ve duvardaki izler. Ayvalık'ta konu TESİSAT VE
//     ABONELİK kapatma; temizlik çerçevesine girilmiyor.
//   · Şanlıurfa/Karaköprü: "fiyat dökümü" — orada konu hangi kalemlerin
//     teklifte yer aldığı. Gönen'de konu HACMİN NASIL ÖLÇÜLDÜĞÜ.
//
// MAHALLELER
//   Tamamı boş bırakıldı; Balıkesir mahalle adları konusunda doğrulanmış
//   bilgim yok.
//
// Ortak kurallar: uydurma mahalle/rakam yok, "evden eve nakliyat" sayfa
// başına tam bir kez. (bkz. izmir.mjs başlığındaki ayrıntılı gerekçe)

export const il = { ad: 'Balıkesir', plaka: 10 }

export const ilceler = [
  // ───────────────────────── TAM DERİNLİK (3) ─────────────────────────
  {
    ad: 'Bandırma',
    derinlik: 'tam',
    ozet:
      'Bandırma’dan çıkan uzun mesafeli taşımalarda sürücünün yasal sürüş süresi, teslim saatini eşya hacminden çok belirliyor.',
    metaAciklama:
      'Bandırma evden eve nakliyat: uzun mesafede sürüş süresi ve mola planı, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Bandırma’dan yapılan taşımaların bir bölümü uzun mesafeye gidiyor ve bu işlerde teslim saatini belirleyen şey yükün büyüklüğü değil, sürücünün yolda kalabileceği süre oluyor. Sürüş süresi ve zorunlu molalar yasayla belirli; bunu görmezden gelen bir plan ya gerçekleşmiyor ya da güvenli olmuyor.</p><p>Bu yüzden uzun güzergâhlarda hesabı tersten yapıyoruz: teslim saatinden geriye doğru gidip mola sürelerini ekliyor, çıkış saatini ona göre belirliyoruz. Mesafe belirli bir noktayı aşıyorsa araca ikinci sürücü veriyoruz; böylece yük yolda gecelemeden gidiyor. Bandırma’da <strong>evden eve nakliyat</strong> teklifinde bu tercih ayrı bir satır olarak görünüyor.</p><p>İkinci sürücü her işte gerekmiyor. Gerekip gerekmediğine mesafeye ve teslim tarihine bakarak keşifte karar veriyoruz — “yetişiriz” deyip yola çıkmıyoruz, çünkü yetişmeyen bir plan iki adreste birden aksama demek.</p>`,
    kunye: [
      { label: 'Belirleyici', value: 'Teslim saatini yük hacmi değil, yasal sürüş ve mola süresi belirliyor.' },
      { label: 'Ters hesap', value: 'Teslim saatinden geriye doğru gidilip çıkış saati bulunuyor.' },
      { label: 'İkinci sürücü', value: 'Mesafe belirli noktayı aşarsa veriliyor; yük yolda gecelemiyor.' },
      { label: 'Karar', value: 'Gerekip gerekmediği keşifte mesafe ve teslim tarihine göre belirleniyor.' },
    ],
    guzergahlar: [
      { to: 'Erdek', note: 'Batıya geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Gönen', note: 'Güneybatı aksı; günübirlik.' },
      { to: 'Karesi', note: 'Güneye çıkış; Balıkesir merkezi, yol süresi planlanıyor.' },
      { to: 'Balıkesir', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Uzun mesafede eşyam kaç günde teslim edilir?',
        answer:
          'Mesafeye ve sürüş süresi kurallarına göre hesaplıyoruz. Teslim saatinden geriye doğru planlayıp size gün olarak söylüyoruz.',
      },
      {
        question: 'İkinci sürücü ne zaman gerekiyor?',
        answer:
          'Mesafe belirli bir noktayı aştığında. Böylece yük yolda gecelemeden gidiyor; gerekip gerekmediğine keşifte karar veriyoruz.',
      },
      {
        question: 'Yük yolda bir yerde bekler mi?',
        answer:
          'Planı buna gerek kalmayacak şekilde kuruyoruz. Beklemesi gerekiyorsa nerede ve ne kadar bekleyeceğini önceden söylüyoruz.',
      },
      {
        question: 'Verilen fiyat sonradan değişir mi?',
        answer:
          'Değişmiyor. Keşif sonrası verilen yazılı fiyat taşıma gününe kadar geçerli kalıyor.',
      },
    ],
  },

  {
    ad: 'Karesi',
    derinlik: 'tam',
    ozet:
      'Karesi’de fiyatı belirleyen mesafe iki adres arası değil; aracın durduğu nokta ile kapı arasındaki yürüme mesafesi.',
    metaAciklama:
      'Karesi evden eve nakliyat: yürüme mesafesi ölçülüp fiyata yazılıyor, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Karesi’de iki adres arasındaki kilometre çoğu zaman kısa, ama iş süresi beklenenden uzun çıkabiliyor. Sebebi genellikle aynı: araç bina kapısına yanaşamıyor ve her parça elde belli bir mesafe taşınıyor. Bu mesafe kısa görünse de yüzlerce kez yürünüyor.</p><p>Bu yüzden keşifte iki adreste de aynı ölçüyü alıyoruz: aracın durabileceği en yakın nokta ile bina kapısı arasındaki mesafe. Karesi’de <strong>evden eve nakliyat</strong> teklifinde bu, kilometre kadar somut bir kalem — çünkü ekip sayısını ve süreyi doğrudan etkiliyor.</p><p>Mesafe uzunsa çözüm ekibi büyütmek değil, taşıma yöntemini değiştirmek oluyor: tekerlekli taşıma ekipmanı, ara aktarma noktası ya da mümkünse aracın geçici olarak daha yakına alınması. Hangisinin uygulanacağını keşifte belirleyip fiyata yazıyoruz; taşıma günü “burada duramıyoruz” sürprizi çıkmıyor.</p>`,
    kunye: [
      { label: 'Ölçülen şey', value: 'Aracın durabileceği en yakın nokta ile bina kapısı arası mesafe.' },
      { label: 'İki adres', value: 'Ölçü hem çıkılan hem girilen adreste alınıyor.' },
      { label: 'Etkisi', value: 'Ekip sayısını ve süreyi doğrudan belirliyor; kilometre kadar somut bir kalem.' },
      { label: 'Çözüm', value: 'Tekerlekli ekipman, ara aktarma noktası ya da aracın geçici olarak yaklaştırılması.' },
    ],
    guzergahlar: [
      { to: 'Altıeylül', note: 'Şehir içi geçiş; iş aynı gün bitiyor.' },
      { to: 'Bandırma', note: 'Kuzeye çıkış; yol süresi planlanıyor.' },
      { to: 'Edremit', note: 'Batıya geçiş; güzergâh planlanıyor.' },
      { to: 'Balıkesir', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Araç kapımıza yanaşamıyor, sorun olur mu?',
        answer:
          'Olmuyor, ama plana giriyor. Aracın durabileceği nokta ile kapı arasını ölçüp süreye ve fiyata yazıyoruz.',
      },
      {
        question: 'Bu mesafe fiyatı ne kadar etkiliyor?',
        answer:
          'Ekip sayısını ve süreyi belirlediği için etkiliyor. Ne kadar etkilediğini keşifte açıkça söylüyoruz.',
      },
      {
        question: 'Mesafe uzunsa ne yapıyorsunuz?',
        answer:
          'Tekerlekli taşıma ekipmanı, ara aktarma noktası ya da aracın geçici olarak yaklaştırılması — hangisi uygunsa.',
      },
      {
        question: 'Keşif ücretli mi?',
        answer: 'Keşif ücretsiz. Bu ölçüyü de o sırada iki adreste birden alıyoruz.',
      },
    ],
  },

  {
    ad: 'Ayvalık',
    derinlik: 'tam',
    ozet:
      'Ayvalık’ta taşımanın son adımı eski evi kapatmak: su vanası, elektrik sigortası ve abonelikler listeyle kapatılıyor.',
    metaAciklama:
      'Ayvalık evden eve nakliyat: eski evin tesisat ve abonelik kapatma listesi, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Ayvalık’taki işlerde araç dolduktan sonra geriye boş bir ev kalıyor ve o evin kapatılması genellikle kimsenin listesinde olmuyor. Oysa açık kalan bir su vanası ya da kapatılmamış bir abonelik, taşınmadan haftalar sonra karşınıza fatura veya su hasarı olarak çıkabiliyor.</p><p>Yükleme biter bitmez birlikte bir tur atıyoruz. Ana su vanası kapatılıyor, elektrik sigortası indiriliyor, doğalgaz vanası kapatılıyor, kombi varsa suyu boşaltılıp boşaltılmayacağı konuşuluyor. Ayvalık’ta <strong>evden eve nakliyat</strong> keşfinde bu listeyi baştan veriyoruz ki abonelik iptal ve nakil başvurularını taşınmadan önce yapabilesiniz — bunlar bizim yapabileceğimiz işlemler değil, ama hatırlatmak bizim işimiz.</p><p>Yeni adreste ise tersi geçerli: taşıma günü suyun ve elektriğin açık olması gerekiyor. Açık değilse yükleme yapılabiliyor ama montaj yarım kalıyor; makineler test edilemiyor ve aydınlatma olmadan akşamüstü çalışmak zorlaşıyor.</p>`,
    kunye: [
      { label: 'Kapatma turu', value: 'Yükleme biter bitmez su vanası, elektrik sigortası ve doğalgaz vanası kapatılıyor.' },
      { label: 'Abonelikler', value: 'İptal ve nakil başvuruları size ait; liste keşifte önceden veriliyor.' },
      { label: 'Kombi', value: 'Suyunun boşaltılıp boşaltılmayacağı yerinde konuşuluyor.' },
      { label: 'Yeni adres', value: 'Taşıma günü su ve elektrik açık olmalı; yoksa montaj yarım kalıyor.' },
    ],
    guzergahlar: [
      { to: 'Burhaniye', note: 'Kuzeye geçiş; günübirlik.' },
      { to: 'Edremit', note: 'Kuzeydoğu aksı; güzergâh düz.' },
      { to: 'Karesi', note: 'Doğuya çıkış; Balıkesir merkezi, yol süresi planlanıyor.' },
      { to: 'Balıkesir', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      {
        question: 'Abonelikleri siz mi kapatıyorsunuz?',
        answer:
          'Kapatamıyoruz, bunlar size ait işlemler. Ama listeyi keşifte veriyoruz ki taşınmadan önce başvurabilesiniz.',
      },
      {
        question: 'Eski evde ne yapıyorsunuz?',
        answer:
          'Yükleme bitince birlikte tur atıyoruz: su vanası, elektrik sigortası ve doğalgaz vanası kapatılıyor.',
      },
      {
        question: 'Yeni evde elektrik yoksa taşıma yapılır mı?',
        answer:
          'Yükleme yapılır ama montaj yarım kalır; makineler test edilemez. Taşıma günü açık olmasını istiyoruz.',
      },
      {
        question: 'Kombinin suyu boşaltılmalı mı?',
        answer:
          'Duruma göre değişiyor. Evin ne kadar boş kalacağını sorup yerinde birlikte karar veriyoruz.',
      },
    ],
  },

  // ───────────────────────── ORTA DERİNLİK (5) ─────────────────────────
  {
    ad: 'Altıeylül',
    derinlik: 'orta',
    ozet:
      'Altıeylül’de montaj, mobilya ayağa kalkınca bitmiyor; kapak ve çekmece ayarları yerinde yapılıyor.',
    metaAciklama:
      'Altıeylül evden eve nakliyat: montaj sonrası kapak ve çekmece ayarı dahil, sigortalı ambalaj, yazılı fiyat.',
    govde: `<p>Altıeylül’deki işlerde montajın bittiği yer, çoğu firmada mobilyanın ayağa kalktığı an oluyor. Oysa yeni evin zemini eskisiyle aynı değil; hafif bir eğim gardırop kapağının kendiliğinden açılmasına, çekmecenin sürtmesine ya da kapakların hizasız durmasına yol açıyor.</p><p>Bu yüzden kurulumdan sonra ayak ayarlarını, menteşe hizasını ve çekmece raylarını yerinde düzeltiyoruz. Altıeylül’de <strong>evden eve nakliyat</strong> ekibi adresten ayrılmadan önce kapakları tek tek açıp kapatıyor; kendiliğinden açılan ya da sürten bir kapak kalmıyor.</p>`,
    kunye: [
      { label: 'Zemin farkı', value: 'Yeni evin zemini eskisiyle aynı değil; hafif eğim kapağı ve çekmeceyi etkiliyor.' },
      { label: 'Ayarlar', value: 'Ayak ayarı, menteşe hizası ve çekmece rayları yerinde düzeltiliyor.' },
      { label: 'Kontrol', value: 'Adresten ayrılmadan önce kapaklar tek tek açılıp kapatılıyor.' },
    ],
    guzergahlar: [
      { to: 'Karesi', note: 'Şehir içi geçiş; iş aynı gün bitiyor.' },
      { to: 'Bandırma', note: 'Kuzeye çıkış; yol süresi planlanıyor.' },
      { to: 'Balıkesir', note: 'İl geneli taşımalar; tek ekiple yürütülüyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Dolap kapağım kendiliğinden açılıyor, düzeltir misiniz?', answer: 'Düzeltiyoruz. Ayak ayarı ve menteşe hizası kurulumdan sonra yerinde yapılıyor.' },
      { question: 'Montaj fiyata dahil mi?', answer: 'Dahil. Sökülen mobilyalar yeni adreste kurulup ayarları yapılıyor.' },
      { question: 'Sonradan bir sorun çıkarsa ne oluyor?', answer: 'Teslim sonrası bildirim süresi içinde haber verin; kayıt açıp dönüyoruz.' },
    ],
  },

  {
    ad: 'Edremit',
    derinlik: 'orta',
    ozet:
      'Edremit’te apartman ortak alanında oluşabilecek hasarın sorumluluğu baştan yazılı: merdiven, asansör kabini, bina kapısı.',
    metaAciklama:
      'Edremit evden eve nakliyat: apartman ortak alan hasar sorumluluğu yazılı, sigortalı ambalaj ve yazılı fiyat.',
    govde: `<p>Edremit’teki taşımalarda konuşulmadan geçilen bir konu, evin içinde değil dışında oluşabilecek hasar oluyor: merdiven korkuluğu, asansör kabininin iç yüzeyi, bina giriş kapısı ve ortak alan duvarları. Bunlar taşınan kişinin değil, apartmanın malı ve zarar durumunda muhatap belirsiz kalıyor.</p><p>Biz bu sorumluluğu üstleniyor ve sözleşmede yazıyoruz. Asansör kullanılacaksa kabin içi örtüyle kaplanıyor, korkuluk ve kapı kasası korumaya alınıyor. Edremit’te <strong>evden eve nakliyat</strong> öncesinde ortak alanların durumunu fotoğrafla kaydediyoruz — böylece önceden var olan bir çizik sonradan bize atfedilmiyor, bizim yaptığımız bir hasar da tartışmasız oluyor.</p>`,
    kunye: [
      { label: 'Ortak alan', value: 'Merdiven korkuluğu, asansör kabini, bina kapısı ve duvarlar kapsama alınıyor.' },
      { label: 'Koruma', value: 'Kabin içi örtülüyor, korkuluk ve kapı kasası korumaya alınıyor.' },
      { label: 'Kayıt', value: 'Taşıma öncesi ortak alanların durumu fotoğrafla kaydediliyor.' },
    ],
    guzergahlar: [
      { to: 'Burhaniye', note: 'Güneye geçiş; günübirlik.' },
      { to: 'Ayvalık', note: 'Güneybatı aksı; güzergâh düz.' },
      { to: 'Karesi', note: 'Doğuya çıkış; Balıkesir merkezi, yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Asansöre zarar gelirse kim öder?', answer: 'Sorumluluk bizde ve bu sözleşmede yazılı. Kabin içini örtüyle kaplayarak riski baştan düşürüyoruz.' },
      { question: 'Merdiven korkuluğu çizilir mi?', answer: 'Korumaya alıyoruz. Ayrıca taşıma öncesi durumu fotoğrafla kaydediyoruz.' },
      { question: 'Bina yönetimi izin istiyor, ne yapmalıyız?', answer: 'Gerekli bilgileri veriyoruz; asansör kullanım saatini de yönetimle biz ayarlayabiliyoruz.' },
    ],
  },

  {
    ad: 'Burhaniye',
    derinlik: 'orta',
    ozet:
      'Burhaniye’de verilen yazılı teklifin ne kadar süre geçerli olduğu teklifin üzerinde yazıyor.',
    metaAciklama:
      'Burhaniye evden eve nakliyat: yazılı teklif ve geçerlilik süresi, sigortalı ambalaj, sabit fiyat.',
    govde: `<p>Burhaniye’de taşınma kararı ile taşınma günü arasında bazen haftalar geçiyor. Bu sürede alınan bir teklifin hâlâ geçerli olup olmadığı çoğu zaman belirsiz kalıyor ve “o fiyat eskidendi” cümlesiyle karşılaşılıyor.</p><p>Bu belirsizliği kaldırdık: verdiğimiz her yazılı teklifin üzerinde geçerlilik süresi yazıyor. O süre içinde randevu alırsanız fiyat aynen uygulanıyor; süre dolduysa yeniden fiyatlandırma yapıyor ve neyin değiştiğini söylüyoruz. Burhaniye’de <strong>evden eve nakliyat</strong> fiyatı bu yüzden sözlü bir tahmin değil, tarihi belli bir taahhüt oluyor.</p>`,
    kunye: [
      { label: 'Geçerlilik süresi', value: 'Her yazılı teklifin üzerinde yazıyor.' },
      { label: 'Süre içinde', value: 'Randevu alınırsa fiyat aynen uygulanıyor.' },
      { label: 'Süre dolduysa', value: 'Yeniden fiyatlandırma yapılıyor ve neyin değiştiği söyleniyor.' },
    ],
    guzergahlar: [
      { to: 'Edremit', note: 'Kuzeye geçiş; günübirlik.' },
      { to: 'Ayvalık', note: 'Güneybatı yönü; güzergâh düz.' },
      { to: 'Balıkesir', note: 'İl merkezi; yol süresi planlanıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Aldığım teklif ne kadar geçerli?', answer: 'Süre teklifin üzerinde yazıyor. O süre içinde randevu alırsanız fiyat aynen uygulanıyor.' },
      { question: 'Süre dolarsa fiyat artar mı?', answer: 'Yeniden fiyatlandırma yapıyoruz. Neyin değiştiğini de söylüyoruz; sessizce zam yapmıyoruz.' },
      { question: 'Teklifi yazılı alabilir miyim?', answer: 'Her teklifi yazılı veriyoruz; sözlü tahmin üzerinden çalışmıyoruz.' },
    ],
  },

  {
    ad: 'Erdek',
    derinlik: 'orta',
    ozet:
      'Erdek’te aracın yükleme için duracağı yer belediyeden geçici izin gerektirebiliyor; başvuruyu önceden yapıyoruz.',
    metaAciklama:
      'Erdek evden eve nakliyat: yükleme için geçici park izni ve planlama, sigortalı ambalaj, yazılı sabit fiyat.',
    govde: `<p>Erdek’te dar ve yoğun sokaklarda nakliye aracının saatlerce durması her yerde mümkün olmuyor. Bazı noktalarda geçici park ya da yol kullanım izni gerekiyor; izinsiz durulduğunda hem araç uzaklaştırılabiliyor hem iş yarıda kalıyor.</p><p>Bu yüzden adresi gördüğümüzde izin gerekip gerekmediğini belirliyor, gerekiyorsa başvuruyu taşıma gününden önce biz yapıyoruz. Erdek’te <strong>evden eve nakliyat</strong> planında bu adım varsa süresi ve varsa bedeli teklifte ayrı satırda gösteriliyor; taşıma sabahına bırakılmıyor.</p>`,
    kunye: [
      { label: 'İzin gereği', value: 'Bazı noktalarda geçici park ya da yol kullanım izni gerekiyor.' },
      { label: 'Başvuru', value: 'Gerekiyorsa taşıma gününden önce ekip tarafından yapılıyor.' },
      { label: 'Teklif', value: 'Süresi ve varsa bedeli ayrı satırda gösteriliyor.' },
    ],
    guzergahlar: [
      { to: 'Bandırma', note: 'Doğuya geçiş; kısa mesafe, iş aynı gün bitiyor.' },
      { to: 'Gönen', note: 'Güney yönü; yol süresi planlanıyor.' },
      { to: 'Balıkesir', note: 'İl merkezi; mesafe hesaba katılıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: 'Araç sokağımıza park edebilir mi?', answer: 'Adrese göre değişiyor. İzin gerekiyorsa başvuruyu taşıma gününden önce biz yapıyoruz.' },
      { question: 'İzin ücretli mi?', answer: 'Bedeli varsa teklifte ayrı satırda gösteriliyor; sonradan eklenmiyor.' },
      { question: 'İzin çıkmazsa ne oluyor?', answer: 'Alternatif bir durma noktası belirleyip yürüme mesafesini plana yazıyoruz.' },
    ],
  },

  {
    ad: 'Gönen',
    derinlik: 'orta',
    ozet:
      'Gönen’de teklif oda sayısına göre değil, ölçülen hacme göre çıkıyor; hesabın nasıl yapıldığı açıkça anlatılıyor.',
    metaAciklama:
      'Gönen evden eve nakliyat: eşya hacminin metreküp olarak ölçülmesi ve şeffaf hesap, yazılı sabit fiyat.',
    govde: `<p>Gönen’de sık duyduğumuz soru şu: “3+1 taşıması ne kadar?” Bu soruya tek bir rakamla cevap vermek doğru olmuyor, çünkü aynı oda sayısındaki iki evin eşya hacmi ikiye katlanabiliyor. Fiyatı belirleyen oda sayısı değil, araca giren hacim.</p><p>Keşifte büyük parçaların ölçülerini alıyor, koli sayısını tahmin ediyor ve toplamı metreküp olarak yazıyoruz. Gönen’de <strong>evden eve nakliyat</strong> teklifinde bu sayı görünür oluyor — hangi araca neden ihtiyaç duyulduğunu ve fiyatın nereden çıktığını birlikte görebiliyoruz.</p>`,
    kunye: [
      { label: 'Oda sayısı yetmez', value: 'Aynı oda sayısındaki iki evin hacmi ikiye katlanabiliyor.' },
      { label: 'Ölçüm', value: 'Büyük parçaların ölçüsü alınıyor, koli sayısı tahmin ediliyor.' },
      { label: 'Şeffaflık', value: 'Toplam hacim metreküp olarak teklifte görünüyor.' },
    ],
    guzergahlar: [
      { to: 'Bandırma', note: 'Kuzeydoğu aksı; günübirlik.' },
      { to: 'Erdek', note: 'Kuzey yönü; yol süresi planlanıyor.' },
      { to: 'Balıkesir', note: 'İl merkezi; mesafe hesaba katılıyor.' },
    ],
    mahalleler: [],
    sorular: [
      { question: '3+1 taşıması ne kadar?', answer: 'Oda sayısı tek başına yetmiyor. Aynı oda sayısındaki iki evin hacmi çok farklı olabiliyor; keşifte ölçüp söylüyoruz.' },
      { question: 'Hacmi nasıl hesaplıyorsunuz?', answer: 'Büyük parçaların ölçüsünü alıyor, koli sayısını tahmin ediyor ve toplamı metreküp olarak yazıyoruz.' },
      { question: 'Hesabı görebilir miyim?', answer: 'Görebilirsiniz. Toplam hacim teklifte yazılı oluyor.' },
    ],
  },
]

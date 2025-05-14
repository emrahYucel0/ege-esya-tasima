<template>
    <article class="policy-container">
      <!-- Header with Title and Metadata -->
      <PolicyHeader
        title="Gizlilik Politikası"
        :lastUpdated="new Date('2024-01-15')"
        :version="'2.3.1'"
        gradient="from-primary to-cyan-400"
        class="mb-12"
      />
  
      <!-- Table of Contents -->
      <Toc :sections="sections" class="mb-16 shadow-md rounded-lg p-6" />
  
      <!-- Main Content Sections -->
      <section class="space-y-24">
        <!-- 1. Kişisel Verilerin İşlenmesi -->
        <PolicySection
          icon="heroicons:document-text"
          title="1. Kişisel Verilerin İşlenmesi"
          id="verilerin-islenmesi"
        >
          <p class="mb-4">
            egeesya.com olarak kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz. Kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK)’na uygun olarak işlenmekte ve saklanmaktadır.
          </p>
          <p>
            KVKK uyarınca, egeesya.com ile paylaştığınız kişisel veriler, tamamen veya kısmen, otomatik olarak veya herhangi bir veri kayıt sisteminin parçası olmak kaydıyla otomatik olmayan yollarla elde edilerek, kaydedilerek, depolanarak, değiştirilerek, yeniden düzenlenerek; yani veriler üzerinde gerçekleştirilen her türlü işlem “kişisel verilerin işlenmesi” olarak kabul edilmektedir.
          </p>
        </PolicySection>
  
        <!-- 2. Kişisel Verilerin İşlenme Amaçları ve Hukuki Sebepleri -->
        <PolicySection
          icon="heroicons:document-text"
          title="2. Kişisel Verilerin İşlenme Amaçları ve Hukuki Sebepleri"
          id="islenme-amaclari"
        >
          <p class="mb-4">Paylaştığınız kişisel veriler, aşağıdaki amaçlarla işlenmektedir:</p>
          <ul class="list-disc pl-6 mb-4 text-gray-700">
            <li>Müşterilerimize verdiğimiz hizmetlerin gereklerini yerine getirmek, sözleşmenin ve teknolojinin gereklerine uygun hizmet sunmak, ürün ve hizmetlerimizi geliştirmek;</li>
            <li>Kamu güvenliğine ilişkin hususlarda ve hukuki uyuşmazlıklarda, talep halinde savcılıklara, mahkemelere ve ilgili kamu görevlilerine bilgi verebilmek;</li>
            <li>Üyelerimize çeşitli imkânlar sunabilmek veya bu imkânları sunabilecek kişi/kurumlarla yasal çerçevede paylaşım yapabilmek;</li>
            <li>Reklam tercihlerini analiz etmek;</li>
          </ul>
          <p>
            Tüm işlemler, 6698 sayılı KVKK ve ilgili ikincil düzenlemelere uygun olarak gerçekleştirilmektedir.
          </p>
        </PolicySection>
  
        <!-- 3. Üçüncü Kişilere Aktarım ve Çerez Politikası -->
        <PolicySection
          icon="heroicons:document-text"
          title="3. Üçüncü Kişilere Aktarım ve Çerez Politikası"
          id="aktarim"
        >
          <p class="mb-4">
            KVKK kapsamındaki amaçlarla, egeesya.com ile paylaştığınız kişisel verileriniz, ana hissedarlarımız, hissedarlarımız, reklam verenler, yurt içi/yurt dışı iştiraklerimiz; altyapımızı kullanan üye firmalar ve hizmetimizle ilişkili diğer kişi ve kuruluşlarla paylaşılabilir.
          </p>
          <p>
            Ayrıca, reklam amaçlı kullanılacak çerezler “egeesya.com Çerez Politikası” kapsamında değerlendirilmekte ve bu gizlilik politikasının bir parçası olarak uygulanmaktadır.
          </p>
        </PolicySection>
  
        <!-- 4. Kişisel Verilerin Toplanma Şekli -->
        <PolicySection
          icon="heroicons:document-text"
          title="4. Kişisel Verilerin Toplanma Şekli"
          id="toplanma-sekli"
        >
          <p class="mb-4">Kişisel verileriniz aşağıdaki yollarla toplanmaktadır:</p>
          <ul class="list-disc pl-6 text-gray-700">
            <li>egeesya.com internet sitesi ve mobil uygulamalarındaki formlar aracılığıyla (ad, soyad, adres, telefon, iş veya özel e-posta gibi);</li>
            <li>Kullanıcı adı ve şifre ile giriş yapılan sayfalarda, tercihlerin, IP kayıtlarının, çerez verilerinin, gezinme süresi ve detaylarının toplanması;</li>
            <li>Ticari ilişki kurma, iş başvurusu, teklif verme gibi amaçlarla, kartvizit, özgeçmiş, teklif vb. yollarla sağlanan veriler;</li>
            <li>Farklı kanallardan (web siteleri, bloglar, yarışmalar, anketler, oyunlar, kampanyalar, sosyal medya) dolaylı olarak elde edilen veriler.</li>
          </ul>
        </PolicySection>
  
        <!-- 5. KVKK Yürürlüğe Girmeden Önce Elde Edilen Veriler -->
        <PolicySection
          icon="heroicons:document-text"
          title="5. KVKK Yürürlüğe Girmeden Önce Elde Edilen Veriler"
          id="kvkk-oncesi"
        >
          <p>
            egeesya.com, KVKK’nın yürürlük tarihi olan 7 Nisan 2016’dan önce yayım hayatına başlamadığı için bu tarihten önce depolanan herhangi bir kişisel veri bulunmamaktadır.
          </p>
        </PolicySection>
  
        <!-- 6. Kişisel Verilerin Aktarılması -->
        <PolicySection
          icon="heroicons:document-text"
          title="6. Kişisel Verilerin Aktarılması"
          id="aktarim2"
        >
          <p class="mb-4">
            Türkiye’de işlenerek veya Türkiye dışında işlenip muhafaza edilmek üzere toplanan kişisel verileriniz,
            KVKK kapsamında kalmak koşuluyla, sözleşme amaçlarına uygun olarak yurtdışında bulunan ve yeterli korumanın sağlandığı ülkelere aktarılabilir.
          </p>
          <p class="mb-4">Kişisel verileriniz aşağıdaki durumlarda aktarılabilir:</p>
          <ul class="list-disc pl-6 text-gray-700">
            <li>Ürün ve hizmetlerin sunulması ve tanıtılması için işbirliği yapılan/ hizmet alınan iş ortaklarımıza,</li>
            <li>Acil yardım çağrısı halinde konumunuzu tespit edecek yetkili mercilere,</li>
            <li>Düzenleyici ve denetleyici kurumlar, mahkeme ve icra müdürlükleri gibi resmi kuruluşlara,</li>
            <li>egeesya.com ile ticari ilişki içinde bulunan ve telefon numaranıza sahip tüzel kişilere,</li>
            <li>Gerekli görüldüğü durumlarda diğer üçüncü şahıslara.</li>
          </ul>
        </PolicySection>
  
        <!-- 7. Kişisel Verilerin Saklanması ve Korunması -->
        <PolicySection
          icon="heroicons:document-text"
          title="7. Kişisel Verilerin Saklanması ve Korunması"
          id="saklama-koruma"
        >
          <p class="mb-4">
            egeesya.com, kişisel verilerinizin bulunduğu sistem ve veri tabanlarını, KVKK’nın 12. maddesi gereği, yetkisiz erişimleri engellemek, hukuka aykırı işlenmelerin önüne geçmek amacıyla hash, şifreleme, işlem kaydı, erişim yönetimi gibi yazılımsal tedbirlerin yanı sıra fiziksel güvenlik önlemleriyle korumaktadır.
          </p>
          <p>
            Kişisel verilerin yasal olmayan yollarla elde edilmesinin tespit edilmesi durumunda, derhal yasal düzenlemelere uygun olarak Kişisel Verileri Koruma Kurulu’na bildirilecektir.
          </p>
        </PolicySection>
  
        <!-- 8. Kişisel Verilerin Güncel ve Doğru Tutulması -->
        <PolicySection
          icon="heroicons:document-text"
          title="8. Kişisel Verilerin Güncel ve Doğru Tutulması"
          id="guncel-dogru"
        >
          <p>
            KVKK’nun 4. maddesi uyarınca, egeesya.com’un kişisel verilerinizi doğru ve güncel tutma yükümlülüğü bulunmaktadır. Bu kapsamda, üyelerimizin doğru ve güncel verilerini paylaşması veya web sitesi/mobil uygulama üzerinden güncellemesi gerekmektedir.
          </p>
        </PolicySection>
  
        <!-- 9. 6698 Sayılı KVKK Uyarınca Kişisel Veri Sahibinin Hakları -->
        <PolicySection
          icon="heroicons:document-text"
          title="9. 6698 Sayılı KVKK Uyarınca Kişisel Veri Sahibinin Hakları"
          id="haklar"
        >
          <p class="mb-4">
            6698 sayılı KVKK’nın 11. maddesi 07 Ekim 2016 tarihinde yürürlüğe girmiş olup, kişisel veri sahibi aşağıdaki haklara sahiptir:
          </p>
          <ul class="list-disc pl-6 text-gray-700">
            <li>Kişisel veri işlenip işlenmediğini öğrenme,</li>
            <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
            <li>Verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
            <li>Yurt içi veya yurt dışında verilerin aktarıldığı üçüncü kişileri bilme,</li>
            <li>Eksik veya yanlış işlenen verilerin düzeltilmesini isteme,</li>
            <li>KVKK’nın 7. maddesi çerçevesinde verilerin silinmesini veya yok edilmesini talep etme,</li>
            <li>Silme veya düzeltilen verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
            <li>Otomatik sistemler vasıtasıyla analiz sonucu ortaya çıkan kendinize zarar veren sonuçlara itiraz etme,</li>
            <li>Kanuna aykırı işlenme sebebiyle uğradığınız zararın giderilmesini talep etme.</li>
          </ul>
        </PolicySection>
  
        <!-- 10. İletişim ve Başvuru Yöntemi -->
        <PolicySection
          icon="heroicons:document-text"
          title="10. İletişim ve Başvuru Yöntemi"
          id="iletisim"
        >
          <p class="mb-4">
            egeesya.com tarafından atanacak Veri Sorumlusu Temsilcisi, yasal altyapı sağlandığında Veri Sorumluları Sicilinde ve bu belgenin bulunduğu internet adresinde ilan edilecektir.
          </p>
          <p class="mb-4">
            Kişisel veri sahipleri, sorularını, görüşlerini veya taleplerini <a href="mailto:info@egeesya.com" class="text-primary underline">info@egeesya.com</a> adresine yöneltebilirler.
          </p>
          <p class="mb-4">
            Taleplerinize, gerekçeli olmak ve 30 gün içerisinde yanıt vermek kaydıyla yazılı veya dijital ortamda olumlu/olumsuz bildirim yapılacaktır. İşlemlerin ücretsiz olması esas olmakla birlikte, maliyet gerektiren durumlarda ücret talep etme hakkı saklıdır. Bu ücretler, Kişisel Verilerin Korunması Kurulu’nun belirlediği tarife üzerinden hesaplanır.
          </p>
          <p>
            Web sayfamız, uygulamalarımız ve diğer kanallar üzerinden kişisel verilerinizi paylaşarak, Gizlilik ve Kişisel Verilerin Korunması Politikamızı kabul ettiğinizi beyan etmiş olursunuz.
          </p>
          
        </PolicySection>
      </section>
  
      <!-- Footer Navigation -->
      <PolicyFooter :links="footerLinks" class="mt-20" />
    </article>
  </template>
  
  <script setup>
  // Table of Contents Sections
  const sections = [
    'Kişisel Verilerin İşlenmesi',
    'İşlenme Amaçları ve Hukuki Sebepleri',
    'Üçüncü Kişilere Aktarım ve Çerez Politikası',
    'Kişisel Verilerin Toplanma Şekli',
    'KVKK Öncesi Veriler',
    'Kişisel Verilerin Aktarılması',
    'Kişisel Verilerin Saklanması ve Korunması',
    'Kişisel Verilerin Güncel ve Doğru Tutulması',
    'Kişisel Veri Sahibinin Hakları',
    'İletişim ve Başvuru Yöntemi'
  ];
  
  // Footer Links
  const footerLinks = [
    { text: 'Ana Sayfa', href: '/' },
    { text: 'Hizmet Şartları', href: '/terms' },
    { text: 'Çerez Politikası', href: '/cookies' },
    { text: 'İletişim', href: '/contact' }
  ];
  </script>
  
  <style scoped>
  .policy-container {
    @apply max-w-7xl mx-auto px-6 py-20 bg-white rounded-xl shadow-lg;
  }
  
  .section-subtitle {
    @apply text-2xl font-semibold text-gray-800 mt-10 mb-6 border-l-4 border-primary pl-4 tracking-tight;
  }
  
  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .policy-container {
      @apply px-4 py-12;
    }
  
    .section-subtitle {
      @apply text-xl;
    }
  }
  </style>
  
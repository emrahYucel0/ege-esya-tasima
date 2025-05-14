<template>
    <article class="policy-container">
      <!-- Header with Metadata -->
      <header class="policy-header">
        <h1 class="title">
          Kullanım Şartları
        </h1>
        <p class="subtitle">
          Son Güncelleme: {{ lastUpdated.toLocaleDateString('tr-TR') }} | Versiyon: 3.1.2
        </p>
      </header>
  
      <!-- Table of Contents -->
      <section class="toc-section">
        <h2 class="section-title">İçindekiler</h2>
        <Toc :sections="sections" class="toc-list" />
      </section>
  
      <!-- Main Policy Content -->
      <section class="policy-content">
        <!-- 01: Acceptance of Terms -->
        <div class="term-section group" id="acceptance">
          <div class="term-number">01</div>
          <div class="term-content">
            <h2 class="term-title">Şartların Kabulü</h2>
            <div class="term-description">
              <p>
                Bu Kullanım Şartları , egeesya.com tarafından sunulan web sitesi, mobil uygulama ve ilgili hizmetlerin ("Hizmet") kullanımını düzenler. Hizmeti kullanarak, bu Şartları ve ek politikalarımızı (Gizlilik Politikası, Çerez Politikası vb.) kabul etmiş sayılırsınız.
              </p>
              <ul class="term-list">
                <li>Şartlar, Hizmet'e erişim sağladığınız anda yürürlüğe girer.</li>
                <li>Şartları kabul etmiyorsanız, Hizmet'i kullanamazsınız.</li>
                <li>Şirket, Şartları dilediği zaman güncelleme hakkını saklı tutar; güncellemeler web sitemizde yayınlandığında geçerli olur.</li>
              </ul>
              <InfoCard type="warning" title="Önemli Not" class="mt-4">
                <p>Bu Şartlar bir yasal sözleşme niteliğindedir ve dikkatle okunmalıdır.</p>
              </InfoCard>
            </div>
          </div>
        </div>
  
        <!-- 02: Account Obligations -->
        <div class="term-section group" id="account">
          <div class="term-number">02</div>
          <div class="term-content">
            <h2 class="term-title">Hesap Yükümlülükleri</h2>
            <div class="term-description">
              <p>
                Hizmet'i tam olarak kullanabilmek için bir hesap oluşturmanız gerekebilir. Hesap oluştururken ve kullanırken aşağıdaki yükümlülüklere uymalısınız:
              </p>
              <ul class="term-list">
                <li>Kullanıcılar, gerçek, doğru ve güncel bilgiler sağlamakla yükümlüdür (ad, soyad, e-posta vb.).</li>
                <li>Sahte veya yanıltıcı profiller oluşturmak kesinlikle yasaktır.</li>
                <li>Hesap şifrenizin güvenliğinden ve hesabınız üzerinden yapılan tüm faaliyetlerden siz sorumlusunuz.</li>
                <li>Hesabınızın yetkisiz kullanımı durumunda derhal <a href="mailto:info@egeesya.com" class="text-primary underline">destek ekibimize</a> bildirimde bulunmalısınız.</li>
                <li>18 yaşından küçük kullanıcılar Hizmet'i yalnızca yasal vasi izniyle kullanabilir.</li>
              </ul>
              <ProcessTimeline title="Hesap Oluşturma Süreci" :steps="accountCreationSteps" class="mt-6" />
            </div>
          </div>
        </div>
  
        <!-- 03: Acceptable Use -->
        <div class="term-section group" id="usage">
          <div class="term-number">03</div>
          <div class="term-content">
            <h2 class="term-title">Kabul Edilebilir Kullanım</h2>
            <div class="term-description">
              <p>
                Hizmet'i kullanırken aşağıdaki kurallara uymalısınız. Aksi takdirde hesabınız askıya alınabilir veya sonlandırılabilir:
              </p>
              <ul class="term-list">
                <li>Hizmet'i yasa dışı amaçlarla kullanmak yasaktır (ör. dolandırıcılık, hacking).</li>
                <li>Başka kullanıcılara zarar verebilecek içerik yüklemek, paylaşmak veya yaymak yasaktır (ör. virüs, kötü amaçlı yazılım).</li>
                <li>Telif hakkı, ticari marka veya diğer fikri mülkiyet haklarını ihlal eden içerikler paylaşamazsınız.</li>
                <li>Spam, taciz, tehdit veya ayrımcı davranışlar sergileyemezsiniz.</li>
                <li>Hizmet'in altyapısına zarar verebilecek şekilde aşırı yükleme veya kötüye kullanım yapamazsınız.</li>
              </ul>
              <InfoCard type="danger" title="Yaptırımlar" class="mt-4">
                <p>Kurallara uymayan kullanıcıların hesapları haber verilmeksizin sonlandırılabilir.</p>
              </InfoCard>
            </div>
          </div>
        </div>
  
        <!-- 04: Intellectual Property -->
        <div class="term-section group" id="ip">
          <div class="term-number">04</div>
          <div class="term-content">
            <h2 class="term-title">Fikri Mülkiyet Hakları</h2>
            <div class="term-description">
              <p>
                Hizmet'teki tüm içerikler (metinler, logolar, tasarımlar, kodlar vb.) Şirket'e veya lisans verenlerine aittir ve fikri mülkiyet yasalarıyla korunmaktadır.
              </p>
              <ul class="term-list">
                <li>Hizmet içeriğini izinsiz kopyalamak, dağıtmak veya değiştirmek yasaktır.</li>
                <li>Kullanıcılar, Hizmet'e yükledikleri içeriklerin sahipliğini korur ancak Şirket'e bu içerikleri kullanma, saklama ve görüntüleme için sınırlı, geri alınabilir bir lisans verir.</li>
                <li>Fikri mülkiyet ihlali iddiaları için <a href="mailto:info@egeesya.com" class="text-primary underline">info@egeesya.com</a> adresine bildirimde bulunabilirsiniz.</li>
              </ul>
            </div>
          </div>
        </div>
  
        <!-- 05: Termination -->
        <div class="term-section group" id="termination">
          <div class="term-number">05</div>
          <div class="term-content">
            <h2 class="term-title">Hizmetin Sonlandırılması</h2>
            <div class="term-description">
              <p>
                Şirket, aşağıdaki durumlarda Hizmet'i sonlandırma veya hesabınızı kapatma hakkını saklı tutar:
              </p>
              <ul class="term-list">
                <li>Şartların ihlali durumunda.</li>
                <li>Yasal gereklilikler veya mahkeme kararı doğrultusunda.</li>
                <li>Hizmet'in genel olarak sona ermesi durumunda (ör. platformun kapanması).</li>
              </ul>
              <p class="mt-4">
                Kullanıcılar da diledikleri zaman hesaplarını kapatma hakkına sahiptir.
              </p>
            </div>
          </div>
        </div>
  
        <!-- 06: Limitation of Liability -->
        <div class="term-section group" id="liability">
          <div class="term-number">06</div>
          <div class="term-content">
            <h2 class="term-title">Sorumluluğun Sınırlandırılması</h2>
            <div class="term-description">
              <p>
                Hizmet "olduğu gibi" sağlanır ve Şirket, aşağıdaki durumlar için sorumluluk kabul etmez:
              </p>
              <ul class="term-list">
                <li>Hizmet'teki kesintiler, hatalar veya veri kayıpları.</li>
                <li>Kullanıcıların Hizmet'i yanlış veya yasa dışı kullanımı.</li>
                <li>Üçüncü taraf sistemlerinden kaynaklanan sorunlar (ör. internet sağlayıcıları).</li>
              </ul>
              <p class="mt-4">
                Şirket'in toplam sorumluluğu, kullanıcı tarafından son 12 ayda ödenen ücretlerle sınırlıdır.
              </p>
            </div>
          </div>
        </div>
  
        <!-- 07: Governing Law -->
        <div class="term-section group" id="law">
          <div class="term-number">07</div>
          <div class="term-content">
            <h2 class="term-title">Geçerli Hukuk ve Uyuşmazlık Çözümü</h2>
            <div class="term-description">
              <p>
                Bu Şartlar, Türkiye Cumhuriyeti yasalarına tabidir. Uyuşmazlık durumunda aşağıdaki kurallar geçerlidir:
              </p>
              <ul class="term-list">
                <li>Taraflar, uyuşmazlıkları dostane yollarla çözmeye çalışacaktır.</li>
                <li>Çözülemeyen uyuşmazlıklar için İstanbul Merkez Mahkemeleri ve İcra Daireleri yetkilidir.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Acceptance Box -->
      <div class="accept-box">
        <div class="checkbox-container">
          <input type="checkbox" id="acceptTerms" v-model="termsAccepted" />
          <label for="acceptTerms" class="checkbox-label">
            Kullanım Şartları'nı okudum ve kabul ediyorum.
          </label>
        </div>
        <button
          class="accept-button"
          :disabled="!termsAccepted"
          @click="submitAcceptance"
        >
          Onayla
          <Icon name="heroicons:check" class="w-5 h-5" />
        </button>
      </div>
  
      <!-- Contact Information -->
      <section class="contact-section">
        <h2 class="section-title">İletişim</h2>
        <p class="contact-text">
          Sorularınız için: <a href="mailto:info@egeesya.com" class="text-primary underline">info@egeesya.com</a>
        </p>
      </section>
    </article>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const lastUpdated = ref(new Date('2025-03-23'));
  const termsAccepted = ref(false);
  
  const sections = [
    { title: 'Şartların Kabulü', id: 'acceptance' },
    { title: 'Hesap Yükümlülükleri', id: 'account' },
    { title: 'Kabul Edilebilir Kullanım', id: 'usage' },
    { title: 'Fikri Mülkiyet Hakları', id: 'ip' },
    { title: 'Hizmetin Sonlandırılması', id: 'termination' },
    { title: 'Sorumluluğun Sınırlandırılması', id: 'liability' },
    { title: 'Geçerli Hukuk ve Uyuşmazlık Çözümü', id: 'law' },
  ];
  
  const accountCreationSteps = [
    { step: 'Kayıt Formu', description: 'Bilgilerinizi girin.' },
    { step: 'Doğrulama', description: 'E-posta veya SMS ile doğrulama yapın.' },
    { step: 'Hesap Aktivasyonu', description: 'Hesabınız kullanıma hazır.' },
  ];
  
  const submitAcceptance = () => {
    if (termsAccepted.value) {
      console.log('Terms accepted by user');
    }
  };
  </script>
  
  <style scoped>
  .policy-container {
    @apply max-w-6xl mx-auto px-6 py-16 bg-white rounded-xl shadow-lg;
  }
  
  /* Header */
  .policy-header {
    @apply text-center mb-12;
  }
  
  .title {
    @apply text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent;
  }
  
  .subtitle {
    @apply mt-2 text-gray-600 text-sm;
  }
  
  /* Table of Contents */
  .toc-section {
    @apply mb-12;
  }
  
  .toc-list {
    @apply bg-gray-50 p-6 rounded-xl shadow-sm;
  }
  
  /* Section Titles */
  .section-title {
    @apply text-2xl font-semibold text-gray-800 mb-6 border-l-4 border-amber-500 pl-3;
  }
  
  /* Terms Sections */
  .term-section {
    @apply flex gap-6 p-6 rounded-xl border border-gray-200 mb-6 hover:border-amber-400 transition-colors;
  }
  
  .term-number {
    @apply text-4xl font-bold text-gray-300 group-hover:text-amber-400 transition-colors;
  }
  
  .term-content {
    @apply flex-1;
  }
  
  .term-title {
    @apply text-xl font-semibold text-gray-900 mb-3;
  }
  
  .term-description {
    @apply text-gray-700 leading-relaxed;
  }
  
  .term-list {
    @apply list-disc pl-6 space-y-2 text-gray-700 mt-3;
  }
  
  /* Accept Box */
  .accept-box {
    @apply mt-12 p-6 bg-gray-50 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-6 shadow-sm;
  }
  
  .checkbox-container {
    @apply flex items-center gap-3;
  }
  
  .checkbox-label {
    @apply text-gray-700;
  }
  
  .accept-button {
    @apply flex items-center gap-2 px-8 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed;
  }
  
  /* Contact Section */
  .contact-section {
    @apply mt-12 text-center;
  }
  
  .contact-text {
    @apply text-gray-600;
  }
  
  /* Responsive Adjustments */
  @media (max-width: 768px) {
    .policy-container {
      @apply px-4 py-12;
    }
  
    .term-section {
      @apply flex-col;
    }
  
    .term-number {
      @apply text-3xl mb-4;
    }
  
    .accept-box {
      @apply flex-col;
    }
  }
  </style>
<template>
    <article class="policy-container">
      <!-- Başlık ve Güncelleme Bilgisi -->
      <header class="policy-header">
        <h1 class="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Çerez Politikası
        </h1>
        <p class="text-gray-400 mt-4">Son Güncellenme: 09/10/2024</p>
      </header>
  
      <!-- İçindekiler -->
      <nav class="toc">
        <h2 class="toc-title">İçindekiler</h2>
        <ul class="toc-list">
          <li v-for="section in sections" :key="section.id">
            <a :href="`#${section.id}`" class="toc-link">{{ section.title }}</a>
          </li>
        </ul>
      </nav>
  
      <!-- Ana İçerik -->
      <section class="policy-content">
        <!-- Giriş -->
        <div class="section-box">
          <p class="mb-6">
            Çerez Politikamız, <NuxtLink to="/gizlilik-politikasi" class="text-primary hover:underline">Gizlilik Politikamızın</NuxtLink> 
            bir parçasını oluşturur.
          </p>
        </div>
  
        <!-- Çerez Tanımı -->
        <section id="cookie-definition" class="section-box">
          <h2 class="section-title">
            <Icon name="heroicons:information-circle" class="section-icon" />
            Çerez (Cookie) Nedir?
          </h2>
          <div class="section-content">
            <p>Günümüzde neredeyse her web sitesi çerez kullanmaktadır. Size daha iyi, hızlı ve güvenli bir deneyim sağlamak için, çoğu internet sitesi gibi biz de çerezler kullanıyoruz. Çerez, bir web sitesini ziyaret ettiğinizde cihazınıza (örneğin; bilgisayar veya cep telefonu) depolanan küçük bir metin dosyasıdır.</p>
          </div>
        </section>
  
        <!-- Çerez Türleri -->
        <section id="cookie-types" class="section-box">
          <h2 class="section-title">
            <Icon name="heroicons:tag" class="section-icon" />
            Çerez Türleri
          </h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="type in cookieTypes" :key="type.title" 
                 class="type-card" :class="type.color">
              <div class="type-header">
                <Icon :name="type.icon" class="type-icon" />
                <h3 class="type-title">{{ type.title }}</h3>
              </div>
              <p class="type-description">{{ type.description }}</p>
            </div>
          </div>
        </section>
  
        <!-- Kullanım Amaçları -->
        <section id="usage-purposes" class="section-box">
          <h2 class="section-title">
            <Icon name="heroicons:chart-bar" class="section-icon" />
            Kullanım Amaçları
          </h2>
          <div class="usage-grid">
            <div v-for="purpose in usagePurposes" :key="purpose.title" 
                 class="usage-card">
              <h3 class="usage-title">{{ purpose.title }}</h3>
              <p class="usage-description">{{ purpose.description }}</p>
            </div>
          </div>
        </section>
  
        <!-- Reklam Çerezleri -->
        <section id="ad-cookies" class="section-box">
          <h2 class="section-title">
            <Icon name="heroicons:megaphone" class="section-icon" />
            Reklam Amaçlı Çerez Kullanımımız
          </h2>
          <div class="ad-content">
            <div class="warning-alert">
              <Icon name="heroicons:exclamation-triangle" class="alert-icon" />
              <p>Google Adsense ve üçüncü taraf çerezler kullanılmaktadır.</p>
            </div>
            <ul class="ad-list">
              <li>DoubleClick DART çerezleri</li>
              <li>Üçüncü taraf reklam şirketleri</li>
              <li>İlgi alanına dayalı reklamlar</li>
            </ul>
          </div>
        </section>
  
        <!-- Çerez Kontrol -->
        <section id="cookie-control" class="section-box">
          <h2 class="section-title">
            <Icon name="heroicons:cog" class="section-icon" />
            Çerezleri Kontrol Etme ve Silme
          </h2>
          <div class="browser-grid">
            <a v-for="browser in browsers" :key="browser.name" 
               :href="browser.link" target="_blank" 
               class="browser-card">
              <Icon :name="browser.icon" class="browser-icon" />
              <span>{{ browser.name }}</span>
            </a>
          </div>
        </section>
  
        <!-- Veri Toplama -->
        <section id="data-collection" class="section-box">
          <h2 class="section-title">
            <Icon name="heroicons:shield-exclamation" class="section-icon" />
            Toplanan Veriler
          </h2>
          <div class="data-accordion">
            <div v-for="item in dataItems" :key="item.title" class="accordion-item">
              <div class="accordion-header">
                <h3>{{ item.title }}</h3>
                <Icon name="heroicons:chevron-down" class="accordion-icon" />
              </div>
              <div class="accordion-content">
                <p>{{ item.content }}</p>
              </div>
            </div>
          </div>
        </section>
  
        <!-- Gömülü İçerik -->
        <section id="embedded-content" class="section-box">
          <div class="danger-alert">
            <Icon name="heroicons:lock-closed" class="alert-icon" />
            <p>Diğer sitelerden gömülen içerikler kendi çerez politikalarına tabidir</p>
          </div>
        </section>
  
        <!-- Veri Saklama -->
        <section id="data-retention" class="section-box">
          <h2 class="section-title">
            <Icon name="heroicons:clock" class="section-icon" />
            Veri Saklama
          </h2>
          <div class="retention-grid">
            <div v-for="retention in retentionPeriods" :key="retention.type" 
                 class="retention-card">
              <div class="retention-header">
                <Icon :name="retention.icon" class="retention-icon" />
                <h3>{{ retention.type }}</h3>
              </div>
              <p class="retention-period">{{ retention.period }}</p>
            </div>
          </div>
        </section>
  
        <!-- Kullanıcı Hakları -->
        <section id="user-rights" class="section-box">
          <h2 class="section-title">
            <Icon name="heroicons:user-circle" class="section-icon" />
            Haklarınız
          </h2>
          <div class="rights-grid">
            <div v-for="right in userRights" :key="right.title" 
                 class="right-card">
              <h3 class="right-title">{{ right.title }}</h3>
              <p class="right-description">{{ right.description }}</p>
            </div>
          </div>
        </section>
      </section>
  
      <!-- Yasal Çerçeve -->
      <footer class="policy-footer">
        <div class="legal-box">
          <h3 class="legal-title">Yasal Dayanak</h3>
          <div class="legal-content">
            <p>KVKK Madde 10 - Aydınlatma Yükümlülüğü</p>
            <p>GDPR Madde 13 - Bilgilendirme Yükümlülüğü</p>
          </div>
        </div>
        
        <div class="update-history">
          <h3 class="history-title">Güncelleme Geçmişi</h3>
          <ul class="history-list">
            <li>v1.0 - 25/03/2025 - İlk yayın</li>
            <li>v0.5 - 20/03/2025 - Taslak versiyon</li>
          </ul>
        </div>
  
        <div class="action-buttons">
          <button class="print-button" @click="printPolicy">
            <Icon name="heroicons:printer" class="button-icon" />
            Yazdır
          </button>
          <NuxtLink to="/" class="home-link">
            <Icon name="heroicons:arrow-uturn-left" class="button-icon" />
            Ana Sayfaya Dön
          </NuxtLink>
        </div>
      </footer>
    </article>
  </template>
  
  <script setup>
  // Veri yapıları
  const sections = [
    { id: 'cookie-definition', title: 'Çerez Tanımı' },
    { id: 'cookie-types', title: 'Çerez Türleri' },
    { id: 'usage-purposes', title: 'Kullanım Amaçları' },
    { id: 'ad-cookies', title: 'Reklam Çerezleri' },
    { id: 'cookie-control', title: 'Çerez Kontrolü' },
    { id: 'data-collection', title: 'Veri Toplama' },
    { id: 'embedded-content', title: 'Gömülü İçerik' },
    { id: 'data-retention', title: 'Veri Saklama' },
    { id: 'user-rights', title: 'Kullanıcı Hakları' }
  ];
  
  const cookieTypes = [
    {
      title: 'Oturum Çerezleri',
      icon: 'heroicons:document-arrow-up',
      color: 'bg-blue-50 border-blue-200',
      description: 'Sayfalar arası geçiş ve kullanıcı bilgilerinin hatırlanması'
    },
    {
      title: 'Performans Çerezleri',
      icon: 'heroicons:chart-pie',
      color: 'bg-purple-50 border-purple-200',
      description: 'Site performans analizi ve iyileştirmeler'
    },
    {
      title: 'Fonksiyonel Çerezler',
      icon: 'heroicons:wrench-screwdriver',
      color: 'bg-green-50 border-green-200',
      description: 'Kullanıcı tercihlerinin kaydedilmesi'
    },
    {
      title: 'Reklam Çerezleri',
      icon: 'heroicons:megaphone',
      color: 'bg-orange-50 border-orange-200',
      description: 'Hedefli reklam ve pazarlama faaliyetleri'
    }
  ];
  
  const browsers = [
    { name: 'Google Chrome', icon: 'logos:chrome', link: 'https://support.google.com/chrome/answer/95647' },
    { name: 'Mozilla Firefox', icon: 'logos:firefox', link: 'https://support.mozilla.org/kb/cookies-information-websites-store-on-your-computer' },
    { name: 'Safari', icon: 'logos:safari', link: 'https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac' },
    { name: 'Microsoft Edge', icon: 'logos:microsoft-edge', link: 'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09' }
  ];
  
  const retentionPeriods = [
    { type: 'Yorum Verileri', period: 'Süresiz', icon: 'heroicons:chat-bubble-left' },
    { type: 'Medya Dosyaları', period: '2 Yıl', icon: 'heroicons:photo' },
    { type: 'İletişim Formları', period: '6 Ay', icon: 'heroicons:envelope' },
    { type: 'Analiz Verileri', period: '3 Yıl', icon: 'heroicons:chart-bar' }
  ];
  
  const userRights = [
    { 
      title: 'Erişim Hakkı', 
      description: 'Kişisel verilerinize erişim talep etme hakkı' 
    },
    { 
      title: 'Düzeltme Hakkı', 
      description: 'Yanlış verilerin düzeltilmesini isteme hakkı' 
    }
  ];
  
  const printPolicy = () => {
    window.print();
  };
  </script>
  
  <style scoped>
  .policy-container {
    @apply max-w-7xl mx-auto px-4 py-12 bg-white text-gray-800;
  }
  
  .policy-header {
    @apply text-center mb-12 border-b pb-8;
  }
  
  .toc {
    @apply bg-gray-50 p-6 rounded-lg mb-12;
  }
  
  .section-box {
    @apply mb-12 p-6 bg-white rounded-xl shadow-sm border border-gray-100;
  }
  
  .type-card {
    @apply p-6 rounded-lg border;
  }
  
  .usage-grid {
    @apply grid md:grid-cols-2 gap-6;
  }
  
  .browser-grid {
    @apply grid grid-cols-2 md:grid-cols-4 gap-4;
  }
  
  .data-accordion {
    @apply space-y-4;
  }
  
  .retention-grid {
    @apply grid md:grid-cols-4 gap-4;
  }
  
  .rights-grid {
    @apply grid md:grid-cols-2 gap-6;
  }
  
  .warning-alert {
    @apply bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg flex items-start gap-3 mb-6;
  }
  
  .danger-alert {
    @apply bg-red-50 border-l-4 border-red-400 p-4 rounded-lg flex items-start gap-3 mb-6;
  }
  
  .action-buttons {
    @apply flex flex-col sm:flex-row gap-4 mt-8;
  }
  
  /* Detaylı stillendirmeler */
  .section-title {
    @apply text-2xl font-semibold mb-6 flex items-center gap-3 text-gray-900;
  }
  
  .section-icon {
    @apply w-6 h-6 text-primary;
  }
  
  .type-header {
    @apply flex items-center gap-3 mb-4;
  }
  
  .type-icon {
    @apply w-8 h-8 p-1.5 rounded-lg bg-primary text-primary;
  }
  
  .usage-card {
    @apply p-4 bg-gray-50 rounded-lg;
  }
  
  .browser-card {
    @apply p-4 flex flex-col items-center gap-2 border rounded-lg hover:bg-gray-50 transition-colors;
  }
  
  .accordion-header {
    @apply flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg;
  }
  
  .retention-card {
    @apply p-4 text-center border rounded-lg;
  }
  
  .right-card {
    @apply p-6 bg-gray-50 rounded-lg hover:shadow-sm transition-shadow;
  }
  
  .legal-box {
    @apply p-6 bg-gray-50 rounded-lg mt-8;
  }
  
  .print-button {
    @apply px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary flex items-center gap-2;
  }
  
  .home-link {
    @apply px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary flex items-center gap-2;
  }
  
  @media (max-width: 768px) {
    .policy-container {
      @apply px-3;
    }
    
    .section-title {
      @apply text-xl;
    }
  }
  
  @media print {
    .action-buttons, .toc {
      @apply hidden;
    }
    
    .policy-container {
      @apply max-w-none shadow-none p-0;
    }
    
    .section-box {
      @apply border-none shadow-none;
    }
  }
  </style>
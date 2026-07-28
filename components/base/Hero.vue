<template>
  <section
    class="hero relative overflow-hidden pt-[calc(4rem-30px)] md:pt-[calc(4rem-30px)] md:pb-16 lg:pt-[calc(8rem-30px)] lg:pb-0"
  >
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <NuxtImg
        v-if="heroData.backgroundImage"
        :src="heroData.backgroundImage"
        alt="Evden eve nakliyat arka plan görseli"
        class="w-full h-full object-cover object-center"
        provider="imgix"
        format="webp"
        quality="60"
        loading="lazy"
        sizes="sm:100vw md:100vw lg:100vw xl:100vw 2xl:1536px"
        decoding="async"
        fetchpriority="high"
      />
      <div v-else class="w-full h-full bg-gray-300"></div>
      <div class="absolute inset-0 bg-primary/50 backdrop-blur-sm"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center min-h-[600px] lg:min-h-[700px]">
        <!-- Text Content -->
        <div class="lg:w-5/12 mb-10 lg:mb-0 text-center lg:text-left lg:self-center">
          <div class="intro-excerpt">
            <h1
              class="text-white font-bold text-4xl xl:text-[54px] mb-8 leading-tight"
            >
              {{ heroData.title || "Evden Eve Nakliyat:" }}<br />
              <span class="block">{{
                heroData.subtitle ||
                "Hızlı, Güvenilir ve Profesyonel Taşımacılık"
              }}</span>
            </h1>
            <p class="text-white/90 mb-6 lg:mb-8 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {{
                heroData.description ||
                "Yeni bir eve taşınmanın heyecanını yaşarken, eşyalarınızın güvenliği ve taşınma sürecinin stresi gözünüzü korkutmasın. Firmamız, İstanbul evden eve nakliyat sektöründeki köklü deneyimiyle, bu zorlu süreci sizler için başından sona kadar kolay ve sorunsuz bir deneyime dönüştürüyor. Alanında uzman ekibimiz ve modern taşıma tekniklerimizle, güvenilir evden eve nakliyat hizmetinin kapılarını aralıyoruz. Sunduğumuz sigortalı nakliyat güvencesi ile tüm eşyalarınızı titizlikle paketliyor, potansiyel hasarlara karşı koruma altına alıyoruz. Yüksek katlarda bile hızlı ve emniyetli çözümler sunan asansörlü nakliyat seçeneğimizle, taşınma işlemini maksimum verimlilikle gerçekleştiriyoruz. Sadece İstanbul içi değil, şehirler arası nakliyat hizmetimizle de Türkiye'nin dört bir yanına güvenle taşınmanızı sağlıyoruz. Şeffaf fiyat politikamız gereği, evden eve nakliyat fiyatları hakkında bilgi almak ve size özel ücretsiz ekspertiz hizmetimizden yararlanmak için bizimle hemen iletişime geçin. Profesyonel, hızlı ve stressiz bir taşınma deneyimi için doğru adrestesiniz."
              }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <NuxtLink
                v-if="heroData.primaryLink && heroData.primaryButton"
                :to="heroData.primaryLink"
                class="btn btn-secondary"
              >
                {{ heroData.primaryButton }}
              </NuxtLink>
              <NuxtLink
                v-if="heroData.secondaryLink && heroData.secondaryButton"
                :to="heroData.secondaryLink"
                class="btn btn-white-outline"
              >
                {{ heroData.secondaryButton }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Hero Image -->
        <div class="lg:w-7/12 relative mt-8 lg:mt-0 lg:self-end">
          <div class="hero-img-wrap">
            <NuxtImg
              v-if="heroData.image"
              :src="heroData.image"
              alt="Evden eve nakliyat kamyonu ve hizmet görseli"
              class="hero-image"
              provider="imgix"
              format="webp"
              quality="70"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 780px"
              decoding="async"
              fetchpriority="high"
            />
            <div v-else class="w-full h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Fetch hero data from API
const { data: heroResponse } = await useFetch("/api/hero");

// Set default values if no data exists
const heroData = ref({
  title: "",
  subtitle: "",
  description: "",
  primaryButton: "",
  primaryLink: "",
  secondaryButton: "",
  secondaryLink: "",
  image: "",
  backgroundImage: "",
  ...heroResponse.value?.data,
});

// Fallback to default values if API returns null
if (!heroResponse.value?.data) {
  heroData.value = {
    title: "Evenakliye.com İle",
    subtitle: "Güvenli ve Profesyonel Nakliyat",
    description:
      "Evden eve taşınma süreci gözünüzde büyümesin. Eşyalarınızı sigortalı, ambalajlı ve uzman ekibimizle yeni adresinize güvenle taşıyoruz.",
    primaryButton: "Ücretsiz Teklif Al",
    primaryLink: "/iletisim",
    secondaryButton: "Hizmetlerimizi Keşfet",
    secondaryLink: "/blog",
    image: "/images/nakliye3.png",
    backgroundImage: "/images/nakliye2.jpg",
  };
}
</script>

<style scoped>
.hero {
  min-height: 600px;
}

.hero-image {
  width: 100%;
  height: auto;
  max-width: 100%;
  box-shadow: -5px  rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 5;
}

/* Mobile: Görsel sağ alt köşede, küçük boyut */
@media (max-width: 640px) {
  .hero-image {
    max-width: 280px;
    margin-left: auto;
    margin-right: -20px;
    margin-bottom: -30px;
  }
}

/* Tablet: Görsel sağ alt köşede, orta boyut */
@media (min-width: 641px) and (max-width: 1023px) {
  .hero-image {
    max-width: 400px;
    margin-left: auto;
    margin-right: -40px;
    margin-bottom: -60px;
  }
}

/* Desktop: Görsel sağ alt köşeye konumlandırılmış */
@media (min-width: 1024px) {
  .hero {
    min-height: 700px;
  }
  
  .hero-image {
    max-width: 580px;
    margin-left: auto;
    margin-right: -80px;
    /* margin-bottom: -120px; */
  }
}

/* Large Desktop: Daha fazla sağa kaydırma */
@media (min-width: 1280px) {
  .hero-image {
    max-width: 680px;
    margin-right: -120px;
    /* margin-bottom: -150px; */
  }
}

/* Extra Large Desktop: Maksimum sağa kaydırma */
@media (min-width: 1536px) {
  .hero-image {
    max-width: 780px;
    margin-right: -150px;
    /* margin-bottom: -180px; */
  }
}

/* Ultra Wide Desktop */
@media (min-width: 1920px) {
  .hero-image {
    margin-right: -200px;
    /* margin-bottom: -220px; */
  }
}

/* Fallback styles when Tailwind not available */
.hero-img-wrap img {
  max-width: 100%;
  height: auto;
}
</style>
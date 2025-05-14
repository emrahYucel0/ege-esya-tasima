<script setup>
const { data, pending, error } = await useFetch("/api/about");
const {
  data: postData,
  pending: postPending,
  error: postError,
} = await useFetch("/api/posts");
const {
  data: regionData,
  pending: regionPending,
  error: regionError,
} = await useFetch("/api/regions");

const posts = computed(() =>
  postData.value && postData.value.success ? postData.value.data : []
);
const recentPosts = computed(() => posts.value.slice(0, 10));
const regions = computed(() =>
  regionData.value && regionData.value.success ? regionData.value.data : []
);
const recentRegions = computed(() => regions.value.slice(0, 20));

const regionColors = [
  "bg-gradient-to-r from-stone-600 to-stone-800",
  "bg-gradient-to-r from-stone-500 to-stone-700",
  "bg-gradient-to-r from-stone-400 to-stone-600",
  "bg-gradient-to-r from-stone-500 to-stone-800",
  "bg-gradient-to-r from-stone-600 to-stone-900",
  "bg-gradient-to-r from-stone-700 to-stone-900",
];

// Sample fallback data (for testing or if API fails)
const fallbackAbout = {
  title: "Ege Eşya Taşıma",
  subtitle: "Güvenli, Hızlı ve Profesyonel Hizmet",
  content: `
    <p>Ege Eşya Taşıma olarak, taşınma sürecini zahmetsiz ve sorunsuz hale getirmek için buradayız. Yılların verdiği deneyim ve müşteri memnuniyeti odaklı hizmet anlayışımız ile taşınma stresini minimuma indiriyoruz. Modern ekipmanlarımız ve alanında uzman ekibimizle, eşyalarınızı güvenli bir şekilde yeni adresinize ulaştırıyoruz.</p>
    <p>Şehir içi ve şehirler arası taşımacılık hizmetimizle, her türlü taşınma ihtiyacınıza çözüm sunuyoruz. Ambalajlama, montaj ve taşıma süreçlerinde yüksek kalite standartları ile hizmet veriyoruz. Müşteri odaklı yaklaşımımız sayesinde, her adımda sizin konforunuzu düşünüyor ve profesyonel destek sağlıyoruz.</p>
    <p>Taşınırken yaşanabilecek her türlü riski önlemek için sigortalı taşıma hizmeti sunuyoruz. Eşyalarınızı koruma altına alıyor, özenli ve dikkatli taşıma prensibimizle güvenliğinizi sağlıyoruz. Hedefimiz, taşınma sürecini sizin için kolay, hızlı ve güvenilir bir hale getirmektir.</p>
  `,
  image: "/img/ege-esya-tasima-genel-anasayfa.jpg",
};
</script>

<template>
  <div class="container mx-auto my-20 px-4 py-8 overflow-hidden">
    <div class="grid grid-cols-1 md:grid-cols-10 gap-8">
      <main
        class="md:col-span-7 bg-white p-6 rounded-lg shadow-lg border border-stone-100"
      >
        <template v-if="pending">
          <p class="text-stone-600">Yükleniyor...</p>
        </template>
        <template v-else-if="error">
          <p class="text-red-600">
            Üzgünüz, bir hata oluştu. Lütfen daha sonra tekrar deneyin.
          </p>
        </template>
        <template v-else>
          <h2
            class="text-4xl font-serif italic text-stone-600 mb-4 text-center"
          >
            {{ data?.title || fallbackAbout.title }}
          </h2>
          <h3 class="text-2xl font-serif text-stone-600 mb-8 text-center">
            {{ data?.subtitle || fallbackAbout.subtitle }}
          </h3>
          <NuxtImg
            provider="imgix"
            format="webp"
            quality="70"
            sizes="sm:100vw md:100vw lg:100vw xl:100vw 2xl:1536px"
            decoding="async"
            fetchpriority="high"
            :src="data?.image || fallbackAbout.image"
            :title="data?.title || fallbackAbout.title"
            alt="Hakkımızda görseli"
            class="w-full h-120 object-cover rounded-lg mb-8 shadow-md"
          />
          <div
            v-html="data?.content || fallbackAbout.content"
            class="text-stone-700 leading-relaxed prose max-w-none"
          ></div>
        </template>
      </main>

      <aside
        class="md:col-span-3 bg-stone-50 p-6 rounded-lg shadow-lg border border-stone-100"
      >
        <section class="mb-12">
          <h4 class="text-2xl font-medium text-stone-800 mb-6">
            Son Blog Yazıları
          </h4>
          <template v-if="postPending">
            <p class="text-stone-600">Blog yazıları yükleniyor...</p>
          </template>
          <template v-else-if="postError">
            <p class="text-red-600">
              Üzgünüz, blog verisi alınırken bir hata oluştu.
            </p>
          </template>
          <template v-else>
            <ul class="space-y-4">
              <li v-for="post in recentPosts" :key="post.id">
                <NuxtLink
                  :to="`/${post.slug}`"
                  :aria-label="`${post.shortTitle} yazısını oku`"
                  class="flex items-center text-stone-700 hover:text-stone-900 transition-colors group"
                >
                  <span
                    class="h-px w-4 bg-stone-400 mr-2 transition-all group-hover:w-6 group-hover:bg-stone-600"
                  ></span>
                  {{ post.shortTitle }}
                </NuxtLink>
              </li>
            </ul>
          </template>
        </section>

        <section>
          <h4 class="text-2xl font-medium text-stone-800 mb-6">
            Hizmet Bölgelerimiz
          </h4>
          <div class="flex flex-wrap gap-3">
            <NuxtLink
              v-for="(region, index) in recentRegions"
              :key="region.id"
              :to="`/${region.slug}`"
              :aria-label="`${region.shortTitle} Sayfası`"
              :class="regionColors[index % regionColors.length]"
              class="text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-lg hover:scale-105 transition"
            >
              {{ region.subtitle }}
            </NuxtLink>
          </div>
        </section>
      </aside>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-family: "Georgia", serif;
}

.prose {
  line-height: 1.75;
}

.prose :where(p):not(:where([class~="not-prose"] *)) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}

.prose :where(h2):not(:where([class~="not-prose"] *)) {
  font-size: 1.5em;
  margin-top: 2em;
  margin-bottom: 1em;
  line-height: 1.333;
}

@media (max-width: 640px) {
  .container {
    max-width: 90%;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .grid {
    gap: 2rem;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .transition,
  .hover\:scale-105 {
    transition: none;
    transform: none;
  }
}
</style>
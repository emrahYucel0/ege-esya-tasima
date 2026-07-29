<script setup>
const cardData = ref(null);
const cards = ref([]);
const isLoading = ref(true);

const { data: cardResponse, error } = await useFetch("/api/card", {});
const data = computed(() => cardResponse.value?.data ?? null);

const { brandName } = await useSiteSettings();

if (!error.value && data.value) {
  cardData.value = {
    title: data.value?.title || "Eşyalarınız Özenle Taşınır",
    subtitle: data.value?.subtitle || "Premium Nakliye Hizmetleri",
    blockquote:
      data.value?.blockquote ||
      `"Gerçekten profesyonel bir nakliye hizmeti farkını yaşamaya hazır mısınız? Bugün ${brandName.value}'ya ulaşarak size özel bir teklif alın ve yeni başlangıcınıza odaklanırken detayları bize bırakın."`,
    image: data.value?.image || "/img/ege-esya-tasima-servisler.jpg",
  };
  const transformedCards = (data.value?.cards || []).map((cardItem) => ({
    icon: cardItem.iconPath,
    title: cardItem.title,
    description: cardItem.description,
  }));
  cards.value = transformedCards;
} else {
  console.log("Hata:", error.value);
}
isLoading.value = false;

let cardObserver = null;

onMounted(() => {
  const observerOptions = { threshold: 0.1 };
  cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        cardObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".service-card").forEach((card) => {
    card.classList.add("before-animate");
    cardObserver.observe(card);
  });
});

// Bileşen unmount olduğunda (henüz görünüme girmemiş kartlar varsa)
// observer'ı da kapatmazsak artık DOM'da olmayan elementleri
// gözlemlemeye devam eden bir referans bellekte asılı kalır.
onUnmounted(() => {
  cardObserver?.disconnect();
});
</script>

<template>
  <section id="ycl-card" class="ycl-card min-h-screen relative overflow-hidden">
    <div class="relative z-10 container mx-auto">
      <div class="text-center mb-10">
        <div
          class="inline-block bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-md border border-stone-200/50 mb-5"
        >
          <p
            class="text-xl uppercase tracking-wider text-stone-800 font-medium my-auto"
          >
            {{ cardData?.subtitle || "" }}
          </p>
        </div>
        <h2
          v-if="cardData?.title"
          class="text-4xl lg:text-5xl font-semibold text-stone-800 font-serif italic leading-tight"
        >
          {{ cardData.title.split(" ")[0] }}
          <span class="font-serif italic text-stone-600">{{
            cardData.title.split(" ")[1]
          }}</span>
          {{ cardData.title.split(" ")[2] }}
        </h2>
      </div>
      <div class="mb-10 text-center">
        <p
          class="text-stone-800 text-lg leading-relaxed contrast-more:text-stone-900 max-w-6xl mx-auto"
        >
          {{ brandName }} olarak, eşyalarınızın sadece eşya olmadığını
          biliyoruz; onlar sizin anılarınız, yatırımlarınız ve hayatınızın bir
          parçası. Bu yüzden profesyonel ekibimiz, en son lojistik teknolojileri
          ve titiz taşıma teknikleriyle her bir parçanızın yeni adresinize
          kusursuz bir şekilde ve tam zamanında ulaşmasını sağlıyor.
        </p>
      </div>

      <div v-if="isLoading" class="text-center text-stone-600">
        Yükleniyor...
      </div>
      <div v-else-if="error" class="text-center text-red-600">
        Veri yüklenirken bir hata oluştu: {{ error.message }}
      </div>
      <div v-else class="flex flex-col items-center space-y-8 md:space-y-0">
        <div
          class="service-card group relative bg-white p-8 rounded-xl transition-all duration-500 hover:shadow-xl max-w-md md:hidden"
        >
          <div
            class="number-indicator absolute -top-4 right-4 w-8 h-8 bg-primary z-50 text-white rounded-full flex items-center justify-center text-sm transition-all"
          >
            2
          </div>
          <div class="icon-container mb-6">
            <svg
              class="w-12 h-12 text-stone-600 group-hover:text-stone-800 transition-colors"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path v-if="cards?.[1]?.icon" :d="cards[1].icon" />
              <path v-else d="M12 12h.01" />
            </svg>
          </div>
          <h3 class="text-xl font-medium mb-4 text-stone-800">
            {{ cards?.[1]?.title || "Başlık Yok" }}
          </h3>
          <p class="text-stone-800 leading-relaxed">
            {{ cards?.[1]?.description || "Açıklama Yok" }}
          </p>
          <div
            class="absolute inset-0 border border-stone-200/50 rounded-xl transition-all group-hover:border-stone-300 pointer-events-none"
          ></div>
        </div>

        <div
          class="flex flex-col lg:flex-row justify-between w-full space-y-8 lg:space-y-0 lg:space-x-8 items-center"
        >
          <div
            class="service-card group relative bg-white p-8 rounded-xl transition-all duration-500 hover:shadow-xl w-full max-w-md lg:max-w-sm xl:max-w-md"
          >
            <div
              class="number-indicator absolute -top-4 right-4 w-8 h-8 bg-primary z-50 text-white rounded-full flex items-center justify-center text-sm transition-all"
            >
              1
            </div>
            <div class="icon-container mb-6">
              <svg
                class="w-12 h-12 text-stone-600 group-hover:text-stone-800 transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path v-if="cards?.[0]?.icon" :d="cards[0].icon" />
                <path v-else d="M12 12h.01" />
              </svg>
            </div>
            <h3 class="text-xl font-medium mb-4 text-stone-800">
              {{ cards?.[0]?.title || "Başlık Yok" }}
            </h3>
            <p class="text-stone-600 leading-relaxed">
              {{ cards?.[0]?.description || "Açıklama Yok" }}
            </p>
            <div
              class="absolute inset-0 border border-stone-200/50 rounded-xl transition-all group-hover:border-stone-300 pointer-events-none"
            ></div>
          </div>

          <div class="central-image w-full max-w-md my-8 lg:my-0 lg:mx-4">
            <NuxtImg
              provider="imgix"
              :src="cardData?.image || '/img/ege-esya-tasima-servisler.jpg'"
              :alt="`Profesyonel Taşıma Hizmetleri - ${brandName}`"
              :title="`${brandName} ile Güvenli ve Hızlı Taşınma`"
              class="w-full h-64 lg:h-80 rounded-xl shadow-lg"
              format="webp"
              quality="70"
              sizes="sm:100vw md:100vw lg:100vw xl:100vw 2xl:1536px"
              decoding="async"
              loading="lazy"
            />
          </div>

          <div
            class="service-card group relative bg-white p-8 rounded-xl transition-all duration-500 hover:shadow-xl w-full max-w-md lg:max-w-sm xl:max-w-md"
          >
            <div
              class="number-indicator absolute -top-4 right-4 w-8 h-8 bg-primary z-50 text-white rounded-full flex items-center justify-center text-sm transition-all"
            >
              3
            </div>
            <div class="icon-container mb-6">
              <svg
                class="w-12 h-12 text-stone-600 group-hover:text-stone-800 transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path v-if="cards?.[2]?.icon" :d="cards[2].icon" />
                <path v-else d="M12 12h.01" />
              </svg>
            </div>
            <h3 class="text-xl font-medium mb-4 text-stone-800">
              {{ cards?.[2]?.title || "Başlık Yok" }}
            </h3>
            <p class="text-stone-600 leading-relaxed">
              {{ cards?.[2]?.description || "Açıklama Yok" }}
            </p>
            <div
              class="absolute inset-0 border border-stone-200/50 rounded-xl transition-all group-hover:border-stone-300 pointer-events-none"
            ></div>
          </div>
        </div>

        <div
          class="service-card group relative bg-white p-8 rounded-xl transition-all duration-500 hover:shadow-xl max-w-md hidden lg:block"
        >
          <div
            class="number-indicator absolute -top-4 right-4 w-8 h-8 bg-primary z-50 text-white rounded-full flex items-center justify-center text-sm transition-all"
          >
            2
          </div>
          <div class="icon-container mb-6">
            <svg
              class="w-12 h-12 text-stone-600 group-hover:text-stone-800 transition-colors"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path v-if="cards?.[1]?.icon" :d="cards[1].icon" />
              <path v-else d="M12 12h.01" />
            </svg>
          </div>
          <h3 class="text-xl font-medium mb-4 text-stone-800">
            {{ cards?.[1]?.title || "Başlık Yok" }}
          </h3>
          <p class="text-stone-800 leading-relaxed">
            {{ cards?.[1]?.description || "Açıklama Yok" }}
          </p>
          <div
            class="absolute inset-0 border border-stone-200/50 rounded-xl transition-all group-hover:border-stone-300 pointer-events-none"
          ></div>
        </div>

        <div class="text-center w-full">
          <blockquote
            class="relative max-w-2xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-md border-l-4 border-stone-400/50 mt-12 lg:mt-20"
          >
            <p class="text-stone-800 leading-relaxed italic">
              {{ cardData?.blockquote || "" }}
            </p>
            <div
              class="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-stone-800 rounded-full flex items-center justify-center text-white text-sm font-medium"
            >
              <svg
                class="w-3 h-3"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-label="tırnak işareti"
              >
                <path
                  d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.403c-2.469 1.228-4.996 4.046-4.996 8.206v7.391h-4.983zm-10.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.403c-2.469 1.228-4.996 4.046-4.996 8.206v7.391h-4.999z"
                />
              </svg>
            </div>
          </blockquote>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.before-animate {
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.service-card {
  box-shadow: rgba(0, 0, 0, 0.2) 0px 60px 40px -7px;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease,
    border-color 0.3s ease;
}
.service-card:hover {
  transform: translateY(-8px) scale(1.02);
}

.number-indicator {
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.08);
  transition: background-color 0.4s ease, transform 0.4s ease;
}
.group:hover .number-indicator {
  background-color: #57534e;
  transform: scale(1.1);
}

svg {
  stroke-dasharray: 24;
  stroke-dashoffset: 24;
  animation: drawStroke 0.6s ease-out forwards;
}
@keyframes drawStroke {
  to {
    stroke-dashoffset: 0;
  }
}

blockquote {
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
blockquote:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
blockquote svg {
  transition: transform 0.3s ease;
}
blockquote:hover svg {
  transform: scale(1.2);
}

@media (min-width: 768px) and (max-width: 1024px) {
  .ycl-card .container {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  .central-image {
    order: -1;
    margin-bottom: 2rem;
    max-width: 100%;
  }

  .flex-col.lg\:flex-row {
    flex-direction: column;
    align-items: center;
  }

  .service-card {
    width: 100%;
    max-width: 28rem;
    margin-bottom: 1.5rem;
  }

  .lg\:space-x-8 {
    margin-left: 0;
    margin-right: 0;
  }

  .hidden.lg\:block {
    display: none;
  }

  .md\:hidden {
    display: block;
  }
}

@media (max-width: 767px) {
  .ycl-card .container {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }

  h2 {
    font-size: 2rem;
    line-height: 1.2;
  }

  .service-card {
    padding: 1.5rem;
  }
}
</style>

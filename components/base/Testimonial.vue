<script setup>
import { useFetch } from "#app";
import { gsap } from "gsap";

const { data, error } = await useFetch("/api/testimonial", {
  default: () => ({ title: "", subtitle: "", testimonialDetails: [] }),
});

const testimonials = ref([]);
const sectionTitle = ref("");
const sectionSubtitle = ref("");
const currentIndex = ref(0);
const titleRef = ref(null);

if (data.value) {
  sectionTitle.value = data.value.title || "Müşterilerimizin Yorumları";
  sectionSubtitle.value = data.value.subtitle || "Yorumlar";
  testimonials.value = data.value.testimonialDetails || [];
}

if (error.value) {
  console.error("Veri çekme hatası:", error.value);
}

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % testimonials.value.length;
  animateSlide();
};

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + testimonials.value.length) %
    testimonials.value.length;
  animateSlide();
};

const animateSlide = () => {
  gsap.fromTo(
    ".testimonial-item.active",
    { opacity: 0, x: 50 },
    { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
  );
};

onMounted(() => {
  animateSlide();
  const titleElement = titleRef.value;
  const text = titleElement.textContent.trim();
  titleElement.textContent = "";
  const letters = text.split("");

  letters.forEach((letter) => {
    const span = document.createElement("span");
    if (letter === " ") {
      span.innerHTML = "&nbsp;";
    } else {
      span.textContent = letter;
    }
    span.style.display = "inline-block";
    titleElement.appendChild(span);
  });

  const tl = gsap.fromTo(
    titleElement.children,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      ease: "back.out(1.7)",
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: titleElement,
        start: "top 90%",
        end: "bottom 60%",
        toggleActions: "play none reverse none",
        markers: false,
      },
    }
  );
});
</script>

<template>
  <section
    id="ycl-testimonial"
    class="ycl-testimonial lg:py-[120px] relative overflow-hidden"
  >
    <div
      class="relative py-60"
      :style="{
        backgroundImage: `url(/img/ege-esya-tasima-yorum.jpg)`,
        backgroundPosition: 'bottom right',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto',
      }"
      lang="tr"
    >
      <div class="container mx-auto px-5 lg:px-0 overflow-hidden">
        <div
          class="flex flex-col items-center gap-y-6 mb-10 md:mb-20 text-center"
        >
          <div
            class="inline-block bg-white backdrop-blur-sm px-6 py-3 rounded-full shadow-sm mb-6"
          >
            <p
              class="text-2xl uppercase tracking-widest text-stone-900 block my-auto animate-bounce"
            >
              {{ sectionSubtitle || "Yorumlar" }}
            </p>
          </div>

          <h2
            ref="titleRef"
            class="text-3xl md:text-5xl lg:text-[56px] italic font-bold text-stone-100 w-full text-center"
          >
            {{ sectionTitle || "Müşteri Yorumları" }}
          </h2>
        </div>

        <div class="relative w-full reveal-me">
          <div class="swiper-container overflow-hidden">
            <div
              class="flex transition-transform duration-700 ease-in-out"
              :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
            >
              <article
                v-for="(testimonial, index) in testimonials"
                :key="testimonial.id"
                class="testimonial-item flex-shrink-0 w-full bg-white border border-stone-200 p-8 md:p-12 flex gap-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                :class="{ active: index === currentIndex }"
                itemscope
                itemtype="http://schema.org/Review"
              >
                <div class="hidden md:block flex-grow-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                    aria-hidden="true"
                    aria-label="Tırnak simgesi sol"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M23.8286 6V16.9714C21.3264 16.9714 16.9186 17.1793 16.9184 27.1958V32.4H27.6V54H6V32.4V27.1958C6 19.3208 8.03795 13.4729 12.4905 9.81413C15.5705 7.28323 19.2195 6 23.8286 6ZM50.229 6V16.9714C47.7268 16.9714 43.319 17.1793 43.3187 27.1958V32.4H54.0004V54H32.4004V32.4V27.1958C32.4004 19.3208 34.4383 13.4729 38.8909 9.81413C41.9709 7.28323 45.6199 6 50.229 6Z"
                      fill="#57534e"
                      fill-opacity="0.1"
                    />
                  </svg>
                </div>

                <div class="flex-1">
                  <p
                    class="text-lg md:text-xl text-stone-600 leading-relaxed mb-8"
                  >
                    {{ testimonial.description || "Bu harika bir hizmetti!" }}
                  </p>

                  <div class="flex justify-between items-center">
                    <div class="flex items-center gap-4">
                      <div
                        class="w-14 h-14 rounded-full bg-stone-100 border-2 border-stone-200 flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-6 h-6 text-stone-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 class="text-xl font-medium text-stone-800">
                          {{ testimonial.name || "Hasan GÜZEL" }}
                        </h3>
                        <p class="text-sm text-stone-500">
                          {{ testimonial.profession || "Avukat" }}
                        </p>
                      </div>
                    </div>

                    <div class="hidden md:block self-end">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="60"
                        viewBox="0 0 60 60"
                        fill="none"
                        aria-hidden="true"
                        aria-label="Tırnak simgesi kapatma"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M36.1714 54L36.1714 43.0286C38.6736 43.0286 43.0814 42.8207 43.0816 32.8042L43.0816 27.6L32.4 27.6L32.4 6L54 6L54 27.6L54 32.8042C54 40.6792 51.9621 46.5271 47.5095 50.1859C44.4295 52.7168 40.7805 54 36.1714 54ZM9.77104 54L9.77104 43.0286C12.2732 43.0286 16.681 42.8207 16.6812 32.8042L16.6812 27.6L5.99961 27.6L5.99961 6L27.5996 6L27.5996 27.6L27.5996 32.8042C27.5996 40.6792 25.5617 46.5271 21.1091 50.1859C18.0291 52.7168 14.3801 54 9.77104 54Z"
                          fill="#57534e"
                          fill-opacity="0.1"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <button
            @click="prevSlide"
            class="absolute top-[calc(50%+40px)] md:top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-stone-600 text-white p-2 md:p-3 rounded-full hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-300 z-10 transition-colors shadow-md"
            aria-label="Önceki Testimonial"
          >
            <svg
              class="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            @click="nextSlide"
            class="absolute top-[calc(50%+40px)] md:top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-stone-600 text-white p-2 md:p-3 rounded-full hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-300 z-10 transition-colors shadow-md"
            aria-label="Sonraki Testimonial"
          >
            <svg
              class="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonial-item {
  min-width: 100%;
  transition: opacity 0.3s ease-in-out;
}

h2 {
  font-family: "Georgia", serif;
}

.reveal-me {
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}

@media (max-width: 640px) {
  .container {
    max-width: 95%;
  }

  .ycl-testimonial .relative.py-60 {
    padding-top: 80px;
    padding-bottom: 80px;
  }

  .testimonial-item {
    padding: 1.5rem;
  }
}
</style>

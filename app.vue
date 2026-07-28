<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const showScrollButton = ref(false);

const handleScroll = () => {
  showScrollButton.value = window.scrollY > 100;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));

useHead({
  link: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon.ico.png",
    },
  ],
});
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <a
      href="https://wa.me/905326454289?text=Merhaba"
      target="_blank"
      class="whatsapp-button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-label="whatsapp ikonu"
        alt="whatsapp simgesi"
        width="32"
        height="32"
        fill="white"
        viewBox="0 0 16 16"
      >
        <path
          d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"
        />
      </svg>
    </a>

    <button
      v-if="showScrollButton"
      aria-label="Sayfayı yukarı kaydırma butonu"
      aria-labelledby="Sayfayı yukarı kaydırma butonu"
      @click="scrollToTop"
      class="scroll-to-top"
    >
      ⬆
    </button>
  </div>
</template>

<style>
.whatsapp-button {
  position: fixed;
  bottom: 120px;
  right: 25px;
  width: 60px;
  height: 60px;
  background-color: #25d366;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
}

.whatsapp-button:hover {
  background-color: #1ebe5d;
  transform: scale(1.1);
}

.scroll-to-top {
  position: fixed;
  bottom: 30px;
  right: 25px;
  width: 60px;
  height: 60px;
  font-size: 2rem;

  background-color: #000;
  color: var(--primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  cursor: pointer;
  border: none;
  outline: none;
  opacity: 0.9;
  z-index: 999;
}

* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  background-attachment: fixed;

  background-color: #ece8e3;

  background-image:
    /* Üst sağ damar */
    radial-gradient(
      ellipse 1200px 180px at 110% 10%,
      rgba(125,125,125,.18) 0%,
      rgba(125,125,125,.14) 18%,
      transparent 42%
    ),

    /* Alt sağ damar */
    radial-gradient(
      ellipse 1400px 220px at 105% 95%,
      rgba(120,120,120,.18) 0%,
      rgba(120,120,120,.13) 18%,
      transparent 45%
    ),

    /* İnce damarlar */
    linear-gradient(
      -18deg,
      transparent 0%,
      transparent 18%,
      rgba(165,165,165,.10) 21%,
      transparent 24%,
      transparent 44%,
      rgba(180,180,180,.08) 47%,
      transparent 50%,
      transparent 100%
    ),

    /* Genel mermer dokusu */
    linear-gradient(
      -18deg,
      #f7f5f2 0%,
      #efebe6 20%,
      #ece8e3 40%,
      #f5f3f0 60%,
      #ebe7e2 80%,
      #f8f7f5 100%
    );

  background-size:
    cover,
    cover,
    100% 100%,
    cover;

  background-repeat: no-repeat;
}

.section-title {
  color: black; }

blockquote {
  position: relative;
  padding: 20px 30px;
  margin: 30px 0;
  font-size: 1.2rem;
  font-style: italic;
  color: #555;
  border-radius: 8px;
}

blockquote p {
  margin: 0;
}

blockquote::before,
blockquote::after {
  content: '"';
  font-size: 2rem;
  color: yellow;
  position: absolute;
}

blockquote::before {
  top: 10px;
  left: 10px;
}

blockquote::after {
  bottom: 10px;
  right: 10px;
}
</style>

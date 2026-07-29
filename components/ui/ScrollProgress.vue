<script setup>
/**
 * UiScrollProgress — sayfanın en üstünde ince bir okuma ilerleme çubuğu.
 *
 * İki katmanlı uygulama:
 *
 * 1. Destekleyen tarayıcılarda `animation-timeline: scroll()` kullanılır —
 *    animasyon tamamen tarayıcının compositor'ında çalışır, HİÇ JavaScript
 *    çalışmaz, scroll listener yoktur. En performanslı yol budur.
 *
 * 2. Desteklemeyenlerde, passive bir scroll listener + rAF ile aynı CSS
 *    değişkeni güncellenir. Listener yalnızca gerektiğinde bağlanır.
 *
 * Erişilebilirlik: tamamen dekoratiftir, ekran okuyucudan gizlenir.
 */
import { onMounted, onUnmounted, ref } from 'vue'

const bar = ref(null)
const usesJs = ref(false)

let frame = 0

const update = () => {
  if (frame) return
  frame = requestAnimationFrame(() => {
    frame = 0
    const doc = document.documentElement
    const scrollable = doc.scrollHeight - doc.clientHeight
    const progress = scrollable > 0 ? doc.scrollTop / scrollable : 0
    bar.value?.style.setProperty('--progress', String(progress))
  })
}

onMounted(() => {
  const supportsScrollTimeline =
    typeof CSS !== 'undefined' && CSS.supports?.('animation-timeline: scroll()')
  if (supportsScrollTimeline) return

  usesJs.value = true
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update, { passive: true })
  update()
})

onUnmounted(() => {
  if (frame) cancelAnimationFrame(frame)
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
})
</script>

<template>
  <div class="scroll-progress" aria-hidden="true">
    <div ref="bar" class="scroll-progress__bar" :class="{ 'is-js': usesJs }" />
  </div>
</template>

<style scoped>
.scroll-progress {
  position: fixed;
  inset: 0 0 auto 0;
  height: 3px;
  z-index: var(--z-header);
  pointer-events: none;
  background: transparent;
}

.scroll-progress__bar {
  height: 100%;
  transform-origin: 0 50%;
  background: linear-gradient(
    90deg,
    rgb(var(--c-brand-600)),
    rgb(var(--c-accent-400))
  );
  /* Varsayılan: CSS scroll timeline. --progress kullanılmaz. */
  transform: scaleX(0);
  animation: scroll-progress linear both;
  animation-timeline: scroll(root block);
}

/* Tarayıcı scroll timeline desteklemiyorsa JS --progress'i günceller. */
.scroll-progress__bar.is-js {
  animation: none;
  transform: scaleX(var(--progress, 0));
}

@keyframes scroll-progress {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-progress {
    display: none;
  }
}
</style>

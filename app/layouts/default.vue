<template>
  <!--
    ATLAMA BAĞLANTISI (skip link) — klavyeyle gezinen kullanıcı için.
    Sayfaya her girişte 5 menü bağlantısını tek tek geçmek zorunda
    kalınıyordu; artık ilk Tab bu bağlantıyı odaklıyor ve doğrudan içeriğe
    atlıyor (WCAG 2.4.1 "Bypass Blocks"). Yalnızca odaklanınca görünür.

    Hedef sarmalayıcı `<main>` DEĞİL çünkü <main> her sayfada yok;
    burada tanımlanan `#icerik` her düzende garanti.
  -->
  <a href="#icerik" class="skip-link">İçeriğe geç</a>

  <ui-scroll-progress />
  <fixed-navbar />

  <div id="icerik" tabindex="-1">
    <slot />
  </div>

  <fixed-footer />
</template>

<style scoped>
.skip-link {
  position: fixed;
  top: 0.75rem;
  left: 0.75rem;
  z-index: var(--z-modal);
  padding: 0.75rem 1.25rem;
  border-radius: var(--r-md);
  background: rgb(var(--c-brand-700));
  color: rgb(var(--c-ink-inverse));
  font-weight: 600;
  box-shadow: var(--shadow-lg);
  /* Ekran dışında bekler; `display: none` DEĞİL çünkü o hâlde
     odaklanamaz ve bağlantı hiç işe yaramaz. */
  transform: translateY(-150%);
  transition: transform var(--dur-fast) var(--ease-out);
}

.skip-link:focus-visible {
  transform: translateY(0);
}

/* Odaklandığı anda görünmesi gereken tek öğe bu olduğu için, sarmalayıcıya
   `tabindex="-1"` yüzünden gelen tarayıcı odak halkası istenmiyor. */
#icerik:focus {
  outline: none;
}
</style>

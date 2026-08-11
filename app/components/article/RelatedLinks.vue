<script setup>
/**
 * İLGİLİ İÇERİK KÖPRÜSÜ — yazı sayfalarından hizmet ve bölge sayfalarına.
 *
 * NEDEN VAR
 * Ölçüldü: bölge sayfalarında 47, hizmet sayfalarında 34 benzersiz iç bağlantı
 * varken blog yazılarında yalnızca 9 vardı ve hepsi genel sayfalara
 * (/blog, /hakkimizda, /iletisim) gidiyordu. 120 bölge ve 7 hizmet sayfasına
 * TEK bir bağlantı yoktu. Yazılar konu otoritesi üretiyor ama o otorite
 * hiçbir yere akmıyordu.
 *
 * Bağlantılar RASTGELE değil: hizmetler yazının metniyle eşleştiriliyor
 * (bkz. üst bileşendeki eşleştirme), bölgeler ise alfabetik ilk sıradan
 * alınıyor. Böylece hem okuyucu için anlamlı hem de her yazı farklı
 * hizmetlere bağlanıyor.
 */
defineProps({
  services: { type: Array, default: () => [] },
  regions: { type: Array, default: () => [] },
})

const bolgeAdi = (r) => r.subtitle || r.shortTitle || r.title
</script>

<template>
  <!-- KOŞULSUZ render: eskiden hizmet ve bölge listesi boşken kutu hiç
       çizilmiyordu. Fiyat aracı bağlantısı her yazıda görünmeli, o yüzden
       kutunun varlığı artık eşleşen içeriğe bağlı değil. -->
  <aside class="ilgili" aria-labelledby="ilgili-baslik">
    <h2 id="ilgili-baslik" class="ilgili__baslik">Bu konuyla ilgili sayfalarımız</h2>

    <div v-if="services.length" class="ilgili__blok">
      <h3 class="ilgili__alt">Hizmetler</h3>
      <ul class="ilgili__liste">
        <li v-for="s in services" :key="s.slug">
          <NuxtLink :to="`/${s.slug}`" class="ilgili__bag">
            <span class="ilgili__ad">{{ s.title }}</span>
            <span v-if="s.subtitle" class="ilgili__not">{{ s.subtitle }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>

    <div v-if="regions.length" class="ilgili__blok">
      <h3 class="ilgili__alt">Hizmet bölgelerimiz</h3>
      <ul class="ilgili__etiketler">
        <li v-for="r in regions" :key="r.slug">
          <NuxtLink :to="`/${r.slug}`" class="ilgili__etiket">{{ bolgeAdi(r) }}</NuxtLink>
        </li>
      </ul>
      <NuxtLink to="/bolgelerimiz" class="ilgili__tumu">
        Tüm hizmet bölgelerimiz
        <ui-icon name="arrow-right" :size="16" class="nudge-x" />
      </NuxtLink>
    </div>

    <!-- Fiyat aracına köprü: yazıyı okuyan ziyaretçinin bir sonraki sorusu
         çoğunlukla "peki ne tutar?" oluyor. -->
    <p class="ilgili__hesap">
      <base-price-link />
    </p>
  </aside>
</template>

<style scoped>
.ilgili {
  margin-top: var(--space-block);
  padding: 1.5rem;
  border: 1px solid rgb(var(--c-line));
  border-radius: var(--r-2xl);
  background: rgb(var(--c-surface-muted));
}

.ilgili__baslik {
  font-size: clamp(1.125rem, 1rem + 0.5vw, 1.375rem);
  font-weight: 700;
  color: rgb(var(--c-ink));
}

.ilgili__blok + .ilgili__blok {
  margin-top: 1.5rem;
}

.ilgili__alt {
  margin: 1.25rem 0 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgb(var(--c-ink-muted));
}

.ilgili__liste {
  display: grid;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
}

.ilgili__bag {
  display: block;
  padding: 0.75rem 1rem;
  border: 1px solid rgb(var(--c-line));
  border-radius: var(--r-xl);
  background: rgb(var(--c-surface));
  transition: border-color var(--dur-fast) var(--ease-soft);
}

.ilgili__bag:hover {
  border-color: rgb(var(--c-brand-600) / 0.45);
}

.ilgili__ad {
  display: block;
  font-weight: 600;
  color: rgb(var(--c-brand-800));
}

.ilgili__not {
  display: block;
  margin-top: 0.125rem;
  font-size: 0.875rem;
  color: rgb(var(--c-ink-muted));
}

.ilgili__etiketler {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.ilgili__etiket {
  display: inline-block;
  padding: 0.4375rem 0.875rem;
  border: 1px solid rgb(var(--c-line));
  border-radius: var(--r-full);
  background: rgb(var(--c-surface));
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(var(--c-ink));
  transition:
    border-color var(--dur-fast) var(--ease-soft),
    color var(--dur-fast) var(--ease-soft);
}

.ilgili__etiket:hover {
  border-color: rgb(var(--c-brand-600) / 0.45);
  color: rgb(var(--c-brand-800));
}

.ilgili__tumu {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: 1rem;
  font-weight: 600;
  color: rgb(var(--c-brand-700));
}

.ilgili__tumu:hover {
  text-decoration: underline;
}

.ilgili__hesap {
  margin: 1.5rem 0 0;
}
</style>

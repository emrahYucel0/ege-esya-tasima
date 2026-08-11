<script setup>
/**
 * FİYAT HESAPLAMA — ayrı sayfa.
 *
 * NEDEN ANA SAYFAYA GÖMÜLMEDİ
 * Nakliyat aramalarının büyük kısmı fiyat niyetli ("nakliyat fiyatları",
 * "evden eve nakliyat ne kadar"). Ayrı sayfa olarak:
 *   - o aramalarda kendi başına sıralanabiliyor,
 *   - dışarıdan bağlantı alabiliyor (araçlar doğal bağlantı çeker),
 *   - 120 bölge sayfasının hepsinden bağlantı verilebilecek bir hedef oluyor.
 * Ana sayfaya gömülseydi bunların hiçbiri olmazdı.
 */
const { brandName } = await usePageSeo('fiyat-hesaplama', sayfaMetasi('fiyat-hesaplama'))

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: () =>
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Nakliyat Fiyat Hesaplama',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          // Araç ücretsiz; Google'ın "fiyat" beklentisini karşılamak için açıkça belirtiliyor.
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
          provider: { '@type': 'Organization', name: brandName.value },
        }),
    },
  ],
})
</script>

<template>
  <main>
    <ui-section tone="surface" labelledby="fh-baslik">
      <!-- `as="h1"`: bu sayfada başka h1 yok. Öncesinde başlık h2 olarak
           basılıyordu, yani sayfanın hiç h1'i yoktu. -->
      <ui-heading
        id="fh-baslik"
        as="h1"
        eyebrow="Fiyat Hesaplama"
        title="Taşınma Maliyetinizi Tahmin Edin"
        description="Birkaç soruyla yaklaşık bir aralık görün. Kesin fiyat, ücretsiz keşif sonrasında netleşir."
      />

      <base-price-estimator class="mt-8" />
    </ui-section>

    <ui-section tone="muted" labelledby="fh-neler">
      <h2 id="fh-neler" class="text-h2 text-ink">Nakliyat Fiyatını Ne Belirler?</h2>

      <div class="fh-kartlar">
        <article>
          <h3>Eşya miktarı</h3>
          <p>
            Fiyatın taban değerini belirleyen ilk etken. 1+1 bir daire ile 4+1 bir ev arasında
            hem araç hacmi hem ekip sayısı değişiyor.
          </p>
        </article>
        <article>
          <h3>Kat ve asansör</h3>
          <p>
            Asansörsüz her kat, taşıma süresini ve ekip yükünü artırıyor. Yük asansörü olmayan
            yüksek katlarda dış cephe asansörü devreye giriyor.
          </p>
        </article>
        <article>
          <h3>Mesafe</h3>
          <p>
            Şehir içi taşımalar çoğunlukla tek günde biterken şehirler arası taşımada yakıt,
            konaklama ve ambalaj standardı yükseliyor.
          </p>
        </article>
        <article>
          <h3>Ek hizmetler</h3>
          <p>
            Paketlemenin ekip tarafından yapılması, mobilya söküm-montajı ve depolama ihtiyacı
            toplam maliyeti değiştiriyor.
          </p>
        </article>
      </div>

      <p class="fh-not">
        Bu sayfadaki hesaplama bir <strong>ön tahmindir</strong>. Nakliyatta kesin fiyat, eşyaların
        yerinde görülmesiyle netleşir — bu yüzden keşif ücretsizdir ve hiçbir yükümlülük doğurmaz.
      </p>
    </ui-section>
  </main>
</template>

<style scoped>
.fh-kartlar {
  display: grid;
  gap: 1.25rem;
  margin-top: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}

.fh-kartlar article {
  padding: 1.5rem;
  border: 1px solid rgb(var(--c-line));
  border-radius: var(--r-2xl);
  background: rgb(var(--c-surface));
}

.fh-kartlar h3 {
  font-size: 1.0625rem;
  font-weight: 700;
  color: rgb(var(--c-ink));
}

.fh-kartlar p {
  margin-top: 0.5rem;
  color: rgb(var(--c-ink-muted));
  line-height: 1.7;
  text-wrap: pretty;
}

.fh-not {
  max-width: 60ch;
  margin-top: 2rem;
  padding: 1.25rem 1.5rem;
  border-left: 3px solid rgb(var(--c-brand-600));
  background: rgb(var(--c-surface));
  border-radius: var(--r-lg);
  color: rgb(var(--c-ink-muted));
  line-height: 1.7;
}
</style>

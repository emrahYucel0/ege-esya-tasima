<script setup>
/**
 * FİYATLANDIRMA — üç paket kartı.
 *
 * DÜZELTİLEN HATALAR
 *
 * 1. KARTIN DIŞINA TAŞAN ROZET. "EN ÇOK TERCİH" etiketi
 *    `absolute top-5 right-3 rotate-12 translate-x-2 -translate-y-2` ile
 *    kartın köşesinden dışarı sarkıyordu; kartın `overflow-hidden`'ı onu
 *    kırptığı için bazı ekranlarda yazının bir kısmı kesiliyordu. Artık
 *    kartın içinde, döndürülmemiş normal bir etiket.
 *
 * 2. İKİ AYRI BAYRAK. `isFeatured` ve `isPopular` neredeyse aynı işi
 *    yapıyordu ve veritabanında ikisi de aynı plana işaretlenmiş. Rolleri
 *    net ayrıldı: `isPopular` ETİKETİ gösterir, `isFeatured` kartın
 *    GÖRSEL VURGUSUNU (marka çerçevesi + derin gölge) belirler. İkisi
 *    birlikte de kullanılabilir, ayrı ayrı da.
 *
 * 3. SABİT RENKLER. `#3b5d50`, `#f8f9fa`, `#2d473d` doğrudan yazılıydı;
 *    hepsi design system token'larına bağlandı.
 *
 * 4. ÖLÜ CSS. Bileşenin <style> bloğunda hiçbir yerde kullanılmayan bir
 *    `.skeleton-loading` animasyonu ve `.sr-only` tanımı vardı (Tailwind
 *    zaten `sr-only` sağlıyor). Kaldırıldı.
 *
 * MOBİLDE SIRALAMA — bilinçli karar
 * Öne çıkan planı mobilde en üste almayı düşündüm ama uygulamadım:
 * CSS `order` görsel sırayı değiştirirken DOM sırasını değiştirmez, bu da
 * klavyeyle gezinen ve ekran okuyucu kullanan kişide "gördüğüm sıra ile
 * gezdiğim sıra farklı" durumuna yol açar. Üç kart için bu takas
 * değmez; öne çıkan kart zaten etiketi ve çerçevesiyle net ayrışıyor.
 */
import { computed } from 'vue'

const { data: pricingResponse, error: fetchError } = await useFetch('/api/pricing-section')
const data = computed(() => pricingResponse.value?.data ?? null)

const plans = computed(() => data.value?.pricingPlans || [])
const mainTitle = computed(() => data.value?.mainTitle || 'Şeffaf Nakliyat Fiyatları')
const description = computed(() => data.value?.description || '')

const sectionRef = ref(null)
useReveal(sectionRef)
</script>

<template>
  <ui-section id="fiyatlandirma" ref="sectionRef" tone="surface" labelledby="fiyat-baslik">
    <div v-if="fetchError" class="card p-8 text-center text-ink-muted">
      <p>Fiyatlandırma verileri yüklenirken bir sorun oluştu.</p>
    </div>

    <template v-else>
      <ui-heading
        id="fiyat-baslik"
        eyebrow="Fiyatlandırma"
        :title="mainTitle"
        :description="description"
        align="split"
      />

      <base-empty-state
        v-if="!plans.length"
        message="Henüz yayınlanmış bir fiyatlandırma planı bulunmuyor."
      />

      <div v-else data-reveal-group class="grid gap-6 md:grid-cols-3 md:gap-7 lg:gap-8">
        <ui-card
          v-for="plan in plans"
          :key="plan.id"
          data-reveal
          padding="none"
          as="article"
          :featured="plan.isFeatured"
          class="flex flex-col"
        >
          <div class="flex flex-1 flex-col p-6 sm:p-7">
            <!-- Etiket alanı her kartta yer tutar; böylece etiketi olan ve
                 olmayan kartların başlıkları aynı hizada başlar. -->
            <div class="mb-4 h-6">
              <span v-if="plan.isPopular" class="plan-badge">
                <ui-icon name="star" :size="13" />
                En Çok Tercih Edilen
              </span>
            </div>

            <h3 class="text-h3 text-ink">{{ plan.name }}</h3>
            <p v-if="plan.subtitle" class="mt-2 text-pretty text-sm text-ink-muted">
              {{ plan.subtitle }}
            </p>

            <p class="mt-6 border-t border-line pt-6">
              <span class="text-stat text-brand-600">{{ plan.price }}</span><span
                class="text-sm text-ink-muted"
                >{{ plan.priceSuffix }}</span
              >
            </p>

            <!-- Dahil OLMAYAN özellik soluklaştırılıyor ama okunaksız hâle
                 getirilmiyor: `ink-subtle` beyaz zeminde 3.04:1 veriyor,
                 WCAG AA normal metin eşiği 4.5:1. Vurgu farkı zaten üstü
                 çizili yazı ve ✕ ikonuyla kuruluyor. -->
            <ul v-if="plan.features?.length" class="mt-6 flex flex-1 flex-col gap-3">
              <li
                v-for="feature in plan.features"
                :key="feature.id"
                class="flex items-start gap-2.5 text-sm"
                :class="feature.isIncluded ? 'text-ink' : 'text-ink-muted'"
              >
                <ui-icon
                  :name="feature.isIncluded ? 'check' : 'close'"
                  :size="18"
                  :stroke="2"
                  class="mt-0.5"
                  :class="feature.isIncluded ? 'text-brand-600' : 'text-ink-subtle'"
                />
                <span :class="{ 'line-through': !feature.isIncluded }">{{ feature.text }}</span>
              </li>
            </ul>

            <!--
              Etiket GÖRÜNÜR METİNLE BAŞLAMALI (WCAG 2.5.3 "Label in Name").
              Öncesinde panelden gelen `buttonAriaLabel` doğrudan kullanılıyordu
              ve içinde butonun görünen yazısı geçmiyordu:
                  görünen : "Detaylı Bilgi"
                  etiket  : "Standart Ev Taşıma Paketi detayları"
              Sesle kontrol kullanan biri "Detaylı Bilgi'ye tıkla" dediğinde
              hiçbir eşleşme olmuyordu. Panelden gelen metin artık ek bağlam
              olarak SONA ekleniyor; başta her zaman görünen yazı var.
            -->
            <div class="mt-8">
              <ui-button
                :to="plan.buttonLink || '/iletisim'"
                :variant="plan.isFeatured ? 'primary' : 'outline'"
                block
                :aria-label="`${plan.buttonText} — ${plan.buttonAriaLabel || plan.name}`"
              >
                {{ plan.buttonText }}
              </ui-button>
            </div>
          </div>
        </ui-card>
      </div>

      <!--
        FİYAT ARACINA KÖPRÜ — `plans` koşulunun DIŞINDA.
        Paket kartlarının içine konsaydı plan girilmemiş sitede bağlantı
        kaybolurdu; aynı hatayı bölge sayfalarında bir kez yaptım (bkz.
        RegionView). Ziyaretçi paketlere baktıktan sonra "peki benimki ne
        tutar?" diye soruyor — köprünün doğru yeri burası.
      -->
      <p class="mt-10 text-center">
        <base-price-link label="Kendi taşınmanız için tahmini fiyat alın" />
      </p>
    </template>
  </ui-section>
</template>

<style scoped>
.plan-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  border-radius: var(--r-full);
  background: rgb(var(--c-accent-400) / 0.16);
  color: rgb(var(--c-accent-800));
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.25rem;
  white-space: nowrap;
}
</style>

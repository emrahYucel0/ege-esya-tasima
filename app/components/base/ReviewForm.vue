<script setup>
/**
 * MÜŞTERİ YORUM FORMU.
 *
 * Gönderilen yorum ANINDA YAYINLANMAZ; yönetici onayından geçer. Bu bilgi
 * kullanıcıya açıkça söyleniyor — yorumunu göremeyince "kayboldu" sanmasın.
 *
 * Onay şartı sadece spam önlemi değil: yorumlar ileride Review/AggregateRating
 * yapısal verisini besleyecek ve Google doğrulanmamış yorum işaretlemesini
 * ihlal sayıyor.
 */
import { ref } from 'vue'

const HIZMETLER = [
  'Evden Eve Nakliyat',
  'Şehirler Arası Nakliyat',
  'Ofis Taşıma',
  'Parça Eşya Taşıma',
  'Asansörlü Nakliyat',
  'Eşya Depolama',
  'Paketleme ve Ambalajlama',
]

const acik = ref(false)
const gonderiliyor = ref(false)
const durum = ref('')
const hata = ref('')

const form = ref({
  customerName: '',
  rating: 5,
  comment: '',
  location: '',
  serviceType: HIZMETLER[0],
  email: '',
})
/** Bal küpü — ekranda görünmez, botlar doldurur. */
const website = ref('')

const puanSec = (n) => (form.value.rating = n)

const gonder = async () => {
  if (gonderiliyor.value) return
  gonderiliyor.value = true
  hata.value = ''
  durum.value = ''

  try {
    const cevap = await $fetch('/api/reviews', {
      method: 'POST',
      body: { ...form.value, website: website.value },
    })
    if (cevap?.success === false) throw new Error(cevap.error || 'Gönderilemedi')

    durum.value =
      'Yorumunuz alındı, teşekkür ederiz. Kontrol edildikten sonra sitede yayınlanacak.'
    form.value = {
      customerName: '', rating: 5, comment: '', location: '',
      serviceType: HIZMETLER[0], email: '',
    }
    acik.value = false
  } catch (e) {
    hata.value = e?.data?.message || e?.message || 'Yorum gönderilemedi. Lütfen tekrar deneyin.'
  } finally {
    gonderiliyor.value = false
  }
}
</script>

<template>
  <div class="yorum-formu">
    <output v-if="durum" class="yorum-formu__durum">{{ durum }}</output>

    <button v-if="!acik" type="button" class="yorum-formu__ac" @click="acik = true">
      Siz de deneyiminizi paylaşın
    </button>

    <form v-else class="yorum-formu__govde" @submit.prevent="gonder">
      <h3 class="yorum-formu__baslik">Deneyiminizi paylaşın</h3>
      <p class="yorum-formu__not">
        Yorumunuz kontrol edildikten sonra yayınlanır. E-posta adresiniz sitede görünmez.
      </p>

      <p v-if="hata" class="yorum-formu__hata" role="alert">{{ hata }}</p>

      <!-- Puan -->
      <fieldset class="yorum-formu__puan">
        <legend>Puanınız</legend>
        <div class="yorum-formu__yildizlar">
          <button
            v-for="n in 5"
            :key="n"
            type="button"
            class="yorum-formu__yildiz"
            :class="{ 'is-dolu': n <= form.rating }"
            :aria-label="`${n} yıldız`"
            :aria-pressed="n === form.rating"
            @click="puanSec(n)"
          >
            <ui-icon name="star" :size="26" />
          </button>
          <span class="yorum-formu__puan-metin">{{ form.rating }} / 5</span>
        </div>
      </fieldset>

      <div class="yorum-formu__satir">
        <div class="yorum-formu__alan">
          <label for="yorum-ad">Adınız <span aria-hidden="true">*</span></label>
          <input id="yorum-ad" v-model="form.customerName" type="text" required maxlength="60" autocomplete="name" />
        </div>
        <div class="yorum-formu__alan">
          <label for="yorum-yer">Şehir / İlçe</label>
          <input id="yorum-yer" v-model="form.location" type="text" maxlength="60" placeholder="Kartal" />
        </div>
      </div>

      <div class="yorum-formu__satir">
        <div class="yorum-formu__alan">
          <label for="yorum-hizmet">Aldığınız hizmet</label>
          <select id="yorum-hizmet" v-model="form.serviceType">
            <option v-for="h in HIZMETLER" :key="h" :value="h">{{ h }}</option>
          </select>
        </div>
        <div class="yorum-formu__alan">
          <label for="yorum-eposta">E-posta (yayınlanmaz)</label>
          <input id="yorum-eposta" v-model="form.email" type="email" maxlength="120" autocomplete="email" />
        </div>
      </div>

      <div class="yorum-formu__alan">
        <label for="yorum-metin">Yorumunuz <span aria-hidden="true">*</span></label>
        <textarea id="yorum-metin" v-model="form.comment" rows="5" required minlength="15" maxlength="1000"></textarea>
        <span class="yorum-formu__sayac">{{ form.comment.length }} / 1000</span>
      </div>

      <!-- Bal küpü: ekran okuyuculardan ve klavyeden de gizli -->
      <div class="yorum-formu__kupu" aria-hidden="true">
        <label for="yorum-website">Bu alanı boş bırakın</label>
        <input id="yorum-website" v-model="website" type="text" tabindex="-1" autocomplete="off" />
      </div>

      <div class="yorum-formu__dugmeler">
        <button type="submit" class="yorum-formu__gonder" :disabled="gonderiliyor">
          {{ gonderiliyor ? 'Gönderiliyor…' : 'Yorumu gönder' }}
        </button>
        <button type="button" class="yorum-formu__iptal" @click="acik = false">Vazgeç</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.yorum-formu {
  margin-top: var(--space-block);
}

.yorum-formu__durum {
  display: block;
  margin-bottom: 1rem;
  padding: 0.875rem 1.125rem;
  border-radius: var(--r-lg);
  background: rgb(var(--c-brand-600) / 0.12);
  color: rgb(var(--c-brand-800));
  font-weight: 500;
}

.yorum-formu__ac {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border: 1px solid rgb(var(--c-line));
  border-radius: var(--r-full);
  background: rgb(var(--c-surface));
  font-weight: 600;
  color: rgb(var(--c-brand-700));
  transition: border-color var(--dur-fast) var(--ease-soft);
}

.yorum-formu__ac:hover {
  border-color: rgb(var(--c-brand-600) / 0.5);
}

.yorum-formu__govde {
  padding: 1.5rem;
  border: 1px solid rgb(var(--c-line));
  border-radius: var(--r-2xl);
  background: rgb(var(--c-surface));
}

.yorum-formu__baslik {
  font-size: 1.125rem;
  font-weight: 700;
  color: rgb(var(--c-ink));
}

.yorum-formu__not {
  margin-top: 0.25rem;
  margin-bottom: 1.25rem;
  font-size: 0.875rem;
  color: rgb(var(--c-ink-muted));
}

.yorum-formu__hata {
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  border-radius: var(--r-lg);
  background: rgb(190 30 30 / 0.1);
  color: rgb(150 20 20);
  font-size: 0.9375rem;
}

.yorum-formu__puan {
  margin-bottom: 1.25rem;
  border: 0;
  padding: 0;
}

.yorum-formu__puan legend {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(var(--c-ink-muted));
}

.yorum-formu__yildizlar {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.yorum-formu__yildiz {
  color: rgb(var(--c-line));
  transition: color var(--dur-fast) var(--ease-soft);
}

.yorum-formu__yildiz.is-dolu {
  color: rgb(var(--c-accent-400, 234 179 8));
}

.yorum-formu__puan-metin {
  margin-left: 0.5rem;
  font-size: 0.875rem;
  color: rgb(var(--c-ink-muted));
}

.yorum-formu__satir {
  display: grid;
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (min-width: 40rem) {
  .yorum-formu__satir {
    grid-template-columns: 1fr 1fr;
  }
}

.yorum-formu__alan {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.yorum-formu__alan label {
  margin-bottom: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(var(--c-ink));
}

.yorum-formu__alan input,
.yorum-formu__alan select,
.yorum-formu__alan textarea {
  padding: 0.625rem 0.75rem;
  border: 1px solid rgb(var(--c-line));
  border-radius: var(--r-lg);
  background: rgb(var(--c-surface));
  color: rgb(var(--c-ink));
  font: inherit;
}

.yorum-formu__sayac {
  margin-top: 0.25rem;
  align-self: flex-end;
  font-size: 0.75rem;
  color: rgb(var(--c-ink-subtle));
}

/* Bal küpü: görünmez ama `display:none` DEĞİL — bazı botlar
   display:none alanları atlıyor. */
.yorum-formu__kupu {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.yorum-formu__dugmeler {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.yorum-formu__gonder {
  padding: 0.75rem 1.75rem;
  border-radius: var(--r-full);
  background: rgb(var(--c-brand-700));
  color: #fff;
  font-weight: 600;
}

.yorum-formu__gonder:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.yorum-formu__iptal {
  padding: 0.75rem 1.25rem;
  border-radius: var(--r-full);
  color: rgb(var(--c-ink-muted));
  font-weight: 500;
}
</style>

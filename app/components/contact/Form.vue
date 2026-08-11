<script setup>
/**
 * TEKLİF / İLETİŞİM FORMU
 *
 * DÜZELTİLEN HATALAR
 *
 * 1. TELEFON DOĞRULAMASI KENDİ ÖRNEĞİNİ REDDEDİYORDU. Kural
 *    `/^[0-9]+$/` idi: sadece rakam. Alanın placeholder'ı ise
 *    "05XX XXX XX XX" — yani boşluklu. Kullanıcı ekrandaki örneği bire bir
 *    yazdığında "Geçerli bir telefon numarası giriniz." hatası alıyordu.
 *    Aynı şekilde +90 ile yazan da reddediliyordu. Artık boşluk, +, ( ) ve
 *    tire kabul ediliyor; kontrol RAKAM SAYISI üzerinden yapılıyor.
 *
 * 2. HATA `alert()` İLE GÖSTERİLİYORDU. Ham hata metni (`error.response
 *    ?.body`) tarayıcı uyarısıyla kullanıcıya basılıyordu. Artık formun
 *    içinde, anlaşılır bir mesaj olarak duruyor ve ekran okuyucuya
 *    duyuruluyor.
 *
 * 3. BAŞARI MESAJI 3 SANİYEDE KAYBOLUYORDU ve ekran okuyucuya hiç
 *    duyurulmuyordu. Artık kalıcı ve `role="status"` ile canlı bölge.
 *
 * 4. GİZLİLİK POLİTİKASI BAĞLANTISI ÖLÜYDÜ. "Gizlilik Politikamızı kabul
 *    etmiş olursunuz" cümlesindeki bağlantı `href="#"` idi; sayfa var ve
 *    /gizlilik-politikasi adresinde. Kişisel veri toplayan bir formda bu
 *    bağlantının çalışması KVKK açısından da gerekli.
 *
 * 5. HATA MESAJLARI ALANLA İLİŞKİLENDİRİLMEMİŞTİ. Ekran okuyucu, odağı
 *    alanın üzerindeyken hatayı okumuyordu. `aria-describedby` ve
 *    `aria-invalid` eklendi.
 *
 * 6. MAVİ. Scoped stilde `box-shadow: 0 0 0 3px rgba(59,130,246,.1)` ve
 *    `rgba(59,130,246,.2)` vardı — mavi. Ayrıca `.shadow-lg` / `.shadow-xl`
 *    Tailwind utility'leri yeniden tanımlanıyordu.
 *
 * EKLENEN — bal küpü (honeypot)
 * Form herkese açık ve arkasındaki uç nokta kimlik doğrulaması istemiyor.
 * Ekranda görünmeyen ama botların doldurduğu bir alan, en ucuz spam
 * filtresidir. Gerçek kullanıcı hiç görmez; dolu geldiğinde istek
 * gönderilmez.
 */
import { computed, ref } from 'vue'
import { Field, Form as VeeForm, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const { settings, brandName } = await useSiteSettings()

const schema = yup.object({
  name: yup.string().trim().required('Adınızı giriniz.'),
  email: yup
    .string()
    .trim()
    .email('Geçerli bir e-posta adresi giriniz.')
    .required('E-posta adresinizi giriniz.'),
  phone: yup
    .string()
    .trim()
    .required('Telefon numaranızı giriniz.')
    // Biçim serbest (boşluk, +, parantez, tire); şart yeterli sayıda RAKAM.
    .test('telefon', 'Geçerli bir telefon numarası giriniz.', (value) => {
      const digits = String(value || '').replace(/\D/g, '')
      return digits.length >= 10 && digits.length <= 15
    }),
  note: yup.string().trim().required('Mesajınızı yazınız.'),
})

const route = useRoute()
const isSubmitting = ref(false)
const status = ref('') // '' | 'success' | 'error'
/** Bal küpü — ekranda görünmez, botlar doldurur. */
const website = ref('')

const onSubmit = async (values, { resetForm }) => {
  if (website.value) return // bot

  isSubmitting.value = true
  status.value = ''

  try {
    // Artık doğrudan mail atılmıyor. İstek kendi ucumuza gidiyor; orada talep
    // ÖNCE veritabanına yazılıyor, mail ONDAN SONRA deneniyor.
    //
    // Sebebi: eskiden yalnızca mail atılıyordu ve SMTP'de bir aksama olduğunda
    // (paylaşımlı hosting'de sık: kapalı 587 portu, yanlış parola, sunucu
    // limiti) müşteri adayı tamamen kayboluyordu. Artık mail gitmese bile
    // talep panelde duruyor ve kayıtta "mail gitmedi" bilgisi görünüyor.
    const cevap = await $fetch('/api/leads', {
      method: 'POST',
      body: {
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.note,
        // Hangi sayfadan geldiği: 120 bölge sayfası içinde hangisinin
        // gerçekten müşteri getirdiğini ancak bu gösteriyor.
        sourcePage: route.path,
        website: website.value,
      },
    })

    if (cevap?.success === false) throw new Error(cevap.error || 'Gönderilemedi')

    status.value = 'success'
    resetForm()
  } catch (error) {
    // Ham hata metni kullanıcıya GÖSTERİLMİYOR; teknik ayrıntı konsola.
    console.error('Form gönderilemedi:', error)
    status.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}

const fallbackPhone = computed(() => settings.value?.phone || settings.value?.mobilePhone || '')
</script>

<template>
  <ui-card padding="lg">
    <h3 class="text-h3 text-ink">Ücretsiz Keşif ve Teklif</h3>
    <p class="mt-2 text-pretty text-ink-muted">
      Formu doldurun, eşyalarınızı yerinde görüp size yazılı ve sabit bir fiyat sunalım.
    </p>

    <!-- Canlı bölge: durum mesajları ekran okuyucuya duyurulur. -->
    <div aria-live="polite">
      <div v-if="status === 'success'" class="form-alert form-alert--ok" role="status">
        <ui-icon name="check-circle" :size="20" class="mt-0.5 shrink-0" aria-hidden="true" />
        <p>Mesajınız bize ulaştı. En kısa sürede size dönüş yapacağız.</p>
      </div>

      <div v-else-if="status === 'error'" class="form-alert form-alert--error" role="alert">
        <ui-icon name="info" :size="20" class="mt-0.5 shrink-0" aria-hidden="true" />
        <p>
          Mesajınız gönderilemedi.
          <template v-if="fallbackPhone">
            Dilerseniz doğrudan
            <a :href="`tel:${fallbackPhone.replace(/[^\d+]/g, '')}`" class="underline">
              {{ fallbackPhone }}
            </a>
            numarasından bize ulaşabilirsiniz.
          </template>
          <template v-else>Lütfen bir süre sonra tekrar deneyin.</template>
        </p>
      </div>
    </div>

    <vee-form v-slot="{ errors }" :validation-schema="schema" class="mt-6 flex flex-col gap-5" @submit="onSubmit">
      <!-- Bal küpü: ekran okuyucudan ve sekme sırasından da çıkarılmış. -->
      <div class="honeypot" aria-hidden="true">
        <label for="website">Web siteniz</label>
        <input id="website" v-model="website" type="text" tabindex="-1" autocomplete="off" />
      </div>

      <div class="grid gap-5 sm:grid-cols-2">
        <div class="field">
          <label for="name" class="field__label">Adınız Soyadınız <span aria-hidden="true">*</span></label>
          <Field
            id="name"
            name="name"
            type="text"
            class="field__input"
            :class="{ 'is-invalid': errors.name }"
            placeholder="Adınızı giriniz"
            autocomplete="name"
            :aria-invalid="errors.name ? 'true' : undefined"
            :aria-describedby="errors.name ? 'name-error' : undefined"
          />
          <ErrorMessage id="name-error" name="name" as="p" class="field__error" />
        </div>

        <div class="field">
          <label for="email" class="field__label">E-posta Adresiniz <span aria-hidden="true">*</span></label>
          <Field
            id="email"
            name="email"
            type="email"
            class="field__input"
            :class="{ 'is-invalid': errors.email }"
            placeholder="ornek@eposta.com"
            autocomplete="email"
            :aria-invalid="errors.email ? 'true' : undefined"
            :aria-describedby="errors.email ? 'email-error' : undefined"
          />
          <ErrorMessage id="email-error" name="email" as="p" class="field__error" />
        </div>
      </div>

      <div class="field">
        <label for="phone" class="field__label">Telefon Numaranız <span aria-hidden="true">*</span></label>
        <Field
          id="phone"
          name="phone"
          type="tel"
          class="field__input"
          :class="{ 'is-invalid': errors.phone }"
          placeholder="0532 000 00 00"
          autocomplete="tel"
          :aria-invalid="errors.phone ? 'true' : undefined"
          :aria-describedby="errors.phone ? 'phone-error' : undefined"
        />
        <ErrorMessage id="phone-error" name="phone" as="p" class="field__error" />
      </div>

      <div class="field">
        <label for="note" class="field__label">Mesajınız <span aria-hidden="true">*</span></label>
        <Field
          id="note"
          as="textarea"
          name="note"
          rows="5"
          class="field__input resize-y"
          :class="{ 'is-invalid': errors.note }"
          placeholder="Nereden nereye taşınıyorsunuz? Kaç odalı bir ev, hangi kat, asansör var mı? Bildiğiniz kadarını yazmanız yeterli."
          :aria-invalid="errors.note ? 'true' : undefined"
          :aria-describedby="errors.note ? 'note-error' : undefined"
        />
        <ErrorMessage id="note-error" name="note" as="p" class="field__error" />
      </div>

      <ui-button type="submit" variant="primary" size="lg" block :loading="isSubmitting">
        {{ isSubmitting ? 'Gönderiliyor…' : 'Teklif İste' }}
      </ui-button>

      <p class="text-center text-xs text-ink-muted">
        Formu göndererek
        <NuxtLink to="/gizlilik-politikasi" class="underline hover:text-brand-700">
          Gizlilik Politikamızı
        </NuxtLink>
        kabul etmiş olursunuz. <span aria-hidden="true">*</span> işaretli alanlar zorunludur.
      </p>
    </vee-form>
  </ui-card>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field__label {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(var(--c-ink));
}

.field__input {
  width: 100%;
  padding: 0.8125rem 1rem;
  border: 1px solid rgb(var(--c-line-strong));
  border-radius: var(--r-md);
  background: rgb(var(--c-surface));
  color: rgb(var(--c-ink));
  transition: border-color var(--dur-fast) var(--ease-soft);
}

.field__input::placeholder {
  color: rgb(var(--c-ink-subtle));
}

.field__input:hover {
  border-color: rgb(var(--c-brand-600) / 0.5);
}

/* Hata yalnızca renkle anlatılmıyor: alanın altında metin de var
   (WCAG 1.4.1 — bilgi tek başına renkle iletilmemeli). */
.field__input.is-invalid {
  border-color: rgb(var(--c-danger));
}

.field__error {
  font-size: 0.8125rem;
  color: rgb(var(--c-danger));
}

.form-alert {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  margin-top: 1.5rem;
  padding: 0.875rem 1rem;
  border-radius: var(--r-md);
  font-size: 0.9375rem;
}

.form-alert--ok {
  background: rgb(var(--c-brand-600) / 0.08);
  color: rgb(var(--c-brand-800));
}

.form-alert--error {
  background: rgb(var(--c-danger) / 0.08);
  color: rgb(var(--c-danger-strong));
}

/* Bal küpü: `display: none` kullanılmıyor çünkü bazı botlar onu tespit
   ediyor; ekran dışına alınıyor. `aria-hidden` + `tabindex="-1"` ile
   gerçek kullanıcıya hiçbir şekilde ulaşmıyor. */
.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
</style>

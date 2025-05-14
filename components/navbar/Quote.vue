<script setup>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useMail, useFetch } from "#imports";

const { data: quoteData, pending } = await useFetch("/api/quote");

const formData = ref({
  name: "",
  email: "",
  phone: "",
  note: "",
});

const schema = yup.object({
  name: yup.string().required("Adınızı giriniz."),
  email: yup
    .string()
    .email("Geçerli bir e-posta adresi giriniz.")
    .required("E-posta adresinizi giriniz."),
  phone: yup
    .string()
    .required("Telefon numaranızı giriniz.")
    .matches(/^[0-9]+$/, "Geçerli bir telefon numarası giriniz."),
  note: yup.string().required("Özel notunuzu giriniz."),
});

const mail = useMail();

const onSubmit = async (values, { resetForm }) => {
  try {
    const response = await mail.send({
      from: "admin@egeesya.com",
      to: "info@egeesya.com",
      subject: "Ege Eşya Yeni Talep",
      text: `
        İsim: ${values.name}
        E-posta: ${values.email}
        Telefon: ${values.phone}
        Not: ${values.note}
      `,
    });
    console.log("Mail gönderildi:", response);
    alert("Form başarıyla gönderildi!");
    resetForm();
  } catch (error) {
    console.error(
      "Mail gönderme hatası:",
      error.response?.body || error.message
    );
    alert(`Hata: ${error.response?.body || error.message}`);
  }
};
</script>

<template>
  <div class="ycl-quote container mx-auto my-20 py-10 px-4 sm:px-6 lg:px-8">
    <div v-if="pending" class="animate-pulse">
      <div class="h-10 bg-gray-200 rounded mb-4"></div>
      <div class="h-20 bg-gray-200 rounded mb-4"></div>
      <div class="h-40 bg-gray-200 rounded"></div>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <section class="quote-text space-y-6" aria-labelledby="quote-title">
        <h2 id="quote-title" class="text-3xl sm:text-4xl font-serif italic text-stone-600">
          {{ quoteData?.title || 'Hızlı ve Güvenilir Hizmet!' }}
        </h2>
        <p class="text-stone-600 text-base sm:text-lg leading-relaxed">
          {{ quoteData?.description || 'Profesyonel ekibimizle eşyalarınızı özenle taşıyor, modern lojistik çözümlerimizle zamanında teslimat garantisi sunuyoruz.' }}
        </p>
        <div class="space-y-4">
          <div class="flex items-center space-x-4 border-b-4">
            <div
              class="bg-stone-600 p-3 rounded-full text-white"
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-label="mail ikonu"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l9-6 9 6v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12h-6l-3 6h12l-3-6z"
                />
              </svg>
            </div>
            <div>
              <p class="text-gray-900 text-sm sm:text-base">
                E-posta ile ulaşın
              </p>
              <a
                :href="`mailto:${quoteData?.subtitle || 'info@example.com'}`"
                class="text-primary text-lg font-semibold hover:underline"
                aria-label="E-posta ile iletişime geç"
              >
                {{ quoteData?.subtitle || "info@egeesya.com" }}
              </a>
            </div>
          </div>
          <div class="flex items-center space-x-4 border-b-4">
            <div
              class="bg-stone-600  p-3 rounded-full text-white"
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-label="sabit telefon ikonu"

              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5h18M9 3v2m6-2v2M3 19h18M9 21v-2m6 2v-2m-9-2h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p class="text-gray-900 text-sm sm:text-base">Teklif alın</p>
              <a
                :href="`tel:${quoteData?.phoneLabel || '0216 315 38 85'}`"
                class="text-primary text-lg font-semibold hover:underline"
                aria-label="Sabit telefon ile iletişime geç"
              >
                {{ quoteData?.phoneLabel || "0216 315 38 85" }}
              </a>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div
              class="bg-stone-600  p-3 rounded-full text-white"
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-label="cep telefon ikonu"

              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p class="text-gray-900 text-sm sm:text-base">Mesaj ile ulaşın</p>
              <a
                :href="`tel:${quoteData?.phone || '0532 645 42 89'}`"
                class="text-primary text-lg font-semibold hover:underline"
                aria-label="Cep telefonu ile iletişime geç"
              >
                {{ quoteData?.phone || "0532 645 42 89" }}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        class="quote-form bg-white p-6 sm:p-8 rounded-xl shadow-md"
        aria-labelledby="form-title"
      >
        <h3 id="form-title" class="sr-only">Teklif Formu</h3>
        <Form
          @submit="onSubmit"
          :validation-schema="schema"
          v-slot="{ errors }"
          class="space-y-6"
        >
          <div>
            <label for="name" class="sr-only">Adınız</label>
            <Field
              id="name"
              name="name"
              type="text"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="Adınız"
              :class="{ 'border-red-500': errors.name }"
              aria-required="true"
            />
            <ErrorMessage name="name" class="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label for="email" class="sr-only">E-posta Adresiniz</label>
            <Field
              id="email"
              name="email"
              type="email"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="E-posta Adresiniz"
              :class="{ 'border-red-500': errors.email }"
              aria-required="true"
            />
            <ErrorMessage name="email" class="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label for="phone" class="sr-only">Telefon Numaranız</label>
            <Field
              id="phone"
              name="phone"
              type="tel"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="Telefon Numaranız"
              :class="{ 'border-red-500': errors.phone }"
              aria-required="true"
            />
            <ErrorMessage name="phone" class="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label for="note" class="sr-only">Özel Not</label>
            <Field
              as="textarea"
              id="note"
              name="note"
              class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              placeholder="Özel Not"
              rows="4"
              :class="{ 'border-red-500': errors.note }"
              aria-required="true"
            />
            <ErrorMessage name="note" class="text-red-500 text-sm mt-1" />
          </div>

          <button
            type="submit"
            class="w-full bg-stone-600  text-white py-3 rounded-lg hover:bg-stone-800 -dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-stone-800 focus:ring-offset-2"
            aria-label="Formu Gönder"
          >
            Gönder
          </button>
        </Form>
      </section>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  .quote-form {
    padding: 1.5rem;
  }
  .quote-text {
    padding: 1rem;
  }
  .container {
    max-width: 100%;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .container {
    max-width: 90%;
  }
}

.transition-all {
  transition-property: all;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

h2 {
  font-family: "Georgia", serif;
}
</style>

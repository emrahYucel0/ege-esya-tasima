<script setup>
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useMail, useFetch } from "#imports";

const { data: quoteResponse, pending } = await useFetch("/api/quote");
// API artık {success,data} zarfı dönüyor; template'in geri kalanı değişmeden
// çalışabilsin diye burada tek noktadan unwrap ediyoruz.
const quoteData = computed(() => quoteResponse.value?.data ?? null);

const { settings, brandName } = await useSiteSettings();

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
const isSubmitting = ref(false);
const submitSuccess = ref(false);

const onSubmit = async (values, { resetForm }) => {
  isSubmitting.value = true;
  submitSuccess.value = false;
  
  try {
    const response = await mail.send({
      from: settings.value?.email || "admin@evenakliyatevden.com",
      to: settings.value?.email || "info@evenakliyatevden.com",
      subject: `${brandName.value} Yeni Talep`,
      text: `
        İsim: ${values.name}
        E-posta: ${values.email}
        Telefon: ${values.phone}
        Not: ${values.note}
      `,
    });
    console.log("Mail gönderildi:", response);
    submitSuccess.value = true;
    resetForm();
    
    // 3 saniye sonra başarı mesajını kaldır
    setTimeout(() => {
      submitSuccess.value = false;
    }, 3000);
    
  } catch (error) {
    console.error(
      "Mail gönderme hatası:",
      error.response?.body || error.message
    );
    alert(`Hata: ${error.response?.body || error.message}`);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="contact-section py-16 md:py-20 lg:py-24 ">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <!-- Başlık -->
      <div class="text-center mb-12 md:mb-16">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Teklif Alın, Sorularınızı Sorun
        </h2>
        <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Profesyonel ekibimiz en kısa sürede size dönüş yapacaktır
        </p>
      </div>

      <div v-if="pending" class="animate-pulse max-w-4xl mx-auto">
        <div class="h-8 bg-gray-200 rounded mb-6 w-3/4 mx-auto"></div>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="space-y-4">
            <div class="h-4 bg-gray-200 rounded w-full"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
            <div class="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
          <div class="space-y-4">
            <div class="h-12 bg-gray-200 rounded"></div>
            <div class="h-12 bg-gray-200 rounded"></div>
            <div class="h-12 bg-gray-200 rounded"></div>
            <div class="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      <div v-else class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <!-- İletişim Bilgileri -->
        <div class="space-y-8">
          <div class=" p-6 md:p-8 rounded-2xl shadow-lg ">
            <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg class="w-6 h-6 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              İletişim Bilgilerimiz
            </h3>
            
            <div class="space-y-6">
              <div class="flex items-start p-4 bg-primary rounded-xl hover:bg-primary/90 transition-colors duration-200">
                <div class="flex-shrink-0 mr-4">
                  <div class="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l9-6 9 6v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12h-6l-3 6h12l-3-6z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p class="text-sm text-secondary mb-1">E-posta</p>
                  <a
                    :href="`mailto:${quoteData?.subtitle || settings?.email || 'info@evenakliyatevden.com'}`"
                    class="text-lg font-semibold text-white hover:text-secondary transition-colors"
                  >
                    {{ quoteData?.subtitle || settings?.email || "info@evenakliyatevden.com" }}
                  </a>
                </div>
              </div>

              <div class="flex items-start p-4 bg-primary rounded-xl hover:bg-primary/90 transition-colors duration-200">
                <div class="flex-shrink-0 mr-4">
                  <div class="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p class="text-sm text-secondary mb-1">Sabit Telefon</p>
                  <a 
                    :href="`tel:${quoteData?.phoneLabel || '0216 315 38 85'}`" 
                    class="text-lg font-semibold text-white hover:text-secondary transition-colors"
                  >
                    {{ quoteData?.phoneLabel || "0216 315 38 85" }}
                  </a>
                </div>
              </div>

              <div class="flex items-start p-4 bg-primary rounded-xl hover:bg-primary/90 transition-colors duration-200">
                <div class="flex-shrink-0 mr-4">
                  <div class="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p class="text-sm text-secondary mb-1">Cep Telefonu</p>
                  <a 
                    :href="`tel:${quoteData?.phone || '0532 645 42 89'}`" 
                    class="text-lg font-semibold text-white hover:text-secondary transition-colors"
                  >
                    {{ quoteData?.phone || "0532 645 42 89" }}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Çalışma Saatleri -->
          <div class=" p-6 md:p-8 rounded-2xl shadow-lg ">
            <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <svg class="w-6 h-6 mr-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Çalışma Saatlerimiz
            </h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center py-2 border-b border-gray-400">
                <span class="text-gray-600">Pazartesi - Cuma</span>
                <span class="font-semibold text-gray-900">08:00 - 19:00</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-400">
                <span class="text-gray-600">Cumartesi</span>
                <span class="font-semibold text-gray-900">09:00 - 18:00</span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-gray-600">Pazar</span>
                <span class="font-semibold text-gray-900">10:00 - 16:00</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Alanı -->
        <div class="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Ücretsiz Teklif Alın</h3>
            <p class="text-gray-600">Formu doldurun, en kısa sürede size özel teklifimizi sunalım.</p>
          </div>

          <!-- Başarı Mesajı -->
          <div v-if="submitSuccess" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <p class="text-green-700 font-medium">Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağız.</p>
            </div>
          </div>

          <Form
            @submit="onSubmit"
            :validation-schema="schema"
            v-slot="{ errors }"
            class="space-y-6"
          >
            <div class="grid sm:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                  Adınız Soyadınız <span class="text-red-500">*</span>
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder="Adınızı giriniz"
                  :class="{ 'border-red-500': errors.name, 'focus:ring-red-500': errors.name }"
                />
                <ErrorMessage name="name" class="mt-2 text-sm text-red-600 flex items-center">
                  <template #default="msg">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.928-.833-2.698 0L4.138 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    {{ msg }}
                  </template>
                </ErrorMessage>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  E-posta Adresiniz <span class="text-red-500">*</span>
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder="ornek@email.com"
                  :class="{ 'border-red-500': errors.email, 'focus:ring-red-500': errors.email }"
                />
                <ErrorMessage name="email" class="mt-2 text-sm text-red-600 flex items-center">
                  <template #default="msg">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.928-.833-2.698 0L4.138 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    {{ msg }}
                  </template>
                </ErrorMessage>
              </div>
            </div>

            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                Telefon Numaranız <span class="text-red-500">*</span>
              </label>
              <Field
                id="phone"
                name="phone"
                type="tel"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                placeholder="05XX XXX XX XX"
                :class="{ 'border-red-500': errors.phone, 'focus:ring-red-500': errors.phone }"
              />
              <ErrorMessage name="phone" class="mt-2 text-sm text-red-600 flex items-center">
                <template #default="msg">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.928-.833-2.698 0L4.138 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  {{ msg }}
                </template>
              </ErrorMessage>
            </div>

            <div>
              <label for="note" class="block text-sm font-medium text-gray-700 mb-2">
                Mesajınız / Özel Not <span class="text-red-500">*</span>
              </label>
              <Field
                as="textarea"
                id="note"
                name="note"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Taşınma detaylarınızı, özel isteklerinizi veya sorularınızı yazınız..."
                rows="5"
                :class="{ 'border-red-500': errors.note, 'focus:ring-red-500': errors.note }"
              />
              <ErrorMessage name="note" class="mt-2 text-sm text-red-600 flex items-center">
                <template #default="msg">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.928-.833-2.698 0L4.138 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  {{ msg }}
                </template>
              </ErrorMessage>
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
            >
              <span v-if="isSubmitting" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Gönderiliyor...
              </span>
              <span v-else class="flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Gönder
              </span>
            </button>

            <p class="text-xs text-gray-500 text-center mt-4">
              Formu göndererek, <a href="#" class="text-primary hover:underline">Gizlilik Politikamızı</a> kabul etmiş olursunuz.
            </p>
          </Form>
        </div>
      </div>

      <!-- Sosyal Medya -->
      <div class="mt-16 text-center">
        <h4 class="text-xl font-semibold text-gray-900 mb-6">Sosyal Medyada Takip Edin</h4>
        <div class="flex justify-center space-x-4">
          <a href="#" class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-200">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="#" class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-200">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
          </a>
          <a href="#" class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-200">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="#" class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors duration-200">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-section {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

/* Responsive tasarım için ekstra stiller */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .contact-section {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}

@media (max-width: 768px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
}

/* Form elemanları için hover ve focus stilleri */
input:focus, textarea:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Buton hover efektleri */
button:hover:not(:disabled) {
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.2);
}

/* Kart gölgeleri */
.shadow-lg {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.shadow-xl {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}


</style>
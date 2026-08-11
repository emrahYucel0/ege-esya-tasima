<script setup>
const { form, message, showDeleteModal, recordId, isSaving, isDeleting, save, remove } = useSectionCrud('hero', 'heros', {
  title: '',
  subtitle: '',
  description: '',
  primaryButton: '',
  primaryLink: '',
  secondaryButton: '',
  secondaryLink: '',
  image: '',
  backgroundImage: '',
  imageAlt: '',
  backgroundImageAlt: '',
});

const updateImageUrl = (url) => {
  form.image = url
  message.value = 'Ön plan görseli başarıyla yüklendi! Lütfen "Tümünü Güncelle" butonuna tıklayarak kaydedin.'
}

const updateBackgroundImageUrl = (url) => {
  form.backgroundImage = url
  message.value = 'Arka plan görseli başarıyla yüklendi! Lütfen "Tümünü Güncelle" butonuna tıklayarak kaydedin.'
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Hero Bölümü Yönetimi 🚀</h1>

    <p v-if="message" :class="['mt-4 p-3 rounded', message.includes('hata') || message.includes('Hata') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700']">
      {{ message }}
    </p>

    <form @submit.prevent="save" class="space-y-8 bg-white p-6 shadow-lg rounded-lg">

      <h2 class="text-xl font-semibold border-b pb-2 text-primary">Temel İçerik</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="title" class="block font-medium text-gray-700 mb-1">Başlık *</label>
          <input id="title" v-model="form.title" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
        </div>
        <div>
          <label for="subtitle" class="block font-medium text-gray-700 mb-1">Alt Başlık</label>
          <input id="subtitle" v-model="form.subtitle" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <div>
        <label for="description" class="block font-medium text-gray-700 mb-1">Açıklama</label>
        <textarea id="description" v-model="form.description" rows="4" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Buton Ayarları</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="primaryButton" class="block font-medium text-gray-700 mb-1">Birincil Buton Metni</label>
          <input id="primaryButton" v-model="form.primaryButton" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label for="primaryLink" class="block font-medium text-gray-700 mb-1">Birincil Buton Linki</label>
          <input id="primaryLink" v-model="form.primaryLink" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="secondaryButton" class="block font-medium text-gray-700 mb-1">İkincil Buton Metni</label>
          <input id="secondaryButton" v-model="form.secondaryButton" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label for="secondaryLink" class="block font-medium text-gray-700 mb-1">İkincil Buton Linki</label>
          <input id="secondaryLink" v-model="form.secondaryLink" type="text" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">Görsel Yönetimi</h2>

      <!-- Ön Plan Görseli -->
      <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-700">Ön Plan Görseli</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <label for="image" class="block font-medium text-gray-700 mb-1">Ön Plan Görsel URL</label>
            <input
              id="image"
              :value="form.image"
              type="text"
              class="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              placeholder="URL otomatik olarak dolacak"
              readonly
            />
            <p v-if="form.image" class="mt-2 text-sm text-gray-500">
              Mevcut Görsel:
              <a :href="form.image" target="_blank" class="text-blue-500 hover:underline truncate inline-block max-w-full">
                {{ form.image }}
              </a>
            </p>
            <p v-else class="mt-2 text-sm text-red-500">Mevcut Görsel Yok.</p>
          </div>
          <div>
            <FileUploader
              @file-uploaded="updateImageUrl"
              label="Yeni Ön Plan Görseli Yükle (JPG, PNG, WEBP)"
            />
          </div>
        </div>

        <!-- Alt metni: görsel panelden değişebildiği için metni de burada.
             Önceden koda gömülüydü; resim değişince metin yanlış kalıyordu. -->
        <div>
          <label for="imageAlt" class="block font-medium text-gray-700 mb-1">
            Görsel Açıklaması (alt metni)
          </label>
          <input
            id="imageAlt"
            v-model="form.imageAlt"
            type="text"
            maxlength="125"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Örn: Üniformalı iki nakliyeci koltuğu battaniyeye sarıp taşıyor"
          />
          <p class="mt-1 text-xs text-gray-500">
            Ne <strong>görüldüğünü</strong> anlatın, hizmeti değil. Google görsel
            aramada ve ekran okuyucularda bu metin kullanılır.
            Boş bırakılırsa otomatik bir metin üretilir.
          </p>
        </div>
      </div>

      <!-- Arka Plan Görseli -->
      <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-700">Arka Plan Görseli</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <label for="backgroundImage" class="block font-medium text-gray-700 mb-1">Arka Plan Görsel URL</label>
            <input
              id="backgroundImage"
              :value="form.backgroundImage"
              type="text"
              class="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              placeholder="URL otomatik olarak dolacak"
              readonly
            />
            <p v-if="form.backgroundImage" class="mt-2 text-sm text-gray-500">
              Mevcut Görsel:
              <a :href="form.backgroundImage" target="_blank" class="text-blue-500 hover:underline truncate inline-block max-w-full">
                {{ form.backgroundImage }}
              </a>
            </p>
            <p v-else class="mt-2 text-sm text-red-500">Mevcut Görsel Yok.</p>
          </div>
          <div>
            <FileUploader
              @file-uploaded="updateBackgroundImageUrl"
              label="Yeni Arka Plan Görseli Yükle (JPG, PNG, WEBP)"
            />
          </div>
        </div>

        <div>
          <label for="backgroundImageAlt" class="block font-medium text-gray-700 mb-1">
            Görsel Açıklaması (alt metni) — <span class="font-normal">isteğe bağlı</span>
          </label>
          <input
            id="backgroundImageAlt"
            v-model="form.backgroundImageAlt"
            type="text"
            maxlength="125"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Boş bırakın (önerilen)"
          />
          <p class="mt-1 text-xs text-gray-500">
            <strong>Boş bırakmanız önerilir.</strong> Bu görsel metnin arkasında,
            üzerinde koyu perde olan bir atmosfer görseli — hiçbir bilgi taşımıyor.
            Boşken ekran okuyucular onu atlar; doldurursanız her ziyarette okunur.
          </p>
        </div>
      </div>

      <div class="flex space-x-4 pt-6 border-t mt-6">
        <button type="submit" :disabled="isSaving" :aria-busy="isSaving" class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-600 transition duration-150 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
          {{ recordId ? 'Tümünü Güncelle' : 'Oluştur' }}
        </button>
        <button v-if="recordId" type="button" @click="showDeleteModal = true" :disabled="isSaving" class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150 font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
          Kaydı Sil
        </button>
      </div>
    </form>

    <AdminModalDynamicDeleteModal
      :show="showDeleteModal"
      :loading="isDeleting"
      title="Hero Kaydını Sil"
      message="Hero bölümündeki tüm verileri silmek istediğinize emin misiniz? Bu işlem geri alınamaz!"
      confirmText="Evet, Kaydı Sil"
      cancelText="İptal Et"
      @confirm="remove"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

<style scoped>
.bg-primary {
  background-color: #3b82f6;
}
.hover\:bg-green-600:hover {
  background-color: #10b981;
}
.text-primary {
  color: #3b82f6;
}
</style>

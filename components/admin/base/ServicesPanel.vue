<script setup>
import { ref, onMounted } from "vue";

// ------------------------------------
// STATE TANIMLARI
// ------------------------------------
const sectionName = "services";
const message = ref("");
const showAddForm = ref(false);
const showDeleteModal = ref(false);
const isLoading = ref(false);

// Ana alanlar
const mainTitle = ref("");
const description = ref("");
const buttonText = ref("");
const buttonLink = ref("");

// Dinamik olarak yönetilen listeler
const servicesList = ref([]);
const statisticsList = ref([]);

// Modal için ayrı state'ler
const modalServicesList = ref([]);
const modalStatisticsList = ref([]);

// Modal form alanları
const newServicesFields = ref([
  {
    name: "mainTitle",
    label: "Ana Başlık",
    type: "text",
    value: "",
    required: true,
  },
  { name: "description", label: "Açıklama", type: "textarea", value: "" },
  {
    name: "buttonText",
    label: "Buton Metni",
    type: "text",
    value: "Tüm Hizmetler",
  },
  {
    name: "buttonLink",
    label: "Buton Linki",
    type: "text",
    value: "/hizmetlerimiz",
  },
]);

// DÜZELTME: Her servis için temporary ID ve image mapping
const temporaryServiceIds = ref({}); // index -> temporary ID mapping
const serviceImageUpdates = ref({}); // temporary ID -> image URL mapping

// ------------------------------------
// API İŞLEMLERİ
// ------------------------------------

// Services verisini API'den yükler
const loadServices = async () => {
  isLoading.value = true;
  const { data, error } = await useFetch(`/api/${sectionName}`, {
    immediate: true,
  });

  if (error.value) {
    message.value = "Servisler verisi alınırken hata oluştu.";
  } else if (data.value && data.value.success !== false) {
    mainTitle.value = data.value.mainTitle || "";
    description.value = data.value.description || "";
    buttonText.value = data.value.buttonText || "Tüm Hizmetler";
    buttonLink.value = data.value.buttonLink || "/hizmetlerimiz";
    servicesList.value = data.value.services || [];
    statisticsList.value = data.value.statistics || [];

    // DÜZELTME: Temporary ID'leri oluştur veya koru
    servicesList.value.forEach((service, index) => {
      if (!temporaryServiceIds.value[index]) {
        temporaryServiceIds.value[index] = service.id || Date.now() + index;
      }
    });
  } else {
    message.value =
      'Veritabanında kayıt bulunamadı. Lütfen "Yeni Kayıt Ekle" butonu ile oluşturun.';
  }
  isLoading.value = false;
};

onMounted(() => {
  loadServices();
});

// Services güncelleme işlemi (PUT)
const updateServices = async () => {
  message.value = "";
  isLoading.value = true;

  // DÜZELTME: Güncellenmiş servisleri hazırla
  const updatedServices = servicesList.value.map((service, index) => {
    const tempId = temporaryServiceIds.value[index];
    const currentImage = serviceImageUpdates.value[tempId] || service.imagePath;

    return {
      imagePath: currentImage,
      title: service.title,
      subtitle: service.subtitle,
      description: service.description,
      order: index,
    };
  });

  const updatedStatistics = statisticsList.value.map((statistic, index) => ({
    iconPath: statistic.iconPath,
    value: statistic.value,
    label1: statistic.label1,
    label2: statistic.label2,
    order: index,
  }));

  const { data, error } = await useFetch(`/api/${sectionName}`, {
    method: "PUT",
    body: {
      sectionName: sectionName,
      mainTitle: mainTitle.value,
      description: description.value,
      buttonText: buttonText.value,
      buttonLink: buttonLink.value,
      services: updatedServices,
      statistics: updatedStatistics,
    },
  });

  if (error.value || !data.value?.success) {
    message.value =
      "Güncelleme sırasında hata oluştu: " +
      (data.value?.error || error.value?.message);
  } else {
    message.value = "Servisler bölümü başarıyla güncellendi! 🎉";
    // DÜZELTME: Local image state'lerini temizleme - SADECE güncellenenleri temizle
    servicesList.value.forEach((_, index) => {
      const tempId = temporaryServiceIds.value[index];
      if (serviceImageUpdates.value[tempId]) {
        delete serviceImageUpdates.value[tempId];
      }
    });
    await loadServices();
  }
  isLoading.value = false;
};

// Yeni Services kaydı ekleme işlemi (POST)
const addServices = async (formData) => {
  message.value = "";
  isLoading.value = true;

  // Modal'daki verileri order ile birlikte hazırla
  const preparedServices = modalServicesList.value.map((service, index) => ({
    imagePath: service.imagePath,
    title: service.title,
    subtitle: service.subtitle,
    description: service.description,
    order: index,
  }));

  const preparedStatistics = modalStatisticsList.value.map(
    (statistic, index) => ({
      iconPath: statistic.iconPath,
      value: statistic.value,
      label1: statistic.label1,
      label2: statistic.label2,
      order: index,
    })
  );

  const { data, error } = await useFetch(`/api/${sectionName}`, {
    method: "POST",
    body: {
      sectionName: sectionName,
      mainTitle: formData.mainTitle,
      description: formData.description,
      buttonText: formData.buttonText,
      buttonLink: formData.buttonLink,
      services: preparedServices,
      statistics: preparedStatistics,
    },
  });

  if (error.value || !data.value?.success) {
    message.value =
      "Ekleme sırasında hata oluştu: " +
      (data.value?.error || error.value?.message);
  } else {
    message.value = "Servisler başarıyla eklendi! ✨";
    showAddForm.value = false;
    resetModal();
    await loadServices();
  }
  isLoading.value = false;
};

// Services silme işlemi (DELETE)
const confirmDelete = async () => {
  message.value = "";
  isLoading.value = true;
  const { error, data } = await useFetch(`/api/${sectionName}`, {
    method: "DELETE",
    body: { sectionName: sectionName },
  });

  showDeleteModal.value = false;

  if (error.value || !data.value?.success) {
    message.value =
      "Silme sırasında hata oluştu: " +
      (data.value?.error || error.value?.message);
  } else {
    message.value = "Servisler kaydı silindi!🗑️";
    mainTitle.value = "";
    description.value = "";
    buttonText.value = "";
    buttonLink.value = "";
    servicesList.value = [];
    statisticsList.value = [];
    serviceImageUpdates.value = {};
    temporaryServiceIds.value = {};
  }
  isLoading.value = false;
};

const cancelDelete = () => {
  showDeleteModal.value = false;
};

// ------------------------------------
// DOSYA YÜKLEYİCİ İŞLEMLERİ - DÜZELTİLDİ
// ------------------------------------

/**
 * Servis görseli için FileUploader'dan gelen URL'i günceller
 */
const updateServiceImageUrl = (url, index) => {
  const tempId = temporaryServiceIds.value[index];
  if (tempId) {
    // DÜZELTME: Local state'i güncelle
    serviceImageUpdates.value[tempId] = url;

    // Hemen görseli güncelle (kullanıcı deneyimi için)
    if (servicesList.value[index]) {
      servicesList.value[index].imagePath = url;
    }

    message.value =
      'Servis görseli başarıyla güncellendi! Lütfen "Tümünü Güncelle" butonuna tıklayarak kaydedin.';
  }
};

/**
 * Modal için servis görseli URL'ini günceller.
 */
const updateModalServiceImageUrl = (url, index) => {
  if (modalServicesList.value[index]) {
    modalServicesList.value[index].imagePath = url;
  }
};

// Modal state'lerini sıfırla
const resetModal = () => {
  modalServicesList.value = [];
  modalStatisticsList.value = [];
};

// Modal açıldığında temizle
const openAddForm = () => {
  resetModal();
  showAddForm.value = true;
};

// Modal kapatıldığında temizle
const closeAddForm = () => {
  showAddForm.value = false;
  resetModal();
};

// ------------------------------------
// DİNAMİK LİSTE İŞLEMLERİ - ANA FORM
// ------------------------------------

// Yeni bir servis ekler
const addService = () => {
  const newIndex = servicesList.value.length;
  const tempId = Date.now() + newIndex;

  servicesList.value.push({
    imagePath: "",
    title: "",
    subtitle: "",
    description: "",
    order: newIndex,
  });

  // DÜZELTME: Yeni servis için temporary ID oluştur
  temporaryServiceIds.value[newIndex] = tempId;
};

// Bir servisi listeden siler
const removeService = (index) => {
  const tempId = temporaryServiceIds.value[index];
  // DÜZELTME: Local image state'ini temizle
  if (serviceImageUpdates.value[tempId]) {
    delete serviceImageUpdates.value[tempId];
  }

  // Temporary ID mapping'i güncelle
  delete temporaryServiceIds.value[index];

  servicesList.value.splice(index, 1);

  // DÜZELTME: Kalan servislerin index'lerini ve temporary ID'lerini güncelle
  servicesList.value.forEach((service, i) => {
    service.order = i;
    // Temporary ID'leri kaydır
    if (i >= index) {
      const oldTempId = temporaryServiceIds.value[i + 1];
      if (oldTempId) {
        temporaryServiceIds.value[i] = oldTempId;
        delete temporaryServiceIds.value[i + 1];
      }
    }
  });
};

// Yeni bir istatistik ekler
const addStatistic = () => {
  statisticsList.value.push({
    iconPath: "",
    value: "",
    label1: "",
    label2: "",
    order: statisticsList.value.length,
  });
};

// Bir istatistiği listeden siler
const removeStatistic = (index) => {
  statisticsList.value.splice(index, 1);
  statisticsList.value.forEach((statistic, i) => (statistic.order = i));
};

// ------------------------------------
// DİNAMİK LİSTE İŞLEMLERİ - MODAL FORM
// ------------------------------------

// Modal için yeni bir servis ekler
const addModalService = () => {
  modalServicesList.value.push({
    imagePath: "",
    title: "",
    subtitle: "",
    description: "",
    order: modalServicesList.value.length,
  });
};

// Modal için bir servisi listeden siler
const removeModalService = (index) => {
  modalServicesList.value.splice(index, 1);
  modalServicesList.value.forEach((service, i) => (service.order = i));
};

// Modal için yeni bir istatistik ekler
const addModalStatistic = () => {
  modalStatisticsList.value.push({
    iconPath: "",
    value: "",
    label1: "",
    label2: "",
    order: modalStatisticsList.value.length,
  });
};

// Modal için bir istatistiği listeden siler
const removeModalStatistic = (index) => {
  modalStatisticsList.value.splice(index, 1);
  modalStatisticsList.value.forEach((statistic, i) => (statistic.order = i));
};

// DÜZELTME: Görsel URL'ini görüntülemek için
const displayServiceImage = (index) => {
  const tempId = temporaryServiceIds.value[index];
  const service = servicesList.value[index];

  if (!service) return "";

  // Önce güncellenmiş resmi kontrol et, yoksa orijinal resmi göster
  return serviceImageUpdates.value[tempId] || service.imagePath || "";
};

// DÜZELTME: Resim değişikliği olup olmadığını kontrol etmek için
const hasImageUpdate = (index) => {
  const tempId = temporaryServiceIds.value[index];
  const service = servicesList.value[index];

  if (!service || !tempId) return false;

  const originalImage = service.imagePath;
  const localImage = serviceImageUpdates.value[tempId];

  return localImage && localImage !== originalImage;
};

// DÜZELTME: Servis ID'sini almak için
const getServiceTempId = (index) => {
  return (
    temporaryServiceIds.value[index] ||
    servicesList.value[index]?.id ||
    Date.now() + index
  );
};
</script>

<template>
  <div class="max-w-6xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">
      Servisler Bölümü Yönetimi 🚚
    </h1>

    <p v-if="isLoading" class="text-blue-500 my-4">Yükleniyor...</p>

    <p
      v-if="message"
      :class="[
        'mt-4 p-3 rounded',
        message.includes('hata') || message.includes('sorun')
          ? 'bg-red-100 text-red-700'
          : 'bg-green-100 text-green-700',
      ]"
    >
      {{ message }}
    </p>

    <!-- ANA FORM -->
    <form
      @submit.prevent="updateServices"
      class="space-y-8 bg-white p-6 shadow-lg rounded-lg"
    >
      <h2 class="text-xl font-semibold border-b pb-2 text-primary">
        Temel İçerik
      </h2>

      <div>
        <label for="mainTitle" class="block font-medium text-gray-700 mb-1"
          >Ana Başlık</label
        >
        <input
          id="mainTitle"
          v-model="mainTitle"
          type="text"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label for="description" class="block font-medium text-gray-700 mb-1"
          >Açıklama Paragrafı</label
        >
        <textarea
          id="description"
          v-model="description"
          rows="3"
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="buttonText" class="block font-medium text-gray-700 mb-1"
            >Buton Metni</label
          >
          <input
            id="buttonText"
            v-model="buttonText"
            type="text"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label for="buttonLink" class="block font-medium text-gray-700 mb-1"
            >Buton Linki</label
          >
          <input
            id="buttonLink"
            v-model="buttonLink"
            type="text"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <!-- SERVİSLER BÖLÜMÜ -->
      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-4">
        Hizmetler
      </h2>
      <p class="text-sm text-gray-500">
        Her hizmetin görseli, başlığı, alt başlığı ve açıklaması.
      </p>

      <div class="space-y-6">
        <div
          v-for="(service, index) in servicesList"
          :key="getServiceTempId(index)"
          class="p-6 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150"
        >
          <div class="flex justify-between items-start mb-4">
            <h4 class="font-bold text-lg text-gray-700">
              Hizmet #{{ index + 1 }}
            </h4>
            <button
              type="button"
              @click="removeService(index)"
              class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Görsel Yönetimi -->
          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-white rounded-lg border"
          >
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-2"
                >Hizmet Görsel URL</label
              >
              <input
                :value="displayServiceImage(index)"
                type="url"
                class="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                placeholder="URL otomatik olarak dolacak"
                readonly
              />
              <p
                v-if="displayServiceImage(index)"
                class="mt-2 text-sm text-gray-500"
              >
                Mevcut Görsel:
                <a
                  :href="displayServiceImage(index)"
                  target="_blank"
                  class="text-blue-500 hover:underline truncate inline-block max-w-full"
                >
                  {{ displayServiceImage(index) }}
                </a>
                <!-- DÜZELTME: Resim değişikliği kontrolü -->
                <span
                  v-if="hasImageUpdate(index)"
                  class="ml-2 text-orange-500 font-semibold"
                >
                  (Yeni yüklenen - Kaydedilmemiş)
                </span>
              </p>
              <p v-else class="mt-2 text-sm text-red-500">Mevcut Görsel Yok.</p>
            </div>
            <div>
              <FileUploader
                @file-uploaded="(url) => updateServiceImageUrl(url, index)"
                :label="'Hizmet Görseli Yükle #' + (index + 1)"
              />
            </div>
          </div>

          <!-- Servis Detayları -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                :for="'service-title-' + index"
                class="block text-sm font-medium text-gray-600"
                >Başlık</label
              >
              <input
                v-model="service.title"
                :id="'service-title-' + index"
                type="text"
                class="w-full p-2 border rounded"
                placeholder="Örn: Evden Eve Nakliyat"
                required
              />
            </div>
            <div>
              <label
                :for="'service-subtitle-' + index"
                class="block text-sm font-medium text-gray-600"
                >Alt Başlık</label
              >
              <input
                v-model="service.subtitle"
                :id="'service-subtitle-' + index"
                type="text"
                class="w-full p-2 border rounded"
                placeholder="Örn: Şehir İçi & Şehirlerarası"
              />
            </div>
            <div class="md:col-span-2">
              <label
                :for="'service-desc-' + index"
                class="block text-sm font-medium text-gray-600"
                >Açıklama</label
              >
              <textarea
                v-model="service.description"
                :id="'service-desc-' + index"
                rows="2"
                class="w-full p-2 border rounded"
                placeholder="Hizmet detayları"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        @click="addService"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 flex items-center space-x-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span>Yeni Hizmet Ekle</span>
      </button>

      <!-- İSTATİSTİKLER BÖLÜMÜ -->
      <h2 class="text-xl font-semibold border-b pb-2 text-primary pt-8">
        İstatistikler
      </h2>
      <p class="text-sm text-gray-500">Sayısal değerler ve etiketler.</p>

      <div class="space-y-4">
        <div
          v-for="(statistic, index) in statisticsList"
          :key="'statistic-' + index"
          class="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150"
        >
          <div class="flex justify-between items-start mb-3">
            <h4 class="font-bold text-lg text-gray-700">
              İstatistik #{{ index + 1 }}
            </h4>
            <button
              type="button"
              @click="removeStatistic(index)"
              class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            <div>
              <label
                :for="'statistic-icon-' + index"
                class="block text-sm font-medium text-gray-600"
                >İkon URL</label
              >
              <input
                v-model="statistic.iconPath"
                :id="'statistic-icon-' + index"
                type="text"
                class="w-full p-2 border rounded"
                placeholder="Örn: ~/assets/icons/check.svg"
              />
            </div>
            <div>
              <label
                :for="'statistic-value-' + index"
                class="block text-sm font-medium text-gray-600"
                >Değer</label
              >
              <input
                v-model="statistic.value"
                :id="'statistic-value-' + index"
                type="text"
                class="w-full p-2 border rounded"
                placeholder="Örn: 60k"
                required
              />
            </div>
            <div>
              <label
                :for="'statistic-label1-' + index"
                class="block text-sm font-medium text-gray-600"
                >Etiket 1</label
              >
              <input
                v-model="statistic.label1"
                :id="'statistic-label1-' + index"
                type="text"
                class="w-full p-2 border rounded"
                placeholder="Örn: Başarılı"
                required
              />
            </div>
            <div>
              <label
                :for="'statistic-label2-' + index"
                class="block text-sm font-medium text-gray-600"
                >Etiket 2</label
              >
              <input
                v-model="statistic.label2"
                :id="'statistic-label2-' + index"
                type="text"
                class="w-full p-2 border rounded"
                placeholder="Örn: Taşıma"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        @click="addStatistic"
        class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150 flex items-center space-x-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span>Yeni İstatistik Ekle</span>
      </button>

      <div class="flex space-x-4 pt-6 border-t mt-6">
        <button
          type="submit"
          :disabled="isLoading"
          class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-green-600 transition duration-150 disabled:opacity-50 font-semibold"
        >
          {{ isLoading ? "Güncelleniyor..." : "Tümünü Güncelle" }}
        </button>
        <button
          type="button"
          @click="showDeleteModal = true"
          class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150 font-semibold"
        >
          Kaydı Sil
        </button>
      </div>
    </form>

    <!-- YENİ KAYIT EKLE BUTONU -->
    <button
      v-if="!mainTitle && !isLoading"
      @click="openAddForm"
      class="mt-8 px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 font-semibold shadow-md"
    >
      Yeni Kayıt Ekle (İlk Kaydı Oluştur)
    </button>

    <!-- YENİ KAYIT EKLEME MODAL'I -->
    <div
      v-if="showAddForm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div
        class="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b">
          <h2 class="text-2xl font-bold text-gray-800">
            Yeni 'Servisler' Kaydı Ekle
          </h2>
          <button
            @click="closeAddForm"
            class="text-gray-500 hover:text-gray-700"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6">
          <!-- Temel İçerik -->
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-700 border-b pb-2">
              Temel İçerik
            </h3>

            <div>
              <label
                for="modal-mainTitle"
                class="block font-medium text-gray-700 mb-1"
                >Ana Başlık *</label
              >
              <input
                id="modal-mainTitle"
                v-model="newServicesFields[0].value"
                type="text"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label
                for="modal-description"
                class="block font-medium text-gray-700 mb-1"
                >Açıklama Paragrafı</label
              >
              <textarea
                id="modal-description"
                v-model="newServicesFields[1].value"
                rows="3"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  for="modal-buttonText"
                  class="block font-medium text-gray-700 mb-1"
                  >Buton Metni</label
                >
                <input
                  id="modal-buttonText"
                  v-model="newServicesFields[2].value"
                  type="text"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  for="modal-buttonLink"
                  class="block font-medium text-gray-700 mb-1"
                  >Buton Linki</label
                >
                <input
                  id="modal-buttonLink"
                  v-model="newServicesFields[3].value"
                  type="text"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <!-- Hizmetler Yönetimi -->
          <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold text-gray-700">Hizmetler</h3>
              <button
                type="button"
                @click="addModalService"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150 flex items-center space-x-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>Hizmet Ekle</span>
              </button>
            </div>

            <p class="text-sm text-gray-500">
              Yeni kayıt için hizmet ekleyebilirsiniz. (İsteğe bağlı)
            </p>

            <div class="space-y-4 max-h-96 overflow-y-auto pr-2">
              <div
                v-for="(service, index) in modalServicesList"
                :key="'modal-service-' + index"
                class="p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-150"
              >
                <div class="flex justify-between items-start mb-3">
                  <h4 class="font-bold text-lg text-gray-700">
                    Hizmet #{{ index + 1 }}
                  </h4>
                  <button
                    type="button"
                    @click="removeModalService(index)"
                    class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <!-- Modal Görsel Yönetimi -->
                <div
                  class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-3 bg-gray-100 rounded border"
                >
                  <div>
                    <label class="block text-sm font-medium text-gray-600 mb-2"
                      >Görsel URL (Otomatik dolacak)</label
                    >
                    <input
                      v-model="service.imagePath"
                      type="url"
                      class="w-full p-2 border border-gray-300 rounded bg-gray-50 cursor-not-allowed"
                      placeholder="Dosya yüklendikten sonra otomatik dolacak"
                      readonly
                    />
                    <p
                      v-if="service.imagePath"
                      class="mt-2 text-sm text-green-600"
                    >
                      ✓ Görsel başarıyla yüklendi!
                    </p>
                    <p v-else class="mt-2 text-sm text-red-500">
                      ⚠️ Lütfen görsel yükleyin
                    </p>
                  </div>
                  <div class="border-l pl-4">
                    <FileUploader
                      @file-uploaded="
                        (url) => updateModalServiceImageUrl(url, index)
                      "
                      :label="'Hizmet Görseli Yükle #' + (index + 1)"
                    />
                  </div>
                </div>

                <!-- Servis Detayları -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label
                      :for="'modal-service-title-' + index"
                      class="block text-sm font-medium text-gray-600 mb-1"
                      >Başlık</label
                    >
                    <input
                      v-model="service.title"
                      :id="'modal-service-title-' + index"
                      type="text"
                      class="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Örn: Evden Eve Nakliyat"
                    />
                  </div>
                  <div>
                    <label
                      :for="'modal-service-subtitle-' + index"
                      class="block text-sm font-medium text-gray-600 mb-1"
                      >Alt Başlık</label
                    >
                    <input
                      v-model="service.subtitle"
                      :id="'modal-service-subtitle-' + index"
                      type="text"
                      class="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Örn: Şehir İçi & Şehirlerarası"
                    />
                  </div>
                  <div class="md:col-span-2">
                    <label
                      :for="'modal-service-desc-' + index"
                      class="block text-sm font-medium text-gray-600 mb-1"
                      >Açıklama</label
                    >
                    <textarea
                      v-model="service.description"
                      :id="'modal-service-desc-' + index"
                      rows="2"
                      class="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Hizmet detayları"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div
                v-if="modalServicesList.length === 0"
                class="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-12 w-12 mx-auto text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <p class="mt-2">Henüz hizmet eklenmemiş</p>
                <button
                  type="button"
                  @click="addModalService"
                  class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-150"
                >
                  İlk Hizmeti Ekle
                </button>
              </div>
            </div>
          </div>

          <!-- İstatistikler Yönetimi -->
          <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold text-gray-700">İstatistikler</h3>
              <button
                type="button"
                @click="addModalStatistic"
                class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150 flex items-center space-x-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>İstatistik Ekle</span>
              </button>
            </div>

            <p class="text-sm text-gray-500">
              Yeni kayıt için istatistik ekleyebilirsiniz. (İsteğe bağlı)
            </p>

            <div class="space-y-4 max-h-96 overflow-y-auto pr-2">
              <div
                v-for="(statistic, index) in modalStatisticsList"
                :key="'modal-statistic-' + index"
                class="p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition duration-150"
              >
                <div class="flex justify-between items-start mb-3">
                  <h4 class="font-bold text-lg text-gray-700">
                    İstatistik #{{ index + 1 }}
                  </h4>
                  <button
                    type="button"
                    @click="removeModalStatistic(index)"
                    class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition duration-150"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div
                  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3"
                >
                  <div>
                    <label
                      :for="'modal-statistic-icon-' + index"
                      class="block text-sm font-medium text-gray-600 mb-1"
                      >İkon URL</label
                    >
                    <input
                      v-model="statistic.iconPath"
                      :id="'modal-statistic-icon-' + index"
                      type="text"
                      class="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Örn: ~/assets/icons/check.svg"
                    />
                  </div>
                  <div>
                    <label
                      :for="'modal-statistic-value-' + index"
                      class="block text-sm font-medium text-gray-600 mb-1"
                      >Değer</label
                    >
                    <input
                      v-model="statistic.value"
                      :id="'modal-statistic-value-' + index"
                      type="text"
                      class="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Örn: 60k"
                    />
                  </div>
                  <div>
                    <label
                      :for="'modal-statistic-label1-' + index"
                      class="block text-sm font-medium text-gray-600 mb-1"
                      >Etiket 1</label
                    >
                    <input
                      v-model="statistic.label1"
                      :id="'modal-statistic-label1-' + index"
                      type="text"
                      class="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Örn: Başarılı"
                    />
                  </div>
                  <div>
                    <label
                      :for="'modal-statistic-label2-' + index"
                      class="block text-sm font-medium text-gray-600 mb-1"
                      >Etiket 2</label
                    >
                    <input
                      v-model="statistic.label2"
                      :id="'modal-statistic-label2-' + index"
                      type="text"
                      class="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Örn: Taşıma"
                    />
                  </div>
                </div>
              </div>

              <div
                v-if="modalStatisticsList.length === 0"
                class="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-12 w-12 mx-auto text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <p class="mt-2">Henüz istatistik eklenmemiş</p>
                <button
                  type="button"
                  @click="addModalStatistic"
                  class="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-150"
                >
                  İlk İstatistiği Ekle
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div
          class="flex justify-end space-x-3 p-6 border-t bg-gray-50 rounded-b-lg"
        >
          <button
            @click="closeAddForm"
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-150"
          >
            İptal
          </button>
          <button
            @click="
              addServices({
                mainTitle: newServicesFields[0].value,
                description: newServicesFields[1].value,
                buttonText: newServicesFields[2].value,
                buttonLink: newServicesFields[3].value,
              })
            "
            :disabled="!newServicesFields[0].value || isLoading"
            class="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-150 disabled:opacity-50"
          >
            {{ isLoading ? "Ekleniyor..." : "Kaydı Oluştur" }}
          </button>
        </div>
      </div>
    </div>
    <AdminModalDynamicDeleteModal
      :show="showDeleteModal"
      title="Bölüm Kaydını Sil"
      message="Bu bölümdeki tüm verileri (ana metinler, hizmetler ve istatistikler) silmek istediğinize emin misiniz? Bu işlem geri alınamaz!"
      confirmText="Evet, Kaydı Sil"
      cancelText="İptal Et"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
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

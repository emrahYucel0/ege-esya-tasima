<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Image from '@tiptap/extension-image'

// Türkiye illeri listesi artık utils/turkishCities.ts'de tek bir yerde
// tanımlı (önceden burada ve pages/[...slug].vue'da birbirinden bağımsız
// iki kopya olarak duruyordu — üstelik pages/[...slug].vue'daki kopyada
// id 47 yanlışlıkla "Karaman" olarak etiketlenmişti, doğrusu "Mardin"dir;
// 70 zaten doğru şekilde "Karaman"dı).

const { form: region, message, items: allRegions, isSaving, isDeleting, resetForm: resetFormBase, selectItem, save, remove, replaceItem } = useListCrud('regions', {
  id: null,
  title: '',
  subtitle: '',
  shortTitle: '',
  slug: '',
  content: '',
  excerpt: '',
  image: '',
  isActive: false,
  cities: [],
  priceFactorsTitle: 'Fiyatını Etkileyen Faktörler',
  priceFactorsImage: 'https://cdn.armut.com/images/seo-pages/tr-TR/price-factors.svg',
  priceFactors: [],
}, { listQuery: '?admin=true' })

// --- Fiyat Faktörü Girişi (form dışı, panel-özel yardımcı state) ---
const priceFactorInput = ref({
  factor: '',
  min: '',
  max: ''
})

// Fiyat faktörü ekleme fonksiyonu
const addPriceFactor = () => {
  if (!priceFactorInput.value.factor) {
    alert('Faktör adı zorunludur')
    return
  }

  region.priceFactors.push({
    factor: priceFactorInput.value.factor,
    min: priceFactorInput.value.min || '0 TL',
    max: priceFactorInput.value.max || '0 TL'
  })

  // Input'ları temizle
  priceFactorInput.value = {
    factor: '',
    min: '',
    max: ''
  }
}

// Fiyat faktörü silme fonksiyonu
const removePriceFactor = (index) => {
  region.priceFactors.splice(index, 1)
}

// --- Bölge Seçimi ---
const selectRegion = (slug) => {
  const selected = selectItem(slug)
  if (selected) {
    // priceFactors'ı kontrol et
    if (selected.priceFactors) {
      if (typeof selected.priceFactors === 'string') {
        try {
          region.priceFactors = JSON.parse(selected.priceFactors)
        } catch (error) {
          console.error('PriceFactors JSON parse hatası:', error)
          region.priceFactors = []
        }
      } else if (Array.isArray(selected.priceFactors)) {
        region.priceFactors = selected.priceFactors
      } else {
        region.priceFactors = []
      }
    } else {
      region.priceFactors = []
    }

    // priceFactorsTitle ve priceFactorsImage'ı kontrol et
    region.priceFactorsTitle = selected.priceFactorsTitle || 'Fiyatını Etkileyen Faktörler'
    region.priceFactorsImage = selected.priceFactorsImage || 'https://cdn.armut.com/images/seo-pages/tr-TR/price-factors.svg'

    if (editor.value) {
      editor.value.commands.setContent(selected.content)
    }
    showEditModal.value = true
  }
}

// --- İl Arama Filtresi ---
const citySearchQuery = ref('')

// --- Filtrelenmiş İller ---
const filteredCities = computed(() => {
  if (!citySearchQuery.value.trim()) {
    return turkishCities
  }
  
  const query = citySearchQuery.value.toLowerCase().trim()
  return turkishCities.filter(city => 
    city.name.toLowerCase().includes(query) || 
    city.id.toString().includes(query)
  )
})

// --- İl Seçim/Deseçim Fonksiyonları ---
const toggleCitySelection = (cityId) => {
  const index = region.cities.indexOf(cityId)

  if (index > -1) {
    // Eğer il zaten seçiliyse kaldır
    region.cities.splice(index, 1)
  } else {
    // İl seçili değilse ekle
    region.cities.push(cityId)
  }
}

const selectAllCities = () => {
  region.cities = turkishCities.map(city => city.id)
}

const clearAllCities = () => {
  region.cities = []
}

// --- Seçili İlleri İsimleriyle Getir ---
const selectedCityNames = computed(() => {
  return region.cities.map(cityId => {
    const city = turkishCities.find(c => c.id === cityId)
    return city ? city.name : ''
  }).filter(name => name !== '')
})

// --- Arama ve Sayfalama Değişkenleri ---
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(9)
const pageGroupSize = ref(10)

// --- Filtreleme Değişkenleri ---
const statusFilter = ref('all') // 'all', 'active', 'inactive'
const imageFilter = ref('all')  // 'all', 'with-image', 'without-image'

// --- Karakter Dönüşüm Fonksiyonu ---
const sanitizeText = (text) => {
  const charMap = {
    'ç': 'c', 'Ç': 'c',
    'ğ': 'g', 'Ğ': 'g',
    'ı': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'o',
    'ş': 's', 'Ş': 's',
    'ü': 'u', 'Ü': 'u'
  }
  return text.split('').map(char => charMap[char] || char).join('')
}

// --- Slug Oluşturma ---
const generateSlug = () => {
  const title = region.title
  let slug = sanitizeText(title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

  region.slug = slug
}

// --- Tiptap Editor Instance ---
const editor = ref(null)
onMounted(() => {
  editor.value = new Editor({
    content: region.content,
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      // Seviye 1 kasıtlı olarak dışarıda: sayfa şablonu içeriğin üstünde
      // zaten kendi <h1>{{ region.title }}</h1>'ini basıyor; içerik
      // gövdesinde de bir H1 seçilebilirse aynı sayfada birden fazla H1
      // oluşur (SEO başlık hiyerarşisi bozulur).
      Heading.configure({
        levels: [2, 3],
      }),
      Bold,
      Italic,
      Underline,
      BulletList,
      OrderedList,
      ListItem,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    onUpdate: () => {
      region.content = editor.value.getHTML()
    }
  })
})

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})

// --- İstatistik Hesaplamaları ---
const statistics = computed(() => {
  const stats = {
    total: allRegions.value.length,
    active: allRegions.value.filter(r => r.isActive).length,
    inactive: allRegions.value.filter(r => !r.isActive).length,
    withImage: allRegions.value.filter(r => r.image && r.image.trim() !== '').length,
    withoutImage: allRegions.value.filter(r => !r.image || r.image.trim() === '').length
  }
  
  stats.activePercentage = stats.total > 0 ? Math.round((stats.active / stats.total) * 100) : 0
  stats.withImagePercentage = stats.total > 0 ? Math.round((stats.withImage / stats.total) * 100) : 0
  
  return stats
})

// --- Filtreleme Hesaplamaları ---
const filteredRegions = computed(() => {
  let filtered = allRegions.value
  
  // Metin arama filtresi
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(region => 
      region.title?.toLowerCase().includes(query) ||
      region.subtitle?.toLowerCase().includes(query) ||
      region.excerpt?.toLowerCase().includes(query) ||
      region.slug?.toLowerCase().includes(query)
    )
  }
  
  // Durum filtresi
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(region => 
      statusFilter.value === 'active' ? region.isActive : !region.isActive
    )
  }
  
  // Resim filtresi
  if (imageFilter.value !== 'all') {
    filtered = filtered.filter(region => {
      const hasImage = region.image && region.image.trim() !== ''
      return imageFilter.value === 'with-image' ? hasImage : !hasImage
    })
  }
  
  return filtered
})

// --- Filtre İstatistikleri ---
const filterStatistics = computed(() => {
  const activeCount = filteredRegions.value.filter(r => r.isActive).length
  const withImageCount = filteredRegions.value.filter(r => r.image && r.image.trim() !== '').length
  
  return {
    filteredCount: filteredRegions.value.length,
    activeInFilter: activeCount,
    withImageInFilter: withImageCount,
    activePercentageInFilter: filteredRegions.value.length > 0 
      ? Math.round((activeCount / filteredRegions.value.length) * 100) 
      : 0,
    withImagePercentageInFilter: filteredRegions.value.length > 0 
      ? Math.round((withImageCount / filteredRegions.value.length) * 100) 
      : 0
  }
})

// --- Sayfalama Hesaplamaları ---
const paginatedRegions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredRegions.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredRegions.value.length / itemsPerPage.value)
})

// --- Sayfa Gruplama Hesaplamaları ---
const currentPageGroup = computed(() => {
  return Math.ceil(currentPage.value / pageGroupSize.value)
})

const totalPageGroups = computed(() => {
  return Math.ceil(totalPages.value / pageGroupSize.value)
})

const pageGroupStart = computed(() => {
  return (currentPageGroup.value - 1) * pageGroupSize.value + 1
})

const pageGroupEnd = computed(() => {
  const end = currentPageGroup.value * pageGroupSize.value
  return end > totalPages.value ? totalPages.value : end
})

const visiblePages = computed(() => {
  const pages = []
  for (let i = pageGroupStart.value; i <= pageGroupEnd.value; i++) {
    pages.push(i)
  }
  return pages
})

// --- Sayfa Navigasyonu ---
const navigatePage = (page) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

const navigateFirstPage = () => {
  currentPage.value = 1
}

const navigateLastPage = () => {
  currentPage.value = totalPages.value
}

const navigatePreviousGroup = () => {
  const newPage = pageGroupStart.value - pageGroupSize.value
  if (newPage >= 1) {
    currentPage.value = newPage
  } else {
    navigateFirstPage()
  }
}

const navigateNextGroup = () => {
  const newPage = pageGroupEnd.value + 1
  if (newPage <= totalPages.value) {
    currentPage.value = newPage
  } else {
    navigateLastPage()
  }
}

// Filtre değiştiğinde ilk sayfaya dön
watch([searchQuery, statusFilter, imageFilter], () => {
  navigateFirstPage()
})

// --- Modal Kontrolleri ---
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedSlug = ref('')

// --- Filtreleri Sıfırla ---
const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = 'all'
  imageFilter.value = 'all'
}

// --- Resim Ekleme Fonksiyonu ---
const addImage = () => {
  let url = prompt("Eklemek istediğiniz resmin URL'sini giriniz:")
  if (url && editor.value) {
    url = sanitizeText(url)
    editor.value.chain().focus().setImage({ src: url }).run()
  }
}

// --- Bölge Silme ---
const deleteRegion = async () => {
  const result = await remove(selectedSlug.value)
  showDeleteModal.value = false
  if (!result.success) {
    alert('Bölge silinirken hata oluştu.')
  }
}

// --- Bölge Durumunu Değiştir ---
const toggleRegionStatus = async (slug, currentStatus) => {
  try {
    const regionToUpdate = allRegions.value.find(r => r.slug === slug)
    if (!regionToUpdate) return

    const updatedRegion = await $fetch('/api/regions', {
      method: 'PUT',
      body: {
        ...regionToUpdate,
        isActive: !currentStatus
      }
    })

    replaceItem({ ...regionToUpdate, isActive: updatedRegion.data.isActive })
  } catch (error) {
    console.error('Durum güncelleme hatası:', error)
    alert('Durum güncellenirken hata oluştu: ' + error.message)
  }
}

// --- Yeni Bölge Ekleme Modalını Aç ---
const openAddForm = () => {
  resetForm()
  showEditModal.value = true
}

// --- Form Gönderimi ---
const submitForm = async () => {
  const result = await save()
  if (result.success) {
    showEditModal.value = false
    resetForm()
  } else {
    alert('İşlem başarısız: ' + (result.error || 'Bilinmeyen hata'))
  }
}

// --- Formu Sıfırla ---
const resetForm = () => {
  resetFormBase()
  priceFactorInput.value = {
    factor: '',
    min: '',
    max: ''
  }
  if (editor.value) {
    editor.value.commands.clearContent()
  }
}

// --- FileUploader'dan Gelen Event'i İşle ---
const updateImageUrl = (url) => {
  region.image = url
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <!-- Başlık ve Ekleme Butonu -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">Bölge Yönetim Paneli</h1>
      <button
        @click="openAddForm"
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Yeni Bölge Ekle
      </button>
    </div>

    <!-- İstatistik Kartları -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <div class="bg-white p-4 rounded-lg shadow border">
        <div class="text-sm text-gray-500 mb-1">Toplam Bölge</div>
        <div class="text-2xl font-bold">{{ statistics.total }}</div>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow border">
        <div class="text-sm text-gray-500 mb-1">Aktif Bölge</div>
        <div class="text-2xl font-bold text-green-600">{{ statistics.active }}</div>
        <div class="text-xs text-gray-500">{{ statistics.activePercentage }}%</div>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow border">
        <div class="text-sm text-gray-500 mb-1">Pasif Bölge</div>
        <div class="text-2xl font-bold text-red-600">{{ statistics.inactive }}</div>
        <div class="text-xs text-gray-500">{{ 100 - statistics.activePercentage }}%</div>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow border">
        <div class="text-sm text-gray-500 mb-1">Resimli</div>
        <div class="text-2xl font-bold text-blue-600">{{ statistics.withImage }}</div>
        <div class="text-xs text-gray-500">{{ statistics.withImagePercentage }}%</div>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow border">
        <div class="text-sm text-gray-500 mb-1">Resimsiz</div>
        <div class="text-2xl font-bold text-yellow-600">{{ statistics.withoutImage }}</div>
        <div class="text-xs text-gray-500">{{ 100 - statistics.withImagePercentage }}%</div>
      </div>
    </div>

    <!-- Filtreleme Paneli -->
    <div class="bg-white p-6 rounded-lg shadow border mb-8">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <h3 class="text-lg font-semibold text-gray-800">Filtreleme</h3>
        <button 
          @click="resetFilters"
          class="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50 text-gray-600"
          :disabled="searchQuery === '' && statusFilter === 'all' && imageFilter === 'all'"
          :class="{ 'opacity-50 cursor-not-allowed': searchQuery === '' && statusFilter === 'all' && imageFilter === 'all' }"
        >
          Filtreleri Sıfırla
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Metin Arama -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Metin Ara</label>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Başlık, açıklama, slug..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <!-- Durum Filtresi -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Durum</label>
          <div class="flex flex-wrap gap-2">
            <button
              @click="statusFilter = 'all'"
              :class="[
                'px-3 py-1.5 text-sm rounded transition-colors',
                statusFilter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              ]"
            >
              Tümü ({{ statistics.total }})
            </button>
            <button
              @click="statusFilter = 'active'"
              :class="[
                'px-3 py-1.5 text-sm rounded transition-colors',
                statusFilter === 'active' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-green-100 hover:bg-green-200 text-green-700'
              ]"
            >
              Aktif ({{ statistics.active }})
            </button>
            <button
              @click="statusFilter = 'inactive'"
              :class="[
                'px-3 py-1.5 text-sm rounded transition-colors',
                statusFilter === 'inactive' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-red-100 hover:bg-red-200 text-red-700'
              ]"
            >
              Pasif ({{ statistics.inactive }})
            </button>
          </div>
        </div>
        
        <!-- Resim Filtresi -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Resim Durumu</label>
          <div class="flex flex-wrap gap-2">
            <button
              @click="imageFilter = 'all'"
              :class="[
                'px-3 py-1.5 text-sm rounded transition-colors',
                imageFilter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              ]"
            >
              Tümü ({{ statistics.total }})
            </button>
            <button
              @click="imageFilter = 'with-image'"
              :class="[
                'px-3 py-1.5 text-sm rounded transition-colors',
                imageFilter === 'with-image' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-purple-100 hover:bg-purple-200 text-purple-700'
              ]"
            >
              Resimli ({{ statistics.withImage }})
            </button>
            <button
              @click="imageFilter = 'without-image'"
              :class="[
                'px-3 py-1.5 text-sm rounded transition-colors',
                imageFilter === 'without-image' 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700'
              ]"
            >
              Resimsiz ({{ statistics.withoutImage }})
            </button>
          </div>
        </div>
      </div>
      
      <!-- Filtre Sonuçları Bilgisi -->
      <div class="mt-4 pt-4 border-t">
        <div class="flex items-center justify-between">
          <div class="text-sm">
            <span class="font-medium text-gray-700">{{ filterStatistics.filteredCount }}</span>
            <span class="text-gray-600"> bölge bulundu</span>
            <template v-if="filterStatistics.filteredCount > 0">
              <span class="mx-2">•</span>
              <span class="text-green-600 font-medium">{{ filterStatistics.activeInFilter }}</span>
              <span class="text-gray-600"> aktif (</span>
              <span class="font-medium">{{ filterStatistics.activePercentageInFilter }}%</span>
              <span class="text-gray-600">)</span>
              <span class="mx-2">•</span>
              <span class="text-blue-600 font-medium">{{ filterStatistics.withImageInFilter }}</span>
              <span class="text-gray-600"> resimli (</span>
              <span class="font-medium">{{ filterStatistics.withImagePercentageInFilter }}%</span>
              <span class="text-gray-600">)</span>
            </template>
          </div>
          
          <div class="text-sm text-gray-500">
            Filtrelenmiş: {{ filterStatistics.filteredCount }} / {{ statistics.total }}
          </div>
        </div>
      </div>
    </div>

    <!-- Sayfalama Kontrolleri - ÜST -->
    <div v-if="totalPages > 1" class="mb-6">
      <div class="bg-white p-4 rounded-lg shadow border">
        <!-- Hızlı Navigasyon Butonları -->
        <div class="flex flex-wrap items-center justify-center gap-2 mb-3">
          <!-- İlk Sayfa -->
          <button
            @click="navigateFirstPage"
            :disabled="currentPage === 1"
            class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="İlk sayfaya git"
          >
            &laquo;&laquo; İlk
          </button>
          
          <!-- Önceki 10 Sayfa -->
          <button
            @click="navigatePreviousGroup"
            :disabled="currentPageGroup === 1"
            class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Önceki 10 sayfaya git"
          >
            &laquo; Önceki 10
          </button>
          
          <!-- Önceki Sayfa -->
          <button
            @click="navigatePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Önceki sayfa"
          >
            &laquo; Önceki
          </button>

          <!-- Sayfa Numaraları ve Grup Bilgisi -->
          <div class="flex items-center px-3">
            <span class="text-sm font-medium text-gray-700">
              Sayfalar {{ pageGroupStart }}-{{ pageGroupEnd }} / {{ totalPages }}
            </span>
          </div>

          <!-- Sonraki Sayfa -->
          <button
            @click="navigatePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Sonraki sayfa"
          >
            Sonraki &raquo;
          </button>
          
          <!-- Sonraki 10 Sayfa -->
          <button
            @click="navigateNextGroup"
            :disabled="currentPageGroup === totalPageGroups"
            class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Sonraki 10 sayfaya git"
          >
            Sonraki 10 &raquo;
          </button>
          
          <!-- Son Sayfa -->
          <button
            @click="navigateLastPage"
            :disabled="currentPage === totalPages"
            class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Son sayfaya git"
          >
            Son &raquo;&raquo;
          </button>
        </div>

        <!-- Sayfa Numaraları -->
        <div class="flex flex-wrap justify-center gap-1 mb-2">
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="navigatePage(page)"
            :class="[
              'w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors',
              page === currentPage
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 hover:bg-gray-200 border border-gray-300'
            ]"
            :title="`${page}. sayfaya git`"
          >
            {{ page }}
          </button>
        </div>

        <!-- Aktif Sayfa ve Toplam Sayfa -->
        <div class="text-center text-sm text-gray-600 mt-2">
          <span class="font-medium">Aktif Sayfa:</span> {{ currentPage }} / {{ totalPages }}
          <span class="mx-2">•</span>
          <span class="font-medium">Sayfa Grubu:</span> {{ currentPageGroup }} / {{ totalPageGroups }}
        </div>
      </div>
    </div>

    <!-- Bölge Listesi -->
    <div v-if="paginatedRegions.length === 0" class="text-center py-12 bg-white rounded-lg shadow border">
      <p class="text-gray-500 text-lg">
        {{ searchQuery || statusFilter !== 'all' || imageFilter !== 'all' ? 'Filtrelere uygun bölge bulunamadı' : 'Henüz bölge eklenmemiş' }}
      </p>
      <button 
        v-if="searchQuery || statusFilter !== 'all' || imageFilter !== 'all'"
        @click="resetFilters"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Filtreleri Temizle
      </button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="regionItem in paginatedRegions" 
        :key="regionItem.id"
        :class="[
          'bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 relative',
          regionItem.isActive ? 'border-green-500' : 'border-gray-300'
        ]"
      >
        <!-- Resim Durumu Göstergesi -->
        <div 
          v-if="!regionItem.image || regionItem.image.trim() === ''"
          class="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full"
          title="Resim yok"
        >
          📷 Yok
        </div>
        
        <!-- Durum Göstergesi -->
        <div class="flex justify-between items-start mb-2">
          <span 
            :class="[
              'px-2 py-1 text-xs font-semibold rounded-full',
              regionItem.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            ]"
          >
            {{ regionItem.isActive ? 'Aktif' : 'Pasif' }}
          </span>
        </div>

        <div class="relative overflow-hidden rounded-lg mb-4 bg-gray-100" style="height: 192px;">
          <img 
            v-if="regionItem.image && regionItem.image.trim() !== ''"
            :src="regionItem.image" 
            :alt="regionItem.title"
            class="w-full h-full object-cover"
            :onerror="`this.src='/img/default-region.jpg'; this.onerror=null;`"
          />
          <div 
            v-else
            class="w-full h-full flex flex-col items-center justify-center text-gray-400"
          >
            <svg class="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span class="text-sm">Resim Yok</span>
          </div>
        </div>
        
        <h3 class="text-xl font-semibold mb-2">{{ regionItem.title }}</h3>
        <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ regionItem.excerpt }}</p>
        
        <div class="flex flex-wrap gap-2">
          <!-- Durum Değiştir Butonu -->
          <button 
            @click="toggleRegionStatus(regionItem.slug, regionItem.isActive)"
            :class="[
              'px-3 py-1 rounded text-sm font-medium transition-colors',
              regionItem.isActive
                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                : 'bg-green-100 text-green-800 hover:bg-green-200'
            ]"
          >
            {{ regionItem.isActive ? 'Pasif Yap' : 'Aktif Yap' }}
          </button>
          
          <!-- Düzenle Butonu -->
          <button 
            @click="selectRegion(regionItem.slug)"
            class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium transition-colors"
          >
            Düzenle
          </button>
          
          <!-- Sil Butonu -->
          <button 
            @click="selectedSlug = regionItem.slug; showDeleteModal = true"
            class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-medium transition-colors"
          >
            Sil
          </button>
        </div>
        
        <!-- Bölge Bilgileri -->
        <div class="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
          <div class="flex justify-between mb-1">
            <span>Slug: {{ regionItem.slug }}</span>
            <span>{{ regionItem.image && regionItem.image.trim() !== '' ? '📷 Var' : '📷 Yok' }}</span>
          </div>
          <!-- İl bilgisi -->
          <div v-if="regionItem.cities && Array.isArray(regionItem.cities) && regionItem.cities.length > 0">
            <div class="mt-1">
              <span class="font-medium text-gray-700">Bağlı İller:</span>
              <div class="flex flex-wrap gap-1 mt-1">
                <span 
                  v-for="cityId in regionItem.cities.slice(0, 3)" 
                  :key="cityId"
                  class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                >
                  {{ turkishCities.find(c => c.id === cityId)?.name || cityId }}
                </span>
                <span 
                  v-if="regionItem.cities.length > 3"
                  class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                >
                  +{{ regionItem.cities.length - 3 }} il
                </span>
              </div>
            </div>
          </div>
          <div v-else class="mt-1 text-gray-400 text-xs">
            <span>İl bağlantısı yok</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Sayfalama Kontrolleri - ALT -->
    <div v-if="totalPages > 1" class="mt-8">
      <div class="bg-white p-4 rounded-lg shadow border">
        <!-- Hızlı Navigasyon Butonları -->
        <div class="flex flex-wrap items-center justify-center gap-2 mb-3">
          <!-- İlk Sayfa -->
          <button
            @click="navigateFirstPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="İlk sayfaya git"
          >
            &laquo;&laquo;
          </button>
          
          <!-- Önceki 10 Sayfa -->
          <button
            @click="navigatePreviousGroup"
            :disabled="currentPageGroup === 1"
            class="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Önceki 10 sayfaya git"
          >
            -10
          </button>
          
          <!-- Önceki Sayfa -->
          <button
            @click="navigatePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Önceki sayfa"
          >
            &laquo;
          </button>

          <!-- Sayfa Numaraları -->
          <div class="flex items-center space-x-1 mx-2">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="navigatePage(page)"
              :class="[
                'min-w-[40px] h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors',
                page === currentPage
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 hover:bg-gray-200 border border-gray-300'
              ]"
              :title="`${page}. sayfaya git`"
            >
              {{ page }}
            </button>
          </div>

          <!-- Sonraki Sayfa -->
          <button
            @click="navigatePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Sonraki sayfa"
          >
            &raquo;
          </button>
          
          <!-- Sonraki 10 Sayfa -->
          <button
            @click="navigateNextGroup"
            :disabled="currentPageGroup === totalPageGroups"
            class="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Sonraki 10 sayfaya git"
          >
            +10
          </button>
          
          <!-- Son Sayfa -->
          <button
            @click="navigateLastPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Son sayfaya git"
          >
            &raquo;&raquo;
          </button>
        </div>

        <!-- Sayfa Bilgisi -->
        <div class="text-center">
          <div class="inline-flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-lg">
            <div class="text-sm">
              <span class="font-medium text-gray-700">Sayfa:</span>
              <input
                type="number"
                :value="currentPage"
                @input="navigatePage(parseInt($event.target.value) || 1)"
                @keyup.enter="$event.target.blur()"
                min="1"
                :max="totalPages"
                class="ml-2 w-16 px-2 py-1 border border-gray-300 rounded text-center"
              />
              <span class="mx-2">/</span>
              <span class="font-medium">{{ totalPages }}</span>
            </div>
            
            <div class="text-sm">
              <span class="font-medium text-gray-700">Grp:</span>
              <span class="ml-2">{{ currentPageGroup }} / {{ totalPageGroups }}</span>
            </div>
            
            <div class="text-sm">
              <span class="font-medium text-gray-700">Gösterilen:</span>
              <span class="ml-2">{{ paginatedRegions.length }}</span>
            </div>
            
            <div class="text-sm">
              <span class="font-medium text-gray-700">Toplam:</span>
              <span class="ml-2">{{ filterStatistics.filteredCount }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Düzenleme/Ekleme Modalı -->
    <div 
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 class="text-xl font-bold mb-4">{{ region.id ? 'Bölge Düzenle' : 'Yeni Bölge Ekle' }}</h2>
        
        <form @submit.prevent="submitForm" class="space-y-4">
          <!-- Temel Bilgiler -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block mb-2 font-medium">Başlık <span class="text-red-500">*</span></label>
              <input 
                v-model="region.title" 
                @input="generateSlug"
                type="text" 
                class="w-full p-2 border rounded"
                required
              >
            </div>
            <div>
              <label class="block mb-2 font-medium">Slug <span class="text-red-500">*</span></label>
              <input 
                v-model="region.slug" 
                type="text" 
                class="w-full p-2 border rounded"
                required
              >
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block mb-2 font-medium">Alt Başlık</label>
              <input 
                v-model="region.subtitle" 
                type="text" 
                class="w-full p-2 border rounded"
              >
            </div>
            <div>
              <label class="block mb-2 font-medium">Kısa Başlık</label>
              <input 
                v-model="region.shortTitle" 
                type="text" 
                class="w-full p-2 border rounded"
              >
            </div>
          </div>

          <!-- İl Seçimi Bölümü -->
          <div class="border rounded-lg p-4">
            <div class="flex justify-between items-center mb-4">
              <label class="block font-medium">
                Bağlı Olduğu İller (Zorunlu değil)
                <span class="text-sm font-normal text-gray-500 ml-2">
                  (Birden fazla il seçilebilir)
                </span>
              </label>
              <div class="flex gap-2">
                <button 
                  type="button"
                  @click="selectAllCities"
                  class="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  Tümünü Seç
                </button>
                <button 
                  type="button"
                  @click="clearAllCities"
                  class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  Temizle
                </button>
              </div>
            </div>

            <!-- Seçili İller Göstergesi -->
            <div v-if="selectedCityNames.length > 0" class="mb-4 p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center gap-2 mb-2">
                <span class="font-medium text-gray-700">
                  Seçilen İller ({{ region.cities.length }}):
                </span>
                <span class="text-sm text-blue-600 font-medium">
                  {{ selectedCityNames.slice(0, 5).join(', ') }}
                  <span v-if="selectedCityNames.length > 5"> ve {{ selectedCityNames.length - 5 }} il daha</span>
                </span>
              </div>
            </div>

            <!-- İl Arama -->
            <div class="mb-4">
              <input
                v-model="citySearchQuery"
                type="text"
                placeholder="İl ara..."
                class="w-full p-2 border rounded-lg"
              />
            </div>

            <!-- İl Listesi -->
            <div class="max-h-60 overflow-y-auto border rounded-lg">
              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-3">
                <div
                  v-for="city in filteredCities"
                  :key="city.id"
                  @click="toggleCitySelection(city.id)"
                  :class="[
                    'flex items-center p-3 border rounded-lg cursor-pointer transition-colors',
                    region.cities.includes(city.id)
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  ]"
                >
                  <input
                    type="checkbox"
                    :checked="region.cities.includes(city.id)"
                    class="mr-2 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    readonly
                  />
                  <div>
                    <div class="font-medium">{{ city.name }}</div>
                    <div class="text-xs text-gray-500">Plaka: {{ city.id }}</div>
                  </div>
                </div>
              </div>
              
              <div v-if="filteredCities.length === 0" class="p-4 text-center text-gray-500">
                İl bulunamadı
              </div>
            </div>

            <!-- Bilgilendirme -->
            <div class="mt-4 text-sm text-gray-500">
              <p>📌 <strong>Not:</strong> İl seçimi zorunlu değildir. </p>
              <p class="mt-1">Örneğin Pendik için İstanbul'u seçerseniz, ön yüzde İstanbul sayfasında Pendik de gözükecektir.</p>
            </div>
          </div>

          <!-- Görsel Yükleme -->
          <div>
            <label class="block mb-2 font-medium">Görsel URL <span class="text-red-500">*</span></label>
            <div class="flex gap-2">
              <input 
                v-model="region.image" 
                type="text" 
                class="flex-1 p-2 border rounded"
                required
                placeholder="https://example.com/image.jpg"
              >
              <button
                type="button"
                @click="region.image = ''"
                class="px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                v-if="region.image"
              >
                Temizle
              </button>
            </div>
            <div class="mt-2">
              <FileUploader @file-uploaded="updateImageUrl" />
            </div>
            <div class="text-xs text-gray-500 mt-1">
              📷 Resim yüklerseniz bölge kartlarında görünecektir
            </div>
          </div>

          <!-- Aktif/Pasif Switch -->
          <div class="flex items-center space-x-2">
            <input 
              type="checkbox" 
              v-model="region.isActive" 
              id="isActive"
              class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            >
            <label for="isActive" class="font-medium text-gray-700">
              Bölgeyi Aktif Et
            </label>
            <span class="text-sm text-gray-500">
              (Aktif edilen bölgeler ön yüzde görünecektir)
            </span>
          </div>

                <!-- Fiyat Faktörleri Bölümü -->
      <div class="border rounded-lg p-4 mt-6 bg-gray-50">
        <h3 class="text-lg font-semibold mb-4 flex items-center">
          <span class="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm mr-2">₺</span>
          Fiyatı Etkileyen Faktörler Tablosu
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block mb-2 font-medium">Tablo Başlığı</label>
            <input 
              v-model="region.priceFactorsTitle" 
              type="text" 
              class="w-full p-2 border rounded"
              placeholder="Örn: İzmir Evden Eve Nakliyat Fiyatını Etkileyen Faktörler"
            >
          </div>
          <div>
            <label class="block mb-2 font-medium">Görsel URL</label>
            <input 
              v-model="region.priceFactorsImage" 
              type="text" 
              class="w-full p-2 border rounded"
              placeholder="https://..."
            >
          </div>
        </div>
        
        <!-- Faktör Ekleme Formu -->
        <div class="bg-white p-4 rounded-lg border mb-4">
          <h4 class="font-medium mb-3">Yeni Faktör Ekle</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <div>
              <label class="block text-sm text-gray-600 mb-1">Faktör Adı</label>
              <input 
                v-model="priceFactorInput.factor" 
                type="text" 
                class="w-full p-2 border rounded"
                placeholder="Örn: Kaç odalı ev eşyası taşınacak?"
              >
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">En Düşük Fiyat</label>
              <input 
                v-model="priceFactorInput.min" 
                type="text" 
                class="w-full p-2 border rounded"
                placeholder="10.000 TL"
              >
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">En Yüksek Fiyat</label>
              <input 
                v-model="priceFactorInput.max" 
                type="text" 
                class="w-full p-2 border rounded"
                placeholder="25.000 TL"
              >
            </div>
          </div>
          <button 
            type="button"
            @click="addPriceFactor"
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            + Faktör Ekle
          </button>
        </div>
        
        <!-- Faktör Listesi Tablosu -->
        <div v-if="region.priceFactors.length > 0" class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-100">
                <th class="p-2 text-left border">Faktör</th>
                <th class="p-2 text-left border">En Düşük</th>
                <th class="p-2 text-left border">En Yüksek</th>
                <th class="p-2 text-center border w-20">İşlem</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in region.priceFactors" :key="index">
                <td class="p-2 border">{{ item.factor }}</td>
                <td class="p-2 border">{{ item.min }}</td>
                <td class="p-2 border">{{ item.max }}</td>
                <td class="p-2 border text-center">
                  <button 
                    type="button"
                    @click="removePriceFactor(index)"
                    class="text-red-600 hover:text-red-800"
                    title="Sil"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else class="text-gray-500 italic p-4 bg-white rounded border">
          Henüz fiyat faktörü eklenmemiş.
        </p>
        
        <!-- Önizleme -->
        <div class="mt-4 p-4 bg-white rounded-lg border">
          <h4 class="font-medium mb-2">Önizleme:</h4>
          <div class="border rounded-lg p-4 bg-gray-50">
            <h5 class="font-semibold text-lg mb-2">{{ region.priceFactorsTitle || 'Fiyatı Etkileyen Faktörler' }}</h5>
            <div class="flex flex-col md:flex-row gap-4">
              <div class="md:w-1/4">
                <img 
                  :src="region.priceFactorsImage || 'https://cdn.armut.com/images/seo-pages/tr-TR/price-factors.svg'" 
                  class="w-full h-auto max-h-32 object-contain"
                  alt="Faktörler"
                >
              </div>
              <div class="md:w-3/4">
                <table class="w-full border-collapse">
                  <thead>
                    <tr class="bg-gray-100">
                      <th class="p-2 text-left border"></th>
                      <th class="p-2 text-left border">En Düşük</th>
                      <th class="p-2 text-left border">En Yüksek</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in region.priceFactors" :key="index">
                      <td class="p-2 border">{{ item.factor }}</td>
                      <td class="p-2 border">{{ item.min }}</td>
                      <td class="p-2 border">{{ item.max }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

          <!-- İçerik Editörü -->
          <div>
            <label class="block mb-2 font-medium">İçerik</label>
            <div class="border rounded p-2 min-h-[200px]">
              <div v-if="editor" class="editor-toolbar">
                <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                  H2
                </button>
                <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                  H3
                </button>
                <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
                  Kalın
                </button>
                <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
                  İtalik
                </button>
                <button @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }">
                  Altı Çizili
                </button>
                <button @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
                  Madde Listesi
                </button>
                <button @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
                  Numara Listesi
                </button>
                <button @click="addImage" type="button">
                  Resim Ekle
                </button>
              </div>
              <editor-content :editor="editor" class="prose max-w-none" />
            </div>
          </div>

          <!-- Kısa Açıklama -->
          <div>
            <label class="block mb-2 font-medium">Kısa Açıklama (Kartlarda Gösterilecek) <span class="text-red-500">*</span></label>
            <textarea 
              v-model="region.excerpt" 
              class="w-full p-2 border rounded"
              rows="3"
              maxlength="160"
              required
            ></textarea>
            <p class="text-xs text-gray-500 mt-1">Maksimum 160 karakter</p>
          </div>

          <!-- Form Butonları -->
          <div class="flex justify-end space-x-3 pt-4 border-t">
            <button 
              type="button"
              @click="showEditModal = false; resetForm()"
              class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              İptal
            </button>
            <button
              type="submit"
              :disabled="isSaving"
              :aria-busy="isSaving"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isSaving ? 'Kaydediliyor...' : (region.id ? 'Güncelle' : 'Oluştur') }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Silme Onay Modalı -->
    <div 
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-bold mb-4">Bölgeyi Sil</h3>
        <p class="mb-4 text-gray-600">Bu bölgeyi kalıcı olarak silmek istediğinize emin misiniz?</p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showDeleteModal = false"
            :disabled="isDeleting"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            İptal
          </button>
          <button
            @click="deleteRegion"
            :disabled="isDeleting"
            :aria-busy="isDeleting"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isDeleting ? 'Siliniyor...' : 'Sil' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.ProseMirror {
  min-height: 200px;
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
}

.ProseMirror:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

.ProseMirror p {
  margin-bottom: 1em;
}

.editor-toolbar {
  @apply flex flex-wrap gap-2 p-2 border-b;
}

.editor-toolbar button {
  @apply px-3 py-1 bg-gray-100 rounded hover:bg-gray-200;
}

.editor-toolbar button.is-active {
  @apply bg-blue-100 text-blue-600;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
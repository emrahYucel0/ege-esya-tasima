<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useFetch } from '#app'
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

// --- Bölge Veri Modeli ---
const region = ref({
  id: null,
  title: '',
  subtitle: '',
  shortTitle: '',
  slug: '',
  content: '',
  excerpt: '',
  image: ''
})

// --- Karakter Dönüşüm Fonksiyonu ---
// Bu fonksiyon, slug oluştururken ve resim URL'si belirlerken Türkçe karakterleri İngilizce karşılıklarıyla değiştirir.
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
  const title = region.value.title
  let slug = sanitizeText(title)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    
  region.value.slug = slug
}

// --- Tiptap Editor Instance ---
const editor = ref(null)
onMounted(() => {
  editor.value = new Editor({
    content: region.value.content,
    extensions: [
      StarterKit.configure({
        heading: false, // Varsayılan heading'i devre dışı bırak
      }),
      Heading.configure({
        levels: [1, 2, 3],
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
      region.value.content = editor.value.getHTML()
    }
  })
})

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy()
  }
})

// --- API'den Bölgeleri Çek ---
const { data, error } = await useFetch('/api/regions')
const regions = computed(() => {
  return data.value && data.value.success ? data.value.data : []
})

// --- Modal Kontrolleri ---
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const selectedSlug = ref('')

// --- Bölge Seçimi ---
const selectRegion = (slug) => {
  const selected = regions.value.find(r => r.slug === slug)
  if (selected) {
    Object.assign(region.value, selected)
    if (editor.value) {
      editor.value.commands.setContent(selected.content)
    }
    showEditModal.value = true
  }
}

// --- Resim Ekleme Fonksiyonu ---
// Kullanıcıdan alınan URL, sanitizeText fonksiyonu ile dönüştürülerek ekleniyor.
const addImage = () => {
  let url = prompt("Eklemek istediğiniz resmin URL'sini giriniz:")
  if (url && editor.value) {
    url = sanitizeText(url)
    editor.value.chain().focus().setImage({ src: url }).run()
  }
}

// --- Bölge Silme ---
const deleteRegion = async () => {
  try {
    await $fetch(`/api/regions?slug=${selectedSlug.value}`, { method: 'DELETE' })
    const updated = regions.value.filter(r => r.slug !== selectedSlug.value)
    data.value.data = updated 
    showDeleteModal.value = false
  } catch (error) {
    console.error('Silme Hatası:', error)
    alert('Bölge silinirken hata oluştu: ' + error.message)
  }
}

// --- Form Gönderimi ---
const submitForm = async () => {
  try {
    const method = region.value.id ? 'PUT' : 'POST'
    const response = await $fetch('/api/regions', {
      method,
      body: region.value
    })

    // API yanıt kontrolü
    if (!response) {
      throw new Error('Geçersiz API yanıtı')
    }

    if (method === 'POST') {
      data.value.data = [...regions.value, response]
    } else {
      data.value.data = regions.value.map(r =>
        r.id === response.id ? response : r
      )
    }

    showEditModal.value = false
    resetForm()
  } catch (error) {
    console.error('Form Gönderim Hatası:', error)
    alert('İşlem başarısız: ' + error.message)
  }
}

// --- Formu Sıfırla ---
const resetForm = () => {
  region.value = {
    id: null,
    title: '',
    subtitle: '',
    shortTitle: '',
    slug: '',
    content: '',
    excerpt: '',
    image: ''
  }
  if (editor.value) {
    editor.value.commands.clearContent()
  }
}

// --- FileUploader'dan Gelen Event'i İşle ---
const updateImageUrl = (url) => {
  region.value.image = url
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-6">
    <!-- Başlık ve Ekleme Butonu -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">Bölge Yönetim Paneli</h1>
      <button 
        @click="showEditModal = true"
        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Yeni Bölge Ekle
      </button>
    </div>

    <!-- Bölge Listesi -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="region in regions" 
        :key="region.id"
        class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
      >
        <img 
          :src="region.image" 
          :alt="region.title"
          class="w-full h-48 object-cover mb-4 rounded"
        >
        <h3 class="text-xl font-semibold mb-2">{{ region.title }}</h3>
        <p class="text-gray-600 text-sm mb-4">{{ region.excerpt }}</p>
        <div class="flex space-x-2">
          <button 
            @click="selectRegion(region.slug)"
            class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Düzenle
          </button>
          <button 
            @click="selectedSlug = region.slug; showDeleteModal = true"
            class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Sil
          </button>
        </div>
      </div>
    </div>

    <!-- Düzenleme/Ekleme Modalı -->
    <div 
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 class="text-xl font-bold mb-4">{{ region.id ? 'Bölge Düzenle' : 'Yeni Bölge Ekle' }}</h2>
        
        <form @submit.prevent="submitForm" class="space-y-4">
          <!-- Temel Bilgiler -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block mb-2 font-medium">Başlık</label>
              <input 
                v-model="region.title" 
                @input="generateSlug"
                type="text" 
                class="w-full p-2 border rounded"
                required
              >
            </div>
            <div>
              <label class="block mb-2 font-medium">Slug</label>
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

          <!-- Görsel Yükleme -->
          <div>
            <label class="block mb-2 font-medium">Görsel URL</label>
            <input 
              v-model="region.image" 
              type="text" 
              class="w-full p-2 border rounded"
              required
            >
          </div>
          <div class="col-span-1">
              <FileUploader @file-uploaded="updateImageUrl" />
            </div>

          <!-- İçerik Editörü -->
          <div>
            <label class="block mb-2 font-medium">İçerik</label>
            <div class="border rounded p-2 min-h-[200px]">
              <div v-if="editor" class="editor-toolbar">
                <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                  H1
                </button>
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
            <label class="block mb-2 font-medium">Kısa Açıklama (Kartlarda Gösterilecek)</label>
            <textarea 
              v-model="region.excerpt" 
              class="w-full p-2 border rounded"
              rows="3"
              maxlength="160"
            ></textarea>
          </div>

          <!-- Form Butonları -->
          <div class="flex justify-end space-x-3">
            <button 
              type="button"
              @click="showEditModal = false; resetForm()"
              class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              İptal
            </button>
            <button 
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {{ region.id ? 'Güncelle' : 'Oluştur' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Silme Onay Modalı -->
    <div 
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-6">
        <h3 class="text-lg font-bold mb-4">Bölgeyi Sil</h3>
        <p class="mb-4">Bu bölgeyi kalıcı olarak silmek istediğinize emin misiniz?</p>
        <div class="flex justify-end space-x-3">
          <button 
            @click="showDeleteModal = false"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            İptal
          </button>
          <button 
            @click="deleteRegion"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Sil
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
</style>

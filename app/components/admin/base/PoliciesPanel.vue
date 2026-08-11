<script setup>
/**
 * POLİTİKA METİNLERİ paneli — Gizlilik, Kullanım Şartları, Çerez.
 *
 * NEDEN VAR
 * Üç metin de Vue bileşenlerinin şablonuna gömülüydü: güncellemek kod
 * değişikliği ve yeniden dağıtım gerektiriyordu. Daha kötüsü, Gizlilik
 * Politikası var olmayan bileşenleri çağırdığı için canlıda TAMAMEN BOŞ
 * basılıyordu ve bu fark edilmemişti.
 *
 * Editör kurulumu PostPanel ile aynı: H1 kasıtlı olarak dışarıda, çünkü
 * sayfa şablonu başlığı kendisi <h1> olarak basıyor — içerikte de H1
 * seçilebilseydi aynı sayfada iki H1 olurdu.
 */
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Blockquote from '@tiptap/extension-blockquote'
import Link from '@tiptap/extension-link'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const SAYFALAR = [
  { slug: 'gizlilik-politikasi', etiket: 'Gizlilik Politikası' },
  { slug: 'kullanim-sartlari', etiket: 'Kullanım Şartları' },
  { slug: 'cerez-politikasi', etiket: 'Çerez Politikası' },
]

const secili = ref(SAYFALAR[0].slug)
const form = ref({ slug: '', title: '', subtitle: '', content: '', lastUpdated: '', isActive: true })

const editor = ref(null)
const yukleniyor = ref(true)
const kaydediliyor = ref(false)
const durum = ref('')
const hata = ref('')

/** YYYY-MM-DD — <input type="date"> bu biçimi bekliyor. */
const tariheCevir = (deger) => {
  if (!deger) return ''
  const t = new Date(deger)
  return Number.isNaN(t.getTime()) ? '' : t.toISOString().slice(0, 10)
}

const getir = async (slug) => {
  yukleniyor.value = true
  durum.value = ''
  hata.value = ''
  try {
    const cevap = await $fetch(`/api/policies?slug=${encodeURIComponent(slug)}`)
    const d = cevap?.success ? cevap.data : null
    form.value = {
      slug,
      title: d?.title || '',
      subtitle: d?.subtitle || '',
      content: d?.content || '',
      lastUpdated: tariheCevir(d?.lastUpdated),
      isActive: d?.isActive ?? true,
    }
    // Editör içeriğini programatik olarak değiştirirken `false`: aksi hâlde
    // onUpdate tetiklenip henüz yüklenmiş içeriği "değişmiş" sayardı.
    editor.value?.commands.setContent(form.value.content, false)
  } catch (e) {
    hata.value = e?.data?.message || e?.message || 'Veri alınamadı'
  } finally {
    yukleniyor.value = false
  }
}

const sayfaDegisti = () => getir(secili.value)

const kaydet = async () => {
  if (!form.value.title.trim()) {
    hata.value = 'Başlık boş bırakılamaz.'
    return
  }
  kaydediliyor.value = true
  durum.value = ''
  hata.value = ''
  try {
    const cevap = await $fetch('/api/policies', {
      method: 'PUT',
      body: {
        slug: form.value.slug,
        title: form.value.title.trim(),
        subtitle: form.value.subtitle.trim(),
        content: form.value.content,
        lastUpdated: form.value.lastUpdated || '',
        isActive: form.value.isActive,
      },
    })
    if (cevap?.success === false) throw new Error(cevap.error || 'Kaydedilemedi')
    durum.value = 'Kaydedildi. Değişiklik sitede anında geçerli.'
  } catch (e) {
    hata.value = e?.data?.message || e?.message || 'Kaydedilemedi'
  } finally {
    kaydediliyor.value = false
  }
}

onMounted(async () => {
  editor.value = new Editor({
    content: '',
    extensions: [
      // StarterKit 2 blockquote'u içeriyor ama Link'i içermiyor; blockquote'u
      // kapatıp ayrı eklentiyi kullanmak çift kayıt uyarısını önlüyor.
      StarterKit.configure({ heading: false, blockquote: false }),
      Heading.configure({ levels: [2, 3] }),
      Bold,
      Italic,
      Underline,
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      // Yasal metinlerde e-posta ve sayfa bağlantıları zorunlu.
      Link.configure({ openOnClick: false, autolink: false }),
    ],
    onUpdate: () => {
      form.value.content = editor.value.getHTML()
    },
  })
  await getir(secili.value)
})

onBeforeUnmount(() => editor.value?.destroy())

const baglantiEkle = () => {
  const mevcut = editor.value?.getAttributes('link')?.href || ''
  const url = window.prompt('Bağlantı adresi (boş bırakırsanız kaldırılır):', mevcut)
  if (url === null) return
  if (url === '') {
    editor.value?.chain().focus().unsetLink().run()
    return
  }
  editor.value?.chain().focus().setLink({ href: url }).run()
}
</script>

<template>
  <section class="p-6">
    <header class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Politika Metinleri</h1>
      <p class="mt-1 text-sm text-gray-500">
        Gizlilik Politikası, Kullanım Şartları ve Çerez Politikası sayfalarının içeriği.
      </p>
    </header>

    <div class="mb-6 rounded border-2 border-amber-300 bg-amber-50 p-4">
      <p class="font-semibold text-amber-900">Bunlar yasal metinlerdir.</p>
      <p class="mt-1 text-sm text-amber-800">
        KVKK ve GDPR kapsamında yayınlanması zorunludur. Değişiklik yapmadan önce
        metnin bir kopyasını saklayın; kapsamlı değişiklikleri hukuk danışmanınıza
        doğrulatın.
      </p>
    </div>

    <p v-if="hata" class="mb-4 rounded bg-red-50 p-3 text-sm text-red-700" role="alert">{{ hata }}</p>
    <output v-if="durum" class="mb-4 block rounded bg-green-50 p-3 text-sm text-green-700">{{ durum }}</output>

    <div class="mb-6">
      <label for="pol-sayfa" class="mb-1 block text-sm font-medium text-gray-600">Sayfa</label>
      <select
        id="pol-sayfa"
        v-model="secili"
        class="w-full rounded border p-2 sm:max-w-md"
        @change="sayfaDegisti"
      >
        <option v-for="s in SAYFALAR" :key="s.slug" :value="s.slug">
          {{ s.etiket }} (/{{ s.slug }})
        </option>
      </select>
    </div>

    <p v-if="yukleniyor" class="py-10 text-center text-gray-500">Yükleniyor…</p>

    <div v-show="!yukleniyor">
      <div class="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label for="pol-baslik" class="mb-1 block text-sm font-medium text-gray-600">
            Sayfa başlığı (H1)
          </label>
          <input id="pol-baslik" v-model="form.title" type="text" class="w-full rounded border p-2" />
        </div>
        <div>
          <label for="pol-tarih" class="mb-1 block text-sm font-medium text-gray-600">
            Son güncelleme tarihi
          </label>
          <input id="pol-tarih" v-model="form.lastUpdated" type="date" class="w-full rounded border p-2" />
          <p class="mt-1 text-xs text-gray-500">
            Ziyaretçiye gösterilir. Otomatik değil — metni değiştirdiğinizde siz güncelleyin.
          </p>
        </div>
      </div>

      <div class="mb-4">
        <label for="pol-alt" class="mb-1 block text-sm font-medium text-gray-600">
          Başlık altı açıklama
        </label>
        <textarea id="pol-alt" v-model="form.subtitle" rows="2" class="w-full rounded border p-2"></textarea>
      </div>

      <!-- `label` DEĞİL: editör bir form denetimi değil, contenteditable bir
           bölge. Bağ `aria-labelledby` ile kuruluyor. -->
      <p id="pol-metin-etiket" class="mb-1 text-sm font-medium text-gray-600">Metin</p>
      <div v-if="editor" class="editor-toolbar" role="toolbar" aria-label="Metin biçimlendirme">
        <button type="button" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">H2</button>
        <button type="button" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">H3</button>
        <button type="button" :class="{ 'is-active': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()"><strong>K</strong></button>
        <button type="button" :class="{ 'is-active': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()"><em>İ</em></button>
        <button type="button" :class="{ 'is-active': editor.isActive('underline') }" @click="editor.chain().focus().toggleUnderline().run()"><u>A</u></button>
        <button type="button" :class="{ 'is-active': editor.isActive('bulletList') }" @click="editor.chain().focus().toggleBulletList().run()">• Liste</button>
        <button type="button" :class="{ 'is-active': editor.isActive('orderedList') }" @click="editor.chain().focus().toggleOrderedList().run()">1. Liste</button>
        <button type="button" :class="{ 'is-active': editor.isActive('blockquote') }" @click="editor.chain().focus().toggleBlockquote().run()">Alıntı</button>
        <button type="button" :class="{ 'is-active': editor.isActive('link') }" @click="baglantiEkle">Bağlantı</button>
      </div>
      <editor-content
        :editor="editor"
        class="pol-editor prose max-w-none"
        aria-labelledby="pol-metin-etiket"
      />

      <label class="mt-4 flex items-center gap-2 text-sm text-gray-700">
        <input v-model="form.isActive" type="checkbox" />
        <span>Sayfa yayında</span>
      </label>

      <div class="mt-6">
        <button
          type="button"
          class="rounded bg-blue-600 px-5 py-2.5 font-medium text-white disabled:opacity-50"
          :disabled="kaydediliyor"
          @click="kaydet"
        >
          {{ kaydediliyor ? 'Kaydediliyor…' : 'Kaydet' }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-bottom: 0;
  border-radius: 0.25rem 0.25rem 0 0;
  background: #f9fafb;
}

.editor-toolbar button {
  padding: 0.25rem 0.625rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  background: #fff;
  font-size: 0.8125rem;
  cursor: pointer;
}

.editor-toolbar button.is-active {
  background: #1f2937;
  color: #fff;
  border-color: #1f2937;
}

.pol-editor :deep(.ProseMirror) {
  min-height: 24rem;
  max-height: 40rem;
  overflow-y: auto;
  padding: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0 0 0.25rem 0.25rem;
  background: #fff;
}

.pol-editor :deep(.ProseMirror:focus) {
  outline: 2px solid #2563eb;
  outline-offset: -2px;
}
</style>

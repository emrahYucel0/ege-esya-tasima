<script setup>
/**
 * YÖNETİM PANELİ — GENEL LİSTE DÜZENLEYİCİ
 *
 * NEDEN VAR
 * Bölge paneli fiyat faktörleri için elle yazılmış bir "ekle formu + tablo +
 * sil düğmesi" bloğu taşıyordu (~90 satır). Bölgelere dört yeni liste alanı
 * daha eklendi (mahalleler, künye, SSS, güzergâhlar); aynı bloğu dört kez
 * kopyalamak panele ~400 satır tekrar eklerdi ve her düzeltmenin beş yerde
 * yapılması gerekirdi.
 *
 * Bu bileşen alan tanımını (`fields`) dışarıdan alıyor, geri kalan her şey
 * ortak: doğrulama, ekleme, silme, sıra değiştirme, boş durum.
 *
 * TEK ALANLI LİSTELER
 * `fields` tek elemanlıysa (ör. mahalle adları) dizi, obje dizisi yerine
 * DÜZ METİN dizisi olarak tutuluyor: ["Moda", "Caferağa"]. Şemada da böyle
 * saklanıyor; tek anahtarlı objelerden oluşan bir dizi hem gereksiz hem de
 * yapısal veriye dönüştürürken fazladan eşleme gerektirirdi.
 */
import { computed, reactive, ref } from 'vue'

const props = defineProps({
  /** Düzenlenen dizi. */
  modelValue: { type: Array, default: () => [] },
  title: { type: String, required: true },
  /** Panelde başlığın altında görünen kısa açıklama. */
  hint: { type: String, default: '' },
  /**
   * [{ key, label, placeholder, type }]
   * `type`: 'text' (varsayılan) | 'textarea'
   */
  fields: { type: Array, required: true },
  /** Zorunlu alanın anahtarı; boşsa ilk alan zorunlu sayılır. */
  requiredKey: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

const isSingleField = computed(() => props.fields.length === 1)
const requiredField = computed(() => props.requiredKey || props.fields[0].key)

/** Giriş formunun state'i — her alan için boş bir dize. */
const draft = reactive(Object.fromEntries(props.fields.map((field) => [field.key, ''])))

const errorMessage = ref('')

const rows = computed(() => props.modelValue || [])

/** Satırı görüntülemek için: tek alanlı listede eleman düz metin. */
const valueOf = (row, key) => (isSingleField.value ? row : row?.[key])

const clearDraft = () => {
  props.fields.forEach((field) => {
    draft[field.key] = ''
  })
}

const add = () => {
  const requiredValue = String(draft[requiredField.value] || '').trim()
  if (!requiredValue) {
    const label = props.fields.find((field) => field.key === requiredField.value)?.label
    errorMessage.value = `${label} alanı zorunludur.`
    return
  }

  const entry = isSingleField.value
    ? requiredValue
    : Object.fromEntries(props.fields.map((field) => [field.key, String(draft[field.key] || '').trim()]))

  emit('update:modelValue', [...rows.value, entry])
  errorMessage.value = ''
  clearDraft()
}

const remove = (index) => {
  emit('update:modelValue', rows.value.filter((_, i) => i !== index))
}

/**
 * Sıra değiştirme: listedeki sıra sayfada göründüğü sıra. SSS'de en sık
 * sorulanın üstte olması, mahalle listesinde merkez mahallelerin önde
 * olması gerekiyor; bunu ancak silip yeniden eklemekle yapmak zorunda
 * kalmamak için.
 */
const move = (index, direction) => {
  const target = index + direction
  if (target < 0 || target >= rows.value.length) return
  const next = [...rows.value]
  ;[next[index], next[target]] = [next[target], next[index]]
  emit('update:modelValue', next)
}
</script>

<template>
  <div class="border rounded-lg p-4 mt-6 bg-gray-50">
    <h3 class="text-lg font-semibold mb-1">{{ title }}</h3>
    <p v-if="hint" class="text-sm text-gray-600 mb-4">{{ hint }}</p>

    <!-- Ekleme formu -->
    <div class="bg-white p-4 rounded-lg border mb-4">
      <div class="grid grid-cols-1 gap-3 mb-3" :class="fields.length > 1 && 'md:grid-cols-2'">
        <div v-for="field in fields" :key="field.key">
          <label :for="`liste-${title}-${field.key}`" class="block text-sm text-gray-600 mb-1">
            {{ field.label }}
          </label>
          <textarea
            v-if="field.type === 'textarea'"
            :id="`liste-${title}-${field.key}`"
            v-model="draft[field.key]"
            rows="3"
            class="w-full p-2 border rounded"
            :placeholder="field.placeholder"
          />
          <input
            v-else
            :id="`liste-${title}-${field.key}`"
            v-model="draft[field.key]"
            type="text"
            class="w-full p-2 border rounded"
            :placeholder="field.placeholder"
            @keyup.enter="add"
          >
        </div>
      </div>

      <!-- Hata metni; `alert()` yerine (alert odağı çalar ve panelde
           kaydedilmemiş veriyle çalışırken kesintiye yol açar). -->
      <p v-if="errorMessage" class="text-sm text-red-600 mb-2">{{ errorMessage }}</p>

      <button
        type="button"
        class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        @click="add"
      >
        + Ekle
      </button>
    </div>

    <!-- Liste -->
    <ul v-if="rows.length" class="space-y-2">
      <li
        v-for="(row, index) in rows"
        :key="index"
        class="flex items-start gap-3 bg-white p-3 rounded border"
      >
        <span class="flex-1 min-w-0">
          <span v-for="(field, fieldIndex) in fields" :key="field.key" class="block">
            <span v-if="fields.length > 1" class="text-xs text-gray-500">{{ field.label }}: </span>
            <span :class="fieldIndex === 0 && 'font-medium'">{{ valueOf(row, field.key) || '—' }}</span>
          </span>
        </span>

        <span class="flex items-center gap-1 shrink-0">
          <button
            type="button"
            class="px-2 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-30"
            :disabled="index === 0"
            title="Yukarı taşı"
            @click="move(index, -1)"
          >
            ↑
          </button>
          <button
            type="button"
            class="px-2 py-1 text-gray-600 hover:text-gray-900 disabled:opacity-30"
            :disabled="index === rows.length - 1"
            title="Aşağı taşı"
            @click="move(index, 1)"
          >
            ↓
          </button>
          <button
            type="button"
            class="px-2 py-1 text-red-600 hover:text-red-800"
            title="Sil"
            @click="remove(index)"
          >
            Sil
          </button>
        </span>
      </li>
    </ul>

    <p v-else class="text-gray-500 italic p-4 bg-white rounded border">
      Henüz kayıt eklenmemiş.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'
import { i18n } from '../../lang'

const props = defineProps<{
  isPostsPage?: boolean
  v?: {
    $invalid: boolean
    $dirty: boolean
  }
  url?: string
}>()

const text = ref(i18n.global.t('defUploadImage'))
const dropArea: Ref<null | Element> = ref(null)
const isImageChoosen = ref(false)
const emit = defineEmits<{ (e: 'update', value: File): void }>()
const isHeavy = ref(false)

const handleDragEnter = (e: DragEvent) => {
  preventDefaults(e)
  highlight()
}

const handleDragOver = (e: DragEvent) => {
  preventDefaults(e)
  highlight()
}

const handleDragLeave = (e: DragEvent) => {
  preventDefaults(e)
  unhighlight()
}

const handleDrop = (e: DragEvent) => {
  preventDefaults(e)
  unhighlight()
  const dt = e.dataTransfer
  if (!dt) return
  const files = dt.files
  handleFiles(files)
}

const handleFileInput = (files: Event) => {
  if (!(files.target instanceof HTMLInputElement) || !files.target.files) return
  handleFiles(files.target.files)
}

const preventDefaults = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
}

const highlight = () => {
  if (dropArea.value) {
    dropArea.value.classList.add('highlight')
  }
}

const unhighlight = () => {
  if (dropArea.value) {
    dropArea.value.classList.remove('highlight')
  }
}

const handleFiles = (files: FileList) => {
  clearGallery()
  if (10485760 < files[0].size) {
    isHeavy.value = true
    text.value = i18n.global.t('imageTooLarge')
    return
  }
  if (!files[0].type.includes('image')) {
    isHeavy.value = true
    text.value = i18n.global.t('notImage')
    return
  }
  uploadFile(files[0])
  previewFile(files[0])
}

const uploadFile = (file: File) => {
  emit('update', file)
}

const previewFile = (file: File) => {
  isImageChoosen.value = true
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function () {
    if (reader.result !== null && typeof reader.result === 'string') {
      let img = document.createElement('img')
      img.src = reader.result
      img.style.width = '100%'
      img.style.height = '180px'
      img.style.verticalAlign = 'middle'
      img.style.borderRadius = '16px'
      img.style.objectFit = 'cover'
      document.getElementById('gallery')?.appendChild(img)
    }
  }
}

const clearGallery = () => {
  const gallery = document.getElementById('gallery')
  if (gallery) {
    gallery.innerHTML = ''
  }
}

onMounted(() => {
  dropArea.value = document.querySelector('.drop-area')
  if (!props.url) return
  isImageChoosen.value = true
  let img = document.createElement('img')
  img.src = props.url
  img.style.width = '100%'
  img.style.height = '180px'
  img.style.verticalAlign = 'middle'
  img.style.borderRadius = '16px'
  img.style.objectFit = 'cover'
  document.getElementById('gallery')?.appendChild(img)
})

const isInfoInvalid = () => {
  if (isHeavy.value) return isHeavy.value
  if (!props.v) return
  return props.v.$invalid && props.v.$dirty && !isImageChoosen.value
}
</script>

<template>
  <div
    id="drop-area"
    @dragenter="handleDragEnter"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
    class="drop-area"
    :class="{ invalid: isInfoInvalid(), addPost: props.v }"
  >
    <form class="my-form" v-if="!isImageChoosen" :class="{ addPost: props.v }">
      <p>{{ text }}</p>
      <input type="file" id="fileElem" accept="image/*" @change="handleFileInput" />
      <label class="button fill-pink-button" for="fileElem">{{
        i18n.global.t('chooseImage')
      }}</label>
    </form>
    <div id="gallery" :class="{ gallery: isPostsPage }"></div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.component-drag-file;
</style>

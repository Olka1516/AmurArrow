<script setup lang="ts">
import Button from './ComponentButton.vue'
import { ref, onMounted, type Ref } from 'vue'
import { i18n } from '../../lang'

const selectedFilter = ref(1)
const totalFilters = 12
const props = defineProps<{
  isPostsPage?: boolean
  v?: {
    $invalid: boolean
    $dirty: boolean
  }
  url?: string
  isPostPage?: boolean
}>()

const text = ref(i18n.global.t('defUploadImage'))
const originalImg = ref()
const dropArea: Ref<null | Element> = ref(null)
const isImageChoosen = ref(false)
const emit = defineEmits<{ (e: 'update', value: File): void }>()
const isHeavy = ref(false)
const uploadedFile = ref<File | null>(null)

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
  uploadedFile.value = files[0]
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
      if(props.isPostPage)  img.style.maxHeight = '490px'
      else img.style.maxHeight = '180px'
      originalImg.value = img
      img.style.objectFit = 'cover'
      img.style.borderRadius = '16px'
      img.style.verticalAlign = 'middle'
      img.id = 'previewImage'
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

const applyCurrentFilter = (img: HTMLImageElement) => {
  const filters = [
    'none',
    'twenties',
    'extra_offset_red',
    'wood',
    'bluescale',
    'evening',
    'crimson',
    'coral',
    'incbrightness',
    'frontward',
    'vintage',
    'rosetint'
  ]
  let canvas = document.getElementById('gallery')!.querySelector('canvas')
  if (canvas) {
    document.getElementById('gallery')?.removeChild(canvas)
  }
  if (filters[selectedFilter.value - 1] === 'none') {
    img.style.display = 'block'
    document.getElementById('gallery')?.appendChild(img)
    uploadFile(uploadedFile.value!)
    return
  }
  img.style.display = 'none'
  // @ts-ignore
  pixelsJS.filterImg(img, filters[selectedFilter.value - 1])
  canvas = document.getElementById('gallery')!.querySelector('canvas')
  if (canvas) {
    canvas.style.width = '100%'
    canvas.style.minHeight = '190px'
    canvas.style.maxHeight = '485px'
    canvas.style.objectFit = 'cover'
    canvas.style.borderRadius = '16px'
  }
  document.getElementById('gallery')?.appendChild(img)
}

const nextFilter = () => {
  selectedFilter.value = (selectedFilter.value % totalFilters) + 1
  updateImageFilter()
}

const prevFilter = () => {
  selectedFilter.value = ((selectedFilter.value - 2 + totalFilters) % totalFilters) + 1
  updateImageFilter()
}

const updateImageFilter = () => {
  applyCurrentFilter(originalImg.value)
  const canvas = document.getElementById('gallery')!.querySelector('canvas')
  if (canvas) {
    const dataUrl = canvas.toDataURL('image/png')
    const file = dataURLtoFile(dataUrl, 'canvas-image.png')
    if (file) uploadFile(file)
  }
}

const dataURLtoFile = (dataUrl: string, filename: string): File | null => {
  if (dataUrl) {
    let arr = dataUrl.split(',')
    if (arr.length >= 2 && arr[0]) {
      let mime = arr[0].match(/:(.*?);/)?.[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }

      if (mime) {
        return new File([u8arr], filename, { type: mime })
      }
    }
  }
  return null
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
    <div v-if="isImageChoosen || props.url" class="image-content">
      <div id="gallery" :class="{ gallery: isPostsPage }"></div>
      <div v-if="isImageChoosen && isPostPage" class="filter-controls">
        <Button
          class="no-background-no-contour-button filter-button"
          icon="arrow"
          @click="prevFilter"
        />
        <Button
          class="no-background-no-contour-button filter-button reverse"
          icon="arrow"
          @click="nextFilter"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.component-drag-file;
</style>

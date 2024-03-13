<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue'

const props = defineProps<{
  isPostsPage?: boolean
  v?: {
    $invalid: boolean
    $dirty: boolean
  }
}>()

const text = ref(
  'Upload images using the file selection dialog or by dragging the desired images into the highlighted area'
)
const dropArea: Ref<null | Element> = ref(null)
const isImageChoosen = ref(false)
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
  console.log(files[0].size)
  if (10485760 < files[0].size) {
    isHeavy.value = true
    text.value = 'The image size is too large, please choose an image less than 10 MB'
    return
  }
  uploadFile(files[0])
  previewFile(files[0])
}

const uploadFile = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
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
})

const isInfoInvalid = () => {
  if (!props.v) return
  return (props.v.$invalid && props.v.$dirty && !isImageChoosen.value) || isHeavy.value
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
    :class="{ invalid: isInfoInvalid() }"
  >
    <form class="my-form" v-if="!isImageChoosen">
      <p>{{ text }}</p>
      <input type="file" id="fileElem" accept="image/*" @change="handleFileInput" />
      <label class="button fill-pink-button" for="fileElem">Choose image</label>
    </form>
    <div id="gallery" :class="{ gallery: isPostsPage }"></div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.component-drag-file;
</style>

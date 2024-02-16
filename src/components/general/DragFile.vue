<script setup lang="ts">
import { ref, onMounted } from 'vue'

const dropArea = ref(null)
const isImageChoosen = ref(false)

const handleDragEnter = (e) => {
  preventDefaults(e)
  highlight()
}

const handleDragOver = (e) => {
  preventDefaults(e)
  highlight()
}

const handleDragLeave = (e) => {
  preventDefaults(e)
  unhighlight()
}

const handleDrop = (e) => {
  preventDefaults(e)
  unhighlight()
  const dt = e.dataTransfer
  const files = dt.files
  handleFiles(files)
}

const handleFileInput = (files) => {
  handleFiles(files.target.files)
}

const preventDefaults = (e) => {
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

const handleFiles = (files) => {
  Array.from(files).forEach((file) => {
    uploadFile(file)
    previewFile(file)
  })
}

const uploadFile = (file) => {
  const url = 'YOUR_UPLOAD_URL'
  const formData = new FormData()
  formData.append('file', file)
  //   fetch(url, {
  //     method: 'POST',
  //     body: formData
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Handle response data, e.g., update state to render uploaded images
  //     })
  //     .catch((error) => {
  //       console.error('Error uploading file:', error)
  //     })
}

const previewFile = (file) => {
  isImageChoosen.value = true
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = function () {
    let img = document.createElement('img')
    img.src = reader.result
    img.style.width = '100%'
    img.style.height = '180px'
    img.style.verticalAlign = 'middle'
    img.style.borderRadius = '20px'
    img.style.objectFit = 'cover'
    document.getElementById('gallery').appendChild(img)
  }
}

onMounted(() => {
  dropArea.value = document.querySelector('.drop-area')
})
</script>

<template>
  <div
    id="drop-area"
    @dragenter="handleDragEnter"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
    class="drop-area"
  >
    <form class="my-form" v-if="!isImageChoosen">
      <p>
        Upload images using the file selection dialog or by dragging the desired images into the
        highlighted area
      </p>
      <input type="file" id="fileElem" multiple accept="image/*" @change="handleFileInput" />
      <label class="button fill-pink-button" for="fileElem">Choose image</label>
    </form>
    <div id="gallery"></div>
    <!-- This is the gallery for previewing images -->
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.user-settings;
#drop-area {
  border: 2px dashed #ccc;
  border-radius: 20px;
  margin: 0 auto;
  text-align: center;
  width: 100%;
  height: 190px;
  padding: 3px;
}

#drop-area.highlight {
  border-color: purple;
}

p {
  margin-bottom: 20px;
}
.my-form {
    margin: 20px;
  margin-bottom: 30px;
}

#fileElem {
  display: none;
}
</style>

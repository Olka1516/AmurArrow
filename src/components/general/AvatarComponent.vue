<script setup lang="ts">
import { ref } from 'vue'
import Button from './ComponentButton.vue'
defineProps<{ name: string; type?: string }>()

const isImage = ref(false)
const handleFileInput = (files: Event) => {
  if (!(files.target instanceof HTMLInputElement) || !files.target.files) return
  handleFiles(files.target.files)
}

const handleFiles = (files: FileList) => {
  clearGallery()
  Array.from(files).forEach((file) => {
    uploadFile(file)
    previewFile(file)
  })
}

const uploadFile = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  console.log('DragFile', formData)
}

const previewFile = (file: File) => {
  isImage.value = true
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = () => {
    if (typeof reader.result === 'string') {
      let img = document.createElement('img')
      img.src = reader.result
      img.style.cssText = `
        width: 138px;
        height: 138px;
        vertical-align: middle;
        border-radius: 100px;
        object-fit: cover;
      `
      document.getElementById('roundedProfile')?.appendChild(img)
    }
  }
}

const clearGallery = () => {
  const roundedProfile = document.getElementById('roundedProfile')
  if (roundedProfile) {
    roundedProfile.childNodes.forEach((node) => {
      if (node instanceof HTMLImageElement) {
        roundedProfile.removeChild(node)
      }
    })
  }
}
</script>
<template>
  <div>
    <div class="profile-circle" id="roundedProfile">
      <div v-if="!isImage">
        {{ name }}
      </div>
      <div v-if="type === 'settings'">
        <input type="file" id="fileElement" accept="image/*" @change="handleFileInput" />
        <label class="button fill-pink-button photo" for="fileElement">
          <img src="@/assets/pictures/icons/camera-plus.svg" alt="" />
        </label>
      </div>
      <Button v-else class="fill-pink-button photo" icon="camera-plus" />
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.component-avatar;
</style>

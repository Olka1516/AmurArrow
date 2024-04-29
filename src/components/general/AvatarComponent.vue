<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Button from './ComponentButton.vue'
const props = defineProps<{ name: string; type?: string; url?: string }>()
const emit = defineEmits<{ (e: 'update', value: File): void }>()

const isImage = ref(false)
const handleFileInput = (files: Event) => {
  if (!(files.target instanceof HTMLInputElement) || !files.target.files) return
  handleFiles(files.target.files)
}

const handleFiles = (files: FileList) => {
  clearGallery()
  if (10485760 < files[0].size) {
    return
  }
  if (!files[0].type.includes('image')) {
    return
  }
  uploadFile(files[0])
  previewFile(files[0])
}

const uploadFile = (file: File) => {
  emit('update', file)
}

const createImg = (result: string) => {
  let img = document.createElement('img')
  img.src = result
  img.style.cssText = `
    width: 100%;
    height: 100%;
    vertical-align: middle;
    border-radius: 100px;
    object-fit: cover;
  `
  return img
}

const previewFile = (file: File) => {
  isImage.value = true
  let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onloadend = () => {
    if (typeof reader.result === 'string') {
      const img = createImg(reader.result)
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

watch(
  () => props.url,
  () => {
    if (props.url === '' || props.url === undefined) {
      isImage.value = false
      clearGallery()
    } else {
      isImage.value = true
      const img = createImg(props.url)
      document.getElementById('roundedProfile')?.appendChild(img)
    }
  }
)

onMounted(() => {
  if (!props.url) return
  isImage.value = true
  const img = createImg(props.url)
  document.getElementById('roundedProfile')?.appendChild(img)
})
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
      <Button v-if="type === 'OWNER'" class="fill-pink-button photo" icon="camera-plus" />
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.component-avatar;
</style>

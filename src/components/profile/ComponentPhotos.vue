<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/general/ComponentButton.vue'
import router from '@/router'
const props = defineProps<{ photos: string[] | []; text: string; isMyProfile?: boolean }>()

const photos = ref(props.photos)
const gridLength = ref(Math.ceil(props.photos.length / 3))
const gridPhoneLength = ref(Math.ceil(props.photos.length / 2))

const getImage = (item: string) => {
  const st = new URL(item, import.meta.url)
  return st.pathname
}
const routeToSettings = async () => {
  // await router.push('/user-settings')
}
</script>
<template>
  <div
    v-if="photos.length"
    class="profile-about-photo"
    :style="{
      '--grid-length': gridLength,
      '--grid-phone-length': gridPhoneLength
    }"
  >
    <div v-for="name in props.photos" :key="name" class="profile-about-photo-inner">
      <img :src="getImage(name)" alt="" />
    </div>
  </div>
  <div v-else class="profile-about-empty">
    <h1>{{ props.text }}</h1>
    <Button
      v-if="isMyProfile"
      class="no-background-no-contour-button"
      icon="camera-plus"
      @click="routeToSettings"
    />
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.component-user-photos;
</style>

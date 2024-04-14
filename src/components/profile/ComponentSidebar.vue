<script setup lang="ts">
import ContentPhotos from '@/components/profile/ComponentPhotos.vue'
import Button from '../general/ComponentButton.vue'
import router from '@/router'
// import { userStore } from '@/stores'
// const store = userStore()
import { loverStore } from '@/stores'
import { ref } from 'vue'

const store = loverStore()
const props = defineProps<{ isBtnBack: boolean }>()
const gridLength = ref(Math.ceil(store.photos.slice(0, 6).length / 3))
const gridPhoneLength = ref(Math.ceil(store.photos.slice(0, 6).length / 2))

const emit = defineEmits<{ (e: 'close'): void }>()
const back = async (name: string) => {
  await router.push('/' + name)
}
const closeSidebar = async () => {
  emit('close')
}

const getImage = (url: string) => {
  const st = new URL(`../../assets/pictures/${url}`, import.meta.url)
  return st.pathname
}

const toProfile = async (name: string) => {
  await router.push('/user-profile/' + name)
}
</script>

<template>
  <div class="container">
    <div class="sidebar">
      <Button
        v-if="props.isBtnBack"
        icon="back"
        class="no-background-no-contour-button rounded"
        @click="closeSidebar()"
      />
      <div class="sidebar-links">
        <Button icon="logo" class="no-background-no-contour-button logo" @click="back('')" />
        <Button
          icon="arrow"
          text="Profile"
          class="no-background-no-contour-button"
          @click="back('user-posts/')"
        />
      </div>
      <div class="wrapper">
        <div
          v-if="store.photos.length"
          class="profile-about-photo"
          :style="{
            '--grid-length': gridLength,
            '--grid-phone-length': gridPhoneLength
          }"
        >
          <div
            v-for="post in store.photos.slice(0, 6)"
            :key="post"
            class="profile-about-photo-inner"
          >
            <img :src="getImage(post)" alt="" @click="toProfile" />
          </div>
        </div>
        <div class="profile-about-empty">
          <h1 v-if="!store.photos.length">
            You don't have favorites, use the platform and find them
          </h1>
        </div>
        <Button text="More" @click="back('user-posts/')" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.component-sidebar;
</style>

<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/general/ComponentButton.vue'
import router from '@/router'
import type { ReqPost } from '@/types';
const props = defineProps<{ posts: ReqPost[] | []; text: string; isMyProfile?: boolean; username?: string }>()

const photos = ref(props.posts)
const gridLength = ref(Math.ceil(props.posts.length / 3))
const gridPhoneLength = ref(Math.ceil(props.posts.length / 2))

const addPosts = async () => {
  await router.push('/user-posts/' + props.username)
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
    <div v-for="post in props.posts" :key="post.id" class="profile-about-photo-inner">
      <img :src="post.image" alt="" />
    </div>
  </div>
  <div class="profile-about-empty">
    <h1 v-if="!photos.length">{{ props.text }}</h1>
    <Button
      v-if="isMyProfile"
      class="contour-no-background-button"
      icon="camera-plus"
      @click="addPosts"
    />
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.component-user-photos;
</style>

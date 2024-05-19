<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import Button from '@/components/general/ComponentButton.vue'
import ComponentPost from '@/components/profile/ComponentPost.vue'
import router from '@/router'
import type { FavoritePost, ReqPost } from '@/types'
import type { SvgUrls } from '@/assets/pictures/icons/allSvg'
import { userStore } from '@/stores'
const props = defineProps<{
  posts: FavoritePost[] | ReqPost[] | []
  text: string
  textBtn?: string
  isMyProfile?: boolean
  username?: string
  url?: string
  isOnlyClick?: boolean
  icon?: keyof typeof SvgUrls
  classBtn?: string
}>()
const store = userStore()
const tempPost: Ref<FavoritePost | undefined> = ref()
const isCliked = ref(false)
const photos = ref(props.posts)
const gridLength = ref(Math.ceil(props.posts.length / 3))
const gridPhoneLength = ref(Math.ceil(props.posts.length / 2))

const addPosts = async () => {
  if (props.isOnlyClick) await router.push('/user-profile/' + props.username)
  else await router.push('/user-posts/' + props.username)
}

const modalPost = async (isClose: boolean, post?: FavoritePost) => {
  if (props.isOnlyClick) {
    await router.push('/user-profile/' + post?.username)
  } else {
    tempPost.value = post
    isCliked.value = isClose
  }
}

const deletePost = async () => {
  if(store.username !== tempPost.value?.username) await store.deleteFavoritePost(tempPost.value!.id)
  else await store.deletePost(tempPost.value!.id)
  modalPost(false)
}
watch(
  () => props.posts,
  () => {
    photos.value = props.posts
    gridLength.value = Math.ceil(props.posts.length / 3)
    gridPhoneLength.value = Math.ceil(props.posts.length / 2)
  }
)
</script>
<template>
  <ComponentPost
    v-if="isCliked"
    @close="modalPost(false)"
    @deletePost="deletePost()"
    :post="tempPost"
  />
  <div
    v-if="photos.length"
    class="profile-about-photo"
    :style="{
      '--grid-length': gridLength,
      '--grid-phone-length': gridPhoneLength
    }"
  >
    <div v-for="post in props.posts" :key="post.description" class="profile-about-photo-inner">
      <div class="profile-about-photo-card" @click="modalPost(true, post)">
        <img :src="post.image" alt="" />
      </div>
    </div>
  </div>
  <div class="profile-about-empty">
    <h1 v-if="!photos.length">{{ props.text }}</h1>
    <Button
      v-if="isMyProfile || (isOnlyClick && posts.length)"
      :class="classBtn"
      :icon="icon"
      :text="textBtn"
      @click="addPosts"
    />
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.component-user-photos;
</style>

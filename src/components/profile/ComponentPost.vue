<script lang="ts" setup>
import type { FavoritePost, ReqPost } from '@/types'
import Button from '../general/ComponentButton.vue'
import { userStore } from '@/stores'
import router from '@/router'

const store = userStore()
const props = defineProps<{ post: FavoritePost | ReqPost | undefined }>()
const emit = defineEmits<{ (e: 'close'): void; (e: 'deletePost'): void }>()
const close = () => {
  emit('close')
}

const getName = () => {
  return props.post && props.post.firstName && props.post.lastName
    ? props.post.firstName.charAt(0) + props.post.lastName.charAt(0)
    : props.post!.username.charAt(0)
}

const toProfile = async () => {
  await router.push('/user-profile/' + props.post!.username)
}

const deletePost = async () => {
  emit('deletePost')
  const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites') || '[]')
  let newFarorites = []
  for (let i = 0; i < favoritesFromStorage.length; i++) {
    if (favoritesFromStorage[i].id !== props.post?.id) {
      newFarorites.push(favoritesFromStorage[i])
    }
  }
  localStorage.setItem('favorites', JSON.stringify(newFarorites))
}
</script>

<template>
  <div class="modal-wrapper">
    <div class="post-modal">
      <Button @click="close" icon="back_pink" class="modal-button" />
      <div class="post-modal-inner">
        <img class="post" :src="post!.image" alt="" />
        <div class="post-modal-content">
          <div class="post-modal-avatar" @click="toProfile()">
            <img v-if="post && post.avatarImage" :src="post.avatarImage" class="avatar" />
            <h1 v-else class="avatar">{{ getName() }}</h1>
            <h1>{{ post?.username }}</h1>
          </div>
          <div class="post-modal-texts">
            <h1>{{ post!.title }}</h1>
            <p>{{ post!.description }}</p>
          </div>
          <Button
            v-if="store.userType === 'OWNER'"
            icon="trash-pink"
            class="modal-button trash"
            @click="deletePost"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.component-user-post;
</style>

<script lang="ts" setup>
import type { FavoritePost, ReqPost, UserInfo } from '@/types'
import Button from '../general/ComponentButton.vue'
import { onMounted, ref, type Ref } from 'vue'
import { userStore } from '@/stores'
import router from '@/router'

const store = userStore()
const data: Ref<UserInfo | undefined> = ref()
const props = defineProps<{ post: FavoritePost | ReqPost | undefined }>()
const emit = defineEmits<{ (e: 'close'): void }>()
const close = () => {
  emit('close')
}

const getName = () => {
  if (!data.value) return
  return data.value.firstName
    ? data.value.firstName.charAt(0) + data.value.lastName.charAt(0)
    : data.value.username.charAt(0)
}

const getOwnOrFavorite = () => {
  return props.post && props.post.ownUsername ? props.post.ownUsername : props.post!.username
}

const toProfile = async () => {
  await router.push('/user-profile/' + getOwnOrFavorite())
}

onMounted(async () => {
  data.value = await store.getOnlyUserInfo(getOwnOrFavorite())
})
</script>

<template>
  <div class="modal-wrapper">
    <div class="post-modal">
      <Button @click="close" icon="back_pink" class="modal-button" :rounded="true" />
      <div class="post-modal-inner">
        <img class="post" :src="post!.image" alt="" />
        <div class="post-modal-content">
          <div class="post-modal-avatar" @click="toProfile()">
            <img v-if="data && data.profileImage" :src="data.profileImage" class="avatar" />
            <h1 v-else class="avatar">{{ getName() }}</h1>
            <h1>{{ getOwnOrFavorite() }}</h1>
          </div>
          <div class="post-modal-texts">
            <h1>{{ post!.title }}</h1>
            <p>{{ post!.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.component-user-post;
</style>

<script lang="ts" setup>
import type { ReqPost } from '@/types'
import Button from '../general/ComponentButton.vue'
const props = defineProps<{ post: ReqPost | undefined; username: string; url: string }>()
const emit = defineEmits<{ (e: 'close'): void }>()
const close = () => {
  emit('close')
}
</script>

<template>
  <div class="modal-wrapper">
    <div class="post-modal">
      <Button
        @click="close"
        icon="back_pink"
        class="modal-button"
        :rounded="true"
      />
      <div class="post-modal-inner">
        <img class="post" :src="props.post!.image" alt="" />
        <div class="post-modal-content">
          <div class="post-modal-avatar">
            <img :src="url" class="avatar" />
            <h1>{{ props.post!.username }}</h1>
          </div>
          <div class="post-modal-texts">
            <h1>{{ props.post!.title }}</h1>
            <p>{{ props.post!.description }}</p>
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

<script setup lang="ts">
import ContentPhotos from '@/components/profile/ComponentPhotos.vue'
import Button from '../general/ComponentButton.vue'
import router from '@/router'
import { userStore } from '@/stores'
import { inject, onMounted, ref, watch, watchEffect } from 'vue'
import type { FavoritesChange, FavoritesF } from '@/types'
const store = userStore()

const props = defineProps<{ isOpen: boolean; isBtnDisplayed: boolean }>()
const isClose = ref(true)
const emit = defineEmits<{ (e: 'close'): void }>()
const { isFavoritesChanged, updateFavoritesStatus }: FavoritesChange = inject('isFavoritesChanged')!

const { allFavorites, getFromStorage }: FavoritesF = inject('favorites')!

const back = async (name: string) => {
  await router.push('/' + name)
}

const closeSidebar = async () => {
  isClose.value = false
  emit('close')
}

const isEvalible = () => {
  return isClose.value && !props.isBtnDisplayed
}

watch(
  () => props.isOpen,
  () => {
    isClose.value = !props.isOpen
  }
)

watchEffect(() => {
  if (isFavoritesChanged) {
    getFromStorage()
    updateFavoritesStatus()
  }
})

onMounted(() => {
  getFromStorage()
})
</script>

<template>
  <div class="container" :class="{ fadeIn: isEvalible() }">
    <div class="sidebar" :class="{ close: isEvalible() }">
      <Button
        v-if="!isClose"
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
          @click="back(`user-profile/${store.username}`)"
        />
      </div>
      <div class="wrapper">
        <ContentPhotos
          :posts="allFavorites"
          :isOnlyClick="true"
          textBtn="More"
          text="You have no likes in the last 24 hours"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.component-sidebar;
</style>

<script setup lang="ts">
import ContentPhotos from '@/components/profile/ComponentPhotos.vue'
import Button from '../general/ComponentButton.vue'
import ComponentFiltres from './ComponentFiltres.vue'
import router from '@/router'
import { userStore } from '@/stores'
import { inject, onMounted, ref, watch, watchEffect } from 'vue'
import type { FavoritesChange, FavoritesF } from '@/types'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
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
        class="no-background-no-contour-button rounded back"
        @click="closeSidebar()"
      />
      <div class="sidebar-links">
        <Button icon="logo" class="no-background-no-contour-button logo" @click="back('')" />
        <div class="sidebar-links-group">
          <Button
            icon="arrow"
            :text="t('profile')"
            class="no-background-no-contour-button"
            @click="back(`user-profile/${store.username}`)"
          />
          <ComponentFiltres :userData='{gender: store.gender, age: store.age, location: store.location}' />
        </div>
      </div>

      <div class="wrapper">
        <ContentPhotos
          :posts="allFavorites"
          :isOnlyClick="true"
          :textBtn="t('more')"
          :text="t('noLikes')"
          :username="store.username"
        />
      </div>
    </div>
    <div></div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.component-sidebar;
</style>

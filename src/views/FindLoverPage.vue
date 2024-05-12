<script setup lang="ts">
import Footer from './landing/LayoutFooter.vue'
import Content from './profile/ContentLovers.vue'
import Sidebar from '@/components/profile/ComponentSidebar.vue'
import Button from '@/components/general/ComponentButton.vue'
import { onMounted, ref, type Ref, provide } from 'vue'
import type { FavoritePost } from '@/types'
import { loverStore } from '@/stores'
import { useRoute } from 'vue-router'

const LoverStore = loverStore()
const route = useRoute()
const isOpen = ref(false)
const btnElement: Ref<HTMLElement | null> = ref(null)
const computedStyle: Ref<CSSStyleDeclaration | null> = ref(null)
const isFavoritesChanged = ref(false)
const allFavorites: Ref<FavoritePost[]> = ref([])

const updateFavoritesStatus = () => {
  isFavoritesChanged.value = !isFavoritesChanged.value
}

const changeActive = (isTrue: boolean, styleOf: string) => {
  isOpen.value = isTrue
  document.body.style.overflow = styleOf
  document.body.style.maxHeight = '100vh'
}

const isEvalible = () => {
  return computedStyle.value?.display === 'none'
}

const getFromStorage = () => {
  const favoritesFromStorage = localStorage.getItem('favorites')
  if (favoritesFromStorage !== null) {
    const storePhotos = JSON.parse(favoritesFromStorage)
    const currentTime = new Date().getTime()
    const twentyFourHours = 24 * 60 * 60 * 1000

    const filteredFavorites = storePhotos.filter((favorite: FavoritePost) => {
      const timeDiff = currentTime - new Date(favorite.dateCreate!).getTime()
      return timeDiff <= twentyFourHours
    })

    allFavorites.value = filteredFavorites

    localStorage.setItem('favorites', JSON.stringify(filteredFavorites))
  }
}

const updateStorage = (temp: FavoritePost) => {
  allFavorites.value.push(temp)
  localStorage.setItem('favorites', JSON.stringify(allFavorites.value))
}

provide('isFavoritesChanged', { isFavoritesChanged, updateFavoritesStatus })
provide('favorites', { allFavorites, getFromStorage, updateStorage })

onMounted(async () => {
  await LoverStore.getAll(route.params.username.toString())
  btnElement.value = document.getElementById('sidebarBtn')
  if (btnElement.value) {
    computedStyle.value = window.getComputedStyle(btnElement.value)
  }
})
</script>

<template>
  <div id="content">
    <Button
      id="sidebarBtn"
      @click="changeActive(true, 'hidden')"
      icon="logo"
      class="fill-pink-button rounded sidebar"
    />
    <Sidebar :isOpen="isOpen" @close="changeActive(false, 'auto')" :isBtnDisplayed="isEvalible()" />
    <Content />
  </div>
  <Footer />
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.find-lover-page;
</style>

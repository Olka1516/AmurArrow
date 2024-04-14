<script setup lang="ts">
import Footer from './landing/LayoutFooter.vue'
import Content from './profile/ContentLovers.vue'
import Sidebar from '@/components/profile/ComponentSidebar.vue'
import Button from '@/components/general/ComponentButton.vue'
import { onMounted, ref, type Ref } from 'vue'

const isOpen = ref(false)
const btnElement: Ref<HTMLElement | null> = ref(null)
const computedStyle: Ref<CSSStyleDeclaration | null> = ref(null)
const changeActive = (isTrue: boolean, styleOf: string) => {
  isOpen.value = isTrue
  document.body.style.overflow = styleOf
  document.body.style.maxHeight = '100vh'
}

onMounted(() => {
  btnElement.value = document.getElementById('sidebarBtn')
  if (btnElement.value) {
    computedStyle.value = window.getComputedStyle(btnElement.value)
  }
})

const isEvalible = () => {
  return isOpen.value || computedStyle.value?.display === 'none'
}
</script>

<template>
  <div id="content">
    <Button
      id="sidebarBtn"
      @click="changeActive(true, 'hidden')"
      icon="person"
      class="fill-pink-button rounded"
    />
    <Sidebar v-if="isEvalible()" :isBtnBack="isOpen" @close="changeActive(false, 'auto')" />
    <Content />
  </div>
  <Footer />
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.find-lover-page;
</style>

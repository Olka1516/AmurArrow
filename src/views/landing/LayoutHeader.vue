<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/general/ComponentButton.vue'

const props = defineProps<{ limit: number }>()
const router = useRouter()
const istest = ref(true)
const signIn = async () => {
  await router.push('/sign-in')
}

const signUp = async () => {
  await router.push('/sign-up')
}

const options = {
  root: document.querySelector('#scrollArea'),
  rootMargin: '0px',
  threshold: 1.0
}

const callback: IntersectionObserverCallback = () => {
  istest.value = !istest.value
}
const observer = new IntersectionObserver(callback, options)
onMounted(() => {
  const target = document.querySelector('#scrollArea')
  if (target) {
    observer.observe(target)
  }
})
</script>

<template>
  <header :class="{ istest: istest }">
    <div class="container">
      <img class="logo" src="@/assets/pictures/logo.png" alt="Logo" />
      <div class="account-buttons">
        <Button class="contour-button" @click="signIn" text="Sign In" />
        <Button class="contour-no-background-button" @click="signUp" text="Sign Up" />
      </div>
    </div>
  </header>
  <div
    id="scrollArea"
    :style="{
      '--limit-length': props.limit
    }"
  ></div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.header;
</style>

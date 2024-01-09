<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const istest = ref(true)
const signIn = async () => {
  await router.push('/sign-in')
}

const signUp = async () => {
  await router.push('/sign-up')
}

var options = {
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
        <button class="contour-button" @click="signIn">Sign In</button>
        <button class="contour-no-background-button" @click="signUp">Sign Up</button>
      </div>
    </div>
  </header>
  <div id="scrollArea"></div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.header;
</style>

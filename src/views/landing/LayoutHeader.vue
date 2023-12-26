<script setup lang="ts">
import { ref, onMounted } from 'vue'
const istest = ref(true)
const test = () => {
  console.log('hello')
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
        <button class="account-button-signIn" @click="test">Sign In</button>
        <button class="account-button-signUp" @click="test">Sign Up</button>
      </div>
    </div>
  </header>
  <div id="scrollArea"></div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.header;
</style>

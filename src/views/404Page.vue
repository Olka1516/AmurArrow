<script setup lang="ts">
import Button from '@/components/general/ComponentButton.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const back = async () => {
  await router.push('/')
}
</script>
<template>
  <section>
    <div v-for="n in 261" :key="n">
      <span></span>
    </div>
  <div class="not-found-profile">
    <div class="container">
      <div class="not-found-content">
        <h1>404</h1>
        <p>This page does not exist, please return to the main page</p>
        <Button class="fill-pink-button" text="Back" @click="back" />
      </div>
    </div>
  </div>
</section>
</template>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.not-found-profile;
</style>

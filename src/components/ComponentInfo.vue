<script setup lang="ts">
const info = defineProps<{
  title: string | string[] | Record<string, string[]>
  text: string | string[] | Record<string, string[]>
  id: number
}>()
const test = (id: number) => {
  const st = new URL(`../assets/pictures/${id}.jpg`, import.meta.url)
  return st.pathname
}
</script>

<template>
  <div class="info">
    <img class="info-image" :src="test(info.id)" alt="" />
    <div class="info-line">
      <div class="info-circle">{{ info.id }}</div>
      <hr />
    </div>
    <h1 class="info-title">{{ info.title }}</h1>
    <p class="info-text">{{ info.text }}</p>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.info;
</style>

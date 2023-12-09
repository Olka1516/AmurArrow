<script setup lang="ts">
const info = defineProps<{ title: string; text: string; id: number }>()
</script>

<template>
  <div class="info">
    <div class="info-circle">{{ info.id }}</div>
    <hr />
    <h1 class="info-title">{{ info.title }}</h1>
    <p class="info-text">{{ info.text }}</p>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.info;
</style>

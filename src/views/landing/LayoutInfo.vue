<script setup lang="ts">
import ComponentInfo from '@/components/ComponentInfo.vue'
import { useInfoStore } from '@/stores/index'
const infoStore = useInfoStore()
</script>

<template>
  <div class="container content">
    <div v-for="key in infoStore.info" :key="key.id">
      <ComponentInfo :title="key.title" :text="key.text" :id="key.id" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.info;
</style>

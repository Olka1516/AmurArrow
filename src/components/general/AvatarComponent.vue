<script setup lang="ts">
import Button from './ComponentButton.vue'
defineProps<{ name: string }>()
</script>
<template>
  <div>
    <div class="profile-circle">
      {{ name }}

      <Button class="fill-pink-button photo" icon="camera-plus" />
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.component-avatar;
</style>

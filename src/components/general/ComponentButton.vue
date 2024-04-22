<script setup lang="ts">
defineProps<{ class?: string; rounded?: boolean; icon?: string; text?: string }>()

const getImage = (item: string) => {
  if ('logo' === item) {
    const st = new URL(`../../assets/pictures/${item}.png`, import.meta.url)
    return st.pathname
  }
  const st = new URL(`../../assets/pictures/icons/${item}.svg`, import.meta.url)
  return st.pathname
}
</script>
<template>
  <button :class="class">
    <img v-if="icon" :src="getImage(icon)" alt="" />
    {{ text }}
  </button>
</template>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.buttons-container;
</style>

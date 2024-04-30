<script setup lang="ts">
import { SvgUrls } from '../../assets/pictures/icons/allSvg'
defineProps<{ class?: string; rounded?: boolean; icon?: keyof typeof SvgUrls | "logo"; text?: string }>()

const getImage = (item: keyof typeof SvgUrls | "logo") => {
  if ('logo' === item) {
    const st = new URL(`../../assets/pictures/${item}.png`, import.meta.url)
    return st.pathname
  }
  return SvgUrls[item]
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

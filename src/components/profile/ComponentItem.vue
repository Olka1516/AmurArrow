<script setup lang="ts">
import { SvgUrls } from '../../assets/pictures/icons/allSvg'
const props = defineProps<{ name: keyof typeof SvgUrls; text: string; additionalImage?: keyof typeof SvgUrls }>()

const getImage = (item: keyof typeof SvgUrls) => {
  return SvgUrls[item]
}
</script>
<template>
  <div class="profile-content-item">
    <div class="profile-content-item-inner" :class="{ additionalLinks: props.additionalImage }">
      <img :src="getImage(props.name)" alt="" />
      <h2>{{ props.text }}</h2>
    </div>
    <img v-if="props.additionalImage" :src="getImage(props.additionalImage)" alt="" />
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.component-user-item;
</style>

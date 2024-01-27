<script setup lang="ts">
const props = defineProps<{ name: string; text: string; additionalImage?: string }>()

const getImage = (item: string) => {
  const st = new URL(`../../assets/pictures/icons/${item}.svg`, import.meta.url)
  return st.pathname
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

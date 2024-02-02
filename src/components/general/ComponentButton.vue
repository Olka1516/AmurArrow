<script setup lang="ts">
const props = defineProps<{ class?: string; rounded?: boolean; icon?: string; text?: string }>()
defineEmits<{
  (e: '@click'): void
}>()

const getImage = (item: string) => {
  const st = new URL(`../../assets/pictures/icons/${item}.svg`, import.meta.url)
  return st.pathname
}
</script>
<template>
  <button :class="props.class">
    <img v-if="icon" :src="getImage(icon)" alt="" />
    {{ props.text }}
  </button>
</template>

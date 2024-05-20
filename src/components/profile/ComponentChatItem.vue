<script setup lang="ts">
const props = defineProps<{
  username: string
  text: string
  image?: string
  firstName?: string
  lastName?: string
  isActive: boolean
  number: number
}>()

const getName = () => {
  return props.firstName && props.lastName
    ? props.firstName.charAt(0) + props.lastName.charAt(0)
    : props.username.charAt(0)
}
</script>

<template>
  <div class="container-avatar" :class="{isActive: isActive}">
    <img v-if="props.image" :src="props.image" class="avatar" />
    <h1 v-else class="avatar">{{ getName() }}</h1>
    <div class="texts">
      <h2>{{ username }}</h2>
      <p>{{ text }}</p>
    </div>
    <h3 v-if="number">{{ number }}</h3>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.chats-component;
</style>

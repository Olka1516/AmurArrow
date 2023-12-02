<script setup lang="ts">
const test = () => {
  console.log('hello')
}
</script>

<template>
  <div class="container">
    <header>
      <div class="content">
        <img class="logo" src="" alt="Logo" />
      </div>
      <button class="account-button" @click="test">Sign</button>
    </header>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.header;
</style>

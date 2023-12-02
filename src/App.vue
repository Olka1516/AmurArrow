<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './views/Header.vue'
</script>

<template>
  <Header />
  <!-- <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink> -->
  <RouterView />
</template>

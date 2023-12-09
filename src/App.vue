<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './views/landing/LayoutHeader.vue'
import Content from './views/landing/LayoutContent.vue'
import Info from './views/landing/LayoutInfo.vue'
import Aprove from './views/landing/LayoutAprove.vue'
// import Reviews from './views/landing/LayoutReviews.vue'
</script>

<template>
  <Header />
  <Content />
  <Info />
  <Aprove />
  <!-- <Reviews /> -->
  <!-- <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink> -->
  <!-- <RouterView /> -->
</template>

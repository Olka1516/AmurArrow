<script setup lang="ts">
import Header from './landing/LayoutHeader.vue'
import Footer from './landing/LayoutFooter.vue'
import Content from './profile/ContentProfile.vue'
</script>
<template>
  <Header :limit="1" />
  <Content />
  <Footer />
</template>

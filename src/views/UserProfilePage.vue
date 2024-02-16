<script setup lang="ts">
import Header from './landing/LayoutHeader.vue'
import Footer from './landing/LayoutFooter.vue'
import Content from './profile/ContentProfile.vue'
import { authStore } from '@/stores'

const store = authStore()
const logOut = async() => {
  await store.logOut()
}
</script>
<template>
  <Header :limit="1" @logOut="logOut" />
  <Content />
  <Footer />
</template>

<script setup lang="ts">
import Loading from '@/components/general/LoadingPage.vue'
import Header from './landing/LayoutHeader.vue'
import Footer from './landing/LayoutFooter.vue'
import Content from './profile/ContentProfile.vue'
import { authStore, toastStore, useLoaderState } from '@/stores'
import { onMounted } from 'vue';

const loadStore = useLoaderState()
const toastS = toastStore()
const store = authStore()
const logOut = async() => {
  await store.logOut()
  toastS.sendSuccess('signOutSuccess')
}
onMounted(() => {
  loadStore.changeStateTrue()
})
</script>
<template>
  <Loading v-if="!loadStore.loading" />
  <Header :limit="1" @logOut="logOut" />
  <Content />
  <Footer />
</template>

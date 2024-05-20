<script setup lang="ts">
import Loading from '@/components/general/LoadingPage.vue'
import Header from './landing/LayoutHeader.vue'
import Content from './landing/LayoutContent.vue'
import Info from './landing/LayoutInfo.vue'
import Aprove from './landing/LayoutAprove.vue'
import Reviews from './landing/LayoutReviews.vue'
import Footer from './landing/LayoutFooter.vue'
import Accordion from './landing/LayoutAccordion.vue'
import { onMounted } from 'vue'
import { useLoaderState } from '@/stores'

const loadStore = useLoaderState()
onMounted(() => {
  loadStore.changeStateTrue()
})
</script>

<template>
  <Loading v-if="!loadStore.loading" />
  <Header :limit="300" />
  <Content />
  <Info />
  <Aprove />
  <Reviews />
  <Accordion />
  <Footer />
</template>

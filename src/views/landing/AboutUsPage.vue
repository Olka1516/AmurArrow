<script setup lang="ts">
import Header from './LayoutHeader.vue'
import Footer from './LayoutFooter.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <Header :limit="300" />
  <div>
    <div class="main-content">
      <div class="main-texts">
        <h1>{{ t('AboutUs') }}</h1>
        <p>{{ t('moreAboutUs') }}</p>
      </div>
      <div class="image-wrraper"></div>
      <img class="main-content-img" src="../../assets/pictures/team.jpg" alt="" />
    </div>
    <div class="section-content">
      <div class="section-texts">
        <h2>{{ t('AboutCompany') }}</h2>
        <p class="section-p">{{ t('welcomeAbout1') }}</p>
        <p class="section-p">{{ t('welcomeAbout2') }}</p>
      </div>
      <div class="section-imgs">
        <img class="section-heart-1" src="../../assets/pictures/heart.png" alt="" />
        <img class="section-heart-2" src="../../assets/pictures/heart.png" alt="" />
        <img class="section-img" src="../../assets/pictures/we.jpg" alt="" />
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.about-us;
</style>

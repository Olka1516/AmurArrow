<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from '@/components/general/ComponentButton.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const signUp = async () => {
  await router.push('/sign-up')
}
</script>

<template>
  <section>
    <div class="container">
      <div class="content">
        <div class="content-banner">
          <h1 class="content-banner-title">{{ t('dateWay') }}</h1>
          <p class="content-banner-text">
            {{ t('contentText') }}
          </p>
          <Button class="contour-no-background-button" @click="signUp" :text="t('getStarted')" />
        </div>
        <div class="content-img">
          <img class="content-img-couple" src="@/assets/pictures/couple.png" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.content;
</style>

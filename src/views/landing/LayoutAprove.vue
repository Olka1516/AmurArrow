<script setup lang="ts">
import Button from '@/components/general/ComponentButton.vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
</script>
<template>
  <div class="aprove">
    <div class="aprove-message">
      <p>
        {{ tm('aproveMessage[0]') }}<br />
        {{ tm('aproveMessage[1]') }}
      </p>
      <p>{{ tm('aproveMessage[2]') }}</p>
      <p>{{ tm('aproveMessage[3]') }}</p>
      <p>
        {{ tm('aproveMessage[4]') }}<br />
        {{ tm('aproveMessage[5]') }}
      </p>
    </div>
    <div class="aprove-block">
      <h1>{{ t('whySite') }}</h1>
      <p>
        {{ t('becauseSite') }}
      </p>
      <Button class="contour-button" :text="t('learnMore')" />
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.aprove;
</style>

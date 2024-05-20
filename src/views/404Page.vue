<script setup lang="ts">
import Loading from '@/components/general/LoadingPage.vue'
import Button from '@/components/general/ComponentButton.vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLoaderState } from '@/stores'
import { onMounted } from 'vue';

const loadStore = useLoaderState()
const { t } = useI18n()
const router = useRouter()
const back = async () => {
  await router.push('/')
}
onMounted(() => {
  loadStore.changeStateTrue()
})
</script>
<template>
  <Loading v-if="!loadStore.loading" />
  <section>
    <div v-for="n in 261" :key="n">
      <span></span>
    </div>
    <div class="not-found-profile">
      <div class="container">
        <div class="not-found-content">
          <h1>404</h1>
          <p>{{ t('nonPage') }}</p>
          <Button class="fill-pink-button" :text="t('back')" @click="back" />
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.not-found-profile;
</style>

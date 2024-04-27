<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/general/ComponentButton.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emit = defineEmits<{ (e: 'logOut'): void }>()

const props = defineProps<{ limit: number }>()
const router = useRouter()
const istest = ref(true)

const options = {
  root: document.querySelector('#scrollArea'),
  rootMargin: '0px',
  threshold: 1.0
}

const callback: IntersectionObserverCallback = () => {
  istest.value = !istest.value
}
const observer = new IntersectionObserver(callback, options)

const signIn = async () => {
  await router.push('/sign-in')
}

const signUp = async () => {
  await router.push('/sign-up')
}

const logOut = async () => {
  emit('logOut')
  await router.push('/')
}

onMounted(() => {
  const target = document.querySelector('#scrollArea')
  if (target) {
    observer.observe(target)
  }
})
</script>

<template>
  <header :class="{ istest: istest }">
    <div class="container">
      <img class="logo" src="@/assets/pictures/logo.png" alt="Logo" />
      <div v-if="limit !== 1" class="account-buttons">
        <Button class="contour-button" @click="signIn" :text="t('signIn')" />
        <Button class="contour-no-background-button" @click="signUp" :text="t('signUp')" />
      </div>
      <div v-else>
        <Button class="contour-button" @click="logOut" :text="t('logOut')" />
      </div>
    </div>
  </header>
  <div
    id="scrollArea"
    :style="{
      '--limit-length': props.limit
    }"
  ></div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.header;
</style>

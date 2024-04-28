<script setup lang="ts">
import { ref, onMounted, watch, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from '@/components/general/ComponentButton.vue'
import LanguageSelector from '@/components/general/LanguageSelector.vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const emit = defineEmits<{ (e: 'logOut'): void }>()

const props = defineProps<{ limit: number }>()
const language = ref(localStorage.getItem('language'))
const router = useRouter()
const isLimit = ref(true)
const username: Ref<null | string> = ref(null)
const options = {
  root: document.querySelector('#scrollArea'),
  rootMargin: '0px',
  threshold: 1.0
}

const callback: IntersectionObserverCallback = () => {
  isLimit.value = !isLimit.value
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
  localStorage.removeItem('username')
  username.value = null
  await router.push('/')
}

const back = async (name: string) => {
  console.log(username.value)
  if (name === 'find-lover') {
    if (username.value === null) await router.push('/sign-in')
    else await router.push('/find-lover/' + username.value)
  } else if (name === 'user-profile') {
    await router.push('/user-profile/' + username.value)
  } else {
    await router.push('/' + name)
  }
}

watch(
  () => language.value,
  () => {
    if (language.value === null) return
    localStorage.setItem('language', language.value.toLowerCase())
    locale.value = language.value.toLowerCase()
  }
)

onMounted(() => {
  const target = document.querySelector('#scrollArea')
  const lang = localStorage.getItem('language')
  username.value = localStorage.getItem('username')
  if (lang === null) {
    localStorage.setItem('language', 'ua')
    language.value = 'ua'
  } else {
    locale.value = lang
    language.value = lang
  }
  if (target) {
    observer.observe(target)
  }
})
</script>

<template>
  <header :class="{ isLimit: isLimit }">
    <div class="container">
      <div class="nav">
        <img class="logo" src="@/assets/pictures/logo.png" alt="Logo" />
        <Button class="no-background-no-contour-button" @click="back('')" :text="t('home')" />
        <Button
          class="no-background-no-contour-button"
          @click="back('about-us')"
          :text="t('AboutUs')"
        />
        <Button
          class="no-background-no-contour-button"
          @click="back('find-lover')"
          :text="t('find')"
        />
      </div>
      <div class="account-buttons">
        <LanguageSelector v-if="language !== null" v-model="language" />
        <div v-if="username === null" class="account-buttons">
          <Button class="contour-button" @click="signIn" :text="t('signIn')" />
          <Button class="contour-no-background-button" @click="signUp" :text="t('signUp')" />
        </div>
        <div class="nav" v-else>
          <Button
            class="no-background-no-contour-button"
            @click="back('user-profile')"
            :text="t('profile')"
          />
          <Button class="contour-no-background-button" @click="logOut" :text="t('logOut')" />
        </div>
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

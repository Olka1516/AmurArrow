<script setup lang="ts">
import { ref, onMounted, watch, type Ref } from 'vue'
import LanguageSelector from '@/components/general/LanguageSelector.vue'
import Button from '@/components/general/ComponentButton.vue'
import Burger from '@/components/profile/ComponentBurger.vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLoaderState } from '@/stores'

const { t, locale } = useI18n()
const emit = defineEmits<{ (e: 'logOut'): void }>()

const loadStore = useLoaderState()
const btnElement: Ref<HTMLElement | null> = ref(null)
const isOpen = ref(false)
const props = defineProps<{ limit: number }>()
const router = useRouter()
const isLimit = ref(true)
const language = ref(localStorage.getItem('language'))
const username: Ref<null | string> = ref(null)
const computedStyle: Ref<CSSStyleDeclaration | null> = ref(null)
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
  loadStore.changeStateFalse()
  await router.push('/sign-in')
  document.body.style.overflow = 'auto'
}

const signUp = async () => {
  loadStore.changeStateFalse()
  await router.push('/sign-up')
  document.body.style.overflow = 'auto'
}

const logOut = async () => {
  emit('logOut')
  localStorage.removeItem('username')
  localStorage.removeItem('image')
  localStorage.removeItem('firstName')
  localStorage.removeItem('lastName')
  username.value = null
  await router.push('/')
  document.body.style.overflow = 'auto'
}

const back = async (name: string) => {
  if (name === 'find-lover') {
    if (username.value === null) await router.push('/sign-in')
    else await router.push('/find-lover/' + username.value)
  } else if (name === 'user-profile') {
    await router.push('/user-profile/' + username.value)
  } else if (name === 'chats') {
    await router.push('/chats/' + username.value)
  } else {
    await router.push('/' + name)
  }
  document.body.style.overflow = 'auto'
}

const changeActive = (isTrue: boolean, styleOf: string) => {
  isOpen.value = isTrue
  document.body.style.overflow = styleOf
  document.body.style.maxHeight = '100vh'
}

const isEvalible = () => {
  return computedStyle.value?.display === 'none'
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
  btnElement.value = document.getElementById('sidebarBtn')
  if (btnElement.value) {
    computedStyle.value = window.getComputedStyle(btnElement.value)
  }
})
</script>

<template>
  <header :class="{ isLimit: isLimit }">
    <div class="container">
      <div class="nav">
        <img class="logo" src="@/assets/pictures/logo.png" alt="Logo" />
        <Button class="no-background-no-contour-button navs" @click="back('')" :text="t('home')" />
        <Button
          class="no-background-no-contour-button navs"
          @click="back('about-us')"
          :text="t('AboutUs')"
        />
        <Button
          class="no-background-no-contour-button navs"
          @click="back('find-lover')"
          :text="t('find')"
        />
      </div>
      <div class="account-buttons">
        <LanguageSelector v-if="language !== null" v-model="language" class="navs" />
        <div v-if="username === null" class="account-buttons">
          <Button class="contour-button navs" @click="signIn()" :text="t('signIn')" />
          <Button class="contour-no-background-button navs" @click="signUp()" :text="t('signUp')" />
        </div>
        <div class="nav" v-else>
          <Button
            class="no-background-no-contour-button navs"
            @click="back('user-profile')"
            :text="t('profile')"
          />
          <Button
            icon="paper-plane-white"
            class="no-background-no-contour-button rounded"
            @click="back('chats')"
          />
          <Button
            class="no-background-no-contour-button rounded navs"
            @click="logOut()"
            icon="log-out"
          />
        </div>
      </div>
    </div>
  </header>
  <div id="content">
    <Button
      id="sidebarBtn"
      @click="changeActive(true, 'hidden')"
      icon="lines"
      class="no-background-no-contour-button sidebar"
    />
    <Burger
      :isOpen="isOpen"
      :language="language"
      :username="username"
      @close="changeActive(false, 'auto')"
      @logOut="logOut()"
      @signIn="signIn()"
      @signUp="signUp()"
      @changeLanguage="(lang) => (language = lang)"
      @back="(name) => back(name)"
      :isBtnDisplayed="isEvalible()"
    />
  </div>
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

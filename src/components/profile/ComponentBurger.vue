<script setup lang="ts">
import Button from '../general/ComponentButton.vue'
import LanguageSelector from '../general/LanguageSelector.vue'
import { onMounted, ref, watch, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps<{
  isOpen: boolean
  isBtnDisplayed: boolean
  language: string | null
  username: string | null
}>()
const isClose = ref(true)
const lang: Ref<string | null> = ref(null)
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'logOut'): void
  (e: 'signIn'): void
  (e: 'signUp'): void
  (e: 'changeLanguage', val: string): void
  (e: 'back', val: string): void
}>()

const back = async (name: string) => {
  emit('back', name)
}

const closeSidebar = async () => {
  isClose.value = false
  emit('close')
}

const isEvalible = () => {
  return isClose.value && !props.isBtnDisplayed
}

const signIn = async () => {
  emit('signIn')
}

const signUp = async () => {
  emit('signUp')
}

const logOut = async () => {
  emit('logOut')
}

watch(
  () => props.isOpen,
  () => {
    isClose.value = !props.isOpen
  }
)
watch(
  () => lang.value,
  () => {
    emit('changeLanguage', lang.value!)
  }
)

onMounted(() => {
  lang.value = props.language
})
</script>

<template>
  <div class="container" :class="{ fadeIn: isEvalible() }">
    <div class="sidebar" :class="{ close: isEvalible() }">
      <div class="sidebar-links">
        <Button
          v-if="!isClose"
          icon="back"
          class="no-background-no-contour-button rounded back"
          @click="closeSidebar()"
        />
        <img class="logo" src="@/assets/pictures/logo.png" alt="Logo" />
      </div>
      <div class="wrapper">
        <div class="account-buttons">
          <div v-if="username === null" class="account-buttons">
            <Button class="contour-button" @click="signIn" :text="t('signIn')" />
            <Button class="contour-no-background-button" @click="signUp" :text="t('signUp')" />
          </div>
          <div class="account-buttons profile" v-else>
            <Button
              class="no-background-no-contour-button"
              @click="back('user-profile')"
              :text="t('profile')"
            />
            <Button
              class="no-background-no-contour-button rounded"
              @click="logOut"
              icon="log-out"
            />
          </div>
        </div>
        <div class="account-buttons navs">
          <div class="navs-child">
            <Button class="no-background-no-contour-button" @click="back('')" :text="t('home')" />
          </div>
          <div class="navs-child">
            <Button
              class="no-background-no-contour-button"
              @click="back('about-us')"
              :text="t('AboutUs')"
            />
          </div>
          <div class="navs-child">
            <Button
              class="no-background-no-contour-button"
              @click="back('find-lover')"
              :text="t('find')"
            />
          </div>
        </div>
        <LanguageSelector v-if="lang !== null" v-model="lang" :isPosLeft="true" />
      </div>

      <div class="media">
        <Button class="no-background-no-contour-button rounded" icon="instagram" />
        <Button class="no-background-no-contour-button rounded" icon="telegram" />
        <Button class="no-background-no-contour-button rounded" icon="pinterest" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.component-burger;
</style>

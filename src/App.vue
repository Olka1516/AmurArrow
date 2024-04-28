<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
onMounted(() => {
  const lang = localStorage.getItem('language')
  if (lang === null) {
    localStorage.setItem('language', 'ua')
  } else {
    locale.value = lang
  }
})
</script>

<template>
  <RouterView />
</template>

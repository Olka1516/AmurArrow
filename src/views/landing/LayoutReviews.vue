<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { useInfoStore } from '@/stores'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
const reviewStore = useInfoStore()
const index = ref(0)

const progressBars: Ref<HTMLElement[]> = ref([])
const progressBar: Ref<HTMLElement | undefined> = ref()

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const animateProgressBar = async (progressBar: any) => {
  let width = 0
  while (width < 100) {
    width += 5
    progressBar.style.width = `${width}%`
    progressBar.style.backgroundColor = `#e72370`
    await delay(200)
  }
  if (index.value + 1 === progressBars.value.length) {
    resetProgressBarStyle()
  }
}

const resetProgressBarStyle = () => {
  for (const progressBar of progressBars.value) {
    progressBar.style.width = ''
  }
}

const startProgress = async () => {
  let isTrue = true
  while (isTrue) {
    progressBar.value = progressBars.value[index.value]
    await animateProgressBar(progressBars.value[index.value])
    index.value = (index.value + 1) % progressBars.value.length
  }
}

onMounted(() => {
  progressBars.value = [
    document.getElementById('progressBar1')!,
    document.getElementById('progressBar2')!,
    document.getElementById('progressBar3')!
  ]
  startProgress()
})
</script>

<template>
  <div id="scrollArea1"></div>
  <div class="review">
    <div class="container">
      <div class="review_text">
        <h2>{{ t('usersTexts') }}</h2>
        <p>" <br />{{ tm(reviewStore.review[index].text) }}</p>
      </div>
      <div class="all-progres" id="carousel">
        <div class="progres">
          <div class="progres-bar" id="progressBar1"></div>
        </div>
        <div class="progres">
          <div class="progres-bar" id="progressBar2"></div>
        </div>
        <div class="progres">
          <div class="progres-bar" id="progressBar3"></div>
        </div>
      </div>
    </div>
  </div>
  <div id="scrollArea1"></div>
</template>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.reviews;
</style>

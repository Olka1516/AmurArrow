<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import { useInfoStore } from '@/stores'
const reviewStore = useInfoStore()
const index = ref(0)

const progressBars: Ref<HTMLElement[]> = ref([])

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const animateProgressBar = async (progressBar: any, duration: number) => {
  let width = 0

  while (width < 100) {
    width += 2
    progressBar.style.width = `${width}%`
    progressBar.style.backgroundColor = `#e72370`
    await delay(duration)
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
  while (true) {
    await animateProgressBar(progressBars.value[index.value], 200)
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
  <div class="container">
    <h2>What our users say</h2>

    <p>" <br />{{ reviewStore.review[index].text }}</p>
    <div class="test" id="carousel">
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
</template>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.reviews;
</style>

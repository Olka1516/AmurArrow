<script lang="ts" setup>
import { ref, watch } from 'vue'
const state = defineProps<{
  title: string | string[] | Record<string, string[]>
  text: string | string[] | Record<string, string[]>
  id: number
  isShow: boolean
  prevId: number
}>()

const isShow = ref(state.isShow)

const emit = defineEmits<{ (e: 'change', value: number): void }>()
const prevId = ref(state.prevId)
const isOpen = (id: number) => {
  isShow.value = !isShow.value
  const element = document.getElementById('accordion-text' + id)
  const prevElement = document.getElementById('accordion-text' + prevId.value)
  if (!element) return
  element.classList.toggle('open')
  if (prevElement && id != prevId.value) {
    prevElement.classList.remove('open')
  }
  prevId.value = id
}
watch(
  () => prevId.value,
  () => {
    emit('change', prevId.value)
  }
)

watch(
  () => state.prevId,
  () => {
    prevId.value = state.prevId
  }
)
</script>
<template>
  <div @click="isOpen(state.id)">
    <div class="accordion-title" :class="{ isOpen: isShow }">
      <h1>
        {{ state.title }}
      </h1>
    </div>
    <div class="accordion-text" :id="'accordion-text' + state.id">
      <p>{{ state.text }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.component-accordion;
</style>

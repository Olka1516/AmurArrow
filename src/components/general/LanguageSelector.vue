<template>
  <div :id="getSelect()">
    <div class="select-field" @click="isVisible = !isVisible">
      <img class="select-img" :src="getImage(lang)" alt="" />
      <input @keydown="handleKeyDown" v-model="lang" type="button" />
    </div>
    <div v-if="isVisible" class="selector-dropdown" :class="{ isPosLeft: isPosLeft }">
      <div class="select-field">
        <img class="select-img" src="../../assets/pictures/icons/UA.svg" alt="" />
        <Button class="no-background-no-contour-button" text="UA" @click="handleInput('UA')" />
      </div>
      <hr />
      <div class="select-field">
        <img class="select-img" src="../../assets/pictures/icons/EN.svg" alt="" />
        <Button class="no-background-no-contour-button" text="EN" @click="handleInput('EN')" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from './ComponentButton.vue'
import svgUA from '../../assets/pictures/icons/UA.svg';
import svgEN from '../../assets/pictures/icons/EN.svg';
import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'

const isVisible = ref(false)
const selectRef: Ref<HTMLElement | null> = ref(null)
const props = defineProps<{
  modelValue: string
  isPosLeft?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()

const lang = ref('')

const handleInput = (type: string) => {
  lang.value = type
  isVisible.value = false
  emit('update:modelValue', type)
}

const handleKeyDown = (event: any) => {
  event.preventDefault()
}

const handleClickOutside = (event: any) => {
  if (!selectRef.value || selectRef.value.contains(event.target)) {
    return
  }
  isVisible.value = false
}

const getImage = (item: string) => {
  return item === 'UA' ? svgUA : svgEN
}

const getSelect = () => {
  if(props.isPosLeft) return 'select_1'
  return 'select'
}

onMounted(() => {
  if (props.modelValue) {
    lang.value = props.modelValue.toUpperCase()
  }
  selectRef.value = document.getElementById('select_lang')
  document.addEventListener('mousedown', handleClickOutside)
  document.addEventListener('touchstart', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  document.removeEventListener('touchstart', handleClickOutside)
})
</script>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.language-select;
</style>

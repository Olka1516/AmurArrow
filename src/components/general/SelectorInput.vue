<template>
  <div id="select">
    <input required @keydown="handleKeyDown" v-model="userInfo" @click="isVisible = !isVisible" />
    <i>{{ i18n.global.t(props.type) }}</i>
    <div v-if="isVisible" class="selector-dropdown">
      <Button
        class="no-background-no-contour-button"
        :text="i18n.global.t('Male')"
        @click="handleInput('Male')"
      />
      <hr />
      <Button
        class="no-background-no-contour-button"
        :text="i18n.global.t('Female')"
        @click="handleInput('Female')"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from '@/components/general/ComponentButton.vue'
import { ref, onMounted, onBeforeUnmount, type Ref } from 'vue'
import { i18n } from '@/lang'

const isVisible = ref(false)
const selectRef: Ref<HTMLElement | null> = ref(null)
const props = defineProps<{
  modelValue: string
  type: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()

const getGender = (name: string) => {
  return i18n.global.t(name)
}
const userInfo = ref('')

const handleInput = (type: string) => {
  userInfo.value = i18n.global.t(type)
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

onMounted(() => {
  if (props.modelValue) {
    userInfo.value = getGender(props.modelValue)
  }
  selectRef.value = document.getElementById('select')
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
@include index.selector;
</style>

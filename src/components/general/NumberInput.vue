<template>
  <input required v-model="userInfo" @input="handleInput($event)" />
  <i>{{ t(props.type) }}</i>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps<{
  modelValue: number | undefined
  type: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: number | undefined): void
}>()

const userInfo = ref(props.modelValue)

const handleInput = (event: any) => {
  if (!event.target || isNaN(+event.target.value)) {
    userInfo.value = event.target.value.slice(0, event.target.value.length - 1)
    return
  }
  const param = +event.target.value
  const age = (param > 130 ? 130 : param) || undefined
  userInfo.value = age
  emit('update:modelValue', age)
}
</script>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.inputs;
</style>

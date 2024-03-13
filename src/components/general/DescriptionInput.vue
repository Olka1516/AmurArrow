<template>
  <textarea
    required
    v-model="userInfo"
    @input="
      handleInput($event);
      props.v?.$touch()
    "
    rows="4"
    :class="{ invalid: isInfoInvalid() }"
  />
  <i>{{ props.type }}</i>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  modelValue: string
  type: string
  v?: {
    $invalid: boolean
    $dirty: boolean
    $touch: Function
  }
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()

const userInfo = ref(props.modelValue)

const handleInput = (event: any) => {
  if (!event.target) return
  userInfo.value = event.target.value
  emit('update:modelValue', userInfo.value)
}

const isInfoInvalid = () => {
  if(!props.v) return
  return props.v.$invalid && props.v.$dirty
}
</script>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.description;
</style>

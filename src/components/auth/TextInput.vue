<template>
  <input
    required
    v-model="userName"
    @input="
      handleInput($event);
      props.v.$touch()
    "
    :class="{ invalid: isNameInvalid() }"
  />
  <i>{{ props.type }}</i>
</template>
<script setup lang="ts">
import { ErrorMessageEnum } from '@/types'
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
  v: {
    $invalid: boolean
    $dirty: boolean
    $touch: Function
  }
  error?: string
  type: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()

const userName = ref(props.modelValue)

const handleInput = (event: any) => {
  if (!event.target) return
  emit('update:modelValue', event.target.value)
}

const { UsernameOrPasswordWrong, EmailInUse, EmailIsNotValid, UsernameInUse } = ErrorMessageEnum
const isNameInvalid = () => {
  return (
    (props.v.$invalid && props.v.$dirty) ||
    ((props.error === EmailInUse ||
      props.error === EmailIsNotValid) &&
      props.type === 'Email') ||
    (props.error === UsernameInUse && props.type === 'Username') ||
    props.error === UsernameOrPasswordWrong
  )
}

watch(
  () => props.modelValue,
  (data) => {
    userName.value = data
  }
)
</script>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.inputs;
</style>

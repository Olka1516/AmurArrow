<template>
  <input
    required
    v-model="userInfo"
    @input="
      handleInput($event);
      props.v.$touch()
    "
    :class="{ invalid: isInfoInvalid() }"
  />
  <i>{{ t(props.type) }}</i>
</template>
<script setup lang="ts">
import { ErrorMessageEnum } from '@/types'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
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

const userInfo = ref(props.modelValue)

const handleInput = (event: any) => {
  if (!event.target) return
  userInfo.value = event.target.value
  emit('update:modelValue', event.target.value)
}

const { UsernameOrPasswordWrong, EmailInUse, EmailIsNotValid, UsernameInUse } = ErrorMessageEnum
const isInfoInvalid = () => {
  return (
    (props.v.$invalid && props.v.$dirty) ||
    ((props.error === EmailInUse || props.error === EmailIsNotValid) && props.type === 'Email') ||
    (props.error === UsernameInUse && props.type === 'Username') ||
    props.error === UsernameOrPasswordWrong
  )
}
</script>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.inputs;
</style>

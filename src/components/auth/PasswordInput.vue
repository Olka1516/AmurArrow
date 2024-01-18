<template>
  <input
    required
    :type="bloke"
    v-model="userPassword"
    @focus="inputFocused = true"
    @blur="inputFocused = false"
    @input="
      handleInput($event);
      props.v.$touch()
    "
    :class="{
      'invalid': isPasswordInvalid()
    }"
  />
  <i>{{ props.type }} </i>
  <button class="no-background-no-contour-button" @click="isVisible">
    <img :src="newUrl()" />
  </button>
  <div v-if="$props.type == 'Password' && isFocused() && typeof props.error !== 'string'" class="password-suggestion">
    <h4><b>Suggestions</b></h4>
    <ul>
      <li>At least one uppercase</li>
      <li>At least one lowercase</li>
      <li>At least one numeric</li>
      <li>Minimum 8 characters</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ErrorMessageEnum } from '@/types'
import { ref, watch } from 'vue'

const bloke = ref('password')
const props = defineProps<{
  modelValue: string
  v: {
    $invalid: boolean
    $dirty: boolean
    $touch: Function
  }
  type: string
  error?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: string | null): void
}>()

const userPassword = ref(props.modelValue)
const inputFocused = ref(false)

const handleInput = (event: any) => {
  if (!event.target) return
  emit('update:modelValue', event.target.value)
}
const {UsernameOrPasswordWrong, PasswordMinLength, PasswordIsEqual } = ErrorMessageEnum
const isPasswordInvalid = () => {
  return (
    (props.v.$invalid && props.v.$dirty) ||
    props.error === PasswordMinLength ||
    props.error === PasswordIsEqual ||
    props.error === UsernameOrPasswordWrong
  )
}

const isFocused = () => {
  return inputFocused.value
}

const isVisible = () => {
  if (bloke.value === 'password') bloke.value = 'text'
  else bloke.value = 'password'
}

const newUrl = () => {
  const text = bloke.value === 'password' ? 'eye' : 'eye-off'
  const st = new URL(`../../assets/pictures/icons/${text}.png`, import.meta.url)
  return st.pathname
}

watch(
  () => props.modelValue,
  (data) => {
    userPassword.value = data
  }
)
</script>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.password-inputs;
</style>

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
      invalid: isPasswordInvalid()
    }"
  />
  <i>{{ t(props.type) }} </i>
  <Button class="no-background-no-contour-button" @click="isVisible" :icon="newUrl()" />
  <div
    v-if="$props.type == 'Password' && isFocused() && typeof props.error !== 'string'"
    class="password-suggestion"
  >
    <h4>
      <b>{{ t('suggestions') }}</b>
    </h4>
    <ul>
      <li>{{ tm('suggestionsText[0]') }}</li>
      <li>{{ tm('suggestionsText[1]') }}</li>
      <li>{{ tm('suggestionsText[2]') }}</li>
      <li>{{ tm('suggestionsText[3]') }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/general/ComponentButton.vue'
import { ErrorMessageEnum } from '@/types'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
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
const { UsernameOrPasswordWrong, PasswordMinLength, PasswordIsEqual } = ErrorMessageEnum
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
  return bloke.value === 'password' ? 'eye' : 'eye-off'
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

<template>
  <div class="error">
    <span v-if="(props.v.$error && props.v.$dirty) || props.error">
      <small class="text-error">{{ getError() }}</small>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ErrorMessageEnum } from '@/types'
import type { ErrorObject } from '@vuelidate/core'

const props = defineProps<{
  v: {
    $error: boolean
    $dirty: boolean
    $errors: ErrorObject[]
    $path: string
  }
  error?: string
}>()

const {
  EmailIsNotValid,
  IsRequired,
  EmailInUse,
  PasswordMinLength,
  PasswordIsEqual,
  UsernameInUse,
  UsernameOrPasswordWrong
} = ErrorMessageEnum

const getError = () => {
  const { $message: message } = props.v.$errors?.[0] ?? { $message: null }
  switch (props.v.$path) {
    case 'email':
      if (message === EmailIsNotValid) return 'Value is not a valid email address.'
      else if (message === IsRequired) return 'Email is required'
      else if (props.error === EmailInUse) return 'This account already exists.'
      break
    case 'password':
      if (message === IsRequired) return 'Password is required'
      else if (message === PasswordMinLength)
        return 'This field should be at least 6 characters long'
      else if (props.error === UsernameOrPasswordWrong) return 'Username or password is incorrect.'
      break
    case 'confirmPassword':
      if (message === IsRequired) return 'Password is required'
      else if (message === PasswordIsEqual)
        return 'The password must be equal to the other password'
      break
    case 'username':
      if (message === IsRequired) return 'Name is required'
      else if (props.error === UsernameInUse) return 'This account already exists.'
      break
    case 'date':
      if (message === IsRequired) return 'Date is required'
      break
    case 'phone':
      if (message === IsRequired) return 'Phone is required'
      break
  }
}
</script>
<style lang="scss" scoped>
@use '@/assets/scss/index';
@include index.errors;
</style>

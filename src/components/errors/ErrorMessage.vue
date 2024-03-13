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
  UsernameOrPasswordWrong,
  MaxLength50,
  MaxLength255,
} = ErrorMessageEnum

const getError = () => {
  const { $message: message } = props.v.$errors?.[0] ?? { $message: null }
  console.log(message)
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
      if (message === IsRequired) return 'Username is required'
      else if (props.error === UsernameInUse) return 'This account already exists.'
      break
    case 'age':
      if (message === IsRequired) return 'Age is required'
      break
    case 'firstName':
      if (message === IsRequired) return 'First name is required'
      break
    case 'lastName':
      if (message === IsRequired) return 'Last name is required'
      break
    case 'gender':
      if (message === IsRequired) return 'Gender is required'
      break
    case 'location':
      if (message === IsRequired) return 'Location is required'
      break
    case 'description':
      if (message === IsRequired) return 'Description is required'
      if (message === MaxLength255) return MaxLength255
      break
    case 'title':
      if (message === IsRequired) return 'Title is required'
      if (message === MaxLength50) return MaxLength50
      break
  }
}
</script>
<style lang="scss" scoped>
@use '@/assets/scss/index';
@include index.errors;
</style>

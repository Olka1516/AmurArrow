<template>
  <div class="error">
    <span v-if="(props.v.$error && props.v.$dirty) || props.error">
      <small class="p-error">{{ getError() }}</small>
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

const getError = () => {
  const { $message: message } = props.v.$errors?.[0] ?? { $message: null }
  switch (props.v.$path) {
    case 'email':
      if (message === ErrorMessageEnum.EmailIsNotValid) return 'Value is not a valid email address.'
      else if (message === ErrorMessageEnum.IsRequired) return 'Email is required'
      else if (props.error === ErrorMessageEnum.EmailInUse) return 'This account already exists.'
      else if (props.error === ErrorMessageEnum.EmailNotFound)
        return 'Email is incorrect. Please try again'
      break
    case 'password':
      if (message === ErrorMessageEnum.IsRequired) return 'Password is required'
      else if (message === ErrorMessageEnum.PasswordMinLength)
        return 'This field should be at least 6 characters long'
      else if (props.error === ErrorMessageEnum.PasswordNotFound)
        return 'Password is incorrect. Please try again.'
      break
    case 'confirmPassword':
      if (message === ErrorMessageEnum.IsRequired) return 'Password is required'
      else if (message === ErrorMessageEnum.PasswordIsEqual)
        return 'The password must be equal to the other password'
      break
    case 'username':
      if (message === ErrorMessageEnum.IsRequired) return 'Name is required'
      break
    case 'date':
      if (message === ErrorMessageEnum.IsRequired) return 'Date is required'
      break
    case 'phone':
      if (message === ErrorMessageEnum.IsRequired) return 'Phone is required'
      break
  }
}
</script>
<style lang="scss" scoped>
@use '@/assets/scss/index';
@include index.errors;
</style>

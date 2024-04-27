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
import { i18n } from '../../lang'

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
  switch (props.v.$path) {
    case 'email':
      if (message === EmailIsNotValid) return i18n.global.t('emailIsNotValid')
      else if (message === IsRequired) return i18n.global.t('emailIsRequired')
      else if (props.error === EmailInUse) return i18n.global.t('emailInUse')
      break
    case 'password':
      if (message === IsRequired) return i18n.global.t('passwordIsRequired')
      else if (message === PasswordMinLength)
        return i18n.global.t('passwordMinLength')
      else if (props.error === UsernameOrPasswordWrong) return i18n.global.t('usernameOrPasswordWrong')
      break
    case 'confirmPassword':
      if (message === IsRequired) return i18n.global.t('passwordIsRequired')
      else if (message === PasswordIsEqual)
        return i18n.global.t('passwordIsEqual')
      break
    case 'username':
      if (message === IsRequired) return i18n.global.t('usernameIsRequired')
      else if (props.error === UsernameInUse) return i18n.global.t('usernameInUse')
      break
    case 'age':
      if (message === IsRequired) return i18n.global.t('ageIsRequired')
      break
    case 'firstName':
      if (message === IsRequired) return i18n.global.t('firstNameIsRequired')
      break
    case 'lastName':
      if (message === IsRequired) return i18n.global.t('lastNameIsRequired')
      break
    case 'gender':
      if (message === IsRequired) return i18n.global.t('genderIsRequired')
      break
    case 'location':
      if (message === IsRequired) return i18n.global.t('locationIsRequired')
      break
    case 'description':
      if (message === IsRequired) return i18n.global.t('descriptionIsRequired')
      if (message === MaxLength255) return i18n.global.t('maxLength', {num: 255})
      break
    case 'title':
      if (message === IsRequired) return i18n.global.t('titleIsRequired')
      if (message === MaxLength50) return i18n.global.t('maxLength', {num: 50})
      break
  }
}
</script>
<style lang="scss" scoped>
@use '@/assets/scss/index';
@include index.errors;
</style>

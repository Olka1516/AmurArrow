<script setup lang="ts">
import ErrorMessage from '@/components/errors/ErrorMessage.vue'
import Button from '@/components/general/ComponentButton.vue'
import TextInput from '@/components/general/TextInput.vue'
import PasswordInput from '@/components/general/PasswordInput.vue'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { reactive, ref } from 'vue'
import { authStore, toastStore, useLoaderState } from '@/stores'
import { useRouter } from 'vue-router'
import type { TRequestError } from '@/types'
import { useI18n } from 'vue-i18n'

const loadStore = useLoaderState()
const { t } = useI18n()
const authS = authStore()
const toastS = toastStore()
const router = useRouter()
const error = ref('')
const user = reactive({
  username: '',
  password: ''
})

const rules = {
  username: { required },
  password: { required }
}

const v$ = useVuelidate(rules, user)
const signIn = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) {
    return
  }
  try {
    await authS.signIn({ username: user.username, password: user.password })
    localStorage.setItem('username', user.username)
    await router.push('/user-profile/' + user.username)
    toastS.sendSuccess('signInSuccess')
  } catch (err) {
    const message = err as TRequestError
    toastS.sendError('textDanger')
    error.value = message.response?.data.message || ''
  }
}

const signUp = async () => {
  loadStore.changeStateFalse()
  await router.push('/sign-up')
}

const back = async () => {
  loadStore.changeStateFalse()
  await router.push('/')
}
</script>
<template>
  <section>
    <div v-for="n in 261" :key="n">
      <span></span>
    </div>

    <div class="sign-page">
      <Button icon="back" class="fill-pink-button rounded" @click="back()" />
      <div class="sign-page-content">
        <h2>{{ t('signIn') }}</h2>
        <div class="form">
          <div class="form-input">
            <TextInput v-model="user.username" :v="v$.username" type="Username" :error="error" />
            <ErrorMessage :v="v$.username" :error="error" />
          </div>
          <div class="form-input">
            <PasswordInput
              v-model="user.password"
              :v="v$.password"
              type="Password"
              :error="error"
            />
            <ErrorMessage :v="v$.password" :error="error" />
          </div>
          <div class="form-links">
            <a href="#">{{ t('forgotPas') }}</a>
          </div>
          <div class="form-input">
            <Button class="fill-pink-button" @click="signIn" :text="t('submit')" />
            <Button class="contour-button" @click="signUp" :text="t('signUp')" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.sign-in;
</style>

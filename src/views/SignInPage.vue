<script setup lang="ts">
import ErrorMessage from '@/components/errors/ErrorMessage.vue'
import Button from '@/components/general/ComponentButton.vue'
import TextInput from '@/components/auth/TextInput.vue'
import PasswordInput from '@/components/auth/PasswordInput.vue'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { reactive, ref } from 'vue'
import { authStore } from '@/stores'
import { useRouter } from 'vue-router'

const authS = authStore()
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
    router.push('/user-profile')
  } catch (err: any) {
    error.value = err.response.data.message
  }
}

const signUp = async () => {
  await router.push('/sign-up')
}
</script>
<template>
  <section>
    <div v-for="n in 261" :key="n">
      <span></span>
    </div>

    <div class="sign-page">
      <div class="sign-page-content">
        <h2>Sign in</h2>
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
            <a href="#">Forgot Password</a>
          </div>
          <div class="form-input">
            <Button class="fill-pink-button" @click="signIn" text="Submit" />
            <Button class="contour-button" @click="signUp" text="Sign up" />
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

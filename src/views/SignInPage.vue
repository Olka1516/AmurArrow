<script setup lang="ts">
import ErrorMessage from '@/components/errors/ErrorMessage.vue'
import TextInput from '@/components/auth/TextInput.vue'
import PasswordInput from '@/components/auth/PasswordInput.vue'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

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
    // await authStore.signIn(user)
    // userStore.role === 'client' ? router.push('/client/mainPage') : router.push('/admin/tablePage')
  } catch (err: any) {
    error.value = err.message
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

    <div class="signin">
      <div class="content">
        <h2>Sign in</h2>
        <div class="form">
          <div class="inputBox">
            <TextInput v-model="user.username" :v="v$.username" type="Username" :error="error" />
            <ErrorMessage :v="v$.username" :error="error" />
          </div>
          <div class="inputBox">
            <PasswordInput
              v-model="user.password"
              :v="v$.password"
              type="Password"
              :error="error"
            />
            <ErrorMessage :v="v$.password" :error="error" />
          </div>
          <div class="links">
            <a href="#">Forgot Password</a>
            <button class="no-background-no-contour-button" @click="signUp">Sign up</button>
          </div>
          <div class="inputBox">
            <button class="fill-pink-button" @click="signIn">Submit</button>
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

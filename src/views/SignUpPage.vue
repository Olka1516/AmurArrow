<script setup lang="ts">
import ErrorMessage from '@/components/errors/ErrorMessage.vue'
import TextInput from '@/components/auth/TextInput.vue'
import PasswordInput from '@/components/auth/PasswordInput.vue'
import { reactive, ref, computed } from 'vue'
import { email, required, sameAs, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useRouter } from 'vue-router'

const router = useRouter()

const error = ref('')
const user = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const rules = {
  username: { required },
  email: { required, email },
  password: { required, minLength: minLength(6) },
  confirmPassword: {
    required,
    sameAs: sameAs(computed(() => user.password))
  }
}

const v$ = useVuelidate(rules, user)
const signUp = async () => {
  const isFormCorrect = await v$.value.$validate()
  // console.log('work', user.username)
  if (!isFormCorrect) return

  try {
    // await authStore.signUp(user)
    // router.push('/client/mainPage')
  } catch (err: any) {
    error.value = err.message
  }
}

const signIn = async () => {
  await router.push('/sign-in')
}
</script>
<template>
  <section>
    <div v-for="n in 261" :key="n">
      <span></span>
    </div>

    <div class="signin">
      <div class="content">
        <h2>Sign up</h2>
        <div class="form">
          <div class="inputBox">
            <TextInput v-model="user.username" :v="v$.username" type="Username" />
            <ErrorMessage :v="v$.username" />
          </div>
          <div class="inputBox">
            <TextInput v-model="user.email" :v="v$.email" :error="error" type="Email" />
            <ErrorMessage :v="v$.email" />
          </div>
          <div class="inputBox">
            <PasswordInput v-model="user.password" :v="v$.password" type="Password" />
            <ErrorMessage :v="v$.password" />
          </div>
          <div class="inputBox">
            <PasswordInput
              v-model="user.confirmPassword"
              :v="v$.confirmPassword"
              type="Confirm password"
            />
            <ErrorMessage :v="v$.confirmPassword" />
          </div>
          <div class="inputBox">
            <button class="fill-pink-button" @click="signUp">Submit</button>
            <button class="contour-button" @click="signIn">Sign in</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.sign-up;
</style>

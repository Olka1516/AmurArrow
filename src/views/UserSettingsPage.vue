<script setup lang="ts">
import Button from '@/components/general/ComponentButton.vue'
import Avatar from '@/components/general/AvatarComponent.vue'
import ErrorMessage from '@/components/errors/ErrorMessage.vue'
import TextInput from '@/components/general/TextInput.vue'
import NumberInput from '@/components/general/NumberInput.vue'
import DescriptionInput from '@/components/general/DescriptionInput.vue'
import LocationSelector from '@/components/general/locationSelector.vue'
import LinkInput from '@/components/general/LinkInput.vue'
import DragFile from '@/components/general/DragFile.vue'
import { ref, reactive } from 'vue'
import { email, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import SelectorInput from '@/components/general/SelectorInput.vue'
import { userStore } from '@/stores'

const store = userStore()
const error = ref('')
const user = reactive({
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  description: '',
  age: undefined,
  gender: '',
  location: ''
})

const media = reactive({
  instagram: '',
  telegram: '',
  facebook: '',
  pinterest: ''
})

const rules = {
  username: { required },
  email: { required, email },
  firstName: { required },
  lastName: { required }
}

const v$ = useVuelidate(rules, user)
const submit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  try {
    // router.push('/user-profile')
  } catch (err: any) {
    error.value = err.response.data.message
  }
}

const getName = () => {
  return store.firstName
    ? store.firstName.charAt(0) + store.lastName!.charAt(0)
    : store.username.charAt(0)
}
</script>
<template>
  <div class="warpper-form">
    <div class="user-content">
      <div class="user-settings">
        <Avatar :name="getName" type="settings" />
        <hr />
        <div class="form">
          <DragFile />
          <div class="form-column">
            <div class="form-input">
              <TextInput v-model="user.username" :v="v$.username" type="Username" :error="error" />
              <ErrorMessage :v="v$.username" :error="error" />
            </div>
            <div class="form-input">
              <TextInput v-model="user.email" :v="v$.email" :error="error" type="Email" />
              <ErrorMessage :v="v$.email" :error="error" />
            </div>
          </div>
          <div class="form-column">
            <div class="form-input">
              <TextInput v-model="user.firstName" :v="v$.firstName" type="First name" />
              <ErrorMessage :v="v$.firstName" />
            </div>
            <div class="form-input">
              <TextInput v-model="user.lastName" :v="v$.lastName" type="Last name" />
              <ErrorMessage :v="v$.lastName" />
            </div>
          </div>
          <div class="form-column">
            <div class="form-input">
              <NumberInput v-model="user.age" type="Age" />
            </div>
            <div class="form-input">
              <SelectorInput v-model="user.gender" type="Gender" />
            </div>
          </div>
          <div class="form-input">
            <LocationSelector v-model="user.location" type="Location" />
          </div>
          <div class="form-input">
            <DescriptionInput v-model="user.description" type="Description" />
          </div>
          <div class="form-column">
            <div class="form-input">
              <LinkInput v-model="media.facebook" type="Facebook" />
            </div>
            <div class="form-input">
              <LinkInput v-model="media.instagram" type="Instagram" />
            </div>
          </div>
          <div class="form-column">
            <div class="form-input">
              <LinkInput v-model="media.pinterest" type="Pinterest" />
            </div>
            <div class="form-input">
              <LinkInput v-model="media.telegram" type="Telegram" />
            </div>
          </div>
          <Button class="fill-pink-button" text="Submit" @click="submit" />
        </div>
      </div>
    </div>
    <div class="section-wapper">
      <div class="section-relative">
        <section>
          <div v-for="n in 880" :key="n">
            <span></span>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.user-settings;
</style>

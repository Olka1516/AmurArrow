<script setup lang="ts">
import DragFile from '@/components/general/DragFile.vue'
import TextInput from '@/components/general/TextInput.vue'
import DescriptionInput from '@/components/general/DescriptionInput.vue'
import Button from '@/components/general/ComponentButton.vue'
import ErrorMessage from '@/components/errors/ErrorMessage.vue'
import { reactive, ref } from 'vue'
import { required, maxLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { userStore } from '@/stores'
import { useRouter } from 'vue-router'
import type { Post, TRequestError } from '@/types'
const router = useRouter()
const store = userStore()
const error = ref('')

const info = reactive<Post>({
  image: null,
  description: '',
  title: '',
  date: null
})

const rules = {
  image: { required, maxLength: maxLength(50) },
  title: { required, maxLength: maxLength(50) },
  description: { maxLength: maxLength(255) }
}
const v$ = useVuelidate(rules, info)

const back = async () => {
  await router.push('/user-profile/' + store.username)
}

const setImage = (item: File) => {
  info.image = item
}

const submit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return
  try {
    info.date = new Date()
    await store.addPost(info)
    await router.push('/user-profile/' + store.username)
  } catch (err) {
    const message = err as TRequestError
    error.value = message.response?.data.message || ''
  }
}
</script>
<template>
  <div class="warpper-form">
    <div class="user-posts">
      <div class="user-posts-content">
        <Button icon="back" class="fill-pink-button rounded" @click="back()" />
        <DragFile :isPostsPage="true" @update="(item) => setImage(item)" :v="v$.image" />
        <hr />
        <div class="user-content-inputs">
          <div class="form-input">
            <TextInput v-model="info.title" :v="v$.title" type="Title" />
            <ErrorMessage :v="v$.title" />
          </div>
          <div class="form-input">
            <DescriptionInput v-model="info.description" :v="v$.description" type="Description" />
            <ErrorMessage :v="v$.description" />
          </div>
          <Button text="Submit" class="fill-pink-button" @click="submit" />
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
@include index.user-posts;
</style>

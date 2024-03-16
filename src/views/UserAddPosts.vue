<script setup lang="ts">
import DragFile from '@/components/general/DragFile.vue'
import TextInput from '@/components/general/TextInput.vue'
import DescriptionInput from '@/components/general/DescriptionInput.vue'
import Button from '@/components/general/ComponentButton.vue'
import ErrorMessage from '@/components/errors/ErrorMessage.vue'
import { reactive } from 'vue'
import { required, maxLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useRouter } from 'vue-router'
const router = useRouter()

const info = reactive<{
  image: File | null
  description: string
  title: string
}>({
  image: null,
  description: '',
  title: ''
})

const rules = {
  image: { required, maxLength: maxLength(50) },
  title: { required, maxLength: maxLength(50) },
  description: { maxLength: maxLength(255) }
}
const v$ = useVuelidate(rules, info)

const back = () => {
  router.back()
}

const setImage = (item: File) => {
  info.image = item
}

const submit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return
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

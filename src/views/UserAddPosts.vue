<script setup lang="ts">
import DragFile from '@/components/general/DragFile.vue'
import TextInput from '@/components/general/TextInput.vue'
import DescriptionInput from '@/components/general/DescriptionInput.vue'
import { ref } from 'vue'

const description = ref('')
const title = ref('')
</script>
<template>
  <section>
    <div v-for="n in 261" :key="n">
      <span></span>
    </div>

    <div class="user-posts">
      <div class="user-posts-content">
        <DragFile :isPostsPage="true" />
        <hr />
        <div class="user-content-inputs">
          <div class="form-input">
            <TextInput v-model="title" type="Title" />
          </div>
          <div class="form-input">
            <DescriptionInput v-model="description" type="Description" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.user-posts;
</style>

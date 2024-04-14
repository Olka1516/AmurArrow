<script setup lang="ts">
import Tinder from 'vue-tinder'
import 'vue-tinder/lib/style.css'
import Button from '@/components/general/ComponentButton.vue'
import { loverStore } from '@/stores'
import { onMounted, ref, type Ref } from 'vue'

const store = loverStore()

const getPhoto = (img: string) => {
  const st = new URL(`../../assets/pictures/${img}`, import.meta.url)
  return st.pathname
}

const queue: Ref<{ id: string }[]> = ref([])
const offset = ref(0)

const mock = (count = 5) => {
  const list: { id: string }[] = []
  for (let i = 0; i < count; i++) {
    if (offset.value != store.photos.length) {
      list.push({ id: store.photos[offset.value] })
      offset.value++
    } else {
      break
    }
  }
  queue.value = queue.value.concat(list)
}

const onSubmit = (type: string, key: string) => {
  if (queue.value.length < 3) {
    mock()
  }
}

const tinder = ref<InstanceType<typeof Tinder>>()

const decide = (choice: string) => {
  tinder.value.decide(choice)
}

onMounted(() => {
  mock()
})
</script>

<template>
  <div id="swipper" v-if="queue.length">
    <Tinder
      class="vue-tinder"
      ref="tinder"
      key-name="id"
      v-model:queue="queue"
      :offset-y="10"
      @submit="onSubmit"
    >
      <template v-slot="{ data }">
        <img class="swipper-image" :src="getPhoto(data.id)" alt="" />
      </template>
    </Tinder>
    <div class="swipper-btns">
      <Button icon="back_pink" class="contour-button rounded" @click="decide('nope')" />
      <Button icon="heart" class="fill-pink-button rounded" @click="decide('like')" />
    </div>
  </div>
  <div v-else class="swipper-empty">
    <h1>Opss, looks like there are no more images</h1>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.find-lover;
</style>

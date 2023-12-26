<script lang="ts" setup>
import ComponentAccordion from '@/components/ComponentAccordion.vue'
import { useInfoStore } from '@/stores'
import { ref } from 'vue'
const store = useInfoStore()
const prevId = ref(10)

const change = (num: number) => {
  prevId.value = num
}
</script>
<template>
  <div class="accordion">
    <div class="container">
      <img class="accordion-img" src="@/assets/pictures/hands2.webp" alt="" />
      <div class="accordion-texts">
        <div v-for="key in store.accordion" :key="key.id">
          <ComponentAccordion
            :title="key.title"
            :text="key.text"
            :id="key.id"
            :isShow="false"
            :prevId="prevId"
            @change="(value: number) => change(value)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.accordion;
</style>

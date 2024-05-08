<script setup lang="ts">
import Selector from '../general/SelectorInput.vue'
import NumberInput from '../general/NumberInput.vue'
import LocationSelector from '../general/locationSelector.vue'
import Button from '../general/ComponentButton.vue'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { loverStore } from '@/stores'
import type { UserFilterItems } from '@/types'

const store = loverStore()
const { t } = useI18n()
const props = defineProps<{ userData: UserFilterItems }>()

const getGender = () => {
  return props.userData.gender === 'Male' ? 'Female' : 'Male'
}

const getMaxAge = () => {
  return props.userData.age ? props.userData.age + 20 : props.userData.age
}

const itemsFiltre = reactive({
  gender: getGender(),
  minAge: props.userData.age,
  maxAge: getMaxAge(),
  location: props.userData.location!
})

const isShow = ref(false)

const isOpen = () => {
  isShow.value = !isShow.value
}

const submit = () => {
  store.filterPosts(itemsFiltre)
}
</script>

<template>
  <div class="swipper-wrraper">
    <Button @click="isOpen" icon="filter" class="no-background-no-contour-button rounded" />
    <div v-if="isShow" class="swipper-filtres-inner">
      <Selector v-model="itemsFiltre.gender" type="Gender" />
      <div class="swipper-ages">
        <NumberInput v-model="itemsFiltre.minAge" type="minAge" />
        <NumberInput v-model="itemsFiltre.maxAge" type="maxAge" />
      </div>
      <LocationSelector v-model="itemsFiltre.location" />
      <Button @click="submit" class="fill-pink-button" :text="t('submit')" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.component-filtres;
</style>

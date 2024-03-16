<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()

const locations = ref(props.modelValue.split(' '))
const country = ref(locations.value[0])
const region = ref(locations.value[1])

watch(
  () => country.value,
  () => {
    emit('update:modelValue', country.value + ' ' + region.value)
  }
)
watch(
  () => region.value,
  () => {
    emit('update:modelValue', country.value + ' ' + region.value)
  }
)
</script>
<template>
  <div class="select">
    <div>
      <country-select v-model="country" :country="country" :countryName="true" />
      <i>Country</i>
    </div>
    <div>
      <region-select
        v-model="region"
        :country="country"
        :region="region"
        :countryName="true"
        :regionName="true"
      />
      <i>Region</i>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.location-select;
</style>

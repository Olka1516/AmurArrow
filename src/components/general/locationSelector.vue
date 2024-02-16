<script setup lang="ts">
import { ref } from 'vue'

const country = ref('')
const region = ref('')
</script>
<template>
  <div class="select">
    <div>
      <country-select v-model="country" :country="country" :countryName="true" />
      <i>Country</i>
    </div>
    <div>
      <region-select v-model="region" :country="country" :regionName="true" />
      <i>Region</i>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.location-select;
</style>

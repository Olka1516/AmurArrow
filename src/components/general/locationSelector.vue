<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { i18n } from '@/lang'

const { t } = useI18n()
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()

const locations = ref(props.modelValue.split(' '))
const country = ref('')
const region = ref('')
const countryRef = ref(locations.value[0])

const getEnglishWord = (ukrainianWord: string) => {
  for (const englishWord in i18n.global.messages.ua) {
    if (
      i18n.global.messages.ua[englishWord as keyof typeof i18n.global.messages.ua] === ukrainianWord
    ) {
      return englishWord
    }
  }
  return ukrainianWord
}

watch(
  () => country.value,
  () => {
    countryRef.value = getEnglishWord(country.value)
    emit('update:modelValue', countryRef.value + ' ' + getEnglishWord(region.value))
  }
)
watch(
  () => region.value,
  () => {
    emit('update:modelValue', countryRef.value + ' ' + getEnglishWord(region.value))
  }
)

onMounted(() => {
  if (props.modelValue) {
    country.value = i18n.global.t(locations.value[0])
    region.value = i18n.global.t(locations.value[1])
  }
})
</script>
<template>
  <div class="select">
    <div>
      <country-select
        v-model="country"
        :country="country"
        :countryName="true"
        :placeholder="i18n.global.t('selectCountry')"
      />
      <i>{{ t('country') }}</i>
    </div>
    <div>
      <region-select
        v-model="region"
        :country="countryRef"
        :region="region"
        :countryName="true"
        :regionName="true"
        :placeholder="i18n.global.t('selectRegion')"
      />
      <i>{{ t('region') }}</i>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.location-select;
</style>

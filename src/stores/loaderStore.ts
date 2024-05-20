import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoaderState = defineStore('isLoading', () => {
  const loading = ref(false)

  const changeStateTrue = () => {
    loading.value = true
  }

  const changeStateFalse = () => {
    loading.value = false
  }

  return { loading, changeStateTrue, changeStateFalse }
})

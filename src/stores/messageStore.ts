import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export const useMessageStore = defineStore('info', () => {
  const state = reactive({
    username: '',
    content: ['']
  })

  const addToContent = (message: string) => {
    state.content.push(message)
  }

  return { ...toRefs(state), addToContent }
})

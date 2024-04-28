import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useInfoStore = defineStore('info', () => {
  const info = ref([
    {
      title: 'infoTitle[0]',
      text: 'infoText[0]',
      id: 1
    },
    {
      title: 'infoTitle[1]',
      text: 'infoText[1]',
      id: 2
    },
    {
      title: 'infoTitle[2]',
      text: 'infoText[1]',
      id: 3
    }
  ])

  const review = ref([
    {
      text: 'texts[0]',
      id: 1
    },
    {
      text: 'texts[1]',
      id: 2
    },
    {
      text: 'texts[2]',
      id: 3
    }
  ])

  const accordion = ref([
    {
      title: 'accordionTitle[0]',
      text: 'accordionText[0]',
      id: 1
    },
    {
      title: 'accordionTitle[1]',
      text: 'accordionText[1]',
      id: 2
    },
    {
      title: 'accordionTitle[2]',
      text: 'accordionText[2]',
      id: 3
    },
    {
      title: 'accordionTitle[3]',
      text: 'accordionText[3]',
      id: 4
    }
  ])

  return { info, review, accordion }
})

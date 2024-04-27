import { ref } from 'vue'
import { defineStore } from 'pinia'
import { i18n } from '../lang'

export const useInfoStore = defineStore('info', () => {
  const getText = (name: string) => {
    return i18n.global.tm(name)
  }

  const info = ref([
    {
      title: getText('infoTitle[0]'),
      text: getText('infoText[0]'),
      id: 1
    },
    {
      title: getText('infoTitle[1]'),
      text: getText('infoText[1]'),
      id: 2
    },
    {
      title: getText('infoTitle[2]'),
      text: getText('infoText[1]'),
      id: 3
    }
  ])

  const review = ref([
    {
      text: getText('texts[0]'),
      id: 1
    },
    {
      text: getText('texts[1]'),
      id: 2
    },
    {
      text: getText('texts[2]'),
      id: 3
    }
  ])

  const accordion = ref([
    {
      title: getText('accordionTitle[0]'),
      text: getText('accordionText[0]'),
      id: 1
    },
    {
      title: getText('accordionTitle[1]'),
      text: getText('accordionText[1]'),
      id: 2
    },
    {
      title: getText('accordionTitle[2]'),
      text: getText('accordionText[2]'),
      id: 3
    },
    {
      title: getText('accordionTitle[3]'),
      text: getText('accordionText[3]'),
      id: 4
    }
  ])

  return { info, review, accordion }
})

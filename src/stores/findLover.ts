import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const loverStore = defineStore('findLover', () => {
  const photos: Ref<string[]> = ref([
    '1.jpg',
    '2.jpg',
    '3.jpg',
    'blank.jpg',
    'hands.jpg',
    'hands2.webp',
    '1.jpg',
    '2.jpg',
    'white-blank.jpg'
  ])

  return { photos }
})

import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export const userStore = defineStore('userInfo', () => {
  const state = reactive({
    username: 'Nesoric',
    firstname: 'Oleksii',
    lastname: 'Holodniak',
    email: 'HarryPotter@gmail.com',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit nemo amet debitis! Reprehenderit laudantium voluptates dolorum optio quis nostrum officiis odit odio natus cum. Consequatur ipsa nulla quasi blanditiis porro?',
    age: 18,
    gender: 'male',
    location: 'Kingdom'
  })

  const media = [
    {
      name: 'facebook',
      link: 'https://www.facebook.com/?locale=uk_UA'
    },
    {
      name: 'instagram',
      link: 'https://www.facebook.com/?locale=uk_UA'
    },
    {
      name: 'pinterest',
      link: 'https://www.facebook.com/?locale=uk_UA'
    },
    {
      name: 'telegram',
      link: 'https://www.facebook.com/?locale=uk_UA'
    }
  ]

  const userPhotos = [
    '../../assets/pictures/2.jpg',
    '../../assets/pictures/3.jpg',
    '../../assets/pictures/1.jpg',
    '../../assets/pictures/3.jpg',
    '../../assets/pictures/2.jpg',
    '../../assets/pictures/1.jpg',
    '../../assets/pictures/1.jpg',
    '../../assets/pictures/3.jpg',
    '../../assets/pictures/2.jpg',
    '../../assets/pictures/1.jpg',
    '../../assets/pictures/3.jpg',
    '../../assets/pictures/2.jpg',
    '../../assets/pictures/1.jpg'
  ]
  const favouritePhotos = []

  return { ...toRefs(state), userPhotos, favouritePhotos, media }
})

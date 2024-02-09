import type { UserInfo } from '@/types'
import { defineStore } from 'pinia'
import { reactive, ref, toRefs, type Ref } from 'vue'
import { getUserInfoByUsername } from '@/services'

export const userStore = defineStore('userInfo', () => {
  const state: UserInfo = reactive({
    username: '',
    firstName: null,
    lastName: null,
    email: '',
    description: null,
    age: 0,
    gender: null,
    location: null,
    userType: ''
  })

  const media: Ref<{ name: string; link: string }[] | []> = ref([])

  const ownerPhotos: Ref<string[] | []> = ref([])
  const favouritePhotos: Ref<string[] | []> = ref([])

  const getUserInfo = async (username: string) => {
    const data = await getUserInfoByUsername(username)
    state.age = data.age
    state.description = data.description
    state.email = data.email
    state.firstName = data.firstName
    state.gender = data.gender
    state.lastName = data.lastName
    state.location = data.location
    state.username = data.username
    state.userType = data.userType

    ownerPhotos.value = data.ownerPhotos
    favouritePhotos.value = data.favouritePhotos
    media.value = data.media
  }

  return { ...toRefs(state), ownerPhotos, favouritePhotos, media, getUserInfo }
})

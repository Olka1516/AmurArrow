import type { UserInfo, User, Media, Post } from '@/types'
import { defineStore } from 'pinia'
import { reactive, ref, toRefs, type Ref } from 'vue'
import { getUserInfoByUsername, updateUserInfo, setUserImage, addUserPost } from '@/services'

export const userStore = defineStore('userInfo', () => {
  const state: UserInfo = reactive({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    description: '',
    age: undefined,
    gender: '',
    location: '',
    userType: '',
    profileImage: '',
    blankImage: '',
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
    state.profileImage = data.profileImage
    state.blankImage = data.blankImage

    ownerPhotos.value = data.ownerPhotos
    favouritePhotos.value = data.favouritePhotos
    media.value = data.media

  }

  const updateUser = async (user: User, media: Media) => {
   return await updateUserInfo(user, media)
  }

  const setImage = async (image: File, name: string) => {
   return await setUserImage(image, name)
  }

  const addPost = async (data: Post) => {
   return await addUserPost(data)
  }

  return { ...toRefs(state), ownerPhotos, favouritePhotos, media, getUserInfo, updateUser, setImage, addPost }
})

import type { UserInfo, User, Media, Post, ReqPost, ReqMedia } from '@/types'
import { defineStore } from 'pinia'
import { reactive, ref, toRefs, type Ref } from 'vue'
import {
  getUserInfoByUsername,
  updateUserInfo,
  setUserImage,
  addUserPost,
  getUserPostsByUsername
} from '@/services'

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
    blankImage: ''
  })

  const media: Ref<ReqMedia[] | []> = ref([])

  const ownerPhotos: Ref<ReqPost[] | []> = ref([])
  const favouritePhotos: Ref<ReqPost[] | []> = ref([])

  const getUserInfo = async (username: string) => {
    const data = await getUserInfoByUsername(username)
    ownerPhotos.value = await getUserPostsByUsername(username, 'OWN')
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
    media.value = data.media

    if (state.userType === 'OWNER')
      favouritePhotos.value = await getUserPostsByUsername(username, 'FAVORITE')
  }

  const getOnlyUserInfo = async (username: string) => {
    return await getUserInfoByUsername(username)
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

  return {
    ...toRefs(state),
    ownerPhotos,
    favouritePhotos,
    media,
    getUserInfo,
    updateUser,
    setImage,
    addPost,
    getOnlyUserInfo
  }
})

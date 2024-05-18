import type { UserInfo, User, Media, Post, ReqPost, ReqMedia } from '@/types'
import { defineStore } from 'pinia'
import { reactive, ref, toRefs, type Ref } from 'vue'
import { Client, Posts } from '@/services'

export const userStore = defineStore('userInfo', () => {
  const posts = new Posts()
  const сlient = new Client()
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
    const data = await сlient.getUserInfoByUsername(username)
    ownerPhotos.value = await posts.getUserPostsByUsername(username, 'OWN')
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

    if (state.userType === 'OWNER') {
      favouritePhotos.value = await posts.getUserPostsByUsername(username, 'FAVORITE')
      localStorage.setItem('username', data.username)
      localStorage.setItem('image', data.profileImage)
      localStorage.setItem('firstName', data.firstName)
      localStorage.setItem('lastName', data.lastName)
    }
  }

  const getOnlyUserInfo = async (username: string) => {
    return await сlient.getUserInfoByUsername(username)
  }

  const updateUser = async (user: User, media: Media) => {
    return await сlient.updateUserInfo(user, media)
  }

  const setImage = async (image: File, name: string) => {
    return await сlient.setUserImage(image, name)
  }

  const addPost = async (data: Post) => {
    return await posts.addUserPost(data)
  }
  const deletePost = async (id: string) => {
    const data = await posts.deleteUserPostById(id)
    ownerPhotos.value = await posts.getUserPostsByUsername(state.username, 'OWN')
    favouritePhotos.value = await posts.getUserPostsByUsername(state. username, 'FAVORITE')
    return data
  }

  return {
    ...toRefs(state),
    ownerPhotos,
    favouritePhotos,
    media,
    getUserInfo,
    deletePost,
    updateUser,
    setImage,
    addPost,
    getOnlyUserInfo
  }
})

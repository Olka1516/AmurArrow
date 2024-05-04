import { addFavoitePostForUser, getAllLovers, sendUserMessage } from '@/services'
import type { FavoritePost, ReqPost } from '@/types'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const loverStore = defineStore('findLover', () => {
  const photos: Ref<ReqPost[]> = ref([])

  const getAll = async (username: string) => {
    const data = await getAllLovers(username)
    photos.value = data
  }

  const addFavoritePost = async (data: FavoritePost) => {
    return await addFavoitePostForUser(data)
  }

  const sendMessage = async (type: string, username: string) => {
    return await sendUserMessage(type, username)
  }

  return { photos, getAll, addFavoritePost,sendMessage }
})

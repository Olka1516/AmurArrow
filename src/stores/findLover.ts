import { addFavoitePostForUser, getAllLovers } from '@/services'
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

  return { photos, getAll, addFavoritePost }
})

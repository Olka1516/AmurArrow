import { Lovers } from '@/services'
import type { AddPost, FilterItems, ReqPost } from '@/types'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const loverStore = defineStore('findLover', () => {
  const photos: Ref<ReqPost[]> = ref([])
  const lovers = new Lovers()
  const getAll = async (username: string) => {
    const data = await lovers.getAllLovers(username)
    photos.value = data
  }

  const addFavoritePost = async (data: AddPost) => {
    return await lovers.addFavoitePostForUser(data)
  }

  const sendMessage = async (type: string, username: string) => {
    return await lovers.sendUserMessage(type, username)
  }

  const filterPosts = async (filters: FilterItems) => {
    const data = await lovers.getPostByFiltres(filters)
    photos.value = data
  }

  return { photos, getAll, addFavoritePost, sendMessage, filterPosts }
})

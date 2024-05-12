import type { FavoritePost, FilterItems } from '@/types'
import http from '../http-common'
import { axiosFileInstance } from '@/axios-file'

export const getAllLovers = async (username: String) => {
  const data = await http.get('/api/lovers/get-all/' + username)
  return data.data
}

export const addFavoitePostForUser = async (data: FavoritePost) => {
  const formData = new FormData()
  formData.append('image', data.image)
  formData.append('title', data.title)
  formData.append('description', data.description)
  formData.append('date', data.date)
  formData.append('id', data.id)
  formData.append('username', data.username)
  return await axiosFileInstance.post('/api/lovers/add', formData)
}

export const sendUserMessage = async (type: string, username: string) => {
  const formData = new FormData()
  formData.append('type', type)
  formData.append('username', username)
  await axiosFileInstance.post('/api/sender/send', formData)
}

export const getPostByFiltres = async (items: FilterItems) => {
  const formData = new FormData()
  if (items.gender !== undefined) formData.append('gender', items.gender)
  if (items.location !== undefined) formData.append('location', items.location.trim())
  formData.append('minAge', String(items.minAge))
  formData.append('maxAge', String(items.maxAge))
  const data = await axiosFileInstance.post('/api/lovers/get-with-filters', formData)
  return data.data
}

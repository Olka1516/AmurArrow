import type { FavoritePost } from '@/types'
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

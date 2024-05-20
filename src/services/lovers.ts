import type { AddPost, FilterItems } from '@/types'
import http from '../http-common'
import { axiosFileInstance } from '@/axios-file'

export class Lovers {
  getAllLovers = async (username: String) => {
    const data = await http.get('/api/lovers/get-all/' + username)
    return data.data
  }

  addFavoitePostForUser = async (data: AddPost) => {
    const formData = new FormData()
    formData.append('date', data.date)
    return await axiosFileInstance.put('/api/lovers/add/' + data.id, formData)
  }

  sendUserMessage = async (type: string, username: string) => {
    const formData = new FormData()
    formData.append('type', type)
    formData.append('username', username)
    await axiosFileInstance.post('/api/sender/send', formData)
  }

  getPostByFiltres = async (items: FilterItems) => {
    const formData = new FormData()
    if (items.gender !== undefined) formData.append('gender', items.gender)
    if (items.location !== undefined) formData.append('location', items.location.trim())
    formData.append('minAge', String(items.minAge))
    formData.append('maxAge', String(items.maxAge))
    const data = await axiosFileInstance.post('/api/lovers/get-with-filters', formData)
    return data.data
  }
}

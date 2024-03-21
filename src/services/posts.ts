import { axiosFileInstance } from '@/axios-file'
import http from '../http-common'
import type { Post } from '@/types'

export const addUserPost = async (data: Post) => {
    const formData = new FormData()
    formData.append('file', data.image!)
    formData.append('title', data.title)
    formData.append('description', data.description)
    return await axiosFileInstance.post('/api/posts/add', formData)
  }

  export const getUserPostsByUsername = async (username: String) => {
    const data = await http.get('/api/posts/get-all/' + username)
    return data.data
  }
import { axiosFileInstance } from '@/axios-file'
import type { Post } from '@/types'

export const addUserPost = async (data: Post) => {
    const formData = new FormData()
    formData.append('file', data.image!)
    formData.append('title', data.title)
    formData.append('description', data.description)
    return await axiosFileInstance.post('/api/posts/add', formData)
  }
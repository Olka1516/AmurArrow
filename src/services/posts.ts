import { axiosFileInstance } from '@/axios-file'
import type { Post } from '@/types'

export class Posts {
  addUserPost = async (data: Post) => {
    const formData = new FormData()
    formData.append('file', data.image!)
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('date', data.date!.toJSON())
    return await axiosFileInstance.post('/api/posts/add', formData)
  }

  getUserPostsByUsername = async (username: string, type: string) => {
    const formData = new FormData()
    formData.append('type', type)
    const data = await axiosFileInstance.post('/api/posts/get-all/' + username, formData)
    return data.data
  }

  deleteUserPostById = async (id: string) => {
    return await axiosFileInstance.delete('/api/posts/delete/' + id)
  }
}

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

  getUserPostsByUsername = async (username: string) => {
    const data = await axiosFileInstance.get('/api/posts/get-all/' + username)
    return data.data
  }

  getUserFavoritesByUsername = async (username: string) => {
    const data = await axiosFileInstance.get('/api/posts/get-all-favorites/' + username)
    return data.data
  }

  deleteUserPostById = async (id: string) => {
    return await axiosFileInstance.delete('/api/posts/delete/' + id)
  }

  deleteUserFavoritePostById = async (id: string) => {
    return await axiosFileInstance.delete('/api/posts/delete-favorite/' + id)
  }
}

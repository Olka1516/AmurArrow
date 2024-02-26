import type { Media, User } from '@/types'
import http from '../http-common'
import { axiosFileInstance } from '@/axios-file'

export const getUserInfoByUsername = async (username: String) => {
  const data = await http.get('/api/user/info/' + username)
  return data.data
}

export const updateUserInfo = async (user: User, media: Media) => {
  user.media = [
    {
      name: 'instagram',
      link: media.instagram
    },
    {
      name: 'telegram',
      link: media.telegram
    },
    {
      name: 'facebook',
      link: media.facebook
    },
    {
      name: 'pinterest',
      link: media.pinterest
    }
  ]
  return await http.put('/api/user/info/update', user)
}

export const setUserImage = async (image: File, name: string) => {
  const formData = new FormData()
  formData.append('file', image)
  formData.append('name', name)
  return await axiosFileInstance.post('/api/user/image/update', formData)
}

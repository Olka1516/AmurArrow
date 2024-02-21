import type { Media, User } from '@/types'
import http from '../http-common'

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

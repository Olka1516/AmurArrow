import http from '../http-common'

export const getUserInfoByUsername = async (username: String) => {
  const data = await http.get('/api/user/info/' + username)
  return data.data
}

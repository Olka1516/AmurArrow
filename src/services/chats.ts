import http from '../http-common'

export const getAllChatsByUsername = async (username: String) => {
  const data = await http.get('/api/chats/get-all/' + username)
  return data.data
}

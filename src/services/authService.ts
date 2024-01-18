import type { User, UserSignIn } from '@/types'
import http from '../http-common'

export const signUpWithUserDate = async (user: User) => {
  console.log("back", user)
  return await http.post('/api/sign-up', user)
}

export const signInWithUsernameAndPassword = async (user: UserSignIn) => {
  console.log("back", user)
  return await http.post('/api/sign-in', user)
}

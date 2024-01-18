import type { User, UserSignIn } from '@/types'
import http from '../http-common'

export const signUpWithUserDate = async (user: User) => {
  return await http.post('/api/sign-up', user)
}

export const signInWithUsernameAndPassword = async (user: UserSignIn) => {
  return await http.post('/api/sign-in', user)
}

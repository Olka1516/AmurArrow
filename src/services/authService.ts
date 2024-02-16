import type { UserSignUp, UserSignIn } from '@/types'
import http from '../http-common'

export const signUpWithUserDate = async (user: UserSignUp) => {
  return await http.post('/api/sign-up', user)
}

export const signInWithUsernameAndPassword = async (user: UserSignIn) => {
  return await http.post('/api/sign-in', user)
}

export const logOutUser= async () => {
  return await http.post('/api/log-out')
}

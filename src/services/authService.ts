import type { UserSignUp, UserSignIn } from '@/types'
import http from '../http-common'

export class Auth {
  async signUpWithUserDate(user: UserSignUp) {
    return await http.post('/api/sign-up', user)
  }

  async signInWithUsernameAndPassword(user: UserSignIn) {
    return await http.post('/api/sign-in', user)
  }

  async logOutUser() {
    return await http.post('/api/log-out')
  }
}

import { defineStore } from 'pinia'
import { Auth } from '@/services'
import type { UserSignUp, UserSignIn } from '@/types'

export const authStore = defineStore('auth', () => {
  const auth = new Auth()
  const signUp = async (user: UserSignUp) => {
    return await auth.signUpWithUserDate(user)
  }

  const signIn = async (user: UserSignIn) => {
    return await auth.signInWithUsernameAndPassword(user)
  }

  const logOut = async () => {
    return await auth.logOutUser()
  }

  return { signUp, signIn, logOut }
})

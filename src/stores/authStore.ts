import { defineStore } from 'pinia'
import { signUpWithUserDate, signInWithUsernameAndPassword, logOutUser } from '@/services'
import type { UserSignUp, UserSignIn } from '@/types'

export const authStore = defineStore('auth', () => {
  const signUp = async (user: UserSignUp) => {
    return await signUpWithUserDate(user)
  }

  const signIn = async (user: UserSignIn) => {
    return await signInWithUsernameAndPassword(user)
  }

  const logOut = async () => {
    return await logOutUser()
  }

  return { signUp, signIn, logOut }
})

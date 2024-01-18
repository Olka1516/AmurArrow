import { defineStore } from 'pinia'
import { signUpWithUserDate, signInWithUsernameAndPassword } from '@/services'
import type { User, UserSignIn } from '@/types'

export const authStore = defineStore('auth', () => {
  const signUp = async (user: User) => {
    return await signUpWithUserDate(user)
  }

  const signIn = async (user: UserSignIn) => {
    return await signInWithUsernameAndPassword(user)
  }

  return { signUp, signIn }
})

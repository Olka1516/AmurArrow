export interface UserSignIn {
  username: string
  password: string
}

export interface UserSignUp extends UserSignIn {
  email: string
}

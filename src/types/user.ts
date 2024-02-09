export interface UserSignIn {
  username: string
  password: string
}

export interface UserSignUp extends UserSignIn {
  email: string
}

export interface UserInfo {
  username: string
  email: string
  gender: string | null
  firstName: string | null
  lastName: string | null
  description: string | null
  age: number
  location: string | null
  userType: string 
}

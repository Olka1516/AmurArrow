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
  gender: string
  firstName: string
  lastName: string
  description: string
  age?: number
  location: string
  userType: string
  profileImage: string
  blankImage: string
}

export interface User {
  media?: { name: string; link: string }[]
  username: string
  email: string
  gender: string
  firstName: string
  lastName: string
  description: string
  age?: number
  location: string
}

export interface Media {
  instagram: string
  telegram: string
  facebook: string
  pinterest: string
}

export interface Post {
  image: File | null
  title: string
  description: string
}

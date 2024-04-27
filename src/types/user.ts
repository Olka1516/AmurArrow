import type { ReqMedia } from './media'

export interface UserSettings {
  username: string
  email: string
  gender: string
  firstName: string
  lastName: string
  description: string
  age?: number
  location: string
}

export interface UserInfo extends UserSettings {
  userType: string
  profileImage: string
  blankImage: string
}

export interface User extends UserSettings {
  media?: ReqMedia[]
}

export interface Chats {
  username: string
  text: string
  date: Date | string
}

export interface UserChat {
  username: string
  firstName: string
  lastName: string
  image: string
}

export interface Chat {
  room: string
  members: UserChat[]
  chats: Chats[]
  id?: string
}

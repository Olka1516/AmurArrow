export interface Post {
  title: string
  description: string
  image: File | null
  date: Date | null
}

export interface ReqPost {
  type: string
  title: string
  description: string
  image: string
  date: string
  username: string
  id: string
  ownUsername?: string
  gender: string
  location: string
  age: number
}

export interface FavoritePost extends ReqPost {
  dateCreate?: Date
}

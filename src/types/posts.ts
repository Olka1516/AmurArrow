export interface Post {
  title: string
  description: string
  image: File | null
  date: Date | null
}

export interface Likes {
  username: string
  date: string
}

export interface ReqPost {
  id: string
  image: string
  title: string
  description: string
  username: string
  date: string
  gender: string
  location: string
  age: number
  firstName: string
  lastName: string
  avatarImage: string
  likes: Likes[]
}

export interface FavoritePost extends ReqPost {
  dateCreate?: Date
}


export interface AddPost {
  date: string,
  id: string
}
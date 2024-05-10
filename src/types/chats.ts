export interface Chats {
    username: string
    text: string
    date: Date
}

export interface Chat {
    firstName?: string
    lastName?: string
    image?: string
    username: string
    loverUsername: string
    chats: Chats[]
}
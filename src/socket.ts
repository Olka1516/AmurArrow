import { useMessageStore } from '@/stores'
import SockJS from 'sockjs-client/dist/sockjs'
import Stomp from 'stompjs'
import type { Chat, LocalChat } from './types'

const URL = import.meta.env.VITE_BASE_URL + '/ws'

export class Socket {
  private stompClient = Stomp.Client
  private connectionStatus: boolean = false
  private store = useMessageStore()
  private header = {}

  public initSocket(room: string): boolean {
    return this.connect(room)
  }

  private connect(room: string): boolean {
    const socket = new SockJS(URL)
    this.stompClient = Stomp.over(socket)

    this.stompClient.connect(
      this.header,
      () => {
        this.connectionStatus = true
        this.stompClient!.subscribe(
          `/topic/${room}`,
          this.onMessageReceived.bind(this),
          this.header
        )
      },
      (err: any) => {
        console.log('error is=>', err)
      }
    )
    return this.connectionStatus
  }

  public close(): void {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        this.connectionStatus = false
      })
    }
  }

  public send(chat: Chat): void {
    if (this.connectionStatus && this.stompClient) {
      try {
        this.stompClient.send(
          `/app/chat.sendMessage.${chat.room}`,
          this.header,
          JSON.stringify(chat)
        )
      } catch (error) {
        if (chat.room) this.connect(chat.room)
      }
    }
  }

  public enterToChat(chat: Chat): boolean {
    if (this.connectionStatus && this.stompClient) {
      try {
        this.stompClient.send(`/app/public.addUser.${chat.room}`, this.header, JSON.stringify(chat))
      } catch (error) {
        if (chat.room) this.connect(chat.room)
      }
    }
    return this.connectionStatus
  }

  private saveInLocalStorage(room: string): void {
    const chats = JSON.parse(localStorage.getItem('chats') || '[]')
    if (chats.length) {
      const chatIndex = chats.findIndex((chat: LocalChat) => chat.room === room)
      if (chatIndex !== -1) chats[chatIndex].number++
      else chats.push({ room: room, number: 1 })
    } else {
      chats.push({ room: room, number: 1 })
    }
    this.store.localeChats = chats
    localStorage.setItem('chats', JSON.stringify(chats))
  }

  private onMessageReceived(payload: any): void {
    const message = JSON.parse(payload.body)
    const username = localStorage.getItem('username')
    console.log('payload :', message)
    if (username === message.chats.at(-1).username) {
      const chatElement = document.getElementById('chat-content-' + message.room)
      if (chatElement) {
        chatElement.scrollTo({
          behavior: 'smooth',
          top: chatElement.scrollHeight
        })
      }
    }
    const chatIndex = this.store.allMessages.findIndex((chat) => chat.room === message.room)
    if (chatIndex !== -1 && username !== message.chats.at(-1).username) {
      this.saveInLocalStorage(message.room)
      this.store.allMessages[chatIndex].chats.push(message.chats.at(-1))
    }
    this.store.sortAllChats()
  }
}

import { useMessageStore } from '@/stores'
import SockJS from 'sockjs-client/dist/sockjs'
import Stomp from 'stompjs'
import type { Chat } from './types'

const store = useMessageStore()
const URL = import.meta.env.VITE_BASE_URL + '/ws'

const header = {}

let stompCLient = Stomp.client

let connectionStatus = false

export const initSocket = (room: string) => {
  return con(room)
}

export const con = (room: string) => {
  const socket = new SockJS(URL)
  stompCLient = Stomp.over(socket)

  const header = {}

  stompCLient.connect(
    header,
    () => {
      connectionStatus = true
      stompCLient.subscribe(`/topic/${room}`, onMessageRecieved, header)
    },
    (err: any) => {
      console.log('error is=>', err)
    }
  )
  return connectionStatus
}

export const close = () => {
  if (stompCLient) {
    stompCLient.disconnect(() => {
      connectionStatus = false
    })
  }
}

export const send = (chat: Chat) => {
  if (connectionStatus) {
    try {
      stompCLient.send(`/app/chat.sendMessage.${chat.room}`, header, JSON.stringify(chat))
    } catch (error) {
      if (chat.room) con(chat.room)
    }
  }
}

export const enterToChat = (chat: Chat) => {
  if (connectionStatus) {
    try {
      stompCLient.send(`/app/public.addUser.${chat.room}`, header, JSON.stringify(chat))
    } catch (error) {
      if (chat.room) con(chat.room)
    }
  }
  return connectionStatus
}

function onMessageRecieved(payload: any) {
  const message = JSON.parse(payload.body)
  const username = localStorage.getItem('username')
  console.log('payload :', message)
  const chatIndex = store.allMessages.findIndex((chat) => chat.room === message.room)
  if (chatIndex !== -1 && username !== message.chats.at(-1).username) {
    store.allMessages[chatIndex].chats.push(message.chats.at(-1))
  }
}

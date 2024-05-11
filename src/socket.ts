// import SockJS from 'sockjs-client';
import { useMessageStore } from '@/stores'
import { EventBus } from 'quasar'
import SockJS from 'sockjs-client/dist/sockjs'
import Stomp from 'stompjs'
import type { Chat } from './types'

const store = useMessageStore()
const URL = import.meta.env.VITE_BASE_URL + '/ws'

export const bus = new EventBus()

const header = {}

let stompCLient = Stomp.client

let connectionStatus = false

export const initSocket = () => {
  return con()
}

export const con = () => {
  const socket = new SockJS(URL)
  stompCLient = Stomp.over(socket)

  const header = {}

  stompCLient.connect(
    header,
    () => {
      connectionStatus = true
      const test = stompCLient.subscribe('/topic/public', onMessageRecieved, header)
      console.log('test :', test)
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
  const chatMessage = {
    username: chat.username,
    loverUsername: chat.loverUsername,
    firstName: chat.firstName,
    lastName: chat.lastName,
    image: chat.image,
    chats: chat.chats,
    type: 'CHAT'
  }
  if (connectionStatus) {
    console.log('here')
    try {
      stompCLient.send('/app/public.sendMessage', header, JSON.stringify(chatMessage))
    } catch (error) {
      con()
    }
  }
}

export const enterToChat = (username: string) => {
  if (connectionStatus) {
    try {
      stompCLient.send(
        '/app/public.addUser',
        header,
        JSON.stringify({ sender: username, type: 'JOIN' })
      )
    } catch (error) {
      con()
    }
  }
  return connectionStatus
}

function onMessageRecieved(payload: any) {
  const message = JSON.parse(payload.body)
  const sender = message.username
  const content = message.content
  store.username = sender
  store.addToContent(content)
  bus.emit('scroll')
}

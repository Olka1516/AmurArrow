// import SockJS from 'sockjs-client';
import Stomp from 'stompjs'
import SockJS from 'sockjs-client/dist/sockjs'
import { useMessageStore } from '@/stores'
import { EventBus } from 'quasar'

const store = useMessageStore()
const URL = process.env.VITE_BASE_URL + '/ws'

export const bus = new EventBus()

const header = {}

let stompCLient: Stomp.client

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
      stompCLient.subscribe('/topic/chat', onMessageRecieved, header)
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

export const send = (username: string, message: string) => {
  const chatMessage = {
    sender: username,
    content: message,
    type: 'CHAT'
  }
  if (connectionStatus) {
    try {
      stompCLient.send('/app/chat.sendMessage', header, JSON.stringify(chatMessage))
    } catch (error) {
      con()
    }
  }
}

export const enterToChat = (username: string) => {
  if (connectionStatus) {
    try {
      stompCLient.send(
        '/app/chat.addUser',
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

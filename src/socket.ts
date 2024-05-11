// export default class WebSocketHelper {
//   private static ws: WebSocket | null = null

//   public static connect(): void {
//     this.ws = new WebSocket('ws://localhost:8080/api/chat')

//     this.ws.onopen = () => {
//       console.log('WebSocket connection opened.')
//     }

//     this.ws.onerror = (error) => {
//       console.error('WebSocket error:', error)
//     }
//   }

//   public static disconnect(): void {
//     if (this.ws) {
//       this.ws.close()
//       console.log('WebSocket connection closed.')
//     }
//   }

//   public static sendMessage(msg: any): void {
//     if (this.ws && this.ws.readyState === WebSocket.OPEN) {
//       this.ws.send(JSON.stringify(msg))
//     } else {
//       console.error('WebSocket connection is not open.')
//     }
//   }
// }

// import SockJS from 'sockjs-client'
// import Stomp from 'stompjs'

// interface Tick {
//   status: string
//   // Додайте інші поля за потреби
// }

// export default class WebSocket {
//   private static stompClient: any | null = null
//   private static socket: any | null = null
//   private static isConnection: boolean = false

//   private static readonly WS_REGISTER_ENDPOINT: string = 'ws://localhost:8080/api/chat'

//   private static readonly WS_CONNECTION_WAIT_TIME: number = 3000
//   private static readonly SUBSCRIBE: string = '/topic/greetings'
//   private static readonly SUCCESS: string = 'success'
//   private static readonly ERROR: string = 'error'

//   private static async promiseTimeout(ms: number): Promise<void> {
//     return new Promise<void>((resolve) => setTimeout(resolve, ms))
//   }

//   public static async getStompClient(): Promise<any> {
//     if (WebSocket.stompClient && WebSocket.stompClient.connected) {
//       console.log('WebSocket connection is successful.')
//       return WebSocket.stompClient
//     } else {
//       await WebSocket.promiseTimeout(WebSocket.WS_CONNECTION_WAIT_TIME)
//       return await this.getStompClient()
//     }
//   }

//   public static connect(
//     callback: (data: { sessionId: string | null; status: string; message: string }) => void
//   ): void {
//     WebSocket.isConnection = false
//     WebSocket.socket = new SockJS(WebSocket.WS_REGISTER_ENDPOINT)
//     WebSocket.stompClient = Stomp.over(WebSocket.socket)
//     WebSocket.stompClient.debug = () => {}
//     WebSocket.stompClient.connect(
//       {},
//       (frame: any) => {
//         console.log('WebSocket Connection frame :: ')
//         console.log(frame)
//       },
//       (error: any) => {
//         console.log('WebSocket Connection error :: ')
//         console.log(error)
//         callback({
//           sessionId: null,
//           status: 'CONNECTION_ERROR',
//           message: 'WebSocket connection error!!'
//         })
//       }
//     )
//   }

//   public static disconnect(): void {
//     if (WebSocket.stompClient) {
//       WebSocket.stompClient.disconnect(() => {
//         console.log('WebSocket connection is closed successfully.')
//       })
//     }
//   }

//   public static async subscribe(callback: (data: Tick) => void): Promise<void> {
//     this.connect(callback)
//     const websocketStompClient = await this.getStompClient()
//     websocketStompClient.subscribe(WebSocket.SUBSCRIBE, (tick: any) => {
//       if (!tick || !tick.body) {
//         this.disconnect()
//       } else {
//         const tickBody: Tick = JSON.parse(tick.body)
//         if (tickBody.status === WebSocket.SUCCESS || tickBody.status === WebSocket.ERROR) {
//           this.disconnect()
//         }
//         callback(tickBody)
//       }
//     })
//   }

//   public static async sendMessage(msg: any): Promise<void> {
//     if (WebSocket.stompClient) {
//       WebSocket.stompClient.send('/app/subscribe', JSON.stringify(msg), {})
//     }
//   }
// }

// import SockJS from 'sockjs-client';
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
  console.log('payload :', payload)
  const message = JSON.parse(payload.body)
  const sender = message.username
  const content = message.content
  store.username = sender
  store.addToContent(content)
  bus.emit('scroll')
}

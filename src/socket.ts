import { useMessageStore } from '@/stores';
import SockJS from 'sockjs-client/dist/sockjs';
import Stomp from 'stompjs';
import type { Chat } from './types';

const URL = import.meta.env.VITE_BASE_URL + '/ws';

export class Socket {
  private stompClient = Stomp.Client;
  private connectionStatus: boolean = false;
  private store = useMessageStore();
  private header = {};

  public initSocket(room: string): boolean {
    return this.connect(room);
  }

  private connect(room: string): boolean {
    const socket = new SockJS(URL);
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect(
      this.header,
      () => {
        this.connectionStatus = true;
        this.stompClient!.subscribe(`/topic/${room}`, this.onMessageReceived.bind(this), this.header);
      },
      (err: any) => {
        console.log('error is=>', err);
      }
    );
    return this.connectionStatus;
  }

  public close(): void {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        this.connectionStatus = false;
      });
    }
  }

  public send(chat: Chat): void {
    if (this.connectionStatus && this.stompClient) {
      try {
        this.stompClient.send(`/app/chat.sendMessage.${chat.room}`, this.header, JSON.stringify(chat));
      } catch (error) {
        if (chat.room) this.connect(chat.room);
      }
    }
  }

  public enterToChat(chat: Chat): boolean {
    if (this.connectionStatus && this.stompClient) {
      try {
        this.stompClient.send(`/app/public.addUser.${chat.room}`, this.header, JSON.stringify(chat));
      } catch (error) {
        if (chat.room) this.connect(chat.room);
      }
    }
    return this.connectionStatus;
  }

  private onMessageReceived(payload: any): void {
    const message = JSON.parse(payload.body);
    const username = localStorage.getItem('username');
    console.log('payload :', message);
    const chatIndex = this.store.allMessages.findIndex((chat) => chat.room === message.room);
    if (chatIndex !== -1 && username !== message.chats.at(-1).username) {
      this.store.allMessages[chatIndex].chats.push(message.chats.at(-1));
    }
  }
}
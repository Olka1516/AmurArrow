import { getAllChatsByUsername } from '@/services'
import type { Chat } from '@/types'
import { defineStore } from 'pinia'
import { reactive, ref, toRefs, type Ref } from 'vue'

export const useMessageStore = defineStore('info', () => {
  const state: Chat = reactive({
    username: '',
    loverUsername: '',
    firstName: '',
    lastName: '',
    image: '',
    chats: []
  })

  const allMessages: Ref<Chat[]> = ref([
    // {
    //   username: 'olka',
    //   loverUsername: 'Nina',
    //   chats: [
    //     { text: 'lala', date: new Date('05 09 2024 00:00:00 GMT'), username: 'olka' },
    //     { text: 'Hello', date: new Date('05 09 2024 12:00:00 GMT'), username: 'Nina' },
    //     { text: 'Hello', date: new Date('05 10 2024 00:00:00 GMT'), username: 'olka' },
    //     { text: 'Hello', date: new Date('05 10 2024 03:00:00 GMT'), username: 'Nina' }
    //   ]
    // },
    // {
    //   username: 'olka',
    //   loverUsername: 'Oleksa',
    //   chats: [{ text: 'lyly', date: new Date(), username: 'oleksa' }]
    // }
  ])

  const addToContent = (message: string) => {
    state.chats.push({ text: message, username: state.username, date: new Date() })
    allMessages.value = [state, ...allMessages.value]
  }

  const setActive = (chat: Chat) => {
    allMessages.value = [chat, ...allMessages.value]
    state.username = chat.username
    state.lastName = chat.lastName
    state.firstName = chat.firstName
    state.loverUsername = chat.loverUsername
    state.image = chat.image

    //Запит
    state.chats = chat.chats
  }

  const getAllChats = async () => {
    const username = localStorage.getItem('username')
    allMessages.value = await getAllChatsByUsername(username!)
  }

  return { ...toRefs(state), addToContent, allMessages, setActive, getAllChats }
})

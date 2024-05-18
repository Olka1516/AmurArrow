import { Chats } from '@/services'
import type { Chat } from '@/types'
import { defineStore } from 'pinia'
import { reactive, ref, toRefs, type Ref } from 'vue'

export const useMessageStore = defineStore('chats', () => {
  const classChats = new Chats;
  const state: Chat = reactive({
    id: '',
    room: '',
    members: [],
    chats: []
  })

  const allMessages: Ref<Chat[]> = ref([])

  const addToContent = (message: string) => {
    const username = localStorage.getItem('username')
    state.chats.push({ text: message, username: username!, date: new Date().toJSON() })
  }

  const setStateDefault = () => {
    ;(state.id = ''), (state.room = ''), (state.members = []), (state.chats = [])
  }

  const setState = (chat: Chat) => {
    state.room = chat.room
    state.id = chat.id
    state.members = chat.members
    state.chats = chat.chats
  }

  const setActive = async (chat: Chat) => {
    allMessages.value = [chat, ...allMessages.value]
    state.room = chat.room
    state.id = chat.id
    state.members = chat.members

    await getAllChats()
    const chatIndex = allMessages.value.findIndex((item) => item.room === chat.room)
    if (chatIndex !== -1) state.chats = allMessages.value[chatIndex].chats
    else state.chats = chat.chats
    console.log(state.chats)
  }

  const getAllChats = async () => {
    const username = localStorage.getItem('username')
    const chats = await classChats.getAllChatsByUsername(username!)
    allMessages.value = chats
  }

  return {
    ...toRefs(state),
    addToContent,
    allMessages,
    setActive,
    getAllChats,
    setState,
    setStateDefault
  }
})

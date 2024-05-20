import { Chats } from '@/services'
import type { Chat, LocalChat } from '@/types'
import { defineStore } from 'pinia'
import { reactive, ref, toRefs, type Ref } from 'vue'

export const useMessageStore = defineStore('chats', () => {
  const classChats = new Chats()
  const state: Chat = reactive({
    id: '',
    room: '',
    members: [],
    chats: []
  })

  const allMessages: Ref<Chat[]> = ref([])
  const localeChats: Ref<LocalChat[]> = ref([])

  const addToContent = (message: string) => {
    const username = localStorage.getItem('username')
    state.chats.push({ text: message, username: username!, date: new Date().toJSON() })
  }

  const setStateDefault = () => {
    state.id = ''
    state.room = ''
    state.members = []
    state.chats = []
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
  }

  const getAllChats = async () => {
    const username = localStorage.getItem('username')
    const chats = await classChats.getAllChatsByUsername(username!)
    if (state.room) allMessages.value = [state, ...chats]
    else allMessages.value = chats
  }

  const sortAllChats = () => {
    const allMessagesSorted: Chat[] = allMessages.value
    allMessagesSorted.sort((a: Chat, b: Chat) => {
      const dateA = new Date(a.chats[a.chats.length - 1].date)
      const dateB = new Date(b.chats[b.chats.length - 1].date)

      return dateB.getTime() - dateA.getTime()
    })
    allMessages.value = allMessagesSorted
  }

  const setToZero = (room: string) => {
    const chats = JSON.parse(localStorage.getItem('chats') || '[]')
    if (chats.length) {
      const chatIndex = chats.findIndex((chatInner: LocalChat) => chatInner.room === room)
      if (chatIndex !== -1) chats[chatIndex].number = 0
    }
    localeChats.value = chats
    localStorage.setItem('chats', JSON.stringify(chats))
    return chats
  }

  return {
    ...toRefs(state),
    addToContent,
    localeChats,
    allMessages,
    setToZero,
    setActive,
    getAllChats,
    setState,
    sortAllChats,
    setStateDefault
  }
})

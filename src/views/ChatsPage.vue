<script setup lang="ts">
import Loading from '@/components/general/LoadingPage.vue'
import Button from '@/components/general/ComponentButton.vue'
import ComponentChat from '@/components/profile/ComponentChat.vue'
import ComponentChatItem from '@/components/profile/ComponentChatItem.vue'
import router from '@/router'
import { Socket } from '@/socket'
import { useLoaderState, useMessageStore } from '@/stores'
import type { Chat, LocalChat } from '@/types'
import { onMounted, reactive, ref, watch, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'

const loadStore = useLoaderState()
const { t } = useI18n()
const socket = new Socket()
const storeMessage = useMessageStore()
const chatsLocale: Ref<LocalChat[] | []> = ref([])
const allChats: Ref<Chat[]> = ref([])
const selectedChat: Chat = reactive({
  id: '',
  room: '',
  members: [],
  chats: []
})

const closeChat = () => {
  selectedChat.chats = []
  selectedChat.id = ''
  selectedChat.members = []
  selectedChat.room = ''
  storeMessage.setStateDefault()
}

const back = async (name: string) => {
  socket.close()
  await router.push(name)
  closeChat()
}

const chooseChat = (chat: Chat) => {
  selectedChat.chats = chat.chats
  selectedChat.id = chat.id
  selectedChat.members = chat.members
  selectedChat.room = chat.room
  storeMessage.setState(chat)
  chatsLocale.value = storeMessage.setToZero(chat.room)
  allChats.value = storeMessage.allMessages
}

const isActive = (username: string) => {
  if (!selectedChat.room) return false
  const roomArray = selectedChat.room.split('_')
  return roomArray.includes(username)
}

const sendMessage = (message: string) => {
  if (!message) return
  storeMessage.addToContent(message)
  socket.send(selectedChat)
}

const getOwn = () => {
  const username = localStorage.getItem('username')
  return username
}

const getLover = (memberOne: string, memberTwo: string) => {
  const username = getOwn()
  return username === memberOne ? memberTwo : memberOne
}

const getNumber = (room: string) => {
  if (selectedChat.room === room) {
    storeMessage.setToZero(room)
    return 0
  }
  chatsLocale.value = storeMessage.localeChats
  const chatIndex = chatsLocale.value.findIndex((chat: LocalChat) => chat.room === room)
  return chatIndex !== -1 && chatsLocale.value.length ? chatsLocale.value[chatIndex].number : 0
}

watch(
  () => storeMessage.allMessages[0]?.room,
  () => {
    allChats.value = storeMessage.allMessages
  }
)

onMounted(async () => {
  chatsLocale.value = JSON.parse(window.localStorage.getItem('chats') || '[]')
  storeMessage.localeChats = chatsLocale.value
  if(!storeMessage.room) await storeMessage.getAllChats()

  for (let i = 0; i < storeMessage.allMessages.length; i++) {
    socket.initSocket(storeMessage.allMessages[i].room)
  }
  if (storeMessage.room) {
    selectedChat.chats = storeMessage.chats
    selectedChat.id = storeMessage.id
    selectedChat.members = storeMessage.members
    selectedChat.room = storeMessage.room
  }
  allChats.value = storeMessage.allMessages
  loadStore.changeStateTrue();
})
</script>

<template>
  <Loading v-if="!loadStore.loading" />
  <div class="chats">
    <div class="chats-container">
      <div class="chat-links">
        <Button icon="logo" class="no-background-no-contour-button logo" @click="back('/')" />
        <Button
          icon="arrow"
          :text="t('profile')"
          class="no-background-no-contour-button"
          @click="back(`/user-profile/${getOwn()}`)"
        />
      </div>
      <div v-if="allChats.length">
        <div v-for="k_chat in storeMessage.allMessages" :key="k_chat.id">
          <ComponentChatItem
            :number="getNumber(k_chat.room)"
            :username="getLover(k_chat.members[0].username, k_chat.members[1].username)"
            :text="k_chat.chats[k_chat.chats.length - 1]?.text"
            @click="chooseChat(k_chat)"
            :isActive="isActive(getLover(k_chat.members[0].username, k_chat.members[1].username))"
          />
        </div>
      </div>
      <div v-else class="not-chats">
        <h1>
          {{ t('notChats') }}
        </h1>
      </div>
    </div>
    <div class="chat-container" :class="{ isSelected: !selectedChat.room }">
      <div v-if="!selectedChat.room" class="not-selected-chat">
        <h1>
          {{ t('selectChat') }}
        </h1>
      </div>
      <div v-else class="chat-component">
        <ComponentChat
          :chat="selectedChat"
          @closeChat="closeChat"
          @sendMessage="(val) => sendMessage(val)"
          @backToProfile="(val) => back(val)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.chats-page;
</style>

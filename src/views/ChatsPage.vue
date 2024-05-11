<script setup lang="ts">
import Button from '@/components/general/ComponentButton.vue'
import ComponentChat from '@/components/profile/ComponentChat.vue'
import ComponentChatItem from '@/components/profile/ComponentChatItem.vue'
import router from '@/router'
import { initSocket, send } from '@/socket'
import { useMessageStore, userStore } from '@/stores'
import type { Chat } from '@/types'
import { useQuasar } from 'quasar'
import { onMounted, ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const storeMessage = useMessageStore()
const $q = useQuasar()

const store = userStore()
const chats: Ref<Chat[]> = ref([])
const selectedChat: Ref<Chat | undefined> = ref(undefined)

const back = async (name: string) => {
  await router.push('/' + name)
}

const chooseChat = (chat: Chat) => {
  if (selectedChat.value !== chat) {
    selectedChat.value = chat
  }
}

const isActive = (username: string) => {
  return selectedChat.value?.loverUsername === username
}

const closeChat = () => {
  selectedChat.value = undefined
}

const sendMessage = (message: string) => {
  // if (message.value === placeholder || message.value === '') {
  //   $q.notify({
  //     message: 'Write something!',
  //     color: 'negative',
  //   });
  //   return;
  // }
  storeMessage.addToContent(message)
  selectedChat.value = storeMessage.allMessages[0]
  console.log(storeMessage.allMessages)
  send(selectedChat.value!)
}

onMounted(() => {
  initSocket()
  console.log('initSocket :')
  storeMessage.getAllChats()
  if (storeMessage.username) {
    selectedChat.value = storeMessage.allMessages[0]
  }
  chats.value = storeMessage.allMessages
})
</script>

<template>
  <div class="chats">
    <div class="chats-container">
      <div class="chat-links">
        <Button icon="logo" class="no-background-no-contour-button logo" @click="back('')" />
        <Button
          icon="arrow"
          :text="t('profile')"
          class="no-background-no-contour-button"
          @click="back(`user-profile/${store.username}`)"
        />
      </div>
      <div v-if="chats.length">
        <div v-for="k_chat in chats" :key="k_chat.loverUsername">
          <ComponentChatItem
            :username="k_chat.loverUsername"
            :text="k_chat.chats[k_chat.chats.length - 1]?.text"
            @click="chooseChat(k_chat)"
            :isActive="isActive(k_chat.loverUsername)"
          />
        </div>
      </div>
      <div v-else class="not-chats">
        <h1>
          {{ t('notChats') }}
        </h1>
      </div>
    </div>
    <div class="chat-container" :class="{ isSelected: !selectedChat }">
      <div v-if="!selectedChat" class="not-selected-chat">
        <h1>
          {{ t('selectChat') }}
        </h1>
      </div>
      <div v-else class="chat-component">
        <ComponentChat
          :chat="selectedChat"
          @closeChat="closeChat"
          @sendMessage="(val) => sendMessage(val)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.chats-page;
</style>

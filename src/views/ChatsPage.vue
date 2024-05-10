<script setup lang="ts">
import ComponentChatItem from '@/components/profile/ComponentChatItem.vue'
import ComponentChat from '@/components/profile/ComponentChat.vue'
import Button from '@/components/general/ComponentButton.vue'
import type { Chat } from '@/types'
import { ref, type Ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import router from '@/router'
import { userStore } from '@/stores'
import { send } from '@/socket';
import { useMessageStore } from '@/stores';
import { useQuasar } from 'quasar';
import { bus } from '@/socket';

const storeMessage = useMessageStore();
const $q = useQuasar();

const store = userStore()
const { t } = useI18n()
const chats: Ref<Chat[]> = ref([
  {
    username: 'olka',
    loverUsername: 'Nina',
    chats: [
      { text: 'lala', date: new Date('05 09 2024 00:00:00 GMT'), username: 'olka' },
      { text: 'Hello', date: new Date('05 09 2024 12:00:00 GMT'), username: 'Nina' },
      { text: 'Hello', date: new Date('05 10 2024 00:00:00 GMT'), username: 'olka' },
      { text: 'Hello', date: new Date('05 10 2024 03:00:00 GMT'), username: 'Nina' }
    ]
  },
  {
    username: 'olka',
    loverUsername: 'Oleksa',
    chats: [{ text: 'lyly', date: new Date(), username: 'oleksa' }]
  }
])
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
  send(store.username, message);
}
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
      <div v-for="k_chat in chats" :key="k_chat.loverUsername">
        <ComponentChatItem
          :username="k_chat.loverUsername"
          :text="k_chat.chats[k_chat.chats.length - 1].text"
          @click="chooseChat(k_chat)"
          :isActive="isActive(k_chat.loverUsername)"
        />
      </div>
    </div>
    <div class="chat-container" :class="{ isSelected: !selectedChat }">
      <div v-if="!selectedChat" class="not-selected-chat">
        <h1>
          {{ t('selectChat') }}
        </h1>
      </div>
      <div v-else class="chat-component">
        <ComponentChat :chat="selectedChat" @closeChat="closeChat" @sendMessage='(val) => sendMessage(val)' />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.chats-page;
</style>

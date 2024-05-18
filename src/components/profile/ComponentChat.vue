<script setup lang="ts">
import Button from '../general/ComponentButton.vue'
import router from '@/router'
import type { Chat } from '@/types'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Socket } from '@/socket'

const { locale, t } = useI18n()
const socket = new Socket()
const props = defineProps<{ chat: Chat }>()
const emit = defineEmits<{ (e: 'closeChat'): void; (e: 'sendMessage', val: string): void }>()
const tempDate = ref(props.chat.chats[0]?.date)
const message = ref('')
const options: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  month: 'long',
  day: 'numeric'
}

const getName = () => {
  const username = localStorage.getItem('username')
  const tempUser =
    username === props.chat.members[0].username ? props.chat.members[1] : props.chat.members[0]
  return tempUser.firstName && tempUser.lastName
    ? tempUser.firstName.charAt(0) + tempUser.lastName.charAt(0)
    : tempUser.username.charAt(0)
}

const back = async (name: string) => {
  socket.close()
  await router.push('/' + name)
}

const closeChat = () => {
  emit('closeChat')
}

const sendMessage = () => {
  emit('sendMessage', message.value)
  message.value = ''
}

const getLover = (memberOne: string, memberTwo: string) => {
  const username = localStorage.getItem('username')
  return username === memberOne ? memberTwo : memberOne
}

const getImage = (memberOne: string) => {
  const username = localStorage.getItem('username')
  return username === memberOne ? props.chat.members[1].image : props.chat.members[0].image
}

watch(
  () => props.chat.chats[0],
  () => {
    if (props.chat.chats[0].date) tempDate.value = props.chat.chats[0].date
  }
)
</script>

<template>
  <div class="chat">
    <div class="chat-header">
      <div class="chat-header-inner">
        <img
          @click="
            back(
              `user-profile/${getLover(
                props.chat.members[0].username,
                props.chat.members[1].username
              )}`
            )
          "
          v-if="getImage(props.chat.members[0].username)"
          :src="getImage(props.chat.members[0].username)"
          class="avatar"
        />
        <h1
          v-else
          class="avatar"
          @click="
            back(
              `user-profile/${getLover(
                props.chat.members[0].username,
                props.chat.members[1].username
              )}`
            )
          "
        >
          {{ getName() }}
        </h1>
        <h2
          @click="
            back(
              `user-profile/${getLover(
                props.chat.members[0].username,
                props.chat.members[1].username
              )}`
            )
          "
          class="chat-username"
        >
          {{ getLover(props.chat.members[0].username, props.chat.members[1].username) }}
        </h2>
      </div>
      <Button icon="back_pink" class="rounded" @click="closeChat()" />
    </div>
    <div v-if="chat.chats.length" class="chat-content">
      <div
        class="chat-content-inner"
        v-for="k_chat in props.chat.chats"
        :key="k_chat.date.toString()"
      >
        <div class="chat-texts">
          <p
            :class="{
              chatOwner:
                getLover(props.chat.members[0].username, props.chat.members[1].username) !==
                k_chat.username,
              chatLover:
                getLover(props.chat.members[0].username, props.chat.members[1].username) ===
                k_chat.username
            }"
          >
            {{ k_chat.text }}
          </p>
          <h3
            :class="{
              dateOwner:
                getLover(props.chat.members[0].username, props.chat.members[1].username) !==
                k_chat.username,
              dateLover:
                getLover(props.chat.members[0].username, props.chat.members[1].username) ===
                k_chat.username
            }"
          >
            <!-- {{ new Date(k_chat.date).toLocaleString(locale, { timeZone: 'UTC' }) }} -->
            {{ new Date(k_chat.date).toLocaleDateString('uk-ua', options) }}
          </h3>
        </div>
      </div>
    </div>
    <div v-else class="chat-empty">
      <h1>
        {{ t('none') }}
      </h1>
    </div>

    <div class="chat-input">
      <input placeholder="Messages..." text="text" v-model="message" />
      <Button
        icon="paper-plane"
        class="no-background-no-contour-button rounded"
        @click="sendMessage()"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.chat-component;
</style>

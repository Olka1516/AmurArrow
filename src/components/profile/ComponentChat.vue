<script setup lang="ts">
import Button from '../general/ComponentButton.vue'
import type { Chat } from '@/types'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()
const props = defineProps<{ chat: Chat }>()
const emit = defineEmits<{ (e: 'closeChat'): void; (e: 'sendMessage', val: string): void; (e: 'backToProfile', val: string): void; }>()
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
  emit('backToProfile', '/' + name)
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

const getId = () => {
  return 'chat-content-' + props.chat.room
}

const getLocal = () => {
  return locale.value === 'ua' ? 'uk-ua' : locale.value
}

watch(
  () => props.chat.room,
  () => {
    setTimeout(() => {
      const chatElement = document.getElementById(getId())
      if (chatElement) chatElement.scrollTop = chatElement.scrollHeight
    }, 0.1)
  }
)

onMounted(() => {
  let chatElement = document.getElementById(getId())
  if (chatElement) chatElement.scrollTop = chatElement.scrollHeight
})
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
    <div v-if="chat.chats.length" :id="getId()" class="chat-content">
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
            {{ new Date(k_chat.date).toLocaleDateString(getLocal(), options) }}
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

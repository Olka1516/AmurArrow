<script setup lang="ts">
import Button from '../general/ComponentButton.vue'
import router from '@/router'
import type { Chat } from '@/types'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { close } from '@/socket'

const { locale, t } = useI18n()
const props = defineProps<{ chat: Chat }>()
const emit = defineEmits<{ (e: 'closeChat'): void; (e: 'sendMessage', val: string): void }>()
const tempDate = ref(props.chat.chats[0]?.date)
const message = ref('')

const getName = () => {
  const username = localStorage.getItem('username')
  const tempUser =
    username === props.chat.members[0].username ? props.chat.members[1] : props.chat.members[0]
  return tempUser.firstName && tempUser.lastName
    ? tempUser.firstName.charAt(0) + tempUser.lastName.charAt(0)
    : tempUser.username.charAt(0)
}

const back = async (name: string) => {
  close()
  await router.push('/' + name)
}

const isOneDay = (nowDate: string) => {
  if (tempDate.value === nowDate) return false
  const nowYear = new Date(nowDate).getFullYear()
  const nowMonth = new Date(nowDate).getMonth()
  const nowDay = new Date(nowDate).getDate()

  const isEqual =
    nowYear === new Date(tempDate.value).getFullYear() &&
    nowMonth === new Date(tempDate.value).getMonth() &&
    nowDay === new Date(tempDate.value).getDate()

  tempDate.value = isEqual ? tempDate.value : nowDate

  return isEqual
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
onMounted(() => {
  let chatElement = document.getElementById('chat-content')
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
    <div v-if="chat.chats.length" id="chat-content" class="chat-content">
      <div
        class="chat-content-inner"
        v-for="k_chat in props.chat.chats"
        :key="k_chat.date.toString()"
      >
        <h3 v-if="!isOneDay(k_chat.date.toString())">
          {{ new Date(k_chat.date).toLocaleString(locale, { timeZone: 'UTC' }) }}
        </h3>
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

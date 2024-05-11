<script setup lang="ts">
import router from '@/router'
import type { Chat } from '@/types'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from '../general/ComponentButton.vue'

const { locale, t } = useI18n()
const props = defineProps<{ chat: Chat }>()
const emit = defineEmits<{ (e: 'closeChat'): void; (e: 'sendMessage', val: string): void }>()
const tempDate = ref(props.chat.chats[0]?.date)
const message = ref('')

const getName = () => {
  return props.chat.firstName && props.chat.lastName
    ? props.chat.firstName.charAt(0) + props.chat.lastName.charAt(0)
    : props.chat.username.charAt(0)
}

const back = async (name: string) => {
  await router.push('/' + name)
}

const isOneDay = (nowDate: Date) => {
  if (tempDate.value === nowDate) return false
  const nowYear = nowDate.getFullYear()
  const nowMonth = nowDate.getMonth()
  const nowDay = nowDate.getDate()

  const isEqual =
    nowYear === tempDate.value.getFullYear() &&
    nowMonth === tempDate.value.getMonth() &&
    nowDay === tempDate.value.getDate()

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
          @click="back(`user-profile/${props.chat.loverUsername}`)"
          v-if="props.chat.image"
          :src="props.chat.image"
          class="avatar"
        />
        <h1 v-else class="avatar" @click="back(`user-profile/${props.chat.loverUsername}`)">
          {{ getName() }}
        </h1>
        <h2 @click="back(`user-profile/${props.chat.loverUsername}`)" class="chat-username">
          {{ props.chat.loverUsername }}
        </h2>
      </div>
      <Button icon="back_pink" class="rounded" @click="closeChat()" />
    </div>
    <div v-if="chat.chats.length" class="chat-content">
      <div
        class="chat-content-inner"
        v-for="k_chat in props.chat.chats"
        :key="k_chat.date.toString"
      >
        <h3 v-if="!isOneDay(k_chat.date)">
          {{ k_chat.date.toLocaleString(locale, { timeZone: 'UTC' }) }}
        </h3>
        <div class="chat-texts">
          <p
            :class="{
              chatOwner: props.chat.username === k_chat.username,
              chatLover: props.chat.username !== k_chat.username
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
        @click="sendMessage"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.chat-component;
</style>

<script setup lang="ts">
import Avatar from '@/components/general/AvatarComponent.vue'
import Button from '@/components/general/ComponentButton.vue'
import Item from '@/components/profile/ComponentItem.vue'
import ContentPhotos from '@/components/profile/ComponentPhotos.vue'
import router from '@/router'
import { useLoaderState, useMessageStore, userStore } from '@/stores'
import type { Chat } from '@/types'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const loadStore = useLoaderState()
const { t } = useI18n()
const route = useRoute()
const store = userStore()
const storeMessage = useMessageStore()
const content = ref('posts')

const changeContent = (name: string) => {
  content.value = name
}

const getGender = () => {
  return store.gender == 'Male' ? 'male' : 'female'
}

const getContent = (item: string) => {
  return content.value === item
}

const getName = () => {
  return store.firstName
    ? store.firstName.charAt(0) + store.lastName!.charAt(0)
    : store.username.charAt(0)
}

const getText = (text1: string, text2: string) => {
  return store.userType === 'OWNER' ? text1 : text2
}

const routeToSettings = async () => {
  await router.push('/user-settings/' + store.username)
  loadStore.changeStateTrue()
}

const getImage = (url: string) => {
  if (!url) {
    const st = new URL(`../../assets/pictures/blank.jpg`, import.meta.url)
    return st.pathname
  }
  const st = new URL(url)
  return st.href
}

const generateRoomName = (user1: string, user2: string) => {
  const sortedUsernames = [user1, user2].sort()
  return `room_${sortedUsernames.join('_')}`
}

const writeMessage = async () => {
  const username = localStorage.getItem('username')
  const image = localStorage.getItem('image') || ''
  const firstName = localStorage.getItem('firstName') || ''
  const lastName = localStorage.getItem('lastName') || ''
  const room = generateRoomName(username!, store.username)
  const chat: Chat = {
    room: room,
    members: [
      {
        username: username!,
        image: image,
        firstName: firstName,
        lastName: lastName
      },
      {
        username: store.username,
        image: store.profileImage,
        firstName: store.firstName,
        lastName: store.lastName
      }
    ],
    chats: []
  }
  await storeMessage.setActive(chat)
  await router.push('/chats/' + username)
}

watch(
  () => route.params.username,
  () => {
    loadStore.changeStateTrue()
    content.value = 'posts'
  }
)
</script>
<template>
  <div class="profile">
    <div class="container">
      <div class="profile-contents">
        <img class="profile-content-img" :src="getImage(store.blankImage)" alt="" />
        <Button
          v-if="store.userType === 'OWNER'"
          class="fill-pink-button settings"
          icon="settings"
          @click="routeToSettings"
        />

        <Avatar
          :type="store.userType"
          :name="getName()"
          class="profile-avatar"
          @click="routeToSettings"
          :url="store.profileImage"
        />
        <div class="profile-content">
          <h1>{{ store.username }}</h1>
          <div class="profile-content-wrapper">
            <div class="profile-content-inner info">
              <Item
                v-if="store.location"
                name="location"
                :text="`${t(store.location.split(' ')[0])} ${t(store.location.split(' ')[1])}`"
              />
              <Item v-if="store.email" name="email" :text="store.email" />
            </div>
            <Button
              v-if="store.userType !== 'OWNER'"
              class="contour-no-background-button"
              :text="t('write')"
              @click="writeMessage()"
            />
          </div>
        </div>
      </div>
      <div class="profile-about">
        <div class="profile-about-info">
          <div class="profile-info-inner">
            <h1>{{ t('about') }}</h1>
            <div v-if="store.gender || store.age || store.description" class="content">
              <div class="profile-content-inner">
                <Item v-if="store.gender" :name="getGender()" :text="t(store.gender)" />
                <Item v-if="store.age" name="person" :text="t('years', store.age)" />
              </div>
              <p>{{ store.description }}</p>
              <nav class="profile-content-inner links" v-if="store.media.length">
                <div v-for="item in store.media" :key="item.name" :class="{ isExist: !item.link }">
                  <a :href="item.link" class="profile-content-item link">
                    <Item :name="item.name" :text="item.link" additionalImage="copy" />
                  </a>
                </div>
              </nav>
            </div>
            <div v-else class="profile-no-content">
              <h1>{{ getText(t('OwnerAbout'), t('UserAbout')) }}</h1>
            </div>
          </div>
        </div>
        <div class="profile-about-photos">
          <div class="profile-about-buttons" v-if="store.userType == 'OWNER'">
            <Button
              class="contour-no-background-button"
              icon="grid"
              @click="changeContent('posts')"
              :text="t('posts')"
              :class="{ isActive: getContent('posts') }"
            />
            <Button
              class="contour-no-background-button"
              icon="favourite"
              @click="changeContent('favourite')"
              :text="t('favorite')"
              :class="{ isActive: getContent('favourite') }"
            />
          </div>
          <ContentPhotos
            v-if="getContent('posts')"
            :posts="store.ownerPhotos"
            :text="getText(t('OwnerPhotos'), t('UserPhotos'))"
            :isMyProfile="store.userType == 'OWNER'"
            :username="store.username"
            :url="store.profileImage"
            icon="camera-plus"
            classBtn="contour-no-background-button"
          />
          <ContentPhotos
            v-if="getContent('favourite') && store.userType === 'OWNER'"
            :posts="store.favouritePhotos"
            :text="t('favoriteText')"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.user-profile;
</style>

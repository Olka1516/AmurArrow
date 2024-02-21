<script setup lang="ts">
import Item from '@/components/profile/ComponentItem.vue'
import Button from '@/components/general/ComponentButton.vue'
import Avatar from '@/components/general/AvatarComponent.vue'
import ContentPhotos from '@/components/profile/ComponentPhotos.vue'
import { ref } from 'vue'
import { userStore } from '@/stores'
import { TextEnum } from '@/types'
import router from '@/router'

const store = userStore()
const content = ref('posts')
const { OwnerAbout, UserAbout, OwnerPhotos, UserPhotos } = TextEnum

const changeContent = (name: string) => {
  content.value = name
}

const getGender = () => {
  return store.gender == 'male' ? 'Male' : 'Female'
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
  await router.push('/user-settings')
}
</script>
<template>
  <div class="profile">
    <div class="container">
      <div class="profile-contents">
        <img class="profile-content-img" src="@/assets/pictures/white-blank.jpg" alt="" />
        <Button
          v-if="store.userType === 'OWNER'"
          class="fill-pink-button settings"
          icon="settings"
          @click="routeToSettings"
        />

        <Avatar :name="getName()" class="profile-avatar" @click="routeToSettings" />
        <div class="profile-content">
          <h1>{{ store.username }}</h1>
          <div class="profile-content-inner info">
            <Item v-if="store.location" name="location" :text="store.location" />
            <Item v-if="store.email" name="email" :text="store.email" />
          </div>
        </div>
      </div>
      <div class="profile-about">
        <div class="profile-about-info">
          <div class="profile-info-inner">
            <h1>About</h1>
            <div class="profile-content-inner">
              <Item v-if="store.gender" :name="store.gender" :text="getGender()" />
              <Item v-if="store.age" name="person" :text="`${store.age} years`" />
            </div>
            <p>{{ store.description }}</p>
            <nav class="profile-content-inner links" v-if="store.media.length">
              <div v-for="item in store.media" :key="item.name">
                <a :href="item.link" class="profile-content-item link">
                  <Item :name="item.name" :text="item.link" additionalImage="copy" />
                </a>
              </div>
            </nav>
            <div
              v-if="!store.gender && !store.age && !store.description && !store.media.length"
              class="profile-no-content"
            >
              <h1>{{ getText(OwnerAbout, UserAbout) }}</h1>
            </div>
          </div>
        </div>
        <div class="profile-about-photos">
          <div class="profile-about-buttons" v-if="store.userType == 'OWNER'">
            <Button
              class="contour-no-background-button"
              icon="grid"
              @click="changeContent('posts')"
              text="Posts"
              :class="{ isActive: getContent('posts') }"
            />
            <Button
              class="contour-no-background-button"
              icon="favourite"
              @click="changeContent('favourite')"
              text="Favorite"
              :class="{ isActive: getContent('favourite') }"
            />
          </div>
          <ContentPhotos
            v-if="getContent('posts')"
            :photos="store.ownerPhotos"
            :text="getText(OwnerPhotos, UserPhotos)"
            :isMyProfile="store.userType == 'OWNER'"
          />
          <ContentPhotos
            v-if="getContent('favourite') && store.userType === 'OWNER'"
            :photos="store.favouritePhotos"
            text="You don't have favorites, use the platform and find them"
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

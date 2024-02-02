<script setup lang="ts">
import Item from '@/components/profile/ComponentItem.vue'
import Button from '@/components/general/ComponentButton.vue'
import ContentPhotos from '@/components/profile/ComponentPhotos.vue'
import { ref } from 'vue'
import { userStore } from '@/stores'

const store = userStore()
const content = ref('posts')

const changeContent = (name: string) => {
  content.value = name
}

const getGender = () => {
  return store.gender == 'male' ? 'Male' : 'Female'
}

const getContent = (item: string) => {
  return item === 'posts'
}
</script>
<template>
  <div class="profile">
    <div class="container">
      <div class="profile-contents">
        <img class="profile-content-img" src="@/assets/pictures/white-blank.jpg" alt="" />
        <Button class="fill-pink-button settings" icon="settings" />

        <div class="profile-circle">
          {{ store.firstname.at(0) }}{{ store.lastname.at(0) }}

          <Button class="fill-pink-button photo" icon="camera-plus" />
        </div>
        <div class="profile-content">
          <h1>{{ store.username }}</h1>
          <div class="profile-content-inner info">
            <Item name="location" :text="store.location" />
            <Item name="email" :text="store.email" />
          </div>
        </div>
      </div>
      <div class="profile-about">
        <div class="profile-about-info">
          <div class="profile-info-inner">
            <h1>About</h1>
            <div class="profile-content-inner">
              <Item :name="store.gender" :text="getGender()" />
              <Item name="person" :text="`${store.age} years`" />
            </div>
            <p>{{ store.description }}</p>
            <nav class="profile-content-inner links">
              <div v-for="item in store.media" :key="item.name">
                <a :href="item.link" class="profile-content-item link">
                  <Item :name="item.name" :text="item.link" additionalImage="copy" />
                </a>
              </div>
            </nav>
          </div>
        </div>
        <div class="profile-about-photos">
          <div class="profile-about-buttons">
            <Button
              class="contour-no-background-button"
              icon="grid"
              @click="changeContent('posts')"
              text="Posts"
              :class="{ isActive: getContent(content) }"
            />
            <Button
              class="contour-no-background-button"
              icon="favourite"
              @click="changeContent('favourite')"
              text="Favorite"
              :class="{ isActive: getContent(content) }"
            />
          </div>
          <ContentPhotos
            v-if="content === 'posts'"
            :photos="store.userPhotos"
            text="You don't have any photos, click the button below to add one"
          />
          <ContentPhotos
            v-if="content === 'favourite'"
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

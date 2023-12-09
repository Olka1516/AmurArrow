<script setup lang="ts">
</script>

<template>
  <section>
    <div class="container">
      <div class="content">
        <div class="content-banner">
          <h1 class="content-banner-title">Date your way</h1>
          <p class="content-banner-text">
            Welcome to our dating platform, where you can find your ideal partner or just
            interesting conversation partners. We created this site so that you can experience all
            the magic of online dating and discover many possibilities for yourself.
          </p>
          <button class="content-banner-button">Get started</button>
        </div>
        <div class="content-img">
          <img class="content-img-couple" src="@/assets/pictures/couple.png" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.content;
</style>

<script setup lang="ts">
import Button from '@/components/general/ComponentButton.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
<template>
  <footer>
    <div class="container">
      <div class="footer-nav">
        <div class="footer-column">
          <h2>{{ t('legal') }}</h2>
          <div class="footer-column-inner">
            <Button :text="t('privacy')" />
            <Button :text="t('terms')" />
            <Button :text="t('cookiePolicy')" />
            <Button :text="t('intellectualProperty')" />
          </div>
        </div>
        <div class="footer-column">
          <div class="footer-column-inner">
            <Button :text="t('FAQ')" />
            <Button :text="t('destination')" />
            <Button :text="t('pressRoom')" />
            <Button :text="t('contact')" />
            <Button :text="t('promoCode')" />
          </div>
        </div>
        <div class="footer-column">
          <h2>{{ t('careers') }}</h2>
          <div class="footer-column-inner">
            <Button :text="t('careersPortal')" />
            <Button :text="t('techBlog')" />
          </div>
        </div>
        <div>
          <h2>{{ t('social') }}</h2>
          <div class="footer-column-social">
            <Button icon="instagram" />
            <Button icon="facebook" />
            <Button icon="telegram" />
            <Button icon="youtube" />
            <Button icon="linkedin" />
          </div>
        </div>
      </div>
      <div class="footer-hr">
        <hr />
      </div>
      <p>
        {{ t('footerText') }}
      </p>
      <div class="footer-hr">
        <hr />
      </div>
      <div class="footer-nav footer-nav-bottom">
        <div>
          <Button :text="t('FAQ')" />/ <Button :text="t('safetyTips')" />/
          <Button :text="t('terms')" />/ <Button :text="t('cookiePolicy')" />/
          <Button :text="t('privacySettings')" />
        </div>
        <p>{{ t('footerDate') }}</p>
      </div>
    </div>
  </footer>
</template>
<style scoped lang="scss">
@use '@/assets/scss/index';
@include index.footer;
</style>

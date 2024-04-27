import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/scss/_reset.scss'
import { i18n } from './lang'

import vueCountryRegionSelect from 'vue3-country-region-select'

const pinia = createPinia()
const app = createApp(App)
import router from './router'

app.use(router).use(pinia).use(vueCountryRegionSelect).use(i18n).mount('#app')

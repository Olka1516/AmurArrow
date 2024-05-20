import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/scss/_reset.scss'
import { i18n } from './lang'
import Toast, { POSITION, type PluginOptions } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import '@/assets/scss/toasts/_toastsColor.scss'

import vueCountryRegionSelect from 'vue3-country-region-select'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

const options: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
}

app.use(router).use(pinia).use(vueCountryRegionSelect).use(i18n).use(Toast, options).mount('#app')

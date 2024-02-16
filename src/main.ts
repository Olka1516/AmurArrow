import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/scss/_reset.scss'
import vueCountryRegionSelect from 'vue3-country-region-select'

const pinia = createPinia()
const app = createApp(App)
import router from './router'

app.use(router).use(pinia).use(vueCountryRegionSelect).mount('#app')

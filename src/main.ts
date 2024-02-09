import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/scss/_reset.scss'
import router from './router'

const pinia = createPinia()
const app = createApp(App)
app.use(router).use(pinia).mount('#app')

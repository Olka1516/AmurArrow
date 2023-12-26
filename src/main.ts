import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/scss/_reset.scss'

const pinia = createPinia()
const app = createApp(App)
import router from './router'

app.use(router).use(pinia).mount('#app')

import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/scss/_reset.scss'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).mount('#app')

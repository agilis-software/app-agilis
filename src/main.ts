import { createApp } from 'vue'
import './style.css'
import router from './router'

createApp(App)
    .use(router)
    .mount('#app')
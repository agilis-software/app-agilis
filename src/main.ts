import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import { plugin } from '@formkit/vue'
import router from './router'
import App from './App.vue'
import formkitConfig from '~/config/formkit.config'

const pinia = createPinia()

createApp(App)
  .use(router)
  .use(pinia)
  .use(plugin, formkitConfig)
  .mount('#app')

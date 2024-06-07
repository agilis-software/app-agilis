import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '~/router/routes'

const history = createWebHistory()

const router = createRouter({
  routes,
  history,
})

export default router
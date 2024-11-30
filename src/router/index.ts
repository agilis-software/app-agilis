import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '~/router/routes'
import { useAuthStore } from '~/stores/auth'

const history = createWebHistory()

const router = createRouter({
  routes,
  history,
})

router.beforeEach((to, _from, next) => {
  const { token } = useAuthStore()

  if (token && (to.name === 'login' || to.name === 'register')) {
    return next({ name: 'organizations' })
  }

  if (!token && to.meta.requiresAuth) {
    return next({ name: 'login' })
  }

  next()
})

export default router

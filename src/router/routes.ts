import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

interface Route {
  path: string
  component?: any
  redirect: Record<'name', string> | string
  children?: RouteRecordRaw[]
}

const middlewares = {
  redirectToLogin: (to: any, from: any, next: any) => {
    const auth = useAuthStore()

    if (auth.isLogged) {
      next()
    }
    else {
      next({ name: 'login' })
    }
  },
  redirectToOrganizations: (to: any, from: any, next: any) => {
    const auth = useAuthStore()

    if (auth.isLogged) {
      next('/organizations')
    }
    else {
      next()
    }
  },
}

export const routes: Route[] = [
  {
    path: '',
    component: () => import('~/layouts/AuthLayout.vue'),
    redirect: { name: 'login' },
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('~/views/auth/Login.vue'),
        beforeEnter: middlewares.redirectToOrganizations,
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('~/views/auth/Register.vue'),
        beforeEnter: middlewares.redirectToOrganizations,
      },
    ],
  },
  {
    path: '',
    component: () => import('~/layouts/AppLayout.vue'),
    redirect: { name: 'projects' },
    children: [
      {
        path: '/projects',
        name: 'projects',
        component: () => import('~/views/project/List.vue'),
        beforeEnter: middlewares.redirectToLogin,
      },
      {
        path: '/projects/:id/chats/:chatId',
        name: 'chat',
        component: () => import('~/views/project/Chat.vue'),
        beforeEnter: middlewares.redirectToLogin,
      },
      {
        path: '/backlog',
        name: 'backlog',
        component: () => import('~/views/backlog/List.vue'),
        beforeEnter: middlewares.redirectToLogin,
      },
      {
        path: '/kanban',
        name: 'kanban',
        component: () => import('~/views/kanban/List.vue'),
        beforeEnter: middlewares.redirectToLogin,
      },
    ],
  },
  {
    path: '',
    redirect: '',
    children: [
      {
        path: 'organizations',
        component: () => import('~/views/organization/List.vue'),
        beforeEnter: middlewares.redirectToLogin,
      },
    ],
  },
]

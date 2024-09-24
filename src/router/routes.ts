import type { RouteRecordRaw } from 'vue-router'
import Login from '~/views/auth/Login.vue'

interface RouteStyle {
  path: string
  component: any
  redirect: Record<'name', string> | string
  children?: RouteRecordRaw[]
}

export const routes: RouteStyle[] = [
  {
    path: '',
    component: () => import('~/layouts/AuthLayout.vue'),
    redirect: { name: 'projects' },
    children: [
      {
        path: '/login',
        name: 'login',
        component: Login,
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('~/views/auth/Register.vue'),
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
      },
      {
        path: '/projects/:id/chats/:chatId',
        name: 'chat',
        component: () => import('~/views/project/Chat.vue'),
      },
      {
        path: '/backlog',
        name: 'backlog',
        component: () => import('~/views/backlog/List.vue'),
      },
      {
        path: '/kanban',
        name: 'kanban',
        component: () => import('~/views/kanban/List.vue'),
      },
    ],
  },
  {
    path: '/organizations',
    redirect: '',
    component: () => import('~/views/organization/List.vue'),
  },
]

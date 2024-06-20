import type { RouteRecordRaw } from 'vue-router'

interface Route {
  path: string
  component: any
  children?: RouteRecordRaw[]
}

export const routes: Route[] = [
  {
    path: '',
    component: () => import('~/layouts/AuthLayout.vue'),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('~/views/auth/Login.vue'),
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
    component: () => import('~/views/organization/List.vue'),
  },
]

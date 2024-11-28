import type { RouteRecordRaw } from 'vue-router'
import Login from '~/views/auth/Login.vue'

interface RouteStyle {
  path: string
  component: any
  redirect: Record<'name', string> | string
  children?: RouteRecordRaw[]
  meta?: Record<'requiresAuth', boolean>
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
    meta: { requiresAuth: true },
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
    meta: { requiresAuth: true },
    component: () => import('~/views/organization/List.vue'),
  },
  {
    path: '/settings',
    component: () => import('~/layouts/SettingsLayout.vue'),
    redirect: { name: 'settings-account' },
    meta: { requiresAuth: true },
    children: [
      {
        path: 'account',
        name: 'settings-account',
        component: () => import('~/views/settings/Account.vue'),
      },
      {
        path: 'organizations',
        name: 'settings-organizations',
        component: () => import('~/views/settings/Organizations.vue'),
      },
      {
        path: 'notifications',
        name: 'settings-notifications',
        component: () => import('~/views/settings/Notifications.vue'),
      },
      {
        path: 'sound',
        name: 'settings-sound',
        component: () => import('~/views/settings/Sound.vue'),
      },
    ],
  },
  {
    path: '/config',
    redirect: { name: 'config-organization' },
    component: () => import('~/layouts/SettingsLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'organization/:id',
        name: 'organization',
        component: () => import('~/views/settings/ConfigOrganization.vue'),
      },
    ],
  }
]

import type { RouteRecordRaw } from 'vue-router'
import Login from '~/views/auth/Login.vue'

interface RouteStyle {
  path: string
  component: any
  redirect: Record<'name', string> | string
  name?: string
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
        alias: '/',
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
        path: '/organizations/:organizationId/projects',
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
        path: '/organizations/:organizationId/projects/:projectId/kanban',
        name: 'kanban',
        component: () => import('~/views/kanban/List.vue'),
      },
      {
        path: '/organizations/:organizationId/projects/:projectId/tasks/:taskId',
        name: 'view-task',
        component: () => import('~/views/task/View.vue'),
      },
    ],
  },
  {
    path: '/organizations',
    name: 'organizations',
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
  },
]

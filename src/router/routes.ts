import type { RouteRecordRaw } from 'vue-router'

interface RouteStyle {
  path: string
  component: any
  redirect: string
  children?: RouteRecordRaw[]
}

export const routes: RouteStyle[] = [
  {
    path: '',
    component: () => import('~/layouts/AuthLayout.vue'),
    redirect: '/login',
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
    redirect: '/login',
    children: [
      {
        path: '/projects',
        name: 'projects',
        component: () => import('~/views/project/List.vue'),
      },
    ],
  },
  {
    path: '/organizations',
    redirect: '/login',
    component: () => import('~/views/organization/List.vue'),
  },
]

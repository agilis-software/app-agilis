import type { RouteRecordRaw } from 'vue-router'

interface Route {
  path: string
  component: any
  children: RouteRecordRaw[]
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
    ],
  },
]

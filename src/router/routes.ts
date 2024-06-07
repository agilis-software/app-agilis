import { RouteRecordRaw } from "vue-router"

interface Route {
    path: string
    component: any
    children: RouteRecordRaw[]
  }

export const routes: Route[] = [
    {
        path: '/',
        component: () => import('~/views/AuthLayout.vue'),
        children: [
            {
                path: '/login',
                name: 'login',
                component: () => import('~/views/Login.vue')
            },
            {
                path: '/register',
                name: 'register',
                component: () => import('~/views/Register.vue')
            }
        ]
    }
]
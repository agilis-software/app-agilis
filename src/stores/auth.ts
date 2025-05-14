import type { AfterFetchContext, RemovableRef } from '@vueuse/core'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { useApi } from '~/composables/api'
import type { Resource } from '~/models/Resource'
import type { Token, User } from '~/models/Auth'
import router from '~/router'

interface State {
  token: RemovableRef<string>
}

const useAuthStore = defineStore('Auth', {
  state: (): State => ({
    token: useStorage('agilis_token', ''),
  }),
  actions: {
    login(user: any) {
      return useApi('/login').post(user).json<Resource<Token>>()
    },
    logout() {
      return useApi('/logout', {
        afterFetch: async (ctx: AfterFetchContext) => {
          this.setToken('')

          router.push({ name: 'login' })

          return ctx
        },
      }).post()
    },
    register(user: any) {
      return useApi('/register').post(user)
    },
    me() {
      return useApi('/users/me').get().json<Resource<User>>()
    },
    setToken(token: string) {
      this.$state.token = token
    },
  },
})

export { useAuthStore }

import type { RemovableRef } from '@vueuse/core'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { useApi } from '~/composables/api'

interface State {
  token: RemovableRef<string>
}

const useAuthStore = defineStore('Auth', {
  state: (): State => ({
    token: useStorage('token', ''),
  }),
  actions: {
    login(user: any) {
      return useApi('/login').post(user)
    },
    register(user: any) {
      return useApi('/register').post(user)
    },
    me() {
      return useApi('/users/me').get()
    },
    setToken(token: string) {
      this.$state.token = token
    },
  },
})

export { useAuthStore }

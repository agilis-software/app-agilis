import { defineStore } from 'pinia'
import { useApi } from '~/composables/api'

interface State {
  token: string
}

const useAuthStore = defineStore('Auth', {
  state: (): State => ({
    token: '',
  }),
  actions: {
    login(user: any) {
      return useApi('/login').post(user)
    },
    register(user: any) {
      return useApi('/register').post(user)
    },
  },
})

export { useAuthStore }

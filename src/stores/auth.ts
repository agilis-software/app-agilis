import { defineStore } from 'pinia'

interface State {
  isLogged: boolean
}

const useAuthStore = defineStore('Auth', {
  state: (): State => ({
    isLogged: false,
  }),
  actions: {
    setIsLogged() {
      this.$state.isLogged = true
    },
    removeIsLogged() {
      this.$state.isLogged = false
    },
  },
})

export { useAuthStore }

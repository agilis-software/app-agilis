import { defineStore } from 'pinia'

interface AuthState {
  isLogged: boolean
  userId: string | null
}

// Função para salvar o estado no localStorage
function saveState(key: string, state: AuthState) {
  localStorage.setItem(key, JSON.stringify(state))
}

// Função para carregar o estado do localStorage
function loadState(key: string, defaultValue: AuthState): AuthState {
  const storedState = localStorage.getItem(key)
  return storedState ? JSON.parse(storedState) as AuthState : defaultValue
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => loadState('auth', {
    isLogged: false,
    userId: null,
  }),
  actions: {
    setLoggedIn(isLogged: boolean) {
      this.isLogged = isLogged
      saveState('auth', this.$state)
    },
    setUserId(userId: string | null) {
      this.userId = userId
      saveState('auth', this.$state)
    },
  },
  getters: {
    getIsLogged: (state): boolean => state.isLogged,
    getUserId: (state): string | null => state.userId,
  },
})

import { createFetch } from '@vueuse/core'
import { apiUrl } from '~/config/env'
import { useAuthStore } from '~/stores/auth'
import { notify } from '~/utils/toast'

export const useApi = createFetch({
  baseUrl: apiUrl,
  options: {
    beforeFetch({ options }) {
      const { token } = useAuthStore()

      if (token) {
        options.headers = {
          Authorization: `Bearer ${token}`,
        }
      }

      return { options }
    },
    onFetchError(ctx) {
      const message = ctx.data?.message || 'Não foi possível concluir a requisição'

      notify(message, 'error')

      return ctx
    },
    immediate: false,
  },
  fetchOptions: {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  },
})

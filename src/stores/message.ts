import { defineStore } from 'pinia'
import { useApi } from '~/composables/api'
import type { Message } from '~/models/Message'
import type { Resource } from '~/models/Resource'

const url = '/dm'

const useMessageStore = defineStore('Message', {
  actions: {
    index(receiverId: string) {
      return useApi(`${url}/${receiverId}`).get().json<Resource<Message[]>>()
    },
    create(receiverId: string, message: { content: string }) {
      return useApi(`${url}/${receiverId}`).post(message)
    },
  },
})

export { useMessageStore }

import { defineStore } from 'pinia'
import { useApi } from '~/composables/api'
import type { Organization } from '~/models/organization'

const baseUrl = '/organizations'

const useOrganizationStore = defineStore('Organization', {
  actions: {
    index() {
      return useApi(baseUrl).get()
    },
    create(organization: Organization) {
      return useApi(baseUrl).post(organization)
    },
  },
})

export { useOrganizationStore }

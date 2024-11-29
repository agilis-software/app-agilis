import { defineStore } from 'pinia'
import { useApi } from '~/composables/api'
import type { Organization } from '~/models/Organization'

const baseUrl = '/organizations'

const useOrganizationStore = defineStore('Organization', {
  actions: {
    index() {
      return useApi(baseUrl).get().json()
    },
    create(organization: Organization) {
      return useApi(baseUrl).post(organization)
    },
    getById(id: string)
    {
      return useApi(`${baseUrl}/${id}`).get().json()
    },
    getMembersByOrganization(id: string)
    {
      return useApi(`${baseUrl}/${id}/users`).get().json()
    },
    getProjects(id: string)
    {
      return useApi(`${baseUrl}/${id}/projects`).get().json()
    }
  },
})

export { useOrganizationStore }

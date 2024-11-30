import { defineStore } from 'pinia'
import { useApi } from '~/composables/api'
import type { Resource } from '~/models/Resource'

const url = 'statuses'

const useStatusStore = defineStore('status', {
  actions: {
    index(organizationId: number, projectId: number) {
      return useApi(`/organizations/${organizationId}/projects/${projectId}/${url}`).get().json<Resource<any[]>>()
    },
    create(status: any, organizationId: number, projectId: number) {
      return useApi(`/organizations/${organizationId}/projects/${projectId}/${url}`).post(status)
    },
  },
})

export { useStatusStore }

import type { RemovableRef } from '@vueuse/core'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { useApi } from '~/composables/api'
import type { User } from '~/models/Auth'
import type { Organization } from '~/models/Organization'
import type { Resource } from '~/models/Resource'

const url = '/organizations'

interface State {
  id: RemovableRef<number>
}

const useOrganizationStore = defineStore('Organization', {
  state: (): State => ({
    id: useStorage('selectedOrganization', 0),
  }),
  actions: {
    index(filter: 'all' | 'own' = 'all') {
      return useApi(`${url}?filter=${filter}`).get().json()
    },
    create(organization: Organization) {
      return useApi(url).post(organization)
    },
    setOrganizationId(id: number) {
      this.$state.id = id
    },
    getCurrentOrganization(id: number) {
      return useApi(`${url}/${id}`).get().json()
    },
    getById(id: string) {
      return useApi(`${url}/${id}`).get().json()
    },
    getMembersByOrganization(id: string) {
      return useApi(`${url}/${id}/users`).get().json()
    },
    getParticipantByOrganization(id: string, userId: string) {
      return useApi(`${url}/${id}/users/${userId}`).get().json<Resource<User>>()
    },
    getProjects(id: string) {
      return useApi(`${url}/${id}/projects`).get().json()
    },
  },
})

export { useOrganizationStore }

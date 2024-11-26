import type { RemovableRef } from '@vueuse/core'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { useApi } from '~/composables/api'
import type { Organization } from '~/models/Organization'

const url = '/organizations'

interface State {
  id: RemovableRef<number>
}

const useOrganizationStore = defineStore('Organization', {
  state: (): State => ({
    id: useStorage('selectedOrganization', 0),
  }),
  actions: {
    index() {
      return useApi(url).get().json()
    },
    create(organization: Organization) {
      return useApi(url).post(organization)
    },
    setOrganizationId(id: number) {
      this.$state.id = id
    },
    getCurrentOrganization() {
      return useApi(`${url}/${this.$state.id}`).get().json()
    },
  },
})

export { useOrganizationStore }

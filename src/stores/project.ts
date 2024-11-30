import { defineStore } from 'pinia'
import { useApi } from '~/composables/api'
import type { Project } from '~/models/Project'
import type { Resource } from '~/models/Resource'

const url = 'projects'

const useProjectStore = defineStore('project', {
  actions: {
    index(organizationId: number) {
      return useApi(`/organizations/${organizationId}/${url}`).get().json<Resource<Project[]>>()
    },
    create(project: Project, organizationId: number) {
      return useApi(`/organizations/${organizationId}/${url}`).post(project)
    },
    getMembers(organizationId: number, projectId: number) {
      return useApi(`/organizations/${organizationId}/${url}/${projectId}/users`).get().json<Resource<any[]>>()
    },
  },
})

export { useProjectStore }

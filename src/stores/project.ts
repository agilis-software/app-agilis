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
    show(organizationId: number, projectId: number) {
      return useApi(`/organizations/${organizationId}/${url}/${projectId}`).get().json()
    },
    create(project: Project, organizationId: number) {
      return useApi(`/organizations/${organizationId}/${url}`).post(project)
    },
    getMembers(organizationId: number, projectId: number) {
      return useApi(`/organizations/${organizationId}/${url}/${projectId}/users`).get().json<Resource<any[]>>()
    },
    delete(organizationId: number, projectId: number)
    {
      return useApi(`/organizations/${organizationId}/${url}/${projectId}`).delete().json()
    },
    update(organizationId: number, projectId: number, project: any)
    {
      return useApi(`/organizations/${organizationId}/${url}/${projectId}`).put(project)
    },
  },
})

export { useProjectStore }

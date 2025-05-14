import type { AfterFetchContext } from '@vueuse/core'
import { defineStore } from 'pinia'
import { useApi } from '~/composables/api'
import type { Resource } from '~/models/Resource'
import type { SetAssignPayload } from '~/models/Task'

const url = 'tasks'

const useTaskStore = defineStore('tasks', {
  state: () => ({
    lastTaskId: 0,
  }),
  actions: {
    index(organizationId: number, projectId: number) {
      return useApi(`/organizations/${organizationId}/projects/${projectId}/${url}`).get().json<Resource<any[]>>()
    },
    create(task: any, organizationId: number, projectId: number) {
      const requestUrl = `/organizations/${organizationId}/projects/${projectId}/${url}`

      return useApi(requestUrl, {
        afterFetch: async (ctx: AfterFetchContext) => {
          this.$state.lastTaskId = ctx.data.data.id

          return ctx
        },
      }).post(task).json()
    },
    update(task: any, organizationId: number, projectId: number, taskId: number) {
      return useApi(`/organizations/${organizationId}/projects/${projectId}/${url}/${taskId}`).put(task)
    },
    setAssignee(payload: SetAssignPayload, taskId = 0) {
      const {
        assigneeId,
        organizationId,
        projectId,
      } = payload

      taskId = taskId || this.$state.lastTaskId

      const requestUrl
        = `/organizations/${organizationId}/projects/${projectId}/${url}/${taskId}/assignee`

      return useApi(requestUrl).put({ assignee_id: assigneeId })
    },
    getById(taskId: number, organizationId: number, projectId: number) {
      return useApi(`/organizations/${organizationId}/projects/${projectId}/${url}/${taskId}`).get().json()
    },
  },
})

export { useTaskStore }

import type { User } from '~/models/Auth'
import type { Status } from '~/models/Status'

export interface SetAssignPayload {
  organizationId: number
  projectId: number
  assigneeId: number
}

export interface Task {
  id: number
  title: string
  due_date: string
  project_id: number
  description: string
  status: Status
  assignee: User
}

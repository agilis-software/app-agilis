<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'
import draggableComponent from 'vuedraggable'
import TaskCard from '~/blocks/TaskCard.vue'
import KanbanColumn from '~/blocks/KanbanColumn.vue'
import CreateTask from '~/views/task/Create.vue'
import CreateStatus from '~/views/status/Create.vue'
import { useStatusStore } from '~/stores/status'
import { useProjectStore } from '~/stores/project'
import { useTaskStore } from '~/stores/task'
import router from '~/router'

const route = useRoute()

const {
  organizationId,
  projectId,
} = route.params

const projectStore = useProjectStore()
const statusStore = useStatusStore()
const taskStore = useTaskStore()

const { execute: getStatus, data: statusData, isFetching: isFetchingStatus }
  = statusStore.index(Number(organizationId), Number(projectId))

const { execute: getMembers, data: membersData }
  = projectStore.getMembers(Number(organizationId), Number(projectId))

const { execute: getTasks, data: taskData }
  = taskStore.index(Number(organizationId), Number(projectId))

const { execute: getProject, data: projectData } = projectStore.show(Number(organizationId), Number(projectId))

getStatus()
getMembers()
getTasks()
getProject()

const isOpen = ref(false)
const isOpenStatus = ref(false)

// const isFetching = computed(() => isFetchingMembers || isFetchingStatus || isFetchingTasks)

const status = computed(() => statusData?.value?.data || [])
const members = computed(() => membersData?.value?.data || [])
const tasks = computed(() => taskData?.value?.data || [])
const project = computed(() => projectData?.value?.data)

function openModal() {
  isOpen.value = true
}

function closeModal() {
  isOpen.value = false
}

function closeModalStatus() {
  isOpenStatus.value = false
}

function openModalStatus() {
  isOpenStatus.value = true
}

function goToView(taskId: number) {
  router.push({ name: 'view-task', params: { organizationId, projectId, taskId } })
}

const columns = computed(() => {
  return status.value.map((status) => {
    const filteredTasks = tasks.value.filter(task => task.status.name === status.name)
    return {
      title: status.name,
      tasks: filteredTasks,
      status: status.id,
    }
  })
})
</script>

<template>
  <div class="text-white">
    <div class="flex flex-col justify-start gap-y-4 mb-4">
      <div>
        <h1 class="text-2xl font-bold">
          Quadro
        </h1>
      </div>

      <hr class="w-full border border-[#2F2C2C]">
      <p v-if="project">
        {{ project.name }} / Quadro
      </p>
    </div>
    <div v-if="!columns.length && !isFetchingStatus">
      Não existem status de tarefa cadastrados.
    </div>
    <div
      class="pt-4 flex gap-x-4"
    >
      <Loading v-if="isFetchingStatus" />
      <div class="flex gap-x-4 overflow-x-auto h-full">
        <KanbanColumn
          v-for="column in columns"
          :key="column.status"
          :title="column.title"
        >
          <draggableComponent
            :list="column.tasks"
            item-key="name"
            :group="{ name: 'tasks', pull: true, put: true }"
          >
            <template #item="{ element }">
              <TaskCard
                :task="element"
                @click="goToView(element.id)"
              />
            </template>
          </draggableComponent>

          <template #newTask>
            <div class="pt-4 -ml-3">
              <Button
                class="flex items-center justify-start"
                @click="openModal"
              >
                <Icon
                  icon="bx:plus"
                  class="size-6 cursor-pointer"
                />
                <span class="text-lg"> Nova Tarefa </span>
              </Button>
            </div>
          </template>
        </KanbanColumn>
      </div>
      <Button
        class="size-8"
        @click="openModalStatus"
      >
        <Icon
          icon="bx:plus"
          class="size-8"
        />
      </Button>
    </div>
  </div>
  <Modal
    :is-open
    title="Criar tarefa"
    @close="closeModal"
    @handle-close="closeModal"
  >
    <CreateTask
      :status-list="status || []"
      :members-list="members || []"
      :organization-id="Number(organizationId)"
      :project-id="Number(projectId)"
      @refresh-list="getTasks"
      @close-modal="closeModal"
    />
  </Modal>
  <Modal
    :is-open="isOpenStatus"
    title="Criar status"
    @close="closeModalStatus"
    @handle-close="closeModalStatus"
  >
    <CreateStatus
      :organization-id="Number(organizationId)"
      :project-id="Number(projectId)"
      @refresh-list="getStatus"
      @close-modal="closeModalStatus"
    />
  </Modal>
</template>

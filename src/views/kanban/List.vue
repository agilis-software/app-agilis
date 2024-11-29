<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'
import draggableComponent from 'vuedraggable'
import TaskCard from '~/blocks/TaskCard.vue'
import KanbanColumn from '~/blocks/KanbanColumn.vue'
import { doingTasks, doneTasks, toDoTasks } from '~/static/kanbanTaskList'
import CreateTask from '~/views/task/Create.vue'
import CreateStatus from '~/views/status/Create.vue'
import { useStatusStore } from '~/stores/status'
import { useProjectStore } from '~/stores/project'
// import { useOrganizationStore } from '~/stores/organization'

const route = useRoute()

const {
  organizationId,
  projectId,
} = route.params

// const organizationsStore = useOrganizationStore()
const projectStore = useProjectStore()
const statusStore = useStatusStore()

const { execute: getStatus, data: statusData } = statusStore.index(Number(organizationId), Number(projectId))
const { execute: getMembers, data: membersData } = projectStore.getMembers(Number(organizationId), Number(projectId))

getStatus()
getMembers()

const isOpen = ref(false)
const isOpenStatus = ref(false)

const status = computed(() => statusData?.value?.data)
const members = computed(() => membersData?.value?.data)

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

const columns = [
  {
    title: 'To-Do',
    tasks: toDoTasks,
    status: 'To-Do',
  },
  {
    title: 'Doing',
    tasks: doingTasks,
    status: 'Doing',
  },
  {
    title: 'Done',
    tasks: doneTasks,
    status: 'Done',
  }, 
]
</script>

<template>
  <div class="text-white">
    <div class="flex flex-col justify-start gap-y-4">
      <div>
        <h1 class="text-2xl font-bold">
          Quadro
        </h1>
      </div>

      <!--  nome do projeto -->
      <hr class="w-full border border-[#2F2C2C]">
      <p>Projeto Integrador / Quadro</p>
    </div>
    <div class="pt-4 flex gap-x-4">
      <div class="flex gap-x-4 overflow-x-auto h-full">
        <KanbanColumn 
          v-for="column in columns" 
          :key="column.status" 
          :title="column.title"
        >
          <draggableComponent 
            :list="column.tasks" 
            item-key="name" 
            group="tasks"
          >
            <template #item="{element}">
              <TaskCard
                :task="element"
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
    />
  </Modal>
</template>

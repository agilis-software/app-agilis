<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { toast } from 'vue3-toastify'
import router from '~/router'
import { useProjectStore } from '~/stores/project'
import { useStatusStore } from '~/stores/status'
import { useTaskStore } from '~/stores/task'

const taskStore = useTaskStore()
const statusStore = useStatusStore()
const projectStore = useProjectStore()
const route = useRoute()

const selectedTask = ref({
  id: 0,
  title: '',
  description: '',
  due_date: '',
  status: {
    id: 0,
    name: '',
  },
  assignee: {
    id: 0,
    name: '',
  },
})

const payload = ref({})

const { organizationId, projectId, taskId } = route.params

const {
  execute: getById,
  data: taskData,
  isFetching,
} = taskStore.getById(Number(taskId), Number(organizationId), Number(projectId))

getById()

watch(taskData, () => {
  Object.assign(selectedTask.value, taskData.value?.data)
})
const {
  execute: getStatus,
  data: statusData,
  isFetching: isFetchingStatus,
} = statusStore.index(Number(organizationId), Number(projectId))

getStatus()

const status = computed(() => statusData.value?.data || [])

const {
  execute: getMembers,
  data: membersData,
  isFetching: isFetchingMembers,
} = projectStore.getMembers(Number(organizationId), Number(projectId))

getMembers()

const members = computed(() => membersData.value?.data || [])

const {
  execute: update,
  isFetching: isUpdating,
} = taskStore.update(payload.value, Number(organizationId), Number(projectId), Number(taskId))

function handleSubmit() {
  Object.assign(payload.value, {
    ...selectedTask.value,
    status_id: selectedTask.value.status.id,
    assignee_id: selectedTask.value.assignee.id,
  })

  update()
    .then(() => {
      toast.success('Tarefa atualizada com sucesso!')
      router.push({ name: 'kanban', params: { organizationId, projectId } })
    })
    .catch(() => {
      toast.error('Ocorreu um erro ao atualizar a tarefa.')
    })
}

function goBack() {
  router.back()
}
</script>

<template>
  <div class="w-full">
    <div class="w-full flex flex-row items-center">
      <Icon
        class="text-electric-violet-400 rounded-full size-12 cursor-pointer transition-transform duration-300"
        icon="bx:left-arrow-alt"
        @click="goBack"
      />
      <h1 class="text-2xl font-bold mb-4 flex items-center mt-3">
        Visualizar Tarefa
      </h1>
    </div>
    <div
      v-if="isFetching"
      class="flex justify-center"
    >
      <Loading />
    </div>
    <form
      v-else
      class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-12 mt-4"
    >
      <div class="sm:col-span-6">
        <label for="nome">Título</label>
        <InputText
          v-model="selectedTask.title"
          name="name"
          required
        />
      </div>
      <div class="sm:col-span-6">
        <label for="status">Status</label>
        <Select
          v-model="selectedTask.status.id"
          :options="status"
          :disabled="isFetchingStatus"
          option-value="id"
          option-label="name"
          required
        />
      </div>
      <div class="sm:col-span-12">
        <label for="descricao">Descrição</label>
        <TextArea
          v-model="selectedTask.description"
          class="h-20"
          name="description"
          required
        />
      </div>
      <div class="sm:col-span-6">
        <label for="due_date">Data de Conclusão</label>
        <InputDate
          v-model="selectedTask.due_date"
          name="due_date"
        />
      </div>
      <div class="sm:col-span-6">
        <label for="responsavel">Responsável</label>
        <Select
          v-model="selectedTask.assignee.id"
          :options="members"
          :disabled="isFetchingMembers"
          option-value="id"
          option-label="name"
        />
      </div>
      <div class="sm:col-span-12">
        <Button
          :disabled="isUpdating"
          class="bg-primary-color w-full"
          @click="handleSubmit"
        >
          Salvar
        </Button>
      </div>
    </form>
  </div>
</template>

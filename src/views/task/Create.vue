<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import type { SetAssignPayload } from '~/models/Task'
import { useTaskStore } from '~/stores/task'

interface Props {
  statusList: any[]
  membersList: any[]
  projectId: number
  organizationId: number
}

const props = defineProps<Props>()
const emit = defineEmits(['refreshList', 'closeModal'])

const {
  organizationId,
  projectId,
} = props

const task = ref({
  title: '',
  status_id: '',
  description: '',
  assignee_id: '',
  due_date: '',
})

const taskStore = useTaskStore()

const { execute: createTask, isFetching } = taskStore.create(task.value, organizationId, projectId)

function handleSubmit() {
  createTask()
    .then(() => {
      if (task.value.assignee_id) {
        const payload: SetAssignPayload = {
          assigneeId: Number(task.value.assignee_id),
          projectId,
          organizationId,
        }

        const { execute: setAssignToTask } = taskStore.setAssignee(payload)
        setAssignToTask()
      }

      toast.success('Tarefa criada com sucesso!')
      emit('refreshList')
      emit('closeModal')
    })
    .catch(() => {
      toast.error('Ocorreu um erro ao tentar criar a tarefa.')
    })
}
</script>

<template>
  <form
    class="grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-12 mt-4"
  >
    <div class="sm:col-span-12">
      <label for="nome">Título</label>
      <InputText
        v-model="task.title"
        name="name"
        required
      />
    </div>
    <div class="sm:col-span-12">
      <label for="status">Status</label>
      <Select
        v-model="task.status_id"
        :options="statusList"
        option-value="id"
        option-label="name"
        required
      />
    </div>
    <div class="sm:col-span-12">
      <label for="descricao">Descrição</label>
      <TextArea
        v-model="task.description"
        class="h-20"
        name="description"
        required
      />
    </div>
    <div class="sm:col-span-12">
      <label for="due_date">Data de Conclusão</label>
      <InputDate
        v-model="task.due_date"
        name="due_date"
      />
    </div>
    <div class="sm:col-span-12">
      <label for="responsavel">Responsável</label>
      <Select
        v-model="task.assignee_id"
        :options="membersList"
        option-value="id"
        option-label="name"
      />
    </div>
    <div class="sm:col-span-12">
      <Button
        :disabled="isFetching"
        class="bg-primary-color w-full"
        @click="handleSubmit"
      >
        Criar
      </Button>
    </div>
  </form>
</template>

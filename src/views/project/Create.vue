<script setup lang="ts">
import { reactive } from 'vue'
import { toast } from 'vue3-toastify'
import { useProjectStore } from '~/stores/project'

interface Props {
  organizationId: number
}

const props = defineProps<Props>()
const emit = defineEmits(['refreshList', 'closeModal'])

const projectStore = useProjectStore()

const project = reactive({
  id: 0,
  name: '',
  description: '',
  organization_id: 1,
  start_date: '',
  finish_date: '',
  // task_prefix: '',
})

const { execute, isFetching } = projectStore.create(project, props.organizationId)

function handleSubmit() {
  execute()
    .then(() => {
      toast.success('Projeto criado com sucesso!')
      emit('refreshList')
      emit('closeModal')
    })
    .catch(() => {
      toast.error('Ocorreu um erro ao criar o projeto.')
    })
}
</script>

<template>
  <form class="grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-12 mt-4">
    <div class="sm:col-span-12">
      <label for="nome">Nome</label>
      <InputText
        v-model="project.name"
        name="nome"
        validation="required"
      />
    </div>
    <div class="sm:col-span-12">
      <label for="descricao">Descrição</label>
      <TextArea
        v-model="project.description"
        class="h-20"
        name="descricao"
        validation="required"
      />
    </div>
    <div class="sm:col-span-6">
      <label for="data_inicio">Data de Início</label>
      <InputDate
        v-model="project.start_date"
        name="data_inicio"
        validation="required"
      />
    </div>
    <div class="sm:col-span-6">
      <label for="data_conclusao">Data de Conclusão</label>
      <InputDate
        v-model="project.finish_date"
        name="data_conclusao"
      />
    </div>
    <!--   <div class="sm:col-span-12">
      <label for="prefixo">Prefixo da Tarefa</label>
      <InputText
        v-model="project.task_prefix"
        name="prefixo"
        validation="required"
      />
    </div> -->

    <div class="sm:col-span-12">
      <Button
        :disabled="isFetching"
        class="bg-primary-color w-full"
        @click="handleSubmit()"
      >
        Criar
      </Button>
    </div>
  </form>
</template>

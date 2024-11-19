<script setup lang="ts">
import { reactive } from 'vue'
import { useProjectStore } from '~/stores/project'

const projectStore = useProjectStore()

const project = reactive({
  id: 0,
  name: '',
  description: '',
  organization_id: 1,
  start_date: '',
  finish_date: '',
})

const { execute } = projectStore.create(project)

function handleSubmit() {
  execute()
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
        name="data_conclusao"
      />
    </div>
    <div class="sm:col-span-12">
      <label for="prefixo">Prefixo da Tarefa</label>
      <InputText
        name="prefixo"
        validation="required"
      />
    </div>

    <div class="sm:col-span-12">
      <Button
        class="bg-primary-color w-full"
        @click="handleSubmit()"
      >
        Criar
      </Button>
    </div>
  </form>
</template>

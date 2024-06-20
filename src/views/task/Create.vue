<script setup lang="ts">
import Input from '~/components/forms/Input.vue'
import TextArea from '~/components/forms/TextArea.vue'
import Select from '~/components/forms/Select.vue'
import Button from '~/components/Button.vue'
import { taskStatusOptions } from '~/static/taskStatusOptions'
import { personsList } from '~/static/personsList'
</script>

<template>
  <form class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-12 mt-4">
    <div class="sm:col-span-12">
      <label for="nome">Nome da Tarefa</label>
      <Input
        type="text"
        name="nome"
        required
      />
    </div>
    <div class="sm:col-span-12">
      <label for="status">Status</label>
      <Select>
        <option
          v-for="(option, index) in taskStatusOptions"
          :key="index"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </Select>
    </div>
    <div class="sm:col-span-12">
      <label for="descricao">Descrição</label>
      <TextArea
        class="h-20"
        name="descricao"
        required
      />
    </div>
    <div class="sm:col-span-6">
      <label for="data_inicio">Data de Início</label>
      <Input
        type="date"
        name="data_inicio"
        required
      />
    </div>
    <div class="sm:col-span-6">
      <label for="data_conclusao">Data de Conclusão</label>
      <Input
        type="date"
        name="data_conclusao"
      />
    </div>
    <div class="sm:col-span-12">
      <label for="responsavel">Responsável</label>
      <Select>
        <option
          v-for="(option, index) in personsList"
          :key="index"
          :value="option.id"
        >
          {{ option.name }}
        </option>
      </Select>
    </div>

    <div class="sm:col-span-12">
      <Button
        type="submit"
        class="bg-primary-color w-full"
      >
        Criar
      </Button>
    </div>
  </form>
</template>

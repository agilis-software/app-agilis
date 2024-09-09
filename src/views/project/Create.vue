<script setup lang="ts">
import { personsList } from '~/static/personsList'
</script>

<template>
  <form class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-12 mt-4">
    <div class="sm:col-span-12">
      <label for="nome">Nome</label>
      <Input
        type="text"
        name="nome"
        required
      />
    </div>
    <div class="sm:col-span-12">
      <label for="descricao">Descrição</label>
      <TextArea
        class="h-20"
        name="descricao"
        required
      />
    </div>
    <div class="sm:col-span-12">
      <label for="participantes">Participantes</label>
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
      <label for="prefixo">Prefixo da Tarefa</label>
      <Input
        type="text"
        name="prefixo"
        required
      />
    </div>

    <div class="sm:col-span-12">
      <Button class="bg-primary-color w-full">
        Criar
      </Button>
    </div>
  </form>
</template>

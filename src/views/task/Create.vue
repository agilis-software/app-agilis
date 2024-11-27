<script setup lang="ts">
interface Props {
  statusList: any[]
  membersList: any[]
}

defineProps<Props>()
</script>

<template>
  <form class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-12 mt-4">
    <div class="sm:col-span-12">
      <label for="nome">Nome da Tarefa</label>
      <InputText
        name="nome"
        required
      />
    </div>
    <div class="sm:col-span-12">
      <label for="status">Status</label>
      <Select>
        <option
          v-for="(option, index) in statusList"
          :key="index"
          :value="option.value"
        >
          {{ option.name }}
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
      <InputDate
        name="data_inicio"
        required
      />
    </div>
    <div class="sm:col-span-6">
      <label for="data_conclusao">Data de Conclusão</label>
      <InputDate
        name="data_conclusao"
      />
    </div>
    <div class="sm:col-span-12">
      <label for="responsavel">Responsável</label>
      <Select>
        <option
          v-for="(option, index) in membersList"
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

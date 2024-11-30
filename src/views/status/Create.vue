<script setup lang="ts">
import { reactive } from 'vue'
import { useStatusStore } from '~/stores/status'

interface Props {
  organizationId: number
  projectId: number
}

const props = defineProps<Props>()
const statusStore = useStatusStore()

const status = reactive({
  id: 0,
  name: '',
})

const { execute } = statusStore.create(status, props.organizationId, props.projectId)

function handleSubmit() {
  execute()
}
</script>

<template>
  <form class="grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-12 mt-4">
    <div class="sm:col-span-12">
      <label for="nome">Nome</label>
      <InputText
        v-model="status.name"
        name="nome"
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

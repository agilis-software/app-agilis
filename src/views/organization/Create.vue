<script setup lang="ts">
import { reactive } from 'vue'
import type { Organization } from '~/models/organization'
import { useOrganizationStore } from '~/stores/organization'

interface Props {
  ownerId: number
}

const props = defineProps<Props>()

const organizationStore = useOrganizationStore()

const organization = reactive<Organization>({
  id: 0,
  name: '',
  description: '',
  owner_id: props.ownerId,
})

const { execute: create, isFetching } = organizationStore.create(organization)

function handleSubmit() {
  create()
}
</script>

<template>
  <form class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-12 mt-4">
    <div class="sm:col-span-12">
      <div class="flex items-end gap-2">
        <div class="w-full">
          <label for="nome">Nome da organização</label>
          <InputText
            v-model="organization.name"
            name="nome"
            validation="required"
          />
        </div>
      </div>
    </div>
    <div class="sm:col-span-12">
      <label for="descricao">Descrição</label>
      <TextArea
        v-model="organization.description"
        class="h-20"
        name="descricao"
        validation="required"
      />
    </div>
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

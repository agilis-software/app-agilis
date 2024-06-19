<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import Modal from '~/components/Modal.vue'
import OrganizationCard from '~/components/OrganizationCard.vue'
import IconAgilis from '~/components/icons/IconAgilis.vue'
import CreateOrganization from '~/views/organization/Create.vue'

interface Organization {
  title: string
  description: string
  createdAt: Date
}

const organizations: Organization[] = [
  {
    title: 'Fatec Jahu',
    description: 'Instituição de Ensino - Faculdade de Tecnologia',
    createdAt: new Date('2024/03/20'),
  },
  {
    title: 'Agilis Software',
    description: 'Criadora do Agilis, software de gestão de tarefas',
    createdAt: new Date('2024/03/30'),
  },
  {
    title: 'Freelances',
    description: 'Organização de projetos pessoais',
    createdAt: new Date('2024/03/30'),
  },
]

const isOpen = ref(false)

function openModal() {
  isOpen.value = true
}

function closeModal() {
  isOpen.value = false
}
</script>

<template>
  <div class="bg-[#201E1E] min-h-screen">
    <div class="hidden md:flex w-16 flex-col inset-y-0 transition-all fixed">
      <div class="flex-1 flex flex-col min-h-0 bg-electric-violet-500 relative">
        <div
          class="flex-1 flex flex-col relative justify-between items-center overflow-y-auto py-4"
        >
          <IconAgilis
            fill="white"
            :size="32"
          />

          <Icon
            icon="bx:user-circle"
            class="size-10 text-white"
          />
        </div>
      </div>
    </div>

    <div class="md:ml-8 md:pl-8">
      <main class="w-full p-12">
        <div class="flex justify-between flex-col md:flex-row items-center sm:items-start">
          <h1 class="text-white font-semibold text-4xl">
            Suas Organizações
          </h1>
          <button
            class="bg-electric-violet-600 flex justify-center items-center px-4 py-2 text-white font-medium rounded-md w-fit my-2 md:my-0"
            @click="openModal"
          >
            Nova
          </button>
        </div>

        <div class="my-8 flex justify-center items-center flex-wrap flex-col gap-8 sm:flex-row sm:justify-start sm:items-start">
          <template
            v-for="organization in organizations"
            :key="organization.title"
          >
            <OrganizationCard :organization="organization" />
          </template>
        </div>
      </main>
    </div>
  </div>
  <Modal
    :is-open
    title="Nova organização"
    @close="closeModal"
    @handle-close="closeModal"
  >
    <CreateOrganization />
  </Modal>
</template>

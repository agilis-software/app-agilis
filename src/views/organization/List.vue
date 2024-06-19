<script setup lang="ts">
import { Icon } from '@iconify/vue'
import OrganizationCard from '~/components/OrganizationCard.vue'
import IconAgilis from '~/components/icons/IconAgilis.vue'

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

    <div class="ml-8 pl-8">
      <main class="w-full p-12">
        <div class="flex justify-between flex-col md:flex-row">
          <h1 class="text-white font-semibold text-4xl">
            Suas Organizações
          </h1>
          <button
            class="bg-electric-violet-600 flex justify-center items-center px-4 py-2 text-white font-medium rounded-md w-fit my-2 md:my-0"
          >
            Nova
          </button>
        </div>

        <div class="my-8 flex flex-wrap flex-row gap-8">
          <template
            v-for="(organization) in organizations"
            :key="organization.title"
          >
            <OrganizationCard :organization="organization" />
          </template>
        </div>
      </main>
    </div>
  </div>
</template>

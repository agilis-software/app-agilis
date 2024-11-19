<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import CreateProject from '~/views/project/Create.vue'
import TaskCard from '~/blocks/TaskCard.vue'
import ProjectCard from '~/blocks/ProjectCard.vue'
import { useOrganizationStore } from '~/stores/organization'
import { useProjectStore } from '~/stores/project'

const isOpen = ref(false)
const projectStore = useProjectStore()
const organizationStore = useOrganizationStore()

const { execute: getOrganizationInfo, data: organizationData, isFetching: isLoadingOrganization }
  = organizationStore.getCurrentOrganization()

getOrganizationInfo()

const organization = computed(() => organizationData.value ? organizationData.value.data : [])
const { id } = organizationStore

const { execute: getProjects, data: projectsData } = projectStore.index(id)

getProjects()

const projects = computed(() => projectsData.value ? projectsData.value.data : [])

function openModal() {
  isOpen.value = true
}

function closeModal() {
  isOpen.value = false
}
</script>

<template>
  <div
    v-if="isLoadingOrganization"
    class="size-full flex justify-center items-center"
  >
    <Loading size="12" />
  </div>
  <div
    v-else
    class="text-white"
  >
    <div class="flex flex-col justify-start gap-y-4">
      <h1 class="text-2xl font-bold">
        {{ organization.name }}
      </h1>
      <hr class="w-full border border-[#2F2C2C]">
    </div>
    <div class="pt-4">
      <div class="flex justify-between">
        <div>
          <h4>Projetos</h4>
        </div>
        <Button
          class="bg-electric-violet-500"
          @click="openModal"
        >
          Adicionar
        </Button>
      </div>
      <div class="flex justify-start gap-x-8 py-5">
        <div v-if="!projects.length" class="text-gray-500 -mt-4">
          Não há projetos cadastrados.
        </div>
        <RouterLink
          v-for="(project, index) in projects"
          :key="index"
          to="kanban"
        >
          <ProjectCard
            :name="project.name"
            :description="project.description || ''"
          />
        </RouterLink>
      </div>
      <div class="flex flex-col justify-start gap-y-4">
        <hr class="w-full border border-[#2F2C2C]">
        <h4 class="text-lg">
          Suas tarefas em progresso
        </h4>
      </div>
      <div class="flex py-5">
        <TaskCard
          title="Desenvolver Aplicação"
          date="01/06/2024"
          task-id="PI-2"
          image-source="https://avatars.githubusercontent.com/u/83726062?v=4"
        />
      </div>
    </div>
  </div>
  <Modal
    :is-open
    title="Criar projeto"
    @close="closeModal"
    @handle-close="closeModal"
  >
    <CreateProject :organization-id="id"/>
  </Modal>
</template>

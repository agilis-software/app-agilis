<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import CreateProject from '~/views/project/Create.vue'
import ProjectCard from '~/blocks/ProjectCard.vue'
import { useOrganizationStore } from '~/stores/organization'
import { useProjectStore } from '~/stores/project'
import router from '~/router'

const route = useRoute()

const id = Number(route.params.organizationId)

const isOpen = ref(false)
const projectStore = useProjectStore()
const organizationStore = useOrganizationStore()

const { execute: getOrganizationInfo, data: organizationData, isFetching: isLoadingOrganization }
  = organizationStore.getCurrentOrganization(id)

getOrganizationInfo()

const organization = computed(() => organizationData.value ? organizationData.value.data : [])

const { execute: getProjects, data: projectsData, isFetching: isFetchingProjects } = projectStore.index(id)

getProjects()

const projects = computed(() => projectsData.value ? projectsData.value.data : [])

function openModal() {
  isOpen.value = true
}

function closeModal() {
  isOpen.value = false
}

function goToKanban(projectId: number) {
  router.push({ name: 'kanban', params: { organizationId: id, projectId } })
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
      <div class="flex justify-start w-full">
        <div v-if="!projects.length" class="text-gray-500 -mt-2 w-full">
          Não há projetos cadastrados.
        </div>
        <div
          v-if="isFetchingProjects"
          class="flex justify-center"
        >
          <Loading />
        </div>
        <div
          v-else
          class="flex justify-start px-4 py-5 gap-x-4 w-full -ml-4"
        >
          <div
            v-for="(project, index) in projects"
            :key="index"
            @click="goToKanban(project.id || 0)"
          >
            <ProjectCard
              :name="project.name"
              :description="project.description || ''"
            />
          </div>
        </div>
      </div>
      <!-- <div class="flex flex-col justify-start gap-y-4">
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
      </div> -->
    </div>
  </div>
  <Modal
    :is-open
    title="Criar projeto"
    @close="closeModal"
    @handle-close="closeModal"
  >
    <CreateProject
      :organization-id="id"
      @refresh-list="getProjects"
      @close-modal="closeModal"
    />
  </Modal>
</template>

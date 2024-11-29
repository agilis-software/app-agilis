<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useOrganizationStore } from '~/stores/organization'
import { Icon } from '@iconify/vue'

const route = useRoute()
const organizationStore = useOrganizationStore()
const { id } = route.params

const {
  execute: getOrganization,
  data: organizationData,
  isFetching: isLoadingOrganization,
} = organizationStore.getById(id as string)
getOrganization()

const organization = computed(() => {
  return organizationData.value ? organizationData.value.data : []
})

const activeTab = ref('configuracoes')
const switchTab = (tab: string) => {
  activeTab.value = tab
}

// Lista de membros da organização
const {
  execute: getMembers,
  data: membersData,
  isFetching: isLoadingMembers,
} = organizationStore.getMembersByOrganization(id as string)
getMembers()

const members = computed(() => {
  return membersData.value ? membersData.value.data : []
})

// Lista de projetos da organização
const {
  execute: getProjects,
  data: projectsData,
  isFetching: isLoadingProjects,
} = organizationStore.getProjects(id as string)
getProjects()

const projects = computed(() => {
  return projectsData.value ? projectsData.value.data : []
})

const selectedProject = ref({
  name: '',
  description: '',
  start_date: '',
  finish_date: '',
})

function selectProject(project: any) {
  selectedProject.value = project
}

function goBack() {
  selectedProject.value = { name: '', description: '', start_date: '', finish_date: '' }
}

// Delete modal
const isModalOpen = ref(false)
function openDeleteModal() {
  isModalOpen.value = true
}

function closeDeleteModal() {
  isModalOpen.value = false
}
</script>

<template>
  <div class="w-full pl-10 text-white">
    <div class="w-full flex flex-row items-center">
      <Icon
        class="text-electric-violet-400 rounded-full size-12 cursor-pointer transition-transform duration-300"
        icon="bx:left-arrow-alt"
        @click="goBack"
      />
      <h2 class="font-semibold text-3xl ml-4">{{ organization.name }}</h2>
    </div>

    <div class="border-b border-[#2F2C2C]">
      <div
        role="tablist"
        class="d-tabs d-tabs-lifted w-fit mt-10"
      >
        <a
          role="tab"
          class="ml-1"
          :class="[
            'd-tab text-white [--tab-border:none] border-0 w-full',
            activeTab === 'configuracoes' &&
              'd-tab-active [--tab-bg:#2F2C2C] [--tab-border-color:#2F2C2C] ml-4',
          ]"
          @click="switchTab('configuracoes')"
          >Configurações</a
        >
        <a
          role="tab"
          class="ml-3"
          :class="[
            'd-tab text-white [--tab-border:none] border-0 w-full',
            activeTab === 'projetos' &&
              'd-tab-active [--tab-bg:#2F2C2C] [--tab-border-color:#2F2C2C] ml-1',
          ]"
          @click="switchTab('projetos')"
          >Projetos</a
        >
      </div>
    </div>

    <div class="mt-8 text-xl">
      <div class="flex flex-row w-full">
        <!-- Tab de configurações -->
        <div
          v-if="activeTab === 'configuracoes'"
          class="flex flex-col w-[70%]"
        >
          <label class="font-semibold"> Nome da organização </label>
          <InputText v-model="organization.name" />
        </div>

        <div v-if="activeTab === 'projetos' && !selectedProject.name">
          <ul>
            <li
              v-for="project in projects"
              :key="project.id"
              @click="selectProject(project)"
              class="cursor-pointer m-6 flex items-center gap-4"
            >
              <Icon
                icon="tdesign:system-code"
                style="color: FFFFFF"
                class="size-8"
              />
              {{ project.name }}
            </li>
          </ul>
        </div>

        <div
          v-if="activeTab === 'configuracoes'"
          class="flex items-center justify-center ml-32"
        >
          <label class="font-semibold"> Arquivo </label>
        </div>

        <!-- Tab de Projetos -->
        <div
          v-if="activeTab === 'projetos' && selectedProject.name"
          class="flex w-full"
        >
          <div class="flex flex-col w-[70%]">
            <label class="font-semibold"> Nome do Projeto</label>
            <InputText v-model="selectedProject.name" />
          </div>

          <div class="flex flex-col items-center justify-center ml-auto">
            <label class="font-semibold"> Prefixo do projeto </label>
            <InputText />
          </div>
        </div>
      </div>

      <div
        v-if="activeTab === 'configuracoes' || selectedProject.name"
        class="mt-4 flex flex-row w-full"
      >
        <div class="w-full mr-20" v-if="activeTab === 'configuracoes'">
          <label class="font-semibold"> Descrição </label>
          <TextArea
            v-model="organization.description"
          />
        </div>
        
        <div class="w-full mr-20" v-if="activeTab === 'projetos'"> 
          <label class="font-semibold"> Descrição </label>
          <TextArea
            v-model="selectedProject.description"
          />
        </div>

        <div class="mr-6" v-if="activeTab === 'projetos' && selectedProject.name">
          <div>
            <label class="font-semibold text-sm"> Data de início </label>
            <InputDate v-model="selectedProject.start_date" />
          </div>

          <div>
            <label class="font-semibold text-sm"> Data final </label>
            <InputDate v-model="selectedProject.finish_date" />
          </div>
        </div>
      </div>

      <div
        v-if="activeTab === 'configuracoes' || selectedProject.name"
        class="mt-6"
      >
        <label class="font-semibold"> Membros </label>
        <div class="relative">
          <InputEmail placeholder="Informe o email do membro a ser convidado" />
          <Button>
            <Icon
              icon="material-symbols:add"
              style="color: #a865ff"
              class="size-8 absolute top-[0.3rem] right-2"
            />
          </Button>
        </div>

        <div
          class="w-full flex flex-col justify-center border-l-4 rounded border-[#2F2C2C]"
        >
          <div
            class="w-full h-56 overflow-y-scroll flex flex-col text-start scrollbar-thin scrollbar-thumb-[#4b4949] scrollbar-track-[#2f2c2c]"
          >
            <ul>
              <li
                class="p-2 pl-10 flex items-center gap-2"
                v-for="member in members"
                :key="member.id"
              >
                <img
                  :src="member.avatar_url"
                  class="w-8 h-8 rounded-full"
                />
                {{ member.name }}
                <span v-if="member.is_owner"> - Dono </span>
                <span v-else> - Membro </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        v-if="activeTab === 'configuracoes' || selectedProject.name"
        class="flex gap-4 mt-6"
      >
        <button
          class="flex w-32 justify-center rounded-md bg-electric-violet-500 px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-electric-violet-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-violet-600"
        >
          Salvar
        </button>
        <button
          class="flex w-32 justify-center rounded-md bg-[#2F2C2C] px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-violet-600"
          @click="openDeleteModal"
        >
          Excluir
        </button>
      </div>
    </div>
    <DeleteModal
      v-if="isModalOpen"
      @close="closeDeleteModal"
    />
  </div>
</template>

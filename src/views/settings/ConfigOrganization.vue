<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useOrganizationStore } from '~/stores/organization'

const route = useRoute()
const organizationStore = useOrganizationStore()
const { id } = route.params

const {
  execute: getOrganization,
  data: organizationData,
} = organizationStore.getById(id as string)

const currentOrganizationData = reactive({
  name: '',
  description: '',
})

getOrganization().then(() => {
  currentOrganizationData.name = organizationData.value.data.name
  currentOrganizationData.description = organizationData.value.data.description
})

const organization = computed(() => {
  return organizationData.value ? organizationData.value.data : []
})

const activeTab = ref('configuracoes')
function switchTab(tab: string) {
  activeTab.value = tab
}

// Lista de membros da organização
const {
  execute: getMembers,
  data: membersData,
} = organizationStore.getMembersByOrganization(id as string)
getMembers()

const members = computed(() => {
  return membersData.value ? membersData.value.data : []
})

// Lista de projetos da organização
const {
  execute: getProjects,
  data: projectsData,
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

const isModalOpen = ref(false)
function openDeleteModal() {
  isModalOpen.value = true
}

function closeDeleteModal() {
  isModalOpen.value = false
}

const email = ref('')

async function inviteUser() {
  const regex = /^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i

  if (!regex.test(email.value))
    return

  const { execute: invite }
    = organizationStore.invite(id as string, email.value)

  await invite()
  email.value = ''
  await getMembers()
}

const updating = ref(false)
async function updateOrganization() {
  if (updating.value)
    return

  updating.value = true

  const updateData = Object.fromEntries(
    Object.entries(currentOrganizationData)
      .filter(([_, value]) => value !== ''),
  )

  const { execute: update }
    = organizationStore.update(id as string, updateData)

  await update()
  await getOrganization()
  updating.value = false
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
      <h2 class="font-semibold text-3xl ml-4">
        {{ organization.name }}
      </h2>
    </div>

    <div class="border-b border-[#2F2C2C]">
      <div
        role="tablist"
        class="d-tabs d-tabs-lifted w-fit mt-10"
      >
        <a
          role="tab"
          class="ml-1 d-tab text-white [--tab-border:none] border-0 w-full"
          :class="[
            activeTab === 'configuracoes'
              && 'd-tab-active [--tab-bg:#2F2C2C] [--tab-border-color:#2F2C2C] ml-4',
          ]"
          @click="switchTab('configuracoes')"
        >Configurações</a>
        <a
          role="tab"
          class="ml-3 d-tab text-white [--tab-border:none] border-0 w-full"
          :class="[
            activeTab === 'projetos'
              && 'd-tab-active [--tab-bg:#2F2C2C] [--tab-border-color:#2F2C2C] ml-1',
          ]"
          @click="switchTab('projetos')"
        >Projetos</a>
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
          <InputText
            v-model="currentOrganizationData.name"
            name="name"
          />
        </div>

        <div v-if="activeTab === 'projetos' && !selectedProject.name">
          <ul>
            <li
              v-for="project in projects"
              :key="project.id"
              class="cursor-pointer m-6 flex items-center gap-4"
              @click="selectProject(project)"
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
            <InputText
              v-model="selectedProject.name"
              name="project_name"
            />
          </div>

          <!-- <div class="flex flex-col items-center justify-center ml-auto">
            <label class="font-semibold"> Prefixo do projeto </label>
            <InputText name/>
          </div> -->
        </div>
      </div>

      <div
        v-if="activeTab === 'configuracoes' || selectedProject.name"
        class="mt-4 flex flex-row w-full"
      >
        <div v-if="activeTab === 'configuracoes'" class="w-full mr-20">
          <label class="font-semibold"> Descrição </label>
          <TextArea
            v-model="currentOrganizationData.description"
            name="description"
          />
        </div>

        <div v-if="activeTab === 'projetos'" class="w-full mr-20">
          <label class="font-semibold"> Descrição </label>
          <TextArea
            v-model="selectedProject.description"
            name="project_description"
          />
        </div>

        <div v-if="activeTab === 'projetos' && selectedProject.name" class="mr-6">
          <div>
            <label class="font-semibold text-sm"> Data de início </label>
            <InputDate
              v-model="selectedProject.start_date"
              name="start_date"
            />
          </div>

          <div>
            <label class="font-semibold text-sm"> Data final </label>
            <InputDate
              v-model="selectedProject.finish_date"
              name="finish_date"
            />
          </div>
        </div>
      </div>

      <div
        v-if="activeTab === 'configuracoes' || selectedProject.name"
        class="mt-6"
      >
        <label class="font-semibold"> Membros </label>
        <div class="relative">
          <InputEmail
            v-model="email"
            name="new_user"
            placeholder="Informe o email do membro a ser convidado"
          />
          <Button>
            <Icon
              icon="material-symbols:add"
              style="color: #a865ff"
              class="size-8 absolute top-[0.3rem] right-2"
              @click="inviteUser"
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
                v-for="member in members"
                :key="member.id"
                class="p-2 pl-10 flex items-center gap-2"
              >
                <img
                  :src="member.avatar_url"
                  class="w-8 h-8 rounded-full"
                >
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
          :class="{ 'cursor-default opacity-50': updating }"
          @click="updateOrganization"
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
    <Modal
      :is-open="isModalOpen"
      title="Atenção!"
      @handle-close="closeDeleteModal"
    >
      <p>Tem certeza de que deseja excluir esta organização?</p>
      <div class="mt-4 flex justify-center gap-x-10">
        <Button>
          Não
        </Button>
        <Button
          class="bg-red-500"
          @click="closeDeleteModal"
        >
          Sim
        </Button>
      </div>
    </Modal>
  </div>
</template>

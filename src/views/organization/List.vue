<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, ref } from 'vue'
import router from '~/router'
import OrganizationCard from '~/blocks/OrganizationCard.vue'
import CreateOrganization from '~/views/organization/Create.vue'
import { useOrganizationStore } from '~/stores/organization'
import { useAuthStore } from '~/stores/auth'

const organizationStore = useOrganizationStore()
const authStore = useAuthStore()

const { execute: getOrganizations, data: organizationData, isFetching: isLoadingOrganization } = organizationStore.index()
const { execute: me, data: userData } = authStore.me()

getOrganizations()
me()

const organizations = computed(() => {
  return organizationData.value ? organizationData.value.data : []
})

const userId = computed(() => {
  return userData.value ? userData.value.data.id : 0
})

const isOpen = ref(false)

function openModal() {
  isOpen.value = true
}

function closeModal() {
  isOpen.value = false
}

function goToProjects(id: number) {
  if (!id) {
    return
  }

  organizationStore.setOrganizationId(id)

  router.push({ name: 'projects' })
}
</script>

<template>
  <div class="bg-[#201E1E] min-h-screen text-white">
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
          <div v-if="!organizations.length && !isLoadingOrganization">
            Você ainda não pertence à nenhuma organização.
          </div>
          <div
            v-if="isLoadingOrganization"
            class="w-full flex justify-center"
          >
            <Loading />
          </div>
          <OrganizationCard
            v-for="organization in organizations"
            :key="organization.title"
            :organization
            @click="goToProjects(organization.id)"
          />
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
    <CreateOrganization :owner-id="userId" />
  </Modal>
</template>

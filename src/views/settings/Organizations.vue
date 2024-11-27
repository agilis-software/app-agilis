<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { useOrganizationStore } from '~/stores/organization'

const organizationStore = useOrganizationStore()

const {
  execute: getOrganizations,
  data: organizationData,
  isFetching: isLoadingOrganization,
} = organizationStore.index()
getOrganizations()

const organizations = computed(() => {
  return organizationData.value ? organizationData.value.data : []
})
</script>

<template>
  <div class="ml-16 mt-10 border-b border-[#2F2C2C] pb-3">
    <h1 class="text-white font-bold text-4xl">Suas organizações</h1>
  </div>
  <div
    v-if="isLoadingOrganization"
    class="w-full flex justify-center"
  ></div>
  <div v-else>
    <ul
      v-if="organizations.length"
      class="mt-8"
    >
      <li
        v-for="organization in organizations"
        :key="organization.id"
        class="p-4 flex justify-between items-center"
      >
        <div class="flex items-center space-x-4 ml-16">
          <Icon
            icon="heroicons-solid:office-building"
            class="size-12 text-white"
          />
          <h2 class="text-2xl font-semibold text-white">
            {{ organization.name }}
          </h2>
        </div>
      </li>
    </ul>
    <div
      v-else
      class="text-gray-400 text-left ml-16 mt-10"
    >
      Você ainda não pertence a nenhuma organização.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
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
</script>

<template>
  <div class="w-full p-10 text-white">
    <div class="w-full flex flex-row items-center">
      <Icon
        class="text-electric-violet-400 rounded-full size-12 cursor-pointer transition-transform duration-300"
        icon="bx:left-arrow-alt"
      />
      <h2 class="font-semibold text-3xl ml-4">{{ organization.name }}</h2>
    </div>

    <div class="border-b border-[#2F2C2C]">
      <div
        role="tablist"
        class="d-tabs d-tabs-lifted w-fit mt-10"
      >
        <!-- Colocar borda depois de colocar a função pro tab active -->
        <a
          role="tab"
          class="d-tab text-white [--tab-border:none] border-0"
          >Configurações</a
        >
        <a
          role="tab"
          class="d-tab text-white d-tab-active [--tab-bg:#2F2C2C] [--tab-border-color:#2F2C2C]"
          >Projetos</a
        >
      </div>
    </div>

    <div class="mt-10 text-xl">
      <div>
        <label class="font-semibold"> Nome da organização </label>
        <InputText v-model="organization.name" />
      </div>

      <div class="mt-10">
        <label class="font-semibold"> Descrição </label>
        <TextArea v-model="organization.description" />
      </div>

      <div class="mt-10">
        <label class="mt-10"> Membros </label>
        <InputEmail />

        <div class="w-full flex flex-col justify-center">
          <div class="w-full h-36 overflow-auto flex flex-col text-start">
            <p class="p-2 pl-10">Gabriel Botan</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

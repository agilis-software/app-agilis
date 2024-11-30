<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAuthStore } from '~/stores/auth'
import { useOrganizationStore } from '~/stores/organization'

const route = useRoute()
const authStore = useAuthStore()
const organizationStore = useOrganizationStore()

const organizationId = computed(() => route.params.organizationId)

const { execute: me, data: userData }
  = authStore.me()

const { execute: getOrganizationInfo, data: organizationData }
  = organizationStore.getCurrentOrganization(Number(organizationId.value))

const { execute: getOrganizationUsers, data: organizationUsers }
  = organizationStore.getMembersByOrganization(organizationId.value as string)

me()
getOrganizationInfo()
getOrganizationUsers()

const organization = computed(() => organizationData.value ? organizationData.value.data : null)

const user = computed(() => userData.value ? userData.value.data : null)
const users = computed(() => organizationUsers.value ? organizationUsers.value.data : null)
</script>

<template>
  <div class="flex flex-col gap-4 h-full">
    <RouterLink to="/organizations">
      <div class="flex justify-center items-center">
        <Icon
          icon="bx:left-arrow-alt"
          class="size-6 text-electric-violet-400"
        />
        <p class="text-white text-sm truncate">
          Voltar para organizações
        </p>
      </div>
    </RouterLink>

    <div
      class="relative flex justify-center items-center my-6 border-b-electric-violet-500 border-b-2 py-8"
    >
      <div
        class="absolute inset-0"
      >
        <Icon
          icon="mdi:bell"
          class="size-6 text-electric-violet-400"
        />
      </div>
      <h1 v-if="organization" class="text-xl text-white font-semibold">
        {{ organization.name }}
      </h1>
      <hr v-else class="border-none bg-white/20 h-7 w-28 rounded-lg animate-pulse">
    </div>

    <div>
      <div class="flex items-center my-3 gap-2">
        <Icon
          icon="ri:group-line"
          class="size-6 text-electric-violet-500"
        />
        <h2 class="text-lg text-white font-semibold">
          Membros
        </h2>
      </div>
      <div v-if="users" class="px-2 flex flex-col gap-2">
        <div
          v-for="(member, index) in users"
          :key="index"
        >
          <div v-if="member.id === user?.id">
            <div class="flex items-center gap-2">
              <div class="size-6">
                <img
                  :src="member.avatar_url"
                  class="rounded-full"
                  loading="lazy"
                >
              </div>
              <p class="text-white text-sm truncate border-b border-neutral-500">
                {{ member.name }}
              </p>

              <div v-if="member.is_owner">
                <Icon
                  icon="bx:bxs-crown"
                  class="size-4 text-yellow-500"
                />
              </div>
            </div>
          </div>
          <RouterLink v-else :to="`/organizations/${organizationId}/chats/${member.id}`">
            <div class="flex items-center gap-2">
              <div class="size-6">
                <img
                  :src="member.avatar_url"
                  class="rounded-full"
                >
              </div>

              <p class="text-white text-sm truncate">
                {{ member.name }}
              </p>

              <div v-if="member.is_owner">
                <Icon
                  icon="bx:bxs-crown"
                  class="size-4 text-yellow-500"
                />
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
      <hr v-else class="mx-2 border-none bg-white/20 h-7 w-40 rounded-lg animate-pulse">
    </div>
  </div>
</template>

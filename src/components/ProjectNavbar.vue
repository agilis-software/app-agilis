<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useProjectStore } from '~/stores/project'
import router from '~/router'
import { useAuthStore } from '~/stores/auth'

const route = useRoute()
const projectStore = useProjectStore()
const authStore = useAuthStore()

const organizationId = computed(() => route.params.organizationId)
const projectId = computed(() => route.params.projectId)

const { execute: me, data: userData }
  = authStore.me()

const { execute: getProjectInfo, data: projectData }
= projectStore.show(Number(organizationId.value), Number(projectId.value))

const { execute: getProjectMembers, data: projectMemberData }
  = projectStore.getMembers(Number(organizationId.value), Number(projectId.value))

me()
getProjectInfo()
getProjectMembers()

const user = computed(() => userData.value ? userData.value.data : null)
const project = computed(() => projectData.value ? projectData.value.data : null)
const projectMembers = computed(() => projectMemberData.value ? projectMemberData.value.data : null)

function goToKanban() {
  router.push({ name: 'kanban', params: { organizationId: organizationId.value, projectId: projectId.value } })
}
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
      class="relative flex justify-center items-center my-6 border-b-electric-violet-500"
    >
      <h1 v-if="project" class="text-xl text-white font-semibold truncate">
        {{ project.name }}
      </h1>
      <hr v-else class="border-none bg-white/20 h-7 w-28 rounded-lg animate-pulse">
    </div>

    <div>
      <div
        class="border-y-2 border-y-electric-violet-500 flex flex-col justify-start items-start p-4 gap-4"
      >
        <div
          class="flex justify-start items-center gap-2 cursor-pointer"
          @click="goToKanban"
        >
          <Icon
            icon="bi:kanban"
            class="size-6 text-electric-violet-500"
          />
          <p class="text-white">
            Quadro
          </p>
        </div>
      </div>
    </div>

    <div v-if="projectMembers" class="px-2 flex flex-col gap-2">
      <div
        v-for="(member, index) in projectMembers"
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
  </div>
</template>

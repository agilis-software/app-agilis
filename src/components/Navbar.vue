<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { chatList } from '~/static/chatList'
import { projectMemberList } from '~/static/projectMemberList'

const route = useRoute()

const routePath = computed(() => route.path)

const chats = ref(chatList)

const members = ref(projectMemberList)
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
      :class="{ 'border-b-2 py-8': routePath === '/projects' }"
    >
      <div
        v-if="routePath === '/projects'"
        class="absolute inset-0"
      >
        <Icon
          icon="mdi:bell"
          class="size-6 text-electric-violet-400"
        />
      </div>
      <h1 class="text-xl text-white font-semibold">
        {{ routePath === '/projects' ? 'Fatec Jahu' : 'Projeto Integrador' }}
      </h1>
    </div>

    <div v-if="routePath !== '/projects'">
      <div
        class="border-y-2 border-y-electric-violet-500 flex flex-col justify-start items-start p-4 gap-4"
      >
        <RouterLink to="/backlog">
          <div class="flex justify-start items-center gap-2">
            <Icon
              icon="fluent:list-rtl-16-filled"
              class="size-6 text-electric-violet-500"
            />
            <p class="text-white">
              Backlog
            </p>
          </div>
        </RouterLink>
        <RouterLink to="/kanban">
          <div class="flex justify-start items-center gap-2">
            <Icon
              icon="bi:kanban"
              class="size-6 text-electric-violet-500"
            />
            <p class="text-white">
              Quadro
            </p>
          </div>
        </RouterLink>
      </div>
    </div>

    <div v-if="routePath !== '/projects'">
      <div class="flex items-center my-3 gap-2">
        <Icon
          icon="tdesign:chat-double"
          class="size-6 text-electric-violet-500"
        />
        <h2 class="text-lg text-white font-semibold">
          Canais
        </h2>
      </div>
      <div class="px-2 flex flex-col gap-2">
        <template
          v-for="(chat, index) in chats"
          :key="index"
        >
          <RouterLink :to="`/projects/1/chats/${chat.id}`">
            <div class="flex items-center gap-1">
              <Icon
                icon="ph:hash"
                class="size-6 text-neutral-400"
              />
              <p class="text-white text-sm">
                {{ chat.name }}
              </p>
            </div>
          </RouterLink>
        </template>
      </div>
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
      <div class="px-2 flex flex-col gap-2">
        <template
          v-for="(member, index) in members"
          :key="index"
        >
          <RouterLink :to="`/projects/1/chats/${member.chatId}`">
            <div class="flex items-center gap-2">
              <div class="size-6">
                <img
                  :src="member.icon"
                  class="rounded-full"
                >
              </div>
              <p class="text-white text-sm">
                {{ member.name }}
              </p>

              <div
                v-if="member.messages > 0"
                class="rounded-full size-5 bg-electric-violet-400 flex justify-center items-center"
              >
                <span class="text-white text-sm">{{ member.messages }}</span>
              </div>
            </div>
          </RouterLink>
        </template>
      </div>
    </div>

    <div v-if="routePath === '/projects'" class="absolute bottom-0 w-full">
      <div class="flex justify-center items-center gap-2 w-fit">
        <Icon
          icon="mdi:gear"
          class="size-6 text-electric-violet-400"
        />
        <p class="text-white font-semibold">
          Configurações
        </p>
      </div>
    </div>
  </div>
</template>

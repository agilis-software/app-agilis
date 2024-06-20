<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const chats = ref([
  {
    id: 1,
    name: 'Geral',
    canAccess: true,
  },
  {
    id: 2,
    name: 'Time Dev',
    canAccess: true,
  },
  {
    id: 3,
    name: 'Time Produto',
    canAccess: false,
  },
])

const members = ref([
  {
    id: 1,
    name: 'Bianca Morais',
    icon: new URL('~/assets/img/bianca.jpg', import.meta.url).href,
    chatId: 4,
    messages: 0,
  },
  {
    id: 2,
    name: 'Eduardo Frasson',
    icon: new URL('~/assets/img/eduardo.jpg', import.meta.url).href,
    chatId: 5,
    messages: 9,
  },
  {
    id: 3,
    name: 'Leonardo Luzetti',
    icon: new URL('~/assets/img/leonardo.jpg', import.meta.url).href,
    chatId: 6,
    messages: 0,
  },
  {
    id: 4,
    name: 'Lucas Alencar',
    icon: new URL('~/assets/img/lucas.jpg', import.meta.url).href,
    chatId: 7,
    messages: 0,
  },
  {
    id: 5,
    name: 'Victor Vendrameto',
    icon: new URL('~/assets/img/victor.jpg', import.meta.url).href,
    chatId: 8,
    messages: 0,
  },
])
</script>

<template>
  <div class="flex flex-col gap-4">
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

    <div class="flex justify-center items-center my-6">
      <h1 class="text-xl text-white font-semibold">
        Projeto Integrador
      </h1>
    </div>

    <div>
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
        <RouterLink to="/board">
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

    <div>
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import MessageCard from '~/components/MessageCard.vue'

const messageContainer = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (messageContainer.value) {
    messageContainer.value.scrollTop
      = messageContainer.value.scrollHeight - messageContainer.value.clientHeight
  }
})

const userId = ref(5)

const messages = ref([
  {
    author: {
      id: 1,
      avatarUrl: new URL('~/assets/img/eduardo.jpg', import.meta.url).href,
      name: 'Eduardo Frasson Domine',
      online: true,
    },
    text: 'Oi pessoal, tudo bem com vocês?',
    createdAt: new Date(2024, 5, 18, 21, 19, 45),
  },
  {
    author: {
      id: 2,
      avatarUrl: new URL('~/assets/img/leonardo.jpg', import.meta.url).href,
      name: 'Leonardo Luzetti',
      online: true,
    },
    text: 'sim!',
    createdAt: new Date(2024, 5, 18, 21, 20, 1),
  },
  {
    author: {
      id: 3,
      avatarUrl: new URL('~/assets/img/victor.jpg', import.meta.url).href,
      name: 'Victor Vendrameto',
      online: true,
    },
    text: 'Sim, vai ter reunião hoje?',
    createdAt: new Date(2024, 5, 18, 21, 22, 7),
  },
  {
    author: {
      id: 4,
      avatarUrl: new URL('~/assets/img/lucas.jpg', import.meta.url).href,
      name: 'Lucas Alencar',
      online: false,
    },
    text: 'A daily vai ser às 11:30',
    createdAt: new Date(2024, 5, 18, 21, 24, 0),
  },
  {
    author: {
      id: 5,
      avatarUrl: new URL('~/assets/img/bianca.jpg', import.meta.url).href,
      name: 'Bianca Morais',
      online: true,
    },
    text: 'Ok!',
    createdAt: new Date(2024, 5, 18, 21, 24, 0),
  },
  {
    author: {
      id: 1,
      avatarUrl: new URL('~/assets/img/eduardo.jpg', import.meta.url).href,
      name: 'Eduardo Frasson Domine',
      online: true,
    },
    text: 'lucas abre o PR',
    createdAt: new Date(2024, 5, 18, 21, 25, 47),
  },
  {
    author: {
      id: 1,
      avatarUrl: new URL('~/assets/img/lucas.jpg', import.meta.url).href,
      name: 'Lucas de Alencar Gomes',
      online: false,
    },
    text: 'blz',
    createdAt: new Date(2024, 5, 18, 21, 28, 59),
  },
  {
    author: {
      id: 3,
      avatarUrl: new URL('~/assets/img/victor.jpg', import.meta.url).href,
      name: 'Victor Vendrameto',
      online: true,
    },
    text: 'deve ser muito ruim não conseguir organizar os projetos e conversar em um lugar só',
    createdAt: new Date(2024, 5, 18, 21, 30, 7),
  },
])
</script>

<template>
  <!-- Principal -->
  <div class="-my-8 h-screen flex flex-col">
    <!-- Barra fixa do chat -->
    <div
      class="sticky top-0 flex items-center border-b border-b-neutral-600 py-6"
    >
      <h1 class="text-white text-2xl font-semibold">
        # Geral
      </h1>
    </div>

    <!-- Lista de mensagens -->
    <div
      ref="messageContainer"
      class="flex-1 overflow-y-auto scrollbar scrollbar-thumb-neutral-900"
    >
      <div class="flex flex-col gap-4">
        <div class="flex justify-center items-center gap-2">
          <hr class="my-2 w-full border-neutral-600">
          <p class="text-neutral-200 w-[25%] text-center">
            <span>10/06/2024</span>
            <br>
            <span>Segunda-feira</span>
          </p>
          <hr class="my-2 w-full border-neutral-600">
        </div>

        <div class="flex flex-col justify-start gap-4 px-2">
          <template
            v-for="(message, index) in messages"
            :key="index"
          >
            <div
              :class="{
                'self-end': message.author.id === userId,
                'self-start': message.author.id !== userId,
              }"
            >
              <MessageCard
                :author="message.author"
                :created-at="message.createdAt"
                :text="message.text"
                :current-user="message.author.id === userId"
              />
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Input de mensagem -->
    <div class="flex items-center py-4">
      <div
        class="w-full rounded-lg border bg-neutral-800 border-neutral-600 flex justify-center items-center px-2"
      >
        <div>
          <Icon
            icon="heroicons:paper-clip"
            class="size-6 text-electric-violet-400"
          />
        </div>
        <input
          class="w-full rounded-lg text-white bg-transparent p-3 placeholder-neutral-500 outline-none focus:border focus:border-electric-violet-500"
          placeholder="Digite sua mensagem..."
        >
        <div class="flex justify-center items-center gap-2">
          <Icon
            icon="mdi:emoji"
            class="size-6 text-electric-violet-400"
          />
          <Icon
            icon="ion:paper-plane"
            class="size-6 text-electric-violet-400"
          />
        </div>
      </div>
    </div>
  </div>
</template>

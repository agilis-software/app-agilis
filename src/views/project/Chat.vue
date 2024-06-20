<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import MessageCard from '~/components/MessageCard.vue'
import { messageList } from '~/static/messageList'

const messageContainer = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (messageContainer.value) {
    messageContainer.value.scrollTop
      = messageContainer.value.scrollHeight - messageContainer.value.clientHeight
  }
})

const userId = ref(5)

const messages = ref(messageList)
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
          <div
            v-for="(message, i) in messages"
            :key="i"
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

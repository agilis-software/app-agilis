<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import MessageCard from '~/blocks/MessageCard.vue'
import type { Message } from '~/models/Message'
import { useAuthStore } from '~/stores/auth'
import { useMessageStore } from '~/stores/message'
import { useOrganizationStore } from '~/stores/organization'
import { useSocketStore } from '~/stores/socket'

const messageContainer = ref<HTMLDivElement | null>(null)
const messageContent = ref('')
const inputFocused = ref(false)
const messages = ref<Message[]>([])

const authStore = useAuthStore()
const messageStore = useMessageStore()
const socketStore = useSocketStore()
const organizationStore = useOrganizationStore()

const route = useRoute()
const { organizationId, receiverId } = route.params

const { execute: me, data: userData } = authStore.me()
const { execute: getMessages, data: messageData } = messageStore.index(receiverId as string)
const { execute: getReceiver, data: receiverData } = organizationStore.getParticipantByOrganization(
  organizationId.toString(),
  receiverId.toString(),
)

const user = computed(() => (userData.value ? userData.value.data : null))
const receiver = computed(() => (receiverData.value ? receiverData.value.data : null))
const messageList = computed(() => (messageData.value ? messageData.value.data : []))

function initializeSocket() {
  socketStore.connect({ auth: { token: authStore.token } })
  socketStore.listen('message', async (message: Message) => {
    messages.value = [...messageList.value, message]
    await nextTick()
    scrollToBottom()
  })
}

function scrollToBottom() {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight - messageContainer.value.clientHeight
  }
}

async function fetchData() {
  await me()
  await getReceiver()
  await getMessages()
  await nextTick()
  scrollToBottom()
}

function send() {
  if (messageContent.value === '')
    return

  const { execute: sendMessage } = messageStore.create(receiverId as string, { content: messageContent.value })
  messageContent.value = ''
  sendMessage()
}

watch(messageList, async (newMessages) => {
  messages.value = newMessages
  await nextTick()
  scrollToBottom()
})

onMounted(async () => {
  initializeSocket()
  await fetchData()
})
</script>

<template>
  <!-- Principal -->
  <div class="-my-8 h-screen flex flex-col">
    <!-- Barra fixa do chat -->
    <div
      class="sticky top-0 flex items-center border-b border-b-neutral-600 py-6"
    >
      <h1
        v-if="receiver"
        class="text-white text-2xl font-semibold"
      >
        {{ `Conversa com ${receiver.name}` }}
      </h1>
      <hr
        v-else
        class="w-56 h-8 bg-white/20 animate-pulse border-none rounded-lg"
      >
    </div>

    <!-- Lista de mensagens -->
    <div
      ref="messageContainer"
      class="flex-1 overflow-y-auto scrollbar scrollbar-thumb-neutral-900"
    >
      <div class="flex flex-col gap-4 py-2">
        <div class="flex flex-col justify-start gap-4 px-2">
          <div
            v-for="(message, i) in messages"
            :key="i"
            :class="{
              'self-end': message.sender.id === user?.id,
              'self-start': message.sender.id !== user?.id,
            }"
          >
            <MessageCard
              :author="message.sender"
              :created-at="message.created_at"
              :text="message.content"
              :current-user="message.sender.id === user?.id"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Input de mensagem -->
    <div class="flex items-center py-4">
      <div
        class="w-full rounded-lg border bg-neutral-800 border-neutral-600 flex justify-center items-center px-2"
        :class="{ 'border border-electric-violet-500': inputFocused }"
      >
        <div>
          <Icon
            icon="heroicons:paper-clip"
            class="size-6 text-electric-violet-400"
          />
        </div>
        <input
          v-model="messageContent"
          class="w-full rounded-lg text-white bg-transparent p-3 placeholder-neutral-500 outline-none"
          placeholder="Digite sua mensagem..."
          @focus="inputFocused = true"
          @blur="inputFocused = false"
        >
        <div class="flex justify-center items-center gap-2">
          <Icon
            icon="mdi:emoji"
            class="size-6 text-electric-violet-400"
          />
          <Icon
            icon="ion:paper-plane"
            class="size-6 text-electric-violet-400 hover:cursor-pointer"
            @click="send"
          />
        </div>
      </div>
    </div>
  </div>
</template>

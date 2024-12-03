<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { Message } from '~/models/Message'
import { useAuthStore } from '~/stores/auth'
import { useSocketStore } from '~/stores/socket'

const socketStore = useSocketStore()
const authStore = useAuthStore()

socketStore.connect({
  auth: {
    token: authStore.token,
  },
})

const { execute: me, data: userData }
  = authStore.me()

const user = computed(() => {
  return userData.value ? userData.value.data : null
})

me().then(() => {
  listenMessages()
})

type MessageNotification = Message & { visible: boolean }

const notifications = reactive<MessageNotification[]>([])

function listenMessages() {
  socketStore.listen('message', (message: Message) => {
    if (user.value?.id === message.sender.id)
      return
    const notification = {
      ...message,
      visible: true,
    }

    notifications.push(notification)

    setTimeout(() => {
      notifications.splice(notifications.indexOf(notification), 1)
    }, 3000)
  })
}
</script>

<template>
  <Notification
    v-for="(message, index) in notifications"
    :key="index"
    :notification="{
      title: message.sender.name,
      description: 'Te enviou uma mensagem',
      content: message.content,
      photo: message.sender.avatar_url,
      visible: message.visible,
    }"
  />
  <div class="bg-[#201E1E] min-h-screen w-full flex">
    <Sidebar />
    <div class="md:ml-8 py-8 px-16 w-full">
      <RouterView />
    </div>
  </div>
</template>

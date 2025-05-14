<script setup lang="ts">
interface NotificationProps {
  notification: {
    title: string
    description: string
    content: string
    photo: string
    visible: boolean
  }
}

defineProps<NotificationProps>()
</script>

<template>
  <div
    v-if="notification.visible"
    class="fixed bottom-5 right-5 bg-neutral-800 text-white p-4 rounded-lg w-80 shadow-lg z-50 border border-electric-violet-500 animate-fade-in"
  >
    <div class="flex items-center">
      <img
        :src="notification.photo"
        alt="Notification Image"
        class="size-14 rounded-full mr-4"
      >
      <div class="flex-1">
        <h4 class="text-lg font-bold">
          {{ notification.title }}
        </h4>
        <p class="text-sm text-gray-300">
          {{ notification.description }}
        </p>
        <p class="text-sm text-gray-300 mt-2 font-semibold w-56 text-clip line-clamp-1">
          {{ notification.content }}
        </p>
      </div>
    </div>
  </div>
</template>

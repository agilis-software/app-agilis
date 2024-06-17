<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  organization: {
    title: string
    description: string
    createdAt: Date
  }
}>()
</script>

<template>
  <div
    class="bg-eerie-black-500 w-52 rounded-md pt-6 pb-2 px-2 flex flex-col justify-between cursor-pointer hover:opacity-75 transition-opacity duration-200"
  >
    <div class="flex flex-col justify-center items-center">
      <Icon
        icon="bx:group"
        class="size-20 text-white"
      />

      <h1 class="text-white text-center text-lg font-semibold truncate w-full">
        {{ organization.title }}
      </h1>

      <p
        class="text-neutral-400 truncate text-sm w-full line-clamp-2 text-center text-wrap"
      >
        {{ organization.description }}
      </p>
    </div>

    <div class="mt-4 flex items-center gap-1">
      <Icon
        icon="bx:calendar"
        class="size-6 text-neutral-400"
      />

      <span class="text-sm text-neutral-400">{{
        organization.createdAt.toLocaleDateString()
      }}</span>
    </div>
  </div>
</template>

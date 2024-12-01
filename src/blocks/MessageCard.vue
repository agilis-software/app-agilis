<script setup lang="ts">
import type { User } from '~/models/Auth'

const { currentUser, author, text, createdAt } = defineProps<{
  currentUser: boolean
  author: Pick<User, 'name' | 'avatar_url'>
  text: string
  createdAt: string
}>()

const formattedTime = new Intl.DateTimeFormat('default', {
  hour: '2-digit',
  minute: '2-digit',
}).format(new Date(createdAt))
</script>

<template>
  <div class="flex gap-4">
    <div class="size-6 relative">
      <img
        :src="author.avatar_url"
        class="rounded-full"
      >
    </div>

    <div class="flex flex-col justify-start">
      <p class="text-white font-semibold text-lg">
        <span>{{ author.name }}</span>

        <span
          v-if="currentUser"
          class="font-normal text-sm text-neutral-300 ml-2"
        >
          (você)
        </span>
      </p>

      <div :class="`flex ${currentUser ? 'flex-row-reverse' : 'flex-row'} gap-2`">
        <div
          :class="currentUser ? 'rounded-tr-none justify-self-end' : 'rounded-tl-none'"
          class="w-fit max-w-64 h-fit p-2 bg-neutral-600 flex justify-start items-center rounded-lg"
        >
          <p class="text-neutral-200 whitespace-pre-line">
            {{ text }}
          </p>
        </div>
        <div class="self-end">
          <span class="text-neutral-400 text-sm">{{ formattedTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

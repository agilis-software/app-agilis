<script setup lang="ts">
import type { Task } from '~/models/Task'
import defaultUserImg from '~/assets/img/default-user-icon.svg'
import { addDateMask } from '~/utils/formatDate'

interface Props {
  task: Task
}

const props = defineProps<Props>()

const { title, due_date, id, assignee } = props.task
</script>

<template>
  <div class="w-56 h-22 rounded bg-[#5C5C5C] cursor-pointer flex mb-4">
    <div class="p-4 flex flex-row w-full">
      <div class="w-[80%]">
        <h3 class="text-md font-bold">
          {{ title }}
        </h3>
        <div class="text-xs flex flex-col gap-y-1">
          <p>
            {{ addDateMask(due_date) }}
          </p>
          <p class="font-bold">
            {{ id }}
          </p>
        </div>
      </div>
      <div class="w-[20%] flex items-end justify-end">
        <img
          v-if="assignee"
          :src="assignee.avatar_url"
          alt="task-collaborator-image"
          class="size-8 rounded-full"
        >
        <img
          v-else
          :src="defaultUserImg"
          alt="task-collaborator-image"
          class="size-8 rounded-full text-white"
        >
      </div>
    </div>
  </div>
</template>

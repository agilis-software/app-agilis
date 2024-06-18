<script setup lang="ts">
interface Props {
  title: string
  date: string
  taskId?: string
  imageSource?: string
}

defineProps<Props>()
</script>

<template>
  <div class="w-56 h-22 rounded bg-[#5C5C5C] cursor-pointer flex">
    <div class="p-4 flex flex-row w-full">
      <div class="w-[80%]">
        <h3 class="text-md font-bold">
          {{ title }}
        </h3>
        <div class="text-xs flex flex-col gap-y-1">
          <p>
            {{ date }}
          </p>
          <p class="font-bold">
            {{ taskId }}
          </p>
        </div>
      </div>
      <div class="w-[20%] flex items-end justify-end">
        <img
          :src="imageSource"
          alt="task-collaborator-image"
          class="size-8 rounded-full"
        >
      </div>
    </div>
  </div>
</template>

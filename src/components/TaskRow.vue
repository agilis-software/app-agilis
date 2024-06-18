<script setup lang="ts">
interface Props {
  taskId: string
  title: string
  imageSource: string
}

defineProps<Props>()
</script>

<template>
  <div
    class="cursor-pointer w-full bg-[#5C5C5C] flex px-4 py-2 gap-x-5 items-center rounded-lg justify-between"
  >
    <div class="flex gap-x-8">
      <div class="text-bold">
        {{ taskId }}
      </div>
      <div>
        {{ title }}
      </div>
    </div>

    <div class="flex gap-x-8">
      <select class="bg-[#505050] px-3 py-1 rounded w-32" name="status">
        <option value="backlog">Backlog</option>
        <option value="to-do">To-Do</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>

      <div class="flex items-end justify-end">
        <img
          :src="imageSource"
          alt="task-collaborator-image"
          class="size-8 rounded-full"
        />
      </div>
    </div>
  </div>
</template>

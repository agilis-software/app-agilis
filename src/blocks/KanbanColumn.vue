<script setup lang="ts">
interface Props {
  title: string
}

defineProps<Props>()
</script>

<template>
  <div class="bg-[#2C2A2A] w-68 rounded-lg p-5 h-fit">
    <div class="text-xl font-bold">
      {{ title }}
    </div>
    <div class="mt-2 gap-y-2 flex flex-col">
      <slot />
    </div>
    <slot name="newTask" />
  </div>
</template>

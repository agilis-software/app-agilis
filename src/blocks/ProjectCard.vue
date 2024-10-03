<script setup lang="ts">
interface Props {
  title: string
  description: string
}

defineProps<Props>()
</script>

<template>
  <div class="size-48 rounded bg-[#2F2C2C] cursor-pointer">
    <div class="flex justify-start items-center h-12 mt-2 relative">
      <IconProject class="ml-2 absolute" />
      <hr class="w-full border border-[#201E1E]">
    </div>
    <div class="px-4 py-1">
      <h3 class="text-sm mt-3 font-bold ">
        {{ title }}
      </h3>
      <p class="text-xs mt-3">
        {{ description }}
      </p>
    </div>
  </div>
</template>

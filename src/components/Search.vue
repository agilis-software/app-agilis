<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="flex items-center">
    <Icon class="absolute ml-4" icon="bx:search" />
    <input
      class="pl-12 border shadow-sm focus:ring-[#8d00ec] p-2 bg-[#2C2A2A] focus:border-[#8d00ec] block w-full sm:text-md border-[#5C5C5C] rounded-md"
    >
  </div>
</template>

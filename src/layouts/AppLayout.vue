<script setup lang="ts">
import Sidebar from '~/components/Sidebar.vue'
</script>

<template>
  <div class="bg-[#201E1E] min-h-screen w-full flex">
    <div>
      <Sidebar />
    </div>
    <div class="ml-8 p-8 w-full">
      <RouterView />
    </div>
  </div>
</template>

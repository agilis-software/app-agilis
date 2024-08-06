<script setup lang="ts">
import Sidebar from '~/components/Sidebar.vue'
</script>

<template>
  <div class="bg-[#201E1E] min-h-screen w-full flex">
    <Sidebar />
    <div class="md:ml-8 py-8 px-16 w-full">
      <RouterView />
    </div>
  </div>
</template>

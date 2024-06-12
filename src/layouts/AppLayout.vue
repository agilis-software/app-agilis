<script setup lang="ts">
import Sidebar from '~/components/Sidebar.vue'
</script>

<template>
  <div class="bg-[#201E1E] min-h-screen">
    <div>
      <Sidebar />
    </div>
    <div class="ml-8 p-8">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const sidebarActive = ref(false)

function handleSidebar() {
  sidebarActive.value = !sidebarActive.value
}
</script>

<template>
  <div
    :class="`hidden md:flex w-8 ${
      sidebarActive ? 'md:w-64' : 'md:w-8'
    } md:flex-col md:fixed md:inset-y-0 transition-all absolute`"
    @mouseover="handleSidebar"
    @mouseout="handleSidebar"
  >
    <div class="flex-1 flex flex-col min-h-0 bg-[#2F2C2C] relative">
      <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div
          :class="`flex justify-end absolute ${
            sidebarActive ? 'left-60 ml-1' : 'left-5'
          } z-10`"
        >
          <button
            type="button"
            @click="handleSidebar"
            @mouseover="''"
          >
            <Icon
              class="bg-[#8D00EE] text-white rounded-full size-5 cursor-pointer transition-all"
              :icon="sidebarActive ? 'bx:left-arrow-alt' : 'bx:right-arrow-alt'"
            />

            <div
              v-if="sidebarActive"
              @mouseover="handleSidebar"
            >
              <!-- Logo aqui -->
              <!-- <Navbar /> -->
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

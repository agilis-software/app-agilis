<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const sidebarActive = ref(false)

function handleSidebar() {
  sidebarActive.value = !sidebarActive.value
}
</script>

<template>
  <div>
    <div
      :class="`hidden md:flex ${
        sidebarActive ? 'md:w-64' : 'md:w-8'
      } md:flex-col md:fixed md:inset-y-0 transition-all absolute` "
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
                :icon="
                  sidebarActive ? 'bx:left-arrow-alt' : 'bx:right-arrow-alt'
                "
              />

              <div v-if="sidebarActive" @mouseover="handleSidebar">
                <!-- Logo aqui -->
                <!-- <Navbar /> -->
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="md:pl-64 flex flex-col flex-1">
      <div class="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
        <button
          type="button"
          class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-emerald-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <span class="sr-only">Open sidebar</span>
          <Icon
            icon="bx:menu"
            aria-hidden="true"
            class="size-6"
          />
        </button>
      </div>
      <div class="relative">
        teste
      </div>
      <!-- <RouterView /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, ref } from 'vue'

const sidebarActive = ref(false)

function handleSidebar() {
  sidebarActive.value = !sidebarActive.value
}

const containerStyle = computed(() => {
  return sidebarActive.value ? 'w-64 shadow shadow-black/15' : 'w-8'
})

const navbarContainerStyle = computed(() => {
  return sidebarActive.value ? 'opacity-100 duration-200' : 'opacity-0 -translate-x-12'
})

const iconContainerStyle = computed(() => {
  return sidebarActive.value ? 'left-60 ml-1' : 'left-5'
})

const iconStyle = computed(() => {
  return sidebarActive.value ? 'rotate-0' : 'rotate-180'
})
</script>

<template>
  <div
    :class="containerStyle"
    class="hidden md:flex md:flex-col md:fixed md:inset-y-0 transition-all absolute z-20"
    @mouseover="() => sidebarActive = true"
    @mouseout="() => sidebarActive = false"
  >
    <div
      class="flex-1 flex flex-col min-h-0 bg-[#2F2C2C] relative items-center"
    >
      <div
        :class="navbarContainerStyle"
        class="p-2 transition-all transform h-full"
      >
        <Navbar />
      </div>

      <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div
          :class="iconContainerStyle"
          class="transition-all absolute top-4 flex z-10"
        >
          <button
            type="button"
            @click="handleSidebar"
          >
            <Icon
              :class="iconStyle"
              class="bg-[#8D00EE] text-white rounded-full size-5 cursor-pointer transition-transform duration-300"
              icon="bx:left-arrow-alt"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

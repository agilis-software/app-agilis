<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const route = useRoute()
const selectedItem = ref(route.path)

watch(() => route.path, (newPath) => {
  selectedItem.value = newPath
})

const isSelected = (path: string) => selectedItem.value === path
</script>

<template>
  <div
    class="flex flex-col h-screen w-72 bg-[#2F2C2C] text-white shadow-md fixed rounded-tr-3xl rounded-br-3xl"
  >
    <RouterLink to="/">
      <div
        class="flex items-center p-4 hover:bg-[#3A3737] rounded-tr-3xl cursor-pointer"
      >
        <Icon
          class="text-electric-violet-400 rounded-full size-5 cursor-pointer transition-transform duration-300"
          icon="bx:left-arrow-alt"
        />
        <span class="text-base ml-3">Voltar</span>
      </div>
    </RouterLink>

    <nav class="flex flex-col mt-6 space-y-4 text-xl font-bold">
      <RouterLink
        to="/settings/account"
        class="relative group"
      >
        <div class="flex items-center ml-14 p-4 cursor-pointer transition-all">
          <div
            :class="{
              'absolute inset-y-0 left-0 w-2 bg-electric-violet-400 rounded-r-full':
                isSelected('/settings/account'),
            }"
          />
          Conta
        </div>
      </RouterLink>

      <RouterLink
        to="/settings/organizations"
        class="relative group"
      >
        <div class="flex items-center ml-14 p-4 cursor-pointer transition-all">
          <div
            :class="{
              'absolute inset-y-0 left-0 w-2 bg-electric-violet-400 rounded-r-full':
                isSelected('/settings/organizations'),
            }"
          />
          Organizações
        </div>
      </RouterLink>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import Search from '~/components/Search.vue'
import TaskRow from '~/components/TaskRow.vue'
</script>

<template>
  <div class="text-white">
    <div class="flex flex-col justify-start gap-y-4">
      <div>
        <h1 class="text-2xl font-bold">
          Backlog
        </h1>
      </div>

      <!--  nome do projeto -->
      <hr class="w-full border border-[#2F2C2C]">
      <p>Projeto Integrador / Backlog</p>
    </div>
    <div class="pt-4">
      <div class="w-64">
        <Search />
      </div>

      <Disclosure
        v-slot="{ open }"
        class="w-full bg-[#2C2A2A] rounded-lg mt-10 p-4 text-white"
        as="div"
      >
        <DisclosureButton class="flex items-center mb-3 w-full">
          <Icon
            class="size-8 transition-transform" :class="[open && 'rotate-180 transform']"
            icon="bx:chevron-down"
          />
          <span class="text-xl"> Quadro </span>
        </DisclosureButton>
        <DisclosurePanel class="px-6 flex flex-col gap-y-4">
          <TaskRow
            task-id="PI-3"
            title="Desenvolver Aplicação"
            image-source="https://avatars.githubusercontent.com/u/83726062?v=4"
          />
          <TaskRow
            task-id="PI-5"
            title="Fazer Deploy"
            image-source="https://avatars.githubusercontent.com/u/83726062?v=4"
          />
        </DisclosurePanel>
      </Disclosure>

      <Disclosure
        v-slot="{ open }"
        class="w-full bg-[#2C2A2A] rounded-lg mt-10 p-4 text-white"
        as="div"
      >
        <DisclosureButton class="flex items-center mb-3 w-full">
          <Icon
            class="size-8 transition-transform" :class="[open && 'rotate-180 transform']"
            icon="bx:chevron-down"
          />
          <span class="text-xl"> Backlog </span>
        </DisclosureButton>
        <DisclosurePanel class="px-6 flex flex-col gap-y-4">
          <TaskRow
            task-id="PI-4"
            title="Fazer Modelagem"
            image-source="https://avatars.githubusercontent.com/u/83726062?v=4"
          />
          <TaskRow
            task-id="PI-6"
            title="Desenvolver API"
            image-source="https://avatars.githubusercontent.com/u/83726062?v=4"
          />
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
</template>

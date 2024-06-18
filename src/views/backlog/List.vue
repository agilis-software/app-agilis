<script setup lang="ts">
import Search from '~/components/Search.vue'
import TaskRow from '~/components/TaskRow.vue'
import { Icon } from '@iconify/vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
</script>

<template>
  <div class="text-white">
    <div class="flex flex-col justify-start gap-y-4">
      <div>
        <h1 class="text-2xl font-bold">Backlog</h1>
      </div>

      <!--  nome do projeto -->
      <hr class="w-full border border-[#2F2C2C]" />
      <p>Projeto Integrador / Backlog</p>
    </div>
    <div class="pt-4">
      <div class="w-64">
        <Search />
      </div>

      <Disclosure
        class="w-full bg-[#2C2A2A] rounded-lg mt-10 p-4 text-white"
        as="div"
        v-slot="{ open }"
      >
        <DisclosureButton class="flex items-center mb-3 w-full">
          <Icon
            :class="[open && 'rotate-180 transform', 'size-8 transition-transform']"
            icon="bx:chevron-down"
          />
          <span class="text-xl"> Quadro </span>
        </DisclosureButton>
        <DisclosurePanel class="px-6 flex flex-col gap-y-4">
          <TaskRow
            taskId="PI-2"
            title="Teste de uma tarefa aqui"
            image-source="https://avatars.githubusercontent.com/u/83726062?v=4"
          />
          <TaskRow
            taskId="PI-2"
            title="Teste de uma tarefa aqui"
            image-source="https://avatars.githubusercontent.com/u/83726062?v=4"
          />
        </DisclosurePanel>
      </Disclosure>

      <Disclosure
        class="w-full bg-[#2C2A2A] rounded-lg mt-10 p-4 text-white"
        as="div"
        v-slot="{ open }"
      >
        <DisclosureButton class="flex items-center mb-3 w-full">
          <Icon
            :class="[open && 'rotate-180 transform', 'size-8 transition-transform']"
            icon="bx:chevron-down"
          />
          <span class="text-xl"> Backlog </span>
        </DisclosureButton>
        <DisclosurePanel class="px-6 flex flex-col gap-y-4">
          <TaskRow
            taskId="PI-2"
            title="Teste de uma tarefa aqui"
            image-source="https://avatars.githubusercontent.com/u/83726062?v=4"
          />
          <TaskRow
            taskId="PI-2"
            title="Teste de uma tarefa aqui"
            image-source="https://avatars.githubusercontent.com/u/83726062?v=4"
          />
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import TaskRow from '~/blocks/TaskRow.vue'
import CreateTask from '~/views/task/Create.vue'

const isOpen = ref(false)

function openModal() {
  isOpen.value = true
}

function closeModal() {
  isOpen.value = false
}
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
            class="size-8 transition-transform"
            :class="[open && 'rotate-180 transform']"
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
            class="size-8 transition-transform"
            :class="[open && 'rotate-180 transform']"
            icon="bx:chevron-down"
          />
          <span class="text-xl"> Backlog </span>
        </DisclosureButton>
        <DisclosurePanel class="px-6 flex flex-col gap-y-4">
          <div class="flex flex-col gap-y-4">
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
          </div>
          <div class="pt-4 -ml-3">
            <Button
              class="flex items-center justify-start"
              @click="openModal"
            >
              <Icon
                icon="bx:plus"
                class="size-6 cursor-pointer"
              />
              <span class="text-lg"> Nova Tarefa </span>
            </Button>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
  <Modal
    :is-open
    title="Criar tarefa"
    @close="closeModal"
    @handle-close="closeModal"
  >
    <CreateTask />
  </Modal>
</template>

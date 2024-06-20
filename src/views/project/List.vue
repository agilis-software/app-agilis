<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import Button from '~/components/Button.vue'
import Modal from '~/components/Modal.vue'
import ProjectCard from '~/components/ProjectCard.vue'
import TaskCard from '~/components/TaskCard.vue'
import { projectCardList } from '~/static/projectCardList'
import CreateProject from '~/views/project/Create.vue'

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
      <h1 class="text-2xl font-bold">
        Fatec Jahu
      </h1>
      <!--  nome do projeto -->
      <hr class="w-full border border-[#2F2C2C]">
    </div>
    <div class="pt-4">
      <div class="flex justify-between">
        <div>
          <h4>Projetos</h4>
        </div>
        <Button
          class="bg-electric-violet-500"
          @click="openModal"
        >
          Adicionar
        </Button>
      </div>
      <div class="flex justify-start gap-x-8 py-5">
        <RouterLink
          v-for="(project, index) in projectCardList"
          :key="index"
          to="kanban"
        >
          <ProjectCard
            :title="project.title"
            :description="project.description"
          />
        </RouterLink>
      </div>
      <div class="flex flex-col justify-start gap-y-4">
        <hr class="w-full border border-[#2F2C2C]">
        <h4 class="text-lg">
          Suas tarefas em progresso
        </h4>
      </div>
      <div class="flex py-5">
        <TaskCard
          title="Desenvolver Aplicação"
          date="01/06/2024"
          task-id="PI-2"
          image-source="https://avatars.githubusercontent.com/u/83726062?v=4"
        />
      </div>
    </div>
  </div>
  <Modal
    :is-open
    title="Criar projeto"
    @close="closeModal"
    @handle-close="closeModal"
  >
    <CreateProject />
  </Modal>
</template>

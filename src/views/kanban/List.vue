<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import TaskCard from '~/blocks/TaskCard.vue'
import Button from '~/components/Button.vue'
import KanbanColumn from '~/blocks/KanbanColumn.vue'
import Modal from '~/components/Modal.vue'
import { doingTasks, doneTasks, toDoTasks } from '~/static/kanbanTaskList'
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
          Quadro
        </h1>
      </div>

      <!--  nome do projeto -->
      <hr class="w-full border border-[#2F2C2C]">
      <p>Projeto Integrador / Quadro</p>
    </div>
    <div class="pt-4 flex gap-x-4">
      <div class="flex gap-x-4 overflow-x-auto h-full">
        <KanbanColumn title="To-Do">
          <TaskCard
            v-for="(task, index) in toDoTasks"
            :key="index"
            :title="task.title"
            :date="task.date"
            :task-id="task.taskId"
            :image-source="task.imageSource"
          />
          <template #newTask>
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
          </template>
        </KanbanColumn>
        <KanbanColumn title="Doing">
          <TaskCard
            v-for="(task, index) in doingTasks"
            :key="index"
            :title="task.title"
            :date="task.date"
            :task-id="task.taskId"
            :image-source="task.imageSource"
          />
        </KanbanColumn>
        <KanbanColumn title="Done">
          <TaskCard
            v-for="(task, index) in doneTasks"
            :key="index"
            :title="task.title"
            :date="task.date"
            :task-id="task.taskId"
            :image-source="task.imageSource"
          />
        </KanbanColumn>
      </div>
      <Button class="size-8">
        <Icon
          icon="bx:plus"
          class="size-8"
        />
      </Button>
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

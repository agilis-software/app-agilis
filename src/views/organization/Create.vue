<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Input from '~/components/forms/Input.vue'
import TextArea from '~/components/forms/TextArea.vue'
import Button from '~/components/Button.vue'
</script>

<template>
  <form class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-12 mt-4">
    <div class="sm:col-span-12">
      <div class="flex items-end gap-2">
        <div class="flex w-4/12">
          <Button
            class="bg-neutral-500/25 w-full h-12 rounded-xl relative flex justify-center"
          >
            <div class="flex flex-col justify-center items-center absolute -top-6">
              <Icon
                icon="ion:folder-open"
                class="size-12 text-electric-violet-400 -top-12"
              />
              <p class="text-sm font-normal text-neutral-200">
                Imagem
              </p>
            </div>
          </Button>
        </div>

        <div class="w-full">
          <label for="nome">Nome da organização</label>
          <Input
            type="text"
            name="nome"
            required
          />
        </div>
      </div>
    </div>
    <div class="sm:col-span-12">
      <label for="descricao">Descrição</label>
      <TextArea
        class="h-20"
        name="descricao"
        required
      />
    </div>
    <div class="sm:col-span-12">
      <label for="convide">Convide pessoas</label>
      <Input
        type="text"
        name="convide"
        required
      />
    </div>

    <div class="sm:col-span-12">
      <Button class="bg-primary-color w-full">
        Criar
      </Button>
    </div>
  </form>
</template>

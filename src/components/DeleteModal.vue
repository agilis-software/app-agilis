<script setup lang="ts">
const emit = defineEmits(['close'])

function close() {
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
    <div class="w-96 p-4 rounded-lg bg-[#2C2A2A] text-center text-white">
      <h2 class="text-xl font-semibold mb-4">
        Atenção!
      </h2>
      <p>Tem certeza de que deseja excluir esta organização?</p>
      <div class="mt-4 flex justify-center gap-x-10">
        <Button>
          Não
        </Button>
        <Button class="bg-red-500" @click="close">
          Sim
        </Button>
      </div>
    </div>
  </div>
</template>

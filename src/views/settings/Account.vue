<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useApi } from '~/composables/api'

const authStore = useAuthStore()

const updating = ref(false)

const currentUserData = ref({
  name: '',
  email: '',
})

const { execute: getUserData, data: userData } = authStore.me()

async function updateUserData() {
  if (updating.value) return

  updating.value = true

  const updateData = {
    name: currentUserData.value.name,
    email: currentUserData.value.email,
  }

  try {
    const { execute: update } = useApi('/users/me').put(updateData).json()
    await update()
    await getUserData()
    console.log('Dados atualizados com sucesso!')
  } catch (error) {
    console.error('Erro ao atualizar dados do usuário:', error)
  } finally {
    updating.value = false
  }
}

onMounted(async () => {
  await getUserData()

  if (userData.value) {
    currentUserData.value.name = userData.value.data.name
    currentUserData.value.email = userData.value.data.email
  }
})
</script>

<template>
  <div class="ml-16 mt-10 border-b border-[#2F2C2C] pb-3">
    <h1 class="text-white font-bold text-4xl">Sua conta</h1>
  </div>
  <div class="mt-8 ml-16 text-xl">
    <div class="flex flex-col w-[70%]">
      <label class="font-semibold text-white"> Nome do Usuário </label>
      <InputText
        v-model="currentUserData.name"
        name="name"
      />
    </div>

    <div class="flex flex-col w-[70%] mt-6">
      <label class="font-semibold text-white"> Email </label>
      <InputText
        v-model="currentUserData.email"
        name="email"
      />
    </div>

    <div class="mt-6">
      <button
        class="flex w-32 justify-center rounded-md bg-electric-violet-500 px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-electric-violet-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-violet-600"
        :class="{ 'cursor-default opacity-50': updating }"
        @click="updateUserData"
      >
        Salvar
      </button>
    </div>
  </div>
</template>

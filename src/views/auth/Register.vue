<script setup lang="ts">
import { reactive } from 'vue'
import IconAgilis from '@icons/IconAgilis.vue'

const credentials = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

function handleSubmit() {

}
</script>

<template>
  <div class="bg-white p-8 shadow sm:rounded-lg w-80">
    <form
      class="space-y-4"
      @submit.prevent="handleSubmit"
    >
      <div class="flex justify-center items-center gap-1">
        <IconAgilis
          :size="48"
          fill="#8d00ec"
        />
        <p class="text-electric-violet-500 mx-2 font-semibold text-3xl">
          Agilis
        </p>
      </div>
      <div>
        <label
          for="name"
          class="block text-sm font-medium leading-6 text-neutral-800"
        >
          Nome completo
        </label>
        <div class="mt-2">
          <input
            id="name"
            v-model="credentials.name"
            name="name"
            type="text"
            autocomplete="name"
            required
            class="block w-full rounded-md indent-2 border-0 py-1.5 text-neutral-800 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:outline-inset focus:outline-electric-violet-600 sm:text-sm sm:leading-6"
          >
        </div>
      </div>

      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-neutral-800"
        >
          Email
        </label>
        <div class="mt-2">
          <input
            id="email"
            v-model="credentials.email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="block w-full rounded-md indent-2 border-0 py-1.5 text-neutral-800 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:outline-2 focus:outline-inset focus:outline-electric-violet-600 sm:text-sm sm:leading-6"
          >
        </div>
      </div>

      <div>
        <label
          for="password"
          class="block text-sm font-medium leading-6 text-neutral-800"
        >
          Senha
        </label>
        <div class="mt-2">
          <input
            id="password"
            v-model="credentials.password"
            name="password"
            type="password"
            autocomplete="new-password"
            required
            class="block w-full rounded-md indent-2 border-0 py-1.5 text-neutral-800 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:outline-2 focus:outline-inset focus:outline-electric-violet-600 sm:text-sm sm:leading-6"
          >
        </div>
      </div>

      <div>
        <label
          for="confirm-password"
          class="block text-sm font-medium leading-6 text-neutral-800"
        >
          Confirme sua senha
        </label>
        <div class="mt-2">
          <input
            id="confirm-password"
            v-model="credentials.confirmPassword"
            name="confirm-password"
            type="password"
            required
            class="block w-full rounded-md indent-2 border-0 py-1.5 text-neutral-800 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:outline-2 focus:outline-inset focus:outline-electric-violet-600 sm:text-sm sm:leading-6"
          >
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-electric-violet-500 px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-electric-violet-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-violet-600"
        >
          Registrar
        </button>
      </div>
    </form>

    <p class="mt-6 text-center text-sm text-neutral-600 font-medium">
      Já possui conta?
      <RouterLink
        to="/login"
        class="font-semibold mx-1 leading-6 text-electric-violet-600 hover:text-electric-violet-500"
      >
        Faça login
      </RouterLink>
    </p>
  </div>
</template>

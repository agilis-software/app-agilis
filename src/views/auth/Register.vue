<script setup lang="ts">
import { reactive } from 'vue'
import LogoAgilis from '@icons/LogoAgilis.vue'
import { useAuthStore } from '~/stores/auth'
import router from '~/router'
import { notify } from '~/utils/toast'

const authStore = useAuthStore()

const credentials = reactive({
  name: '',
  email: '',
  birth_date: '',
  password: '',
  password_confirmation: '',
})

const { execute: register, isFetching: isLoadingRegister } = authStore.register(credentials)

function handleSubmit() {
  if (credentials.password !== credentials.password_confirmation) {
    return notify('As senhas não condizem', 'error')
  }

  register()
    .then(() => {
      router.push('/login')
    })
}
</script>

<template>
  <div class="bg-[#201E1E] p-8 shadow-3xl sm:rounded-lg">
    <form
      class="space-y-4"
      @submit.prevent="handleSubmit"
    >
      <div class="flex justify-center items-center gap-1">
        <LogoAgilis
          :size="48"
          fill="#8d00ec"
        />
      </div>
      <div>
        <label
          for="name"
          class="block text-sm font-medium leading-6 text-electric-violet-500"
        >
          Nome completo
        </label>
        <div class="mt-2">
          <InputText
            v-model="credentials.name"
            name="name"
            validation="required"
            placeholder="John Doe"
            class="block w-full rounded-md dark:text-black indent-2 border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-neutral-300 focus:ring-2 focus:outline-inset focus:outline-electric-violet-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-electric-violet-500"
        >
          Email
        </label>
        <div class="mt-2">
          <InputEmail
            v-model="credentials.email"
            name="email"
            validation="required"
            placeholder="example@email.com"
            class="block w-full dark:text-black rounded-md indent-2 border-0 py-1.5 text-neutral-800 shadow-sm ring-1 ring-inset ring-neutral-300 focus:outline-2 focus:outline-inset focus:outline-electric-violet-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label
          for="birth_date"
          class="block text-sm font-medium leading-6 text-electric-violet-500"
        >
          Data de nascimento
        </label>
        <div class="mt-2">
          <InputDate
            v-model="credentials.birth_date"
            name="birth_date"
            validation="required"
            class="block w-full dark:text-black rounded-md indent-2 border-0 py-1.5 text-neutral-800 shadow-sm ring-1 ring-inset ring-neutral-300 focus:outline-2 focus:outline-inset focus:outline-electric-violet-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label
          for="password"
          class="block text-sm font-medium leading-6 text-electric-violet-500"
        >
          Senha
        </label>
        <div class="mt-2">
          <InputPassword
            v-model="credentials.password"
            name="password"
            validation="required"
            class="block w-full dark:text-black rounded-md indent-2 border-0 py-1.5 text-neutral-800 shadow-sm ring-1 ring-inset ring-neutral-300 focus:outline-2 focus:outline-inset focus:outline-electric-violet-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label
          for="confirm-password"
          class="block text-sm font-medium leading-6 text-electric-violet-500"
        >
          Confirme sua senha
        </label>
        <div class="mt-2">
          <InputPassword
            v-model="credentials.password_confirmation"
            name="confirm-password"
            validation="required"
            class="block w-full dark:text-black rounded-md indent-2 border-0 py-1.5 text-neutral-800 shadow-sm ring-1 ring-inset ring-neutral-300 focus:outline-2 focus:outline-inset focus:outline-electric-violet-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          :disabled="isLoadingRegister"
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
        class="font-semibold mx-1 leading-6 text-electric-violet-500 hover:text-electric-violet-600"
      >
        Faça login
      </RouterLink>
    </p>
  </div>
</template>

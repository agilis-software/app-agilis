<script setup lang="ts">
import LogoAgilis from '@icons/LogoAgilis.vue'
import { reactive } from 'vue'
import router from '~/router'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

const credentials = reactive({
  email: '',
  password: '',
})

const { execute: login, isFetching: isLoadingLogin } = authStore.login(credentials)

function handleSubmit() {
  login()
    .then(() => {
      router.push('/organizations')
    })
}
</script>

<template>
  <div class="bg-[#201E1E] p-8 shadow rounded-lg ">
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
            class="block w-full rounded-md indent-2 border-0 py-1.5 text-neutral-800 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:outline-2 focus:outline-inset focus:outline-electric-violet-600 sm:text-sm sm:leading-6"
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
            class="block w-full rounded-md indent-2 border-0 py-1.5 text-neutral-800 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:outline-2 focus:outline-inset focus:outline-electric-violet-600 sm:text-sm sm:leading-6"
          />
        </div>
        <RouterLink
          to="/recover"
          class="font-medium text-sm text-electric-violet-500 hover:text-electric-violet-600"
        >
          Esqueceu sua senha?
        </RouterLink>
      </div>

      <div>
        <button
          :disabled="isLoadingLogin"
          type="submit"
          class="flex w-full justify-center rounded-md bg-electric-violet-500 px-3 py-1.5 text-sm font-medium leading-6 text-white shadow-sm hover:bg-electric-violet-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-violet-600"
        >
          Entrar
        </button>
      </div>
    </form>

    <p class="mt-6 text-center text-sm text-neutral-600 font-medium">
      Usuário novo?
      <RouterLink
        to="/register"
        class="font-semibold mx-1 leading-6 text-electric-violet-500 hover:text-electric-violet-600"
      >
        Cadastre-se
      </RouterLink>
    </p>
  </div>
</template>

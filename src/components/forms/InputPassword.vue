<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  name: string
  value?: string
  validation?: string
  label?: string
}

const props = defineProps<Props>()
const showPassword = ref(false)
const inputValue = ref('')

const inputType = computed(() => (showPassword.value ? 'text' : 'password'))
</script>

<template>
  <FormKit
    v-bind="props"
    v-model="inputValue"
    :type="inputType"
  />
</template>

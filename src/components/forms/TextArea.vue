<script setup lang="ts">
interface Props {
  name: string
  value?: string
  validation?: string
  label?: string
  class?: string
}

defineProps<Props>()
</script>

<template>
  <FormKit
    :name
    :value
    :validation
    :label
    type="textarea"
  />
</template>

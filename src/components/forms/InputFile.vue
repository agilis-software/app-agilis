<script setup lang="ts">
interface FormKitFile {
  file: File
  name: string
}
interface Props {
  name: string
  value?: FormKitFile[]
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
    type="file"
  />
</template>

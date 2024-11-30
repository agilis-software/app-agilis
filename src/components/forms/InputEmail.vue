<script setup lang="ts">
interface Props {
  name: string
  value?: string
  validation?: string
  label?: string
  placeholder?: string
  bgColor?: string
}

defineProps<Props>()
</script>

<template>
  <FormKit
    :name
    :value
    :validation
    :label
    :placeholder="placeholder"
    type="email"
  />
</template>

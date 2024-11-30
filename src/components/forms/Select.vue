<script setup lang="ts">
interface Props {
  options: any[]
  optionLabel: string
  optionValue: string
  value?: string | number
}

defineProps<Props>()
</script>

<template>
  <FormKit
    :value
    type="select"
  >
    <option
      v-for="(item, index) in options"
      :key="index"
      :value="item[optionValue]"
    >
      {{ item[optionLabel] }}
    </option>
  </Formkit>
</template>

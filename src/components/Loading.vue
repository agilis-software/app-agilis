<script setup lang="ts">
interface Props {
  size?: string
}

withDefaults(defineProps<Props>(), {
  size: '8',
})
</script>

<template>
  <span :class="`d-loading d-loading-spinner text-primary-color size-${size}`" />
</template>

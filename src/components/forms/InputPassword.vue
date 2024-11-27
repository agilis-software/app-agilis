<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import eyeIcon from '@iconify-icons/mdi/eye'
import eyeOffIcon from '@iconify-icons/mdi/eye-off'

interface Props {
  name: string
  value?: string
  validation?: string
  label?: string
}

defineProps<Props>();
</script>

<template>
  <FormKit
    :name
    :value
    :validation
    :label
  />
</template>

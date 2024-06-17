<script setup lang="ts">
type ButtonType = 'submit' | 'button' | 'reset'

interface Props {

  type?: ButtonType
}

withDefaults(defineProps<Props>(), {
  type: 'button',
})
</script>

<template>
  <button
    :type
    class="btn font-bold py-2 px-4 rounded"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import eyeIcon from '@iconify-icons/mdi/eye';
import eyeOffIcon from '@iconify-icons/mdi/eye-off';

interface Props {
  name: string;
  value?: string;
  validation?: string;
  label?: string;
}

const props = defineProps<Props>();
const showPassword = ref(false);
const inputValue = ref('');

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const shouldShowIcon = () => inputValue.value.length > 0;
</script>

<template>
    <FormKit
      v-bind="props"
      :type="showPassword ? 'text' : 'password'"
      v-model="inputValue" 
    />
    <Icon
      v-if="shouldShowIcon()"
      :icon="showPassword ? eyeOffIcon : eyeIcon"
      @click="togglePasswordVisibility"
      class="relative -inset-y-13 float-right right-3 cursor-pointer text-neutral-700 text-2xl"
    />
</template>

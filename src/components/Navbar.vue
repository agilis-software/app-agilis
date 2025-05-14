<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import OrganizationNavbar from './OrganizationNavbar.vue'
import ProjectNavbar from './ProjectNavbar.vue'

const route = useRoute()
const routeName = computed(() => route.name)
const inProjectList = computed(() => routeName.value === 'projects' || routeName.value === 'chat')
</script>

<template>
  <div>
    <OrganizationNavbar v-if="inProjectList" />
    <ProjectNavbar v-else />
  </div>
</template>

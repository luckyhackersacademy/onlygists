<script setup lang="ts">
import CreateNew from '@/modules/gists/screens/CreateNew/CreateNew.vue'

useHead({
  title: 'Criar novo gist | 🤩 onlygists',
})

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})
</script>

<template>
  <CreateNew />
</template>

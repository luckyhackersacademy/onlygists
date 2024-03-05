<script setup lang="ts">
import EditProfile from '@/modules/users/screens/EditProfile/EditProfile.vue'

useHead({
  title: 'Editar perfil | 🤩 onlygists',
})

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})
</script>

<template>
  <EditProfile />
</template>

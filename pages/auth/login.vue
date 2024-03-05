<script setup lang="ts">
import Login from '@/modules/auth/screens/Login/Login.vue'

useHead({
  title: 'Entrar | 🤩 onlygists',
})

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <Login />
</template>

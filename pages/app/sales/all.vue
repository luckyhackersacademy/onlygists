<script setup lang="ts">
import Sales from '@/modules/payments/screens/Sales/Sales.vue'

useHead({
  title: 'Minhas vendas | 🤩 onlygists',
})

definePageMeta({
  layout: 'admin',
  middleware: ['auth'],
})
</script>

<template>
  <Sales />
</template>

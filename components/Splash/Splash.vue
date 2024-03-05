<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div class="w-full h-full flex justify-center items-center" v-if="props.loading">
    <span class="animate-pulse text-6xl">🤩</span>
  </div>

  <slot v-else />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    loading: boolean
    amount?: number
  }>(),
  {
    loading: false,
    amount: 4,
  },
)
</script>

<template>
  <template v-if="props.loading">
    <div
      v-for="loader in props.amount"
      :key="`loader-${loader}`"
      class="flex flex-col justify-center gap-2 bg-white rounded w-full p-5"
    >
      <Skeleton width="5rem" height="3rem" />
      <Skeleton width="100%" height="2rem" />
    </div>
  </template>

  <slot v-else />
</template>

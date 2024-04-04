<script setup lang="ts">
const props = defineProps<{
  avatarUrl: string
  author: string
  bio: string
}>()
</script>

<template>
  <div class="w-full h-full flex flex-col justify-center items-center bg-[#f97316]">
    <img :src="props.avatarUrl" alt="avatar url" width="170" height="170" class="rounded-full" />
    <h1 class="font-[Inter] font-bold text-6xl text-white text-center">{{ props.author }}</h1>
    <p class="font-[Inter] text-white font-regular text-4xl text-center -mt-2">{{ props.bio }}</p>
  </div>
</template>

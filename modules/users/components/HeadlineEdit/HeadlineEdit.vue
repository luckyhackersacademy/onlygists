<script setup lang="ts">
const emit = defineEmits<{
  (e: 'share', username: string): void
  (e: 'navigate-to-profile', username: string): void
}>()

const props = defineProps<{
  username: string
  avatarUrl: string
}>()
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center gap-2">
    <div class="w-24 md:w-32 rounded-full overflow-hidden">
      <img :src="props.avatarUrl" alt="foto de perfil do usuário" />
    </div>

    <h1 class="font-[Inter] text-gray-700 font-bold text-2xl md:text-3xl">@{{ props.username }}</h1>

    <div class="flex gap-2 mt-2">
      <Button
        @click="() => emit('navigate-to-profile', props.username)"
        label="Ver perfil"
        size="small"
        icon="pi pi-star"
        icon-pos="right"
      />
      <Button
        @click="() => emit('share', props.username)"
        label="Compartilhar"
        size="small"
        icon="pi pi-share-alt"
        icon-pos="right"
      />
    </div>
  </div>
</template>

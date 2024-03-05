<script setup lang="ts">
const emit = defineEmits<{
  (e: 'wants-be-creator'): void
}>()
</script>

<template>
  <section class="w-full h-full flex flex-col items-center justify-center">
    <h1 class="font-[Inter] text-balance mb-4 text-3xl lg:text-5xl text-center font-extrabold text-black">
      Compartilhe e monetize trechos de código.
    </h1>
    <p class="font-[Inter] text-balance mb-8 text-xl lg:text-3xl text-center text-black">
      Ganhe uma renda extra com os códigos que você faz no dia-a-dia.
    </p>

    <div class="flex flex-col justify-center items-center">
      <Button
        @click="() => emit('wants-be-creator')"
        label="Continuar como creator"
        icon-pos="right"
        icon="pi pi-arrow-right"
      />
    </div>
  </section>
</template>

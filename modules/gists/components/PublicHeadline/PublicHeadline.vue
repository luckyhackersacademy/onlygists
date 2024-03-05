<script setup lang="ts">
const { render } = useMarkdown()

const props = withDefaults(
  defineProps<{
    title: string
    lang: string
    description: string
    author: string
  }>(),
  {
    title: 'currency_format.py',
    lang: 'python',
    description: 'função em python para fazer **formatação de moeda**',
    author: 'igorhalfeld',
  },
)

const description = computed(() => {
  return render(props.description)
})
</script>

<template>
  <div class="w-full flex flex-col justify-center gap-2 my-5">
    <div class="flex flex-wrap items-center gap-2">
      <h1 class="font-[Inter] text-gray-700 font-bold text-2xl md:text-3xl">{{ props.title }}</h1>
      <Chip class="text-sm" :label="props.lang" icon="pi pi-bolt" />
    </div>

    <div v-html="description" class="font-[Inter] text-gray-700 font-regular text-base md:text-lg" />

    <p class="font-[Inter] font-regular text-gray-500 text-sm md:text-base">
      <i class="pi pi-star"></i>
      by
      <NuxtLink class="text-primary-500" :to="`/${props.author}`">@{{ props.author }}</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
const { render } = useMarkdown()

const emit = defineEmits<{
  (e: 'tap', id: string): void
}>()

const props = withDefaults(
  defineProps<{
    id: string
    title: string
    description: string
    price: number
    lang: string
  }>(),
  {
    id: '123',
    title: 'useCurrentUser.ts',
    description: 'Hook para controlar o **usuário** logado',
    price: 10,
    lang: 'typescript',
  },
)

const isFree = computed(() => {
  return props.price === 0
})

const description = computed(() => {
  return render(props.description)
})

const amount = computed(() => {
  return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.price)
})

const handleClick = () => {
  emit('tap', props.id)
}
</script>

<template>
  <div class="card">
    <Card>
      <template #title>
        <div class="flex flex-wrap gap-2">
          {{ props.title }}
          <Chip class="text-sm" :label="props.lang" icon="pi pi-bolt" />
        </div>
      </template>

      <template #content>
        <div v-html="description" />
      </template>

      <template #footer>
        <Button
          @click="handleClick"
          v-if="isFree"
          label="Baixar gratuitamente"
          class="w-full"
          icon="pi pi-shopping-bag"
          icon-pos="right"
        />
        <Button
          @click="handleClick"
          v-else
          :label="`Comprar por ${amount}`"
          class="w-full"
          icon="pi pi-shopping-bag"
          icon-pos="right"
        />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'setup'): void
}>()

const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <Card #content>
    <div class="flex items-center gap-4">
      <i class="pi pi-info-circle text-yellow-700 text-4xl"></i>

      <div class="flex flex-col flex-1">
        <h4 class="font-[Inter] text-yellow-700">Complete os dados de pagamento</h4>
        <p class="font-[Inter] text-sm">
          É necessário fazer a criação de uma conta de pagament para a ativar a sua conta.
        </p>
      </div>

      <Button
        @click="() => emit('setup')"
        :loading="props.loading"
        size="small"
        label="Completar"
        icon="pi pi-arrow-right"
        icon-pos="right"
      />
    </div>
  </Card>
</template>

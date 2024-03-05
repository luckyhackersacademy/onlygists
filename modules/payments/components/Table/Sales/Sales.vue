<script setup lang="ts">
import type { Sale } from '@/modules/payments/entities/Sale/Sale'
import { currencyFormatBRL } from '@/libs/currency/format'

const props = defineProps<{
  sales: Sale[]
}>()
</script>

<template>
  <DataTable :value="props.sales" table-class="min-width: 40rem" size="large">
    <Column field="gists.title" header="Gist"></Column>
    <Column field="customerEmail" header="Cliente"></Column>
    <Column header="Preço">
      <template #body="{ data }">
        {{ currencyFormatBRL(data.gists.price) }}
      </template>
    </Column>
    <Column header="Vendido em">
      <template #body="{ data }">
        {{ data.createdAt.toLocaleDateString('pt-br') }}
      </template>
    </Column>
  </DataTable>
</template>

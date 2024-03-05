<script setup lang="ts">
import WidgetGroup from '@/modules/reports/components/Widget/Group/Group.vue'
import WidgetGroupLoader from '@/modules/reports/components/Widget/Group/Loader.vue'
import WidgetCondensed from '@/modules/reports/components/Widget/Condensed/Condensed.vue'
import SalesTable from '@/modules/payments/components/Table/Sales/Sales.vue'
import SalesTableLoader from '@/modules/payments/components/Table/Sales/Loader.vue'
import { myselfKey } from '@/modules/users/composables/useMyself/useMyself'
import type { MyselfContextProvider } from '@/modules/users/composables/useMyself/types'
import { currencyFormatBRL } from '@/libs/currency/format'

import { useSalesReport } from '@/modules/reports/composables/useSalesReport/useSalesReport'
import { useSalesList } from '@/modules/payments/composables/useSalesList/useSalesList'

const { user } = inject(myselfKey) as MyselfContextProvider

const {
  loading: reportLoading,
  netRevenue,
  grossRevenue,
} = useSalesReport({
  userId: user.value?.id!,
})

const { sales, loading } = useSalesList({
  userId: user.value?.id!,
})

console.log(sales)

const localeGrossRevenue = computed(() => {
  if (!grossRevenue.value) {
    return 'R$ 0'
  }

  return currencyFormatBRL(grossRevenue.value)
})

const localeNetRevenue = computed(() => {
  if (!netRevenue.value) {
    return 'R$ 0'
  }

  return currencyFormatBRL(netRevenue.value)
})
</script>

<template>
  <WidgetGroup>
    <WidgetGroupLoader :loading="reportLoading" :amount="3">
      <WidgetCondensed :value="localeGrossRevenue" label="Valor bruto" />
      <WidgetCondensed :value="localeNetRevenue" label="Valor para saque" />
    </WidgetGroupLoader>
  </WidgetGroup>

  <WidgetDefault title="Listagem de vendas" v-if="sales.length !== 0">
    <SalesTableLoader :loading="loading">
      <SalesTable :sales="sales" />
    </SalesTableLoader>
  </WidgetDefault>
</template>

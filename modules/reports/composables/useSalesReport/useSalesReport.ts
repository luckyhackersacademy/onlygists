import { applyPayoutFeesToGrossValue } from '@/modules/payments/entities/Sale/Sale'

interface UseSalesReportOptions {
  userId: string
}

export function useSalesReport({ userId }: UseSalesReportOptions) {
  const services = useServices()
  const { logAndTrack } = useLogger()

  const loading = ref<boolean>(true)
  const grossRevenue = ref<number>(0)
  const netRevenue = ref<number>(0)

  const fetchRevenue = async () => {
    if (!userId) {
      return
    }

    loading.value = true

    try {
      const total = await services.reports.totalRevenue(userId)
      grossRevenue.value = total ?? 0
      netRevenue.value = total === 0 ? 0 : applyPayoutFeesToGrossValue(total ?? 0)
    } catch (e) {
      logAndTrack(e)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchRevenue()
  })
  return {
    loading,
    grossRevenue,
    netRevenue,
  }
}

export function useStripeAccountCreate() {
  const { logAndTrack } = useLogger()
  const loading = ref<boolean>(false)
  const services = useServices()

  const create = async (email: string) => {
    loading.value = true

    try {
      const response = await services.payments.createPayoutAccount(email)
      return response.data
    } catch (e) {
      logAndTrack(e)
    } finally {
      loading.value = false
    }
  }

  return {
    create,
    loading,
  }
}

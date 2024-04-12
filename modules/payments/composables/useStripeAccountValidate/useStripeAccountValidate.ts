export function useStripeAccountValidate() {
  const { logAndTrack } = useLogger()
  const loading = ref<boolean>(false)
  const isValid = ref<boolean>(true)
  const services = useServices()

  const validate = async (accountId?: string) => {
    if (!accountId || accountId === '') {
      isValid.value = false
      return
    }

    loading.value = true

    try {
      const response = await services.payments.isAccountValid(accountId)
      isValid.value = response.data.isValid
    } catch (e) {
      logAndTrack(e)
    } finally {
      loading.value = false
    }
  }

  return {
    isValid,
    loading,
    validate,
  }
}

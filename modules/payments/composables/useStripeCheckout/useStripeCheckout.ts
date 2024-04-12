import type { CreateCheckoutOptions } from './types'

export function useStripeCheckout() {
  const { logAndTrack } = useLogger()
  const services = useServices()
  const checkoutUrl = ref<string>()

  const createCheckoutUrl = async ({ username, gistId, price }: CreateCheckoutOptions) => {
    try {
      const response = await services.payments.createCheckout({
        username,
        gistId,
        price,
      })

      checkoutUrl.value = response.data.checkoutUrl
    } catch (e) {
      logAndTrack(e)
    }
  }

  return {
    checkoutUrl,
    createCheckoutUrl,
  }
}

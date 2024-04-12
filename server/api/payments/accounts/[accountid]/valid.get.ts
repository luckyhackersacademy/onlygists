import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async (event) => {
  const accountId = getRouterParam(event, 'accountid')

  if (!accountId) {
    throw createError({
      status: 400,
      statusMessage: '`accountId` is required',
    })
  }

  if (!event.context.auth.isAuthenticated) {
    throw createError({
      status: 401,
      statusMessage: 'user not authenticated',
    })
  }

  const stripe = await useServerStripe(event)
  const account = await stripe.accounts.retrieve(accountId)

  return {
    isValid: account.details_submitted,
  }
})

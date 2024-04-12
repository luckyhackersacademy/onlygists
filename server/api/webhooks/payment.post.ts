import { v4 as uuidv4 } from 'uuid'

import { useServerStripe } from '#stripe/server'
import { serverSupabaseClient } from '#supabase/server'
import { Database } from '@/libs/supabase/schema'

import { useCompiler } from '#vue-email'
import JSZip from 'jszip'
import { Resend } from 'resend'

interface StripeEvent {
  client_reference_id: string
  customer_details: {
    name: string
    email: string
  }
}

export default defineEventHandler(async (event) => {
  const body = await readRawBody(event)
  const stripe = await useServerStripe(event)
  const config = useRuntimeConfig()
  const { stripeWebhookSecret } = config

  const sig = getHeader(event, 'stripe-signature') ?? ''
  const stripeEvent = stripe.webhooks.constructEvent(body!, sig, stripeWebhookSecret)

  const ALLOWED_EVENTS = ['checkout.session.completed']
  if (!ALLOWED_EVENTS.includes(stripeEvent.type)) {
    return
  }

  const paymentIntentEvent = stripeEvent.data.object as StripeEvent

  const supabase = await serverSupabaseClient<Database>(event)

  const gist = await supabase
    .from('gists')
    .select('content, title, description')
    .eq('id', paymentIntentEvent.client_reference_id)
    .maybeSingle()

  await supabase.from('sales').insert({
    id: uuidv4(),
    customer_email: paymentIntentEvent.customer_details.email,
    gist_id: paymentIntentEvent.client_reference_id,
  })

  const zip = new JSZip()
  zip.file(gist.data?.title!, gist.data?.content!)
  zip.file('README.md', gist.data?.description!)

  const buffer = await zip.generateAsync({ type: 'nodebuffer' })
  const resend = new Resend(config.resendKey)

  const template = await useCompiler('GistSale.vue', {
    props: {
      name: paymentIntentEvent.customer_details.name,
    },
  })

  resend.emails.send({
    from: 'igor@nuxtextreme.com',
    to: paymentIntentEvent.customer_details.email,
    subject: 'Seu gist chegou! Onlygists',
    html: template.html,
    attachments: [
      {
        filename: `${gist.data?.title}.zip`,
        content: buffer,
      },
    ],
  })
})

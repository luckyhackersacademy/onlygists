import axios from 'axios'
import AuthService from '@/modules/auth/services/services'
import UserService from '@/modules/users/services/services'
import GistService from '@/modules/gists/services/services'
import ReportService from '@/modules/reports/services/services'
import PaymentService from '@/modules/payments/services/services'
import type { Database } from '@/libs/supabase/schema'

export function useServices() {
  const supabaseClient = useSupabaseClient<Database>()
  const config = useRuntimeConfig()
  const cepHttpClient = axios.create()
  const paymentHttpClient = axios.create({
    baseURL: '/api',
  })

  return {
    auth: AuthService(supabaseClient, {
      redirectToUrl: `${config.public.siteUrl}/auth/github`,
    }),
    users: UserService(supabaseClient, cepHttpClient),
    gists: GistService(supabaseClient),
    reports: ReportService(supabaseClient),
    payments: PaymentService(supabaseClient, paymentHttpClient),
  }
}

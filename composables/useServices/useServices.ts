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
  const httpClient = axios.create()

  return {
    auth: AuthService(supabaseClient, {
      redirectToUrl: `${config.public.siteUrl}/auth/github`,
    }),
    users: UserService(supabaseClient, httpClient),
    gists: GistService(supabaseClient),
    reports: ReportService(supabaseClient),
    payments: PaymentService(supabaseClient),
  }
}

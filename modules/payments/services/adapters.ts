import type { Database } from '@/libs/supabase/schema'
import type { SaleVirtual } from '@/modules/payments/entities/Sale/Sale'

type SaleTable = Database['public']['Tables']['sales']
type GistTable = Database['public']['Tables']['gists']

export type ReadAllSalesRow = SaleTable['Row'] & {
  gists: GistTable['Row'] | null
}

export function readAllSalesAdapter(values: ReadAllSalesRow[] | null): SaleVirtual[] {
  if (!values) {
    return []
  }

  const newValues = values.map((data) => {
    return {
      id: data.id,
      gistId: data.gist_id ?? '',
      customerEmail: data.customer_email,
      gists: {
        title: data.gists?.title ?? '',
        price: data.gists?.price ?? 0,
      },
      createdAt: new Date(data.created_at),
    }
  })

  return newValues
}

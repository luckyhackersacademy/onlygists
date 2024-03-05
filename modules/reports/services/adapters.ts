import type { Database } from '@/libs/supabase/schema'

type SaleTable = Database['public']['Tables']['sales']
type GistTable = Database['public']['Tables']['gists']

export type RevenueRow = SaleTable['Row'] & {
  gists: GistTable['Row'] | null
}

export function totalRevenueAdapter(values: RevenueRow[] | null): number {
  if (!values) {
    return 0
  }

  const total = values.reduce((acc, data) => {
    const price = data.gists?.price
    return acc + (price ?? 0)
  }, 0)

  return total
}

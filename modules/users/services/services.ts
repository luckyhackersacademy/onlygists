import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/libs/supabase/schema'
import type { User } from '@/modules/users/entities/User/User'
import { getMyselfAdapter, searchAddressByZipCodeAdapter, readOneByUsernameAdapter } from './adapters'
import type { AxiosInstance } from 'axios'
import type { SearchAddressResponse } from './types'

export default (client: SupabaseClient<Database>, httpClient: AxiosInstance) => ({
  async searchAddressByZipCode(zipCode: string) {
    const url = `https://viacep.com.br/ws/${zipCode}/json/`
    const response = await httpClient.get<SearchAddressResponse>(url)
    const address = searchAddressByZipCodeAdapter(response.data)

    return {
      data: address,
    }
  },

  async getMyself(id: string) {
    const response = await client.from('profiles').select('*').eq('id', id).limit(1).single()
    const user = getMyselfAdapter(response.data)
    return user
  },

  async readOneByUsername(username: string) {
    const response = await client.from('profiles').select().eq('username', username).limit(1).single()
    const user = readOneByUsernameAdapter(response.data)
    return user
  },

  async update(id: string, { name, site, bio, phone, address }: User) {
    await client
      .from('profiles')
      .update({
        name,
        site,
        bio,
        phone,
        address: {
          zipCode: address?.zipCode,
          number: address?.number,
          street: address?.street,
          city: address?.city,
          state: address?.state,
          neighborhood: address?.neighborhood,
          complement: address?.complement,
        },
      })
      .eq('id', id)

    return { id }
  },
})

import type { GistVirtual } from '@/modules/gists/entities/Gist/Gist'
import type { Database } from '@/libs/supabase/schema'

type ProfileTable = Database['public']['Tables']['profiles']
type GistTable = Database['public']['Tables']['gists']

export type ReadOneRow = GistTable['Row'] & {
  profiles: ProfileTable['Row'] | null
}

export function readOneAdapter(data: ReadOneRow | null): GistVirtual | null {
  if (!data) {
    return null
  }

  return {
    id: data.id,
    title: data.title,
    profileId: data.profile_id ?? '',
    description: data.description,
    isPaid: data.is_paid,
    price: data.price,
    profiles: {
      id: data.profiles?.id,
      name: data.profiles?.name,
      username: data.profiles?.username,
    },
    lang: data.lang,
    content: data.content,
    createdAt: data.created_at ? new Date(data.created_at) : new Date(),
  }
}

export type ReadAllRow = GistTable['Row'] & {
  profiles: ProfileTable['Row'] | null
}

export function readAllAdapter(values: ReadAllRow[] | null): GistVirtual[] {
  if (!values) {
    return []
  }

  const newValues = values.map((data) => {
    return {
      id: data.id,
      title: data.title,
      profileId: data.profile_id ?? '',
      description: data.description,
      isPaid: data.isPaid,
      price: data.price,
      profiles: {
        id: data.profiles?.id,
        username: data.profiles?.username,
      },
      lang: data.lang,
      content: data.content,
      createdAt: new Date(data.created_at),
    }
  })

  return newValues
}

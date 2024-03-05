import type { User } from '@/modules/users/entities/User/User'

export interface Gist {
  id: string
  title: string
  profileId: string
  description: string
  isPaid: boolean
  lang: string
  price: number
  content: string
  createdAt: Date
}

export interface GistVirtual extends Gist {
  profiles: Partial<User>
}

export type Headline = Pick<Gist, 'title' | 'description' | 'price'>
export type Code = Pick<Gist, 'lang' | 'content'>

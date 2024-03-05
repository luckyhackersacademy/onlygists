import type { Code, Headline } from '@/modules/gists/entities/Gist/Gist'

export type CreateOptions = Headline &
  Code & {
    profileId: string
  }

export type UpdateOptions = Partial<Headline> & Partial<Code>

export type ReadAllOptions = {
  username: string
  to?: number
  from?: number
}
